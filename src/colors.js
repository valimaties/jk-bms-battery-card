import { clamp, hexRgb } from "./util.js";

/* ============================================================== the card */
export const hexMix = (a, b, t) => {
  const A = hexRgb(a),
    B = hexRgb(b);
  return (
    "#" +
    [0, 1, 2]
      .map((i) =>
        Math.round(A[i] + (B[i] - A[i]) * t)
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
  );
};
export const hsl2hex = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12,
    a = s * Math.min(l, 1 - l),
    f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return (
    "#" +
    [f(0), f(8), f(4)]
      .map((x) =>
        Math.round(x * 255)
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
  );
};
export const divColor = (t) => {
  t = clamp(t, 0, 1);
  return hsl2hex(t < 0.5 ? 205 - 55 * (t / 0.5) : 150 - 118 * ((t - 0.5) / 0.5), 36, 58);
};
export const absColor = (v) =>
  hsl2hex(
    isNaN(v)
      ? 150
      : v < 3.0
        ? 150 - clamp((3.0 - v) / 0.3, 0, 1) * 150
        : v > 3.45
          ? 150 - clamp((v - 3.45) / 0.2, 0, 1) * 150
          : 150,
    40,
    56,
  );
export const heatHex = (t) => hsl2hex(150 - 150 * clamp(t, 0, 1), 40, 56);

// Pack drawing: 4, 8 or 16 EVE 314Ah cells in two rows, drawn in perspective (vanishing point at the middle of each row): blue body, black lid with a blue vent,
// silver tab and two studs (one near the front edge, one near the back edge). The studs alternate cell to cell, so the studs that face each other sit at the same
// height and a flexible copper busbar joins them. Series: row 1 runs left->right, a rigid busbar goes around the right side, row 2 runs right->left.
// The JK-BMS photo (rotated 180deg) is on the negative side; 70 mm2 cables join its terminals to cell 1 and to the pack minus; the pack plus leaves from the last cell.
