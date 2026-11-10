// Renders the BMS-screen drawing (brand/screen.svg) to PNG: logo 480 px wide, logo@2x 960 px, icon 256 px, icon@2x 512 px.
// The icon is the same screen centred on a transparent square. Run: npm run icons
import { Resvg } from "@resvg/resvg-js";
import { readFileSync, writeFileSync } from "node:fs";

// the drop-down arrow is not in Arial/Roboto and would switch the whole word to a fallback font
const screen = readFileSync("brand/screen.svg", "utf8").replaceAll(" ▾", "");
const png = (svg, width) => new Resvg(svg, { fitTo: { mode: "width", value: width }, font: { loadSystemFonts: true } }).render().asPng();

const logo = (w, out) => {
  writeFileSync(`brand/${out}`, png(screen, w));
  console.log(out, w);
};

// square icon: the whole screen, scaled to the width of the square, centred
const icon = (size, out) => {
  const inner = screen.replace(/^<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
  const w = 610, h = 423, s = size / w, y = (size - h * s) / 2;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}"><g transform="translate(0 ${y}) scale(${s})">${inner}</g></svg>`;
  writeFileSync(`brand/${out}`, png(svg, size));
  console.log(out, size);
};

logo(480, "logo.png");
logo(960, "logo@2x.png");
icon(256, "icon.png");
icon(512, "icon@2x.png");
