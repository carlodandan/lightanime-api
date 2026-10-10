export async function handleM3u8Proxy(request) {
  const reqUrl = new URL(request.url);
  const targetUrl = reqUrl.searchParams.get("url");

  if (!targetUrl) {
    return new Response(JSON.stringify({ error: "Missing 'url' query parameter" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  // Parse custom headers
  let customHeaders = {};
  const rawHeaders = reqUrl.searchParams.get("headers");
  if (rawHeaders) {
    try {
      customHeaders = typeof rawHeaders === "string" ? JSON.parse(rawHeaders) : rawHeaders;
    } catch {
      // ignore
    }
  }

  // Prioritize valid external Referer; filter out localhost / 127.0.0.1
  let referer = null;
  const candidates = [customHeaders.Referer, customHeaders.referer];
  for (const c of candidates) {
    if (c && typeof c === "string" && !c.includes("localhost") && !c.includes("127.0.0.1")) {
      referer = c;
      break;
    }
  }

  // Auto-detect upstream domain referers
  if (!referer) {
    try {
      const u = new URL(targetUrl);
      const h = u.hostname.toLowerCase();
      if (
        h.includes("krussdomi") ||
        h.includes("advancedai") ||
        h.includes("habibi") ||
        h.includes("babybay") ||
        h.includes("naruto")
      ) {
        referer = "https://krussdomi.com/";
      } else if (h.includes("nexabloom") || h.includes("megaplay")) {
        referer = "https://megaplay.buzz/";
      } else if (h.includes("settlar.io")) {
        referer = "https://embed.settlar.io/";
      } else if (h.includes("flixcloud")) {
        referer = "https://flixcloud.cc/";
      } else if (h.includes("vidwish")) {
        referer = "https://vidwish.live/";
      } else {
        referer = u.origin + "/";
      }
    } catch {
      // ignore
    }
  }

  const upstreamHeaders = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    Accept: "*/*",
  };

  if (referer) {
    upstreamHeaders["Referer"] = referer;
    try {
      upstreamHeaders["Origin"] = new URL(referer).origin;
    } catch {
      upstreamHeaders["Origin"] = referer;
    }
  }

  for (const [k, v] of Object.entries(customHeaders)) {
    const lk = k.toLowerCase();
    if (lk !== "host" && lk !== "connection" && lk !== "content-length" && lk !== "referer") {
      upstreamHeaders[k] = v;
    }
  }

  try {
    const res = await fetch(targetUrl, {
      method: "GET",
      headers: upstreamHeaders,
    });

    const responseHeaders = new Headers();
    responseHeaders.set("Access-Control-Allow-Origin", "*");
    responseHeaders.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
    responseHeaders.set("Access-Control-Allow-Headers", "*");

    const forwardHeaders = [
      "content-type",
      "content-length",
      "accept-ranges",
      "content-range",
      "cache-control",
    ];
    for (const h of forwardHeaders) {
      const val = res.headers.get(h);
      if (val) responseHeaders.set(h, val);
    }

    if (!res.ok && res.status !== 206) {
      const errBody = await res.arrayBuffer();
      return new Response(errBody, {
        status: res.status,
        headers: responseHeaders,
      });
    }

    const arrayBuffer = await res.arrayBuffer();
    const contentType = res.headers.get("Content-Type") || "";
    const isM3u8 =
      targetUrl.includes(".m3u8") ||
      contentType.includes("mpegurl") ||
      contentType.includes("application/x-mpegURL") ||
      contentType.includes("vnd.apple.mpegurl");

    if (isM3u8) {
      const text = new TextDecoder("utf-8").decode(arrayBuffer);
      if (text.includes("#EXTM3U")) {
        const proxyBase = `${reqUrl.origin}${reqUrl.pathname}`;
        const passHeaders = { Referer: referer };
        const headersParam = encodeURIComponent(JSON.stringify(passHeaders));

        // 1. Rewrite URI="..." attributes in tags like #EXT-X-MEDIA, #EXT-X-KEY
        let rewritten = text.replace(/URI="([^"]+)"/g, (match, uri) => {
          let resolved;
          if (uri.startsWith("//")) resolved = "https:" + uri;
          else if (uri.startsWith("http://") || uri.startsWith("https://")) resolved = uri;
          else resolved = new URL(uri, targetUrl).toString();

          const proxied = `${proxyBase}?url=${encodeURIComponent(resolved)}&headers=${headersParam}`;
          return `URI="${proxied}"`;
        });

        // 2. Rewrite stream/segment URIs
        const lines = rewritten.split("\n");
        const rewrittenLines = lines.map((line) => {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith("#")) return line;

          let resolved;
          if (trimmed.startsWith("//")) resolved = "https:" + trimmed;
          else if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) resolved = trimmed;
          else resolved = new URL(trimmed, targetUrl).toString();

          return `${proxyBase}?url=${encodeURIComponent(resolved)}&headers=${headersParam}`;
        });

        rewritten = rewrittenLines.join("\n");

        responseHeaders.set("Content-Type", "application/vnd.apple.mpegurl");
        responseHeaders.set("Cache-Control", "no-cache");

        return new Response(rewritten, {
          status: 200,
          headers: responseHeaders,
        });
      }
    }

    // For non-m3u8 (or raw payloads): return raw arrayBuffer safely
    return new Response(arrayBuffer, {
      status: res.status,
      headers: responseHeaders,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: `Proxy fetch failed: ${err.message}` }), {
      status: 502,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}
