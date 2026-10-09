# Cloudflare Workers Migration Guide & Architecture Specification

## 1. Migration Overview & Objectives

The goal of this migration is to make the **Anivexa API** (`lightanime-api`) fully deployable on **Cloudflare Workers** (the V8-isolate `workerd` runtime) as a first-class citizen, while:
1. Retaining 100% functional parity across all 12 providers and 7 extractors.
2. Adapting runtime logic to operate cleanly within V8 isolate constraints (no native binary addons, no filesystem access, no process spawning).
3. Providing edge-native enhancements:
   - Full support for `env` bindings (in addition to `process.env`).
   - Native Cloudflare Workers KV caching support (`CACHE_KV`).
   - Self-contained static documentation and landing page serving directly from the Worker.
   - Graceful fallback for anti-bot / TLS fingerprinting (`wreq-js` -> standard fetch session with cookie jar).
   - Reliable background tasks using `ctx.waitUntil`.

---

## 2. Incompatibility Matrix & Remediation Strategy

| Component | Node.js Implementation | Cloudflare Workers Issue | Migration Remediation |
|---|---|---|---|
| **Runtime Environment** | `process.env`, `server.js` with `http.createServer` | Workers receive environment variables in `env` per request; no `node:http` server | Update `smartcache.js` and `index.js` to accept `env`. Maintain `server.js` for local dev while `index.js` serves as the primary Worker entry point. |
| **Fingerprint Client (`wreq.js`)** | `wreq-js` (Rust NAPI native compiled addon `.node`) | Native binary addons cannot be loaded in V8 isolates (`Error: Cannot find module '@wreq-js/binding...'`) | Wrap `wreq-js` import with graceful fallback to a Web-Standard Fetch Session implementation that maintains cookie state and browser headers. |
| **AnimeDunya Provider** | `import child_process from "node:child_process"`; `child_process.execSync("curl ...")` | `node:child_process` does not exist in Cloudflare Workers | Remove static import of `node:child_process`. Convert `fetchHtml` to standard `async` web `fetch` with browser headers and redirects. |
| **MegaPlay Extractor** | `import vm from "node:vm"`; `vm.runInNewContext(...)` | `node:vm` in Workers is a non-functional stub | Safely guard `vm.runInNewContext` to prevent unhandled runtime errors; fallback gracefully when dynamic eval is restricted. |
| **Disk Caching** | Top-level `await import("node:fs")` in `smartcache.js` | Filesystem does not exist in V8 isolates; top-level import causes bundler warnings | Guard filesystem logic; prevent static bundling of disk I/O in worker builds. |
| **Distributed Caching** | Upstash Redis REST API only | Redis requires external HTTP roundtrips | Retain Upstash Redis REST support, plus add native support for Cloudflare Workers KV (`CACHE_KV`) as zero-latency edge cache. |
| **Static Documentation** | `server.js` reads HTML/CSS from disk | Deploying worker directly would return 404 for docs and landing pages | In-worker static asset server module providing `/`, `/docs`, `/style.css`, and `/logo.svg`. |

---

## 3. Structural & Code Changes

### 3.1 `core/wreq.js` (Resilient Web Fetch Fallback)
When running on Node.js with native addon support, `wreq-js` can load and provide TLS fingerprint spoofing.
When running in Cloudflare Workers or environments where native binaries fail to load:
- Catch the import error without throwing.
- Fallback to an in-memory session manager with cookie jar support and spoofed Chrome headers.
- Export identical interface: `wreqFetch(url, options)` and `closeWreqSessions()`.

### 3.2 `providers/animedunya.js` (Pure Fetch Transition)
- Remove `import child_process from "node:child_process"`.
- Implement `async function fetchHtml(url)` using standard `fetch()` with Chrome headers (`Accept`, `Accept-Language`, `User-Agent`).
- Update callers `getEpisodes` and `handleWatch` to `await fetchHtml(...)`.

### 3.3 `extractors/megaplay.js` (Safe VM Stub Handling)
- Wrap `vm.runInNewContext` in a safe capability check (`typeof vm?.runInNewContext === "function"`).
- Return `null` safely if VM execution fails or is not supported by the runtime, allowing fallback source resolution.

### 3.4 `core/smartcache.js` (Edge Multi-Tier Cache with KV)
- Dynamic environment variable resolution: checks both `runtimeEnv` (from Worker `env`) and `process.env`.
- Storage Tiers:
  1. **Memory Map**: L1 cache within isolate lifetime.
  2. **Cloudflare KV (`env.CACHE_KV`)**: Zero-latency edge storage across Cloudflare data centers.
  3. **Upstash Redis REST**: Distributed fallback storage over HTTPS.
  4. **Disk Cache**: Local Node.js development only.
- Expose `setRuntimeEnv(env)` so every Worker request initializes the active credentials.

### 3.5 Documentation Serving in Worker (`docs/static-assets.js` & `index.js`)
- Bundle the documentation (`landing.html`, `index.html`, `style.css`, `logo.svg`) in a static assets helper.
- Update `index.js`:
  - When a browser accesses `GET /` with `Accept: text/html`, serve `landing.html`.
  - When accessing `GET /docs`, serve `index.html`.
  - Serve `/style.css` and `/logo.svg` directly.
  - Return JSON API summary when `Accept: application/json` or for API clients.

### 3.6 Cloudflare Workers Configuration (`wrangler.jsonc` & `wrangler.toml`)
Provide configuration with:
- `nodejs_compat` enabled.
- Default environment variables and version.
- Optional KV namespace binding template (`CACHE_KV`).

---

## 4. Local Testing & Deployment Guide

### 4.1 Running with Wrangler Locally
```bash
# Start local Cloudflare Workers emulator
npx wrangler dev
```

### 4.2 Deploying to Cloudflare
```bash
# Login to Cloudflare
npx wrangler login

# Deploy the worker to production
npx wrangler deploy
```

### 4.3 Optional: Setting up Cloudflare Workers KV
```bash
# Create KV namespace for caching
npx wrangler kv namespace create CACHE_KV

# Add the resulting ID to wrangler.jsonc:
# "kv_namespaces": [{ "binding": "CACHE_KV", "id": "<YOUR_NAMESPACE_ID>" }]
```

---

## 5. Verification Checklist

- [x] `GET /` returns JSON or Landing HTML depending on Accept header.
- [x] `GET /docs` serves interactive documentation UI.
- [x] `GET /style.css` and `GET /logo.svg` return appropriate content types.
- [x] `GET /map/21` returns correct cross-platform metadata mappings.
- [x] `GET /episodes/kaa/21` returns episode arrays without error.
- [x] `GET /watch/kaa/21/sub/kaa-1` extracts playable stream URLs.
- [x] MKissa, Senshi, and Ani.pm handle requests cleanly with fallback session manager.
- [x] AnimeDunya functions without `node:child_process`.
- [x] MegaPlay runs without crashing in VM stub mode.
- [x] Local Node.js dev server (`node server.js`) continues to work seamlessly.
