const ANILIST_API = "https://graphql.anilist.co";

export async function fetchAnilistGraphQL(query, variables) {
  const response = await fetch(ANILIST_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': 'LightAnime/1.0 (via Worker)',
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!response.ok) {
    const text = await response.text();
    throw { status: response.status, message: `AniList API error: ${text.slice(0, 200)}` };
  }
  const json = await response.json();
  if (json.errors) {
    throw { status: 400, message: json.errors.map(e => e.message).join(', ') };
  }
  return json.data;
}

export function getAnilistId(anime) {
  if (!anime) return null;
  if (anime.anilist) return parseInt(anime.anilist, 10);
  for (const key of ["extra_large", "large", "medium"]) {
    const url = anime.cover_image?.[key] || "";
    const m = url.match(/\/bx(\d+)-/);
    if (m) return parseInt(m[1], 10);
  }
  return null;
}