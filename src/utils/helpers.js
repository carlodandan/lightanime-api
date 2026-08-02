// utils/helpers.js

// Decode base64 to Uint8Array (works in Workers)
export function rt(b64) {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

// Extract SSR JSON object from HTML
export function extractSsrObj(html) {
  const m = html.match(/\{type:"data",data:(\{)/);
  if (!m) throw new Error("SSR data block not found");
  let depth = 0;
  const start = html.indexOf("{", m.index + m[0].length - 1);
  for (let i = start; i < html.length; i++) {
    if (html[i] === "{") depth++;
    else if (html[i] === "}") {
      if (--depth === 0) return html.slice(start, i + 1);
    }
  }
  throw new Error("SSR brace matching failed");
}

/**
 * Safely parse a JavaScript object literal string into an object.
 * Removes trailing commas, quotes unquoted property names, and uses JSON.parse.
 */
export function parseSsrData(ssrString) {
  // Remove trailing commas inside objects and arrays
  let sanitized = ssrString
    .replace(/,\s*}/g, '}')
    .replace(/,\s*]/g, ']');

  // Quote unquoted property names (e.g., {type:"data"} → {"type":"data"})
  // This matches { or , followed by optional whitespace, then an identifier, then :
  sanitized = sanitized.replace(
    /([{,])\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g,
    '$1"$2":'
  );

  // (Optional) If strings use single quotes, convert them to double quotes.
  // But the data likely uses double quotes already; skip to avoid breaking escaped quotes.
  // If needed, you can uncomment the next line (but be careful with escaped quotes).
  // sanitized = sanitized.replace(/'([^'\\]*(\\.[^'\\]*)*)'/g, '"$1"');

  try {
    return JSON.parse(sanitized);
  } catch (error) {
    throw new Error(`Failed to parse SSR data: ${error.message}\nRaw: ${sanitized.slice(0, 200)}`);
  }
}