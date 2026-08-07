import { Hono } from 'hono';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { getStreamUrl } from '../controllers/streamController.js';

const router = new Hono();

router.get('/:access_id', asyncHandler(async (c) => {
  const { access_id } = c.req.param();
  const v = parseInt(c.req.query('v')) || 2;
  return c.json(await getStreamUrl(access_id, v));
}));

router.get('/from-link', asyncHandler(async (c) => {
  const link = c.req.query('link');
  if (!link) return c.json({ detail: "Query 'link' is required" }, 400);
  const m = link.match(/\/e\/([^?#\s]+)\?v=(\d+)/);
  if (!m) return c.json({ detail: 'Expected URL: https://flixcloud.cc/e/{id}?v={1|2}' }, 400);
  return c.json(await getStreamUrl(m[1], parseInt(m[2], 10)));
}));

export default router;