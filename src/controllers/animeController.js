import { _get } from "../services/httpService.js";
import { getAnilistId, fetchAnilistGraphQL } from "../services/anilistService.js";

const ANIME_QUERY = `
  query ($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      format
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
        edges {
          role
          node {
            id
            name { full }
            image { large }
          }
        }
      }
      staff(perPage: 10) {
        edges {
          role
          node {
            id
            name { full }
            image { large }
          }
        }
      }
    }
  }
`;

export async function search(req, res) {
  const { q, limit = 20, offset = 0 } = req.query;
  if (!q) return res.status(400).json({ detail: "Query 'q' is required" });
  res.json(await _get("/api/v1/search", { q, limit, offset }));
}

export async function home(req, res) {
  res.json(await _get("/api/v1/home", { limit: req.query.limit || 20 }));
}

export async function top(req, res) {
  const { period = "week", limit = 10 } = req.query;
  res.json(await _get("/api/v1/top/anime", { period, limit }));
}

export async function schedule(req, res) {
  const now = new Date();
  const defaultYear = now.getFullYear().toString();
  const defaultMonth = (now.getMonth() + 1).toString();
  const defaultTz = "Asia/Manila";
  const { tz = defaultTz, year = defaultYear, month = defaultMonth } = req.query;
  res.json(await _get("/api/v1/schedule", { tz, year, month }));
}

export async function info(req, res) {
  const { slug } = req.params;

  // 1. Fetch metadata and episodes in parallel
  const [meta, eps] = await Promise.all([
    _get(`/api/v1/anime/${slug}/meta`),
    _get(`/api/v1/anime/${slug}/episodes`, { limit: 2000 })
  ]);

  const anime = meta.anime || meta;
  const ep_list = Array.isArray(eps) ? eps : (eps.data || eps.episodes || []);
  const anilist_id = getAnilistId(anime);

  // Build the base response
  const response = {
    ...anime,
    episodes: ep_list,
    anilist_id,
  };

  // 2. If we have an AniList ID, fetch additional details
  if (anilist_id) {
    try {
      const data = await fetchAnilistGraphQL(ANIME_QUERY, { id: anilist_id });
      if (data.Media) {
        // Merge the AniList data into the response
        response.anilist = data.Media;
      }
    } catch (err) {
      // Log error but don't fail the request – we still have basic info
      console.warn(`Failed to fetch AniList details for ${slug}:`, err.message);
    }
  }

  res.json(response);
}

export async function episodes(req, res) {
  const { slug } = req.params;
  const data = await _get(`/api/v1/anime/${slug}/episodes`, { limit: req.query.limit || 2000 });
  res.json(Array.isArray(data) ? data : (data.data || data.episodes || data));
}

export async function recommendations(req, res) {
  const { slug } = req.params;
  res.json(await _get(`/api/v1/anime/${slug}/recommendations`));
}

export async function thumbnails(req, res) {
  const { anilist_id } = req.params;
  res.json(await _get(`/api/thumbnails/${anilist_id}`));
}