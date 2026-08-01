// services/httpService.js
import { BASE, FLIX, _UA } from '../utils/constants.js';

// Use the same headers as in proxyController
const BROWSER_HEADERS = {
  'User-Agent': _UA,   // from constants.js: Mozilla/5.0 ...
  'Accept': 'application/json, text/plain, */*',
  'Accept-Language': 'en-US,en;q=0.9',
  'Referer': 'https://reanime.to/',
  'Origin': 'https://reanime.to',
  'Sec-Fetch-Dest': 'empty',
  'Sec-Fetch-Mode': 'cors',
  'Sec-Fetch-Site': 'same-origin',
};

// Helper to choose base URL based on path prefix
function getBase(path) {
  if (path.startsWith('/api/flix/')) return FLIX;
  if (path.startsWith('/api/v1/')) return BASE;
  return BASE; // default
}

export async function _get(path, params = {}) {
  const base = getBase(path);
  const url = new URL(path, base);
  
  // Append query parameters
  Object.keys(params).forEach(key => 
    url.searchParams.append(key, params[key])
  );

  const response = await fetch(url.toString(), {
    headers: BROWSER_HEADERS,
  });

  // Detect Cloudflare challenge (HTML response)
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('text/html')) {
    const html = await response.text();
    if (html.includes('Just a moment') || html.includes('cf-error-details')) {
      throw new Error(`Cloudflare block: ${path}`);
    }
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ${response.status}: ${errorText.slice(0, 200)}`);
  }

  // If response is JSON, parse; else return text
  if (contentType.includes('application/json')) {
    return response.json();
  }
  return response.text();
}