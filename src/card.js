import { CARDS, I18N, inPreview, loadLang, loadLangList, pickLang, tt } from "./i18n.js";
import { GRN, PK, packOverlay, packSvg } from "./pack.js";
import { ST } from "./state.js";
import { CSS } from "./styles.js";
import { clamp, fmt, fmtW, grpOrder, html, num, socColor } from "./util.js";
import { VIC_TILES, discoverBatteries, discoverVictron, title } from "./victron.js";

export const setH = (el, h) => {
  if (el._h !== h) {
    el._h = h;
    el.innerHTML = h;
  }
};
export const fmtRb = (b, r) =>
  isNaN(r)
    ? "–"
    : b.resUnit === "Ω" || !b.resUnit
      ? r < 0.1
        ? (r * 1000).toFixed(0) + " mΩ"
        : r.toFixed(3) + " Ω"
      : r.toFixed(/^m/i.test(b.resUnit) ? 0 : 2) + " " + b.resUnit;

export class JkBatteryCard extends HTMLElement {
  static getStubConfig(hass) {
    const bats = hass ? discoverBatteries(hass) : [];
    return {
      batteries: bats.length
        ? bats
        : [
            { name: "Bat. Old", entity_base: "jk_bms_bms0" },
            { name: "Bat. New", entity_base: "jk_bms_bms1" },
          ],
      victron: hass ? discoverVictron(hass) : {},
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
    if (this._built && key === this._cfgKey) return; // HA may call setConfig again with the same config: rebuilding would collapse the card and make the page jump
    this._cfgKey = key;
    if (this._built) this.style.minHeight = this.offsetHeight + "px"; // keep the height while rebuilding, so the scroll position survives
    this._cfg = { cells: 16, temps: 4, batteries: [], victron: {}, ...config };
    this._lang = null;
    this._setLang(this._wantLang(this._hass));
    this._metric = "v";
    this._data = null;
    this._build();
  }
  set hass(h) {
    this._hass = h;
    if ((ST.editing > 0 && this._shown) || this._pvw || this._vis === false) return; // editor open: stay still
    const nl = this._wantLang(h);
    if (nl !== this._lang) {
      this._setLang(nl);
      if (this._built) {
        this._build();
        return;
      }
    }
    if (!this._built) return;
    const now = performance.now(),
      gap = this.classList.contains("lite") ? 1500 : 900; // one refresh per gap, whatever the number of state changes
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
    // the editor's live preview is a stub: no data, no animation
    ST.lang = this._lang || ST.lang;
    const root = this.shadowRoot || this.attachShadow({ mode: "open" });
    root.innerHTML = `<style>.pv{padding:16px;color:var(--secondary-text-color,#9b9b9b);font-size:13px}.pv b{display:block;color:var(--primary-text-color,#e1e1e1);font-size:16px;margin-bottom:4px}</style><ha-card>
      <div class="pv"><b>${(this._cfg && this._cfg.title) || tt("title_default")}</b>${tt("preview_off")}</div></ha-card>`;
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
    this._vis = undefined;
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
    return (b.entities && b.entities[key]) || `${domain}.${b.entity_base}_${key}`;
  }
  _set2(el, t) {
    if (el && el.textContent !== t) el.textContent = t;
  }
  _isLite() {
    // auto: touch screens, weak CPUs / little memory and "reduce motion" get the light rendering
    const p = this._cfg && this._cfg.performance;
    if (p === "lite") return true;
    if (p === "full") return false;
    const nv = typeof navigator !== "undefined" ? navigator : {},
      mm = (q) => typeof matchMedia === "function" && matchMedia(q).matches;
    return !!(
      (nv.deviceMemory && nv.deviceMemory <= 4) ||
      (nv.hardwareConcurrency && nv.hardwareConcurrency <= 4) ||
      mm("(pointer: coarse)") ||
      mm("(prefers-reduced-motion: reduce)")
    );
  }
  _wantLang(h) {
    // the choice made on the BMS screen (kept in this browser) wins over the configuration and over Home Assistant
    if (this._langOverride === undefined) {
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
    const list = await loadLangList(),
      m = document.createElement("div");
    m.className = "lmenu";
    m.innerHTML = [["auto", tt("lang_auto")], ...Object.entries(list)]
      .map(
        ([c, n]) =>
          `<button data-lc="${c}" class="${(c === "auto" ? !this._langOverride : this._langOverride === c) ? "on" : ""}">${n}</button>`,
      )
      .join("");
    m.onclick = (e) => {
      const b = e.target.closest("[data-lc]");
      if (b) this._pickLang(b.dataset.lc);
    };
    const host = bk.querySelector(".dp");
    if (host) host.appendChild(m);
  }
  _rebuild() {
    // rebuild the card (new language); an open enlarged screen is opened again
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
    } catch (e) {}
    this._setLang(this._wantLang(this._hass));
    this._applyLang();
  }
  _applyLang() {
    // the screen stays open and is rewritten in place; the card itself is rebuilt when the screen is closed
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
    // the file of a non-English language is fetched once; the card is rebuilt when it arrives (English meanwhile)
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
        new CustomEvent("hass-more-info", { detail: { entityId: id }, bubbles: true, composed: true }),
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
    const c = this._cfg,
      root = this.shadowRoot || this.attachShadow({ mode: "open" }),
      vic = this._hasVictron();
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
    <div class="ctrl" data-k="ctrl"></div><div class="err" data-k="err"></div><div class="bc-foot" data-k="bcfoot">–</div></div>`;
    root.innerHTML = `<style>${CSS}</style><ha-card>
    <div class="hdr"><div class="logo"><b>${c.title || tt("title_default")}</b></div></div>
    <div class="main">
      <div data-k="alerts"></div>
      <div class="bcards">${(this._groupInfo() ? [c.batteries[this._groupInfo().mi]] : c.batteries).map(card).join("")}</div>
      ${vic ? '<div class="vsec"><div class="vhead" data-k="vtxt">–</div><div class="vrows" data-k="vrows"></div></div>' : ""}
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
    } // the values of the card (tiles, detail rows, top line) open the entity they come from
    this._buildVictron();
    this._built = true;
    if (this._hass) this._update();
  }

  /* ------------------------------------------------------------ victron details (plain rows) */
  _buildVictron() {
    const v = this._cfg.victron || {},
      host = this.shadowRoot.querySelector("[data-k=vrows]");
    if (!host) return;
    const grp = { bat: tt("g_bat"), inv: tt("g_inv"), hist: tt("g_hist") };
    host.innerHTML = ["bat", "inv", "hist"]
      .map((g) => {
        const rows = VIC_TILES.filter((t) => t.g === g && v[t.k]);
        return rows.length
          ? `<div class="vbox">
            <h4>${grp[g]}</h4>${rows
              .map(
                (t) => `<div class="vrow" data-t="${t.k}"><span>${tt("vt_" + t.k)}</span><b>–</b>
            </div>`,
              )
              .join("")}</div>`
          : "";
      })
      .join("");
    host.querySelectorAll(".vrow").forEach((r) => (r.onclick = () => this._more(v[r.dataset.t])));
  }
  _updVictron() {
    const host = this.shadowRoot.querySelector("[data-k=vrows]");
    if (!host) return;
    const v = this._cfg.victron || {};
    VIC_TILES.filter((t) => v[t.k]).forEach((t) => {
      const s = this._hass.states[v[t.k]],
        row = host.querySelector(`.vrow[data-t="${t.k}"]`);
      if (!row) return;
      const raw = s ? s.state : null,
        bad = raw === null || ["unknown", "unavailable", "none", ""].includes(String(raw).toLowerCase()),
        b = row.querySelector("b");
      b.textContent = bad ? "N/A" : t.f(raw);
      b.style.color = bad || !t.c ? "" : t.c(raw);
      row.style.opacity = bad ? 0.5 : 1;
    });
  }

  // ---- master / slave group (set by hand: role: master | slave on the batteries): ONE card, the BMS screen decides which pack is shown
  _groupInfo() {
    const bs = this._cfg.batteries || [],
      mi = bs.findIndex((b) => b.role === "master");
    if (mi < 0 || bs.length < 2) return null;
    return { mi, order: grpOrder(bs, mi) };
  }
  _aggr(bats, grp) {
    const ok = (x) => !isNaN(x),
      cap = (x) => (ok(x.capTot) && x.capTot > 0 ? x.capTot : x.soc > 0 && ok(x.rem) ? (x.rem / x.soc) * 100 : NaN),
      sum = (a) => a.filter(ok).reduce((p, x) => p + x, 0);
    const capS = sum(bats.map(cap)),
      remS = sum(bats.map((x) => x.rem)),
      vs = bats.map((x) => x.V).filter(ok),
      socs = bats.map((x) => x.soc).filter(ok),
      I = sum(bats.map((x) => x.I)),
      m = bats[0];
    return {
      ...m,
      name: tt("group_name", { n: bats.length }),
      V: vs.length ? vs.reduce((p, x) => p + x, 0) / vs.length : NaN,
      I,
      P: sum(bats.map((x) => x.P)),
      rem: remS,
      capTot: capS > 0 ? capS : NaN,
      soc: capS > 0 ? (remS / capS) * 100 : socs.length ? socs.reduce((p, x) => p + x, 0) / socs.length : NaN,
      mx: Math.max(...bats.map((x) => x.mx).filter(ok)),
      mn: Math.min(...bats.map((x) => x.mn).filter(ok)),
      mos: Math.max(...bats.map((x) => x.mos).filter(ok)),
      err: bats
        .map((x) => x.err)
        .filter(Boolean)
        .join(" · "),
      state: bats.every((x) => x.state === "offline")
        ? "offline"
        : I > 0.3
          ? "charging"
          : I < -0.3
            ? "discharging"
            : "idle",
    };
  }

  /* ------------------------------------------------------------ data */
  _nOf(b) {
    const n = +b.cells || +this._cfg.cells || 16;
    return n <= 8 ? 8 : 16;   // only 8 or 16 cells are supported (same as the editor)
  }
  _tOf(b) {
    const t = b.temps ?? this._cfg.temps;
    return t === undefined || t === null || isNaN(+t) ? 4 : Math.max(0, Math.min(4, +t));
  }
  _night() {
    const s = this._hass && this._hass.states["sun.sun"];
    return !!s && s.state === "below_horizon";
  }
  _compute() {
    const h = this._hass,
      c = this._cfg,
      V = c.victron || {};
    const val = (id) => {
      const s = id && h.states[id],
        v = num(s);
      return isNaN(v) ? null : v;
    };
    const bats = c.batteries.map((b) => {
      const n = this._nOf(b),
        S = (k, d) => h.states[this._id(b, k, d)],
        g = (k) => num(S(k)),
        nm = (k) => num(S(k, "number"));
      const cells = Array.from({ length: n }, (_, i) => g(`cell_voltage_${i + 1}`)),
        res = Array.from({ length: n }, (_, i) => g(`cell_resistance_${i + 1}`));
      const rsS = S("cell_resistance_1"),
        online = S("online_status", "binary_sensor"),
        V0 = g("total_voltage"),
        I = g("current"),
        P = (() => {
          const p = g("power");
          return isNaN(p) ? V0 * I : p;
        })();
      const valid = cells.filter((x) => !isNaN(x)),
        mx = isNaN(g("max_cell_voltage")) ? Math.max(...valid) : g("max_cell_voltage"),
        mn = isNaN(g("min_cell_voltage")) ? Math.min(...valid) : g("min_cell_voltage");
      const balS = S("balancer_bitmask") || S("balancing"),
        er = S("errors"),
        t = (k) => {
          const s = S(k);
          return s && s.state && !["", "unknown", "unavailable", "none", "None"].includes(s.state) ? s.state : "";
        };
      const off = online ? online.state !== "on" : isNaN(V0),
        sw = (k) => {
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
        sw: { charging: sw("charging"), discharging: sw("discharging"), balancer: sw("balancer") },
      };
    });
    let batt = val(V.power);
    if (batt === null) batt = bats.reduce((a, b) => a + (isNaN(b.P) ? 0 : b.P), 0);
    const vv = val(V.voltage),
      volts =
        vv !== null
          ? vv
          : (() => {
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
    const r = this.shadowRoot,
      $ = (k) => r.querySelector(`.main [data-k="${k}"]`),
      V = this._cfg.victron || {};
    const alerts = [];
    const grp = (this._grp = this._groupInfo());
    if (grp) this._sel = Math.min(this._sel || 0, grp.order.length - 1);
    const view = grp
      ? [{ b: d.bats[grp.order[this._sel || 0]], ci: grp.order[this._sel || 0] }]
      : d.bats.map((b, ci) => ({ b, ci }));
    d.bats.forEach((b) => {
      const tv0 = b.temps.filter((x) => !isNaN(x)),
        dm0 = (b.mx - b.mn) * 1000;
      if (b.state === "offline") alerts.push(tt("a_offline", { name: b.name }));
      if (b.err) alerts.push(`${b.name}: ${b.err}`);
      if (dm0 >= 60) alerts.push(tt("a_imb", { name: b.name, mv: dm0.toFixed(0) }));
      if (tv0.length && Math.max(...tv0) >= 45)
        alerts.push(tt("a_temp", { name: b.name, t: Math.max(...tv0).toFixed(0) }));
    });
    view.forEach(({ b, ci }, i) => {
      const G0 = grp
          ? this._aggr(
              grp.order.map((x) => d.bats[x]),
              grp,
            )
          : b,
        dmG = (G0.mx - G0.mn) * 1000;
      const card = r.querySelectorAll(".bc")[i],
        q = (k) =>
          card.querySelector(`[data-k="${k}"]`) ||
          (this._pp && this._pp.strip ? this._pp.strip.querySelector(`[data-k="${k}"]`) : null),
        dmv = (b.mx - b.mn) * 1000,
        tv = b.temps.filter((x) => !isNaN(x));
      const bcfg = this._cfg.batteries[ci],
        n = this._nOf(bcfg),
        lay = bcfg.layout || (ci === 1 ? "bottom-left" : "top-left"),
        M = (el, key, dom) => {
          if (el && !el.dataset.m) el.dataset.m = this._id(bcfg, key, dom);
        };
      {
        const s0 = q("bccells") || (this._pp && this._pp.i === i ? this._pp.strip : null),
          sg0 = n + "/" + (grp ? grp.order.length : 1) + "/" + lay;
        if (s0 && s0._n !== sg0) {
          s0._n = sg0;
          s0.innerHTML =
            packSvg(n, i, grp ? grp.order.length : 1, lay) + packOverlay(!!grp, bcfg.name || bcfg.entity_base);
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
          const html2 = grp.order
            .map((x, k) => `<option value="${k}">${k === 0 ? "Master" : "Slave " + k} · ${d.bats[x].name}</option>`)
            .join("");
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
      const balOn = !!b.balMask && b.state !== "offline",
        chip = q("bcchip");
      chip.className = "chip " + (balOn ? "balancing" : b.state);
      chip.textContent = balOn
        ? tt("st_balancing")
        : {
            charging: tt("st_charging"),
            discharging: tt("st_discharging"),
            idle: tt("st_idle"),
            offline: tt("st_offline"),
          }[b.state];
      setH(q("bcv"), fmt(b.V, 2) + "<small>V</small>");
      setH(q("bca"), fmt(b.I, 1) + "<small>A</small>");
      q("bca").style.color = b.I > 0.3 ? "var(--grn)" : b.I < -0.3 ? "var(--org)" : "";
      q("bcw").textContent =
        fmtW(b.P) +
        (b.I > 0.3 ? " · " + tt("st_charging") : b.I < -0.3 ? " · " + tt("st_discharging") : " · " + tt("st_idle"));
      setH(q("bcd"), fmt(dmv, 0) + "<small>mV</small>");
      q("bcd").style.color = dmv < 15 ? "var(--grn)" : dmv < 45 ? "var(--gold)" : "var(--red)";
      const strip = q("bccells") || (this._pp && this._pp.i === i ? this._pp.strip : null),
        st = b.state === "offline" ? "idle" : b.state;
      const sig = n + "/" + (grp ? grp.order.length : 1) + "/" + lay;
      if (strip._n !== sig) {
        strip._n = sig;
        strip.innerHTML =
          packSvg(n, i, grp ? grp.order.length : 1, lay) + packOverlay(!!grp, bcfg.name || bcfg.entity_base);
        this._elInit(strip);
        strip.addEventListener("click", (e) => {
          if (e.target.closest(".dsp")) {
            if (e.target.closest(".pwr")) this._toggleDisp(i);
            else this._openDisp(i, strip);
            return;
          }
        });
      }
      const span = Math.max(0.004, b.mx - b.mn),
        flat = dmv < 8,
        okV = b.cells.filter((x) => !isNaN(x)),
        vmax = Math.max(...okV),
        vmin = Math.min(...okV),
        fr = clamp((b.soc || 0) / 100, 0.04, 1);
      // highest / lowest cell: the BMS sensors max_voltage_cell / min_voltage_cell (1-based); computed from the voltages only when they are missing
      const sIdx = (x) => (!isNaN(x) && x >= 1 && x <= b.cells.length ? x - 1 : -1),
        imx = sIdx(b.mxI) >= 0 ? sIdx(b.mxI) : vmax > vmin ? b.cells.indexOf(vmax) : -1,
        imn = sIdx(b.mnI) >= 0 ? sIdx(b.mnI) : vmax > vmin ? b.cells.indexOf(vmin) : -1;
      strip._elSpeed = clamp(18 + Math.abs(b.I || 0) * 0.9, 18, 70);
      strip._elShow = clamp(0.35 + Math.abs(b.I || 0) / 45, 0.35, 1) * (this.classList.contains("lite") ? 0.5 : 1);
      strip.dataset.st = st;
      strip.style.setProperty("--spd", clamp(3.4 - Math.abs(b.P || 0) / 1100, 0.9, 3.4).toFixed(2) + "s");
      const mk = [];
      for (let k = 0; k < n; k++) if (b.balMask & (1 << k)) mk.push(k);
      const avg0 = okV.reduce((a, x) => a + x, 0) / (okV.length || 1);
      let don = -1,
        rec = -1;
      if (mk.length) {
        don = imx >= 0 ? imx : b.cells.indexOf(vmax);
        rec = imn >= 0 ? imn : b.cells.indexOf(vmin);
      } // balancing active: the lightning always goes from the highest cell (MAX) to the lowest one (MIN)
      if (don === rec) don = rec = -1;
      const pair = don >= 0 ? [don, rec] : [];
      const G = (sel2) => {
          const arr = [];
          strip.querySelectorAll(sel2).forEach((e) => (arr[+e.dataset.k] = e));
          return arr;
        },
        liqs = G(".liq"),
        tvs = G(".tv"),
        trs = G(".tr"),
        cls = G(".cell"),
        mkws = G(".mkw");
      for (let k = 0; k < n; k++) {
        const v = b.cells[k],
          t = clamp((v - b.mn) / span, 0, 1),
          col = isNaN(v) ? "#7fb58e" : k === imx ? "var(--mxc)" : k === imn ? "var(--mnc)" : "#7fb58e";
        liqs[k].style.setProperty("--c", col);
        liqs[k].style.transform = `translateY(${((1 - fr) * PK.wh).toFixed(1)}px)`;
        tvs[k].textContent = isNaN(v) ? "–" : v.toFixed(3);
        trs[k].textContent = fmtRb(b, b.res[k]);
        const isMx = k === imx,
          isMn = k === imn;
        tvs[k].classList.toggle("mx", isMx);
        tvs[k].classList.toggle("mn", isMn);
        cls[k].classList.toggle("mx", isMx);
        cls[k].classList.toggle("mn", isMn);
        mkws[k].classList.toggle("mx", isMx);
        mkws[k].classList.toggle("mn", isMn);
        mkws[k].style.transform =
          `translate(${mkws[k].dataset.cx}px,${(+mkws[k].dataset.y0 + 24 + (1 - fr) * PK.wh).toFixed(1)}px)`;
        cls[k].classList.toggle("bal", pair.includes(k));
        cls[k].classList.toggle("donor", k === don);
        cls[k].classList.toggle("recv", k === rec);
        cls[k].querySelector("title").textContent = `#${k + 1} · ${fmt(v, 3)} V · ${fmtRb(b, b.res[k])}`;
      }
      strip._id = i;
      strip._zp =
        don >= 0
          ? { a: [+cls[don].dataset.lx, +cls[don].dataset.ly], b: [+cls[rec].dataset.lx, +cls[rec].dataset.ly] }
          : null;
      const dsp = strip.querySelector(".dsp"),
        D = (k) => dsp.querySelector(`[data-d="${k}"]`),
        swOff = this._dpv(ci, b.dsp) === "off",
        dOn = grp ? !this._vOff : !swOff;
      dsp.classList.toggle("off", !dOn);
      dsp.classList.toggle("pwroff", swOff);
      dsp.classList.toggle("act", G0.I > 0.04);
      if (dOn) {
        const T = (k, s, col) => {
            const e = D(k);
            if (e.textContent !== s) e.textContent = s;
            if (col) e.setAttribute("fill", col);
          },
          soc = clamp(G0.soc || 0, 0, 100),
          L = soc * 2.4504,
          mn_ = Math.min,
          mx_ = Math.max,
          red = soc <= 10,
          st = dsp.style,
          f1 = (x) => x.toFixed(1),
          tot = !isNaN(G0.capTot) && G0.capTot > 0 ? G0.capTot : soc > 0 && !isNaN(G0.rem) ? (G0.rem / soc) * 100 : NaN,
          pct = tot > 0 && !isNaN(G0.rem) ? clamp((G0.rem / tot) * 100, 0, 100) : soc,
          rn = Math.ceil(pct / 5),
          Lc = mn_(245, rn * 12.25);
        T("v", fmt(G0.V, 2) + "V");
        T("a", fmt(G0.I, 1) + "A");
        T("soc", fmt(G0.soc, 0) + "%");
        T("np", String(grp ? grp.order.length : 1));
        T("pn", String(grp ? this._sel || 0 : 0));

        const full = 1.75 * Math.exp(-mx_(0, G0.I - 30) / 60),
          rst = String(Math.round(mx_(30, (full * 1000) / 20)));
        {
          const n1 = Math.max(0, rn);
          if (st.getPropertyValue("--rn") !== String(n1)) st.setProperty("--rn", n1);
          if (st.getPropertyValue("--rst") !== rst) st.setProperty("--rst", rst);
        } // ring: sectors to draw / ms per step (drawn by _ringTick)
        // Bat-Capacity = number.<bms>_total_battery_capacity (estimated from remaining / SoC only when that entity is missing)
        T(
          "cap",
          !isNaN(G0.capTot)
            ? G0.capTot.toFixed(1)
            : G0.soc > 0 && !isNaN(G0.rem)
              ? ((G0.rem / G0.soc) * 100).toFixed(1)
              : "–",
        );
        T("rem", fmt(G0.rem, 1));
        T("mx", fmt(G0.mx, 3) + "V");
        T("mn", fmt(G0.mn, 3) + "V");
        T("tp", isNaN(G0.mos) ? "–" : Math.round(G0.mos) + " °C");
        T("pw", fmt(Math.abs(G0.P) / 1000, 1));
        T("alm", G0.err ? tt("scr_alarmv") : tt("scr_normal"), G0.err ? "#ff4d4d" : GRN);
        T("chg", b.sw.charging ? tt("scr_on") : tt("scr_off"), b.sw.charging ? GRN : "#e0705f");
        T("dch", b.sw.discharging ? tt("scr_on") : tt("scr_off"), b.sw.discharging ? GRN : "#e0705f");
        T(
          "cap2",
          (!isNaN(b.capTot)
            ? b.capTot.toFixed(1)
            : b.soc > 0 && !isNaN(b.rem)
              ? ((b.rem / b.soc) * 100).toFixed(1)
              : "–") + "AH",
        );
        T("rem2", fmt(b.rem, 1) + "AH");
        T("pct2", fmt(b.soc, 0) + "%");
        T("vd", fmt(b.mx - b.mn, 3) + "V");
        T("a2", fmt(b.I, 1) + "A");
        T("tp2", isNaN(b.mos) ? "–" : String(Math.round(b.mos)));
        T("alm2", b.err ? tt("scr_alarmv") : tt("scr_normal"), b.err ? "#ff4d4d" : GRN);
        T("chg2", b.sw.charging ? tt("scr_on") : tt("scr_off"), b.sw.charging ? GRN : "#e0705f");
        T("dch2", b.sw.discharging ? tt("scr_on") : tt("scr_off"), b.sw.discharging ? GRN : "#e0705f");
        {
          const totB =
              !isNaN(b.capTot) && b.capTot > 0 ? b.capTot : b.soc > 0 && !isNaN(b.rem) ? (b.rem / b.soc) * 100 : NaN,
            pctB = totB > 0 && !isNaN(b.rem) ? clamp((b.rem / totB) * 100, 0, 100) : clamp(b.soc || 0, 0, 100),
            bn = Math.ceil(pctB / 20);
          if (dsp._bk !== bn) {
            dsp._bk = bn;
            const bcol = bn <= 2 ? "#e0302f" : bn <= 4 ? "#2f8cff" : "#2fd24a";
            dsp.querySelectorAll(".bb").forEach((e, k) => e.setAttribute("fill", k < bn ? bcol : "#1a0d0d"));
            dsp
              .querySelectorAll(".bo")
              .forEach((e) => e.setAttribute(e.classList.contains("bcap") ? "fill" : "stroke", bcol));
          }
        } // battery icon of the pack page (Rem-Capacity / Bat-Capacity in fifths); it flashes through CSS while charging
        b.cells.forEach((v, k) =>
          T("cv" + k, isNaN(v) ? "–" : fmt(v, 3) + "V", k === imx ? "#6f8cff" : k === imn ? "#ff4d4d" : GRN),
        );
      }
      if (this._pop && this._pop.i === i) this._syncPop(dsp);
      const avgV = okV.reduce((a, x) => a + x, 0) / (okV.length || 1),
        rv = b.res.filter((x) => !isNaN(x)),
        ravg = rv.length ? rv.reduce((a, x) => a + x, 0) / rv.length : NaN;
      const tr = tv.length
        ? Math.round(Math.min(...tv)) === Math.round(Math.max(...tv))
          ? Math.round(Math.min(...tv)) + " °C"
          : Math.round(Math.min(...tv)) + "–" + Math.round(Math.max(...tv)) + " °C"
        : "–";
      const E = (t, key, dom) => `<u data-m="${this._id(bcfg, key, dom)}">${t}</u>`;
      const row = (l, v, key, dom) =>
        `<div${key ? ` data-m="${this._id(bcfg, key, dom)}"` : ""}><span>${l}</span><b>${v}</b></div>`;
      setH(
        q("facts"),
        row(tt("remaining"), `${fmt(b.rem, 0)} Ah · ${fmt((b.rem * b.V) / 1000, 2)} kWh`, "capacity_remaining") +
          row(
            "Min",
            `<i>${E("#" + ((imn >= 0 ? imn : b.cells.indexOf(vmin)) + 1), "min_voltage_cell")}</i> · ${fmt(vmin, 3)} V`,
            "min_cell_voltage",
          ) +
          row(
            "Max",
            `<i>${E("#" + ((imx >= 0 ? imx : b.cells.indexOf(vmax)) + 1), "max_voltage_cell")}</i> · ${fmt(vmax, 3)} V`,
            "max_cell_voltage",
          ) +
          `<div class="tmp"><span>${tt("temperature")}</span><b>${[
            ...b.temps.map((t, i) =>
              E(`<small>T${i + 1}</small>${isNaN(t) ? "–" : fmt(t, 1) + " °C"}`, `temperature_sensor_${i + 1}`),
            ),
            E(`<small>MOS</small>${fmt(b.mos, 0)} °C`, "power_tube_temperature"),
          ].join("")}</b></div>` +
          row(
            tt("cycles_soh"),
            `${E(fmt(b.cyc, 0), "charging_cycles")} · ${E(fmt(b.soh, 0) + "%", "state_of_health")}`,
            "charging_cycles",
          ) +
          row(
            tt("balancing"),
            don >= 0
              ? `⚡ #${don + 1} → #${rec + 1}`
              : !b.sw.balancer
                ? tt("bal_off")
                : !isNaN(b.balStart) && vmax < b.balStart
                  ? `${tt("bal_wait")} <i>(max ${fmt(vmax, 3)} &lt; ${fmt(b.balStart, 2)} V)</i>`
                  : tt("bal_wait"),
            "balancer",
            "switch",
          ) +
          row(
            tt("starts_at"),
            isNaN(b.balStart)
              ? "–"
              : `${E(fmt(b.balStart, 2) + " V", "balance_starting_voltage", "number")}${isNaN(b.balTrig) ? "" : " · " + E("Δ ≥ " + fmt(b.balTrig * 1000, 0) + " mV", "balance_trigger_voltage", "number")}`,
            "balance_starting_voltage",
            "number",
          ) +
          row(
            `${tt("bms_hw")} · ${tt("bms_sw")} · ${tt("bms_time")}`,
            `${E(b.hw || "–", "hardware_version")} · ${E(b.swv || "–", "software_version")} · ${E(b.rt || "–", "total_runtime_formatted")}`,
          ),
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
      er.textContent = b.err ? "⚠ " + b.err : "";
      q("bcfoot").textContent =
        `${dmv < 15 ? tt("cells_ok") : dmv < 45 ? tt("cells_small") : tt("cells_bad")} ${tr !== "–" ? " · " + tr : ""}`;
      q("bcfoot").style.color = dmv < 45 ? "" : "var(--red)";
    });
    this._zapKick();
    this._elKick();
    this._ringTick();
    const S = (k) => V[k] && this._hass.states[V[k]],
      vt = r.querySelector('.main [data-k="vtxt"]');
    if (vt) {
      const al = S("alarm_low_battery"),
        warn = !!al && al.state === "Warning",
        st = S("inverter_state"),
        vi = num(S("current"));
      vt.parentNode.classList.toggle("warn", warn);
      setH(
        vt,
        `SmartShunt <b>${fmt(num(S("voltage")), 2)} V</b> · <b>${fmt(vi, 1)} A</b>${st ? ` · MultiPlus <b>${title(st.state)}</b>` : ""}${warn ? " · " + tt("lowbat_warn") : ""}`,
      );
      if (warn) alerts.push("MultiPlus-II: " + tt("lowbat_warn"));
    }
    setH($("alerts"), alerts.map((a) => `<div class="alert">⚠ ${a}</div>`).join(""));
  }

  /* ------------------------------------------------------------ electrons along the conductors */
  // every conductor already carries a hidden path (class "fl") drawn in the direction of the series string, B- -> B+. Electrons run along it with a
  // little random wobble: B- -> B+ while charging, B+ -> B- while discharging (opposite to the conventional current).
  _elInit(strip) {
    const NS2 = "http://www.w3.org/2000/svg",
      svg = strip.querySelector("svg"),
      layer = document.createElementNS(NS2, "g"),
      und = svg.querySelector(".und"),
      layerUnder = document.createElementNS(NS2, "g");
    strip._el = [];
    layer.setAttribute("class", "el");
    svg.insertBefore(layer, svg.querySelector(".zap"));
    layerUnder.setAttribute("class", "el");
    if (und) und.after(layerUnder);
    svg.querySelectorAll(".fl").forEach((path) => {
      const len = path.getTotalLength();
      if (!len) return;
      const cnt = clamp(Math.round(len / 14), 2, 6),
        stepL = 3,
        np = Math.ceil(len / stepL) + 2,
        pts = new Float32Array(np * 2);
      for (let k = 0; k < np; k++) {
        const pt = path.getPointAtLength(Math.min(len, k * stepL));
        pts[k * 2] = pt.x;
        pts[k * 2 + 1] = pt.y;
      } // the path is sampled once
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
          c,
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
      this._elT = requestAnimationFrame((tt) => this._elTick(tt));
      return;
    } // about 20 updates per second
    const dt = Math.min(0.05, (t - (this._elLast || t)) / 1000);
    this._elLast = t;
    let any = false;
    this.shadowRoot.querySelectorAll(".pk2").forEach((strip) => {
      const els = strip._el;
      if (!els) return;
      const st = strip.dataset.st,
        act = st === "charging" || st === "discharging";
      if (!act) {
        if (strip._elOn) {
          els.forEach((e) => e.c.setAttribute("opacity", "0"));
          strip._elOn = false;
        }
        return;
      }
      any = true;
      strip._elOn = true;
      const dir = st === "charging" ? 1 : -1,
        speed = strip._elSpeed || 30,
        show = strip._elShow ?? 1;
      els.forEach((e) => {
        if (e.thr > show) {
          e.c.setAttribute("opacity", "0");
          return;
        }
        e.v = clamp(e.v + (Math.random() - 0.5) * 0.06, 0.6, 1.5);
        e.s = (e.s + dir * speed * e.v * dt + e.len) % e.len;
        e.jx = e.jx * 0.9 + (Math.random() - 0.5) * 0.5;
        const fi = Math.min(e.np - 1.001, e.s / e.stepL),
          i0 = Math.floor(fi),
          fr = fi - i0,
          ax = e.pts[i0 * 2],
          ay = e.pts[i0 * 2 + 1],
          bx = e.pts[i0 * 2 + 2],
          by = e.pts[i0 * 2 + 3],
          p = { x: ax + (bx - ax) * fr, y: ay + (by - ay) * fr },
          tx = bx - ax,
          ty = by - ay,
          tl = Math.hypot(tx, ty) || 1;
        e.c.setAttribute("cx", (p.x - (ty / tl) * e.jx * 1.4).toFixed(2));
        e.c.setAttribute("cy", (p.y + (tx / tl) * e.jx * 1.4).toFixed(2));
        e.c.setAttribute("opacity", "0.95");
      });
    });
    if (any) this._elT = requestAnimationFrame((tt) => this._elTick(tt));
  }

  /* ------------------------------------------------------------ lightning between the two balancing cells */
  _zapKick() {
    const on = [...this.shadowRoot.querySelectorAll(".pk2")].some((e) => e._zp);
    if (on && !this._zapT) this._zapT = setTimeout(() => this._zapTick(), 20);
    if (!on) {
      clearTimeout(this._zapT);
      this._zapT = null;
      this.shadowRoot.querySelectorAll(".pk2 .zap").forEach((z) => (z.innerHTML = ""));
    }
  }
  // rhythm of a real discharge: 2-4 quick strikes that weaken, then a pause; the bolt takes a new shape on every strike
  _zapTick() {
    this._zapT = null;
    if (ST.editing > 0 || this._vis === false) return;
    const now = performance.now();
    let active = false,
      still = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.shadowRoot.querySelectorAll(".pk2").forEach((strip) => {
      const pr = strip._zp,
        zap = strip.querySelector(".zap");
      if (!zap) return;
      if (!pr) {
        if (zap.innerHTML) zap.innerHTML = "";
        return;
      }
      active = true;
      const z = (strip._zs = strip._zs || { next: 0, left: 0, step: 0, fade: 0 });
      if (now >= z.next) {
        if (z.left <= 0) {
          z.left = 2 + Math.floor(Math.random() * 3);
          z.step = 0;
        }
        z.left--;
        const k = [1, 0.7, 0.95, 0.5, 0.32][Math.min(z.step++, 4)] * (0.85 + Math.random() * 0.3);
        zap.style.opacity = 1;
        zap.innerHTML = this._bolt(pr.a, pr.b, k, strip._id);
        z.next = now + (still ? 1500 : z.left > 0 ? 45 + Math.random() * 50 : 420 + Math.random() * 1000);
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
    const rnd = (x) => (Math.random() * 2 - 1) * x,
      L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    const jag = (p, q, d, depth, out) => {
      if (!depth) {
        out.push(q);
        return;
      }
      const m = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2],
        nx = -(q[1] - p[1]),
        ny = q[0] - p[0],
        nl = Math.hypot(nx, ny) || 1,
        o = rnd(d),
        mm = [m[0] + (nx / nl) * o, m[1] + (ny / nl) * o];
      jag(p, mm, d / 2, depth - 1, out);
      jag(mm, q, d / 2, depth - 1, out);
    };
    const path = (pts) => "M" + pts.map((q) => q[0].toFixed(1) + " " + q[1].toFixed(1)).join(" L");
    const main = [a];
    jag(a, b, Math.min(34, L * 0.2), 5, main);
    let forks = "";
    for (let i = 3; i < main.length - 4; i += 2 + Math.floor(Math.random() * 5))
      if (Math.random() < 0.6) {
        const p = main[i],
          q = main[Math.min(main.length - 1, i + 2)],
          ang = Math.atan2(q[1] - p[1], q[0] - p[0]) + (Math.random() < 0.5 ? -1 : 1) * (0.4 + Math.random() * 0.6),
          len = Math.min(70, L * (0.14 + Math.random() * 0.22)),
          e = [p[0] + Math.cos(ang) * len, p[1] + Math.sin(ang) * len],
          pts = [p];
        jag(p, e, len * 0.32, 3, pts);
        forks += path(pts) + " ";
      }
    let sparks = "";
    for (let i = 0; i < 7; i++) {
      const t = Math.random() * 6.283,
        r1 = 3 + Math.random() * 3,
        r2 = r1 + 5 + Math.random() * 9;
      sparks += `M${(b[0] + Math.cos(t) * r1).toFixed(1)} ${(b[1] + Math.sin(t) * r1).toFixed(1)} L${(b[0] + Math.cos(t) * r2).toFixed(1)} ${(b[1] + Math.sin(t) * r2).toFixed(1)} `;
    }
    const st = (w, col, o, f) =>
      `fill="none" stroke="${col}" stroke-width="${w}" stroke-opacity="${(o * k).toFixed(2)}" stroke-linecap="round" stroke-linejoin="round"${f ? ` filter="url(#zg${id})"` : ""}`;
    return (
      `<path d="${path(main)}" ${st(8, "#a99bc4", 0.5, 1)}/>${forks ? `<path d="${forks}" ${st(4, "#a99bc4", 0.35, 1)}/>` : ""}<circle cx="${b[0]}" cy="${b[1]}" r="9" fill="#c9b8ee" fill-opacity="${(0.55 * k).toFixed(2)}" filter="url(#zg${id})"/>
      <circle cx="${a[0]}" cy="${a[1]}" r="6" fill="#c9b8ee" fill-opacity="${(0.4 * k).toFixed(2)}" filter="url(#zg${id})"/>` +
      `<path d="${path(main)}" ${st(2.6, "#e4d9fb", 0.9)}/>${forks ? `<path d="${forks}" ${st(1.1, "#e4d9fb", 0.7)}/>` : ""}<path d="${path(main)}" ${st(1, "#ffffff", 1)}/>
      <path d="${sparks}" ${st(0.9, "#ffffff", 0.9)}/>`
    );
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
      const n = +d.style.getPropertyValue("--rn") || 0,
        st = +d.style.getPropertyValue("--rst") || 75,
        act = d.classList.contains("act");
      if (act && n) {
        if (!d._nx || now >= d._nx) {
          d._c = d._c >= n ? 1 : (d._c || 0) + 1;
          d._nx = now + st;
        }
        next = Math.min(next, d._nx);
      } else d._c = 0;
      const c = !n ? 0 : act ? Math.min(d._c, n) : n,
        key = c + "/" + n;
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
    const a = strip.getBoundingClientRect(),
      ph = document.createElement("div");
    ph.style.height = a.height + "px";
    pkw.insertBefore(ph, strip);
    const bk = html(
      `<div class="ppopbk"><button class="dpx" title="${tt("close")}">✕</button><div class="pp"></div></div>`,
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
    const s = from.width / b.width,
      dx = from.left + from.width / 2 - (b.left + b.width / 2),
      dy = from.top + from.height / 2 - (b.top + b.height / 2),
      small = { transform: `translate(${dx}px,${dy}px) scale(${s})` },
      big = { transform: "none" };
    bk.animate(
      open
        ? [{ backgroundColor: "rgba(0,0,0,0)" }, { backgroundColor: "rgba(0,0,0,.78)" }]
        : [{ backgroundColor: "rgba(0,0,0,.78)" }, { backgroundColor: "rgba(0,0,0,0)" }],
      { duration: 1000, fill: "both" },
    );
    const an = strip.animate(open ? [small, big] : [big, small], {
      duration: 1000,
      easing: "cubic-bezier(.25,.6,.2,1)",
      fill: "both",
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
    const ci = this._grp ? this._grp.order[this._sel || 0] : i,
      sid = this._id(this._cfg.batteries[ci], "display_always_on", "switch"),
      ss = this._hass.states[sid];
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
    if (cur === p.want || performance.now() - p.t > 6000) {
      delete this._dp[i];
      return cur;
    }
    return p.want;
  } // show the new screen state at once; HA confirms a moment later
  _openDisp(i, strip) {
    ST.lang = this._lang || ST.lang;
    this._closeDisp();
    const src = strip.querySelector(".dsp"),
      bk = html(
        `<div class="dpopbk"><button class="dpx" title="${tt("close")}">✕</button>
          <div class="pk2 dp">
            <svg class="dpsvg" viewBox="0 0 610 423">
            </svg>
            <div class="dph">${tt("popup_hint")}</div>
          </div>
        </div>`,
      );
    const svg = bk.querySelector("svg");
    svg.innerHTML = src.outerHTML;
    svg.firstChild.removeAttribute("transform");
    svg.querySelectorAll("title").forEach((t) => t.remove());
    {
      const cp = svg.querySelector("clipPath"),
        gl = svg.querySelector(".gl");
      if (cp && gl) {
        cp.id += "P";
        gl.setAttribute("clip-path", `url(#${cp.id})`);
      }
      svg.querySelectorAll("clipPath rect, .dsp > rect:first-of-type").forEach((e) => {
        e.setAttribute("rx", 15);
        e.setAttribute("ry", 15);
      });
    } // own clip (the original id belongs to the small screen) and the same corner radius as the frame
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
        if (go.dataset.pk !== undefined) {
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
    const dp = bk.querySelector(".dp"),
      a = src.getBoundingClientRect(),
      b = dp.getBoundingClientRect();
    if (!dp.animate || !a.width || matchMedia("(prefers-reduced-motion:reduce)").matches) {
      done && done();
      return;
    }
    const s = a.width / b.width,
      dx = a.left + a.width / 2 - (b.left + b.width / 2),
      dy = a.top + a.height / 2 - (b.top + b.height / 2),
      small = { transform: `translate(${dx}px,${dy}px) scale(${s})` },
      big = { transform: "none" },
      o = { duration: 1000, easing: "cubic-bezier(.25,.6,.2,1)", fill: "both" };
    bk.animate(
      open
        ? [{ backgroundColor: "rgba(0,0,0,0)" }, { backgroundColor: "rgba(0,0,0,.78)" }]
        : [{ backgroundColor: "rgba(0,0,0,.78)" }, { backgroundColor: "rgba(0,0,0,0)" }],
      { duration: 1000, fill: "both" },
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
    const base = this._cfg.batteries[i],
      list = [
        ["charging", "⚡ " + tt("sw_charge"), tt("sw_charge_n")],
        ["discharging", "🔌 " + tt("sw_discharge"), tt("sw_discharge_n")],
        ["balancer", "⚖ " + tt("sw_balance"), tt("sw_balance_n")],
      ];
    if (this._hass && this._hass.states[this._id(base, "heating", "switch")])
      list.push(["heating", "🔥 " + tt("sw_heat"), tt("sw_heat_n")]);
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
    const b = this._cfg.batteries[i],
      id = this._id(b, k, "switch"),
      st = this._hass.states[id],
      on = !!st && st.state === "on";
    ct.innerHTML = "";
    const box = html(
      `<div class="confirm"><span>${tt(on ? "confirm_off" : "confirm_on", { what: nm, name: "<b>" + (b.name || b.entity_base) + "</b>" })}</span>
        <button class="yes">${tt(on ? "yes_off" : "yes_on")}</button>
        <button class="no">${tt("cancel")}</button>
      </div>`,
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
    box._t = setTimeout(back, 8000);
  }

  _update() {
    if (!this._built || !this._hass || (ST.editing > 0 && this._shown) || this._vis === false) return;
    ST.lang = this._lang || ST.lang;
    const d = (this._data = this._compute());
    const sig = this._hass
      ? Object.values(this._cfg.victron || {})
          .concat((this._cfg.batteries || []).map((b) => this._id(b, "heating", "switch")))
          .map((id) => {
            const x = id && this._hass.states[id];
            return x ? x.state : "";
          })
          .join("|") + JSON.stringify(d)
      : "";
    if (sig && sig === this._dsig && this._shown && !this._pop && !this._pp) return;
    this._dsig = sig;
    this._updSimple(d);
    this._updVictron();
    this.style.minHeight = "";
    this._shown = true;
  }
}
customElements.define("jk-bms-battery-card", JkBatteryCard);
