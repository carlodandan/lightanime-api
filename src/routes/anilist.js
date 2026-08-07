import { Hono } from 'hono';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { getAnimeById, getAnimeBySlug } from '../controllers/anilistController.js';

const router = new Hono();

router.get('/anime/:id', asyncHandler(getAnimeById));
router.get('/anime/slug/:slug', asyncHandler(getAnimeBySlug));

export default router;