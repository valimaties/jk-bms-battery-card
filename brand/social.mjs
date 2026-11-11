// Renders the repository social preview (1280x640): npm run social
import { Resvg } from "@resvg/resvg-js";
import { readFileSync, writeFileSync } from "node:fs";

const pack = readFileSync("brand/social-pack.png").toString("base64");
const chips = ["Cell-by-cell pack", "Live balancing", "BMS screen replica", "6 languages"];
let cx = 70;
const chipSvg = chips
  .map((t) => {
    const w = 26 + t.length * 10.6;
    const s = `<g transform="translate(${cx} 430)"><rect width="${w}" height="40" rx="20" fill="#5cf08a" fill-opacity=".10" stroke="#5cf08a" stroke-opacity=".55"/><text x="${w / 2}" y="26" text-anchor="middle" font-size="17" fill="#d9f7e3">${t}</text></g>`;
    cx += w + 12;
    return s;
  })
  .join("");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1280 640" width="1280" height="640" font-family="Segoe UI, Roboto, Arial, sans-serif">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#05080d"/><stop offset="1" stop-color="#0c1623"/></linearGradient>
    <radialGradient id="g1" cx=".08" cy=".05" r=".6"><stop offset="0" stop-color="#5cf08a" stop-opacity=".16"/><stop offset="1" stop-color="#5cf08a" stop-opacity="0"/></radialGradient>
    <radialGradient id="g2" cx=".95" cy=".95" r=".6"><stop offset="0" stop-color="#35a8ff" stop-opacity=".20"/><stop offset="1" stop-color="#35a8ff" stop-opacity="0"/></radialGradient>
    <linearGradient id="tt" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5cf08a"/><stop offset="1" stop-color="#35a8ff"/></linearGradient>
    <clipPath id="panel"><rect x="560" y="120" width="660" height="302" rx="22"/></clipPath>
  </defs>
  <rect width="1280" height="640" fill="url(#bg)"/>
  <rect width="1280" height="640" fill="url(#g1)"/>
  <rect width="1280" height="640" fill="url(#g2)"/>
  <rect x="560" y="120" width="660" height="302" rx="22" fill="#26282c"/>
  <g clip-path="url(#panel)"><image x="552" y="124" width="670" height="306" preserveAspectRatio="xMidYMid slice" xlink:href="data:image/png;base64,${pack}"/></g>
  <rect x="560.5" y="120.5" width="659" height="301" rx="22" fill="none" stroke="#8d9aa3" stroke-opacity=".45"/>
  <text x="70" y="112" font-size="19" font-weight="600" letter-spacing="4" fill="#35a8ff">HOME ASSISTANT  ·  HACS</text>
  <text x="66" y="196" font-size="78" font-weight="700" fill="#ffffff">JK-BMS</text>
  <text x="66" y="274" font-size="78" font-weight="700" fill="url(#tt)">Battery Card</text>
  <text x="70" y="334" font-size="25" fill="#a9bbd0">Every cell of your JK-BMS pack,</text>
  <text x="70" y="368" font-size="25" fill="#a9bbd0">live in your Home Assistant dashboard.</text>
  ${chipSvg}
  <text x="70" y="590" font-size="20" fill="#7f93ab">github.com/valimaties/jk-bms-battery-card</text>
  <text x="1210" y="590" font-size="20" text-anchor="end" fill="#7f93ab">ESPHome · syssi/esphome-jk-bms</text>
</svg>`;

writeFileSync("brand/social-preview.svg", svg);
const png = new Resvg(svg, { fitTo: { mode: "width", value: 1280 }, font: { loadSystemFonts: true } }).render().asPng();
writeFileSync("brand/social-preview.png", png);
console.log("social-preview.png", png.length, "bytes");
