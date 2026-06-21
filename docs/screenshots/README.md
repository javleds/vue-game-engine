# Component Screenshot Tooling

This directory is repository-only tooling. It is intentionally excluded from the npm package by `package.json#files`.

Run it after installing dev dependencies:

```bash
npm run docs:screenshots
```

The script starts a temporary Vite server, mounts the exported Vue components with sample state, captures each `[data-shot]` section with Playwright, writes PNG files to `docs/assets/components`, and then shuts the server down.

By default it tries to launch the installed Google Chrome channel. Set `PLAYWRIGHT_CHROME_CHANNEL` to use another Playwright channel:

```bash
PLAYWRIGHT_CHROME_CHANNEL=chromium npm run docs:screenshots
```
