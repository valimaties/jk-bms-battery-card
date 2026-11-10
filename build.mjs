// Bundles src/ into dist/jk-bms-battery-card.js (one file, what Home Assistant loads) and copies translations/ next to it.
import { build, context } from "esbuild";
import { cpSync, mkdirSync, readFileSync } from "node:fs";

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

const copyTranslations = () => {
  mkdirSync("dist", { recursive: true });
  cpSync("translations", "dist/translations", { recursive: true });
};

if (process.argv.includes("--watch")) {
  const ctx = await context(options);
  await ctx.watch();
  copyTranslations();
  console.log("watching src/ ...");
} else {
  await build(options);
  copyTranslations();
}
