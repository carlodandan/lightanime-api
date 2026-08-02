import { _get } from "../services/httpService.js";
import { getAnilistId, fetchAnilistGraphQL } from "../services/anilistService.js";

const ANIME_QUERY = `
  query ($id: Int) {
    Media(id: $id, type: ANIME) {
      id format
      title { romaji english native }
      description
      coverImage { extraLarge large medium }
      bannerImage
      genres
      averageScore
      popularity
      startDate { year month day }
      endDate { year month day }
      status
      episodes
      duration
      source
      season
      seasonYear
      synonyms
      studios { nodes { name } }
      characters(sort: ROLE, perPage: 10) {
        edges { role node { id name { full } image { large } } }
      }
      staff(perPage: 10) {
        edges { role node { id name { full } image { large } } }
      }
    }
  }
`;

export async function search(c) {
  const { q, limit = 20, offset = 0 } = c.req.query();
  if (!q) return c.json({ detail: "Query 'q' is required" }, 400);
  const data = await _get("/api/v1/search", { q, limit, offset });
  return c.json(data);
}

export async function home(c) {
  const limit = c.req.query('limit') || 20;
  const data = await _get("/api/v1/home", { limit });
  return c.json(data);
}

export async function top(c) {
  const { period = "week", limit = 10 } = c.req.query();
  const data = await _get("/api/v1/top/anime", { period, limit });
  return c.json(data);
}

export async function schedule(c) {
  const now = new Date();
  const defaultYear = now.getFullYear().toString();
  const defaultMonth = (now.getMonth() + 1).toString();
  const defaultTz = "Asia/Manila";
  const { tz = defaultTz, year = defaultYear, month = defaultMonth } = c.req.query();
  const data = await _get("/api/v1/schedule", { tz, year, month });
  return c.json(data);
}

export async function info(c) {
  const slug = c.req.param('slug');
  const [meta, eps] = await Promise.all([
    _get(`/api/v1/anime/${slug}/meta`),
    _get(`/api/v1/anime/${slug}/episodes`, { limit: 2000 })
  ]);
  const anime = meta.anime || meta;
  const ep_list = Array.isArray(eps) ? eps : (eps.data || eps.episodes || []);
  const anilist_id = getAnilistId(anime);
  const response = { ...anime, episodes: ep_list, anilist_id };
  if (anilist_id) {
    try {
      const data = await fetchAnilistGraphQL(ANIME_QUERY, { id: anilist_id });
      if (data.Media) response.anilist = data.Media;
    } catch (err) {
      console.warn(`AniList failed for ${slug}:`, err.message);
    }
  }
  return c.json(response);
}

export async function episodes(c) {
  const slug = c.req.param('slug');
  const limit = c.req.query('limit') || 2000;
  const data = await _get(`/api/v1/anime/${slug}/episodes`, { limit });
  return c.json(Array.isArray(data) ? data : (data.data || data.episodes || data));
}

export async function recommendations(c) {
  const slug = c.req.param('slug');
  const data = await _get(`/api/v1/anime/${slug}/recommendations`);
  return c.json(data);
}

export async function thumbnails(c) {
  const anilist_id = c.req.param('anilist_id');
  const data = await _get(`/api/thumbnails/${anilist_id}`);
  return c.json(data);
}