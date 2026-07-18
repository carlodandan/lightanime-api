import { getAsync, setAsync, isFresh, needsRefresh, episodeTTL, jikanPageTTL } from "./smartcache.js";
import { getEpisodes as mangaEpisodes   } from "../providers/allmanga.js";
import { getEpisodes as aninekoEpisodes } from "../providers/anineko.js";
import { getEpisodes as dhiveEpisodes   } from "../providers/2dhive.js";

const JIKAN = "https://api.jikan.moe/v4";
const UA    = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

const inflight  = new Map();
const bgRunning = new Set();

function dedupe(key, fn) {
  if (inflight.has(key)) return inflight.get(key);
  const p = Promise.resolve().then(fn).finally(() => inflight.delete(key));
  inflight.set(key, p);
  return p;
}

function bg(key, fn) {
  if (bgRunning.has(key)) return;
  bgRunning.add(key);
  Promise.resolve()
    .then(fn)
    .catch(e => console.error(`[bg:${key}]`, e.message))
    .finally(() => bgRunning.delete(key));
}

async function jikanPage(malId, pageNum, retries = 3) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const res = await fetch(`${JIKAN}/anime/${malId}/episodes?page=${pageNum}`, { headers: { "User-Agent": UA, Accept: "application/json" } }).catch(() => null);
    if (!res) return null;
    if (res.status === 429) {
      const wait = (parseInt(res.headers.get("Retry-After") ?? "1") || 1) * 1000 + attempt * 600;
      if (attempt < retries) { await new Promise(r => setTimeout(r, wait)); continue; }
      return null;
    }
    if (!res.ok) return null;
    return res.json();
  }
  return null;
}

export function fetchAllJikanWithCache(malId, status) {
  return dedupe(`jikan:${malId}`, () => _jikanAll(malId, status));
}

async function _jikanAll(malId, status) {
  const metaKey = `jm:${malId}`;
  const meta    = await getAsync(metaKey);
  const isFinished      = status === "FINISHED";
  const mustCheckTotal  = !isFinished && (!meta || needsRefresh(meta));
  let   lastPage        = meta?.data?.lastPage ?? null;

  if (mustCheckTotal || !lastPage) {
    const p1 = await jikanPage(malId, 1);
    if (!p1 && !lastPage) return [];
    if (!p1 && lastPage)  return _buildPages(malId, lastPage, status);

    const newLast  = p1.pagination?.last_visible_page ?? 1;
    const isP1Last = newLast === 1;
    const [p1ttl, p1ref] = jikanPageTTL(isP1Last, status);
    await setAsync(`jp:${malId}:1`, p1.data ?? [], p1ttl, p1ref);

    if (lastPage && newLast > lastPage) {
      const [stableTtl] = jikanPageTTL(false, "FINISHED");
      const oldLastEntry = await getAsync(`jp:${malId}:${lastPage}`);
      if (oldLastEntry) await setAsync(`jp:${malId}:${lastPage}`, oldLastEntry.data, stableTtl, Infinity);

      await Promise.all(
        Array.from({ length: newLast - lastPage }, (_, i) => {
          const pn     = lastPage + 1 + i;
          const isLast = pn === newLast;
          return jikanPage(malId, pn).then(pd => {
            const [t, r] = jikanPageTTL(isLast, status);
            return setAsync(`jp:${malId}:${pn}`, pd?.data ?? [], t, r);
          });
        })
      );
    }
    const [mttl, mref] = episodeTTL(status);
    await setAsync(metaKey, { lastPage: newLast }, mttl, mref);
    lastPage = newLast;
  }
  return _buildPages(malId, lastPage, status);
}

async function _buildPages(malId, lastPage, status) {
  const pages = await Promise.all(
    Array.from({ length: lastPage }, (_, i) => i + 1).map(async pn => {
      const key    = `jp:${malId}:${pn}`;
      const isLast = pn === lastPage;
      const entry  = await getAsync(key);

      if (isFresh(entry)) {
        if (isLast && status === "RELEASING" && needsRefresh(entry)) {
          bg(key, async () => {
            const pd = await jikanPage(malId, pn);
            if (pd) {
              const [t, r] = jikanPageTTL(true, status);
              await setAsync(key, pd.data ?? [], t, r);
            }
          });
        }
        return entry.data;
      }
      const pd   = await jikanPage(malId, pn);
      const data = pd?.data ?? [];
      const [t, r] = jikanPageTTL(isLast, status);
      await setAsync(key, data, t, r);
      return data;
    })
  );
  return pages.flat();
}

async function withCache(key, status, fetchFn) {
  const [ttl, refreshAfter] = episodeTTL(status);
  const entry = await getAsync(key);

  if (isFresh(entry)) {
    if (needsRefresh(entry)) {
      bg(key, async () => {
        const data = await fetchFn();
        await setAsync(key, data, ttl, refreshAfter);
      });
    }
    return entry.data;
  }
  const data = await fetchFn();
  await setAsync(key, data, ttl, refreshAfter);
  return data;
}

async function safe(label, fn) {
  try { return { ok: true,  data: await fn() }; }
  catch (e) { return { ok: false, error: e.message, stack: e.stack }; }
}

const PROVIDER_ALIASES = {
  allmanga: "allmanga",
  anineko:  "anineko",
  "2dhive": "2dhive",
};

export function resolveProviders(rawNames) {
  const resolved = new Set();
  const unknown  = [];
  for (const raw of rawNames) {
    const name = PROVIDER_ALIASES[raw.toLowerCase()];
    if (name) resolved.add(name);
    else unknown.push(raw);
  }
  return { resolved, unknown };
}

function providerFns(anilistId, status, ctx) {
  return {
    allmanga: () => withCache(`epv:manga:${anilistId}`,   status, () => mangaEpisodes(anilistId, ctx)),
    anineko:  () => withCache(`epv:anineko:${anilistId}`, status, () => aninekoEpisodes(anilistId, ctx)),
    "2dhive": () => withCache(`epv:2dhive:${anilistId}`,  status, () => dhiveEpisodes(anilistId, ctx)),
  };
}

export async function buildFilteredEpisodesWithCache(anilistId, providers, media, anizip) {
  const status = media?.status ?? "RELEASING";
  const malId  = media?.idMal  ?? null;
  const jikanEps = malId ? await fetchAllJikanWithCache(malId, status).catch(() => null) : null;
  const ctx  = { media, anizip, jikanEps };
  const fns  = providerFns(anilistId, status, ctx);

  const pairs = await Promise.all(
    [...providers].map(async (name) => {
      const result = await safe(name, fns[name]);
      return [name, result.ok ? result.data : { error: result.error }];
    })
  );
  return Object.fromEntries(pairs);
}

export async function buildEpisodesWithCache(anilistId, media, anizip) {
  const status = media?.status ?? "RELEASING";
  const malId  = media?.idMal  ?? null;
  const jikanEps = malId ? await fetchAllJikanWithCache(malId, status).catch(() => null) : null;
  const ctx = { media, anizip, jikanEps };

  const [manga, anineko, dhive] = await Promise.all([
    safe("allmanga", () => withCache(`epv:manga:${anilistId}`,   status, () => mangaEpisodes(anilistId, ctx))),
    safe("anineko",  () => withCache(`epv:anineko:${anilistId}`, status, () => aninekoEpisodes(anilistId, ctx))),
    safe("2dhive",   () => withCache(`epv:2dhive:${anilistId}`,  status, () => dhiveEpisodes(anilistId, ctx))),
  ]);

  return {
    allmanga: manga.ok   ? manga.data   : { error: manga.error },
    anineko:  anineko.ok ? anineko.data : { error: anineko.error },
    "2dhive": dhive.ok   ? dhive.data   : { error: dhive.error },
  };
}