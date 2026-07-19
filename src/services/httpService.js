import { BASE, HEADERS } from "../utils/constants.js";

export async function _get(path, params = {}) {
  const url = new URL(BASE + path);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.append(k, v);
  });
  const r = await fetch(url.toString(), { headers: HEADERS });
  if (r.status === 404) throw { status: 404, message: "Not found" };
  if (!r.ok) {
    const text = await r.text();
    throw { status: r.status, message: text.slice(0, 300) };
  }
  return r.json();
}