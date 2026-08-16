
/**
 * Proxy GET /stream/:access_id to the Node backend.
 * Expects c.env.NODE_BACKEND_URL and c.env.NODE_API_KEY to be set.
 */
export async function getStream(c) {
  const { NODE_BACKEND_URL, NODE_API_KEY } = c.env;

  if (!NODE_BACKEND_URL) {
    console.error('NODE_BACKEND_URL not set');
    return c.json({ detail: 'Backend configuration missing' }, 500);
  }

  const access_id = c.req.param('access_id');
  const v = c.req.query('v') || '2';

  const nodeUrl = `${NODE_BACKEND_URL}/stream/${access_id}?v=${v}`;

  try {
    const response = await fetch(nodeUrl, {
      headers: {
        'X-API-Key': NODE_API_KEY || '',
        'User-Agent': 'CloudflareWorker/1.0',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Node backend responded with ${response.status}: ${errorText}`);
      return c.json(
        { detail: `Backend error: ${response.status} - ${errorText}` },
        response.status
      );
    }

    const data = await response.json();
    return c.json(data);
  } catch (error) {
    console.error('Proxy to Node backend failed:', error);
    return c.json({ detail: 'Internal Server Error' }, 500);
  }
}

/**
 * Parse the flixcloud link in the worker and forward to /stream/:access_id.
 * This keeps the parsing logic in the worker and avoids duplicating it in Node.
 */
export async function fromLink(c) {
  const link = c.req.query('link');
  if (!link) {
    return c.json({ detail: "Query 'link' is required" }, 400);
  }

  // Extract access_id and v from the link
  const m = link.match(/\/e\/([^?#\s]+)\?v=(\d+)/);
  if (!m) {
    return c.json(
      { detail: "Expected URL: https://flixcloud.cc/e/{id}?v={1|2}" },
      400
    );
  }

  const access_id = m[1];
  const v = m[2] || '2';

  // Reuse the same getStream logic by calling it with a modified request context
  // We can just manually forward to the Node backend here as well.
  const { NODE_BACKEND_URL, NODE_API_KEY } = c.env;

  if (!NODE_BACKEND_URL) {
    return c.json({ detail: 'Backend configuration missing' }, 500);
  }

  const nodeUrl = `${NODE_BACKEND_URL}/stream/${access_id}?v=${v}`;

  try {
    const response = await fetch(nodeUrl, {
      headers: {
        'X-API-Key': NODE_API_KEY || '',
        'User-Agent': 'CloudflareWorker/1.0',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return c.json(
        { detail: `Backend error: ${response.status} - ${errorText}` },
        response.status
      );
    }

    const data = await response.json();
    return c.json(data);
  } catch (error) {
    console.error('Proxy from-link failed:', error);
    return c.json({ detail: 'Internal Server Error' }, 500);
  }
}