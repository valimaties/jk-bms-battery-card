export const NS = "http://www.w3.org/2000/svg";
export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
export const num = (s) => {
  if (!s) return NaN;
  const v = parseFloat(s.state);
  return isNaN(v) ? NaN : v;
};
export const fmt = (v, d = 1) => (isNaN(v) ? "–" : v.toFixed(d));
export const fmtW = (w) =>
  isNaN(w) ? "–" : Math.abs(w) >= 1000 ? (w / 1000).toFixed(2) + " kW" : Math.round(w) + " W";
export const socColor = (s) =>
  isNaN(s) ? "#8899aa" : s < 15 ? "#c9695c" : s < 30 ? "#d9a066" : s < 50 ? "#d8b46a" : "#7fb58e";
export const heat = (t) => `hsl(${Math.round(150 - 150 * clamp(t, 0, 1))} 85% 55%)`;
export const mk = (tag, attrs, parent) => {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs || {}) e.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(e);
  return e;
};
export const html = (s) => {
  const t = document.createElement("template");
  t.innerHTML = s.trim();
  return t.content.firstChild;
};
export const hexRgb = (h) => {
  h = h.replace("#", "");
  if (h.length === 3)
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
export const rgbCache = {};
export const rgbOf = (c) => (rgbCache[c] = rgbCache[c] || (c[0] === "#" ? hexRgb(c) : [128, 128, 128]));

export function grpOrder(bs, mi) {
  return [
    mi,
    ...bs
      .map((_, i) => i)
      .filter((i) => i !== mi)
      .sort((a, b) => (bs[a].slave || 999) - (bs[b].slave || 999) || a - b),
  ];
}
