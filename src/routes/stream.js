import { Router } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { getStreamUrl } from "../controllers/streamController.js";

const router = Router();

router.get("/:access_id", asyncHandler(async (req, res) => {
  const v = req.query.v ? parseInt(req.query.v, 10) : 2;
  res.json(await getStreamUrl(req.params.access_id, v));
}));

router.get("/from-link", asyncHandler(async (req, res) => {
  const link = req.query.link;
  if (!link) return res.status(400).json({ detail: "Query 'link' is required" });
  const m = link.match(/\/e\/([^?#\s]+)\?v=(\d+)/);
  if (!m) return res.status(400).json({ detail: "Expected URL: https://flixcloud.cc/e/{id}?v={1|2}" });
  res.json(await getStreamUrl(m[1], parseInt(m[2], 10)));
}));

export default router;