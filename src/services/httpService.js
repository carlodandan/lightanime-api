// services/httpService.js
import { BASE, FLIX, _UA } from '../utils/constants.js';
import { fetchWithCloudflareBypass } from './cloudflareFetch.js';

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

  // 1. First try: normal fetch with headers
  try {
    const response = await fetch(url.toString(), {
      headers: BROWSER_HEADERS,
    });

    const contentType = response.headers.get('content-type') || '';

    // Check for Cloudflare HTML challenge
    if (contentType.includes('text/html')) {
      const html = await response.text();
      if (html.includes('Just a moment') || html.includes('cf-error-details')) {
        throw new Error('Cloudflare challenge detected – retrying with Puppeteer');
      }
    }

    // If response is not JSON, try to parse JSON anyway
    if (contentType.includes('application/json')) {
      return response.json();
    } else {
      // Some endpoints return plain text (e.g., manifest)
      return response.text();
    }
  } catch (err) {
    // 2. Fallback: use Puppeteer bypass if the error indicates Cloudflare
    if (err.message && err.message.includes('Cloudflare')) {
      console.warn(`Fallback to Puppeteer for ${url}`);
      try {
        const html = await fetchWithCloudflareBypass(url.toString());
        // The response might be JSON or plain text; parse accordingly
        if (html.trim().startsWith('{') || html.trim().startsWith('[')) {
          return JSON.parse(html);
        }
        return html;
      } catch (puppeteerErr) {
        throw new Error(`Puppeteer fallback failed: ${puppeteerErr.message}`);
      }
    }
    throw err;
  }
}