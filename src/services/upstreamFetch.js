const CHALLENGE_MARKERS = [
  'Just a moment',
  'cf-error-details',
  'cf-challenge',
  'challenge-platform',
  'cdn-cgi/challenge',
  'cloudflare',
];

export function isCloudflareChallenge(html, contentType = '', responseUrl = '') {
  if (!contentType.includes('text/html') && !responseUrl.includes('cdn-cgi')) {
    return false;
  }

  const haystack = String(html || '').toLowerCase();
  return CHALLENGE_MARKERS.some(marker => haystack.includes(marker.toLowerCase()));
}

export async function fetchWithTimeout(url, init = {}, timeoutMs = 20000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}
