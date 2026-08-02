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

export async function readUpstreamText(response, options = {}) {
  const contentType = response.headers.get('content-type') || '';
  const body = await response.text();

  if (isCloudflareChallenge(body, contentType, response.url)) {
    throw options.challengeError || {
      status: 503,
      message: options.challengeMessage || 'Cloudflare challenge detected while contacting the upstream provider',
    };
  }

  if (!response.ok) {
    throw options.failureError || {
      status: response.status,
      message: options.failureMessage || `Upstream request failed with ${response.status}: ${body.slice(0, 220)}`,
    };
  }

  return {
    body,
    contentType,
  };
}

export async function readUpstreamBuffer(response, options = {}) {
  const contentType = response.headers.get('content-type') || '';
  const buffer = Buffer.from(await response.arrayBuffer());

  if (contentType.includes('text/html')) {
    const body = buffer.toString('utf8');
    if (isCloudflareChallenge(body, contentType, response.url)) {
      throw options.challengeError || {
        status: 503,
        message: options.challengeMessage || 'Cloudflare challenge detected while contacting the upstream provider',
      };
    }
  }

  if (!response.ok) {
    throw options.failureError || {
      status: response.status,
      message: options.failureMessage || `Upstream request failed with ${response.status}`,
    };
  }

  return {
    buffer,
    contentType,
  };
}
