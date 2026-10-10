const __name = (fn, _) => fn;

var resolved = new Map();
var inflight = new Map();
var UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
var ARM = "https://arm.haglund.dev/api/v2/ids";
var ANIZIP = "https://api.ani.zip/mappings";
var KITSU = "https://kitsu.io/api/edge/anime";
var ANILIST_WEB = "https://anilist.co";

const AL_STATUS_MAP = {
  RELEASING: "RELEASING",
  FINISHED: "FINISHED",
  NOT_YET_RELEASED: "NOT_YET_RELEASED",
  CANCELLED: "FINISHED",
  HIATUS: "HIATUS",
};

function cookiesFromHeaders(headers) {
  const values = typeof headers.getSetCookie === "function" ? headers.getSetCookie() : [headers.get("set-cookie")].filter(Boolean);
  return values.map((value) => String(value).split(";")[0]).join("; ");
}

async function mediaFromResponse(res) {
  if (!res?.ok) return null;
  try {
    const json = await res.json();
    return json.data?.Media ?? null;
  } catch {
    return null;
  }
}

async function fetchFromAniListWeb(body) {
  try {
    const home = await fetch(`${ANILIST_WEB}/`, {
      headers: { "User-Agent": UA, Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" },
      signal: AbortSignal.timeout(3000),
    }).catch(() => null);
    if (!home?.ok) return null;
    const html = await home.text();
    const token = html.match(/window\.al_token\s*=\s*"([^"]+)"/)?.[1];
    const cookie = cookiesFromHeaders(home.headers);
    if (!token || !cookie) return null;
    const res = await fetch(`${ANILIST_WEB}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": UA,
        Referer: `${ANILIST_WEB}/home`,
        "x-csrf-token": token,
        schema: "default",
        Cookie: cookie,
      },
      body,
      signal: AbortSignal.timeout(3000),
    }).catch(() => null);
    return mediaFromResponse(res);
  } catch {
    return null;
  }
}

async function fetchFromAniList(id) {
  const fullQuery = `query($id:Int){Media(id:$id,type:ANIME){id idMal title{english romaji native} status format episodes seasonYear startDate{year} genres synonyms nextAiringEpisode{episode airingAt timeUntilAiring}}}`;
  const body = JSON.stringify({ query: fullQuery, variables: { id } });
  try {
    const res = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body,
      signal: AbortSignal.timeout(3500),
    }).catch(() => null);
    const media = await mediaFromResponse(res);
    if (media) return media;
  } catch {}
  return fetchFromAniListWeb(body);
}

async function fetchFallbackMedia(id, arm, anizip) {
  try {
    const kitsuId = anizip?.mappings?.kitsu_id ?? arm?.kitsu;
    let kAttr = null;
    if (kitsuId) {
      const kRes = await fetch(`${KITSU}/${kitsuId}`, {
        headers: { Accept: "application/vnd.api+json,application/json" },
        signal: AbortSignal.timeout(3000),
      }).catch(() => null);
      if (kRes?.ok) {
        const kJson = await kRes.json().catch(() => null);
        kAttr = kJson?.data?.attributes;
      }
    }

    const titles = anizip?.titles || {};

    const enTitle = kAttr?.titles?.en || titles.en || kAttr?.canonicalTitle || null;
    const apSlug = (anizip?.mappings?.animeplanet_id || arm?.["anime-planet"] || "")
      .replace(/-/g, " ")
      .trim();
    const romTitle =
      kAttr?.titles?.en_jp ||
      (apSlug ? apSlug : null) ||
      titles["x-jat"] ||
      titles.en ||
      kAttr?.canonicalTitle ||
      null;
    const natTitle = kAttr?.titles?.ja_jp || titles.ja || null;

    if (!enTitle && !romTitle && !natTitle) {
      return null;
    }

    const allSynonyms = new Set();
    if (Array.isArray(kAttr?.abbreviatedTitles)) {
      for (const t of kAttr.abbreviatedTitles) if (t) allSynonyms.add(t);
    }
    for (const val of Object.values(titles)) {
      if (typeof val === "string" && val.length > 1) allSynonyms.add(val);
    }
    if (enTitle) allSynonyms.add(enTitle);
    if (romTitle) allSynonyms.add(romTitle);
    if (natTitle) allSynonyms.add(natTitle);
    if (apSlug) allSynonyms.add(apSlug);

    const startYear = kAttr?.startDate
      ? Number(String(kAttr.startDate).split("-")[0]) || null
      : null;
    const rawSubtype = (kAttr?.subtype || anizip?.mappings?.type || "TV").toUpperCase();
    const format =
      rawSubtype === "MOVIE"
        ? "MOVIE"
        : rawSubtype === "OVA"
        ? "OVA"
        : rawSubtype === "ONA"
        ? "ONA"
        : rawSubtype === "SPECIAL"
        ? "SPECIAL"
        : "TV";

    const status =
      kAttr?.status === "current"
        ? "RELEASING"
        : kAttr?.status === "finished"
        ? "FINISHED"
        : "RELEASING";

    const episodes =
      typeof kAttr?.episodeCount === "number" && kAttr.episodeCount > 0
        ? kAttr.episodeCount
        : typeof anizip?.episodeCount === "number" && anizip.episodeCount > 0
        ? anizip.episodeCount
        : null;

    return {
      id: Number(id),
      idMal: anizip?.mappings?.mal_id ?? arm?.myanimelist ?? null,
      title: {
        english: enTitle,
        romaji: romTitle,
        native: natTitle,
      },
      status,
      format,
      episodes,
      seasonYear: startYear,
      startDate: startYear ? { year: startYear } : null,
      genres: [],
      nextAiringEpisode: null,
      synonyms: Array.from(allSynonyms),
    };
  } catch (err) {
    console.error(`[media-fallback:${id}]`, err.message);
    return null;
  }
}

async function getMedia(anilistId) {
  const id = Number(anilistId);
  if (!id || Number.isNaN(id)) throw new Error(`Invalid AniList ID: ${anilistId}`);
  if (resolved.has(id)) return resolved.get(id);
  if (inflight.has(id)) return inflight.get(id);

  const promise = (async () => {
    const [arm, anizip, al] = await Promise.all([
      fetch(`${ARM}?source=anilist&id=${id}`, {
        headers: { "User-Agent": UA, Accept: "application/json" },
        signal: AbortSignal.timeout(3000),
      })
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
      fetch(`${ANIZIP}?anilist_id=${id}`, {
        headers: { "User-Agent": UA, Accept: "application/json" },
        signal: AbortSignal.timeout(3000),
      })
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
      fetchFromAniList(id).catch(() => null),
    ]);

    let media = null;
    if (al) {
      const allSynonyms = new Set(Array.isArray(al.synonyms) ? al.synonyms : []);
      if (anizip?.titles) {
        for (const val of Object.values(anizip.titles)) {
          if (typeof val === "string" && val.length > 1) allSynonyms.add(val);
        }
      }
      media = {
        id,
        idMal: al.idMal ?? anizip?.mappings?.mal_id ?? arm?.myanimelist ?? null,
        title: {
          english: al.title?.english ?? anizip?.titles?.en ?? null,
          romaji: al.title?.romaji ?? anizip?.titles?.["x-jat"] ?? null,
          native: al.title?.native ?? anizip?.titles?.ja ?? null,
        },
        status: AL_STATUS_MAP[al.status] ?? "RELEASING",
        format: al.format ?? anizip?.mappings?.type ?? null,
        episodes: al.episodes ?? anizip?.episodeCount ?? null,
        seasonYear: al.seasonYear ?? null,
        startDate: al.startDate ?? null,
        genres: Array.isArray(al.genres) ? al.genres : [],
        nextAiringEpisode: al.nextAiringEpisode ?? null,
        synonyms: Array.from(allSynonyms),
      };
    } else {
      media = await fetchFallbackMedia(id, arm, anizip);
    }

    if (!media) throw new Error(`No data found for AniList ID ${id}`);

    resolved.set(id, media);
    inflight.delete(id);
    return media;
  })().catch((e) => {
    inflight.delete(id);
    throw e;
  });

  inflight.set(id, promise);
  return promise;
}
__name(getMedia, "getMedia");

function forgetMedia(anilistId) {
  resolved.delete(Number(anilistId));
}

export { getMedia, forgetMedia };
