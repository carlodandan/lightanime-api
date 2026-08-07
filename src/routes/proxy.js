import { Hono } from 'hono';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { proxyManifest, proxySegment } from '../controllers/proxyController.js';

const router = new Hono();

router.get('/manifest', asyncHandler(proxyManifest));
router.get('/segment', asyncHandler(proxySegment));

export default router;