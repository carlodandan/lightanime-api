import crypto from "node:crypto";
import { FLIX, BASE, HEADERS } from "../utils/constants.js";
import { rt, extractSsrObj } from "../utils/helpers.js";
import { sha256hex, le, runWasm } from "../utils/cryptoUtils.js";
import { fetchWithTimeout, isCloudflareChallenge } from "./upstreamFetch.js";

export async function getStreamUrl(access_id, v = 2) {
  const r = await fetchWithTimeout(`${FLIX}/e/${access_id}?v=${v}`, {
    headers: { ...HEADERS, Referer: `${BASE}/` }
  });

  const contentType = r.headers.get('content-type') || '';
  if (!r.ok) {
    const html = await r.text();
    if (isCloudflareChallenge(html, contentType, r.url)) {
      throw { status: 503, message: 'Cloudflare challenge detected while loading the embed page' };
    }
    throw { status: r.status, message: `Embed fetch failed: ${r.status}` };
  }

  const html = await r.text();
  if (isCloudflareChallenge(html, contentType, r.url)) {
    throw { status: 503, message: 'Cloudflare challenge detected while loading the embed page' };
  }

  return await decryptEmbed(html);
}

async function decryptEmbed(html) {
  const data = eval("(" + extractSsrObj(html) + ")");
  const seed = data.obfuscation_seed;
  const fields = le(seed);
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

  const vidKey = sha256hex(token + "vid").substring(0, 10);
  const keyKey = sha256hex(token + "key").substring(0, 10);
  const v_bytes = rt(tokData[vidKey]);
  const T_bytes = rt(tokData[keyKey]);

  if (!v_bytes.length || !T_bytes.length)
    throw new Error(`Token missing fields. Got: ${Object.keys(tokData).join(",")}`);

  const wasmOut = await runWasm(data.w_payload, frag1, kf2, T_bytes, parseInt(seed.substring(0, 8), 16));
  const pbk = crypto.pbkdf2Sync(wasmOut, seed, 1000, 32, "sha256");
  const r = Buffer.from(pbk);
  for (let i = 0; i < 32; i++) r[i] ^= seed.charCodeAt(i % seed.length);
  const aesKey = crypto.createHash("sha256").update(r).digest();

  const decipher = crypto.createDecipheriv("aes-256-cbc", aesKey, iv);
  const url = Buffer.concat([decipher.update(v_bytes), decipher.final()]).toString("utf8").trim();

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