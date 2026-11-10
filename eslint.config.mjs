export default [
  {
    files: ["src/**/*.js", "build.mjs"],
    languageOptions: { ecmaVersion: 2022, sourceType: "module", globals: { window: "readonly", document: "readonly", console: "readonly", customElements: "readonly", HTMLElement: "readonly", fetch: "readonly", localStorage: "readonly", navigator: "readonly", setTimeout: "readonly", clearTimeout: "readonly", setInterval: "readonly", clearInterval: "readonly", requestAnimationFrame: "readonly", cancelAnimationFrame: "readonly", IntersectionObserver: "readonly", ResizeObserver: "readonly", CustomEvent: "readonly", Event: "readonly", getComputedStyle: "readonly", matchMedia: "readonly", performance: "readonly", location: "readonly", URL: "readonly", Image: "readonly", __CARD_VERSION__: "readonly", process: "readonly" } },
    rules: { "no-unused-vars": ["warn", { args: "none" }], "no-undef": "error" },
  },
];
