import { tt } from "./i18n.js";
import { IMG } from "./images.js";

export const GRN = "#5cf08a";
export const LOGO =
  "data:image/png;base64,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"; // Jikong cloud logo (cut out of the product picture)
export const PK = { W: 860, H: 520, wh: 135 };
export function packOverlay(grouped, name) {
  return `<div class="ov">
    <div class="hd2">${
      grouped
        ? `<select class="pksel" data-k="pksel" title="${tt("pick_battery")}">
      </select>`
        : `<span class="pkname" data-k="bcname">${name}</span>`
    }<span class="chip idle" data-k="bcchip">–</span>
    </div>
  <div class="bgs">
    <div class="bg"><span class="l">SoC</span><b data-k="bcsoc">–</b>
    </div>
    <div class="bg"><span class="l">${tt("voltage")}</span><b data-k="bcv">–</b>
    </div>
    <div class="bg"><span class="l">${tt("current")}</span><b data-k="bca">–</b><i data-k="bcw">–</i>
    </div>
    <div class="bg"><span class="l">${tt("delta")}</span><b data-k="bcd">–</b>
    </div>
  </div>
  </div>`;
}
export function packSvg(n, id, np = 1, layout = "top-left") {
  const { W, H, wh } = PK,
    per = Math.ceil(n / 2),
    xl = 236,
    xr = 834,
    slot = (xr - xl) / Math.max(8, per),
    xe = xl + per * slot,
    cw = slot * 0.9,
    ch = 165,
    dep = 40,
    f = 0.94,
    vx = (xl + xe) / 2,
    rowY = [58, 314];
  const startRow = /^bottom/.test(layout) ? 1 : 0,
    fromLeft = !/right$/.test(layout);
  const kOf = (row, j) => (row === startRow ? (fromLeft ? j : per - 1 - j) : per + (fromLeft ? per - 1 - j : j));
  const cxOf = (j) => xl + (j + 0.5) * slot,
    x0Of = (j) => cxOf(j) - cw / 2,
    bk = (x) => vx + (x - vx) * f,
    mirrored = (j) => j % 2 === 1;
  const lid = (row, j, u, v) => {
    const x0 = x0Of(j),
      fx = x0 + u * cw,
      bx = bk(x0) + u * (bk(x0 + cw) - bk(x0));
    return [fx + (bx - fx) * v, rowY[row] - v * dep];
  };
  const FRONT = 0.2,
    BACK = 0.82;
  const stud = (row, j, side) => lid(row, j, 0.5, (side === "L") !== mirrored(j) ? FRONT : BACK);
  const ww = cw - 4,
    wave = `M0 3 Q${ww / 4} -1 ${ww / 2} 3 T${ww} 3 T${ww * 1.5} 3 T${ww * 2} 3 V${wh + 10} H0Z`;
  const nut = (pt, plus) => {
    const [px, py] = pt;
    return `<ellipse cx="${px}" cy="${py + 5}" rx="7" ry="3.1" fill="#6f747c"/>
    <rect x="${px - 7}" y="${py}" width="14" height="5" fill="#aeb4bc"/>
    <ellipse cx="${px}" cy="${py}" rx="7" ry="3.1" fill="#d6dae0"/>
    <rect x="${px - 1.7}" y="${py - 6}" width="3.4" height="6" fill="#9aa0a8"/>
    <circle cx="${px}" cy="${py - 8.5}" r="2.2" fill="${plus ? "#b5594f" : "#6b727c"}"/>`;
  };
  let cells = "",
    shd = "",
    cables = "",
    under = "",
    marks = "";
  for (let row = 0; row < 2; row++) {
    const order = Array.from({ length: per }, (_, j) => j).sort(
      (a, b) => Math.abs(b + 0.5 - per / 2) - Math.abs(a + 0.5 - per / 2),
    );
    order.forEach((j) => {
      const k = kOf(row, j),
        x0 = x0Of(j),
        x1 = x0 + cw,
        y0 = rowY[row],
        ty = y0 - dep,
        bx0 = bk(x0),
        bx1 = bk(x1),
        left = cxOf(j) < vx,
        mid = lid(row, j, 0.5, 0.5);
      const plusSide = row === 0 ? "R" : "L";
      shd += `<polygon points="${x0 - 2},${y0 + ch + 2} ${x0 - 2},${y0} ${bx0 - 2},${ty - 2} ${bx1 + 2},${ty - 2} ${x1 + 2},${y0} ${x1 + 2},${y0 + ch + 2}"/>`;
      cells += `<g class="cell" data-k="${k}" data-lx="${mid[0].toFixed(1)}" data-ly="${mid[1].toFixed(1)}"><title></title>
      <polygon points="${left ? `${x1},${y0} ${bx1},${ty} ${bx1},${ty + ch} ${x1},${y0 + ch}` : `${x0},${y0} ${bx0},${ty} ${bx0},${ty + ch} ${x0},${y0 + ch}`}" fill="#34527a"/>
      <polygon points="${x0},${y0} ${x1},${y0} ${bx1},${ty} ${bx0},${ty}" fill="#2a2d33" stroke="#3a3e45" stroke-width=".6"/>
      <rect x="${mid[0] - 8}" y="${mid[1] - 4}" width="22" height="8" rx="4" fill="#3f86b4"/>
      <rect x="${mid[0] - 28}" y="${mid[1] - 2.5}" width="14" height="5" fill="#b9bec5"/>
      <rect x="${x0}" y="${y0}" width="${cw}" height="${ch}" rx="2.5" fill="url(#bl${id})"/>
      <rect x="${x0 + 1.2}" y="${y0 + 2}" width="3" height="${ch - 4}" rx="1.5" fill="#fff" fill-opacity=".14"/>
      <text x="${x0 + 7}" y="${y0 + 16}" font-size="11" font-weight="700" fill="#fff" fill-opacity=".8">${k + 1}</text>
      <clipPath id="cp${id}_${k}"><rect x="${x0 + 2}" y="${y0 + 24}" width="${ww}" height="${wh}" rx="3"/></clipPath>
      <g clip-path="url(#cp${id}_${k})">
        <g transform="translate(${x0 + 2} ${y0 + 24})">
          <g class="liq" data-k="${k}">
            <rect y="3" width="${ww}" height="${wh + 10}"/>
            <path class="wave" d="${wave}" style="animation-delay:-${((k * 0.43) % 3.6).toFixed(2)}s"/>
        <circle class="bub" cx="${ww * 0.3}" cy="${wh - 3}" r="1.3" style="animation-delay:-${((k * 0.31) % 2.4).toFixed(2)}s"/>
        <circle class="bub" cx="${ww * 0.7}" cy="${wh - 3}" r="1" style="animation-delay:-${((k * 0.53) % 2.9).toFixed(2)}s"/>
        </g>
        </g>
        </g>${[0.25, 0.5, 0.75].map((t) => `<path d="M${x1 - 10} ${(y0 + 24 + wh * (1 - t)).toFixed(1)} h7" stroke="#fff" stroke-opacity=".3" stroke-width="1"/>`).join("")}
      ${nut(stud(row, j, "L"), plusSide === "L")}${nut(stud(row, j, "R"), plusSide === "R")}<path class="bz" transform="translate(${mid[0].toFixed(1)} ${mid[1].toFixed(1)})" d="M2.5 -11 L-5.5 1 L-0.5 1 L-3.5 11 L6 -2.5 L1 -2.5 Z"/>
      </g>
      <text class="tv" data-k="${k}" x="${cxOf(j).toFixed(1)}" y="${(y0 + ch + 18).toFixed(1)}">–</text>
      <text class="tr" data-k="${k}" x="${cxOf(j).toFixed(1)}" y="${(y0 + ch + 33).toFixed(1)}">
      </text>`;
      marks += `<g class="mkw" data-k="${k}" data-cx="${cxOf(j).toFixed(1)}" data-y0="${y0}" transform="translate(${lid(row, j, 0.5, 1)[0].toFixed(1)} ${(ty - 2).toFixed(1)})">
        <g class="mk max">
          <rect x="-12" y="-10" width="24" height="9" rx="2.2"/>
          <path d="M-3.5 -1 L0 3.5 L3.5 -1z"/>
          <text y="-3.2" text-anchor="middle">MAX</text>
        </g>
        <g class="mk min">
          <rect x="-12" y="-10" width="24" height="9" rx="2.2"/>
          <path d="M-3.5 -1 L0 3.5 L3.5 -1z"/>
          <text y="-3.2" text-anchor="middle">MIN</text>
        </g>
      </g>`;
    });
  }
  // ---- flexible copper busbar drawn on the lid plane (same perspective as the lids): two copper plates over the studs, laminated orange flex in between
  const hexAt = (x, y) => {
    const hp = (yy) =>
        [0, 1, 2, 3, 4, 5].map((i) => [x + 5.4 * Math.cos((i * Math.PI) / 3), yy + 2.5 * Math.sin((i * Math.PI) / 3)]),
      yb = y - 2,
      yt = y - 5.6,
      B = hp(yb),
      T = hp(yt),
      shade = ["#aab0b8", "#8d949d", "#bcc2c9"];
    return (
      `<ellipse cx="${x.toFixed(1)}" cy="${(y + 0.4).toFixed(1)}" rx="8" ry="3.6" fill="#8b929b"/>
      <ellipse cx="${x.toFixed(1)}" cy="${(y - 0.9).toFixed(1)}" rx="8" ry="3.6" fill="#d5d9de" stroke="#7b828a" stroke-width=".5"/>` +
      [0, 1, 2]
        .map(
          (i) =>
            `<polygon points="${[B[i], B[i + 1], T[i + 1], T[i]].map((p) => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ")}" fill="${shade[i]}" stroke="#6f767f" stroke-width=".3"/>`,
        )
        .join("") +
      `<polygon points="${T.map((p) => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ")}" fill="#e6e9ed" stroke="#7b828a" stroke-width=".4"/>` +
      `<rect x="${(x - 2.6).toFixed(1)}" y="${(yt - 4).toFixed(1)}" width="5.2" height="4.2" fill="#b3b9c1"/>
      <ellipse cx="${x.toFixed(1)}" cy="${(yt - 4).toFixed(1)}" rx="2.6" ry="1.2" fill="#e9ecef" stroke="#8a9199" stroke-width=".3"/>`
    );
  };
  const bar = (row, j, v) => {
    const Z = -2,
      e = 0.11,
      P = (jj, u, vv) => {
        const q = lid(row, jj, u, vv);
        return [q[0], q[1] + Z];
      },
      f = (p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`,
      poly = (a, dy = 0) => a.map((p) => `${p[0].toFixed(1)},${(p[1] + dy).toFixed(1)}`).join(" ");
    const j2 = j + 1,
      plate = (jj, u0, u1) => [P(jj, u0, v - e), P(jj, u1, v - e), P(jj, u1, v + e), P(jj, u0, v + e)];
    const pa = plate(j, 0.34, 0.84),
      pb = plate(j2, 0.16, 0.66);
    const t1 = P(j, 0.84, v - e),
      t2 = P(j2, 0.16, v - e),
      b1 = P(j, 0.84, v + e),
      b2 = P(j2, 0.16, v + e),
      lift = 3,
      mx = (t1[0] + t2[0]) / 2;
    const flex = `M${f(t1)} Q${mx.toFixed(1)},${(t1[1] - lift).toFixed(1)} ${f(t2)} L${f(b2)} Q${mx.toFixed(1)},${(b1[1] - lift).toFixed(1)} ${f(b1)}Z`;
    const hl = `M${f(t1)} Q${mx.toFixed(1)},${(t1[1] - lift).toFixed(1)} ${f(t2)}`;
    const hexN = (jj) => {
      const q = P(jj, 0.5, v);
      return hexAt(q[0], q[1]);
    };
    const a = P(j, 0.5, v),
      b = P(j2, 0.5, v);
    return (
      `<path d="${flex}" transform="translate(0 2)" fill="#8d3a08"/>
      <polygon points="${poly(pa, 1.5)}" fill="#b0644a"/>
      <polygon points="${poly(pb, 1.5)}" fill="#b0644a"/>` +
      `<path d="${flex}" fill="#f2701d" stroke="#b84f0c" stroke-width=".5" stroke-linejoin="round"/>
      <path d="${hl}" fill="none" stroke="#ffc08a" stroke-width=".9" stroke-opacity=".75" stroke-linecap="round"/>` +
      `<polygon points="${poly(pa)}" fill="#cdbfae" stroke="#8a7d6c" stroke-width=".6" stroke-linejoin="round"/>
      <polygon points="${poly(pb)}" fill="#cdbfae" stroke="#8a7d6c" stroke-width=".6" stroke-linejoin="round"/>` +
      `<path d="M${f(pa[0])} L${f(pa[1])} M${f(pb[0])} L${f(pb[1])}" stroke="#f1e9de" stroke-width=".8" stroke-opacity=".85" fill="none"/>` +
      hexN(j) +
      hexN(j2) +
      `<path class="fl" d="M${f(row === 0 ? a : b)} Q${mx.toFixed(1)},${(a[1] - lift - 1).toFixed(1)} ${f(row === 0 ? b : a)}" fill="none" stroke="var(--txt)" stroke-width="1.3" stroke-linecap="round" stroke-dasharray="2 7"/>`
    );
  };
  // ---- thick 70 mm2 cable: black/red insulation, soft highlight, copper lugs on the ends, thin dashes for the current
  const cable = (d, col, ends) =>
    `<path d="${d}" fill="none" stroke="#9aa3b0" stroke-opacity=".5" stroke-width="7.8" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="${d}" fill="none" stroke="${col}" stroke-width="6.2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="${d}" fill="none" stroke="#fff" stroke-opacity=".16" stroke-width="1.5" stroke-linecap="round" transform="translate(0 -1.6)"/>
    <path class="fl" d="${d}" fill="none" stroke="var(--txt)" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="2 9"/>${ends
      .map(
        (e) => `<circle cx="${e[0]}" cy="${e[1]}" r="4.2" fill="#c47a2c" stroke="#7a4a1c" stroke-width=".8"/>
    <circle cx="${e[0]}" cy="${e[1]}" r="1.6" fill="#2b2f36"/>`,
      )
      .join("")}`;
  const BLK = "#1b1e23",
    RED = "#a8453c";
  for (let row = 0; row < 2; row++) for (let j = 0; j < per - 1; j++) cables += bar(row, j, mirrored(j) ? FRONT : BACK);
  const PERS = [0.93, -0.07, 0.075, 1]; // matrix(a b c d): width foreshortening, slope of the horizontal edges, lean of the vertical edges
  const bs = 0.75,
    K = bs / (270 / 490),
    bcx = 112,
    bcy = H / 2,
    bt = (px, py) => [bcx - (px - 80) * bs, bcy - (py - 245) * bs];
  const cellSide = [bt(17.5, 191.5), bt(17.5, 225)],
    outSide = [bt(123.5, 185), bt(123.5, 224)],
    led = [bt(35, 147.5), bt(70, 147.5), bt(105, 147.5)],
    hb = bt(120, 22);
  const first = stud(0, 0, "L"),
    s1 = stud(0, per - 1, "R"),
    s2 = stud(1, per - 1, "R"),
    last = stud(1, 0, "L"),
    mPost = [14, bcy + 40 * bs],
    pPost = [14, bcy + 210 * bs],
    xf = xe + 14;
  // row 1 -> row 2 around the right side: a rigid tinned-copper busbar in the shape of a reversed C (the strip is twisted by 90 deg at both bends), orange heat-shrink on the vertical run, a nut on each stud
  {
    const w = 8.8,
      h = w / 2,
      y1 = s1[1] - 2,
      y2 = s2[1] - 2,
      x1 = s1[0],
      x2 = s2[0],
      X = xf,
      ro = 5.5,
      ri = 1.3,
      f = (n) => n.toFixed(1),
      P2 = (a) => a.map((p) => f(p[0]) + "," + f(p[1])).join(" ");
    const sv = mirrored(per - 1) ? FRONT : BACK,
      ul = lid(0, per - 1, 0.16, sv + 0.11)[0],
      ll = lid(0, per - 1, 0.16, sv - 0.11)[0],
      a1 = ul,
      a2 = ul,
      body = `M${f(ul)} ${f(y1 - h)} H${f(X + h - ro)} Q${f(X + h)} ${f(y1 - h)} ${f(X + h)} ${f(y1 - h + ro)} V${f(y2 + h - ro)} Q${f(X + h)} ${f(y2 + h)} ${f(X + h - ro)} ${f(y2 + h)} H${f(ll)} L${f(ul)} ${f(y2 - h)} H${f(X - h + ri)} Q${f(X - h)} ${f(y2 - h)} ${f(X - h)} ${f(y2 - h - ri)} V${f(y1 + h + ri)} Q${f(X - h)} ${f(y1 + h)} ${f(X - h + ri)} ${f(y1 + h)} H${f(ll)}Z`,
      d = `M${f(x1)} ${f(y1)} H${X} V${f(y2)} H${f(x2)}`;
    const hs = `M${f(x1 + 22)} ${f(y1)} H${X} V${f(y2)} H${f(x2 + 22)}`;
    const ou = lid(0, per - 1, 0.66, sv + 0.11)[0],
      ol = lid(0, per - 1, 0.66, sv - 0.11)[0],
      dd = ol - ou,
      Y = 7 * h,
      cl = (cy) =>
        P2([
          [ou - 3 * dd, cy - Y],
          [X + 60, cy - Y],
          [X + 60, cy + Y],
          [ol + 3 * dd, cy + Y],
        ]);
    const dark = (cy, s) =>
      `<polygon points="${P2([
        [X - h, cy + s * h],
        [X + h - 1, cy - s * h],
        [X - h - 16, cy - s * h],
        [X - h - 16, cy + s * h],
      ])}" fill="#5a4a38" fill-opacity=".28"/>`;
    const crease = (cy, s) =>
      `<path d="M${f(X - h + 0.6)} ${f(cy + s * h - s * 0.6)} Q${f(X)} ${f(cy + s * 0.5)} ${f(X + h - 2)} ${f(cy - s * h + s * 1.5)}" fill="none" stroke="#6b5e4d" stroke-width="1.1" stroke-linecap="round"/>
      <path d="M${f(X - h + 0.6)} ${f(cy + s * h + s * 0.9)} Q${f(X - h + 2)} ${f(cy + s * h + s * 2.6)} ${f(X - h + 5)} ${f(cy + s * h + s * 2.8)}" fill="none" stroke="#000" stroke-opacity=".25" stroke-width="1.6" stroke-linecap="round"/>`;
    cables +=
      `<path d="${body}" fill="#b0644a" transform="translate(0 1.5)"/>
      <path d="${body}" fill="#cdbfae" stroke="#8a7d6c" stroke-width=".6" stroke-linejoin="round"/>
      <path d="M${f(a1 + 3)} ${f(y1 - h + 0.8)} H${f(X + h - ro)} Q${f(X + h - 0.8)} ${f(y1 - h + 0.8)} ${f(X + h - 0.8)} ${f(y1 - h + ro)} V${f(y2 + h - ro)} Q${f(X + h - 0.8)} ${f(y2 + h - 0.8)} ${f(X + h - ro)} ${f(y2 + h - 0.8)} H${f(a2 + 3)}" fill="none" stroke="#f4ece1" stroke-opacity=".75" stroke-width=".8"/>` +
      `<clipPath id="cb${id}">
        <polygon points="${cl(y1)}"/>
        <polygon points="${cl(y2)}"/>
        <rect x="${f(X - h - 2)}" y="${f(y1 - Y)}" width="${f(h + 62)}" height="${f(y2 - y1 + 2 * Y)}"/>
      </clipPath>
      <g clip-path="url(#cb${id})">
        <path d="${body}" fill="#f2701d" stroke="#b84f0c" stroke-width=".9" stroke-linejoin="round"/>
        <path d="M${f(ul + 3)} ${f(y1 - h + 1.5)} H${f(X + h - ro - 1)} Q${f(X + h - 1.5)} ${f(y1 - h + 1.5)} ${f(X + h - 1.5)} ${f(y1 - h + ro)} V${f(y2 + h - ro)}" fill="none" stroke="#ffc08a" stroke-opacity=".65" stroke-width="1"/>
      </g>` +
      dark(y1, 1) +
      dark(y2, -1) +
      crease(y1, 1) +
      crease(y2, -1) +
      `<path class="fl" d="${d}" fill="none" stroke="var(--txt)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="2 9"/>` +
      hexAt(x1, y1) +
      hexAt(x2, y2);
  }
  under += cable(`M${last[0]} ${last[1]} C${last[0] - 50} ${last[1]} 70 ${pPost[1]} ${pPost[0]} ${pPost[1]}`, RED, [
    last,
  ]);
  cables += cellSide
    .map((t, i) =>
      cable(
        `M${t[0]} ${t[1]} C${t[0] + 44} ${t[1]} ${first[0] - 56} ${first[1] + 58 * K - i * 6 * K} ${first[0] - 22} ${first[1] + 6 * K - i * 3 * K} L${first[0]} ${first[1] - i * 3 + 0}`,
        BLK,
        [t],
      ),
    )
    .join("");
  cables +=
    cellSide
      .map((t, i) =>
        cable(
          `M${t[0]} ${t[1]} C${t[0] + 44} ${t[1]} ${first[0] - 56} ${first[1] + 58 * K - i * 6 * K} ${first[0] - 22} ${first[1] + 6 * K - i * 3 * K} L${first[0]} ${first[1] - i * 3 + 0}`,
          BLK,
          [t],
        ),
      )
      .join("") +
    outSide
      .map((t, i) =>
        cable(
          `M${mPost[0]} ${mPost[1] + (i ? 6 : -6)} C${mPost[0] + 24} ${mPost[1] + (i ? 6 : -6)} ${t[0] - 24} ${t[1]} ${t[0]} ${t[1]}`,
          BLK,
          [t],
        ),
      )
      .join("");
  const sp0 = bt(150, 106),
    supply = (() => {
      const d = `M${sp0[0].toFixed(1)} ${sp0[1].toFixed(1)} C${(sp0[0] - 12).toFixed(1)} ${(sp0[1] + 6).toFixed(1)} ${(pPost[0] + 26).toFixed(1)} ${(pPost[1] - 34).toFixed(1)} ${(pPost[0] + 5.5).toFixed(1)} ${(pPost[1] - 5.5).toFixed(1)}`;
      return `<path d="${d}" fill="none" stroke="#14100f" stroke-width="3.6" stroke-linecap="round"/>
      <path d="${d}" fill="none" stroke="${RED}" stroke-width="2.3" stroke-linecap="round"/>
      <path d="${d}" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width=".7" stroke-linecap="round" transform="translate(0 -.8)"/>`;
    })();
  const bms = `<g transform="translate(${bcx} ${bcy}) rotate(180) scale(${bs.toFixed(4)}) translate(-80 -245)"><use href="#bms${id}"/></g>
`;
  const post = (pt, plus) =>
    `<circle cx="${pt[0]}" cy="${pt[1]}" r="8" fill="#cfd4db" stroke="${plus ? "#b5594f" : "#6f757e"}" stroke-width="2.4"/>
    <text x="${pt[0] - 4}" y="${pt[1] - 13}" font-size="16" font-weight="700" fill="${plus ? "#b5594f" : "var(--dim)"}">${plus ? "+" : "−"}</text>`;
  // ---- BMS display (JK touch screen, 7" body / 4.3" screen: same proportions as the product photo) left of the BMS; wired to the small LCD socket on the left edge of the BMS board. Click = display_always_on switch
  const lcd = bt(146, 333),
    dsc = (l, x, y, fs, fill, extra = "") =>
      `<text x="${x}" y="${y}" font-size="${fs}" fill="${fill}" ${extra}>${l}</text>`,
    dt = (key, suf, x, y, fs, fill, extra = "") =>
      dsc(tt(key) + suf, x, y, fs, fill, `data-tr="${key}|${suf}" ${extra}`),
    GR = "#5cf08a",
    WT = "#e6ece8";
  const dv = (k, x, y, fs, anchor = "start") =>
    `<text data-d="${k}" x="${x}" y="${y}" font-size="${fs}" font-weight="700" fill="${GR}" text-anchor="${anchor}">–</text>`;
  const tab = (c, key, dark, go) =>
    `<polygon points="${c - 52},221 ${c + 52},221 ${c + 44},238.6 ${c - 44},238.6" fill="${dark ? "#03060a" : "#f2f4f5"}"/>${dt(key, "", c, 234.4, 11, dark ? "#fff" : "#111", 'font-weight="700" text-anchor="middle"')}${go ? `<polygon class="hit" data-go="${go}" points="${c - 52},221 ${c + 52},221 ${c + 44},238.6 ${c - 44},238.6" fill="#000" fill-opacity="0"/>` : ""}`;
  const outline =
    "M4 4 H429 V221 H" +
    [355, 216, 76].map((c) => `${c + 52} L${c + 44} 238.6 H${c - 44} L${c - 52} 221`).join(" H") +
    " H4 Z";
  const ico = (cx, ch) =>
    `<circle cx="${cx}" cy="46" r="10" fill="none" stroke="${GR}" stroke-width="2"/>${dsc(ch, cx, 50.5, 12, GR, 'text-anchor="middle" font-weight="700"')}`;
  const logo = `<image href="${LOGO}" x="6" y="9" width="38" height="22"/>${dsc("极空", 50, 26, 17, "#f2f6fa", 'font-weight="700"')}${dsc("JIKONG", 51, 33, 5.4, "#9fd2f2", 'letter-spacing="1.4"')}`;
  const pkIco = (i) => {
    const cx = 33 + 52 * (i % 8),
      top = i < 8 ? 52 : 130,
      on = i < np;
    return `<g class="pkb" ${on ? `data-go="cells" data-pk="${i}"` : ""} opacity="${on ? 1 : 0.16}">
      <rect x="${cx - 5}" y="${top}" width="10" height="4" rx="1" fill="#3dff5a"/>
      <rect x="${cx - 15}" y="${top + 3}" width="30" height="38" rx="6" fill="#1fd23a" stroke="#4dff63" stroke-width="2"/>
      <path d="M${cx + 2} ${top + 9} L${cx - 7} ${top + 24} H${cx - 1} L${cx - 3} ${top + 36} L${cx + 7} ${top + 19} H${cx + 1} Z" fill="#fff"/>
      <circle cx="${cx}" cy="${top + 57}" r="7" fill="none" stroke="#e6ece8" stroke-width="1"/>${dsc(i, cx, top + 60.5, 9, WT, 'text-anchor="middle"')}${on ? `<rect x="${cx - 18}" y="${top - 2}" width="36" height="72" fill="#000" fill-opacity="0"/>` : ""}</g>`;
  };
  const packsPage = `<path d="${outline}" fill="#03060a" stroke="#8d9aa3" stroke-width="1.3" stroke-linejoin="round"/>${logo}${[0, 1, 2, 3].map((k) => `<path class="chv chv${k}" d="M${201 + k * 12} 11 L${207 + k * 12} 17.5 L${201 + k * 12} 24"/>`).join("")}${Array.from({ length: 16 }, (_, i) => pkIco(i)).join("")}${tab(76, "scr_tab_group", false, "group")}${tab(216, "scr_tab_packs", true)}${tab(355, "scr_tab_setting", false)}`;
  const cl = "#e6ece8",
    gic = (cy, ch) =>
      `<circle cx="121" cy="${cy}" r="7" fill="none" stroke="${GR}" stroke-width="1.4"/>${dsc(ch, 121, cy + 3.6, 9.5, GR, 'text-anchor="middle" font-weight="700"')}`;
  const cellsPage = `<rect width="433" height="243" fill="#03060a"/>
  <g data-go="packs">
    <circle cx="22" cy="21" r="9" fill="none" stroke="${cl}" stroke-width="1.4"/>
    <path d="M27 21 H17 M20.5 17 L16.5 21 L20.5 25" fill="none" stroke="${cl}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="22" cy="21" r="12" fill="#000" fill-opacity="0"/>
  </g>
    <circle cx="74" cy="21" r="9" fill="none" stroke="${cl}" stroke-width="1.4"/>
    <text data-d="pn" x="74" y="25.3" font-size="12" fill="${cl}" text-anchor="middle">0</text>${[0, 1, 2, 3].map((k) => `<path class="chv chv${k}" d="M${201 + k * 12} 11 L${207 + k * 12} 17.5 L${201 + k * 12} 24"/>`).join("")}
    <circle cx="17" cy="52" r="4.6" fill="${GR}"/>${dt("scr_batcap2", "", 25, 55, 9.5, cl)}${dv("cap2", 14, 74, 16)}<circle cx="17" cy="95" r="4.6" fill="${GR}"/>${dt("scr_remcap2", "", 25, 98, 9.5, cl)}${dv("rem2", 14, 117, 16)}
    <text data-d="pct2" x="50" y="146" font-size="16" font-weight="700" fill="#fff" text-anchor="middle">–</text>
    <g class="batg">
      <rect class="bo bcap" x="42" y="152" width="16" height="5" rx="1" fill="#e0302f"/>
      <rect class="bo" x="28" y="156" width="44" height="76" rx="5" fill="none" stroke="#e0302f" stroke-width="2.2"/>${[0, 1, 2, 3, 4].map((k) => `<rect class="bb" x="33" y="${(215.8 - 13.4 * k).toFixed(1)}" width="34" height="10" fill="#2a0d0d"/>`).join("")}</g>
    <rect x="105" y="34" width="318" height="62" rx="8" fill="none" stroke="#8d9aa3" stroke-width="1"/>${gic(52, "◔")}${dt("scr_voldiff", ":", 133, 56, 11, cl)}${dv("vd", 177, 56, 12.5)}${dt("scr_chg", ":", 250, 56, 11, cl)}${dv("chg2", 279, 56, 12)}${dt("scr_temp", ":", 340, 56, 11, cl)}${dv("tp2", 372, 56, 12)}
    ${gic(78, "A")}${dt("scr_cur", ":", 133, 82, 11, cl)}${dv("a2", 160, 82, 12.5)}${dt("scr_dch", ":", 250, 82, 11, cl)}${dv("dch2", 279, 82, 12)}${dt("scr_alarm", ":", 340, 82, 11, cl)}${dv("alm2", 376, 82, 11)}
    <rect x="105" y="108" width="318" height="128" rx="8" fill="none" stroke="#8d9aa3" stroke-width="1"/>
    <rect x="226" y="102" width="76" height="12" fill="#03060a"/>${dt("scr_cellsv", "", 264, 112, 10.5, cl, 'text-anchor="middle"')}
    ${Array.from({ length: n }, (_, k) => {
      const x = 115 + (k % 4) * 78,
        y = 135 + Math.floor(k / 4) * 26;
      return `${dsc(k + 1, x + 15, y, 11, cl, 'text-anchor="end"')}${dv("cv" + k, x + 21, y, 12.5)}`;
    }).join("")}`;
  const dsp = `<g class="dsp" data-d="dsp" transform="translate(-246 44) scale(.4)">
    <title>${tt("screen_tip")}</title><clipPath id="dc${id}">
      <rect x="1.5" y="1.5" width="607" height="420" rx="34.5"/>
    </clipPath>
  <rect x="1.5" y="1.5" width="607" height="420" rx="34.5" fill="#0b0c0e" stroke="#30343a" stroke-width="3"/>
  <rect class="scr" x="90" y="92" width="433" height="243" fill="#0a0c0e"/>
  <g class="dsc" transform="translate(90 92)" font-family="Roboto,Arial,sans-serif">
    <g class="pg pg-group">
      <path d="${outline}" fill="#03060a" stroke="#8d9aa3" stroke-width="1.3" stroke-linejoin="round"/>
      <image href="${LOGO}" x="6" y="9" width="38" height="22"/>${dsc("极空", 50, 26, 17, "#f2f6fa", 'font-weight="700"')}${dsc("JIKONG", 51, 33, 5.4, "#9fd2f2", 'letter-spacing="1.4"')}${[0, 1, 2, 3].map((k) => `<path class="chv chv${k}" d="M${201 + k * 12} 11 L${207 + k * 12} 17.5 L${201 + k * 12} 24"/>`).join("")}${dt("scr_language", " ▾", 352, 21, 12, "#fff")}<rect class="hit" data-go="lang" x="338" y="4" width="92" height="24" fill="#000" fill-opacity="0"/>
    ${ico(49, "V")}${dt("scr_vtg", ":", 66, 53, 15, WT)}${dv("v", 111, 53, 22)}${ico(266, "A")}${dt("scr_cur", ":", 283, 53, 15, WT)}${dv("a", 327, 53, 22)}
    <circle cx="87" cy="114" r="47" fill="none" stroke="#4ee07e" stroke-width="1.6"/>
    <circle cx="87" cy="114" r="39" fill="none" stroke="#1d3a2a" stroke-width="11"/>
    <circle class="rng" cx="87" cy="114" r="39" fill="none" stroke="#4ee07e" stroke-width="11" stroke-dasharray="0 245" transform="rotate(-90 87 114)"/>
    <g class="tipg">${Array.from({ length: 6 }, (_, j) => {
      const f = j / 5,
        m = (x, y) => Math.round(x + (y - x) * f);
      return `<circle class="sgt" cx="87" cy="114" r="39" fill="none" stroke="rgb(${m(78, 47)},${m(224, 140)},${m(126, 255)})" stroke-width="11" stroke-dasharray="2.7 242.3" stroke-dashoffset="0" transform="rotate(-90 87 114)"/>`;
    }).join("")}</g>
    <circle cx="87" cy="114" r="31" fill="none" stroke="#4ee07e" stroke-width="1.6"/>
    <text data-d="soc" x="87" y="121" font-size="20" font-weight="700" fill="#fff" text-anchor="middle">–</text>
    ${dv("cap", 235, 115, 25, "middle")}${dt("scr_batcap", "", 235, 131, 9.5, WT, 'text-anchor="middle"')}${dv("rem", 363, 115, 25, "middle")}${dt("scr_remcap", "", 363, 131, 9.5, WT, 'text-anchor="middle"')}
    ${dt("scr_maxcell", ":", 13, 189, 12, WT)}${dv("mx", 79, 189, 14)}${dt("scr_mincell", ":", 13, 211, 12, WT)}${dv("mn", 79, 211, 14)}
    ${dt("scr_temp", ":", 150, 189, 12, WT)}${dv("tp", 193, 189, 14)}${dt("scr_pwr", ":", 150, 211, 12, WT)}${dv("pw", 219, 211, 14)}
    ${dt("scr_alarm", ":", 266, 189, 12, WT)}${dv("alm", 316, 189, 12)}${dt("scr_packs", ":", 266, 211, 12, WT)}${dv("np", 308, 211, 14)}
    ${dt("scr_chg", ":", 364, 189, 12, WT)}${dv("chg", 396, 189, 13)}${dt("scr_dch", ":", 364, 211, 12, WT)}${dv("dch", 396, 211, 13)}${tab(76, "scr_tab_group", true)}${tab(216, "scr_tab_packs", false, "packs")}${tab(355, "scr_tab_setting", false)}</g>
    <g class="pg pg-packs">${packsPage}</g>
    <g class="pg pg-cells">${cellsPage}</g>
    </g>
  <g class="pwr">
    <title>${tt("pwr_tip")}</title>
    <defs><linearGradient id="pm${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#f4f6f8"/>
        <stop offset=".3" stop-color="#8d949d"/>
        <stop offset=".5" stop-color="#e3e6ea"/>
        <stop offset=".75" stop-color="#6b727b"/>
        <stop offset="1" stop-color="#c9cdd2"/>
      </linearGradient><linearGradient id="pn${id}" x1="1" y1="1" x2="0" y2="0">
        <stop offset="0" stop-color="#e8ebee"/>
        <stop offset=".5" stop-color="#5d646d"/>
        <stop offset="1" stop-color="#bfc4ca"/>
      </linearGradient><radialGradient id="pc${id}" cx=".4" cy=".35" r=".85">
        <stop offset="0" stop-color="#c23a1c" stop-opacity=".66"/>
        <stop offset=".55" stop-color="#8e2210" stop-opacity=".72"/>
        <stop offset="1" stop-color="#641408" stop-opacity=".74"/>
      </radialGradient><radialGradient id="ps${id}" cx=".5" cy=".5" r=".5">
        <stop offset=".55" stop-color="#000" stop-opacity=".55"/>
        <stop offset="1" stop-color="#000" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <ellipse cx="297" cy="389" rx="34" ry="26" fill="url(#ps${id})"/>
    <circle cx="305" cy="379" r="27" fill="url(#pm${id})" stroke="#4d535b" stroke-width=".8"/>
    <circle cx="305" cy="379" r="25.4" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width=".6"/>
    <circle cx="305" cy="379" r="23.4" fill="none" stroke="#2c3036" stroke-opacity=".4" stroke-width="1.4"/>
    <circle cx="305" cy="379" r="22" fill="#3a0806"/>
    <circle class="lr2" cx="305" cy="379" r="20.6" fill="none" stroke-width="2.6"/>
    <circle cx="305" cy="379" r="19" fill="#4a1008"/>
    <circle class="lr1" cx="305" cy="379" r="16.9" fill="none" stroke-width="4"/>
    <circle class="lr2" cx="305" cy="379" r="14.6" fill="none" stroke-width="1.3"/>
    <circle cx="305" cy="379" r="14" fill="url(#pn${id})"/>
    <path d="M298 371.5 306 379.5 312 386M313 373 305 379.5 299 387" stroke="#fff" stroke-opacity=".3" stroke-width=".35" fill="none"/>
    <ellipse cx="305" cy="372.5" rx="9" ry="4" fill="#fff" fill-opacity=".14"/><circle class="cp" cx="305" cy="379" r="14" fill="url(#pc${id})"/>
    <circle cx="305" cy="379" r="27" fill="transparent"/>
    </g>
  <g class="gl" clip-path="url(#dc${id})"><polygon points="420,0 610,0 610,423 170,423" fill="url(#gg${id})"/></g></g>`;
  const wire = `M-40 213 C-40 238 12 236 ${(lcd[0] - 22).toFixed(1)} ${(lcd[1] + 8).toFixed(1)} L${lcd[0].toFixed(1)} ${lcd[1].toFixed(1)}`;
  const lcdWire = `<path d="${wire}" fill="none" stroke="#0e1013" stroke-width="5" stroke-linecap="round"/>
  <path d="${wire}" fill="none" stroke="#4a505a" stroke-width="3.2" stroke-linecap="round"/>
  <path d="${wire}" fill="none" stroke="#9aa3b0" stroke-opacity=".5" stroke-width=".9" stroke-linecap="round" transform="translate(-.8 -.8)"/>
  <rect x="-47" y="209" width="14" height="5" rx="1.2" fill="#e4e6ea" stroke="#7a7f88" stroke-width=".6"/>
  <rect x="${(lcd[0] - 5).toFixed(1)}" y="${(lcd[1] - 3).toFixed(1)}" width="9" height="6" rx="1.2" fill="#e4e6ea" stroke="#7a7f88" stroke-width=".6"/>`;
  const defs = `<linearGradient id="gg${id}" gradientUnits="userSpaceOnUse" x1="295" y1="211" x2="610" y2="423">
    <stop offset="0" stop-color="#fff" stop-opacity=".11"/>
    <stop offset=".55" stop-color="#fff" stop-opacity=".03"/>
    <stop offset="1" stop-color="#fff" stop-opacity=".005"/>
  </linearGradient><filter id="sh${id}" x="-20%" y="-20%" width="140%" height="140%">
    <feGaussianBlur stdDeviation="5"/>
  </filter><filter id="zg${id}" x="-30%" y="-80%" width="160%" height="260%">
    <feGaussianBlur stdDeviation="2.6"/>
  </filter><linearGradient id="bl${id}" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#5b82b5"/>
    <stop offset="1" stop-color="#3f5f90"/>
  </linearGradient><image id="bms${id}" width="160" height="490" href="${IMG.jkbms}"/>`;
  return `<svg class="pk" viewBox="-250 0 ${W + 250} ${H}">
    <defs>${defs}</defs>
    <g class="shd" filter="url(#sh${id})">${shd}</g>${cells}<g class="und">${under}</g>${bms}${cables}${lcdWire}${supply}${dsp}${post(mPost, false)}${post(pPost, true)}<g class="zap">
    </g>
    <g class="mks">${marks}</g>
  </svg>`;
}
// write innerHTML only when it changed: replacing identical nodes every refresh makes the page jump while scrolling on phones
