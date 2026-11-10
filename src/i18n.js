import { ST } from "./state.js";
import de from "../translations/de.json";
import en from "../translations/en.json";
import es from "../translations/es.json";
import fr from "../translations/fr.json";
import it from "../translations/it.json";
import ro from "../translations/ro.json";

/* ============================================================== translations */
// Every language is bundled into the card (translations/<code>.json): no extra files to install. English is the fallback.
// To add a language: put translations/<code>.json next to the others and add it to this list.
export const I18N = { en, ro, fr, de, it, es };
export const CARDS = new Set();
export const inPreview = (el) => {
  for (let n = el; n; n = n.parentNode || n.host) if (n.localName === "hui-card-preview") return true;
  return false;
};
export const tt = (k, p) => {
  let s = (I18N[ST.lang] && I18N[ST.lang][k]) ?? I18N.en[k] ?? k;
  if (p) s = s.replace(/\{(\w+)\}/g, (_, n) => p[n] ?? "");
  return s;
};
export const pickLang = (cfgLang, hassLang) => {
  const l = String(
    cfgLang && cfgLang !== "auto"
      ? cfgLang
      : hassLang || (typeof navigator !== "undefined" && navigator.language) || "en",
  )
    .toLowerCase()
    .split(/[-_]/)[0];
  return /^[a-z]{2,3}$/.test(l) ? l : "en";
};
// a language that is not bundled is fetched from <translations_path>/translations/<code>.json (default: next to this script, ?v= kept as cache buster)
export const TR_BASE = (() => {
  let src = document.currentScript && document.currentScript.src;
  if (!src) {
    const el = [...document.querySelectorAll("script[src]")].find((x) => /jk-bms-battery-card[^/]*\.js/.test(x.src));
    src = el && el.src;
  }
  return src
    ? { dir: src.split("?")[0].replace(/[^/]*$/, ""), qs: src.includes("?") ? "?" + src.split("?")[1] : "" }
    : { dir: "", qs: "" };
})();
export const TR_LOADS = {};
export const loadLang = (l, dir) => {
  if (I18N[l]) return Promise.resolve(true);
  const base = dir || TR_BASE.dir;
  return (TR_LOADS[base + l] =
    TR_LOADS[base + l] ||
    fetch(`${base}translations/${l}.json${TR_BASE.qs}`, { cache: "no-cache" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j) => {
        I18N[l] = j;
        const miss = Object.keys(I18N.en).filter((k) => !(k in j));
        if (miss.length)
          console.warn(
            `[jk-bms-battery-card] translations/${l}.json lacks ${miss.length} keys (e.g. ${miss.slice(0, 3).join(", ")}): check the file`,
          );
        return true;
      })
      .catch(() => false));
};
export const LANGS = Object.fromEntries(Object.entries(I18N).map(([code, t]) => [code, t._name || code]));
export const loadLangList = () => Promise.resolve(LANGS);
ST.langList = LANGS;
