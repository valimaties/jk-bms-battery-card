// Builds the card and copies it (plus translations/) into a Home Assistant config folder for testing.
// Usage: npm run deploy -- "\homeassistant.local\config"   (or set HA_CONFIG, e.g. a Samba share or a mounted /config)
import { execSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const config = process.argv[2] || process.env.HA_CONFIG;
if (!config) {
  console.error('Give the Home Assistant config folder: npm run deploy -- "\\homeassistant.localconfig"');
  process.exit(1);
}
if (!existsSync(config)) {
  console.error(`Not reachable: ${config}`);
  process.exit(1);
}

execSync("node build.mjs", { stdio: "inherit" });
const target = join(config, "www", "community", "jk-bms-battery-card");
mkdirSync(target, { recursive: true });
rmSync(join(target, "translations"), { recursive: true, force: true });
cpSync("dist/jk-bms-battery-card.js", join(target, "jk-bms-battery-card.js"));
cpSync("dist/translations", join(target, "translations"), { recursive: true });
console.log(`Copied to ${target}`);
console.log("Resource URL: /local/community/jk-bms-battery-card/jk-bms-battery-card.js?v=" + Date.now());
