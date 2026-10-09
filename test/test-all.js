import assert from "node:assert/strict";
import worker from "../index.js";
import { getStaticAsset } from "../docs/static-assets.js";
import { setRuntimeEnv, get, set, del, isFresh, _CACHE_ENABLED } from "../core/smartcache.js";
import { wreqFetch } from "../core/wreq.js";
import { findVideoExtractor } from "../extractors/index.js";

async function runTests() {
  console.log("=== Starting Anivexa API Cloudflare Worker Migration Test Suite ===");
  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      await fn();
      console.log(`[PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`[FAIL] ${name}:`, err.message);
      failed++;
    }
  }

  // 1. Static asset helper tests
  await test("Static assets helper delivers /docs, /landing, /style.css, /logo.svg", async () => {
    const docs = getStaticAsset("/docs", "2.3");
    assert.ok(docs && docs.mime.includes("text/html"));
    assert.ok(docs.body.includes("Anivexa API"));

    const landing = getStaticAsset("/landing", "2.3");
    assert.ok(landing && landing.mime.includes("text/html"));

    const css = getStaticAsset("/style.css");
    assert.ok(css && css.mime.includes("text/css"));

    const svg = getStaticAsset("/logo.svg");
    assert.ok(svg && svg.mime.includes("image/svg+xml"));
  });

  // 2. Root route JSON response
  await test("Worker GET / with application/json returns API manifest", async () => {
    const req = new Request("http://localhost/", {
      headers: { Accept: "application/json" }
    });
    const res = await worker.fetch(req, { API_VERSION: "2.3" });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.name, "Anivexa API 2.3");
    assert.equal(data.providers.length, 12);
    assert.ok(data.routes.length > 10);
  });

  // 3. Root route HTML response
  await test("Worker GET / with text/html returns landing page", async () => {
    const req = new Request("http://localhost/", {
      headers: { Accept: "text/html,application/xhtml+xml" }
    });
    const res = await worker.fetch(req, { API_VERSION: "2.3" });
    assert.equal(res.status, 200);
    assert.ok(res.headers.get("content-type")?.includes("text/html"));
    const html = await res.text();
    assert.ok(html.includes("<!DOCTYPE html>") || html.includes("<html"));
  });

  // 4. Docs route
  await test("Worker GET /docs returns documentation UI", async () => {
    const req = new Request("http://localhost/docs");
    const res = await worker.fetch(req, { API_VERSION: "2.3" });
    assert.equal(res.status, 200);
    assert.ok(res.headers.get("content-type")?.includes("text/html"));
    const html = await res.text();
    assert.ok(html.includes("Anivexa"));
  });

  // 5. CSS and SVG routes
  await test("Worker GET /style.css and /logo.svg return correct static assets", async () => {
    const resCss = await worker.fetch(new Request("http://localhost/style.css"), { API_VERSION: "2.3" });
    assert.equal(resCss.status, 200);
    assert.ok(resCss.headers.get("content-type")?.includes("text/css"));

    const resSvg = await worker.fetch(new Request("http://localhost/logo.svg"), { API_VERSION: "2.3" });
    assert.equal(resSvg.status, 200);
    assert.ok(resSvg.headers.get("content-type")?.includes("image/svg+xml"));
  });

  // 6. CORS OPTIONS preflight
  await test("Worker OPTIONS preflight returns 204 with CORS headers", async () => {
    const req = new Request("http://localhost/episodes/21", { method: "OPTIONS" });
    const res = await worker.fetch(req, {});
    assert.equal(res.status, 204);
    assert.equal(res.headers.get("access-control-allow-origin"), "*");
  });

  // 7. Mapping endpoint: /map/:anilistId
  await test("Worker GET /map/21 returns ID mappings for One Piece", async () => {
    const req = new Request("http://localhost/map/21");
    const res = await worker.fetch(req, { API_VERSION: "2.3" });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.mappings?.id, 21);
    assert.equal(data.mappings?.malId, 21);
    assert.ok(data.mappings?.title);
  });

  // 8. SmartCache and Cloudflare KV integration
  await test("SmartCache handles runtimeEnv and mock Cloudflare KV", async () => {
    const mockKvStore = new Map();
    const mockKv = {
      async get(k) { return mockKvStore.get(k) ?? null; },
      async put(k, v) { mockKvStore.set(k, v); },
      async delete(k) { mockKvStore.delete(k); },
    };

    setRuntimeEnv({
      CACHE_ENABLED: "true",
      CACHE_KV: mockKv,
    });

    const testKey = "test:cf-kv-key";
    set(testKey, { hello: "edge" }, 60_000);
    const entry = get(testKey);
    assert.ok(entry);
    assert.equal(entry.data?.hello, "edge");
    assert.ok(isFresh(entry));

    del(testKey);
    assert.equal(get(testKey), null);

    // Reset runtimeEnv
    setRuntimeEnv({ CACHE_ENABLED: "false" });
  });

  // 9. wreq fallback test
  await test("wreqFetch works cleanly with web fetch fallback", async () => {
    const res = await wreqFetch("https://httpbin.org/get", {
      session: "test-session",
      headers: { "X-Test": "anivexa" },
    }).catch(async () => {
      // Fallback if httpbin is blocked or slow
      return await wreqFetch("https://graphql.anilist.co", {
        session: "test-session",
      });
    });
    assert.ok(res.status === 200 || res.status === 405 || res.status === 400);
  });

  // 10. Extractor registry
  await test("Extractors registry recognizes supported URLs", async () => {
    const vidplay = findVideoExtractor("https://play.echovideo.ru/embed-0/abc123xyz");
    assert.ok(vidplay && vidplay.name === "vidplay");

    const datasv = findVideoExtractor("https://play.echovideo.ru/embed-20/abc123xyz");
    assert.ok(datasv && datasv.name === "datasv");

    const vidmoly = findVideoExtractor("https://vidmoly.to/w/abc123xyz");
    assert.ok(vidmoly && vidmoly.name === "vidmoly");

    const nova = findVideoExtractor("https://nova.upn.one/#abc123xyz");
    assert.ok(nova && nova.name === "nova");
  });

  // 11. Filtered episodes endpoint: /episodes/kaa/21
  await test("Worker GET /episodes/kaa/21 returns episode list", async () => {
    const req = new Request("http://localhost/episodes/kaa/21");
    const res = await worker.fetch(req, { API_VERSION: "2.3" });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.type, "filtered");
    assert.ok(data.kaa);
    assert.ok(Array.isArray(data.kaa.episodes?.sub));
    assert.ok(data.kaa.episodes.sub.length > 0);
  });

  // 12. Watch endpoint: /watch/kaa/21/sub/kaa-1
  await test("Worker GET /watch/kaa/21/sub/kaa-1 returns streams", async () => {
    const req = new Request("http://localhost/watch/kaa/21/sub/kaa-1");
    const res = await worker.fetch(req, { API_VERSION: "2.3" });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.anilistId, 21);
    assert.equal(data.episode, 1);
    assert.equal(data.audio, "sub");
    assert.ok(Array.isArray(data.streams));
    assert.ok(data.streams.length > 0);
    assert.ok(data.streams[0].url);
  });

  console.log(`\n=== Test Summary: ${passed} passed, ${failed} failed ===`);
  if (failed > 0) process.exit(1);
}

runTests().catch((e) => {
  console.error("Test runner failed:", e);
  process.exit(1);
});
