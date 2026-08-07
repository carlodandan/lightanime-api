import { Hono } from 'hono';
import { cors } from 'hono/cors';

import { search, home, top, schedule, info, episodes, recommendations, thumbnails } from '../controllers/animeController.js';
import { getStream, fromLink } from '../controllers/streamController.js';
import { proxyManifest, proxySegment } from '../controllers/proxyController.js';
import { getAnimeById, getAnimeBySlug } from '../controllers/anilistController.js';
import { fetchServers } from '../controllers/serversController.js';

const app = new Hono();

app.use(
  '*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.get('/', (c) =>
  c.json({
    status: 'ok',
    endpoints: {
      search: 'GET /search?q=...&limit=20',
      home: 'GET /home?limit=20',
      top: 'GET /top?period=today|week|month&limit=10',
      schedule: 'GET /schedule?tz=Asia/Manila&year=2026&month=7',
      info: 'GET /info/:slug',
      episodes: 'GET /episodes/:slug',
      servers: 'GET /servers/:slug/:episode?anilist_id=...',
      stream: 'GET /stream/:access_id?v=2',
      stream_link: 'GET /stream/from-link?link={flixcloud_url}',
      thumbnails: 'GET /thumbnails/:anilist_id',
      recommendations: 'GET /recommendations/:slug',
      anilist_anime: 'GET /anilist/anime/:id',
      anilist_anime_by_slug: 'GET /anilist/anime/slug/:slug',
    },
  }),
);

app.get('/search', search);
app.get('/home', home);
app.get('/top', top);
app.get('/schedule', schedule);
app.get('/info/:slug', info);
app.get('/episodes/:slug', episodes);
app.get('/recommendations/:slug', recommendations);
app.get('/thumbnails/:anilist_id', thumbnails);
app.get('/servers/:slug/:episode', async (c) => {
  const { slug, episode } = c.req.param();
  const anilist_id = parseInt(c.req.query('anilist_id')) || null;
  return c.json(await fetchServers(slug, episode, anilist_id));
});
app.get('/stream/:access_id', getStream);
app.get('/stream/from-link', fromLink);
app.get('/api/proxy/manifest', proxyManifest);
app.get('/api/proxy/segment', proxySegment);
app.get('/anilist/anime/:id', getAnimeById);
app.get('/anilist/anime/slug/:slug', getAnimeBySlug);

export default app;