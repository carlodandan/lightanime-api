let runtimeEnv = null;

export function setRuntimeEnv(env) {
  if (env && typeof env === "object") {
    runtimeEnv = env;
    _CACHE_ENABLED = envBool("CACHE_ENABLED", false);
  }
}

// Reads env vars from active Worker env or process.env safely
function readEnv(name) {
  try {
    if (runtimeEnv?.[name] !== undefined) return runtimeEnv[name];
    return typeof process !== "undefined" ? process.env?.[name] : undefined;
  } catch { return undefined; }
}

function envBool(name, fallback) {
  const raw = readEnv(name);
  if (raw === undefined || raw === "") return fallback;
  return ["true", "1", "yes", "on"].includes(String(raw).toLowerCase());
}

function envInt(name, fallback) {
  const raw = readEnv(name);
  const n = Number(raw);
  return raw !== undefined && raw !== "" && Number.isFinite(n) && n > 0 ? n : fallback;
}

export let _CACHE_ENABLED = envBool("CACHE_ENABLED", false);

export function isCacheEnabled() {
  return envBool("CACHE_ENABLED", false);
}

const IS_LOCAL_NODE = (() => {
  try {
    return (
      typeof process !== "undefined" &&
      typeof process.versions?.node === "string" &&
      !process.env.VERCEL &&
      !process.env.CF_PAGES &&
      typeof navigator === "undefined"
    );
  } catch { return false; }
})();

function getUpstashCredentials() {
  const url = readEnv("UPSTASH_REDIS_REST_URL") ?? "";
  const token = readEnv("UPSTASH_REDIS_REST_TOKEN") ?? "";
  return { url, token, enabled: Boolean(url && token) };
}

function getKV() {
  return runtimeEnv?.CACHE_KV ?? runtimeEnv?.KV ?? null;
}

function getRedisTtlMs() {
  return envInt("DEFAULT_REDIS_TTL", 900) * 1000;
}

function encodeEntry(entry) {
  return JSON.stringify(entry, (_, value) => value === Infinity ? "__Infinity__" : value);
}

function decodeEntry(raw) {
  return JSON.parse(raw, (_, value) => value === "__Infinity__" ? Infinity : value);
}

async function redisCommand(command) {
  const creds = getUpstashCredentials();
  if (!creds.enabled || typeof fetch !== "function") return null;
  const res = await fetch(creds.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${creds.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  }).catch(() => null);
  if (!res?.ok) return null;
  const json = await res.json().catch(() => null);
  return json?.result ?? null;
}

async function redisWrite(key, entry) {
  const creds = getUpstashCredentials();
  if (!creds.enabled) return;
  const value = encodeEntry(entry);
  const ttlMs = Number.isFinite(entry.ttl) && entry.ttl > 0 ? entry.ttl : getRedisTtlMs();
  await redisCommand(["SET", key, value, "PX", Math.ceil(ttlMs)]);
}

let diskInitialized = false;
let diskRead  = () => null;
let diskWrite = () => {};
let diskDel   = () => {};

async function initDisk() {
  if (diskInitialized || !IS_LOCAL_NODE) return;
  diskInitialized = true;
  try {
    const fs = await import("node:fs");
    const fsp = await import("node:fs/promises");
    const path = await import("node:path");
    const url = await import("node:url");

    const __dir = path.dirname(url.fileURLToPath(import.meta.url));
    const CACHE_DIR = path.join(__dir, ".cache");
    try { fs.mkdirSync(CACHE_DIR, { recursive: true }); } catch {}

    const keyToPath = (key) =>
      path.join(CACHE_DIR, key.replace(/[^a-zA-Z0-9_-]/g, "_") + ".json");

    diskRead = (key) => {
      try {
        const p = keyToPath(key);
        if (!fs.existsSync(p)) return null;
        return decodeEntry(fs.readFileSync(p, "utf8"));
      } catch { return null; }
    };

    diskWrite = (key, entry) => {
      fsp.writeFile(keyToPath(key), encodeEntry(entry)).catch(() => {});
    };

    diskDel = (key) => {
      fsp.unlink(keyToPath(key)).catch(() => {});
    };
  } catch {}
}

if (IS_LOCAL_NODE) {
  initDisk().catch(() => {});
}

const MAX_MEM = 800;
const mem     = new Map();

function evict() {
  if (mem.size <= MAX_MEM) return;
  const drop = mem.size - MAX_MEM;
  let   n    = 0;
  for (const k of mem.keys()) {
    if (n++ >= drop) break;
    mem.delete(k);
  }
}

export function get(key) {
  if (!isCacheEnabled()) return null;
  let e = mem.get(key);
  if (e) return e;

  e = diskRead(key);
  if (!e) return null;

  mem.set(key, e);
  evict();
  return e;
}

export async function getAsync(key) {
  if (!isCacheEnabled()) return null;
  let e = get(key);
  if (e) return e;

  // Check Cloudflare Workers KV
  const kv = getKV();
  if (kv) {
    try {
      const raw = await kv.get(key);
      if (raw) {
        e = typeof raw === "string" ? decodeEntry(raw) : raw;
        if (!isFresh(e)) {
          kv.delete(key).catch(() => {});
        } else {
          mem.set(key, e);
          evict();
          return e;
        }
      }
    } catch {}
  }

  // Check Upstash Redis
  const raw = await redisCommand(["GET", key]);
  if (!raw) return null;

  try {
    e = typeof raw === "string" ? decodeEntry(raw) : raw;
    if (!isFresh(e)) {
      await delAsync(key);
      return null;
    }
    mem.set(key, e);
    evict();
    diskWrite(key, e);
    return e;
  } catch {
    return null;
  }
}

function setLocal(key, data, ttlMs, refreshAfterMs) {
  const now   = Date.now();
  const entry = {
    data,
    cachedAt:     now,
    ttl:          ttlMs,
    refreshAfter: refreshAfterMs ?? ttlMs,
    expiresAt:    now + ttlMs,
  };
  mem.delete(key);
  mem.set(key, entry);
  evict();
  diskWrite(key, entry);
  return entry;
}

export function set(key, data, ttlMs, refreshAfterMs) {
  if (!isCacheEnabled()) return { data, cachedAt: Date.now(), ttl: ttlMs, refreshAfter: refreshAfterMs ?? ttlMs, expiresAt: Date.now() + ttlMs };
  const entry = setLocal(key, data, ttlMs, refreshAfterMs);
  redisWrite(key, entry).catch(() => {});
  return entry;
}

export async function setAsync(key, data, ttlMs, refreshAfterMs) {
  if (!isCacheEnabled()) return { data, cachedAt: Date.now(), ttl: ttlMs, refreshAfter: refreshAfterMs ?? ttlMs, expiresAt: Date.now() + ttlMs };
  const entry = setLocal(key, data, ttlMs, refreshAfterMs);

  // Write to Cloudflare Workers KV if bound
  const kv = getKV();
  if (kv) {
    try {
      const val = encodeEntry(entry);
      const expTtl = Math.max(60, Math.ceil(ttlMs / 1000));
      await kv.put(key, val, { expirationTtl: expTtl }).catch(() => {});
    } catch {}
  }

  await redisWrite(key, entry);
  return entry;
}

export function isFresh(entry) {
  return entry !== null && entry !== undefined && Date.now() < entry.expiresAt;
}

export function needsRefresh(entry) {
  return !entry || Date.now() - entry.cachedAt > entry.refreshAfter;
}

function delLocal(key) {
  mem.delete(key);
  diskDel(key);
}

export function del(key) {
  delLocal(key);
  const kv = getKV();
  if (kv) kv.delete(key).catch(() => {});
  redisCommand(["DEL", key]).catch(() => {});
}

export async function delAsync(key) {
  delLocal(key);
  const kv = getKV();
  if (kv) await kv.delete(key).catch(() => {});
  await redisCommand(["DEL", key]);
}

export function delByPrefix(prefix) {
  for (const k of [...mem.keys()]) {
    if (k.startsWith(prefix)) mem.delete(k);
  }
}

export async function delByPrefixAsync(prefix) {
  delByPrefix(prefix);
  const kv = getKV();
  if (kv && typeof kv.list === "function") {
    try {
      const list = await kv.list({ prefix });
      if (Array.isArray(list?.keys)) {
        await Promise.all(list.keys.map((k) => kv.delete(k.name).catch(() => {})));
      }
    } catch {}
  }
  const keys = await redisCommand(["KEYS", `${prefix}*`]);
  if (Array.isArray(keys) && keys.length) {
    await redisCommand(["DEL", ...keys]);
  }
}

const MIN  = 60_000;
const HOUR = 60 * MIN;
const DAY  = 24 * HOUR;

export function episodeTTL(status) {
  switch (status) {
    case "FINISHED":         return [7 * DAY,   Infinity];
    case "RELEASING":        return [2 * HOUR,  15 * MIN];
    case "HIATUS":           return [6 * HOUR,  60 * MIN];
    case "NOT_YET_RELEASED": return [30 * MIN,  15 * MIN];
    default:                 return [HOUR,       15 * MIN];
  }
}

export function mapTTL(status) {
  return status === "FINISHED" ? 30 * DAY : 12 * HOUR;
}

export const WATCH_TTL         = 3 * HOUR;
export const SHOW_IDENTITY_TTL = 24 * HOUR;
export const THIRTY_DAYS       = 30 * DAY;
