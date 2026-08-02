import { BASE, HEADERS, _UA } from "../utils/constants.js";
import { fetchWithTimeout, readUpstreamText } from "../services/upstreamFetch.js";

const CDN_FETCH_HEADERS = {
  'User-Agent': _UA,
  'Accept': '*/*',
  'Referer': 'https://flixcloud.cc/',
  'Origin': 'https://flixcloud.cc',
};

export async function proxyManifest(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ detail: "Missing ?url=..." });

  const response = await fetchWithTimeout(url, {
    headers: CDN_FETCH_HEADERS,
  });

  const { body: manifest } = await readUpstreamText(response, {
    challengeMessage: 'Cloudflare challenge detected while fetching the manifest',
    failureMessage: 'CDN fetch failed',
  });

  // 1. Resolve relative paths against the FULL manifest URL context, not just origin
  const manifestUrlObj = new URL(url);

  const resolveUrl = (relativeOrAbsolute) => {
    try {
      return new URL(relativeOrAbsolute, manifestUrlObj).href;
    } catch {
      return relativeOrAbsolute;
    }
  };

  // 2. Rewrite nested sub-playlists (.m3u8) so child manifests also pass through proxyManifest
  manifest = manifest.replace(/^([^#\s].*\.m3u8.*)$/gm, (match) => {
    const absolute = resolveUrl(match.trim());
    return `/api/proxy/manifest?url=${encodeURIComponent(absolute)}`;
  });

  // 3. Rewrite .ts video segments
  manifest = manifest.replace(/^([^#\s].*\.ts.*)$/gm, (match) => {
    const absolute = resolveUrl(match.trim());
    return `/api/proxy/segment?url=${encodeURIComponent(absolute)}`;
  });

  // 4. Rewrite encryption key URIs
  manifest = manifest.replace(/URI="([^"]+)"/g, (match, uri) => {
    const absolute = resolveUrl(uri);
    return `URI="/api/proxy/segment?url=${encodeURIComponent(absolute)}"`;
  });

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Content-Type', 'application/vnd.apple.mpegurl');
  res.send(manifest);
}


export async function proxySegment(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ detail: "Missing ?url=..." });

  const response = await fetch(url, {
    headers: CDN_FETCH_HEADERS,
  });

  if (!response.ok) {
    throw { status: response.status, message: "Segment fetch failed" };
  }

  const data = await response.arrayBuffer();
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Content-Type', response.headers.get('content-type') || 'video/MP2T');
  res.send(Buffer.from(data));
}