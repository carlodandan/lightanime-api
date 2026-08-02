import { Hono } from 'hono';
import { cors } from 'hono/cors';

// Import all controllers
import * as anime from './controllers/animeController.js';
import * as stream from './controllers/streamController.js';
import * as proxy from './controllers/proxyController.js';
import * as anilist from './controllers/anilistController.js';
import { fetchServers } from './controllers/serversController.js';

const app = new Hono();

// Global error handler
app.onError((err, c) => {
  console.error('Unhandled error:', err);
  return c.json({ detail: err.message || 'Internal Server Error' }, 500);
});

// CORS
app.use('*', cors());

// Routes (same as before)
app.get('/', (c) => c.json({ status: 'ok', endpoints: { /* ... */ } }));
app.get('/search', anime.search);
app.get('/home', anime.home);
app.get('/top', anime.top);
app.get('/schedule', anime.schedule);
app.get('/info/:slug', anime.info);
app.get('/episodes/:slug', anime.episodes);
app.get('/recommendations/:slug', anime.recommendations);
app.get('/thumbnails/:anilist_id', anime.thumbnails);
app.get('/servers/:slug/:episode', async (c) => {
  const { slug, episode } = c.req.param();
  const anilist_id = parseInt(c.req.query('anilist_id')) || null;
  const data = await fetchServers(slug, episode, anilist_id);
  return c.json(data);
});
app.get('/stream/:access_id', stream.getStream);
app.get('/stream/from-link', stream.fromLink);
app.get('/api/proxy/manifest', proxy.proxyManifest);
app.get('/api/proxy/segment', proxy.proxySegment);
app.get('/anilist/anime/:id', anilist.getAnimeById);
app.get('/anilist/anime/slug/:slug', anilist.getAnimeBySlug);

export default app;