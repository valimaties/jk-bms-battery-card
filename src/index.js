/*
 * JK-BMS Battery Card
 * Home Assistant card for JK-BMS battery packs (syssi/esphome-jk-bms) with optional Victron data.
 * Zero dependencies, shadow DOM.
 */
import { VERSION } from "./version.js";
import "./card.js";
import "./editor.js";
import { I18N } from "./i18n.js";

window.customCards = window.customCards || [];
window.customCards.push({
  type: "jk-bms-battery-card",
  name: "JK-BMS Battery",
  description: "JK-BMS battery bank: 3D scene, per-battery view, cells with voltage and resistance",
  preview: false,
});
console.info(
  `%c JK-BMS-BATTERY %c v${VERSION} · ${Object.keys(I18N).length} languages bundled `,
  "background:#0ea5e9;color:#fff",
  "background:#111;color:#8fb4c9",
);
