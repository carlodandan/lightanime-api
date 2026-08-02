// services/httpService.js
import { BASE, FLIX, _UA } from '../utils/constants.js';

// Realistic browser headers (same as before)
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

  const response = await fetch(url.toString(), {
    headers: BROWSER_HEADERS,
  });

  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('text/html')) {
    const html = await response.text();
    if (html.includes('Just a moment') || html.includes('cf-error-details')) {
      throw new Error('Cloudflare challenge detected');
    }
    return html;
  }

  if (contentType.includes('application/json')) {
    return response.json();
  }

  return response.text();
}