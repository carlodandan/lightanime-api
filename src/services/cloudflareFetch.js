// Cloudflare-only fetch strategy keeps the request path simple and browser-free.
// Any HTML challenge response is surfaced as a normal error instead of trying to
// launch a local headless browser that cannot run in the Cloudflare worker runtime.
export async function fetchWithCloudflareBypass(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Cloudflare fetch failed: ${response.status}`);
  }

  return response.text();
}
