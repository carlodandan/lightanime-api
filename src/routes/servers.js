import { Router } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { fetchServers } from "../controllers/serversController.js";

const router = Router();

router.get("/:slug/:episode", asyncHandler(async (req, res) => {
  const { slug, episode } = req.params;
  const anilist_id = req.query.anilist_id ? parseInt(req.query.anilist_id, 10) : null;
  res.json(await fetchServers(slug, episode, anilist_id));
}));

export default router;