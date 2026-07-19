import { fetchAnilistGraphQL, getAnilistId } from "../services/anilistService.js";
import { _get } from "../services/httpService.js";

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

export async function getAnimeById(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ detail: "Invalid ID" });
  const data = await fetchAnilistGraphQL(ANIME_QUERY, { id });
  if (!data.Media) throw { status: 404, message: "Anime not found" };
  res.json(data.Media);
}

export async function getAnimeBySlug(req, res) {
  const { slug } = req.params;
  const meta = await _get(`/api/v1/anime/${slug}/meta`);
  const anime = meta.anime || meta;
  const aid = getAnilistId(anime);
  if (!aid) throw { status: 404, message: "Could not determine AniList ID for this slug" };
  const data = await fetchAnilistGraphQL(ANIME_QUERY, { id: aid });
  if (!data.Media) throw { status: 404, message: "Anime not found" };
  res.json(data.Media);
}