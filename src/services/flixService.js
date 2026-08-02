import { FLIX, BASE, HEADERS } from "../utils/constants.js";
import { rt, extractSsrObj, parseSsrData } from "../utils/helpers.js";  // <-- import parseSsrData
import { sha256hex, pbkdf2, decryptAES } from "../utils/crypto.js";

// le(seed) – synchronous, uses sha256hex (now async) so we must make it async
async function le(seed) {
  let e = seed, l = seed;
  for (let i = 0; i < 3; i++) e = await sha256hex(e + i);
  l = e;
  for (let i = 0; i < 3; i++) l = await sha256hex(l + i);
  return {
    keyField:      "kf_"  + e.substring(8,  16),
    ivField:       "ivf_" + e.substring(16, 24),
    containerName: "cd_"  + e.substring(24, 32),
    arrayName:     "ad_"  + e.substring(32, 40),
    objectName:    "od_"  + e.substring(40, 48),
    tokenField:    e.substring(48, 64) + "_" + e.substring(56, 64),
    keyFrag2Field: l.substring(0, 16)  + "_" + l.substring(16, 24),
  };
}

// runWasm – unchanged (uses WebAssembly API)
async function runWasm(wasmB64, frag1, kf2, T_bytes, seedInt) {
  const wasmBytes = rt(wasmB64);
  const { instance } = await WebAssembly.instantiate(wasmBytes);
  const { _s, _r, memory } = instance.exports;
  const h = new Uint8Array(memory.buffer);
  const len = frag1.length;
  const [y, v, T, out] = [1000, 1000 + len, 1000 + 2 * len, 1000 + 3 * len];
  h.set(frag1, y);
  h.set(kf2, v);
  h.set(T_bytes, T);
  _s(seedInt);
  _r(y, v, T, out, len);
  return h.subarray(out, out + len);
}

// Main decryption
async function decryptEmbed(html) {
  // Extract the SSR string and parse it safely
  const ssrString = extractSsrObj(html);
  const data = parseSsrData(ssrString);   // <-- replaces eval

  const seed = data.obfuscation_seed;
  const fields = await le(seed);
  const ocd = data.obfuscated_crypto_data;
  const obj = ocd[fields.containerName][fields.arrayName][0][fields.objectName];
  
  const frag1 = rt(obj[fields.keyField]);
  const iv = rt(obj[fields.ivField]);
  const kf2 = rt(data[fields.keyFrag2Field]);
  const token = data[fields.tokenField];

  if (!token) throw new Error("Token field missing from embed data");

  const rTok = await fetch(`${FLIX}/api/m3u8/${token}`, { 
    headers: { ...HEADERS, Referer: `${BASE}/` } 
  });
  const tokData = await rTok.json();

  const vidKey = (await sha256hex(token + "vid")).substring(0, 10);
  const keyKey = (await sha256hex(token + "key")).substring(0, 10);
  const v_bytes = rt(tokData[vidKey]);
  const T_bytes = rt(tokData[keyKey]);

  if (!v_bytes.length || !T_bytes.length)
    throw new Error(`Token missing fields. Got: ${Object.keys(tokData).join(",")}`);

  const wasmOut = await runWasm(data.w_payload, frag1, kf2, T_bytes, parseInt(seed.substring(0, 8), 16));
  const pbk = await pbkdf2(wasmOut, seed, 1000, 32);
  const r = new Uint8Array(pbk);
  for (let i = 0; i < 32; i++) r[i] ^= seed.charCodeAt(i % seed.length);
  const hash = await crypto.subtle.digest('SHA-256', r);
  const aesKey = new Uint8Array(hash);

  const decrypted = await decryptAES(aesKey, iv, v_bytes);
  const url = new TextDecoder().decode(decrypted).trim();

  if (!url.startsWith("http")) throw new Error(`Unexpected URL: ${url}`);

  return {
    url,
    subtitles: data.subtitles ?? [],
    thumbnails_vtt: data.thumbnails_vtt ?? null,
    video_title: data.video_title ?? null,
    intro_chapter: data.intro_chapter ?? null,
    outro_chapter: data.outro_chapter ?? null,
    video_id: data.video_id ?? null,
  };
}

export async function getStreamUrl(access_id, v = 2) {
  const r = await fetch(`${FLIX}/e/${access_id}?v=${v}`, {
    headers: { ...HEADERS, Referer: `${BASE}/` }
  });
  if (!r.ok) throw { status: r.status, message: `Embed fetch failed: ${r.status}` };
  return await decryptEmbed(await r.text());
}