import { BASE, HEADERS } from "../utils/constants.js";

export async function proxyManifest(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ detail: "Missing ?url=..." });

  const response = await fetch(url, {
    headers: { ...HEADERS, Referer: `${BASE}/` }
  });
  if (!response.ok) {
    throw { status: response.status, message: "Failed to fetch manifest" };
  }
  let manifest = await response.text();

  const baseUrl = new URL(url).origin;
  const segmentRegex = /(https?:\/\/[^\s"']+\.ts)|([^/\s"']+\.ts)/g;
  manifest = manifest.replace(segmentRegex, (match) => {
    const absolute = match.startsWith('http') ? match : new URL(match, baseUrl).href;
    return `/api/proxy/segment?url=${encodeURIComponent(absolute)}`;
  });

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Content-Type', 'application/vnd.apple.mpegurl');
  res.send(manifest);
}

export async function proxySegment(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ detail: "Missing ?url=..." });

  const response = await fetch(url, {
    headers: { ...HEADERS, Referer: `${BASE}/` }
  });
  if (!response.ok) {
    throw { status: response.status, message: "Segment fetch failed" };
  }
  const data = await response.arrayBuffer();
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Content-Type', response.headers.get('content-type') || 'video/MP2T');
  res.send(Buffer.from(data));
}