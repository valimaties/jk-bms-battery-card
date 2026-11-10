import { ST } from "./state.js";

/* ============================================================== translations (language: auto | en | fr | de | it | es | ro) */
export const I18N = {
  // English is built in and is the fallback; every other language comes from translations/<code>.json (next to this file)
  en: {
    title_default: "Battery bank",
    scr_vtg: "Vtg.",
    scr_cur: "Cur.",
    scr_batcap: "Bat-Capacity(Ah)",
    scr_remcap: "Rem-Capacity(Ah)",
    scr_maxcell: "Max.Cell",
    scr_mincell: "Min.Cell",
    scr_temp: "Temp",
    scr_pwr: "Pwr(kW)",
    scr_alarm: "Alarm",
    scr_packs: "Packs",
    scr_chg: "CHG",
    scr_dch: "DCH",
    scr_tab_group: "GROUP",
    scr_tab_packs: "PACKS",
    scr_tab_setting: "SETTING",
    scr_batcap2: "Bat-Capacity",
    scr_remcap2: "Rem-Capacity",
    scr_voldiff: "Vol.diff",
    scr_cellsv: "Cells Voltage",
    scr_on: "ON",
    scr_off: "OFF",
    scr_normal: "Normal",
    scr_alarmv: "Alarm",
    scr_language: "Language",
    bms_hw: "HW",
    bms_sw: "SW",
    bms_time: "Time",
    st_balancing: "balancing",
    lbl_perf: "Performance",
    perf_auto: "Automatic (lighter on phones/tablets)",
    perf_full: "Full effects",
    perf_lite: "Light (no bubbles, waves or glows)",
    preview_off: "Live preview is switched off while editing (saves resources).",
    voltage: "Voltage",
    current: "Current",
    delta: "Δ cells",
    zoom: "Enlarge",
    close: "Close",
    pick_battery: "Choose battery",
    screen_tip: "BMS screen · click: enlarge",
    pwr_tip: "BMS screen: on / off (display_always_on)",
    st_charging: "charging",
    st_discharging: "discharging",
    st_idle: "idle",
    st_offline: "offline",
    remaining: "Remaining",
    temperature: "Temperature",
    cycles_soh: "Cycles · SOH",
    balancing: "Balancing",
    bal_off: "off",
    bal_wait: "waiting",
    starts_at: "Starts at",
    cells_ok: "Cells balanced",
    cells_small: "Small difference between cells",
    cells_bad: "Cells unbalanced",
    a_offline: "{name}: no connection",
    a_imb: "{name}: {mv} mV imbalance between cells",
    a_temp: "{name}: temperature {t}°",
    lowbat_warn: "low battery warning",
    group_name: "Group · {n} batteries",
    popup_hint:
      "Bottom button: turn the screen on / off · the tabs and the battery icons change the page · click outside or Esc: close",
    sw_charge: "Charging",
    sw_discharge: "Discharging",
    sw_balance: "Balancing",
    sw_heat: "Heating",
    sw_charge_n: "charging",
    sw_discharge_n: "discharging",
    sw_balance_n: "balancing",
    sw_heat_n: "heating",
    confirm_off: "Turn off {what} on {name}?",
    confirm_on: "Turn on {what} on {name}?",
    yes_off: "Yes, turn off",
    yes_on: "Yes, turn on",
    cancel: "Cancel",
    g_bat: "Battery · SmartShunt",
    g_inv: "MultiPlus-II",
    g_hist: "History",
    vt_soc: "SoC SmartShunt",
    vt_voltage: "SmartShunt voltage",
    vt_current: "Current",
    vt_power: "Power",
    vt_time_to_go: "Time left",
    vt_battery_state: "Battery state",
    vt_multiplus_voltage: "Multiplus II voltage",
    vt_inverter_state: "Inverter state",
    vt_system_state: "System status",
    vt_dc_temp: "DC temp.",
    vt_consumed_ah: "Total consumed",
    vt_cycles: "Charge cycles",
    vt_last_full_charge: "Last full charge",
    vt_alarm_low_battery: "Low battery alarm",
    ed_batteries: "Batteries",
    ed_detect: "Detect batteries from HA",
    ed_add: "+ Add manually",
    ed_found: "{n} JK-BMS found in Home Assistant.",
    ed_victron: "Victron SmartShunt / MultiPlus (optional · tested only with Venus OS)",
    ed_vdetect: "Detect Victron",
    ed_vsummary: "Victron entities (loaded when opened)",
    ed_independent: "Independent",
    ed_delete: "Delete battery",
    ed_battery_n: "Battery {n}",
    ed_name: "Display name",
    ed_name_ph: "e.g. Old battery",
    ed_entity: "JK-BMS entity",
    ed_choose: "– choose battery –",
    ed_cell1: "Cell 1 position",
    pos_tl: "top-left",
    pos_tr: "top-right",
    pos_bl: "bottom-left",
    pos_br: "bottom-right",
    ed_role: "Role in group",
    ed_display: "BMS screen switch (display always on, optional)",
    ed_display_hint:
      "ESPHome switch that keeps the BMS screen on; the button on the screen in the card turns it on/off. Usually filled in automatically.",
    lbl_title: "Title",
    lbl_cells: "Cells / battery",
    lbl_temps: "Temperature sensors",
    lbl_glare: "Light reflection on the BMS screen",
    ed_advanced: "Advanced settings",
    lbl_language: "Language",
    lang_auto: "Automatic (Home Assistant)",
  },
};
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
// where this script was loaded from (HA resource, ?v= kept as cache buster); the language files are fetched from <there>/translations/
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
            `[jk-bms-battery-card] translations/${l}.json lacks ${miss.length} keys (e.g. ${miss.slice(0, 3).join(", ")}): copy the whole translations folder again`,
          );
        return true;
      })
      .catch(() => false));
};
export let TR_LIST = null;
export const loadLangList = () =>
  TR_LIST ||
  (TR_LIST = fetch(`${TR_BASE.dir}translations/index.json${TR_BASE.qs}`, { cache: "no-cache" })
    .then((r) => (r.ok ? r.json() : Promise.reject()))
    .catch(() => ({ en: "English", fr: "Français", de: "Deutsch", it: "Italiano", es: "Español", ro: "Română" })));
loadLangList().then((l) => {
  ST.langList = l;
});
