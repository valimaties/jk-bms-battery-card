# Contributing

Thank you for your interest. Please keep in mind:

- This card is distributed **as is**, is tested only with the **JK BMS PB2A16S20P v19**, and is maintained on a best-effort basis. Pull requests are welcome but may be accepted, changed or declined at the maintainer's discretion, and may take a while to be reviewed.
- **Bugs:** open an issue with the card version, your BMS model and firmware, your Home Assistant version, the browser, and what you expected versus what you saw. A screenshot or the browser console log helps a lot.
- **Other BMS models:** support for them is not promised. If you make it work, a pull request is the best way to share it.

## Pull requests

1. Fork the repository and branch from `dev`.
2. The source is in `src/`. Build with `npm install` and `npm run build`; the result goes to `dist/`, which must be committed and up to date (CI checks it).
3. Keep the change small and focused, one topic per pull request, and describe what it changes and why.
4. Do not add personal data, entity names from your home or secrets to code, screenshots or examples.

By contributing you agree that your contribution is released under the [MIT License](LICENSE) of this project.
