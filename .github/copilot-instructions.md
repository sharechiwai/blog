## Repo overview (big picture)

- This site is a Hugo static site built from the Hugo Blox "Academic CV" starter. The repo contains content (Markdown), Hugo configuration under `config/_default/`, theme/layouts/partials under `layouts/` and static/public assets in `assets/` and `static/`.
- Build output is written to `public/` and deployed via Netlify (see `netlify.toml`). Hugo modules declared in `go.mod` provide theme/plugins (e.g. `blox-tailwind`, `blox-plugin-netlify`).

## Primary workflows (what you'll be asked to do)

- Local dev server: use Hugo's server to preview changes.
  - Example: `hugo server --disableFastRender` (Hugo v0.136.5 is specified in `hugoblox.yaml` and `netlify.toml`).
- Production build (what CI/Netlify runs):
  - Netlify build command: `hugo --gc --minify -b $URL && npx pagefind --source 'public'` (see `netlify.toml`).
  - For deploy previews and branch deploys Netlify uses `--buildFuture` and sets the base to `$DEPLOY_PRIME_URL`.

## Important files and conventions

- `config/_default/hugo.yaml` — main Hugo configuration (site title, permalinks, taxonomies, output formats). Modify here for global Hugo settings.
- `config/_default/params.yaml` — site parameters and feature toggles (themes, math, code highlighting). Many templates read this; use it to enable site features.
- `content/` — all site content in Hugo page bundles and sections. Posts live under `content/post/` and dated posts use subfolders by year.
- `layouts/partials/` and `layouts/` — theme templates. Small UI changes are often implemented here.
- `assets/` — pipeline assets processed by Hugo Pipes (CSS, JS, images used as resources).
- `public/` — generated site (committed here as a published snapshot) — treat as generated output; do not edit directly.
- `go.mod` / `go.sum` — Hugo modules used by the theme and plugins. If you add or update modules, run `hugo mod get` locally.

## Patterns and project-specific notes for AI agents

- Content-first: prefer making content changes in `content/` (Markdown + front matter). Example front matter uses `date`, `title`, `tags`, and `categories` — maintain YAML format and permalink structure.
- Shortcodes & widgets: site uses Hugo shortcodes and customized partials. When adding content, prefer shortcodes (see `layouts/shortcodes/`) over raw HTML where available.
- Search integration: repo uses Pagefind (`npx pagefind --source 'public'`) to generate client-side search indexes. Any change affecting public HTML should be followed by Pagefind run in the build.
- Static assets vs assets pipeline:
  - Use `assets/` when you want Hugo Pipes to process files (e.g. Tailwind, SASS).
  - Use `static/` for raw files that should be copied unchanged to the site root.
- Default Hugo version pinned: Hugo v0.136.5 — match this locally (via hugo binary or environment) to prevent unexpected differences in rendering.

## Commands the developer will run (concrete examples)

- Start dev server (watch mode):
  - `hugo server --disableFastRender --bind=127.0.0.1 --port=1313`
- Build for production locally (approximate Netlify command):
  - `hugo --gc --minify -b http://example.com && npx pagefind --source 'public'`
- Update modules (if you update go.mod):
  - `hugo mod get` (or `hugo mod tidy`) then rebuild.

## Debugging tips and gotchas for agents

- If pages render differently locally vs Netlify, confirm Hugo version and environment flags (HUGO_ENV, HUGO_ENABLEGITINFO). Netlify's `HUGO_ENABLEGITINFO=true` can alter GitInfo-based templates.
- When editing templates, clear Hugo cache or run with `--ignoreCache=false` if stale resources appear.
- If CSS or Tailwind classes don't apply, check `assets/` processing and confirm Tailwind config in `layouts` or top-level module.
- Pagefind requires the built `public/` directory; missing indexes are caused by build failures or a wrong base URL.

## Integration points & external services

- Netlify: `netlify.toml` controls build commands and plugins. The Netlify plugin `netlify-plugin-hugo-cache-resources` is configured.
- Pagefind: client-side search index generation via NPM (`pagefind`). Ensure Node.js and npm are available in CI.
- Hugo modules: themes and plugins are fetched via Go modules (`go.mod`). Network access required when modules change.

## When changing content vs layout — quick heuristic

- Content change: edit files under `content/`, `assets/media/` (images), `static/` for public static files.
- Layout/theme change: edit `layouts/`, `partials/`, or `assets/` (if affecting CSS/js pipeline), and update `config/_default/` if you change global behavior.

## Example PR checklist for small edits (useful to reproduce in tasks)

- Content PR: preview locally with `hugo server`; verify links and front matter; commit only content files.
- Layout PR: run full `hugo --gc --minify -b http://example.com` and `npx pagefind --source 'public'` to reproduce Netlify build; include screenshots of resulting pages in PR if visual change.

---

If anything above is unclear or you want more examples (e.g., common front-matter templates, important shortcodes, or which layouts are used for posts), tell me which area to expand and I'll iterate.
