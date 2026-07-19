import crypto from "node:crypto";
import { rt } from "./helpers.js";

export function sha256hex(s) {
  return crypto.createHash("sha256").update(s).digest("hex");
}

export function le(seed) {
  let e = seed, l = seed;
  for (let i = 0; i < 3; i++) e = sha256hex(e + i);
  l = e;
  for (let i = 0; i < 3; i++) l = sha256hex(l + i);
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

export async function runWasm(wasmB64, frag1, kf2, T_bytes, seedInt) {
  const { instance } = await WebAssembly.instantiate(rt(wasmB64));
  const { _s, _r, memory } = instance.exports;
  const h = new Uint8Array(memory.buffer);
  const len = frag1.length;
  const [y, v, T, out] = [1000, 1000 + len, 1000 + 2 * len, 1000 + 3 * len];
  h.set(frag1, y);
  h.set(kf2, v);
  h.set(T_bytes, T);
  _s(seedInt);
  _r(y, v, T, out, len);
  return Buffer.from(h.subarray(out, out + len));
}