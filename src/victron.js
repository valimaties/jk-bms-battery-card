import { socColor } from "./util.js";

/* ============================================================== discovery */
export const VIC_TILES = [
  {
    k: "soc",
    g: "bat",
    f: (r) => Math.round(+r) + " %",
    d: "sensor.victron_mqtt_battery_290_battery_soc",
    re: /battery.*battery_soc/,
    c: (r) => socColor(+r),
  },
  {
    k: "voltage",
    g: "bat",
    f: (r) => (+r).toFixed(2) + " V",
    d: "sensor.victron_mqtt_battery_290_battery_voltage",
    re: /battery.*battery_voltage/,
  },
  {
    k: "current",
    g: "bat",
    f: (r) => (+r).toFixed(1) + " A",
    d: "sensor.victron_mqtt_battery_290_battery_current",
    re: /battery.*battery_current/,
    c: (r) => (+r > 0.3 ? "#7fb58e" : +r < -0.3 ? "#d9a066" : ""),
  },
  {
    k: "power",
    g: "bat",
    f: (r) => Math.round(+r) + " W",
    d: "sensor.victron_mqtt_battery_290_battery_power",
    re: /battery.*battery_power/,
    c: (r) => (+r > 0 ? "#7fb58e" : +r < 0 ? "#d9a066" : ""),
  },
  {
    k: "time_to_go",
    g: "bat",
    f: (r) => hms(r),
    d: "sensor.victron_mqtt_battery_290_battery_time_to_go",
    re: /time_to_go/,
  },
  {
    k: "battery_state",
    g: "bat",
    f: (r) => title(r),
    d: "sensor.gx_device_dc_battery_state",
    re: /dc_battery_state/,
    c: (r) => ({ charging: "#7fb58e", discharging: "#c9695c" })[String(r).toLowerCase()] || "",
  },
  {
    k: "multiplus_voltage",
    g: "inv",
    f: (r) => (+r).toFixed(2) + " V",
    d: "sensor.multiplus_ii_48_6k5_100_50_id_288_dc_voltage",
    re: /multiplus.*dc_voltage/,
  },
  {
    k: "inverter_state",
    g: "inv",
    f: (r) => title(r),
    d: "sensor.victron_mqtt_vebus_288_vebus_inverter_state",
    re: /vebus.*inverter_state/,
    c: (r) => {
      r = String(r).toLowerCase();
      return /bulk/.test(r)
        ? "#4f9dff"
        : /absorp/.test(r)
          ? "#d9a066"
          : /float/.test(r)
            ? "#7fb58e"
            : /overload|low batt|temp/.test(r)
              ? "#c9695c"
              : /invert/.test(r)
                ? "#d8b46a"
                : "";
    },
  },
  {
    k: "system_state",
    g: "inv",
    f: (r) => title(r),
    d: "sensor.victron_mqtt_system_0_system_state",
    re: /system_state/,
  },
  {
    k: "dc_temp",
    g: "inv",
    f: (r) => (+r).toFixed(1) + " °C",
    d: "sensor.victron_mqtt_vebus_288_vebus_inverter_dc_temperature",
    re: /dc_temperature/,
  },
  {
    k: "consumed_ah",
    g: "hist",
    f: (r) => Math.abs(Math.round(+r)) + " Ah",
    d: "sensor.smartshunt_500a_50mv_id_290_cumulative_ah_drawn",
    re: /cumulative_ah_drawn/,
  },
  {
    k: "cycles",
    g: "hist",
    f: (r) => r,
    d: "sensor.smartshunt_500a_50mv_id_290_total_charge_cycles",
    re: /total_charge_cycles/,
  },
  {
    k: "last_full_charge",
    g: "hist",
    f: (r) => hms(r),
    d: "sensor.smartshunt_500a_50mv_id_290_time_since_last_full_charge",
    re: /time_since_last_full_charge/,
  },
];
export const VIC_EXTRA = [
  {
    k: "alarm_low_battery",
    d: "sensor.victron_mqtt_vebus_288_vebus_inverter_alarm_low_battery",
    re: /alarm_low_battery/,
  },
];
export function hms(raw) {
  const s = parseInt(raw);
  if (isNaN(s)) return "N/A";
  const d = Math.floor(s / 86400),
    h = Math.floor((s % 86400) / 3600),
    m = Math.floor((s % 3600) / 60);
  return `${d ? d + "d " : ""}${h || d ? h + "h " : ""}${m}m`;
}
export function title(r) {
  return String(r).replace(/\b\w/g, (c) => c.toUpperCase());
}
export function discoverBatteries(hass) {
  const out = [];
  Object.keys(hass.states).forEach((id) => {
    const m = id.match(/^sensor\.(.+)_cell_voltage_1$/);
    if (!m) return;
    const fn = (hass.states[id].attributes || {}).friendly_name || "";
    out.push({ name: fn.replace(/\s*cell voltage 1$/i, "").trim() || m[1], entity_base: m[1] });
  });
  return out.sort((a, b) => a.entity_base.localeCompare(b.entity_base));
}
export function discoverVictron(hass) {
  const ids = Object.keys(hass.states).filter((i) => i.startsWith("sensor.")),
    out = {};
  [...VIC_EXTRA, ...VIC_TILES].forEach((t) => {
    out[t.k] =
      (hass.states[t.d] && t.d) ||
      ids.find((i) => t.re.test(i) && /victron|smartshunt|multiplus|gx_device|vebus/.test(i)) ||
      "";
  });
  return out;
}
