import { Hono } from 'hono';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { fetchServers } from '../controllers/serversController.js';

const router = new Hono();

router.get('/:slug/:episode', asyncHandler(async (c) => {
  const { slug, episode } = c.req.param();
  const anilist_id = parseInt(c.req.query('anilist_id')) || null;
  return c.json(await fetchServers(slug, episode, anilist_id));
}));

export default router;