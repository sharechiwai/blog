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

## New blog post template (how to create a post)

Add this short template and rules so automated agents (like Copilot) and contributors produce consistent posts.

- Location and filename
  - Put posts under `content/post/`.
  - Use a dated subfolder for year and a slugged folder for the post, e.g.:
    - `content/post/2025/2025-08-10-how-to-check-python-available-on-ur-device/index.md`
  - Filenames: use `index.md` inside the post bundle folder. Folder and slug should be lower-case, hyphen-separated, ASCII-friendly.

- Front matter (required fields)
  - Use YAML front matter with at least these fields:

```yaml
---
title: "Descriptive post title"
summary: "Short one-line summary used on index and social cards"
date: 2025-08-10
authors:
  - admin
tags:
  - Tag1
  - Tag2
categories:
  - Category1
image:
  caption: "Optional image caption or credit"
---
```

- Recommended optional fields
  - `draft: true` to keep a post out of production builds until ready.
  - `aliases:` to add legacy URLs (if you move or rename posts).

- Content and media
  - Put post-level images either in the same bundle folder (next to `index.md`) or under `assets/media/`.
  - Use relative paths for images in the bundle, e.g. `![Caption](vscode-context-menu.png)` when the image is in the same folder.
  - Prefer Hugo shortcodes for rich content when available (see `layouts/shortcodes/`).

- Slug / permalink behavior
  - The site uses the date and slug to build permalinks. Keep the date in front-matter and use a slug matching the folder name.

- Preview & build (developer workflow)
  - Start dev server:
    - `hugo server --disableFastRender --bind=127.0.0.1 --port=1313`
  - Local production-like build and index rebuild:
    - `hugo --gc --minify -b http://example.com && npx pagefind --source 'public'`

- Small checklist for new posts
  1. Create `content/post/YYYY/YYYY-MM-DD-slug/index.md` and add front matter.
  2. Add images to the same folder or `assets/media/` and verify paths.
  3. Run `hugo server` and check the post renders and metadata (title, summary, author).
  4. If ready for publish, remove `draft: true` (or ensure it's absent) and commit.

- Examples
  - Existing posts follow this pattern, e.g. `content/post/2025/2025-08-10-how-to-check-python-available-on-ur-device/index.md` and `content/post/2025/2025-08-06-vs-code-context-menu-missing/index.md` (see `content/post/2025/` for samples).

If you'd like, I can also add a small helper script/template file under `scripts/` (or a `post_template.md`) that contributors can copy to create new posts consistently.

## How to ask Copilot to scaffold a new post

If you want Copilot (or any automated agent) to create a new post scaffold for you, use this exact filename/slug format so the tooling and humans can follow the same pattern.

- Provide a folder name formatted as: `YYYY-MM-DD-your-slug` (e.g. `2025-08-15-github-copilot-generate-blog-post`).
- The agent will create a folder under `content/post/<YEAR>/` (e.g. `content/post/2025/2025-08-15-github-copilot-generate-blog-post`) and add an `index.md` file inside it.
- The `index.md` will contain YAML front matter with placeholders you can fill in or ask the agent to populate for you.

Example prompt you can give the agent (exactly):

"Create a new blog post scaffold: 2025-08-15-github-copilot-generate-blog-post. Leave placeholders for TITLE, SUMMARY, DATE, AUTHORS, TAGS, CATEGORIES and include content sections (Introduction, Steps, Conclusion)."

What the scaffold will contain (index.md example):

```md
---
title: "TITLE"
summary: "SUMMARY"
date: 2025-08-15
authors:
  - admin
tags:
  - TAG1
  - TAG2
categories:
  - Category1
image:
  caption: "IMAGE CAPTION"
draft: true
---

# Introduction

[Write a short introduction here.]

# Steps

1. Step one
2. Step two

# Conclusion

[Write a short conclusion here.]
```

The agent will create the folder and `index.md` scaffold exactly like the example. After that, you can either fill in the placeholders yourself or ask the agent to populate them from a short description.

## Intelligent blog post creation workflow

When the user asks for help creating a blog post with specific title and content, follow this enhanced workflow to generate a complete, well-formatted post:

### Step 1: Generate complete YAML front matter
- Use the provided title exactly as given by the user
- Generate an appropriate `summary` (1-2 sentences) based on the content
- Set the `date` to match the folder structure or current date
- Add `authors: [admin]` by default
- Generate relevant `tags` and `categories` based on the content topic
- Include `image: caption: ""` placeholder
- Set `draft: false` unless user specifies otherwise

### Step 2: Format the content using Markdown
- Preserve the user's exact wording and meaning
- Convert URLs to clickable Markdown links: `[example.com](https://example.com)`
- Add appropriate paragraph breaks for readability
- Use blockquotes `>` for introductory or highlighted statements
- Apply emphasis where it enhances readability:
  - **Bold** for key terms or important points
  - *Italics* for emphasis or tone
- Structure content with headers if appropriate

### Example transformation:
User provides:
```
title: 分享日常生活既體驗
content: 今日呢個blog post 是用來介紹我將用會sharechiwai.com 來分享...
```

Agent creates:
```yaml
---
title: "分享日常生活既體驗"
summary: "用 [sharechiwai.com](https://sharechiwai.com) 記錄與分享平日生活的體驗，方便回顧與保存記憶。"
date: 2025-08-13
authors:
  - admin
tags:
  - sharing
  - personal
  - life
categories:
  - sharing
image:
  caption: ""
draft: false
---

> 今日呢個blog post 是用來介紹我將用會[sharechiwai.com](https://sharechiwai.com) 來分享...
```

### Key principles:
1. **Never rewrite or paraphrase** the user's content - preserve their exact words
2. **Generate contextually appropriate** front matter fields
3. **Format for readability** using Markdown features
4. **Make URLs clickable** automatically
5. **Ask for confirmation** only if the content structure is unclear
