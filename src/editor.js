import { ECSS } from "./editor-styles.js";
import { CARDS, I18N, inPreview, loadLang, loadLangList, pickLang, tt } from "./i18n.js";
import { ST } from "./state.js";
import { grpOrder } from "./util.js";
import { VIC_EXTRA, VIC_TILES, discoverBatteries, discoverVictron } from "./victron.js";

/* ============================================================== editor */
/* order in a group: master first, then the slaves by their configured number (slave: N), the rest in list order */
export const lab = (n) =>
  ({
    title: tt("lbl_title"),
    cells: tt("lbl_cells"),
    temps: tt("lbl_temps"),
    glare: tt("lbl_glare"),
    language: tt("lbl_language"),
  })[n] || (String(n).startsWith("v_") ? "Victron – " + tt("vt_" + n.slice(2)) : n);
export const VIC_KEYS = [...VIC_EXTRA, ...VIC_TILES].map((t) => t.k);

export const stable = (o) =>
  JSON.stringify(o, (k, v) =>
    v && typeof v === "object" && !Array.isArray(v)
      ? Object.fromEntries(
          Object.keys(v)
            .sort()
            .map((x) => [x, v[x]]),
        )
      : v,
  );
export const cfgSig = (c) => {
  const { type, ...r } = c || {};
  return stable(r);
};
export class JkBatteryCardEditor extends HTMLElement {
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
  } // a card that sits in the editor preview becomes a stub
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
    if (sig === this._sig && this._config) return; // HA echoes back what we just emitted (maybe with another key order): keep the DOM, so typing keeps the focus
    this._sig = sig;
    this._config = { ...config, batteries: (config.batteries || []).map((b) => ({ ...b })) };
    if (this._hass) this._render();
  }
  set hass(h) {
    const first = !this._hass;
    this._hass = h;
    const t = performance.now();
    if (t - (this._ft || 0) > 10000) {
      this._ft = t;
      if (this._form) this._form.hass = h;
      if (this._vform) this._vform.hass = h;
    }
    if (first && this._config) this._render();
  } // every state change of HA used to re-render ~30 entity pickers: that froze the editor
  _dd(sel, root) {
    // a drop-down made of plain elements: it opens on click and only closes on a choice or a click elsewhere
    if (!root._ddc) {
      root._ddc = 1;
      root.addEventListener("click", () =>
        root.querySelectorAll(".ddl").forEach((x) => {
          x.hidden = true;
        }),
      );
    }
    const w = document.createElement("div"),
      b = document.createElement("button"),
      l = document.createElement("div");
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
    // debounced: one config-changed per pause, not one per keystroke (each one re-renders the card preview in HA)
    clearTimeout(this._et);
    this._et = setTimeout(() => {
      const cfg = JSON.parse(JSON.stringify(this._config));
      this._sig = cfgSig(cfg);
      this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: cfg }, bubbles: true, composed: true }));
    }, 150);
  }

  async _render() {
    if (!this._config) return;
    const root = this.shadowRoot || this.attachShadow({ mode: "open" }),
      token = (this._tok = (this._tok || 0) + 1),
      tok2 = token;
    ST.lang = pickLang(this._config.language, this._hass && this._hass.language);
    if (ST.lang !== "en" && !I18N[ST.lang])
      loadLang(ST.lang).then((ok) => {
        if (ok && tok2 === this._tok && !root.activeElement) this._render();
      });
    root.innerHTML = `<style>${ECSS}</style><div id="form"></div><h4>${tt("ed_batteries")}</h4><div id="bats"></div>
    <div class="row">
      <button class="btn" id="det">🔍 ${tt("ed_detect")}</button>
      <button class="btn ghost" id="add">${tt("ed_add")}</button>
    </div>
    <div class="hint" id="dh">
    </div>
    <h4>${tt("ed_victron")}</h4>
    <div class="row">
      <button class="btn ghost" id="vdet">🔍 ${tt("ed_vdetect")}</button>
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
    const bl = this._config.batteries,
      mi = bl.findIndex((x) => x.role === "master"),
      hasG = mi >= 0 && bl.length >= 2,
      ord = hasG ? grpOrder(bl, mi) : [];
    bl.forEach((b, i) => {
      const row = document.createElement("div"),
        opts = [...detected],
        pos = ord.indexOf(i);
      row.className = "bat";
      if (b.entity_base && !opts.find((d) => d.entity_base === b.entity_base))
        opts.push({ name: b.entity_base, entity_base: b.entity_base });
      const badge = !hasG
        ? `<span class="badge">${tt("ed_independent")}</span>`
        : pos === 0
          ? `<span class="badge m">Master</span>`
          : `<span class="badge s">Slave ${b.slave || pos}</span>`;
      const defId = `switch.${b.entity_base || "jk_bms_bms" + i}_display_always_on`,
        swIds = this._hass
          ? Object.keys(this._hass.states).filter((x) => x.startsWith("switch.") && /display/.test(x))
          : [];
      row.innerHTML = `<div class="bh"><span class="tt">${tt("ed_battery_n", { n: i + 1 })}</span>${badge}<button class="btn del" title="${tt("ed_delete")}">✕</button>
      </div>
      <div class="fg"><label class="fld"><span>${tt("ed_name")}</span><input class="nm" placeholder="${tt("ed_name_ph")}"></label>
      <label class="fld"><span>${tt("ed_entity")}</span>
        <select class="sel">
          <option value="">${tt("ed_choose")}</option>${opts.map((d) => `<option value="${d.entity_base}">${d.entity_base}</option>`).join("")}</select>
      </label>
      </div>
      <div class="fg"><label class="fld"><span>${tt("lbl_cells")}</span><select class="b-cells">${[
        ...new Set([8, 16]),
      ]
        .sort((x, y) => x - y)
        .map((v) => `<option value="${v}">${v}</option>`)
        .join("")}</select>
        </label>
        <label class="fld"><span>${tt("lbl_temps")}</span>
          <select class="b-temps">${[0, 1, 2, 3, 4].map((v) => `<option value="${v}">${v}</option>`).join("")}</select>
        </label>
        </div>
      <div class="fg"><label class="fld"><span>${tt("ed_cell1")}</span><select class="lay">${[
        ["top-left", tt("pos_tl")],
        ["top-right", tt("pos_tr")],
        ["bottom-left", tt("pos_bl")],
        ["bottom-right", tt("pos_br")],
      ]
        .map(([v, l]) => `<option value="${v}">${l}</option>`)
        .join("")}</select></label>
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
      const nm = row.querySelector(".nm"),
        sel = row.querySelector(".sel"),
        lay = row.querySelector(".lay"),
        role = row.querySelector(".role"),
        ds = row.querySelector(".ds");
      nm.value = b.name || "";
      sel.value = b.entity_base || "";
      lay.value = b.layout || (i === 1 ? "bottom-left" : "top-left");
      role.value =
        b.role === "master"
          ? "master"
          : b.slave
            ? "slave:" + b.slave
            : b.role === "slave"
              ? "slave:" + (pos > 0 ? pos : 1)
              : "";
      ds.value = (b.entities && b.entities.display_always_on) || (this._hass && this._hass.states[defId] ? defId : "");
      {
        const bc = row.querySelector(".b-cells"),
          bt = row.querySelector(".b-temps");
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
        const v = e.target.value,
          B = this._config.batteries;
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
        b.entities = { ...(b.entities || {}) };
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
    const ent = { entity: { domain: "sensor" } },
      c0 = this._config,
      slot = root.querySelector("#form");
    this._form = null;
    slot.innerHTML = `<div class="fg">
      <label class="fld"><span>${tt("lbl_title")}</span><input class="f-title" placeholder="${tt("title_default")}">
      </label>
    <label class="fld"><span>${tt("lbl_language")}</span><select class="f-lang"><option value="auto">${tt("lang_auto")}</option>${Object.entries(
      ST.langList || { en: "English", fr: "Français", de: "Deutsch", it: "Italiano", es: "Español", ro: "Română" },
    )
      .map(([v, l]) => `<option value="${v}">${l}</option>`)
      .join("")}</select></label></div>
    
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
        sel.innerHTML =
          `<option value="auto">${tt("lang_auto")}</option>` +
          Object.entries(list)
            .map(([v, l]) => `<option value="${v}">${l}</option>`)
            .join("");
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
      } catch (e) {} // only now the heavy entity pickers are needed
      if (token !== this._tok) return;
      const vf = document.createElement("ha-form");
      this._vform = vf;
      vf.schema = VIC_KEYS.map((k) => ({ name: "v_" + k, selector: ent }));
      vf.data = Object.fromEntries(VIC_KEYS.map((k) => ["v_" + k, (this._config.victron || {})[k] || ""]));
      vf.hass = this._hass;
      vf.computeLabel = (s2) => lab(s2.name);
      vf.addEventListener("value-changed", (e) => {
        e.stopPropagation();
        const d = e.detail.value,
          victron = {};
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
}
customElements.define("jk-bms-battery-card-editor", JkBatteryCardEditor);
