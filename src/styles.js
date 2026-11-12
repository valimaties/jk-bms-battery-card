/* ============================================================== styles */
export const CSS = `
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
  /* switch buttons: one grid, so all of them always have the same width and the same layout; the number of columns follows the width of the battery card (see the container queries below) */
  .ctrl {
    display: grid;
    grid-template-columns: repeat(var(--n, 3), minmax(0, 1fr));
    gap: 8px;
  }
  .ctrl .confirm {
    grid-column: 1 / -1;
  }
  .sw {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    cursor: pointer;
    text-align: left;
    line-height: 1.2;
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
    flex: none;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 1px;
    background: #555;
  }
  .sw .ic {
    flex: none;
    font-style: normal;
  }
  .sw .tx {
    min-width: 0;
    overflow-wrap: anywhere;
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
    grid-template-columns: repeat(auto-fit, minmax(54px, 1fr));
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
  /* 4 buttons: 4 in a row, then 2 + 2, then one under the other; 3 buttons: 3 in a row, then 2 + the last one full width, then one under the other */
  @container bc (max-width: 520px) {
    .ctrl[style*="--n: 4"] {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  @container bc (max-width: 400px) {
    .ctrl[style*="--n: 3"] {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .ctrl[style*="--n: 3"] .sw:last-child {
      grid-column: 1 / -1;
    }
  }
  @container bc (max-width: 250px) {
    .ctrl {
      grid-template-columns: minmax(0, 1fr) !important;
    }
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
