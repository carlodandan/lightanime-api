import { getStreamUrl } from "../services/flixService.js";

export async function getStream(c) {
  const access_id = c.req.param('access_id');
  const v = parseInt(c.req.query('v')) || 2;
  const data = await getStreamUrl(access_id, v);
  return c.json(data);
}

export async function fromLink(c) {
  const link = c.req.query('link');
  if (!link) return c.json({ detail: "Query 'link' is required" }, 400);
  const m = link.match(/\/e\/([^?#\s]+)\?v=(\d+)/);
  if (!m) return c.json({ detail: "Expected URL: https://flixcloud.cc/e/{id}?v={1|2}" }, 400);
  const data = await getStreamUrl(m[1], parseInt(m[2], 10));
  return c.json(data);
}