import { Router } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { getAnimeById, getAnimeBySlug } from "../controllers/anilistController.js";

const router = Router();

router.get("/anime/:id", asyncHandler(getAnimeById));
router.get("/anime/slug/:slug", asyncHandler(getAnimeBySlug));

export default router;