import { forgetMedia, getMedia } from "./anilist.js";
import { mapAnimeIds } from "./mapper.js";
import { buildEpisodesWithCache, buildFilteredEpisodesWithCache } from "./episode-strategy.js";
import { get, set, getAsync, setAsync, needsRefresh, delAsync } from "./smartcache.js";

const ANIZIP = "https://api.ani.zip/mappings";
const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;
const FULL_TTL = 30 * DAY;
const NORMAL_PROBE_INTERVAL = 15 * MIN;

const refreshing = new Set();

function runBackground(env, promise) {
  const waitUntil = env?.context?.waitUntil ?? env?.waitUntil;
  if (typeof waitUntil === "function") waitUntil.call(env.context ?? env, promise);
  else promise.catch(() => {});
}

function latestEpisodeFromResponse(data) {
  let max = 0;
  for (const provider of Object.values(data ?? {})) {
    const episodes = provider?.episodes;
    if (!episodes || typeof episodes !== "object") continue;
    for (const list of Object.values(episodes)) {
      if (!Array.isArray(list)) continue;
      for (const ep of list) {
        const n = Number(ep?.number);
        if (Number.isFinite(n) && n > max) max = n;
      }
    }
  }
  return max || null;
}

function hasCurrentProviders(data) {
  return data && Object.prototype.hasOwnProperty.call(data, "2dhive");
}

function resolveShared(anilistId, freshMedia = false) {
  if (freshMedia) forgetMedia(anilistId);
  return Promise.all([
    getMedia(anilistId).catch(() => null),
    fetch(`${ANIZIP}?anilist_id=${anilistId}`).then((r) => r.json()).catch(() => null),
  ]);
}

async function buildResponse(anilistId, media, anizip, forceRefresh = false) {
  if (forceRefresh) {
    for (const p of ["manga", "anineko", "2dhive"]) await delAsync(`epv:${p}:${anilistId}`);
  }
  const [providerResult, mappingResult] = await Promise.all([
    buildEpisodesWithCache(anilistId, media, anizip),
    mapAnimeIds(anilistId).catch(() => null),
  ]);
  return { page: 1, type: "all", mappings: mappingResult?.mappings ?? null, ...providerResult };
}

export async function getEpisodesResponse(anilistId, env) {
  const cacheKey = `episodes:${anilistId}`;
  const entry = await getAsync(cacheKey);

  if (entry && hasCurrentProviders(entry.data)) return entry.data;

  const [media, anizip] = await resolveShared(anilistId);
  const result = await buildResponse(anilistId, media, anizip);
  await setAsync(cacheKey, result, FULL_TTL, NORMAL_PROBE_INTERVAL);
  return result;
}

export async function getFilteredEpisodesResponse(anilistId, providers, includeMap) {
  const [media, anizip] = await resolveShared(anilistId);
  const [providerResult, mappingResult] = await Promise.all([
    buildFilteredEpisodesWithCache(anilistId, providers, media, anizip),
    includeMap ? mapAnimeIds(anilistId).catch(() => null) : Promise.resolve(null),
  ]);
  return { page: 1, type: "filtered", ...(includeMap ? { mappings: mappingResult?.mappings ?? null } : {}), ...providerResult };
}