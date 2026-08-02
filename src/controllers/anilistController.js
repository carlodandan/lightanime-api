import { fetchAnilistGraphQL, getAnilistId } from "../services/anilistService.js";
import { _get } from "../services/httpService.js";

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

export async function getAnimeById(c) {
  const id = parseInt(c.req.param('id'));
  if (isNaN(id)) return c.json({ detail: "Invalid ID" }, 400);
  const data = await fetchAnilistGraphQL(ANIME_QUERY, { id });
  if (!data.Media) return c.json({ detail: "Anime not found" }, 404);
  return c.json(data.Media);
}

export async function getAnimeBySlug(c) {
  const slug = c.req.param('slug');
  const meta = await _get(`/api/v1/anime/${slug}/meta`);
  const anime = meta.anime || meta;
  const aid = getAnilistId(anime);
  if (!aid) return c.json({ detail: "Could not determine AniList ID" }, 404);
  const data = await fetchAnilistGraphQL(ANIME_QUERY, { id: aid });
  if (!data.Media) return c.json({ detail: "Anime not found" }, 404);
  return c.json(data.Media);
}