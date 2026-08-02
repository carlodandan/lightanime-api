import { _UA } from "../utils/constants.js";

const CDN_HEADERS = {
  'User-Agent': _UA,
  'Accept': '*/*',
  'Referer': 'https://flixcloud.cc/',
  'Origin': 'https://flixcloud.cc',
  'Accept-Encoding': 'gzip, deflate, br', // no zstd
};

// Helper to fetch and decompress (auto‑decompression by fetch .text())
async function fetchManifestText(url) {
  const response = await fetch(url, { headers: CDN_HEADERS });
  if (!response.ok) {
    throw { status: response.status, message: `CDN error: ${response.status}` };
  }
  // Workers automatically decompress gzip/br/deflate
  return await response.text();
}

export async function proxyManifest(c) {
  const url = c.req.query('url');
  if (!url) return c.json({ detail: "Missing ?url=..." }, 400);

  try {
    let manifestText = await fetchManifestText(url);

    if (manifestText.includes('<!DOCTYPE') || manifestText.includes('cf-error-details')) {
      return c.json({ detail: 'Cloudflare protection triggered' }, 403);
    }
    if (!manifestText.startsWith('#EXTM3U')) {
      console.warn('Invalid manifest preview:', manifestText.slice(0, 500));
      return c.json({ detail: 'Invalid manifest (maybe expired token)' }, 500);
    }

    const baseUrl = new URL(url).origin;
    let manifest = manifestText;

    // Rewrite .ts segments
    manifest = manifest.replace(/(https?:\/\/[^\s"']+\.ts)|([^/\s"']+\.ts)/g, (match) => {
      const absolute = match.startsWith('http') ? match : new URL(match, baseUrl).href;
      return `/api/proxy/segment?url=${encodeURIComponent(absolute)}`;
    });

    // Rewrite key URIs
    manifest = manifest.replace(/URI="([^"]+)"/g, (match, uri) => {
      const absolute = uri.startsWith('http') ? uri : new URL(uri, baseUrl).href;
      return `URI="/api/proxy/segment?url=${encodeURIComponent(absolute)}"`;
    });

    // Rewrite variant playlists
    manifest = manifest.replace(
      /^(?!\s*#)(https?:\/\/[^\s"']+\.m3u8|[^/\s"']+\.m3u8)/gm,
      (match) => {
        const absolute = match.startsWith('http') ? match : new URL(match, baseUrl).href;
        return `/api/proxy/manifest?url=${encodeURIComponent(absolute)}`;
      }
    );

    return new Response(manifest, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/vnd.apple.mpegurl',
      },
    });
  } catch (err) {
    return c.json({ detail: err.message || 'Proxy error' }, 500);
  }
}

export async function proxySegment(c) {
  const url = c.req.query('url');
  if (!url) return c.json({ detail: "Missing ?url=..." }, 400);

  try {
    const response = await fetch(url, { headers: CDN_HEADERS });
    if (!response.ok) {
      return c.json({ detail: `Segment fetch failed: ${response.status}` }, response.status);
    }
    const buffer = await response.arrayBuffer();
    return new Response(buffer, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': response.headers.get('content-type') || 'video/MP2T',
      },
    });
  } catch (err) {
    return c.json({ detail: err.message }, 500);
  }
}