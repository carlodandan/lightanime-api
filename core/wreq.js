const sessions = new Map();

function sessionKey(name, browser, os) {
  return `${name}:${browser}:${os}`;
}

class FallbackSessionClient {
  constructor() {
    this.cookies = new Map();
  }

  _parseCookies(headers) {
    if (!headers) return;
    const values = typeof headers.getSetCookie === "function"
      ? headers.getSetCookie()
      : [headers.get("set-cookie")].filter(Boolean);

    for (const val of values) {
      const parts = String(val).split(";");
      const first = parts[0]?.trim();
      if (!first) continue;
      const eqIdx = first.indexOf("=");
      if (eqIdx > 0) {
        const name = first.slice(0, eqIdx).trim();
        const value = first.slice(eqIdx + 1).trim();
        this.cookies.set(name, value);
      }
    }
  }

  _cookieHeader() {
    if (this.cookies.size === 0) return "";
    return Array.from(this.cookies.entries())
      .map(([k, v]) => `${k}=${v}`)
      .join("; ");
  }

  async fetch(url, options = {}) {
    const { headers = {}, ...rest } = options;
    const reqHeaders = new Headers(headers);

    const cookieStr = this._cookieHeader();
    if (cookieStr && !reqHeaders.has("Cookie")) {
      reqHeaders.set("Cookie", cookieStr);
    }

    const res = await fetch(url, {
      ...rest,
      headers: reqHeaders,
    });

    this._parseCookies(res.headers);
    return res;
  }

  async close() {
    this.cookies.clear();
  }
}

async function getSession(name, browser, os) {
  const key = sessionKey(name, browser, os);
  let current = sessions.get(key);
  if (!current) {
    current = import("wreq-js")
      .then(({ createSession }) => createSession({ browser, os }))
      .catch((error) => {
        // Fall back gracefully to standard web fetch session
        // when wreq-js native bindings are unavailable (e.g. Cloudflare Workers)
        return new FallbackSessionClient();
      });
    sessions.set(key, current);
  }
  return current;
}

export async function wreqFetch(url, options = {}) {
  const {
    session = "default",
    browser = "chrome_149",
    os = "windows",
    warm = [],
    ...request
  } = options;
  const client = await getSession(session, browser, os);
  for (const item of warm) {
    await client.fetch(item.url, {
      method: item.method ?? "GET",
      headers: item.headers,
      body: item.body,
      redirect: item.redirect ?? "follow",
    });
  }
  return client.fetch(url, request);
}

export async function closeWreqSessions() {
  const active = [...sessions.values()];
  sessions.clear();
  await Promise.all(active.map(async (current) => {
    try {
      const client = await current;
      if (typeof client?.close === "function") {
        await client.close();
      }
    } catch {}
  }));
}
