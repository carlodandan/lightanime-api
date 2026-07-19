import { Router } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import * as controller from "../controllers/animeController.js";

const router = Router();

router.get("/search", asyncHandler(controller.search));
router.get("/home", asyncHandler(controller.home));
router.get("/top", asyncHandler(controller.top));
router.get("/schedule", asyncHandler(controller.schedule));
router.get("/info/:slug", asyncHandler(controller.info));
router.get("/episodes/:slug", asyncHandler(controller.episodes));
router.get("/recommendations/:slug", asyncHandler(controller.recommendations));
router.get("/thumbnails/:anilist_id", asyncHandler(controller.thumbnails));

export default router;