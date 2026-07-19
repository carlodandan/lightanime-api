import { Router } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { proxyManifest, proxySegment } from "../controllers/proxyController.js";

const router = Router();

router.get("/manifest", asyncHandler(proxyManifest));
router.get("/segment", asyncHandler(proxySegment));

export default router;