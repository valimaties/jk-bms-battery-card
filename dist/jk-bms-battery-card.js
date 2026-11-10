(() => {
  // src/version.js
  var VERSION = true ? "1.0.0" : "dev";

  // src/state.js
  var ST = { lang: "en", editing: 0, langList: null };

  // src/i18n.js
  var I18N = {
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
      delta: "\u0394 cells",
      zoom: "Enlarge",
      close: "Close",
      pick_battery: "Choose battery",
      screen_tip: "BMS screen \xB7 click: enlarge",
      pwr_tip: "BMS screen: on / off (display_always_on)",
      st_charging: "charging",
      st_discharging: "discharging",
      st_idle: "idle",
      st_offline: "offline",
      remaining: "Remaining",
      temperature: "Temperature",
      cycles_soh: "Cycles \xB7 SOH",
      balancing: "Balancing",
      bal_off: "off",
      bal_wait: "waiting",
      starts_at: "Starts at",
      cells_ok: "Cells balanced",
      cells_small: "Small difference between cells",
      cells_bad: "Cells unbalanced",
      a_offline: "{name}: no connection",
      a_imb: "{name}: {mv} mV imbalance between cells",
      a_temp: "{name}: temperature {t}\xB0",
      lowbat_warn: "low battery warning",
      group_name: "Group \xB7 {n} batteries",
      popup_hint: "Bottom button: turn the screen on / off \xB7 the tabs and the battery icons change the page \xB7 click outside or Esc: close",
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
      g_bat: "Battery \xB7 SmartShunt",
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
      ed_victron: "Victron SmartShunt / MultiPlus (optional \xB7 tested only with Venus OS)",
      ed_vdetect: "Detect Victron",
      ed_vsummary: "Victron entities (loaded when opened)",
      ed_independent: "Independent",
      ed_delete: "Delete battery",
      ed_battery_n: "Battery {n}",
      ed_name: "Display name",
      ed_name_ph: "e.g. Old battery",
      ed_entity: "JK-BMS entity",
      ed_choose: "\u2013 choose battery \u2013",
      ed_cell1: "Cell 1 position",
      pos_tl: "top-left",
      pos_tr: "top-right",
      pos_bl: "bottom-left",
      pos_br: "bottom-right",
      ed_role: "Role in group",
      ed_display: "BMS screen switch (display always on, optional)",
      ed_display_hint: "ESPHome switch that keeps the BMS screen on; the button on the screen in the card turns it on/off. Usually filled in automatically.",
      lbl_title: "Title",
      lbl_cells: "Cells / battery",
      lbl_temps: "Temperature sensors",
      lbl_glare: "Light reflection on the BMS screen",
      ed_advanced: "Advanced settings",
      lbl_language: "Language",
      lang_auto: "Automatic (Home Assistant)"
    }
  };
  var CARDS = /* @__PURE__ */ new Set();
  var inPreview = (el) => {
    for (let n = el; n; n = n.parentNode || n.host) if (n.localName === "hui-card-preview") return true;
    return false;
  };
  var tt = (k, p) => {
    let s = (I18N[ST.lang] && I18N[ST.lang][k]) ?? I18N.en[k] ?? k;
    if (p) s = s.replace(/\{(\w+)\}/g, (_, n) => p[n] ?? "");
    return s;
  };
  var pickLang = (cfgLang, hassLang) => {
    const l = String(
      cfgLang && cfgLang !== "auto" ? cfgLang : hassLang || typeof navigator !== "undefined" && navigator.language || "en"
    ).toLowerCase().split(/[-_]/)[0];
    return /^[a-z]{2,3}$/.test(l) ? l : "en";
  };
  var TR_BASE = (() => {
    let src = document.currentScript && document.currentScript.src;
    if (!src) {
      const el = [...document.querySelectorAll("script[src]")].find((x) => /jk-bms-battery-card[^/]*\.js/.test(x.src));
      src = el && el.src;
    }
    return src ? { dir: src.split("?")[0].replace(/[^/]*$/, ""), qs: src.includes("?") ? "?" + src.split("?")[1] : "" } : { dir: "", qs: "" };
  })();
  var TR_LOADS = {};
  var loadLang = (l, dir) => {
    if (I18N[l]) return Promise.resolve(true);
    const base = dir || TR_BASE.dir;
    return TR_LOADS[base + l] = TR_LOADS[base + l] || fetch(`${base}translations/${l}.json${TR_BASE.qs}`, { cache: "no-cache" }).then((r) => r.ok ? r.json() : Promise.reject()).then((j) => {
      I18N[l] = j;
      const miss = Object.keys(I18N.en).filter((k) => !(k in j));
      if (miss.length)
        console.warn(
          `[jk-bms-battery-card] translations/${l}.json lacks ${miss.length} keys (e.g. ${miss.slice(0, 3).join(", ")}): copy the whole translations folder again`
        );
      return true;
    }).catch(() => false);
  };
  var TR_LIST = null;
  var loadLangList = () => TR_LIST || (TR_LIST = fetch(`${TR_BASE.dir}translations/index.json${TR_BASE.qs}`, { cache: "no-cache" }).then((r) => r.ok ? r.json() : Promise.reject()).catch(() => ({ en: "English", fr: "Fran\xE7ais", de: "Deutsch", it: "Italiano", es: "Espa\xF1ol", ro: "Rom\xE2n\u0103" })));
  loadLangList().then((l) => {
    ST.langList = l;
  });

  // src/images.js
  var IMG = {
    jkbms: "data:image/webp;base64,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"
  };

  // src/pack.js
  var GRN = "#5cf08a";
  var LOGO = "data:image/png;base64,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";
  var PK = { W: 860, H: 520, wh: 135 };
  function packOverlay(grouped, name) {
    return `<div class="ov">
    <div class="hd2">${grouped ? `<select class="pksel" data-k="pksel" title="${tt("pick_battery")}">
      </select>` : `<span class="pkname" data-k="bcname">${name}</span>`}<span class="chip idle" data-k="bcchip">\u2013</span>
    </div>
  <div class="bgs">
    <div class="bg"><span class="l">SoC</span><b data-k="bcsoc">\u2013</b>
    </div>
    <div class="bg"><span class="l">${tt("voltage")}</span><b data-k="bcv">\u2013</b>
    </div>
    <div class="bg"><span class="l">${tt("current")}</span><b data-k="bca">\u2013</b><i data-k="bcw">\u2013</i>
    </div>
    <div class="bg"><span class="l">${tt("delta")}</span><b data-k="bcd">\u2013</b>
    </div>
  </div>
  </div>`;
  }
  function packSvg(n, id, np = 1, layout = "top-left") {
    const { W, H, wh } = PK, per = Math.ceil(n / 2), xl = 236, xr = 834, slot = (xr - xl) / Math.max(8, per), xe = xl + per * slot, cw = slot * 0.9, ch = 165, dep = 40, f = 0.94, vx = (xl + xe) / 2, rowY = [58, 314];
    const startRow = /^bottom/.test(layout) ? 1 : 0, fromLeft = !/right$/.test(layout);
    const kOf = (row, j) => row === startRow ? fromLeft ? j : per - 1 - j : per + (fromLeft ? per - 1 - j : j);
    const cxOf = (j) => xl + (j + 0.5) * slot, x0Of = (j) => cxOf(j) - cw / 2, bk = (x) => vx + (x - vx) * f, mirrored = (j) => j % 2 === 1;
    const lid = (row, j, u, v) => {
      const x0 = x0Of(j), fx = x0 + u * cw, bx = bk(x0) + u * (bk(x0 + cw) - bk(x0));
      return [fx + (bx - fx) * v, rowY[row] - v * dep];
    };
    const FRONT = 0.2, BACK = 0.82;
    const stud = (row, j, side) => lid(row, j, 0.5, side === "L" !== mirrored(j) ? FRONT : BACK);
    const ww = cw - 4, wave = `M0 3 Q${ww / 4} -1 ${ww / 2} 3 T${ww} 3 T${ww * 1.5} 3 T${ww * 2} 3 V${wh + 10} H0Z`;
    const nut = (pt, plus) => {
      const [px, py] = pt;
      return `<ellipse cx="${px}" cy="${py + 5}" rx="7" ry="3.1" fill="#6f747c"/>
    <rect x="${px - 7}" y="${py}" width="14" height="5" fill="#aeb4bc"/>
    <ellipse cx="${px}" cy="${py}" rx="7" ry="3.1" fill="#d6dae0"/>
    <rect x="${px - 1.7}" y="${py - 6}" width="3.4" height="6" fill="#9aa0a8"/>
    <circle cx="${px}" cy="${py - 8.5}" r="2.2" fill="${plus ? "#b5594f" : "#6b727c"}"/>`;
    };
    let cells = "", shd = "", cables = "", under = "", marks = "";
    for (let row = 0; row < 2; row++) {
      const order = Array.from({ length: per }, (_, j) => j).sort(
        (a, b) => Math.abs(b + 0.5 - per / 2) - Math.abs(a + 0.5 - per / 2)
      );
      order.forEach((j) => {
        const k = kOf(row, j), x0 = x0Of(j), x1 = x0 + cw, y0 = rowY[row], ty = y0 - dep, bx0 = bk(x0), bx1 = bk(x1), left = cxOf(j) < vx, mid = lid(row, j, 0.5, 0.5);
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
            <path class="wave" d="${wave}" style="animation-delay:-${(k * 0.43 % 3.6).toFixed(2)}s"/>
        <circle class="bub" cx="${ww * 0.3}" cy="${wh - 3}" r="1.3" style="animation-delay:-${(k * 0.31 % 2.4).toFixed(2)}s"/>
        <circle class="bub" cx="${ww * 0.7}" cy="${wh - 3}" r="1" style="animation-delay:-${(k * 0.53 % 2.9).toFixed(2)}s"/>
        </g>
        </g>
        </g>${[0.25, 0.5, 0.75].map((t) => `<path d="M${x1 - 10} ${(y0 + 24 + wh * (1 - t)).toFixed(1)} h7" stroke="#fff" stroke-opacity=".3" stroke-width="1"/>`).join("")}
      ${nut(stud(row, j, "L"), plusSide === "L")}${nut(stud(row, j, "R"), plusSide === "R")}<path class="bz" transform="translate(${mid[0].toFixed(1)} ${mid[1].toFixed(1)})" d="M2.5 -11 L-5.5 1 L-0.5 1 L-3.5 11 L6 -2.5 L1 -2.5 Z"/>
      </g>
      <text class="tv" data-k="${k}" x="${cxOf(j).toFixed(1)}" y="${(y0 + ch + 18).toFixed(1)}">\u2013</text>
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
    const hexAt = (x, y) => {
      const hp = (yy) => [0, 1, 2, 3, 4, 5].map((i) => [x + 5.4 * Math.cos(i * Math.PI / 3), yy + 2.5 * Math.sin(i * Math.PI / 3)]), yb = y - 2, yt = y - 5.6, B = hp(yb), T = hp(yt), shade = ["#aab0b8", "#8d949d", "#bcc2c9"];
      return `<ellipse cx="${x.toFixed(1)}" cy="${(y + 0.4).toFixed(1)}" rx="8" ry="3.6" fill="#8b929b"/>
      <ellipse cx="${x.toFixed(1)}" cy="${(y - 0.9).toFixed(1)}" rx="8" ry="3.6" fill="#d5d9de" stroke="#7b828a" stroke-width=".5"/>` + [0, 1, 2].map(
        (i) => `<polygon points="${[B[i], B[i + 1], T[i + 1], T[i]].map((p) => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ")}" fill="${shade[i]}" stroke="#6f767f" stroke-width=".3"/>`
      ).join("") + `<polygon points="${T.map((p) => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ")}" fill="#e6e9ed" stroke="#7b828a" stroke-width=".4"/><rect x="${(x - 2.6).toFixed(1)}" y="${(yt - 4).toFixed(1)}" width="5.2" height="4.2" fill="#b3b9c1"/>
      <ellipse cx="${x.toFixed(1)}" cy="${(yt - 4).toFixed(1)}" rx="2.6" ry="1.2" fill="#e9ecef" stroke="#8a9199" stroke-width=".3"/>`;
    };
    const bar = (row, j, v) => {
      const Z = -2, e = 0.11, P = (jj, u, vv) => {
        const q = lid(row, jj, u, vv);
        return [q[0], q[1] + Z];
      }, f2 = (p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`, poly = (a2, dy = 0) => a2.map((p) => `${p[0].toFixed(1)},${(p[1] + dy).toFixed(1)}`).join(" ");
      const j2 = j + 1, plate = (jj, u0, u1) => [P(jj, u0, v - e), P(jj, u1, v - e), P(jj, u1, v + e), P(jj, u0, v + e)];
      const pa = plate(j, 0.34, 0.84), pb = plate(j2, 0.16, 0.66);
      const t1 = P(j, 0.84, v - e), t2 = P(j2, 0.16, v - e), b1 = P(j, 0.84, v + e), b2 = P(j2, 0.16, v + e), lift = 3, mx = (t1[0] + t2[0]) / 2;
      const flex = `M${f2(t1)} Q${mx.toFixed(1)},${(t1[1] - lift).toFixed(1)} ${f2(t2)} L${f2(b2)} Q${mx.toFixed(1)},${(b1[1] - lift).toFixed(1)} ${f2(b1)}Z`;
      const hl = `M${f2(t1)} Q${mx.toFixed(1)},${(t1[1] - lift).toFixed(1)} ${f2(t2)}`;
      const hexN = (jj) => {
        const q = P(jj, 0.5, v);
        return hexAt(q[0], q[1]);
      };
      const a = P(j, 0.5, v), b = P(j2, 0.5, v);
      return `<path d="${flex}" transform="translate(0 2)" fill="#8d3a08"/>
      <polygon points="${poly(pa, 1.5)}" fill="#b0644a"/>
      <polygon points="${poly(pb, 1.5)}" fill="#b0644a"/><path d="${flex}" fill="#f2701d" stroke="#b84f0c" stroke-width=".5" stroke-linejoin="round"/>
      <path d="${hl}" fill="none" stroke="#ffc08a" stroke-width=".9" stroke-opacity=".75" stroke-linecap="round"/><polygon points="${poly(pa)}" fill="#cdbfae" stroke="#8a7d6c" stroke-width=".6" stroke-linejoin="round"/>
      <polygon points="${poly(pb)}" fill="#cdbfae" stroke="#8a7d6c" stroke-width=".6" stroke-linejoin="round"/><path d="M${f2(pa[0])} L${f2(pa[1])} M${f2(pb[0])} L${f2(pb[1])}" stroke="#f1e9de" stroke-width=".8" stroke-opacity=".85" fill="none"/>` + hexN(j) + hexN(j2) + `<path class="fl" d="M${f2(row === 0 ? a : b)} Q${mx.toFixed(1)},${(a[1] - lift - 1).toFixed(1)} ${f2(row === 0 ? b : a)}" fill="none" stroke="var(--txt)" stroke-width="1.3" stroke-linecap="round" stroke-dasharray="2 7"/>`;
    };
    const cable = (d, col, ends) => `<path d="${d}" fill="none" stroke="#9aa3b0" stroke-opacity=".5" stroke-width="7.8" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="${d}" fill="none" stroke="${col}" stroke-width="6.2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="${d}" fill="none" stroke="#fff" stroke-opacity=".16" stroke-width="1.5" stroke-linecap="round" transform="translate(0 -1.6)"/>
    <path class="fl" d="${d}" fill="none" stroke="var(--txt)" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="2 9"/>${ends.map(
      (e) => `<circle cx="${e[0]}" cy="${e[1]}" r="4.2" fill="#c47a2c" stroke="#7a4a1c" stroke-width=".8"/>
    <circle cx="${e[0]}" cy="${e[1]}" r="1.6" fill="#2b2f36"/>`
    ).join("")}`;
    const BLK = "#1b1e23", RED = "#a8453c";
    for (let row = 0; row < 2; row++) for (let j = 0; j < per - 1; j++) cables += bar(row, j, mirrored(j) ? FRONT : BACK);
    const PERS = [0.93, -0.07, 0.075, 1];
    const bs = 0.75, K = bs / (270 / 490), bcx = 112, bcy = H / 2, bt = (px, py) => [bcx - (px - 80) * bs, bcy - (py - 245) * bs];
    const cellSide = [bt(17.5, 191.5), bt(17.5, 225)], outSide = [bt(123.5, 185), bt(123.5, 224)], led = [bt(35, 147.5), bt(70, 147.5), bt(105, 147.5)], hb = bt(120, 22);
    const first = stud(0, 0, "L"), s1 = stud(0, per - 1, "R"), s2 = stud(1, per - 1, "R"), last = stud(1, 0, "L"), mPost = [14, bcy + 40 * bs], pPost = [14, bcy + 210 * bs], xf = xe + 14;
    {
      const w = 8.8, h = w / 2, y1 = s1[1] - 2, y2 = s2[1] - 2, x1 = s1[0], x2 = s2[0], X = xf, ro = 5.5, ri = 1.3, f2 = (n2) => n2.toFixed(1), P2 = (a) => a.map((p) => f2(p[0]) + "," + f2(p[1])).join(" ");
      const sv = mirrored(per - 1) ? FRONT : BACK, ul = lid(0, per - 1, 0.16, sv + 0.11)[0], ll = lid(0, per - 1, 0.16, sv - 0.11)[0], a1 = ul, a2 = ul, body = `M${f2(ul)} ${f2(y1 - h)} H${f2(X + h - ro)} Q${f2(X + h)} ${f2(y1 - h)} ${f2(X + h)} ${f2(y1 - h + ro)} V${f2(y2 + h - ro)} Q${f2(X + h)} ${f2(y2 + h)} ${f2(X + h - ro)} ${f2(y2 + h)} H${f2(ll)} L${f2(ul)} ${f2(y2 - h)} H${f2(X - h + ri)} Q${f2(X - h)} ${f2(y2 - h)} ${f2(X - h)} ${f2(y2 - h - ri)} V${f2(y1 + h + ri)} Q${f2(X - h)} ${f2(y1 + h)} ${f2(X - h + ri)} ${f2(y1 + h)} H${f2(ll)}Z`, d = `M${f2(x1)} ${f2(y1)} H${X} V${f2(y2)} H${f2(x2)}`;
      const hs = `M${f2(x1 + 22)} ${f2(y1)} H${X} V${f2(y2)} H${f2(x2 + 22)}`;
      const ou = lid(0, per - 1, 0.66, sv + 0.11)[0], ol = lid(0, per - 1, 0.66, sv - 0.11)[0], dd = ol - ou, Y = 7 * h, cl2 = (cy) => P2([
        [ou - 3 * dd, cy - Y],
        [X + 60, cy - Y],
        [X + 60, cy + Y],
        [ol + 3 * dd, cy + Y]
      ]);
      const dark = (cy, s) => `<polygon points="${P2([
        [X - h, cy + s * h],
        [X + h - 1, cy - s * h],
        [X - h - 16, cy - s * h],
        [X - h - 16, cy + s * h]
      ])}" fill="#5a4a38" fill-opacity=".28"/>`;
      const crease = (cy, s) => `<path d="M${f2(X - h + 0.6)} ${f2(cy + s * h - s * 0.6)} Q${f2(X)} ${f2(cy + s * 0.5)} ${f2(X + h - 2)} ${f2(cy - s * h + s * 1.5)}" fill="none" stroke="#6b5e4d" stroke-width="1.1" stroke-linecap="round"/>
      <path d="M${f2(X - h + 0.6)} ${f2(cy + s * h + s * 0.9)} Q${f2(X - h + 2)} ${f2(cy + s * h + s * 2.6)} ${f2(X - h + 5)} ${f2(cy + s * h + s * 2.8)}" fill="none" stroke="#000" stroke-opacity=".25" stroke-width="1.6" stroke-linecap="round"/>`;
      cables += `<path d="${body}" fill="#b0644a" transform="translate(0 1.5)"/>
      <path d="${body}" fill="#cdbfae" stroke="#8a7d6c" stroke-width=".6" stroke-linejoin="round"/>
      <path d="M${f2(a1 + 3)} ${f2(y1 - h + 0.8)} H${f2(X + h - ro)} Q${f2(X + h - 0.8)} ${f2(y1 - h + 0.8)} ${f2(X + h - 0.8)} ${f2(y1 - h + ro)} V${f2(y2 + h - ro)} Q${f2(X + h - 0.8)} ${f2(y2 + h - 0.8)} ${f2(X + h - ro)} ${f2(y2 + h - 0.8)} H${f2(a2 + 3)}" fill="none" stroke="#f4ece1" stroke-opacity=".75" stroke-width=".8"/><clipPath id="cb${id}">
        <polygon points="${cl2(y1)}"/>
        <polygon points="${cl2(y2)}"/>
        <rect x="${f2(X - h - 2)}" y="${f2(y1 - Y)}" width="${f2(h + 62)}" height="${f2(y2 - y1 + 2 * Y)}"/>
      </clipPath>
      <g clip-path="url(#cb${id})">
        <path d="${body}" fill="#f2701d" stroke="#b84f0c" stroke-width=".9" stroke-linejoin="round"/>
        <path d="M${f2(ul + 3)} ${f2(y1 - h + 1.5)} H${f2(X + h - ro - 1)} Q${f2(X + h - 1.5)} ${f2(y1 - h + 1.5)} ${f2(X + h - 1.5)} ${f2(y1 - h + ro)} V${f2(y2 + h - ro)}" fill="none" stroke="#ffc08a" stroke-opacity=".65" stroke-width="1"/>
      </g>` + dark(y1, 1) + dark(y2, -1) + crease(y1, 1) + crease(y2, -1) + `<path class="fl" d="${d}" fill="none" stroke="var(--txt)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="2 9"/>` + hexAt(x1, y1) + hexAt(x2, y2);
    }
    under += cable(`M${last[0]} ${last[1]} C${last[0] - 50} ${last[1]} 70 ${pPost[1]} ${pPost[0]} ${pPost[1]}`, RED, [
      last
    ]);
    cables += cellSide.map(
      (t, i) => cable(
        `M${t[0]} ${t[1]} C${t[0] + 44} ${t[1]} ${first[0] - 56} ${first[1] + 58 * K - i * 6 * K} ${first[0] - 22} ${first[1] + 6 * K - i * 3 * K} L${first[0]} ${first[1] - i * 3 + 0}`,
        BLK,
        [t]
      )
    ).join("");
    cables += cellSide.map(
      (t, i) => cable(
        `M${t[0]} ${t[1]} C${t[0] + 44} ${t[1]} ${first[0] - 56} ${first[1] + 58 * K - i * 6 * K} ${first[0] - 22} ${first[1] + 6 * K - i * 3 * K} L${first[0]} ${first[1] - i * 3 + 0}`,
        BLK,
        [t]
      )
    ).join("") + outSide.map(
      (t, i) => cable(
        `M${mPost[0]} ${mPost[1] + (i ? 6 : -6)} C${mPost[0] + 24} ${mPost[1] + (i ? 6 : -6)} ${t[0] - 24} ${t[1]} ${t[0]} ${t[1]}`,
        BLK,
        [t]
      )
    ).join("");
    const sp0 = bt(150, 106), supply = (() => {
      const d = `M${sp0[0].toFixed(1)} ${sp0[1].toFixed(1)} C${(sp0[0] - 12).toFixed(1)} ${(sp0[1] + 6).toFixed(1)} ${(pPost[0] + 26).toFixed(1)} ${(pPost[1] - 34).toFixed(1)} ${(pPost[0] + 5.5).toFixed(1)} ${(pPost[1] - 5.5).toFixed(1)}`;
      return `<path d="${d}" fill="none" stroke="#14100f" stroke-width="3.6" stroke-linecap="round"/>
      <path d="${d}" fill="none" stroke="${RED}" stroke-width="2.3" stroke-linecap="round"/>
      <path d="${d}" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width=".7" stroke-linecap="round" transform="translate(0 -.8)"/>`;
    })();
    const bms = `<g transform="translate(${bcx} ${bcy}) rotate(180) scale(${bs.toFixed(4)}) translate(-80 -245)"><use href="#bms${id}"/></g>
`;
    const post = (pt, plus) => `<circle cx="${pt[0]}" cy="${pt[1]}" r="8" fill="#cfd4db" stroke="${plus ? "#b5594f" : "#6f757e"}" stroke-width="2.4"/>
    <text x="${pt[0] - 4}" y="${pt[1] - 13}" font-size="16" font-weight="700" fill="${plus ? "#b5594f" : "var(--dim)"}">${plus ? "+" : "\u2212"}</text>`;
    const lcd = bt(146, 333), dsc = (l, x, y, fs, fill, extra = "") => `<text x="${x}" y="${y}" font-size="${fs}" fill="${fill}" ${extra}>${l}</text>`, dt = (key, suf, x, y, fs, fill, extra = "") => dsc(tt(key) + suf, x, y, fs, fill, `data-tr="${key}|${suf}" ${extra}`), GR = "#5cf08a", WT = "#e6ece8";
    const dv = (k, x, y, fs, anchor = "start") => `<text data-d="${k}" x="${x}" y="${y}" font-size="${fs}" font-weight="700" fill="${GR}" text-anchor="${anchor}">\u2013</text>`;
    const tab = (c, key, dark, go) => `<polygon points="${c - 52},221 ${c + 52},221 ${c + 44},238.6 ${c - 44},238.6" fill="${dark ? "#03060a" : "#f2f4f5"}"/>${dt(key, "", c, 234.4, 11, dark ? "#fff" : "#111", 'font-weight="700" text-anchor="middle"')}${go ? `<polygon class="hit" data-go="${go}" points="${c - 52},221 ${c + 52},221 ${c + 44},238.6 ${c - 44},238.6" fill="#000" fill-opacity="0"/>` : ""}`;
    const outline = "M4 4 H429 V221 H" + [355, 216, 76].map((c) => `${c + 52} L${c + 44} 238.6 H${c - 44} L${c - 52} 221`).join(" H") + " H4 Z";
    const ico = (cx, ch2) => `<circle cx="${cx}" cy="46" r="10" fill="none" stroke="${GR}" stroke-width="2"/>${dsc(ch2, cx, 50.5, 12, GR, 'text-anchor="middle" font-weight="700"')}`;
    const logo = `<image href="${LOGO}" x="6" y="9" width="38" height="22"/>${dsc("\u6781\u7A7A", 50, 26, 17, "#f2f6fa", 'font-weight="700"')}${dsc("JIKONG", 51, 33, 5.4, "#9fd2f2", 'letter-spacing="1.4"')}`;
    const pkIco = (i) => {
      const cx = 33 + 52 * (i % 8), top = i < 8 ? 52 : 130, on = i < np;
      return `<g class="pkb" ${on ? `data-go="cells" data-pk="${i}"` : ""} opacity="${on ? 1 : 0.16}">
      <rect x="${cx - 5}" y="${top}" width="10" height="4" rx="1" fill="#3dff5a"/>
      <rect x="${cx - 15}" y="${top + 3}" width="30" height="38" rx="6" fill="#1fd23a" stroke="#4dff63" stroke-width="2"/>
      <path d="M${cx + 2} ${top + 9} L${cx - 7} ${top + 24} H${cx - 1} L${cx - 3} ${top + 36} L${cx + 7} ${top + 19} H${cx + 1} Z" fill="#fff"/>
      <circle cx="${cx}" cy="${top + 57}" r="7" fill="none" stroke="#e6ece8" stroke-width="1"/>${dsc(i, cx, top + 60.5, 9, WT, 'text-anchor="middle"')}${on ? `<rect x="${cx - 18}" y="${top - 2}" width="36" height="72" fill="#000" fill-opacity="0"/>` : ""}</g>`;
    };
    const packsPage = `<path d="${outline}" fill="#03060a" stroke="#8d9aa3" stroke-width="1.3" stroke-linejoin="round"/>${logo}${[0, 1, 2, 3].map((k) => `<path class="chv chv${k}" d="M${201 + k * 12} 11 L${207 + k * 12} 17.5 L${201 + k * 12} 24"/>`).join("")}${Array.from({ length: 16 }, (_, i) => pkIco(i)).join("")}${tab(76, "scr_tab_group", false, "group")}${tab(216, "scr_tab_packs", true)}${tab(355, "scr_tab_setting", false)}`;
    const cl = "#e6ece8", gic = (cy, ch2) => `<circle cx="121" cy="${cy}" r="7" fill="none" stroke="${GR}" stroke-width="1.4"/>${dsc(ch2, 121, cy + 3.6, 9.5, GR, 'text-anchor="middle" font-weight="700"')}`;
    const cellsPage = `<rect width="433" height="243" fill="#03060a"/>
  <g data-go="packs">
    <circle cx="22" cy="21" r="9" fill="none" stroke="${cl}" stroke-width="1.4"/>
    <path d="M27 21 H17 M20.5 17 L16.5 21 L20.5 25" fill="none" stroke="${cl}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="22" cy="21" r="12" fill="#000" fill-opacity="0"/>
  </g>
    <circle cx="74" cy="21" r="9" fill="none" stroke="${cl}" stroke-width="1.4"/>
    <text data-d="pn" x="74" y="25.3" font-size="12" fill="${cl}" text-anchor="middle">0</text>${[0, 1, 2, 3].map((k) => `<path class="chv chv${k}" d="M${201 + k * 12} 11 L${207 + k * 12} 17.5 L${201 + k * 12} 24"/>`).join("")}
    <circle cx="17" cy="52" r="4.6" fill="${GR}"/>${dt("scr_batcap2", "", 25, 55, 9.5, cl)}${dv("cap2", 14, 74, 16)}<circle cx="17" cy="95" r="4.6" fill="${GR}"/>${dt("scr_remcap2", "", 25, 98, 9.5, cl)}${dv("rem2", 14, 117, 16)}
    <text data-d="pct2" x="50" y="146" font-size="16" font-weight="700" fill="#fff" text-anchor="middle">\u2013</text>
    <g class="batg">
      <rect class="bo bcap" x="42" y="152" width="16" height="5" rx="1" fill="#e0302f"/>
      <rect class="bo" x="28" y="156" width="44" height="76" rx="5" fill="none" stroke="#e0302f" stroke-width="2.2"/>${[0, 1, 2, 3, 4].map((k) => `<rect class="bb" x="33" y="${(215.8 - 13.4 * k).toFixed(1)}" width="34" height="10" fill="#2a0d0d"/>`).join("")}</g>
    <rect x="105" y="34" width="318" height="62" rx="8" fill="none" stroke="#8d9aa3" stroke-width="1"/>${gic(52, "\u25D4")}${dt("scr_voldiff", ":", 133, 56, 11, cl)}${dv("vd", 177, 56, 12.5)}${dt("scr_chg", ":", 250, 56, 11, cl)}${dv("chg2", 279, 56, 12)}${dt("scr_temp", ":", 340, 56, 11, cl)}${dv("tp2", 372, 56, 12)}
    ${gic(78, "A")}${dt("scr_cur", ":", 133, 82, 11, cl)}${dv("a2", 160, 82, 12.5)}${dt("scr_dch", ":", 250, 82, 11, cl)}${dv("dch2", 279, 82, 12)}${dt("scr_alarm", ":", 340, 82, 11, cl)}${dv("alm2", 376, 82, 11)}
    <rect x="105" y="108" width="318" height="128" rx="8" fill="none" stroke="#8d9aa3" stroke-width="1"/>
    <rect x="226" y="102" width="76" height="12" fill="#03060a"/>${dt("scr_cellsv", "", 264, 112, 10.5, cl, 'text-anchor="middle"')}
    ${Array.from({ length: n }, (_, k) => {
      const x = 115 + k % 4 * 78, y = 135 + Math.floor(k / 4) * 26;
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
      <image href="${LOGO}" x="6" y="9" width="38" height="22"/>${dsc("\u6781\u7A7A", 50, 26, 17, "#f2f6fa", 'font-weight="700"')}${dsc("JIKONG", 51, 33, 5.4, "#9fd2f2", 'letter-spacing="1.4"')}${[0, 1, 2, 3].map((k) => `<path class="chv chv${k}" d="M${201 + k * 12} 11 L${207 + k * 12} 17.5 L${201 + k * 12} 24"/>`).join("")}${dt("scr_language", " \u25BE", 352, 21, 12, "#fff")}<rect class="hit" data-go="lang" x="338" y="4" width="92" height="24" fill="#000" fill-opacity="0"/>
    ${ico(49, "V")}${dt("scr_vtg", ":", 66, 53, 15, WT)}${dv("v", 111, 53, 22)}${ico(266, "A")}${dt("scr_cur", ":", 283, 53, 15, WT)}${dv("a", 327, 53, 22)}
    <circle cx="87" cy="114" r="47" fill="none" stroke="#4ee07e" stroke-width="1.6"/>
    <circle cx="87" cy="114" r="39" fill="none" stroke="#1d3a2a" stroke-width="11"/>
    <circle class="rng" cx="87" cy="114" r="39" fill="none" stroke="#4ee07e" stroke-width="11" stroke-dasharray="0 245" transform="rotate(-90 87 114)"/>
    <g class="tipg">${Array.from({ length: 6 }, (_, j) => {
      const f2 = j / 5, m = (x, y) => Math.round(x + (y - x) * f2);
      return `<circle class="sgt" cx="87" cy="114" r="39" fill="none" stroke="rgb(${m(78, 47)},${m(224, 140)},${m(126, 255)})" stroke-width="11" stroke-dasharray="2.7 242.3" stroke-dashoffset="0" transform="rotate(-90 87 114)"/>`;
    }).join("")}</g>
    <circle cx="87" cy="114" r="31" fill="none" stroke="#4ee07e" stroke-width="1.6"/>
    <text data-d="soc" x="87" y="121" font-size="20" font-weight="700" fill="#fff" text-anchor="middle">\u2013</text>
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

  // src/styles.js
  var CSS = `
  :host {
    --cy: #8fb4c9;
    --mg: #a99bc4;
    --gold: #d8b46a;
    --grn: #7fb58e;
    --red: #c9695c;
    --org: #d9a066;
    --dim: #7f93ab;
    --txt: #e8f1fb;
    --line: rgba(255, 255, 255, 0.16);
    --glass: rgba(10, 24, 44, 0.62);
    display: block;
  }
  * {
    box-sizing: border-box;
  }
  ha-card {
    display: block;
    container: ec/inline-size;
    position: relative;
    overflow: hidden;
    color: var(--txt);
    border-radius: 22px;
    padding: 0;
    background: radial-gradient(1100px 600px at 15% -10%, #0f2a4a 0%, transparent 60%),
      radial-gradient(900px 600px at 110% 110%, #24103f 0%, transparent 60%), #050b14;
    font-family: var(--paper-font-body1_-_font-family, Roboto, system-ui, sans-serif);
  }
  .hdr {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 18px;
    flex-wrap: wrap;
    border-bottom: 1px solid var(--line);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.07), transparent);
  }
  .logo b {
    display: block;
    font-size: 19px;
    letter-spacing: 0.6px;
    background: linear-gradient(90deg, #7de8ff, #a99bc4, #ff9bd6);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .logo small {
    font-size: 10px;
    letter-spacing: 2px;
    color: var(--dim);
  }
  .tabs {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    margin-left: auto;
  }
  .tab {
    cursor: pointer;
    user-select: none;
    padding: 7px 14px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.5px;
    color: var(--dim);
    border: 1px solid var(--line);
    background: rgba(255, 255, 255, 0.03);
    transition: 0.25s;
  }
  .tab:hover {
    color: var(--txt);
    border-color: var(--cy);
  }
  .tab.on {
    color: #021018;
    background: linear-gradient(90deg, #8fb4c9, #8ab4ff);
    border-color: transparent;
    box-shadow: 0 0 18px rgba(255, 255, 255, 0.45);
  }
  .pages {
    position: relative;
  }
  .pg {
    display: none;
    padding: 14px 18px 18px;
  }
  .pg.on {
    display: block;
    animation: pgin 0.55s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  @keyframes pgin {
    from {
      opacity: 0;
      transform: translateY(14px) scale(0.985);
      filter: blur(6px);
    }
  }

  /* ---- scene container */
  .scene {
    container: sc/inline-size;
    position: relative;
    width: 100%;
    border-radius: 18px;
    overflow: hidden;
    border: 1px solid var(--line);
    cursor: grab;
    touch-action: pan-y;
    background: radial-gradient(70% 60% at 50% 62%, #0d2748 0%, #071426 55%, #040a14 100%);
  }
  .scene.grab {
    cursor: grabbing;
  }
  .scene svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
  }
  .sc-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
  .sc-bg::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(1.5px 1.5px at 12% 18%, #fff, transparent), radial-gradient(1px 1px at 28% 8%, #cfe, transparent),
      radial-gradient(1.5px 1.5px at 44% 14%, #fff, transparent), radial-gradient(1px 1px at 63% 9%, #fff, transparent),
      radial-gradient(1.5px 1.5px at 78% 20%, #cfe, transparent), radial-gradient(1px 1px at 90% 11%, #fff, transparent),
      radial-gradient(1px 1px at 8% 38%, #fff, transparent), radial-gradient(1px 1px at 94% 40%, #fff, transparent);
    opacity: 0.55;
  }
  @keyframes tw {
    50% {
      opacity: 0.25;
    }
  }
  .sun {
    position: absolute;
    left: 7%;
    top: 6%;
    width: 110px;
    height: 110px;
    border-radius: 50%;
    pointer-events: none;
    transition:
      opacity 1.5s,
      transform 1.5s;
    background: radial-gradient(circle, #fff6c9 0 14%, #ffd45a 28%, rgba(255, 170, 40, 0.35) 52%, transparent 70%);
    filter: blur(0.5px);
  }
  .sun::after {
    content: "";
    position: absolute;
    inset: -40%;
    border-radius: 50%;
    background: conic-gradient(
      from 0deg,
      transparent 0 8%,
      rgba(255, 220, 120, 0.35) 10%,
      transparent 14% 28%,
      rgba(255, 220, 120, 0.3) 30%,
      transparent 34% 48%,
      rgba(255, 220, 120, 0.35) 50%,
      transparent 54% 68%,
      rgba(255, 220, 120, 0.3) 70%,
      transparent 74%
    );
    -webkit-mask: radial-gradient(circle, transparent 24%, #000 26%, transparent 68%);
    mask: radial-gradient(circle, transparent 24%, #000 26%, transparent 68%);
    animation: spin 40s linear infinite;
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  .sc-scan {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.045) 0 1px, transparent 1px 3px);
    box-shadow: inset 0 0 90px rgba(0, 0, 0, 0.7);
  }
  @keyframes sweep {
    to {
      top: 110%;
    }
  }
  .sc-lbl {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
  .lbl {
    position: absolute;
    transform: translate(-50%, -100%);
    white-space: nowrap;
    pointer-events: none;
    font-size: clamp(7.5px, 1.3cqw, 11px);
    padding: 0.45em 0.8em;
    border-radius: 10px;
    line-height: 1.25;
    text-align: center;
    background: rgba(8, 22, 40, 0.88);
    border: 1px solid rgba(255, 255, 255, 0.4);
    box-shadow:
      0 0 14px rgba(255, 255, 255, 0.18),
      inset 0 0 12px rgba(255, 255, 255, 0.06);
  }
  .lbl b {
    display: block;
    font-size: 1.18em;
    font-variant-numeric: tabular-nums;
  }
  .lbl span {
    color: var(--dim);
    font-size: 0.9em;
    letter-spacing: 0.5px;
  }
  .lbl::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: -7px;
    width: 1px;
    height: 7px;
    background: linear-gradient(var(--cy), transparent);
  }
  .lbl.btn {
    pointer-events: auto;
    cursor: pointer;
    transition: 0.2s;
  }
  .lbl.btn:hover {
    border-color: #fff;
    box-shadow: 0 0 22px rgba(255, 255, 255, 0.6);
    transform: translate(-50%, -104%);
  }
  .lbl.sol {
    border-color: rgba(255, 210, 90, 0.55);
  }
  .lbl.sol b {
    color: #ffd45a;
  }
  .lbl.grid {
    border-color: rgba(120, 160, 255, 0.6);
  }
  .lbl.grid b {
    color: #9ab6ff;
  }
  .lbl.home {
    border-color: rgba(183, 132, 255, 0.6);
  }
  .lbl.home b {
    color: #cfa9ff;
  }
  .lbl.ev {
    border-color: rgba(46, 229, 157, 0.6);
  }
  .lbl.ev b {
    color: #5df0b4;
  }
  .lbl.big {
    font-size: clamp(20px, 4.4cqw, 34px);
    font-weight: 800;
    padding: 2px 12px;
    border: none;
    background: none;
    box-shadow: none;
    backdrop-filter: none;
    text-shadow: 0 0 18px currentColor;
  }
  .lbl.big::after {
    display: none;
  }
  .lbl.cel {
    font-size: clamp(6.5px, 1.15cqw, 10px);
    padding: 0.2em 0.45em;
    border-radius: 6px;
  }
  .lbl.cel b {
    font-size: 1.1em;
  }
  .lbl.cel::after {
    height: 4px;
    bottom: -5px;
  }
  .lbl.chipc {
    pointer-events: auto;
    cursor: pointer;
    transition: 0.15s;
  }
  .lbl.chipc:hover {
    border-color: #fff;
    box-shadow: 0 0 14px rgba(255, 255, 255, 0.7);
  }
  .hud-soc {
    position: absolute;
    left: 4%;
    top: 5%;
    pointer-events: none;
    font-size: clamp(28px, 8.5cqw, 60px);
    font-weight: 800;
    line-height: 1;
    text-shadow: 0 0 24px currentColor;
  }
  .hud-soc span {
    display: block;
    font-size: 0.24em;
    letter-spacing: 4px;
    color: var(--dim);
    font-weight: 500;
    text-shadow: none;
    margin-top: 6px;
  }
  .hud-info {
    position: absolute;
    right: 4%;
    top: 5%;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    gap: clamp(4px, 1.3cqw, 10px);
  }
  .hud-info div {
    text-align: right;
    background: rgba(8, 22, 40, 0.86);
    border: 1px solid rgba(255, 255, 255, 0.35);
    border-radius: 10px;
    padding: 0.2em 0.7em;
    min-width: clamp(86px, 24cqw, 170px);
  }
  .hud-info b {
    font-size: clamp(16px, 5cqw, 34px);
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }
  .hud-info span {
    font-size: clamp(10px, 2.4cqw, 16px);
    color: var(--dim);
    margin-left: 0.4em;
  }
  .lbl.mid {
    transform: translate(-50%, -50%);
  }
  .lbl.mid::after {
    display: none;
  }
  .lbl.cel.sel {
    border-color: #fff;
    box-shadow: 0 0 16px #8fb4c9;
  }
  .ring {
    stroke-dasharray: 3 7;
  }
  @keyframes dash {
    to {
      stroke-dashoffset: -200;
    }
  }
  .hint {
    margin-top: 8px;
    font-size: 11px;
    color: var(--dim);
    letter-spacing: 1px;
    text-align: center;
  }

  /* ---- kpis */
  .kpis {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 10px;
    margin-bottom: 12px;
  }
  .kpi {
    padding: 10px 12px;
    border-radius: 14px;
    background: var(--glass);
    border: 1px solid var(--line);
    position: relative;
    overflow: hidden;
  }
  .kpi::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: var(--kc, var(--cy));
    box-shadow: 0 0 12px var(--kc, var(--cy));
  }
  .kpi span {
    font-size: 10px;
    letter-spacing: 1.4px;
    color: var(--dim);
    text-transform: uppercase;
  }
  .kpi b {
    display: block;
    font-size: 22px;
    font-variant-numeric: tabular-nums;
    margin-top: 2px;
  }
  .kpi small {
    font-size: 11px;
    color: var(--dim);
    margin-left: 4px;
    font-weight: 400;
  }

  /* ---- battery page layout */
  .bgrid {
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
    gap: 16px;
  }
  .side {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 0;
  }
  .bhead {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }
  .bhead h2 {
    margin: 0;
    font-size: 22px;
  }
  .bhead .meta {
    font-size: 11px;
    color: var(--dim);
  }
  .chip {
    padding: 3px 11px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.7px;
    border: 1px solid currentColor;
  }
  .chip.charging {
    color: var(--grn);
    background: rgba(46, 229, 157, 0.1);
  }
  .chip.discharging {
    color: var(--org);
    background: rgba(255, 159, 67, 0.1);
  }
  .chip.idle {
    color: var(--cy);
    background: rgba(255, 255, 255, 0.08);
  }
  .chip.offline {
    color: #888;
  }
  .sp {
    flex: 1;
  }
  .go {
    cursor: pointer;
    border: none;
    border-radius: 12px;
    padding: 10px 16px;
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 0.5px;
    color: #021018;
    background: linear-gradient(90deg, #8fb4c9, #a99bc4);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
    transition: 0.2s;
  }
  .go:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.7);
  }
  .ghost {
    cursor: pointer;
    border: 1px solid var(--line);
    background: rgba(255, 255, 255, 0.04);
    color: var(--txt);
    border-radius: 10px;
    padding: 7px 13px;
    font-size: 12px;
    transition: 0.2s;
  }
  .ghost:hover {
    border-color: var(--cy);
  }
  .ghost.on {
    border-color: var(--cy);
    color: var(--cy);
    background: rgba(255, 255, 255, 0.1);
  }
  .tiles {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
  }
  .tile {
    padding: 9px 6px;
    border-radius: 12px;
    background: var(--glass);
    border: 1px solid var(--line);
    text-align: center;
  }
  .tile b {
    display: block;
    font-size: 18px;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
  .tile span {
    font-size: 9px;
    letter-spacing: 1.2px;
    color: var(--dim);
    text-transform: uppercase;
  }
  .secH {
    font-size: 10px;
    letter-spacing: 2px;
    color: var(--dim);
    text-transform: uppercase;
    margin: 4px 2px 0;
  }
  .temps {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .t {
    flex: 1;
    min-width: 58px;
    padding: 5px;
    border-radius: 10px;
    background: var(--glass);
    border: 1px solid var(--line);
    text-align: center;
    font-weight: 600;
    font-size: 13px;
  }
  .t span {
    display: block;
    font-size: 9px;
    color: var(--dim);
    font-weight: 400;
    letter-spacing: 1px;
  }
  .ctrl {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  .sw {
    flex: 1;
    min-width: 92px;
    cursor: pointer;
    text-align: center;
    padding: 9px;
    border-radius: 12px;
    border: 1px solid var(--line);
    background: var(--glass);
    font-size: 12px;
    font-weight: 600;
    transition: 0.25s;
  }
  .sw::before {
    content: "";
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 7px;
    background: #555;
  }
  .sw.on {
    border-color: var(--grn);
    color: var(--grn);
  }
  .sw.on::before {
    background: var(--grn);
    box-shadow: 0 0 8px var(--grn);
  }
  .sw:hover {
    filter: brightness(1.3);
  }
  .err {
    display: none;
    padding: 8px 10px;
    border-radius: 10px;
    background: rgba(255, 77, 77, 0.12);
    border: 1px solid #c9695c;
    color: #ff9a9a;
    font-size: 12px;
  }
  .err.show {
    display: block;
  }

  /* ---- cell page header */
  .cbar {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 12px;
  }
  .cbar h2 {
    margin: 0;
    font-size: 19px;
  }
  .seg {
    display: flex;
    gap: 6px;
    margin-left: auto;
    flex-wrap: wrap;
  }
  .cgrid {
    display: grid;
    grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
    gap: 14px;
  }
  .pills {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
  }
  .pill {
    padding: 8px;
    border-radius: 12px;
    background: var(--glass);
    border: 1px solid var(--line);
    text-align: center;
  }
  .pill b {
    display: block;
    font-size: 15px;
    font-variant-numeric: tabular-nums;
  }
  .pill span {
    font-size: 9px;
    letter-spacing: 1.2px;
    color: var(--dim);
    text-transform: uppercase;
  }
  .pill.max b {
    color: #d9a066;
  }
  .pill.min b {
    color: #8fb4c9;
  }
  .detail {
    padding: 10px 12px;
    border-radius: 14px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(183, 132, 255, 0.08));
    border: 1px solid rgba(255, 255, 255, 0.35);
    box-shadow: 0 0 22px rgba(255, 255, 255, 0.12);
  }
  .detail h3 {
    margin: 0 0 6px;
    font-size: 14px;
    letter-spacing: 0.8px;
  }
  .detail .dg {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
  }
  .detail .dg div {
    text-align: center;
  }
  .detail .dg b {
    display: block;
    font-size: 17px;
    font-variant-numeric: tabular-nums;
  }
  .detail .dg span {
    font-size: 9px;
    color: var(--dim);
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  .tbl {
    display: flex;
    flex-direction: column;
    gap: 3px;
    max-height: 330px;
    overflow: auto;
    padding-right: 3px;
  }
  .tbl .th,
  .tbl .row {
    display: grid;
    grid-template-columns: 26px 1fr 58px 62px;
    gap: 8px;
    align-items: center;
    font-size: 12px;
    padding: 3px 6px;
    border-radius: 8px;
  }
  .tbl .th {
    font-size: 9px;
    letter-spacing: 1.2px;
    color: var(--dim);
    text-transform: uppercase;
    position: sticky;
    top: 0;
    background: #07111f;
    z-index: 1;
  }
  .tbl .row {
    cursor: pointer;
    border: 1px solid transparent;
    transition: 0.2s;
  }
  .tbl .row:hover {
    background: rgba(255, 255, 255, 0.07);
  }
  .tbl .row.sel {
    border-color: var(--cy);
    background: rgba(255, 255, 255, 0.1);
  }
  .tbl .row i {
    font-style: normal;
    color: var(--dim);
    font-weight: 700;
  }
  .tbl .bar {
    height: 8px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.07);
    overflow: hidden;
  }
  .tbl .bar b {
    display: block;
    height: 100%;
    border-radius: 4px;
    transition:
      width 0.8s,
      background 0.6s;
  }
  .tbl em {
    font-style: normal;
    text-align: right;
    font-variant-numeric: tabular-nums;
  }
  .tbl .row.mx em:nth-of-type(1) {
    color: #d9a066;
  }
  .tbl .row.mn em:nth-of-type(1) {
    color: #8fb4c9;
  }

  /* ---- Victron rows */
  .vgrid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.3fr);
    gap: 16px;
  }
  .vorb {
    position: relative;
    aspect-ratio: 1;
    max-width: 300px;
    margin: 0 auto;
    width: 100%;
  }
  .vorb svg {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }
  .vorb .m {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .vorb .m b {
    font-size: 46px;
    font-weight: 200;
    font-variant-numeric: tabular-nums;
  }
  .vorb .m span {
    font-size: 10px;
    letter-spacing: 2px;
    color: var(--dim);
  }
  .vbox {
    border: 1px solid rgba(96, 165, 250, 0.3);
    border-radius: 14px;
    overflow: hidden;
    background: rgba(13, 27, 43, 0.7);
    margin-bottom: 10px;
  }
  .vbox h4 {
    margin: 0;
    padding: 7px 12px;
    background: linear-gradient(90deg, #2d6aab, #387dc5);
    font-size: 11px;
    letter-spacing: 1.3px;
    text-transform: uppercase;
  }
  .vrow {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 7px 12px;
    border-top: 1px solid rgba(96, 165, 250, 0.15);
    font-size: 13px;
    cursor: pointer;
  }
  .vrow:first-of-type {
    border-top: none;
  }
  .vrow:hover {
    background: rgba(96, 165, 250, 0.08);
  }
  .vrow span {
    color: #8fa7c0;
  }
  .vrow b {
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
  .valarm {
    display: none;
    padding: 8px 10px;
    border-radius: 8px;
    background: #4a1713;
    border: 1px solid var(--red);
    color: #ffb3aa;
    font-size: 12px;
  }
  .valarm.show {
    display: block;
  }

  .dash {
    display: grid;
    gap: 14px;
    padding: 14px 18px 18px;
    grid-template-columns: repeat(var(--c4, 4), minmax(0, 1fr));
    align-items: start;
  }
  .pnl {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border: 1px solid var(--line);
    border-radius: 18px;
    padding: 12px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.01));
  }
  .ph {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 11px;
    letter-spacing: 2px;
    color: var(--dim);
    text-transform: uppercase;
  }
  .pnl .kpis {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin: 0;
  }
  .pnl .kpi b {
    font-size: 18px;
  }
  .pnl .pills {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .hdr .seg {
    margin-left: auto;
  }
  @container ec (max-width:1500px) {
    .dash {
      grid-template-columns: repeat(var(--c3, 3), minmax(0, 1fr));
    }
    .pnl.ov {
      grid-column: 1/-1;
    }
    .pnl.ov .kpis {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }
  @container ec (max-width:1000px) {
    .dash {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .pnl.vic {
      grid-column: 1/-1;
    }
  }
  @container ec (max-width:640px) {
    .dash {
      grid-template-columns: 1fr;
    }
    .pnl.ov .kpis {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  @container ec (max-width:820px) {
    .bgrid,
    .cgrid,
    .vgrid {
      grid-template-columns: 1fr;
    }
    .kpis {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .sc-scan::after,
    .sun::after,
    .ring,
    .sc-bg::before {
      animation: none;
    }
  }
  /* ---- calm theme: flat surfaces, no glow, fewer boxes */
  ha-card {
    background: #0b1119;
  }
  .hdr {
    background: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }
  .logo b {
    background: none;
    -webkit-background-clip: initial;
    background-clip: initial;
    color: var(--txt);
    font-size: 18px;
    letter-spacing: 0.3px;
  }
  .logo small {
    display: none;
  }
  .pnl {
    border: none;
    background: rgba(255, 255, 255, 0.028);
    border-radius: 16px;
  }
  .scene {
    border: none;
    background: radial-gradient(70% 60% at 50% 55%, #0f1b2b 0%, #0a121c 72%);
  }
  .sc-scan,
  .sc-bg::before {
    display: none;
  }
  .lbl {
    box-shadow: none;
    background: rgba(10, 18, 30, 0.92);
    border: 1px solid rgba(255, 255, 255, 0.14);
  }
  .lbl::after {
    display: none;
  }
  .lbl.cel.sel {
    border-color: #fff;
    box-shadow: none;
  }
  .lbl.chipc:hover {
    box-shadow: none;
    border-color: #fff;
  }
  .lbl.chipc {
    display: flex;
    align-items: baseline;
    gap: 0.45em;
    padding: 0.18em 0.5em;
  }
  .lbl.chipc span {
    order: -1;
    opacity: 0.6;
    font-size: 0.8em;
  }
  .lbl.chipc b {
    font-size: 1.05em;
  }
  .kpi,
  .tile,
  .pill,
  .sw,
  .tab,
  .ghost,
  .exp {
    border: none;
    background: rgba(255, 255, 255, 0.045);
  }
  .kpi::before {
    display: none;
  }
  .pnl .kpi {
    background: none;
    padding: 2px 4px;
  }
  .pnl .kpis {
    gap: 4px;
  }
  .tab.on,
  .ghost.on {
    background: rgba(255, 255, 255, 0.16);
    color: var(--cy);
    box-shadow: none;
  }
  .chip {
    border-width: 0;
    background: rgba(255, 255, 255, 0.06);
  }
  .hud-info div {
    background: none;
    border: none;
    padding: 0;
    min-width: 0;
  }
  .hud-info b {
    font-size: clamp(18px, 5.6cqw, 38px);
  }
  .facts {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px 22px;
    font-size: 13px;
    color: var(--dim);
  }
  .facts div {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    padding-bottom: 5px;
  }
  .facts b {
    color: var(--txt);
    font-weight: 600;
    text-align: right;
  }
  .facts .tmp {
    grid-column: 1 / -1;
    flex-direction: column;
    align-items: stretch;
    gap: 6px;
  }
  .facts .tmp b {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    gap: 6px;
    text-align: center;
  }
  .facts .tmp u {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4px 2px;
    border-radius: 8px;
    background: rgba(127, 127, 127, 0.1);
    font-size: 13px;
    white-space: nowrap;
  }
  .facts .tmp small {
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.5px;
    color: var(--dim);
  }
  .facts i {
    font-style: normal;
    color: var(--dim);
    font-weight: 400;
  }
  .cellinfo {
    font-size: 13px;
    color: var(--dim);
    padding: 8px 10px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.04);
  }
  .cellinfo b {
    color: var(--txt);
  }
  .vbox {
    border: none;
    background: none;
    margin-bottom: 4px;
  }
  .vbox h4 {
    background: none;
    padding: 8px 0 4px;
    color: var(--dim);
    font-size: 10px;
    letter-spacing: 2px;
  }
  .vrow {
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    padding: 6px 0;
  }
  .vrow:hover {
    background: none;
  }
  .vorb {
    max-width: 180px;
  }
  .vorb .m b {
    font-size: 32px;
  }
  .mesh.term {
    display: none;
  }
  .big .mesh.term {
    display: inline;
  }
  /* ---- natural theme: take colours from the Home Assistant theme, muted data colours, no glow */
  :host {
    --cy: #8fb4c9;
    --grn: #7fb58e;
    --red: #c9695c;
    --org: #d9a066;
    --gold: #d8b46a;
    --mg: #a99bc4;
    --dim: var(--secondary-text-color, #8b929c);
    --txt: var(--primary-text-color, #dcdfe4);
    --line: var(--divider-color, rgba(255, 255, 255, 0.08));
    --glass: rgba(127, 127, 127, 0.09);
  }
  ha-card {
    background: var(--ha-card-background, var(--card-background-color, #1d1f23));
    color: var(--txt);
  }
  .hdr {
    border-bottom: 1px solid var(--line);
    background: none;
  }
  .logo b {
    color: var(--txt);
    background: none;
  }
  .pnl {
    background: rgba(127, 127, 127, 0.07);
    border: none;
  }
  .scene {
    background: rgba(127, 127, 127, 0.06);
    border: none;
  }
  .sc-bg {
    display: none;
  }
  .lbl,
  .lbl.btn,
  .lbl.cel,
  .lbl.chipc {
    background: var(--ha-card-background, var(--card-background-color, #1d1f23));
    color: var(--txt);
    border: 1px solid rgba(127, 127, 127, 0.38);
    box-shadow: none;
  }
  .lbl b {
    color: var(--txt);
  }
  .lbl span {
    color: var(--dim);
  }
  .lbl.btn:hover,
  .lbl.chipc:hover {
    border-color: var(--txt);
    box-shadow: none;
  }
  .lbl.cel.sel {
    border-color: var(--txt);
    border-width: 2px;
  }
  .hud-soc {
    text-shadow: none;
  }
  .hud-info b {
    color: var(--txt);
  }
  .kpi,
  .tile,
  .pill,
  .sw,
  .tab,
  .ghost,
  .exp {
    background: rgba(127, 127, 127, 0.1);
    color: var(--txt);
  }
  .tab,
  .ghost {
    color: var(--dim);
  }
  .tab.on,
  .ghost.on {
    background: rgba(143, 180, 201, 0.22);
    color: var(--txt);
    box-shadow: none;
  }
  .sw.on {
    background: rgba(127, 181, 142, 0.22);
    color: var(--txt);
    border: none;
  }
  .sw.on::before {
    background: var(--grn);
    box-shadow: none;
  }
  .chip {
    background: rgba(127, 127, 127, 0.12);
  }
  .chip.charging {
    color: var(--grn);
  }
  .chip.discharging {
    color: var(--org);
  }
  .chip.idle {
    color: var(--dim);
  }
  .chip.offline {
    color: var(--dim);
  }
  .cellinfo,
  .facts {
    color: var(--dim);
  }
  .cellinfo {
    background: rgba(127, 127, 127, 0.09);
  }
  .facts div {
    border-bottom: 1px solid rgba(127, 127, 127, 0.18);
  }
  .cellinfo b,
  .facts b {
    color: var(--txt);
  }
  .err,
  .valarm {
    background: rgba(201, 105, 92, 0.14);
    border: none;
    color: var(--red);
  }
  .vbox {
    border: none;
  }
  .vbox h4 {
    color: var(--dim);
  }
  .vrow {
    border-top: 1px solid rgba(127, 127, 127, 0.18);
  }
  .vrow span {
    color: var(--dim);
  }
  .vrow b {
    color: var(--txt);
  }
  .ph,
  .hint,
  .meta {
    color: var(--dim);
  }
  /* ---- main screen */
  .hdr {
    padding: 14px 20px;
  }
  .hdr .logo b {
    font-size: 18px;
  }
  .main {
    padding: 18px 20px 20px;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
  .hero {
    display: flex;
    align-items: center;
    gap: 6px 24px;
    flex-wrap: wrap;
  }
  .hsoc {
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }
  .hsoc b {
    font-size: clamp(58px, 10cqw, 100px);
    font-weight: 300;
  }
  .hsoc span {
    font-size: clamp(22px, 3.4cqw, 38px);
    color: var(--dim);
    margin-left: 4px;
  }
  .htext .h1 {
    font-size: clamp(19px, 2.7cqw, 28px);
    font-weight: 500;
  }
  .htext .h2 {
    color: var(--dim);
    margin-top: 5px;
    font-size: clamp(13px, 1.7cqw, 16px);
  }
  .ebar {
    flex: 1 1 100%;
    height: 8px;
    border-radius: 4px;
    background: rgba(127, 127, 127, 0.2);
    overflow: hidden;
  }
  .ebar i {
    display: block;
    height: 100%;
    width: 0;
    border-radius: 4px;
    background: var(--grn);
    transition:
      width 1s,
      background 0.6s;
  }
  .bcards {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 14px;
  }
  @container ec (min-width:640px) {
    .bcards {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  .bc,
  .vsec {
    box-sizing: border-box;
    font: inherit;
    color: var(--txt);
    background: rgba(127, 127, 127, 0.08);
  }
  .bc {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px 18px;
    border-radius: 18px;
  }
  .bc-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    font-size: 17px;
    font-weight: 600;
  }
  .bc-mid {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 12px;
  }
  .bc-soc {
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }
  .bc-soc b {
    font-size: 48px;
    font-weight: 300;
  }
  .bc-soc span {
    font-size: 20px;
    color: var(--dim);
    margin-left: 2px;
  }
  .bc-num {
    text-align: right;
  }
  .bc-num div:first-child {
    font-size: 22px;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
  }
  .bc-sub {
    color: var(--dim);
    font-size: 13px;
    margin-top: 3px;
  }
  .bc-foot {
    font-size: 13px;
    color: var(--dim);
  }
  button.vline {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding: 13px 18px;
    border-radius: 14px;
    font-size: 14px;
    color: var(--dim);
  }
  .vline b {
    color: var(--txt);
    font-weight: 600;
  }
  .vline.warn {
    color: var(--red);
  }
  .vline i {
    font-style: normal;
    font-size: 20px;
  }
  .alert {
    padding: 10px 14px;
    border-radius: 12px;
    background: rgba(201, 105, 92, 0.14);
    color: var(--red);
    font-size: 14px;
    margin-bottom: 6px;
  }
  .store {
    display: none;
  }
  .bhead .seg {
    margin-left: auto;
  }
  .bhead {
    flex-wrap: wrap;
  }
  /* ---- cells standing on edge, wired in series; current flows left->right on discharge, right->left on charge */
  .bc-cells {
    display: flex;
    align-items: stretch;
    gap: 6px;
    height: 56px;
    --spd: 2.4s;
  }
  .bc-cells .lead {
    flex: 0 0 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 700;
    color: var(--dim);
  }
  .bc-cells .cl {
    position: relative;
    flex: 1 1 0;
    min-width: 0;
    margin-top: 8px;
    border-radius: 5px;
    background: var(--c, var(--grn));
    transition: background 0.6s;
    overflow: visible;
  }
  .bc-cells .cl::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 5px;
    opacity: 0;
    background: linear-gradient(180deg, transparent 0, rgba(255, 255, 255, 0.34) 50%, transparent 100%);
    background-size: 100% 260%;
  }
  .bc-cells[data-st="charging"] .cl::before {
    opacity: 1;
    animation: sweepUp var(--spd) linear infinite;
  }
  .bc-cells[data-st="discharging"] .cl::before {
    opacity: 1;
    animation: sweepDown var(--spd) linear infinite;
  }
  @keyframes sweepUp {
    from {
      background-position: 0 100%;
    }
    to {
      background-position: 0 0;
    }
  }
  @keyframes sweepDown {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 0 100%;
    }
  }
  .bc-cells .tm {
    position: absolute;
    display: block;
    top: -7px;
    width: 26%;
    height: 7px;
    border-radius: 2px 2px 0 0;
    background: rgba(127, 127, 127, 0.6);
  }
  .bc-cells .tm.l {
    left: 10%;
  }
  .bc-cells .tm.r {
    right: 10%;
  }
  .bc-cells .bar {
    position: absolute;
    display: block;
    top: -6px;
    left: 77%;
    width: calc(46% + 6px);
    height: 3px;
    background: rgba(127, 127, 127, 0.6);
    z-index: 1;
  }
  .bc-cells .bar::after {
    content: "";
    position: absolute;
    top: -1px;
    left: 0;
    width: 7px;
    height: 5px;
    border-radius: 3px;
    background: var(--txt);
    opacity: 0;
  }
  .bc-cells[data-st="discharging"] .bar::after {
    animation: dotR var(--spd) linear infinite;
  }
  .bc-cells[data-st="charging"] .bar::after {
    animation: dotL var(--spd) linear infinite;
  }
  @keyframes dotR {
    0% {
      left: 0;
      opacity: 0;
    }
    15% {
      opacity: 0.9;
    }
    85% {
      opacity: 0.9;
    }
    100% {
      left: calc(100% - 7px);
      opacity: 0;
    }
  }
  @keyframes dotL {
    0% {
      left: calc(100% - 7px);
      opacity: 0;
    }
    15% {
      opacity: 0.9;
    }
    85% {
      opacity: 0.9;
    }
    100% {
      left: 0;
      opacity: 0;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .bc-cells .cl::before,
    .bc-cells .bar::after {
      animation: none !important;
    }
  }
  /* ---- on-edge EVE cells (SVG) + values under each cell */
  .pk2 {
    position: relative;
    container: pk/inline-size;
    --spd: 2.4s;
    --mxc: #e8a15c;
    --mnc: #b8a4ec;
    box-sizing: border-box;
    padding: 12px 8px;
    border-radius: 12px;
    background: var(--glass);
    border: 1px solid var(--line);
  }
  .pk2 .pk .shd polygon {
    fill: rgba(255, 255, 255, 0.2);
    fill: color-mix(in srgb, var(--primary-text-color, #fff) 22%, transparent);
  }
  .pk {
    display: block;
    width: 100%;
    height: auto;
    overflow: visible;
  }

  .pk2 .liq {
    transition: transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .pk2 .liq rect,
  .pk2 .liq .wave {
    fill: var(--c, #7fb58e);
    fill-opacity: 0.9;
  }
  .pk2 .wave {
    transform-box: fill-box;
    animation: wv 3.6s linear infinite;
  }
  @keyframes wv {
    to {
      transform: translateX(-50%);
    }
  }
  .pk2 .bub {
    fill: #fff;
    opacity: 0;
  }
  .pk2[data-st="charging"] .bub {
    animation: bubUp var(--spd) ease-in infinite;
  }
  .pk2[data-st="discharging"] .bub {
    animation: bubDown var(--spd) ease-in infinite;
  }
  @keyframes bubUp {
    0% {
      transform: translateY(0);
      opacity: 0;
    }
    20% {
      opacity: 0.7;
    }
    100% {
      transform: translateY(-34px);
      opacity: 0;
    }
  }
  @keyframes bubDown {
    0% {
      transform: translateY(-34px);
      opacity: 0;
    }
    20% {
      opacity: 0.6;
    }
    100% {
      transform: translateY(0);
      opacity: 0;
    }
  }
  .pk2 .fl {
    opacity: 0;
  }
  .pk2[data-st="discharging"] .fl {
    opacity: 0.9;
    animation: dashR var(--spd) linear infinite;
  }
  .pk2[data-st="charging"] .fl {
    opacity: 0.9;
    animation: dashL var(--spd) linear infinite;
  }
  @keyframes dashR {
    to {
      stroke-dashoffset: -10;
    }
  }
  @keyframes dashL {
    to {
      stroke-dashoffset: 10;
    }
  }
  .cv {
    display: grid;
    margin: 4px 4.5% 0;
    text-align: center;
  }
  .cv b {
    display: block;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    font-size: clamp(8px, 1.55cqw, 13px);
  }
  .cv span {
    display: block;
    color: var(--dim);
    font-size: clamp(7px, 1.2cqw, 11px);
    margin-top: 1px;
  }
  .cv .mx b {
    color: var(--org);
  }
  .cv .mn b {
    color: var(--cy);
  }
  @container pk (max-width:430px) {
    .cv span {
      display: none;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .pk2 .wave,
    .pk2 .bub,
    .pk2 .fl {
      animation: none !important;
    }
  }
  /* ---- values inside the SVG */
  .pk2 .tv {
    font-size: 18px;
    font-weight: 600;
    fill: var(--txt);
    text-anchor: middle;
    font-variant-numeric: tabular-nums;
  }
  .pk2 .tv.mx {
    fill: var(--mxc);
  }
  .pk2 .tv.mn {
    fill: var(--mnc);
  }
  .pk2 .tr {
    font-size: 13.5px;
    fill: var(--dim);
    text-anchor: middle;
  }
  @container pk (max-width:520px) {
    .pk2 .tr {
      display: none;
    }
  }
  .pk2 .led {
    fill: #1a1d22;
    stroke: #b4bcc7;
    stroke-width: 1.4;
    transition:
      fill 0.4s,
      filter 0.4s;
  }
  .pk2 .led.on {
    fill: #6fe39a;
    stroke: #d8ffe6;
    filter: drop-shadow(0 0 4px #6fe39a);
  }
  .pk2 .led.bal.on {
    fill: #ff6a1f;
    stroke: #ffd2a8;
    filter: drop-shadow(0 0 3px #ff5a14) drop-shadow(0 0 7px rgba(255, 70, 20, 0.7));
    animation: balp 1.1s ease-in-out infinite;
  }
  @keyframes balp {
    50% {
      opacity: 0.35;
    }
  }
  .pk2 .hb {
    stroke: #dfffe9;
    stroke-width: 1.1;
    filter: drop-shadow(0 0 4px #7fb58e);
    animation: hb 1.8s ease-in-out infinite;
  }
  .pk2 .hb.off {
    fill: #c9695c;
    stroke: #ffd9d3;
    filter: drop-shadow(0 0 4px #c9695c);
    animation: none;
  }
  @keyframes hb {
    0%,
    100% {
      opacity: 0.35;
    }
    50% {
      opacity: 1;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .pk2 .led.bal.on,
    .pk2 .hb {
      animation: none !important;
    }
  }
  .cv {
    display: none;
  }
  /* ---- everything in the main card */
  .bc-meta {
    font-size: 12px;
    color: var(--dim);
    margin-top: -8px;
  }
  .pk2 .cell.sel {
    filter: drop-shadow(0 0 3px rgba(143, 180, 201, 0.95)) drop-shadow(0 0 9px rgba(143, 180, 201, 0.6));
  }
  .pk2 .tv.sel {
    fill: #fff;
    text-decoration: underline;
  }
  .vsec {
    border-radius: 16px;
    padding: 14px 18px;
  }
  .vsec .vhead {
    font-size: 14px;
    color: var(--dim);
    margin-bottom: 8px;
  }
  .vsec .vhead b {
    color: var(--txt);
    font-weight: 600;
  }
  .vsec.warn .vhead {
    color: var(--red);
  }
  .vsec .vrows {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 0 28px;
  }
  .bc .ctrl {
    margin-top: 2px;
  }
  /* ---- weakest / strongest cell, balancing bolts, inline confirmation */
  .pk2 .mk {
    display: none;
    animation: bob 1.3s ease-in-out infinite;
  }
  .pk2 .mk text {
    font-size: 6.6px;
    font-weight: 700;
    fill: #1c1c1c;
    text-anchor: middle;
  }
  .pk2 .mkw.mx .mk.max {
    display: inline;
  }
  .pk2 .mkw.mn .mk.min {
    display: inline;
  }
  .pk2 .mkw {
    pointer-events: none;
    transition: transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .pk2 .mk.max rect,
  .pk2 .mk.max path {
    fill: var(--mxc);
  }
  .pk2 .mk.min rect,
  .pk2 .mk.min path {
    fill: var(--mnc);
  }
  @keyframes bob {
    0%,
    100% {
      translate: 0 0;
    }
    50% {
      translate: 0 -3px;
    }
  }
  @keyframes ringMx {
    0%,
    100% {
      stroke-opacity: 0.25;
    }
    50% {
      stroke-opacity: 1;
    }
  }
  .pk2 .bz {
    display: none;
    fill: #c9b8ee;
    stroke: #fff;
    stroke-width: 0.6;
    stroke-linejoin: round;
  }
  .pk2 .cell.bal .bz {
    display: inline;
    animation: flick 0.9s steps(1) infinite;
  }
  .pk2 .cell.bal rect[rx="2.5"] {
    stroke: var(--mg);
    stroke-width: 2;
    animation: ringBal 1s ease-in-out infinite;
  }
  @keyframes ringBal {
    0%,
    100% {
      stroke-opacity: 0.3;
    }
    50% {
      stroke-opacity: 1;
    }
  }
  @keyframes flick {
    0% {
      opacity: 1;
    }
    12% {
      opacity: 0.2;
    }
    24% {
      opacity: 1;
    }
    38% {
      opacity: 0.35;
    }
    52% {
      opacity: 1;
    }
    70% {
      opacity: 0.15;
    }
    84% {
      opacity: 0.9;
    }
    100% {
      opacity: 1;
    }
  }
  .pk2 .zap {
    pointer-events: none;
    transition: opacity 0.35s ease-out;
  }
  .pk2 .zb {
    fill: none;
    stroke: #a99bc4;
    stroke-width: 5;
    stroke-linejoin: round;
    stroke-linecap: round;
    opacity: 0.28;
    animation: flick 0.7s steps(1) infinite;
  }
  .pk2 .zc {
    fill: none;
    stroke: #fff;
    stroke-width: 1.5;
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-dasharray: 7 6;
    animation:
      zapRun 0.45s linear infinite,
      flick 0.7s steps(1) infinite;
  }
  @keyframes zapRun {
    to {
      stroke-dashoffset: -13;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .pk2 .mk,
    .pk2 .cell .bz,
    .pk2 .zb,
    .pk2 .zc,
    .pk2 .cell.mx rect,
    .pk2 .cell.mn rect,
    .pk2 .cell.bal rect {
      animation: none !important;
    }
  }
  .confirm {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    width: 100%;
    padding: 9px 11px;
    border-radius: 12px;
    background: rgba(217, 160, 102, 0.15);
  }
  .confirm span {
    flex: 1 1 200px;
    font-size: 13px;
  }
  .confirm b {
    font-weight: 600;
  }
  .confirm button {
    cursor: pointer;
    border: none;
    border-radius: 10px;
    padding: 8px 14px;
    font: inherit;
    font-size: 13px;
    font-weight: 600;
    color: var(--txt);
    background: rgba(127, 127, 127, 0.22);
  }
  .confirm .yes {
    background: var(--org);
    color: #1c1c1c;
  }
  /* ---- the four numbers that matter + electrons */
  .bc {
    container: bc/inline-size;
  }
  .bgs {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 8px;
  }
  .bg {
    border-radius: 12px;
    background: rgba(127, 127, 127, 0.07);
    padding: 10px 12px;
    min-width: 0;
  }
  .bg .l {
    display: block;
    font-size: 11px;
    letter-spacing: 1.2px;
    color: var(--dim);
    text-transform: uppercase;
  }
  .bg b {
    display: block;
    margin-top: 2px;
    font-size: clamp(26px, 5.4cqw, 44px);
    font-weight: 400;
    line-height: 1.1;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
  .bg b small {
    font-size: 0.42em;
    color: var(--dim);
    margin-left: 3px;
    font-weight: 400;
  }
  .bg i {
    display: block;
    font-style: normal;
    font-size: 12px;
    color: var(--dim);
    margin-top: 2px;
    white-space: nowrap;
  }
  .pk2 .ov {
    position: absolute;
    inset: 12px 8px;
    pointer-events: none;
  }
  .ov > * {
    pointer-events: auto;
  }
  .ov .hd2 {
    position: absolute;
    left: 34px;
    top: 0.4cqw;
    display: flex;
    align-items: center;
    gap: 8px;
    max-width: 60%;
  }
  .ov .pksel option {
    background: var(--card-background-color, #1c1c1c);
    color: var(--primary-text-color, #e1e1e1);
  }
  .ov .pkname {
    font-size: clamp(13px, 1.9cqw, 19px);
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .ov .pksel {
    color-scheme: dark light;
    background: rgba(127, 127, 127, 0.18);
    color: var(--txt);
    border: 1px solid var(--line);
    border-radius: 999px;
    padding: 5px 12px;
    font: inherit;
    font-size: clamp(12px, 1.6cqw, 15px);
    max-width: 100%;
  }
  .ov .bgs {
    position: absolute;
    left: 0.3%;
    top: 46.5%;
    width: 21.4%;
    height: 52.5%;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 0.8cqw;
  }
  .ov .bg {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.6cqw;
    padding: 0 1cqw;
    border-radius: 1.2cqw;
  }
  .ov .bg .l {
    font-size: clamp(9px, 1.1cqw, 12px);
    letter-spacing: 0.8px;
  }
  .ov .bg b {
    margin: 0;
    font-size: clamp(15px, 2.5cqw, 30px);
    text-align: right;
  }
  .ov .bg i {
    display: none;
  }
  @container pkw (max-width:699px) {
    .pk2 {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .pk2 .ov {
      display: contents;
    }
    .ov .hd2 {
      position: static;
      order: -1;
      margin-left: 30px;
      max-width: 100%;
    }
    .ov .pkname {
      font-size: 14px;
    }
    .ov .bgs {
      position: static;
      width: auto;
      height: auto;
      grid-template-rows: none;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 6px;
    }
    .ov .bg {
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      padding: 8px 10px;
      border-radius: 12px;
    }
    .ov .bg .l {
      font-size: 10px;
    }
    .ov .bg b {
      font-size: clamp(18px, 6cqw, 26px);
      text-align: left;
    }
    .ov .bg i {
      display: block;
    }
  }
  .pk2 .fl,
  .pk2[data-st] .fl {
    opacity: 0 !important;
    animation: none !important;
  }
  :host {
    overflow-anchor: none;
  }
  @container bc (max-width:420px) {
    .facts {
      grid-template-columns: 1fr;
    }
    .cellinfo {
      font-size: 12px;
    }
  }
  .pk2 .el circle {
    fill: #d3ecff;
    stroke: #7fb6e8;
    stroke-width: 0.5;
    pointer-events: none;
  }
  .facts u {
    text-decoration: none;
  }
  .facts u[data-m]:hover {
    text-decoration: underline;
  }
  [data-m] {
    cursor: pointer;
  }
  .bg[data-m]:hover,
  .facts > div[data-m]:hover,
  .hsoc[data-m]:hover,
  .h1[data-m]:hover {
    filter: brightness(1.3);
  }
  .pk2 .dsp {
    cursor: pointer;
  }
  .pk2 .dsp .pwr {
    cursor: pointer;
  }
  .pk2 .dsp .lr1 {
    stroke: #ffc36a;
  }
  .pk2 .dsp.off .pwr .cp,
  .pk2 .dsp.pwroff .pwr .cp {
    opacity: 0;
  }
  .pk2 .dsp .lr2 {
    stroke: #ff2a18;
  }
  .pk2 .dsp:not(.off):not(.pwroff) .pwr .lr1,
  .pk2 .dsp:not(.off):not(.pwroff) .pwr .lr2 {
    filter: drop-shadow(0 0 1.6px #ff5a30) drop-shadow(0 0 4px rgba(255, 60, 25, 0.8));
  }
  .pk2 .dsp.off .pwr .lr1,
  .pk2 .dsp.pwroff .pwr .lr1 {
    stroke: #3a2a22;
  }
  .pk2 .dsp.off .pwr .lr2,
  .pk2 .dsp.pwroff .pwr .lr2 {
    stroke: #3a0d0a;
  }
  .pk2 .dsp:not(.off):not(.pwroff) .pwr {
    filter: drop-shadow(0 0 4px rgba(255, 50, 30, 0.35));
  }
  .pk2 .chv {
    fill: none;
    stroke: #2f9bff;
    stroke-width: 3.2;
    stroke-linecap: round;
    stroke-linejoin: round;
    opacity: 0.14;
  }
  .pk2 .chv0 {
    animation: chv0 1.2s linear infinite;
  }
  .pk2 .chv1 {
    animation: chv1 1.2s linear infinite;
  }
  .pk2 .chv2 {
    animation: chv2 1.2s linear infinite;
  }
  .pk2 .chv3 {
    animation: chv3 1.2s linear infinite;
  }
  @keyframes chv0 {
    0%,
    83.32% {
      opacity: 1;
    }
    83.33%,
    100% {
      opacity: 0.14;
    }
  }
  @keyframes chv1 {
    0%,
    16.66% {
      opacity: 0.14;
    }
    16.67%,
    83.32% {
      opacity: 1;
    }
    83.33%,
    100% {
      opacity: 0.14;
    }
  }
  @keyframes chv2 {
    0%,
    33.32% {
      opacity: 0.14;
    }
    33.33%,
    83.32% {
      opacity: 1;
    }
    83.33%,
    100% {
      opacity: 0.14;
    }
  }
  @keyframes chv3 {
    0%,
    49.99% {
      opacity: 0.14;
    }
    50%,
    83.32% {
      opacity: 1;
    }
    83.33%,
    100% {
      opacity: 0.14;
    }
  }
  .pk2 .dsp .gl {
    pointer-events: none;
  }
  .dpopbk {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.78);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    box-sizing: border-box;
  }
  .dpopbk .dp {
    width: min(94vw, 980px);
    background: none;
    border: 0;
    padding: 0;
    container-type: normal;
  }
  .dpsvg {
    width: 100%;
    height: auto;
    display: block;
    filter: drop-shadow(0 12px 40px rgba(0, 0, 0, 0.7));
  }
  .dpsvg .gl {
    opacity: 0.45;
  }
  :host(.noglare) .gl {
    display: none;
  }
  .dpsvg .dsp > rect:first-of-type {
    fill: #000;
    stroke: #3a3f46;
    stroke-width: 1.1;
  }
  .dph {
    margin-top: 12px;
    text-align: center;
    font-size: 12px;
    color: #9aa4ae;
  }
  :host(.lite) .pk2 .wave {
    animation: none;
  }
  :host(.lite) .pk2 .bub {
    display: none;
  }
  :host(.lite) .pk2 .mk {
    animation: none;
  }
  :host(.lite) .pk2 .shd {
    filter: none;
  }
  :host(.lite) .pk2 .dsp .pwr,
  :host(.lite) .pk2 .dsp .pwr .lr1,
  :host(.lite) .pk2 .dsp .pwr .lr2,
  :host(.lite) .pk2 .led.on,
  :host(.lite) .pk2 .led.bal.on {
    filter: none !important;
  }
  :host(.offscreen) * {
    animation-play-state: paused !important;
  }
  .pk2 {
    contain: layout style;
  }
  .chip.balancing {
    background: rgba(183, 132, 255, 0.2);
    color: #c9b3ff;
  }
  .pkw {
    position: relative;
    container: pkw/inline-size;
  }
  .packs {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    margin: 6px 0 2px;
  }
  .packs:empty {
    display: none;
  }
  .pkchip {
    cursor: pointer;
    border: 1px solid var(--line);
    background: rgba(127, 127, 127, 0.12);
    color: var(--dim);
    border-radius: 999px;
    padding: 4px 12px;
    font: inherit;
    font-size: 12px;
  }
  .pkchip.on {
    background: rgba(143, 180, 201, 0.28);
    color: var(--txt);
    border-color: rgba(143, 180, 201, 0.6);
  }
  .zoom {
    position: absolute;
    top: 8px;
    left: 8px;
    z-index: 2;
    width: 28px;
    height: 28px;
    padding: 0;
    border: 0;
    border-radius: 8px;
    background: rgba(127, 127, 127, 0.18);
    color: var(--dim);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .zoom:hover {
    background: rgba(127, 127, 127, 0.32);
    color: var(--txt);
  }
  .ppopbk {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.78);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    box-sizing: border-box;
  }
  .ppopbk .pp {
    width: min(96vw, calc((100vh - 48px) * 1.85));
  }
  .ppopbk .pk2 {
    width: 100%;
    background: var(--card-background-color, #1c1c1c);
  }
  .dpopbk .dp {
    position: relative;
  }
  .lmenu {
    position: absolute;
    left: 61%;
    top: 27%;
    z-index: 5;
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 6px;
    background: #0c0e11;
    border: 1px solid #3a3f46;
    border-radius: 10px;
    min-width: 150px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
  }
  .lmenu button {
    background: none;
    border: 0;
    color: #e6ece8;
    font: inherit;
    font-size: 14px;
    text-align: left;
    padding: 7px 10px;
    border-radius: 7px;
    cursor: pointer;
  }
  .lmenu button:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  .lmenu button.on {
    background: rgba(143, 180, 201, 0.28);
  }
  .dpx {
    position: absolute;
    top: 14px;
    right: 14px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    font-size: 18px;
    cursor: pointer;
  }
  .pk2 .sgt {
    display: none;
  }
  .pk2 .dsp.act:not(.off) .batg {
    animation: bfl 1s steps(1, end) infinite;
  }
  @keyframes bfl {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.12;
    }
  }
  .pk2 .dsp.off .dsc {
    display: none;
  }
  .pk2 .dsp .pg {
    display: none;
  }
  .pk2 .dsp:not([data-pg]) .pg-group,
  .pk2 .dsp[data-pg="group"] .pg-group,
  .pk2 .dsp[data-pg="packs"] .pg-packs,
  .pk2 .dsp[data-pg="cells"] .pg-cells {
    display: inline;
  }
  .dpopbk [data-go] {
    cursor: pointer;
  }
`;

  // src/util.js
  var clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  var num = (s) => {
    if (!s) return NaN;
    const v = parseFloat(s.state);
    return isNaN(v) ? NaN : v;
  };
  var fmt = (v, d = 1) => isNaN(v) ? "\u2013" : v.toFixed(d);
  var fmtW = (w) => isNaN(w) ? "\u2013" : Math.abs(w) >= 1e3 ? (w / 1e3).toFixed(2) + " kW" : Math.round(w) + " W";
  var socColor = (s) => isNaN(s) ? "#8899aa" : s < 15 ? "#c9695c" : s < 30 ? "#d9a066" : s < 50 ? "#d8b46a" : "#7fb58e";
  var html = (s) => {
    const t = document.createElement("template");
    t.innerHTML = s.trim();
    return t.content.firstChild;
  };
  function grpOrder(bs, mi) {
    return [
      mi,
      ...bs.map((_, i) => i).filter((i) => i !== mi).sort((a, b) => (bs[a].slave || 999) - (bs[b].slave || 999) || a - b)
    ];
  }

  // src/victron.js
  var VIC_TILES = [
    {
      k: "soc",
      g: "bat",
      f: (r) => Math.round(+r) + " %",
      d: "sensor.victron_mqtt_battery_290_battery_soc",
      re: /battery.*battery_soc/,
      c: (r) => socColor(+r)
    },
    {
      k: "voltage",
      g: "bat",
      f: (r) => (+r).toFixed(2) + " V",
      d: "sensor.victron_mqtt_battery_290_battery_voltage",
      re: /battery.*battery_voltage/
    },
    {
      k: "current",
      g: "bat",
      f: (r) => (+r).toFixed(1) + " A",
      d: "sensor.victron_mqtt_battery_290_battery_current",
      re: /battery.*battery_current/,
      c: (r) => +r > 0.3 ? "#7fb58e" : +r < -0.3 ? "#d9a066" : ""
    },
    {
      k: "power",
      g: "bat",
      f: (r) => Math.round(+r) + " W",
      d: "sensor.victron_mqtt_battery_290_battery_power",
      re: /battery.*battery_power/,
      c: (r) => +r > 0 ? "#7fb58e" : +r < 0 ? "#d9a066" : ""
    },
    {
      k: "time_to_go",
      g: "bat",
      f: (r) => hms(r),
      d: "sensor.victron_mqtt_battery_290_battery_time_to_go",
      re: /time_to_go/
    },
    {
      k: "battery_state",
      g: "bat",
      f: (r) => title(r),
      d: "sensor.gx_device_dc_battery_state",
      re: /dc_battery_state/,
      c: (r) => ({ charging: "#7fb58e", discharging: "#c9695c" })[String(r).toLowerCase()] || ""
    },
    {
      k: "multiplus_voltage",
      g: "inv",
      f: (r) => (+r).toFixed(2) + " V",
      d: "sensor.multiplus_ii_48_6k5_100_50_id_288_dc_voltage",
      re: /multiplus.*dc_voltage/
    },
    {
      k: "inverter_state",
      g: "inv",
      f: (r) => title(r),
      d: "sensor.victron_mqtt_vebus_288_vebus_inverter_state",
      re: /vebus.*inverter_state/,
      c: (r) => {
        r = String(r).toLowerCase();
        return /bulk/.test(r) ? "#4f9dff" : /absorp/.test(r) ? "#d9a066" : /float/.test(r) ? "#7fb58e" : /overload|low batt|temp/.test(r) ? "#c9695c" : /invert/.test(r) ? "#d8b46a" : "";
      }
    },
    {
      k: "system_state",
      g: "inv",
      f: (r) => title(r),
      d: "sensor.victron_mqtt_system_0_system_state",
      re: /system_state/
    },
    {
      k: "dc_temp",
      g: "inv",
      f: (r) => (+r).toFixed(1) + " \xB0C",
      d: "sensor.victron_mqtt_vebus_288_vebus_inverter_dc_temperature",
      re: /dc_temperature/
    },
    {
      k: "consumed_ah",
      g: "hist",
      f: (r) => Math.abs(Math.round(+r)) + " Ah",
      d: "sensor.smartshunt_500a_50mv_id_290_cumulative_ah_drawn",
      re: /cumulative_ah_drawn/
    },
    {
      k: "cycles",
      g: "hist",
      f: (r) => r,
      d: "sensor.smartshunt_500a_50mv_id_290_total_charge_cycles",
      re: /total_charge_cycles/
    },
    {
      k: "last_full_charge",
      g: "hist",
      f: (r) => hms(r),
      d: "sensor.smartshunt_500a_50mv_id_290_time_since_last_full_charge",
      re: /time_since_last_full_charge/
    }
  ];
  var VIC_EXTRA = [
    {
      k: "alarm_low_battery",
      d: "sensor.victron_mqtt_vebus_288_vebus_inverter_alarm_low_battery",
      re: /alarm_low_battery/
    }
  ];
  function hms(raw) {
    const s = parseInt(raw);
    if (isNaN(s)) return "N/A";
    const d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60);
    return `${d ? d + "d " : ""}${h || d ? h + "h " : ""}${m}m`;
  }
  function title(r) {
    return String(r).replace(/\b\w/g, (c) => c.toUpperCase());
  }
  function discoverBatteries(hass) {
    const out = [];
    Object.keys(hass.states).forEach((id) => {
      const m = id.match(/^sensor\.(.+)_cell_voltage_1$/);
      if (!m) return;
      const fn = (hass.states[id].attributes || {}).friendly_name || "";
      out.push({ name: fn.replace(/\s*cell voltage 1$/i, "").trim() || m[1], entity_base: m[1] });
    });
    return out.sort((a, b) => a.entity_base.localeCompare(b.entity_base));
  }
  function discoverVictron(hass) {
    const ids = Object.keys(hass.states).filter((i) => i.startsWith("sensor.")), out = {};
    [...VIC_EXTRA, ...VIC_TILES].forEach((t) => {
      out[t.k] = hass.states[t.d] && t.d || ids.find((i) => t.re.test(i) && /victron|smartshunt|multiplus|gx_device|vebus/.test(i)) || "";
    });
    return out;
  }

  // src/card.js
  var setH = (el, h) => {
    if (el._h !== h) {
      el._h = h;
      el.innerHTML = h;
    }
  };
  var fmtRb = (b, r) => isNaN(r) ? "\u2013" : b.resUnit === "\u03A9" || !b.resUnit ? r < 0.1 ? (r * 1e3).toFixed(0) + " m\u03A9" : r.toFixed(3) + " \u03A9" : r.toFixed(/^m/i.test(b.resUnit) ? 0 : 2) + " " + b.resUnit;
  var JkBatteryCard = class extends HTMLElement {
    static getStubConfig(hass) {
      const bats = hass ? discoverBatteries(hass) : [];
      return {
        batteries: bats.length ? bats : [
          { name: "Bat. Old", entity_base: "jk_bms_bms0" },
          { name: "Bat. New", entity_base: "jk_bms_bms1" }
        ],
        victron: hass ? discoverVictron(hass) : {}
      };
    }
    static getConfigElement() {
      return document.createElement("jk-bms-battery-card-editor");
    }
    getCardSize() {
      return 12;
    }
    getGridOptions() {
      return { columns: 12, min_columns: 6 };
    }
    setConfig(config) {
      const key = JSON.stringify(config);
      if (this._built && key === this._cfgKey) return;
      this._cfgKey = key;
      if (this._built) this.style.minHeight = this.offsetHeight + "px";
      this._cfg = { cells: 16, temps: 4, batteries: [], victron: {}, ...config };
      this._lang = null;
      this._setLang(this._wantLang(this._hass));
      this._metric = "v";
      this._data = null;
      this._build();
    }
    set hass(h) {
      this._hass = h;
      if (ST.editing > 0 && this._shown || this._pvw || this._vis === false) return;
      const nl = this._wantLang(h);
      if (nl !== this._lang) {
        this._setLang(nl);
        if (this._built) {
          this._build();
          return;
        }
      }
      if (!this._built) return;
      const now = performance.now(), gap = this.classList.contains("lite") ? 1500 : 900;
      if (now - (this._lastU || 0) > gap) {
        this._lastU = now;
        clearTimeout(this._tm);
        this._tm = null;
        this._update();
      } else if (!this._tm)
        this._tm = setTimeout(() => {
          this._tm = null;
          this._lastU = performance.now();
          this._update();
        }, gap);
    }
    connectedCallback() {
      CARDS.add(this);
      if (typeof IntersectionObserver === "function" && !this._io) {
        this._io = new IntersectionObserver((es) => {
          const v = es[es.length - 1].isIntersecting;
          if (v !== this._vis) {
            this._vis = v;
            this.classList.toggle("offscreen", !v);
            if (v) this._wake();
          }
        });
        this._io.observe(this);
      }
      if (inPreview(this) && !this._pvw) {
        this._pvw = true;
        this._built = false;
        this._pvwShow();
      }
      this._conn = true;
    }
    _pvwShow() {
      ST.lang = this._lang || ST.lang;
      const root = this.shadowRoot || this.attachShadow({ mode: "open" });
      root.innerHTML = `<style>.pv{padding:16px;color:var(--secondary-text-color,#9b9b9b);font-size:13px}.pv b{display:block;color:var(--primary-text-color,#e1e1e1);font-size:16px;margin-bottom:4px}</style><ha-card>
      <div class="pv"><b>${this._cfg && this._cfg.title || tt("title_default")}</b>${tt("preview_off")}</div></ha-card>`;
    }
    _wake() {
      if (this._built && this._hass) this._update();
    }
    disconnectedCallback() {
      CARDS.delete(this);
      if (this._io) {
        this._io.disconnect();
        this._io = null;
      }
      this._vis = void 0;
      this._conn = false;
      clearTimeout(this._rgT);
      this._rgT = null;
      clearTimeout(this._tm);
      clearTimeout(this._zapT);
      this._zapT = null;
      cancelAnimationFrame(this._elT);
      this._elT = null;
    }
    _id(b, key, domain = "sensor") {
      return b.entities && b.entities[key] || `${domain}.${b.entity_base}_${key}`;
    }
    _set2(el, t) {
      if (el && el.textContent !== t) el.textContent = t;
    }
    _isLite() {
      const p = this._cfg && this._cfg.performance;
      if (p === "lite") return true;
      if (p === "full") return false;
      const nv = typeof navigator !== "undefined" ? navigator : {}, mm = (q) => typeof matchMedia === "function" && matchMedia(q).matches;
      return !!(nv.deviceMemory && nv.deviceMemory <= 4 || nv.hardwareConcurrency && nv.hardwareConcurrency <= 4 || mm("(pointer: coarse)") || mm("(prefers-reduced-motion: reduce)"));
    }
    _wantLang(h) {
      if (this._langOverride === void 0) {
        try {
          this._langOverride = localStorage.getItem("jk-bms-lang") || null;
        } catch (e) {
          this._langOverride = null;
        }
      }
      return this._langOverride || pickLang(this._cfg && this._cfg.language, h && h.language);
    }
    async _langMenu(bk) {
      const old = bk.querySelector(".lmenu");
      if (old) {
        old.remove();
        return;
      }
      const list = await loadLangList(), m = document.createElement("div");
      m.className = "lmenu";
      m.innerHTML = [["auto", tt("lang_auto")], ...Object.entries(list)].map(
        ([c, n]) => `<button data-lc="${c}" class="${(c === "auto" ? !this._langOverride : this._langOverride === c) ? "on" : ""}">${n}</button>`
      ).join("");
      m.onclick = (e) => {
        const b = e.target.closest("[data-lc]");
        if (b) this._pickLang(b.dataset.lc);
      };
      const host = bk.querySelector(".dp");
      if (host) host.appendChild(m);
    }
    _rebuild() {
      const pi = this._pop ? this._pop.i : -1;
      this._build();
      if (pi >= 0)
        setTimeout(() => {
          const st = this.shadowRoot && this.shadowRoot.querySelectorAll(".pkw .pk2")[pi];
          if (st && !this._pop) this._openDisp(pi, st);
        }, 150);
    }
    _pickLang(code) {
      this._langOverride = code === "auto" ? null : code;
      try {
        if (code === "auto") localStorage.removeItem("jk-bms-lang");
        else localStorage.setItem("jk-bms-lang", code);
      } catch (e) {
      }
      this._setLang(this._wantLang(this._hass));
      this._applyLang();
    }
    _applyLang() {
      if (!this._built) return;
      if (this._pop) {
        this._retranslate();
        this._langDirty = true;
        this._dsig = null;
        const lm = this._pop.el && this._pop.el.querySelector(".lmenu");
        if (lm) lm.remove();
        if (this._hass) {
          this._shown = false;
          this._update();
        }
      } else this._build();
    }
    _retranslate() {
      this.shadowRoot.querySelectorAll("[data-tr]").forEach((el) => {
        const [k, suf] = el.getAttribute("data-tr").split("|");
        const t = tt(k) + (suf || "");
        if (el.textContent !== t) el.textContent = t;
      });
    }
    _afterClose() {
      if (this._langDirty && this._built) {
        this._langDirty = false;
        this._build();
      }
    }
    _setLang(nl) {
      this._lang = nl;
      ST.lang = nl;
      if (nl !== "en" && !I18N[nl])
        loadLang(nl, this._cfg && this._cfg.translations_path).then((ok) => {
          if (ok && this._lang === nl && this._built) {
            ST.lang = nl;
            this._applyLang();
          }
        });
    }
    _more(id) {
      if (id)
        this.dispatchEvent(
          new CustomEvent("hass-more-info", { detail: { entityId: id }, bubbles: true, composed: true })
        );
    }
    _hasVictron() {
      return Object.values(this._cfg.victron || {}).some(Boolean);
    }
    /* ------------------------------------------------------------ DOM: one calm screen with all the general data */
    _build() {
      if (this._pvw) {
        this._pvwShow();
        return;
      }
      this._shown = false;
      const c = this._cfg, root = this.shadowRoot || this.attachShadow({ mode: "open" }), vic = this._hasVictron();
      this._closeDisp();
      this._closePack(true);
      this.classList.toggle("noglare", c.glare === false);
      this.classList.toggle("lite", this._isLite());
      this._dsig = null;
      clearTimeout(this._tm);
      this._selB = c.batteries.map(() => -1);
      this._sel = 0;
      const card = (b) => `<div class="bc">
    <div class="pkw">
      <div class="pk2" data-k="bccells">
      </div><button class="zoom" title="${tt("zoom")}">
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
          <circle cx="10.5" cy="10.5" r="6.5"/>
          <path d="M15.5 15.5 21 21"/>
        </svg>
      </button>
    </div>
    <div class="facts" data-k="facts">
    </div>
    <div class="ctrl" data-k="ctrl"></div><div class="err" data-k="err"></div><div class="bc-foot" data-k="bcfoot">\u2013</div></div>`;
      root.innerHTML = `<style>${CSS}</style><ha-card>
    <div class="hdr"><div class="logo"><b>${c.title || tt("title_default")}</b></div></div>
    <div class="main">
      <div data-k="alerts"></div>
      <div class="bcards">${(this._groupInfo() ? [c.batteries[this._groupInfo().mi]] : c.batteries).map(card).join("")}</div>
      ${vic ? '<div class="vsec"><div class="vhead" data-k="vtxt">\u2013</div><div class="vrows" data-k="vrows"></div></div>' : ""}
    </div></ha-card>`;
      root.querySelectorAll(".zoom").forEach((b, i) => {
        b.onclick = () => this._openPack(i, b.parentNode);
      });
      if (!root._mc) {
        root._mc = 1;
        root.addEventListener("change", (e) => {
          const sl = e.target.closest(".pksel");
          if (sl) {
            this._sel = +sl.value;
            this._vOff = false;
            if (this._data) this._updSimple(this._data);
          }
        });
        root.addEventListener("click", (e) => {
          const m = e.target.closest("[data-m]");
          if (m) this._more(m.dataset.m);
        });
      }
      this._buildVictron();
      this._built = true;
      if (this._hass) this._update();
    }
    /* ------------------------------------------------------------ victron details (plain rows) */
    _buildVictron() {
      const v = this._cfg.victron || {}, host = this.shadowRoot.querySelector("[data-k=vrows]");
      if (!host) return;
      const grp = { bat: tt("g_bat"), inv: tt("g_inv"), hist: tt("g_hist") };
      host.innerHTML = ["bat", "inv", "hist"].map((g) => {
        const rows = VIC_TILES.filter((t) => t.g === g && v[t.k]);
        return rows.length ? `<div class="vbox">
            <h4>${grp[g]}</h4>${rows.map(
          (t) => `<div class="vrow" data-t="${t.k}"><span>${tt("vt_" + t.k)}</span><b>\u2013</b>
            </div>`
        ).join("")}</div>` : "";
      }).join("");
      host.querySelectorAll(".vrow").forEach((r) => r.onclick = () => this._more(v[r.dataset.t]));
    }
    _updVictron() {
      const host = this.shadowRoot.querySelector("[data-k=vrows]");
      if (!host) return;
      const v = this._cfg.victron || {};
      VIC_TILES.filter((t) => v[t.k]).forEach((t) => {
        const s = this._hass.states[v[t.k]], row = host.querySelector(`.vrow[data-t="${t.k}"]`);
        if (!row) return;
        const raw = s ? s.state : null, bad = raw === null || ["unknown", "unavailable", "none", ""].includes(String(raw).toLowerCase()), b = row.querySelector("b");
        b.textContent = bad ? "N/A" : t.f(raw);
        b.style.color = bad || !t.c ? "" : t.c(raw);
        row.style.opacity = bad ? 0.5 : 1;
      });
    }
    // ---- master / slave group (set by hand: role: master | slave on the batteries): ONE card, the BMS screen decides which pack is shown
    _groupInfo() {
      const bs = this._cfg.batteries || [], mi = bs.findIndex((b) => b.role === "master");
      if (mi < 0 || bs.length < 2) return null;
      return { mi, order: grpOrder(bs, mi) };
    }
    _aggr(bats, grp) {
      const ok = (x) => !isNaN(x), cap = (x) => ok(x.capTot) && x.capTot > 0 ? x.capTot : x.soc > 0 && ok(x.rem) ? x.rem / x.soc * 100 : NaN, sum = (a) => a.filter(ok).reduce((p, x) => p + x, 0);
      const capS = sum(bats.map(cap)), remS = sum(bats.map((x) => x.rem)), vs = bats.map((x) => x.V).filter(ok), socs = bats.map((x) => x.soc).filter(ok), I = sum(bats.map((x) => x.I)), m = bats[0];
      return {
        ...m,
        name: tt("group_name", { n: bats.length }),
        V: vs.length ? vs.reduce((p, x) => p + x, 0) / vs.length : NaN,
        I,
        P: sum(bats.map((x) => x.P)),
        rem: remS,
        capTot: capS > 0 ? capS : NaN,
        soc: capS > 0 ? remS / capS * 100 : socs.length ? socs.reduce((p, x) => p + x, 0) / socs.length : NaN,
        mx: Math.max(...bats.map((x) => x.mx).filter(ok)),
        mn: Math.min(...bats.map((x) => x.mn).filter(ok)),
        mos: Math.max(...bats.map((x) => x.mos).filter(ok)),
        err: bats.map((x) => x.err).filter(Boolean).join(" \xB7 "),
        state: bats.every((x) => x.state === "offline") ? "offline" : I > 0.3 ? "charging" : I < -0.3 ? "discharging" : "idle"
      };
    }
    /* ------------------------------------------------------------ data */
    _nOf(b) {
      const n = +b.cells || +this._cfg.cells || 16;
      return n <= 8 ? 8 : 16;
    }
    _tOf(b) {
      const t = b.temps ?? this._cfg.temps;
      return t === void 0 || t === null || isNaN(+t) ? 4 : Math.max(0, Math.min(4, +t));
    }
    _night() {
      const s = this._hass && this._hass.states["sun.sun"];
      return !!s && s.state === "below_horizon";
    }
    _compute() {
      const h = this._hass, c = this._cfg, V = c.victron || {};
      const val = (id) => {
        const s = id && h.states[id], v = num(s);
        return isNaN(v) ? null : v;
      };
      const bats = c.batteries.map((b) => {
        const n = this._nOf(b), S = (k, d) => h.states[this._id(b, k, d)], g = (k) => num(S(k)), nm = (k) => num(S(k, "number"));
        const cells = Array.from({ length: n }, (_, i) => g(`cell_voltage_${i + 1}`)), res = Array.from({ length: n }, (_, i) => g(`cell_resistance_${i + 1}`));
        const rsS = S("cell_resistance_1"), online = S("online_status", "binary_sensor"), V0 = g("total_voltage"), I = g("current"), P = (() => {
          const p = g("power");
          return isNaN(p) ? V0 * I : p;
        })();
        const valid = cells.filter((x) => !isNaN(x)), mx = isNaN(g("max_cell_voltage")) ? Math.max(...valid) : g("max_cell_voltage"), mn = isNaN(g("min_cell_voltage")) ? Math.min(...valid) : g("min_cell_voltage");
        const balS = S("balancer_bitmask") || S("balancing"), er = S("errors"), t = (k) => {
          const s = S(k);
          return s && s.state && !["", "unknown", "unavailable", "none", "None"].includes(s.state) ? s.state : "";
        };
        const off = online ? online.state !== "on" : isNaN(V0), sw = (k) => {
          const e = S(k, "switch");
          return !!e && e.state === "on";
        };
        return {
          name: b.name || b.entity_base,
          V: V0,
          I,
          P,
          soc: g("state_of_charge"),
          soh: g("state_of_health"),
          rem: g("capacity_remaining"),
          cyc: g("charging_cycles"),
          dV: isNaN(g("delta_cell_voltage")) ? mx - mn : g("delta_cell_voltage"),
          mx,
          mn,
          mxI: g("max_voltage_cell"),
          mnI: g("min_voltage_cell"),
          av: g("average_cell_voltage"),
          cells,
          res,
          resUnit: rsS && rsS.attributes && rsS.attributes.unit_of_measurement,
          balMask: balS && !isNaN(parseInt(balS.state)) ? parseInt(balS.state) : 0,
          temps: Array.from({ length: this._tOf(b) }, (_, i) => g(`temperature_sensor_${i + 1}`)),
          mos: g("power_tube_temperature"),
          state: off ? "offline" : I > 0.3 ? "charging" : I < -0.3 ? "discharging" : "idle",
          balStart: nm("balance_starting_voltage"),
          capTot: nm("total_battery_capacity"),
          balTrig: nm("balance_trigger_voltage"),
          hw: t("hardware_version"),
          swv: t("software_version"),
          rt: t("total_runtime_formatted"),
          err: t("errors"),
          cs: t("charge_status"),
          op: t("operation_status"),
          dsp: (() => {
            const e = S("display_always_on", "switch");
            return e ? e.state : "";
          })(),
          sw: { charging: sw("charging"), discharging: sw("discharging"), balancer: sw("balancer") }
        };
      });
      let batt = val(V.power);
      if (batt === null) batt = bats.reduce((a, b) => a + (isNaN(b.P) ? 0 : b.P), 0);
      const vv = val(V.voltage), volts = vv !== null ? vv : (() => {
        const x = bats.map((q) => q.V).filter((q) => !isNaN(q));
        return x.length ? x.reduce((s, q) => s + q, 0) / x.length : NaN;
      })();
      const flow = { batt, volt: volts };
      const inv = (() => {
        const s = V.inverter_state && h.states[V.inverter_state];
        return s ? title(s.state) : "";
      })();
      return { bats, flow, inv };
    }
    _updSimple(d) {
      const r = this.shadowRoot, $ = (k) => r.querySelector(`.main [data-k="${k}"]`), V = this._cfg.victron || {};
      const alerts = [];
      const grp = this._grp = this._groupInfo();
      if (grp) this._sel = Math.min(this._sel || 0, grp.order.length - 1);
      const view = grp ? [{ b: d.bats[grp.order[this._sel || 0]], ci: grp.order[this._sel || 0] }] : d.bats.map((b, ci) => ({ b, ci }));
      d.bats.forEach((b) => {
        const tv0 = b.temps.filter((x) => !isNaN(x)), dm0 = (b.mx - b.mn) * 1e3;
        if (b.state === "offline") alerts.push(tt("a_offline", { name: b.name }));
        if (b.err) alerts.push(`${b.name}: ${b.err}`);
        if (dm0 >= 60) alerts.push(tt("a_imb", { name: b.name, mv: dm0.toFixed(0) }));
        if (tv0.length && Math.max(...tv0) >= 45)
          alerts.push(tt("a_temp", { name: b.name, t: Math.max(...tv0).toFixed(0) }));
      });
      view.forEach(({ b, ci }, i) => {
        const G0 = grp ? this._aggr(
          grp.order.map((x) => d.bats[x]),
          grp
        ) : b, dmG = (G0.mx - G0.mn) * 1e3;
        const card = r.querySelectorAll(".bc")[i], q = (k) => card.querySelector(`[data-k="${k}"]`) || (this._pp && this._pp.strip ? this._pp.strip.querySelector(`[data-k="${k}"]`) : null), dmv = (b.mx - b.mn) * 1e3, tv = b.temps.filter((x) => !isNaN(x));
        const bcfg = this._cfg.batteries[ci], n = this._nOf(bcfg), lay = bcfg.layout || (ci === 1 ? "bottom-left" : "top-left"), M = (el, key, dom) => {
          if (el && !el.dataset.m) el.dataset.m = this._id(bcfg, key, dom);
        };
        {
          const s0 = q("bccells") || (this._pp && this._pp.i === i ? this._pp.strip : null), sg0 = n + "/" + (grp ? grp.order.length : 1) + "/" + lay;
          if (s0 && s0._n !== sg0) {
            s0._n = sg0;
            s0.innerHTML = packSvg(n, i, grp ? grp.order.length : 1, lay) + packOverlay(!!grp, bcfg.name || bcfg.entity_base);
            this._elInit(s0);
            s0.addEventListener("click", (e) => {
              if (e.target.closest(".dsp")) {
                if (e.target.closest(".pwr")) this._toggleDisp(i);
                else this._openDisp(i, s0);
                return;
              }
            });
          }
        }
        M(q("bcsoc").parentNode, "state_of_charge");
        M(q("bcv").parentNode, "total_voltage");
        M(q("bca").parentNode, "current");
        M(q("bcd").parentNode, "delta_cell_voltage");
        M(q("bcw"), "power");
        setH(q("bcsoc"), fmt(b.soc, 0) + "<small>%</small>");
        q("bcsoc").style.color = socColor(b.soc);
        {
          const sl = q("pksel");
          if (grp && sl) {
            const html2 = grp.order.map((x, k) => `<option value="${k}">${k === 0 ? "Master" : "Slave " + k} \xB7 ${d.bats[x].name}</option>`).join("");
            if (sl._h !== html2) {
              sl._h = html2;
              sl.innerHTML = html2;
            }
            sl.value = String(this._sel || 0);
          } else {
            const nm = q("bcname");
            if (nm) this._set2(nm, b.name);
          }
        }
        const balOn = !!b.balMask && b.state !== "offline", chip = q("bcchip");
        chip.className = "chip " + (balOn ? "balancing" : b.state);
        chip.textContent = balOn ? tt("st_balancing") : {
          charging: tt("st_charging"),
          discharging: tt("st_discharging"),
          idle: tt("st_idle"),
          offline: tt("st_offline")
        }[b.state];
        setH(q("bcv"), fmt(b.V, 2) + "<small>V</small>");
        setH(q("bca"), fmt(b.I, 1) + "<small>A</small>");
        q("bca").style.color = b.I > 0.3 ? "var(--grn)" : b.I < -0.3 ? "var(--org)" : "";
        q("bcw").textContent = fmtW(b.P) + (b.I > 0.3 ? " \xB7 " + tt("st_charging") : b.I < -0.3 ? " \xB7 " + tt("st_discharging") : " \xB7 " + tt("st_idle"));
        setH(q("bcd"), fmt(dmv, 0) + "<small>mV</small>");
        q("bcd").style.color = dmv < 15 ? "var(--grn)" : dmv < 45 ? "var(--gold)" : "var(--red)";
        const strip = q("bccells") || (this._pp && this._pp.i === i ? this._pp.strip : null), st = b.state === "offline" ? "idle" : b.state;
        const sig = n + "/" + (grp ? grp.order.length : 1) + "/" + lay;
        if (strip._n !== sig) {
          strip._n = sig;
          strip.innerHTML = packSvg(n, i, grp ? grp.order.length : 1, lay) + packOverlay(!!grp, bcfg.name || bcfg.entity_base);
          this._elInit(strip);
          strip.addEventListener("click", (e) => {
            if (e.target.closest(".dsp")) {
              if (e.target.closest(".pwr")) this._toggleDisp(i);
              else this._openDisp(i, strip);
              return;
            }
          });
        }
        const span = Math.max(4e-3, b.mx - b.mn), flat = dmv < 8, okV = b.cells.filter((x) => !isNaN(x)), vmax = Math.max(...okV), vmin = Math.min(...okV), fr = clamp((b.soc || 0) / 100, 0.04, 1);
        const sIdx = (x) => !isNaN(x) && x >= 1 && x <= b.cells.length ? x - 1 : -1, imx = sIdx(b.mxI) >= 0 ? sIdx(b.mxI) : vmax > vmin ? b.cells.indexOf(vmax) : -1, imn = sIdx(b.mnI) >= 0 ? sIdx(b.mnI) : vmax > vmin ? b.cells.indexOf(vmin) : -1;
        strip._elSpeed = clamp(18 + Math.abs(b.I || 0) * 0.9, 18, 70);
        strip._elShow = clamp(0.35 + Math.abs(b.I || 0) / 45, 0.35, 1) * (this.classList.contains("lite") ? 0.5 : 1);
        strip.dataset.st = st;
        strip.style.setProperty("--spd", clamp(3.4 - Math.abs(b.P || 0) / 1100, 0.9, 3.4).toFixed(2) + "s");
        const mk = [];
        for (let k = 0; k < n; k++) if (b.balMask & 1 << k) mk.push(k);
        const avg0 = okV.reduce((a, x) => a + x, 0) / (okV.length || 1);
        let don = -1, rec = -1;
        if (mk.length) {
          don = imx >= 0 ? imx : b.cells.indexOf(vmax);
          rec = imn >= 0 ? imn : b.cells.indexOf(vmin);
        }
        if (don === rec) don = rec = -1;
        const pair = don >= 0 ? [don, rec] : [];
        const G = (sel2) => {
          const arr = [];
          strip.querySelectorAll(sel2).forEach((e) => arr[+e.dataset.k] = e);
          return arr;
        }, liqs = G(".liq"), tvs = G(".tv"), trs = G(".tr"), cls = G(".cell"), mkws = G(".mkw");
        for (let k = 0; k < n; k++) {
          const v = b.cells[k], t = clamp((v - b.mn) / span, 0, 1), col = isNaN(v) ? "#7fb58e" : k === imx ? "var(--mxc)" : k === imn ? "var(--mnc)" : "#7fb58e";
          liqs[k].style.setProperty("--c", col);
          liqs[k].style.transform = `translateY(${((1 - fr) * PK.wh).toFixed(1)}px)`;
          tvs[k].textContent = isNaN(v) ? "\u2013" : v.toFixed(3);
          trs[k].textContent = fmtRb(b, b.res[k]);
          const isMx = k === imx, isMn = k === imn;
          tvs[k].classList.toggle("mx", isMx);
          tvs[k].classList.toggle("mn", isMn);
          cls[k].classList.toggle("mx", isMx);
          cls[k].classList.toggle("mn", isMn);
          mkws[k].classList.toggle("mx", isMx);
          mkws[k].classList.toggle("mn", isMn);
          mkws[k].style.transform = `translate(${mkws[k].dataset.cx}px,${(+mkws[k].dataset.y0 + 24 + (1 - fr) * PK.wh).toFixed(1)}px)`;
          cls[k].classList.toggle("bal", pair.includes(k));
          cls[k].classList.toggle("donor", k === don);
          cls[k].classList.toggle("recv", k === rec);
          cls[k].querySelector("title").textContent = `#${k + 1} \xB7 ${fmt(v, 3)} V \xB7 ${fmtRb(b, b.res[k])}`;
        }
        strip._id = i;
        strip._zp = don >= 0 ? { a: [+cls[don].dataset.lx, +cls[don].dataset.ly], b: [+cls[rec].dataset.lx, +cls[rec].dataset.ly] } : null;
        const dsp = strip.querySelector(".dsp"), D = (k) => dsp.querySelector(`[data-d="${k}"]`), swOff = this._dpv(ci, b.dsp) === "off", dOn = grp ? !this._vOff : !swOff;
        dsp.classList.toggle("off", !dOn);
        dsp.classList.toggle("pwroff", swOff);
        dsp.classList.toggle("act", G0.I > 0.04);
        if (dOn) {
          const T = (k, s, col) => {
            const e = D(k);
            if (e.textContent !== s) e.textContent = s;
            if (col) e.setAttribute("fill", col);
          }, soc = clamp(G0.soc || 0, 0, 100), L = soc * 2.4504, mn_ = Math.min, mx_ = Math.max, red = soc <= 10, st2 = dsp.style, f1 = (x) => x.toFixed(1), tot = !isNaN(G0.capTot) && G0.capTot > 0 ? G0.capTot : soc > 0 && !isNaN(G0.rem) ? G0.rem / soc * 100 : NaN, pct = tot > 0 && !isNaN(G0.rem) ? clamp(G0.rem / tot * 100, 0, 100) : soc, rn = Math.ceil(pct / 5), Lc = mn_(245, rn * 12.25);
          T("v", fmt(G0.V, 2) + "V");
          T("a", fmt(G0.I, 1) + "A");
          T("soc", fmt(G0.soc, 0) + "%");
          T("np", String(grp ? grp.order.length : 1));
          T("pn", String(grp ? this._sel || 0 : 0));
          const full = 1.75 * Math.exp(-mx_(0, G0.I - 30) / 60), rst = String(Math.round(mx_(30, full * 1e3 / 20)));
          {
            const n1 = Math.max(0, rn);
            if (st2.getPropertyValue("--rn") !== String(n1)) st2.setProperty("--rn", n1);
            if (st2.getPropertyValue("--rst") !== rst) st2.setProperty("--rst", rst);
          }
          T(
            "cap",
            !isNaN(G0.capTot) ? G0.capTot.toFixed(1) : G0.soc > 0 && !isNaN(G0.rem) ? (G0.rem / G0.soc * 100).toFixed(1) : "\u2013"
          );
          T("rem", fmt(G0.rem, 1));
          T("mx", fmt(G0.mx, 3) + "V");
          T("mn", fmt(G0.mn, 3) + "V");
          T("tp", isNaN(G0.mos) ? "\u2013" : Math.round(G0.mos) + " \xB0C");
          T("pw", fmt(Math.abs(G0.P) / 1e3, 1));
          T("alm", G0.err ? tt("scr_alarmv") : tt("scr_normal"), G0.err ? "#ff4d4d" : GRN);
          T("chg", b.sw.charging ? tt("scr_on") : tt("scr_off"), b.sw.charging ? GRN : "#e0705f");
          T("dch", b.sw.discharging ? tt("scr_on") : tt("scr_off"), b.sw.discharging ? GRN : "#e0705f");
          T(
            "cap2",
            (!isNaN(b.capTot) ? b.capTot.toFixed(1) : b.soc > 0 && !isNaN(b.rem) ? (b.rem / b.soc * 100).toFixed(1) : "\u2013") + "AH"
          );
          T("rem2", fmt(b.rem, 1) + "AH");
          T("pct2", fmt(b.soc, 0) + "%");
          T("vd", fmt(b.mx - b.mn, 3) + "V");
          T("a2", fmt(b.I, 1) + "A");
          T("tp2", isNaN(b.mos) ? "\u2013" : String(Math.round(b.mos)));
          T("alm2", b.err ? tt("scr_alarmv") : tt("scr_normal"), b.err ? "#ff4d4d" : GRN);
          T("chg2", b.sw.charging ? tt("scr_on") : tt("scr_off"), b.sw.charging ? GRN : "#e0705f");
          T("dch2", b.sw.discharging ? tt("scr_on") : tt("scr_off"), b.sw.discharging ? GRN : "#e0705f");
          {
            const totB = !isNaN(b.capTot) && b.capTot > 0 ? b.capTot : b.soc > 0 && !isNaN(b.rem) ? b.rem / b.soc * 100 : NaN, pctB = totB > 0 && !isNaN(b.rem) ? clamp(b.rem / totB * 100, 0, 100) : clamp(b.soc || 0, 0, 100), bn = Math.ceil(pctB / 20);
            if (dsp._bk !== bn) {
              dsp._bk = bn;
              const bcol = bn <= 2 ? "#e0302f" : bn <= 4 ? "#2f8cff" : "#2fd24a";
              dsp.querySelectorAll(".bb").forEach((e, k) => e.setAttribute("fill", k < bn ? bcol : "#1a0d0d"));
              dsp.querySelectorAll(".bo").forEach((e) => e.setAttribute(e.classList.contains("bcap") ? "fill" : "stroke", bcol));
            }
          }
          b.cells.forEach(
            (v, k) => T("cv" + k, isNaN(v) ? "\u2013" : fmt(v, 3) + "V", k === imx ? "#6f8cff" : k === imn ? "#ff4d4d" : GRN)
          );
        }
        if (this._pop && this._pop.i === i) this._syncPop(dsp);
        const avgV = okV.reduce((a, x) => a + x, 0) / (okV.length || 1), rv = b.res.filter((x) => !isNaN(x)), ravg = rv.length ? rv.reduce((a, x) => a + x, 0) / rv.length : NaN;
        const tr = tv.length ? Math.round(Math.min(...tv)) === Math.round(Math.max(...tv)) ? Math.round(Math.min(...tv)) + " \xB0C" : Math.round(Math.min(...tv)) + "\u2013" + Math.round(Math.max(...tv)) + " \xB0C" : "\u2013";
        const E = (t, key, dom) => `<u data-m="${this._id(bcfg, key, dom)}">${t}</u>`;
        const row = (l, v, key, dom) => `<div${key ? ` data-m="${this._id(bcfg, key, dom)}"` : ""}><span>${l}</span><b>${v}</b></div>`;
        setH(
          q("facts"),
          row(tt("remaining"), `${fmt(b.rem, 0)} Ah \xB7 ${fmt(b.rem * b.V / 1e3, 2)} kWh`, "capacity_remaining") + row(
            "Min",
            `<i>${E("#" + ((imn >= 0 ? imn : b.cells.indexOf(vmin)) + 1), "min_voltage_cell")}</i> \xB7 ${fmt(vmin, 3)} V`,
            "min_cell_voltage"
          ) + row(
            "Max",
            `<i>${E("#" + ((imx >= 0 ? imx : b.cells.indexOf(vmax)) + 1), "max_voltage_cell")}</i> \xB7 ${fmt(vmax, 3)} V`,
            "max_cell_voltage"
          ) + `<div class="tmp"><span>${tt("temperature")}</span><b>${[
            ...b.temps.map(
              (t, i2) => E(`<small>T${i2 + 1}</small>${isNaN(t) ? "\u2013" : fmt(t, 1) + " \xB0C"}`, `temperature_sensor_${i2 + 1}`)
            ),
            E(`<small>MOS</small>${fmt(b.mos, 0)} \xB0C`, "power_tube_temperature")
          ].join("")}</b></div>` + row(
            tt("cycles_soh"),
            `${E(fmt(b.cyc, 0), "charging_cycles")} \xB7 ${E(fmt(b.soh, 0) + "%", "state_of_health")}`,
            "charging_cycles"
          ) + row(
            tt("balancing"),
            don >= 0 ? `\u26A1 #${don + 1} \u2192 #${rec + 1}` : !b.sw.balancer ? tt("bal_off") : !isNaN(b.balStart) && vmax < b.balStart ? `${tt("bal_wait")} <i>(max ${fmt(vmax, 3)} &lt; ${fmt(b.balStart, 2)} V)</i>` : tt("bal_wait"),
            "balancer",
            "switch"
          ) + row(
            tt("starts_at"),
            isNaN(b.balStart) ? "\u2013" : `${E(fmt(b.balStart, 2) + " V", "balance_starting_voltage", "number")}${isNaN(b.balTrig) ? "" : " \xB7 " + E("\u0394 \u2265 " + fmt(b.balTrig * 1e3, 0) + " mV", "balance_trigger_voltage", "number")}`,
            "balance_starting_voltage",
            "number"
          ) + row(
            `${tt("bms_hw")} \xB7 ${tt("bms_sw")} \xB7 ${tt("bms_time")}`,
            `${E(b.hw || "\u2013", "hardware_version")} \xB7 ${E(b.swv || "\u2013", "software_version")} \xB7 ${E(b.rt || "\u2013", "total_runtime_formatted")}`
          )
        );
        const ct = q("ctrl");
        if (!ct.children.length || ct._ci !== ci) {
          ct._ci = ci;
          this._ctrlButtons(ct, ci);
        }
        ct.querySelectorAll(".sw").forEach((e) => {
          const st2 = this._hass.states[this._id(this._cfg.batteries[ci], e.dataset.sw, "switch")];
          e.classList.toggle("on", !!st2 && st2.state === "on");
        });
        const er = q("err");
        er.classList.toggle("show", !!b.err);
        er.textContent = b.err ? "\u26A0 " + b.err : "";
        q("bcfoot").textContent = `${dmv < 15 ? tt("cells_ok") : dmv < 45 ? tt("cells_small") : tt("cells_bad")} ${tr !== "\u2013" ? " \xB7 " + tr : ""}`;
        q("bcfoot").style.color = dmv < 45 ? "" : "var(--red)";
      });
      this._zapKick();
      this._elKick();
      this._ringTick();
      const S = (k) => V[k] && this._hass.states[V[k]], vt = r.querySelector('.main [data-k="vtxt"]');
      if (vt) {
        const al = S("alarm_low_battery"), warn = !!al && al.state === "Warning", st = S("inverter_state"), vi = num(S("current"));
        vt.parentNode.classList.toggle("warn", warn);
        setH(
          vt,
          `SmartShunt <b>${fmt(num(S("voltage")), 2)} V</b> \xB7 <b>${fmt(vi, 1)} A</b>${st ? ` \xB7 MultiPlus <b>${title(st.state)}</b>` : ""}${warn ? " \xB7 " + tt("lowbat_warn") : ""}`
        );
        if (warn) alerts.push("MultiPlus-II: " + tt("lowbat_warn"));
      }
      setH($("alerts"), alerts.map((a) => `<div class="alert">\u26A0 ${a}</div>`).join(""));
    }
    /* ------------------------------------------------------------ electrons along the conductors */
    // every conductor already carries a hidden path (class "fl") drawn in the direction of the series string, B- -> B+. Electrons run along it with a
    // little random wobble: B- -> B+ while charging, B+ -> B- while discharging (opposite to the conventional current).
    _elInit(strip) {
      const NS2 = "http://www.w3.org/2000/svg", svg = strip.querySelector("svg"), layer = document.createElementNS(NS2, "g"), und = svg.querySelector(".und"), layerUnder = document.createElementNS(NS2, "g");
      strip._el = [];
      layer.setAttribute("class", "el");
      svg.insertBefore(layer, svg.querySelector(".zap"));
      layerUnder.setAttribute("class", "el");
      if (und) und.after(layerUnder);
      svg.querySelectorAll(".fl").forEach((path) => {
        const len = path.getTotalLength();
        if (!len) return;
        const cnt = clamp(Math.round(len / 14), 2, 6), stepL = 3, np = Math.ceil(len / stepL) + 2, pts = new Float32Array(np * 2);
        for (let k = 0; k < np; k++) {
          const pt = path.getPointAtLength(Math.min(len, k * stepL));
          pts[k * 2] = pt.x;
          pts[k * 2 + 1] = pt.y;
        }
        for (let q = 0; q < cnt; q++) {
          const c = document.createElementNS(NS2, "circle");
          c.setAttribute("r", "1.8");
          c.setAttribute("opacity", "0");
          (path.closest(".und") ? layerUnder : layer).appendChild(c);
          strip._el.push({
            pts,
            np,
            stepL,
            len,
            s: Math.random() * len,
            v: 0.75 + Math.random() * 0.5,
            jx: 0,
            thr: (q + 0.5) / cnt,
            c
          });
        }
      });
    }
    _elKick() {
      if (!this._elT) this._elT = requestAnimationFrame((t) => this._elTick(t));
    }
    _elTick(t) {
      this._elT = null;
      if (ST.editing > 0 || this._vis === false) return;
      if (t - (this._elLast || 0) < (this.classList.contains("lite") ? 85 : 45)) {
        this._elT = requestAnimationFrame((tt2) => this._elTick(tt2));
        return;
      }
      const dt = Math.min(0.05, (t - (this._elLast || t)) / 1e3);
      this._elLast = t;
      let any = false;
      this.shadowRoot.querySelectorAll(".pk2").forEach((strip) => {
        const els = strip._el;
        if (!els) return;
        const st = strip.dataset.st, act = st === "charging" || st === "discharging";
        if (!act) {
          if (strip._elOn) {
            els.forEach((e) => e.c.setAttribute("opacity", "0"));
            strip._elOn = false;
          }
          return;
        }
        any = true;
        strip._elOn = true;
        const dir = st === "charging" ? 1 : -1, speed = strip._elSpeed || 30, show = strip._elShow ?? 1;
        els.forEach((e) => {
          if (e.thr > show) {
            e.c.setAttribute("opacity", "0");
            return;
          }
          e.v = clamp(e.v + (Math.random() - 0.5) * 0.06, 0.6, 1.5);
          e.s = (e.s + dir * speed * e.v * dt + e.len) % e.len;
          e.jx = e.jx * 0.9 + (Math.random() - 0.5) * 0.5;
          const fi = Math.min(e.np - 1.001, e.s / e.stepL), i0 = Math.floor(fi), fr = fi - i0, ax = e.pts[i0 * 2], ay = e.pts[i0 * 2 + 1], bx = e.pts[i0 * 2 + 2], by = e.pts[i0 * 2 + 3], p = { x: ax + (bx - ax) * fr, y: ay + (by - ay) * fr }, tx = bx - ax, ty = by - ay, tl = Math.hypot(tx, ty) || 1;
          e.c.setAttribute("cx", (p.x - ty / tl * e.jx * 1.4).toFixed(2));
          e.c.setAttribute("cy", (p.y + tx / tl * e.jx * 1.4).toFixed(2));
          e.c.setAttribute("opacity", "0.95");
        });
      });
      if (any) this._elT = requestAnimationFrame((tt2) => this._elTick(tt2));
    }
    /* ------------------------------------------------------------ lightning between the two balancing cells */
    _zapKick() {
      const on = [...this.shadowRoot.querySelectorAll(".pk2")].some((e) => e._zp);
      if (on && !this._zapT) this._zapT = setTimeout(() => this._zapTick(), 20);
      if (!on) {
        clearTimeout(this._zapT);
        this._zapT = null;
        this.shadowRoot.querySelectorAll(".pk2 .zap").forEach((z) => z.innerHTML = "");
      }
    }
    // rhythm of a real discharge: 2-4 quick strikes that weaken, then a pause; the bolt takes a new shape on every strike
    _zapTick() {
      this._zapT = null;
      if (ST.editing > 0 || this._vis === false) return;
      const now = performance.now();
      let active = false, still = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
      this.shadowRoot.querySelectorAll(".pk2").forEach((strip) => {
        const pr = strip._zp, zap = strip.querySelector(".zap");
        if (!zap) return;
        if (!pr) {
          if (zap.innerHTML) zap.innerHTML = "";
          return;
        }
        active = true;
        const z = strip._zs = strip._zs || { next: 0, left: 0, step: 0, fade: 0 };
        if (now >= z.next) {
          if (z.left <= 0) {
            z.left = 2 + Math.floor(Math.random() * 3);
            z.step = 0;
          }
          z.left--;
          const k = [1, 0.7, 0.95, 0.5, 0.32][Math.min(z.step++, 4)] * (0.85 + Math.random() * 0.3);
          zap.style.opacity = 1;
          zap.innerHTML = this._bolt(pr.a, pr.b, k, strip._id);
          z.next = now + (still ? 1500 : z.left > 0 ? 45 + Math.random() * 50 : 420 + Math.random() * 1e3);
          z.fade = z.left === 0 ? now + 160 : 0;
        } else if (z.fade && now >= z.fade) {
          zap.style.opacity = 0;
          z.fade = 0;
        }
      });
      if (active) this._zapT = setTimeout(() => this._zapTick(), 25);
    }
    // fractal bolt (midpoint displacement) with forks, a soft halo, a white-hot core and a spark burst where it lands
    _bolt(a, b, k, id) {
      const rnd = (x) => (Math.random() * 2 - 1) * x, L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      const jag = (p, q, d, depth, out) => {
        if (!depth) {
          out.push(q);
          return;
        }
        const m = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2], nx = -(q[1] - p[1]), ny = q[0] - p[0], nl = Math.hypot(nx, ny) || 1, o = rnd(d), mm = [m[0] + nx / nl * o, m[1] + ny / nl * o];
        jag(p, mm, d / 2, depth - 1, out);
        jag(mm, q, d / 2, depth - 1, out);
      };
      const path = (pts) => "M" + pts.map((q) => q[0].toFixed(1) + " " + q[1].toFixed(1)).join(" L");
      const main = [a];
      jag(a, b, Math.min(34, L * 0.2), 5, main);
      let forks = "";
      for (let i = 3; i < main.length - 4; i += 2 + Math.floor(Math.random() * 5))
        if (Math.random() < 0.6) {
          const p = main[i], q = main[Math.min(main.length - 1, i + 2)], ang = Math.atan2(q[1] - p[1], q[0] - p[0]) + (Math.random() < 0.5 ? -1 : 1) * (0.4 + Math.random() * 0.6), len = Math.min(70, L * (0.14 + Math.random() * 0.22)), e = [p[0] + Math.cos(ang) * len, p[1] + Math.sin(ang) * len], pts = [p];
          jag(p, e, len * 0.32, 3, pts);
          forks += path(pts) + " ";
        }
      let sparks = "";
      for (let i = 0; i < 7; i++) {
        const t = Math.random() * 6.283, r1 = 3 + Math.random() * 3, r2 = r1 + 5 + Math.random() * 9;
        sparks += `M${(b[0] + Math.cos(t) * r1).toFixed(1)} ${(b[1] + Math.sin(t) * r1).toFixed(1)} L${(b[0] + Math.cos(t) * r2).toFixed(1)} ${(b[1] + Math.sin(t) * r2).toFixed(1)} `;
      }
      const st = (w, col, o, f) => `fill="none" stroke="${col}" stroke-width="${w}" stroke-opacity="${(o * k).toFixed(2)}" stroke-linecap="round" stroke-linejoin="round"${f ? ` filter="url(#zg${id})"` : ""}`;
      return `<path d="${path(main)}" ${st(8, "#a99bc4", 0.5, 1)}/>${forks ? `<path d="${forks}" ${st(4, "#a99bc4", 0.35, 1)}/>` : ""}<circle cx="${b[0]}" cy="${b[1]}" r="9" fill="#c9b8ee" fill-opacity="${(0.55 * k).toFixed(2)}" filter="url(#zg${id})"/>
      <circle cx="${a[0]}" cy="${a[1]}" r="6" fill="#c9b8ee" fill-opacity="${(0.4 * k).toFixed(2)}" filter="url(#zg${id})"/><path d="${path(main)}" ${st(2.6, "#e4d9fb", 0.9)}/>${forks ? `<path d="${forks}" ${st(1.1, "#e4d9fb", 0.7)}/>` : ""}<path d="${path(main)}" ${st(1, "#ffffff", 1)}/>
      <path d="${sparks}" ${st(0.9, "#ffffff", 0.9)}/>`;
    }
    // charging animation of the BMS-screen ring: 20 sectors of 18 deg, from 12 o'clock; ceil(remaining/total) of them are drawn one after another, then it starts over.
    // Up to 2 sectors the arc is red; from the 3rd one it is green and the last sector fades from green to blue. A timer (not a frame loop) steps it, and only while charging.
    _ringTick() {
      clearTimeout(this._rgT);
      this._rgT = null;
      if (!this.shadowRoot || ST.editing > 0 || this._vis === false) return;
      const now = performance.now();
      let next = Infinity;
      this.shadowRoot.querySelectorAll(".dsp:not(.off)").forEach((d) => {
        const n = +d.style.getPropertyValue("--rn") || 0, st = +d.style.getPropertyValue("--rst") || 75, act = d.classList.contains("act");
        if (act && n) {
          if (!d._nx || now >= d._nx) {
            d._c = d._c >= n ? 1 : (d._c || 0) + 1;
            d._nx = now + st;
          }
          next = Math.min(next, d._nx);
        } else d._c = 0;
        const c = !n ? 0 : act ? Math.min(d._c, n) : n, key = c + "/" + n;
        if (d._rk === key) return;
        d._rk = key;
        const arc = d.querySelector(".rng");
        if (arc) {
          arc.setAttribute("stroke-dasharray", `${Math.min(245, c * 12.25).toFixed(2)} 245`);
          arc.setAttribute("stroke", c <= 2 ? "#e0453a" : "#4ee07e");
        }
        d.querySelectorAll(".sgt").forEach((e, j) => {
          if (c <= 2) {
            e.style.display = "none";
            return;
          }
          e.style.display = "inline";
          e.setAttribute("stroke-dashoffset", (-((c - 1) * 12.25 + j * 2.0417)).toFixed(3));
        });
      });
      if (next < Infinity) this._rgT = setTimeout(() => this._ringTick(), Math.max(20, next - performance.now()));
    }
    // ---- the pack drawing of one battery, enlarged: the live element itself moves into a popup (so every animation keeps running) and goes back on close
    _openPack(i, pkw) {
      const strip = pkw.querySelector(".pk2");
      if (!strip || this._pp) return;
      const a = strip.getBoundingClientRect(), ph = document.createElement("div");
      ph.style.height = a.height + "px";
      pkw.insertBefore(ph, strip);
      const bk = html(
        `<div class="ppopbk"><button class="dpx" title="${tt("close")}">\u2715</button><div class="pp"></div></div>`
      );
      bk.querySelector(".pp").appendChild(strip);
      ["wheel", "touchmove"].forEach((t) => bk.addEventListener(t, (e) => e.preventDefault(), { passive: false }));
      bk.onclick = (e) => {
        if (e.target === bk || e.target.closest(".dpx")) this._closePack();
      };
      this._pesc = (e) => {
        if (e.key === "Escape" && !this._pop) this._closePack();
      };
      document.addEventListener("keydown", this._pesc);
      this.shadowRoot.appendChild(bk);
      this._pp = { i, bk, strip, ph, pkw };
      this._flip(bk, strip, a, true);
    }
    _flip(bk, strip, from, open, done) {
      const b = strip.getBoundingClientRect();
      if (!strip.animate || !from.width || matchMedia("(prefers-reduced-motion:reduce)").matches) {
        done && done();
        return;
      }
      const s = from.width / b.width, dx = from.left + from.width / 2 - (b.left + b.width / 2), dy = from.top + from.height / 2 - (b.top + b.height / 2), small = { transform: `translate(${dx}px,${dy}px) scale(${s})` }, big = { transform: "none" };
      bk.animate(
        open ? [{ backgroundColor: "rgba(0,0,0,0)" }, { backgroundColor: "rgba(0,0,0,.78)" }] : [{ backgroundColor: "rgba(0,0,0,.78)" }, { backgroundColor: "rgba(0,0,0,0)" }],
        { duration: 1e3, fill: "both" }
      );
      const an = strip.animate(open ? [small, big] : [big, small], {
        duration: 1e3,
        easing: "cubic-bezier(.25,.6,.2,1)",
        fill: "both"
      });
      if (done) an.onfinish = done;
    }
    _closePack(now) {
      const p = this._pp;
      if (!p || p.closing) return;
      p.closing = true;
      if (this._pesc) {
        document.removeEventListener("keydown", this._pesc);
        this._pesc = null;
      }
      const end = () => {
        p.strip.getAnimations().forEach((a) => a.cancel());
        p.pkw.insertBefore(p.strip, p.ph);
        p.ph.remove();
        p.bk.remove();
        if (this._pp === p) this._pp = null;
      };
      if (now || !p.ph.isConnected) {
        end();
        return;
      }
      this._flip(p.bk, p.strip, p.ph.getBoundingClientRect(), false, end);
    }
    _toggleDisp(i) {
      const ci = this._grp ? this._grp.order[this._sel || 0] : i, sid = this._id(this._cfg.batteries[ci], "display_always_on", "switch"), ss = this._hass.states[sid];
      if (!ss) return;
      const want = ss.state === "on" ? "off" : "on";
      (this._dp = this._dp || {})[ci] = { want, t: performance.now() };
      if (this._grp) this._vOff = want === "off";
      this._hass.callService("switch", "turn_" + want, { entity_id: sid });
      this._lastU = performance.now();
      this._update();
    }
    _dpv(i, cur) {
      const p = this._dp && this._dp[i];
      if (!p) return cur;
      if (cur === p.want || performance.now() - p.t > 6e3) {
        delete this._dp[i];
        return cur;
      }
      return p.want;
    }
    // show the new screen state at once; HA confirms a moment later
    _openDisp(i, strip) {
      ST.lang = this._lang || ST.lang;
      this._closeDisp();
      const src = strip.querySelector(".dsp"), bk = html(
        `<div class="dpopbk"><button class="dpx" title="${tt("close")}">\u2715</button>
          <div class="pk2 dp">
            <svg class="dpsvg" viewBox="0 0 610 423">
            </svg>
            <div class="dph">${tt("popup_hint")}</div>
          </div>
        </div>`
      );
      const svg = bk.querySelector("svg");
      svg.innerHTML = src.outerHTML;
      svg.firstChild.removeAttribute("transform");
      svg.querySelectorAll("title").forEach((t) => t.remove());
      {
        const cp = svg.querySelector("clipPath"), gl = svg.querySelector(".gl");
        if (cp && gl) {
          cp.id += "P";
          gl.setAttribute("clip-path", `url(#${cp.id})`);
        }
        svg.querySelectorAll("clipPath rect, .dsp > rect:first-of-type").forEach((e) => {
          e.setAttribute("rx", 15);
          e.setAttribute("ry", 15);
        });
      }
      bk.querySelector(".dp").dataset.st = strip.dataset.st;
      bk.onclick = (e) => {
        const go = e.target.closest("[data-go]");
        {
          const lm = bk.querySelector(".lmenu");
          if (lm && !e.target.closest(".lmenu") && !(go && go.dataset.go === "lang")) lm.remove();
        }
        if (e.target.closest(".pwr")) this._toggleDisp(i);
        else if (go && go.dataset.go === "lang") this._langMenu(bk);
        else if (go) {
          if (go.dataset.pk !== void 0) {
            this._sel = +go.dataset.pk;
            this._vOff = false;
            if (this._data) this._updSimple(this._data);
          }
          bk.querySelector(".dsp").setAttribute("data-pg", go.dataset.go);
        } else if (e.target === bk || e.target.closest(".dpx")) this._closeDisp();
      };
      ["wheel", "touchmove"].forEach((t) => bk.addEventListener(t, (e) => e.preventDefault(), { passive: false }));
      this._esc = (e) => {
        if (e.key === "Escape") this._closeDisp();
      };
      document.addEventListener("keydown", this._esc);
      this.shadowRoot.appendChild(bk);
      this._pop = { i, el: bk, from: src };
      this._syncPop(src);
      this._ringTick();
      this._grow(bk, src, true);
    }
    _grow(bk, src, open, done) {
      const dp = bk.querySelector(".dp"), a = src.getBoundingClientRect(), b = dp.getBoundingClientRect();
      if (!dp.animate || !a.width || matchMedia("(prefers-reduced-motion:reduce)").matches) {
        done && done();
        return;
      }
      const s = a.width / b.width, dx = a.left + a.width / 2 - (b.left + b.width / 2), dy = a.top + a.height / 2 - (b.top + b.height / 2), small = { transform: `translate(${dx}px,${dy}px) scale(${s})` }, big = { transform: "none" }, o = { duration: 1e3, easing: "cubic-bezier(.25,.6,.2,1)", fill: "both" };
      bk.animate(
        open ? [{ backgroundColor: "rgba(0,0,0,0)" }, { backgroundColor: "rgba(0,0,0,.78)" }] : [{ backgroundColor: "rgba(0,0,0,.78)" }, { backgroundColor: "rgba(0,0,0,0)" }],
        { duration: 1e3, fill: "both" }
      );
      const an = dp.animate(open ? [small, big] : [big, small], o);
      if (done) an.onfinish = done;
    }
    _closeDisp() {
      if (this._pop && !this._pop.closing && this._pop.from && this._pop.from.isConnected) {
        const p = this._pop;
        p.closing = true;
        this._grow(p.el, p.from, false, () => {
          p.el.remove();
          if (this._pop === p) this._pop = null;
          this._afterClose();
        });
      } else if (this._pop) {
        this._pop.el.remove();
        this._pop = null;
        this._afterClose();
      }
      if (this._esc) {
        document.removeEventListener("keydown", this._esc);
        this._esc = null;
      }
    }
    _syncPop(src) {
      const p = this._pop;
      if (!p) return;
      const dst = p.el.querySelector(".dsp");
      if (!dst) return;
      ["class", "style"].forEach((a) => {
        const v = src.getAttribute(a) || "";
        if (dst.getAttribute(a) !== v) dst.setAttribute(a, v);
      });
      ["bb", "bo"].forEach((cl) => {
        const d2 = dst.querySelectorAll("." + cl);
        src.querySelectorAll("." + cl).forEach((e, k) => {
          const o = d2[k];
          if (!o) return;
          ["fill", "stroke"].forEach((a2) => {
            const v = e.getAttribute(a2);
            if (v !== o.getAttribute(a2) && v !== null) o.setAttribute(a2, v);
          });
        });
      });
      src.querySelectorAll("[data-d]").forEach((e) => {
        if (e === src) return;
        const d = dst.querySelector(`[data-d="${e.dataset.d}"]`);
        if (!d) return;
        if (d.textContent !== e.textContent) d.textContent = e.textContent;
        ["fill", "stroke", "stroke-dasharray"].forEach((a) => {
          const v = e.getAttribute(a);
          if (v !== null && v !== d.getAttribute(a)) d.setAttribute(a, v);
        });
      });
    }
    _ctrlButtons(ct, i) {
      ST.lang = this._lang || ST.lang;
      const base = this._cfg.batteries[i], list = [
        ["charging", "\u26A1 " + tt("sw_charge"), tt("sw_charge_n")],
        ["discharging", "\u{1F50C} " + tt("sw_discharge"), tt("sw_discharge_n")],
        ["balancer", "\u2696 " + tt("sw_balance"), tt("sw_balance_n")]
      ];
      if (this._hass && this._hass.states[this._id(base, "heating", "switch")])
        list.push(["heating", "\u{1F525} " + tt("sw_heat"), tt("sw_heat_n")]);
      ct.innerHTML = "";
      list.forEach(([k, l, nm]) => {
        const e = html(`<div class="sw" data-sw="${k}">${l}</div>`);
        e.onclick = () => this._askSwitch(ct, i, k, nm);
        ct.appendChild(e);
      });
    }
    // a switch only changes after an explicit "yes" (auto-cancels after 8 s)
    _askSwitch(ct, i, k, nm) {
      ST.lang = this._lang || ST.lang;
      const b = this._cfg.batteries[i], id = this._id(b, k, "switch"), st = this._hass.states[id], on = !!st && st.state === "on";
      ct.innerHTML = "";
      const box = html(
        `<div class="confirm"><span>${tt(on ? "confirm_off" : "confirm_on", { what: nm, name: "<b>" + (b.name || b.entity_base) + "</b>" })}</span>
        <button class="yes">${tt(on ? "yes_off" : "yes_on")}</button>
        <button class="no">${tt("cancel")}</button>
      </div>`
      );
      ct.appendChild(box);
      const back = () => {
        clearTimeout(box._t);
        this._ctrlButtons(ct, i);
      };
      box.querySelector(".no").onclick = back;
      box.querySelector(".yes").onclick = () => {
        this._hass.callService("switch", on ? "turn_off" : "turn_on", { entity_id: id });
        back();
      };
      box._t = setTimeout(back, 8e3);
    }
    _update() {
      if (!this._built || !this._hass || ST.editing > 0 && this._shown || this._vis === false) return;
      ST.lang = this._lang || ST.lang;
      const d = this._data = this._compute();
      const sig = this._hass ? Object.values(this._cfg.victron || {}).concat((this._cfg.batteries || []).map((b) => this._id(b, "heating", "switch"))).map((id) => {
        const x = id && this._hass.states[id];
        return x ? x.state : "";
      }).join("|") + JSON.stringify(d) : "";
      if (sig && sig === this._dsig && this._shown && !this._pop && !this._pp) return;
      this._dsig = sig;
      this._updSimple(d);
      this._updVictron();
      this.style.minHeight = "";
      this._shown = true;
    }
  };
  customElements.define("jk-bms-battery-card", JkBatteryCard);

  // src/editor-styles.js
  var ECSS = `
  :host {
    display: block;
  }
  .row {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-bottom: 8px;
    flex-wrap: wrap;
  }
  .row > * {
    flex: 1;
    min-width: 120px;
  }
  input,
  select {
    background: var(--card-background-color, #222);
    color: var(--primary-text-color, #fff);
    border: 1px solid var(--divider-color, #555);
    border-radius: 8px;
    padding: 10px;
    font-size: 14px;
    width: 100%;
    box-sizing: border-box;
  }
  h4 {
    margin: 16px 0 8px;
    font-weight: 600;
    color: var(--primary-text-color);
  }
  .btn {
    cursor: pointer;
    flex: 0 0 auto;
    min-width: 0;
    background: var(--primary-color, #03a9f4);
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 9px 14px;
    font-size: 13px;
    width: auto;
  }
  .btn.ghost {
    background: transparent;
    color: var(--primary-text-color);
    border: 1px solid var(--divider-color, #555);
  }
  .btn.del {
    background: transparent;
    color: #ff6b6b;
    border: 1px solid #ff6b6b;
  }
  .chk {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 6px 0 10px;
    font-size: 14px;
    color: var(--primary-text-color);
  }
  .chk input {
    width: auto;
  }
  .dd {
    position: relative;
  }
  .ddb {
    width: 100%;
    text-align: left;
    padding: 10px 28px 10px 10px;
    border-radius: 8px;
    border: 1px solid var(--divider-color, #555);
    background: var(--card-background-color, #222);
    color: var(--primary-text-color, #fff);
    font: inherit;
    font-size: 14px;
    cursor: pointer;
    position: relative;
  }
  .ddb::after {
    content: "\u25BE";
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0.7;
  }
  .ddl {
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    z-index: 30;
    margin-top: 2px;
    max-height: 230px;
    overflow: auto;
    background: var(--card-background-color, #222);
    border: 1px solid var(--divider-color, #555);
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
  }
  .ddi {
    padding: 9px 12px;
    cursor: pointer;
    font-size: 14px;
    color: var(--primary-text-color, #fff);
  }
  .ddi:hover {
    background: rgba(127, 127, 127, 0.22);
  }
  .ddi.on {
    background: rgba(143, 180, 201, 0.28);
  }
  details {
    margin: 10px 0;
  }
  summary {
    cursor: pointer;
    font-weight: 600;
    color: var(--primary-text-color);
    padding: 6px 0;
  }
  .hint {
    font-size: 12px;
    color: var(--secondary-text-color);
    margin: 4px 0 10px;
  }
  .bat {
    border: 1px solid var(--divider-color, #555);
    border-radius: 12px;
    padding: 10px 12px 4px;
    margin-bottom: 12px;
  }
  .bh {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
  }
  .bh .tt {
    flex: 1;
    font-weight: 600;
    color: var(--primary-text-color);
  }
  .badge {
    font-size: 12px;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 999px;
    background: var(--divider-color, #555);
    color: var(--primary-text-color);
  }
  .badge.m {
    background: #0ea5e9;
    color: #fff;
  }
  .badge.s {
    background: #f59e0b;
    color: #000;
  }
  .fld {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 10px;
    flex: 1;
    min-width: 150px;
  }
  .fld > span {
    font-size: 12px;
    color: var(--secondary-text-color);
  }
  .fg {
    display: flex;
    flex-wrap: wrap;
    gap: 0 10px;
  }
`;

  // src/editor.js
  var lab = (n) => ({
    title: tt("lbl_title"),
    cells: tt("lbl_cells"),
    temps: tt("lbl_temps"),
    glare: tt("lbl_glare"),
    language: tt("lbl_language")
  })[n] || (String(n).startsWith("v_") ? "Victron \u2013 " + tt("vt_" + n.slice(2)) : n);
  var VIC_KEYS = [...VIC_EXTRA, ...VIC_TILES].map((t) => t.k);
  var stable = (o) => JSON.stringify(
    o,
    (k, v) => v && typeof v === "object" && !Array.isArray(v) ? Object.fromEntries(
      Object.keys(v).sort().map((x) => [x, v[x]])
    ) : v
  );
  var cfgSig = (c) => {
    const { type, ...r } = c || {};
    return stable(r);
  };
  var JkBatteryCardEditor = class extends HTMLElement {
    connectedCallback() {
      ST.editing++;
      this._on = true;
      CARDS.forEach((c) => {
        if (!c._pvw && inPreview(c)) {
          c._pvw = true;
          c._built = false;
          c._pvwShow();
        }
      });
    }
    // a card that sits in the editor preview becomes a stub
    disconnectedCallback() {
      if (this._on) {
        this._on = false;
        ST.editing = Math.max(0, ST.editing - 1);
        if (!ST.editing) CARDS.forEach((c) => c._wake && c._wake());
      }
      clearTimeout(this._et);
    }
    setConfig(config) {
      const sig = cfgSig(config);
      if (sig === this._sig && this._config) return;
      this._sig = sig;
      this._config = { ...config, batteries: (config.batteries || []).map((b) => ({ ...b })) };
      if (this._hass) this._render();
    }
    set hass(h) {
      const first = !this._hass;
      this._hass = h;
      const t = performance.now();
      if (t - (this._ft || 0) > 1e4) {
        this._ft = t;
        if (this._form) this._form.hass = h;
        if (this._vform) this._vform.hass = h;
      }
      if (first && this._config) this._render();
    }
    // every state change of HA used to re-render ~30 entity pickers: that froze the editor
    _dd(sel, root) {
      if (!root._ddc) {
        root._ddc = 1;
        root.addEventListener(
          "click",
          () => root.querySelectorAll(".ddl").forEach((x) => {
            x.hidden = true;
          })
        );
      }
      const w = document.createElement("div"), b = document.createElement("button"), l = document.createElement("div");
      w.className = "dd";
      b.type = "button";
      b.className = "ddb";
      l.className = "ddl";
      l.hidden = true;
      sel.style.display = "none";
      const sync = () => {
        const o = sel.options[sel.selectedIndex];
        b.textContent = o ? o.text : "";
      };
      sel._sync = sync;
      b.onclick = (e) => {
        e.stopPropagation();
        const open = l.hidden;
        root.querySelectorAll(".ddl").forEach((x) => {
          x.hidden = true;
        });
        if (!open) return;
        l.innerHTML = "";
        [...sel.options].forEach((o) => {
          const it = document.createElement("div");
          it.className = "ddi" + (o.value === sel.value ? " on" : "");
          it.textContent = o.text;
          it.onclick = (ev) => {
            ev.stopPropagation();
            l.hidden = true;
            if (sel.value !== o.value) {
              sel.value = o.value;
              sync();
              sel.dispatchEvent(new Event("change", { bubbles: true }));
            }
          };
          l.appendChild(it);
        });
        l.hidden = false;
      };
      w.append(b, l);
      sel.after(w);
      sync();
    }
    _emit() {
      clearTimeout(this._et);
      this._et = setTimeout(() => {
        const cfg = JSON.parse(JSON.stringify(this._config));
        this._sig = cfgSig(cfg);
        this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: cfg }, bubbles: true, composed: true }));
      }, 150);
    }
    async _render() {
      if (!this._config) return;
      const root = this.shadowRoot || this.attachShadow({ mode: "open" }), token = this._tok = (this._tok || 0) + 1, tok2 = token;
      ST.lang = pickLang(this._config.language, this._hass && this._hass.language);
      if (ST.lang !== "en" && !I18N[ST.lang])
        loadLang(ST.lang).then((ok) => {
          if (ok && tok2 === this._tok && !root.activeElement) this._render();
        });
      root.innerHTML = `<style>${ECSS}</style><div id="form"></div><h4>${tt("ed_batteries")}</h4><div id="bats"></div>
    <div class="row">
      <button class="btn" id="det">\u{1F50D} ${tt("ed_detect")}</button>
      <button class="btn ghost" id="add">${tt("ed_add")}</button>
    </div>
    <div class="hint" id="dh">
    </div>
    <h4>${tt("ed_victron")}</h4>
    <div class="row">
      <button class="btn ghost" id="vdet">\u{1F50D} ${tt("ed_vdetect")}</button>
    </div>
    <details id="vd">
      <summary>${tt("ed_vsummary")}</summary>
      <div id="vf">
      </div>
    </details>`;
      this._vform = null;
      const detected = this._hass ? discoverBatteries(this._hass) : [];
      root.querySelector("#dh").textContent = this._hass ? tt("ed_found", { n: detected.length }) : "";
      const bats = root.querySelector("#bats");
      const bl = this._config.batteries, mi = bl.findIndex((x) => x.role === "master"), hasG = mi >= 0 && bl.length >= 2, ord = hasG ? grpOrder(bl, mi) : [];
      bl.forEach((b, i) => {
        const row = document.createElement("div"), opts = [...detected], pos = ord.indexOf(i);
        row.className = "bat";
        if (b.entity_base && !opts.find((d) => d.entity_base === b.entity_base))
          opts.push({ name: b.entity_base, entity_base: b.entity_base });
        const badge = !hasG ? `<span class="badge">${tt("ed_independent")}</span>` : pos === 0 ? `<span class="badge m">Master</span>` : `<span class="badge s">Slave ${b.slave || pos}</span>`;
        const defId = `switch.${b.entity_base || "jk_bms_bms" + i}_display_always_on`, swIds = this._hass ? Object.keys(this._hass.states).filter((x) => x.startsWith("switch.") && /display/.test(x)) : [];
        row.innerHTML = `<div class="bh"><span class="tt">${tt("ed_battery_n", { n: i + 1 })}</span>${badge}<button class="btn del" title="${tt("ed_delete")}">\u2715</button>
      </div>
      <div class="fg"><label class="fld"><span>${tt("ed_name")}</span><input class="nm" placeholder="${tt("ed_name_ph")}"></label>
      <label class="fld"><span>${tt("ed_entity")}</span>
        <select class="sel">
          <option value="">${tt("ed_choose")}</option>${opts.map((d) => `<option value="${d.entity_base}">${d.entity_base}</option>`).join("")}</select>
      </label>
      </div>
      <div class="fg"><label class="fld"><span>${tt("lbl_cells")}</span><select class="b-cells">${[
          .../* @__PURE__ */ new Set([8, 16])
        ].sort((x, y) => x - y).map((v) => `<option value="${v}">${v}</option>`).join("")}</select>
        </label>
        <label class="fld"><span>${tt("lbl_temps")}</span>
          <select class="b-temps">${[0, 1, 2, 3, 4].map((v) => `<option value="${v}">${v}</option>`).join("")}</select>
        </label>
        </div>
      <div class="fg"><label class="fld"><span>${tt("ed_cell1")}</span><select class="lay">${[
          ["top-left", tt("pos_tl")],
          ["top-right", tt("pos_tr")],
          ["bottom-left", tt("pos_bl")],
          ["bottom-right", tt("pos_br")]
        ].map(([v, l]) => `<option value="${v}">${l}</option>`).join("")}</select></label>
      <label class="fld"><span>${tt("ed_role")}</span>
        <select class="role">
          <option value="">${tt("ed_independent")}</option>
          <option value="master">Master</option>${Array.from({ length: 16 }, (_, k) => `<option value="slave:${k + 1}">Slave ${k + 1}</option>`).join("")}</select>
      </label>
      </div>
      <div class="fg">
        <label class="fld"><span>${tt("ed_display")}</span><input class="ds" title="${tt("ed_display_hint")}" list="dl${i}" placeholder="${defId}"><datalist id="dl${i}">${swIds.map((x) => `<option value="${x}">`).join("")}</datalist>
          </label>
        </div>`;
        const nm = row.querySelector(".nm"), sel = row.querySelector(".sel"), lay = row.querySelector(".lay"), role = row.querySelector(".role"), ds = row.querySelector(".ds");
        nm.value = b.name || "";
        sel.value = b.entity_base || "";
        lay.value = b.layout || (i === 1 ? "bottom-left" : "top-left");
        role.value = b.role === "master" ? "master" : b.slave ? "slave:" + b.slave : b.role === "slave" ? "slave:" + (pos > 0 ? pos : 1) : "";
        ds.value = b.entities && b.entities.display_always_on || (this._hass && this._hass.states[defId] ? defId : "");
        {
          const bc = row.querySelector(".b-cells"), bt = row.querySelector(".b-temps");
          bc.value = +(b.cells ?? this._config.cells ?? 16) <= 8 ? "8" : "16";
          bt.value = String(b.temps ?? this._config.temps ?? 4);
          bc.onchange = (e) => {
            b.cells = +e.target.value;
            this._emit();
          };
          bt.onchange = (e) => {
            b.temps = +e.target.value;
            this._emit();
          };
        }
        lay.onchange = (e) => {
          b.layout = e.target.value;
          this._emit();
        };
        role.onchange = (e) => {
          const v = e.target.value, B = this._config.batteries;
          if (v === "master") {
            B.forEach((o) => {
              if (o.role === "master") {
                o.role = "slave";
              }
            });
            b.role = "master";
            delete b.slave;
          } else if (v.startsWith("slave:")) {
            b.role = "slave";
            b.slave = +v.slice(6);
          } else {
            delete b.role;
            delete b.slave;
          }
          this._emit();
          this._render();
        };
        nm.oninput = (e) => {
          b.name = e.target.value;
          this._emit();
        };
        sel.onchange = (e) => {
          b.entity_base = e.target.value;
          const d = detected.find((x) => x.entity_base === b.entity_base);
          if (d && !b.name) {
            b.name = d.name;
            nm.value = d.name;
          }
          this._emit();
        };
        ds.onchange = (e) => {
          const v = e.target.value.trim();
          b.entities = { ...b.entities || {} };
          if (v && v !== defId) b.entities.display_always_on = v;
          else delete b.entities.display_always_on;
          if (!Object.keys(b.entities).length) delete b.entities;
          this._emit();
        };
        row.querySelector(".del").onclick = () => {
          this._config.batteries.splice(i, 1);
          this._emit();
          this._render();
        };
        bats.appendChild(row);
        row.querySelectorAll("select").forEach((sl) => this._dd(sl, root));
      });
      root.querySelector("#det").onclick = () => {
        const have = new Set(this._config.batteries.map((b) => b.entity_base));
        detected.filter((d) => !have.has(d.entity_base)).forEach((d) => this._config.batteries.push({ ...d }));
        this._emit();
        this._render();
      };
      root.querySelector("#add").onclick = () => {
        this._config.batteries.push({ name: "", entity_base: "" });
        this._emit();
        this._render();
      };
      root.querySelector("#vdet").onclick = () => {
        if (!this._hass) return;
        const cur = Object.fromEntries(Object.entries(this._config.victron || {}).filter(([, x]) => x));
        this._config.victron = { ...discoverVictron(this._hass), ...cur };
        this._emit();
        this._render();
      };
      const ent = { entity: { domain: "sensor" } }, c0 = this._config, slot = root.querySelector("#form");
      this._form = null;
      slot.innerHTML = `<div class="fg">
      <label class="fld"><span>${tt("lbl_title")}</span><input class="f-title" placeholder="${tt("title_default")}">
      </label>
    <label class="fld"><span>${tt("lbl_language")}</span><select class="f-lang"><option value="auto">${tt("lang_auto")}</option>${Object.entries(
        ST.langList || { en: "English", fr: "Fran\xE7ais", de: "Deutsch", it: "Italiano", es: "Espa\xF1ol", ro: "Rom\xE2n\u0103" }
      ).map(([v, l]) => `<option value="${v}">${l}</option>`).join("")}</select></label></div>
    
    <label class="fld"><span>${tt("lbl_perf")}</span>
      <select class="f-perf">
        <option value="auto">${tt("perf_auto")}</option>
        <option value="full">${tt("perf_full")}</option>
        <option value="lite">${tt("perf_lite")}</option>
      </select>
    </label>
    <label class="chk"><input class="f-glare" type="checkbox"> ${tt("lbl_glare")}</label>`;
      const q2 = (k) => slot.querySelector(k);
      q2(".f-title").value = c0.title || "";
      q2(".f-lang").value = c0.language || "auto";
      q2(".f-glare").checked = c0.glare !== false;
      q2(".f-perf").value = c0.performance || "auto";
      q2(".f-perf").onchange = (e) => {
        if (e.target.value === "auto") delete this._config.performance;
        else this._config.performance = e.target.value;
        this._emit();
      };
      q2(".f-title").oninput = (e) => {
        if (e.target.value) this._config.title = e.target.value;
        else delete this._config.title;
        this._emit();
      };
      if (!ST.langList)
        loadLangList().then((list) => {
          const sel = q2(".f-lang");
          if (!sel || !list || root.activeElement === sel) return;
          sel.innerHTML = `<option value="auto">${tt("lang_auto")}</option>` + Object.entries(list).map(([v, l]) => `<option value="${v}">${l}</option>`).join("");
          sel.value = c0.language || "auto";
          if (sel._sync) sel._sync();
        });
      q2(".f-lang").onchange = (e) => {
        if (e.target.value === "auto") delete this._config.language;
        else this._config.language = e.target.value;
        this._emit();
        this._render();
      };
      q2(".f-glare").onchange = (e) => {
        this._config.glare = e.target.checked;
        this._emit();
      };
      slot.querySelectorAll("select").forEach((sl) => this._dd(sl, root));
      const vd = root.querySelector("#vd");
      vd.addEventListener("toggle", async () => {
        if (!vd.open || vd._b) return;
        vd._b = 1;
        try {
          if (!customElements.get("ha-form") && window.loadCardHelpers) {
            const h = await window.loadCardHelpers();
            await h.createCardElement({ type: "entities", entities: [] });
          }
        } catch (e) {
        }
        if (token !== this._tok) return;
        const vf = document.createElement("ha-form");
        this._vform = vf;
        vf.schema = VIC_KEYS.map((k) => ({ name: "v_" + k, selector: ent }));
        vf.data = Object.fromEntries(VIC_KEYS.map((k) => ["v_" + k, (this._config.victron || {})[k] || ""]));
        vf.hass = this._hass;
        vf.computeLabel = (s2) => lab(s2.name);
        vf.addEventListener("value-changed", (e) => {
          e.stopPropagation();
          const d = e.detail.value, victron = {};
          Object.entries(d || {}).forEach(([k, x]) => {
            if (x) victron[k.slice(2)] = x;
          });
          const cur = Object.fromEntries(Object.entries(this._config.victron || {}).filter(([, x]) => x));
          if (stable(cur) === stable(victron)) return;
          vf.data = d;
          this._config = { ...this._config, victron };
          this._emit();
        });
        root.querySelector("#vf").appendChild(vf);
      });
    }
  };
  customElements.define("jk-bms-battery-card-editor", JkBatteryCardEditor);

  // src/index.js
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: "jk-bms-battery-card",
    name: "JK-BMS Battery",
    description: "JK-BMS battery bank: 3D scene, per-battery view, cells with voltage and resistance",
    preview: false
  });
  console.info(`%c JK-BMS-BATTERY %c v${VERSION} `, "background:#0ea5e9;color:#fff", "background:#111;color:#8fb4c9");
})();
