import { _get } from "../services/httpService.js";
import { getAnilistId } from "../services/anilistService.js";

export async function fetchServers(slug, ep, anilist_id) {
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