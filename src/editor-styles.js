export const ECSS = `
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
    content: "▾";
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
