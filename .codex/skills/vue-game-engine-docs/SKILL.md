---
name: vue-game-engine-docs
description: Use when updating @javleds/vue-game-engine component documentation, README component indexes, repository-only screenshots, or the Playwright screenshot examples for exported Vue components. Triggers when the user asks to update docs, component docs, gallery screenshots, README indexing, bilingual English/Spanish component documentation, or to validate docs after component changes.
---

# Vue Game Engine Docs

Use this skill for repository documentation of reusable components in `@javleds/vue-game-engine`.

## Scope

Documentation and screenshot tooling are repository-only assets:

- Component docs: `docs/components/*.md`
- Screenshot PNGs: `docs/assets/components/*.png`
- Screenshot app/tooling: `docs/screenshots/`
- Public package contents: controlled by `package.json#files`

Do not add `docs` or `docs/screenshots` back to `package.json#files`. Consumers installing `@javleds/vue-game-engine` from npm should receive the built library, package READMEs, and license only.

## Component Docs Workflow

When a component is added or changed:

1. Inspect the component in `src/components/*.vue` and its export in `src/index.ts`.
2. Update or create `docs/components/EngineComponentName.md`.
3. Keep the component indexed in `docs/components/README.md`.
4. Keep both package READMEs indexed:
   - `README.md` in English.
   - `README.es.md` in Spanish.
5. README component links should point to GitHub `docs/components/...` URLs because `docs/` is not packaged in npm.

Each component doc should include:

- Screenshot image at the top: `../assets/components/EngineComponentName.png`
- English usage section.
- Spanish usage section.
- Props table when props exist.
- Events table when events exist.
- Slots table when slots exist.
- Type snippets when exported types matter.
- A concise usage example.
- Bottom section named exactly `## Screenshot Code / Codigo de la Captura`.

## Screenshot Code Blocks

The screenshot code block must be a minimal Vue SFC for the component shown in the screenshot:

- Use `script setup lang="ts"`.
- Import only the documented component, necessary Vue helpers, exported types, and `installTurnEngineComponentStyles`.
- Include only the mock state needed by that component.
- Include only the template for that component.
- Include scoped CSS necessary to reproduce the screenshot presentation.
- Avoid copying the full screenshot gallery app into each component doc.

## Screenshot Tooling Workflow

The source used to generate screenshots lives in `docs/screenshots/`.

When component markup, props, slots, or visual state change:

1. Update the relevant example in `docs/screenshots/src/main.ts`.
2. Update `docs/screenshots/src/theme.css` only when screenshot presentation needs to change.
3. Re-run:

```bash
npm run docs:screenshots
```

4. Verify the matching PNG in `docs/assets/components/` was regenerated.
5. If sandbox blocks local server or Chrome launch, rerun the same command with escalated permissions.

The screenshot script should remain self-contained: it starts Vite, launches Playwright, captures `[data-shot="EngineComponentName"]`, and shuts down the server.

## Validation

After documentation or screenshot-tooling changes, run:

```bash
npm run build
npm --cache /private/tmp/vue-game-engine-npm-cache pack --dry-run
```

The dry-run output must not include files under `docs/`.

Also check:

```bash
rg "Screenshot Code / Codigo de la Captura" docs/components -n
```

Every `docs/components/Engine*.md` file should have one matching section.
