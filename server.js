import express from "express";
import cors from "cors";
import crypto from "node:crypto";

const app = express();
app.use(cors());

const BASE = "https://reanime.to";
const FLIX = "https://flixcloud.cc";
const _UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
const HEADERS = { "User-Agent": _UA, "Accept": "application/json, */*" };

// --- Error Handler Wrapper for Async Routes ---
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// --- HTTP Client Helper ---
async function _get(path, params = {}) {
  const url = new URL(BASE + path);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.append(k, v);
  });
  
  const r = await fetch(url.toString(), { headers: HEADERS });
  if (r.status === 404) throw { status: 404, message: "Not found" };
  if (!r.ok) {
    const text = await r.text();
    throw { status: r.status, message: text.slice(0, 300) };
  }
  return r.json();
}

// --- Decryption Utilities ---
function sha256hex(s) {
  return crypto.createHash("sha256").update(s).digest("hex");
}

function rt(b64) {
  return Buffer.from(b64, "base64");
}

function le(seed) {
  let e = seed, l = seed;
  for (let i = 0; i < 3; i++) e = sha256hex(e + i);
  l = e;
  for (let i = 0; i < 3; i++) l = sha256hex(l + i);
  return {
    keyField:      "kf_"  + e.substring(8,  16),
    ivField:       "ivf_" + e.substring(16, 24),
    containerName: "cd_"  + e.substring(24, 32),
    arrayName:     "ad_"  + e.substring(32, 40),
    objectName:    "od_"  + e.substring(40, 48),
    tokenField:    e.substring(48, 64) + "_" + e.substring(56, 64),
    keyFrag2Field: l.substring(0, 16)  + "_" + l.substring(16, 24),
  };
}

async function runWasm(wasmB64, frag1, kf2, T_bytes, seedInt) {
  const { instance } = await WebAssembly.instantiate(rt(wasmB64));
  const { _s, _r, memory } = instance.exports;
  const h = new Uint8Array(memory.buffer);
  const len = frag1.length;
  const [y, v, T, out] = [1000, 1000 + len, 1000 + 2 * len, 1000 + 3 * len];
  h.set(frag1, y);
  h.set(kf2, v);
  h.set(T_bytes, T);
  _s(seedInt);
  _r(y, v, T, out, len);
  return Buffer.from(h.subarray(out, out + len));
}

function extractSsrObj(html) {
  const m = html.match(/\{type:"data",data:(\{)/);
  if (!m) throw new Error("SSR data block not found");
  let depth = 0;
  const start = html.indexOf("{", m.index + m[0].length - 1);
  for (let i = start; i < html.length; i++) {
    if (html[i] === "{") depth++;
    else if (html[i] === "}") {
      if (--depth === 0) return html.slice(start, i + 1);
    }
  }
  throw new Error("SSR brace matching failed");
}

async function decryptEmbed(html) {
  const data = eval("(" + extractSsrObj(html) + ")");
  const seed = data.obfuscation_seed;
  const fields = le(seed);
  const ocd = data.obfuscated_crypto_data;
  const obj = ocd[fields.containerName][fields.arrayName][0][fields.objectName];
  
  const frag1 = rt(obj[fields.keyField]);
  const iv = rt(obj[fields.ivField]);
  const kf2 = rt(data[fields.keyFrag2Field]);
  const token = data[fields.tokenField];

  if (!token) throw new Error("Token field missing from embed data");

  const rTok = await fetch(`${FLIX}/api/m3u8/${token}`, { 
    headers: { ...HEADERS, Referer: `${BASE}/` } 
  });
  const tokData = await rTok.json();

  const vidKey = sha256hex(token + "vid").substring(0, 10);
  const keyKey = sha256hex(token + "key").substring(0, 10);
  const v_bytes = rt(tokData[vidKey]);
  const T_bytes = rt(tokData[keyKey]);

  if (!v_bytes.length || !T_bytes.length)
    throw new Error(`Token missing fields. Got: ${Object.keys(tokData).join(",")}`);

  const wasmOut = await runWasm(data.w_payload, frag1, kf2, T_bytes, parseInt(seed.substring(0, 8), 16));
  const pbk = crypto.pbkdf2Sync(wasmOut, seed, 1000, 32, "sha256");
  const r = Buffer.from(pbk);
  for (let i = 0; i < 32; i++) r[i] ^= seed.charCodeAt(i % seed.length);
  const aesKey = crypto.createHash("sha256").update(r).digest();

  const decipher = crypto.createDecipheriv("aes-256-cbc", aesKey, iv);
  const url = Buffer.concat([decipher.update(v_bytes), decipher.final()]).toString("utf8").trim();

  if (!url.startsWith("http")) throw new Error(`Unexpected URL: ${url}`);

  return {
    url,
    subtitles: data.subtitles ?? [],
    thumbnails_vtt: data.thumbnails_vtt ?? null,
    video_title: data.video_title ?? null,
    intro_chapter: data.intro_chapter ?? null,
    outro_chapter: data.outro_chapter ?? null,
    video_id: data.video_id ?? null,
  };
}

async function getStreamUrl(access_id, v = 2) {
  const r = await fetch(`${FLIX}/e/${access_id}?v=${v}`, {
    headers: { ...HEADERS, Referer: `${BASE}/` }
  });
  if (!r.ok) throw { status: r.status, message: `Embed fetch failed: ${r.status}` };
  return await decryptEmbed(await r.text());
}

// --- Anime Utility Functions ---
function getAnilistId(anime) {
  if (!anime) return null;
  if (anime.anilist) return parseInt(anime.anilist, 10);
  
  for (const key of ["extra_large", "large", "medium"]) {
    const url = anime.cover_image?.[key] || "";
    const m = url.match(/\/bx(\d+)-/);
    if (m) return parseInt(m[1], 10);
  }
  return null;
}

async function fetchServers(slug, ep, anilist_id) {
  let aid = anilist_id;
  if (!aid) {
    const meta = await _get(`/api/v1/anime/${slug}/meta`);
    aid = getAnilistId(meta.anime || meta);
  }
  if (!aid) throw { status: 404, message: "Could not determine Anilist ID for this slug" };

  let flix;
  try {
    flix = await _get(`/api/flix/${aid}/${ep}`);
  } catch (e) {
    throw { status: 502, message: "Flix API unavailable" };
  }

  const servers = (flix.success && flix.servers) ? flix.servers : [];
  const order = { "HD-2": 0, "HD-1": 1 };
  const sortLinks = (arr) => arr.sort((a, b) => (order[a.serverName] ?? 9) - (order[b.serverName] ?? 9));

  return {
    sub: sortLinks(servers.filter(s => ["sub", "s-sub"].includes(s.dataType))),
    dub: sortLinks(servers.filter(s => ["dub", "s-dub"].includes(s.dataType))),
    anime: null,
    current: null,
    duration: null,
    intro_start: null,
    intro_end: null,
    outro_start: null,
    outro_end: null,
    anilist_id: aid,
  };
}


// --- Express Routes ---

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    endpoints: {
      search: "GET /search?q=...&limit=20",
      home: "GET /home?limit=20",
      top: "GET /top?period=today|week|month&limit=10",
      schedule: "GET /schedule?tz=Asia/Manila&year=2026&month=7",
      info: "GET /info/:slug",
      episodes: "GET /episodes/:slug",
      servers: "GET /servers/:slug/:episode?anilist_id=...",
      stream: "GET /stream/:access_id?v=2",
      stream_link: "GET /stream/from-link?link={flixcloud_url}",
      thumbnails: "GET /thumbnails/:anilist_id",
      recommendations: "GET /recommendations/:slug",
    },
  });
});

app.get("/search", asyncHandler(async (req, res) => {
  const { q, limit = 20, offset = 0 } = req.query;
  if (!q) return res.status(400).json({ detail: "Query 'q' is required" });
  res.json(await _get("/api/v1/search", { q, limit, offset }));
}));

app.get("/home", asyncHandler(async (req, res) => {
  res.json(await _get("/api/v1/home", { limit: req.query.limit || 20 }));
}));

app.get("/top", asyncHandler(async (req, res) => {
  const { period = "week", limit = 10 } = req.query;
  res.json(await _get("/api/v1/top/anime", { period, limit }));
}));

app.get("/schedule", asyncHandler(async (req, res) => {
  const now = new Date();
  const defaultYear = now.getFullYear().toString();
  const defaultMonth = (now.getMonth() + 1).toString();
  const defaultTz = "Asia/Manila";
  const { tz = defaultTz, year = defaultYear, month = defaultMonth } = req.query;
  res.json(await _get("/api/v1/schedule", { tz, year, month }));
}));

app.get("/info/:slug", asyncHandler(async (req, res) => {
  const [meta, eps] = await Promise.all([
    _get(`/api/v1/anime/${req.params.slug}/meta`),
    _get(`/api/v1/anime/${req.params.slug}/episodes`, { limit: 2000 })
  ]);
  const anime = meta.anime || meta;
  const ep_list = Array.isArray(eps) ? eps : (eps.data || eps.episodes || []);
  res.json({ ...anime, episodes: ep_list, anilist_id: getAnilistId(anime) });
}));

app.get("/episodes/:slug", asyncHandler(async (req, res) => {
  const data = await _get(`/api/v1/anime/${req.params.slug}/episodes`, { limit: req.query.limit || 2000 });
  res.json(Array.isArray(data) ? data : (data.data || data.episodes || data));
}));

app.get("/servers/:slug/:episode", asyncHandler(async (req, res) => {
  const { slug, episode } = req.params;
  const anilist_id = req.query.anilist_id ? parseInt(req.query.anilist_id, 10) : null;
  res.json(await fetchServers(slug, episode, anilist_id));
}));

app.get("/stream/from-link", asyncHandler(async (req, res) => {
  const link = req.query.link;
  if (!link) return res.status(400).json({ detail: "Query 'link' is required" });
  const m = link.match(/\/e\/([^?#\s]+)\?v=(\d+)/);
  if (!m) return res.status(400).json({ detail: "Expected URL: https://flixcloud.cc/e/{id}?v={1|2}" });
  res.json(await getStreamUrl(m[1], parseInt(m[2], 10)));
}));

app.get("/stream/:access_id", asyncHandler(async (req, res) => {
  res.json(await getStreamUrl(req.params.access_id, req.query.v ? parseInt(req.query.v, 10) : 2));
}));

app.get("/thumbnails/:anilist_id", asyncHandler(async (req, res) => {
  res.json(await _get(`/api/thumbnails/${req.params.anilist_id}`));
}));

app.get("/recommendations/:slug", asyncHandler(async (req, res) => {
  res.json(await _get(`/api/v1/anime/${req.params.slug}/recommendations`));
}));

// ========== NEW PROXY ROUTES (with /api prefix and query param) ==========
// These routes accept the full CDN URL as ?url= and rewrite the manifest/segment requests

app.get("/api/proxy/manifest", asyncHandler(async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ detail: "Missing ?url=..." });

  // Fetch the manifest from the CDN
  const response = await fetch(url, {
    headers: { ...HEADERS, Referer: `${BASE}/` }
  });
  if (!response.ok) {
    throw { status: response.status, message: "Failed to fetch manifest" };
  }
  let manifest = await response.text();

  // Rewrite all .ts segment URIs to go through our segment proxy
  const baseUrl = new URL(url).origin;
  const segmentRegex = /(https?:\/\/[^\s"']+\.ts)|([^/\s"']+\.ts)/g;
  manifest = manifest.replace(segmentRegex, (match) => {
    const absolute = match.startsWith('http') ? match : new URL(match, baseUrl).href;
    return `/api/proxy/segment?url=${encodeURIComponent(absolute)}`;
  });

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Content-Type', 'application/vnd.apple.mpegurl');
  res.send(manifest);
}));

app.get("/api/proxy/segment", asyncHandler(async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ detail: "Missing ?url=..." });

  const response = await fetch(url, {
    headers: { ...HEADERS, Referer: `${BASE}/` }
  });
  if (!response.ok) {
    throw { status: response.status, message: "Segment fetch failed" };
  }
  const data = await response.arrayBuffer();
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Content-Type', response.headers.get('content-type') || 'video/MP2T');
  res.send(Buffer.from(data));
}));

// ========== LEGACY PROXY ROUTES (keep for backward compatibility) ==========
// These use the old /proxy/:accessId/... path – you may remove them later
app.get("/proxy/:accessId/manifest.m3u8", asyncHandler(async (req, res) => {
  const { accessId } = req.params;
  const v = req.query.v ? parseInt(req.query.v) : 2;
  // We need to get the original stream URL from the accessId
  const streamData = await getStreamUrl(accessId, v);
  const originalUrl = streamData.url;

  const response = await fetch(originalUrl, {
    headers: { ...HEADERS, Referer: `${BASE}/` }
  });
  if (!response.ok) {
    throw { status: response.status, message: "Failed to fetch manifest" };
  }
  let manifest = await response.text();

  const baseUrl = new URL(originalUrl).origin;
  const segmentRegex = /(https?:\/\/[^\s"']+\.ts)|([^/\s"']+\.ts)/g;
  manifest = manifest.replace(segmentRegex, (match) => {
    const absolute = match.startsWith('http') ? match : new URL(match, baseUrl).href;
    return `/proxy/${accessId}/segment?url=${encodeURIComponent(absolute)}`;
  });

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Content-Type', 'application/vnd.apple.mpegurl');
  res.send(manifest);
}));

app.get("/proxy/:accessId/segment", asyncHandler(async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ detail: "Missing ?url=..." });

  const response = await fetch(url, {
    headers: { ...HEADERS, Referer: `${BASE}/` }
  });
  if (!response.ok) {
    throw { status: response.status, message: "Segment fetch failed" };
  }
  const data = await response.arrayBuffer();
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Content-Type', response.headers.get('content-type') || 'video/MP2T');
  res.send(Buffer.from(data));
}));

// Global Error Handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ detail: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`LightAnime API running on ${PORT}`));