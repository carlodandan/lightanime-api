import { Router } from "express";
import animeRoutes from "./anime.js";
import serversRoutes from "./servers.js";
import streamRoutes from "./stream.js";
import proxyRoutes from "./proxy.js";
import anilistRoutes from "./anilist.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    status: "ok",
    endpoints: {
      search: "GET /search?q=...&limit=20",
      home: "GET /home?limit=20",
      top: "GET /top?period=today|week|month&limit=10",
      schedule: "GET /schedule?tz=Asia/Manila&year=2026&month=7",
      info: "GET /info/:slug",
      episodes: "GET /episodes/:slug",
      servers: "GET /servers/:slug/:episode?anilist_id=...",
      stream: "GET /stream/:access_id?v=2",
      stream_link: "GET /stream/from-link?link={flixcloud_url}",
      thumbnails: "GET /thumbnails/:anilist_id",
      recommendations: "GET /recommendations/:slug",
      anilist_anime: "GET /anilist/anime/:id",
      anilist_anime_by_slug: "GET /anilist/anime/slug/:slug",
    },
  });
});

router.use("/", animeRoutes);          // /search, /home, /info, etc.
router.use("/servers", serversRoutes); // /servers/:slug/:episode
router.use("/stream", streamRoutes);   // /stream/:access_id, /stream/from-link
router.use("/proxy", proxyRoutes);     // /proxy/manifest, /proxy/segment (but we also have /api/proxy? see below)
router.use("/anilist", anilistRoutes);

// Also mount proxy under /api/proxy for compatibility with frontend
const apiRouter = Router();
apiRouter.use("/proxy", proxyRoutes);
router.use("/api", apiRouter);

export default router;