// services/httpService.js
import { BASE, FLIX, _UA } from '../utils/constants.js';
import { fetchWithTimeout, isCloudflareChallenge } from './upstreamFetch.js';

const BROWSER_HEADERS = {
  'User-Agent': _UA,
  'Accept': 'application/json, text/plain, */*',
  'Accept-Language': 'en-US,en;q=0.9',
  'Referer': 'https://reanime.to/',
  'Origin': 'https://reanime.to',
  'Sec-Fetch-Dest': 'empty',
  'Sec-Fetch-Mode': 'cors',
  'Sec-Fetch-Site': 'same-origin',
};

function getBase(path) {
  if (path.startsWith('/api/flix/')) return FLIX;
  return BASE;
}

export async function _get(path, params = {}) {
  const base = getBase(path);
  const url = new URL(path, base);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

  let response;
  try {
    response = await fetchWithTimeout(url.toString(), {
      headers: BROWSER_HEADERS,
    });
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Upstream request timed out while contacting the media provider');
    }
    throw error;
  }

  const contentType = response.headers.get('content-type') || '';

  if (!response.ok) {
    const text = await response.text();
    if (isCloudflareChallenge(text, contentType, response.url)) {
      throw new Error('Cloudflare challenge detected while reaching the upstream provider');
    }
    throw new Error(`Upstream request failed with ${response.status}: ${text.slice(0, 220)}`);
  }

  if (contentType.includes('text/html')) {
    const html = await response.text();
    if (isCloudflareChallenge(html, contentType, response.url)) {
      throw new Error('Cloudflare challenge detected while reaching the upstream provider');
    }
    return html;
  }

  if (contentType.includes('application/json')) {
    return response.json();
  }

  return response.text();
}