import puppeteer from 'puppeteer';

/**
 * Fetches a URL that is protected by Cloudflare (with turnstile/challenge).
 * It uses a headless browser to solve the challenge and return the final response.
 */
export async function fetchWithCloudflareBypass(url, options = {}) {
  const browser = await puppeteer.launch({
    headless: 'new', // use new headless mode
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();

    // Set a realistic User‑Agent and viewport
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    );
    await page.setViewport({ width: 1280, height: 800 });

    // Navigate to the URL
    const response = await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 60000, // allow time for Cloudflare challenge
    });

    // After page loads, get the response body (manifest text)
    const body = await page.content();

    // If the response is HTML (still blocked), throw error
    if (body.includes('cf-error-details') || body.includes('Attention Required')) {
      throw new Error('Cloudflare challenge could not be bypassed');
    }

    // Return the body as a string (manifest text)
    return body;
  } catch (err) {
    throw new Error(`Cloudflare fetch failed: ${err.message}`);
  } finally {
    await browser.close();
  }
}