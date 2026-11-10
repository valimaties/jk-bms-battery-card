// Bundles src/ (translations included) into dist/jk-bms-battery-card.js: one file, what Home Assistant loads.
import { build, context } from "esbuild";
import { readFileSync } from "node:fs";

const version = process.env.CARD_VERSION || JSON.parse(readFileSync("package.json", "utf8")).version;
const options = {
  entryPoints: ["src/index.js"],
  outfile: "dist/jk-bms-battery-card.js",
  bundle: true,
  format: "iife",
  target: "es2020",
  minify: false,
  legalComments: "none",
  define: { __CARD_VERSION__: JSON.stringify(version) },
  logLevel: "info",
};


if (process.argv.includes("--watch")) {
  const ctx = await context(options);
  await ctx.watch();
  console.log("watching src/ ...");
} else {
  await build(options);
}
