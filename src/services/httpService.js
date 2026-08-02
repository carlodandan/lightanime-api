// services/httpService.js
import { BASE, FLIX, _UA } from '../utils/constants.js';
import { fetchWithTimeout, readUpstreamText } from './upstreamFetch.js';

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

  const { body, contentType } = await readUpstreamText(response, {
    challengeMessage: 'Cloudflare challenge detected while reaching the upstream provider',
    failureMessage: `Upstream request failed with ${response.status}`,
  });

  if (contentType.includes('text/html')) {
    return body;
  }

  if (contentType.includes('application/json')) {
    return JSON.parse(body);
  }

  return body;
}