## Copilot Instructions (Concise Guide)

### Big Picture
- Hugo static site using the Hugo Blox "Academic CV" template.
- Content-driven architecture: Markdown bundles under `content/`; theme/layouts in `layouts/`; config in `config/_default/`.
- Build artifacts go to `public/` and are deployed via Netlify with Pagefind search indexing.

### Core Workflows
- Dev server: `hugo server --disableFastRender --bind=127.0.0.1 --port=1313`.
- Production build: `hugo --gc --minify -b $URL && npx pagefind --source 'public'` (Netlify).
- Preview/branch deploys: use `--buildFuture` and set base to `$DEPLOY_PRIME_URL`.
- Hugo version pinned: 0.136.5 (see `hugoblox.yaml`, `netlify.toml`). Match locally.

### Files & Conventions
- `config/_default/hugo.yaml`: global site settings (permalinks, taxonomies, outputs).
- `config/_default/params.yaml`: site parameters used by templates (themes, math, code, toggles).
- `content/`: sections (`post/`, `event/`, `project/`, `sharing/`, etc.). Use YAML front matter with `title`, `summary`, `date`, `authors`, `tags`, `categories`, `image.caption`.
- `layouts/` and `layouts/partials/`: customize UI and shortcodes. Prefer shortcodes over raw HTML.
- `assets/`: Hugo Pipes processed assets; `static/`: copied verbatim. Do not edit `public/` (generated).

### Project Patterns
- Content-first edits in `content/`; layout/theme tweaks in `layouts/` and `config/_default/`.
- Pagefind index must run after builds: `npx pagefind --source 'public'`.
- Netlify env uses `HUGO_ENABLEGITINFO=true` and `HUGO_ENV=production` which can affect GitInfo-based templates.

### Examples (do-this-first)
- Start local preview: `hugo server --disableFastRender --bind=127.0.0.1 --port=1313`.
- Local prod-like build: `hugo --gc --minify -b http://example.com && npx pagefind --source 'public'`.
- Update modules if editing `go.mod`: `hugo mod get` or `hugo mod tidy`.

### Formatting-Only Mode (for blog content)
- Preserve the user's exact words; do not paraphrase or summarize.
- Do not invent metadata: only include front matter keys explicitly provided by the user.
- Do not add authors, tags, categories, summary, image captions unless the user specifies them.
- Keep the language as written (no translation); retain line breaks and punctuation.
- Convert bare URLs to Markdown links; keep any headings or lists exactly as the user wrote.
- Respect the section path the user gives (e.g., `post/` or `sharing/`). If not provided, ask which section and date/slug.
- Images: use only the filenames/paths the user supplies. Do not add alt text beyond their wording.
 - Emphasis (on request): bold obvious key terms to improve readability while preserving wording. Focus on product names (e.g., SendGrid Email API), settings/permissions (e.g., Mail Send/FULL, Stats/READ), and key actions (e.g., send Email, Email Quota). Avoid over-emphasis (aim for 1–2 bold terms per line) and do not add new words.

#### Emphasis Example
- Before: 最近開始認真地使用 SendGrid Email API 來send Email
- After: 最近開始認真地使用 **SendGrid Email API** 來**send Email**

- Before: - Mail Send - FULL
- After: - **Mail Send** - **FULL**

### New Post Scaffold (minimal)
- Path: use the section and date/slug the user specifies, e.g. `content/post/YYYY/YYYY-MM-DD-slug/index.md` or `content/sharing/YYYY/YYYY-MM-DD-slug/index.md`.
- Front matter: include only fields the user provides. Do not add defaults.
  ```yaml
  ---
  title: "<user-provided>"
  date: <user-provided>
  # Optional fields below appear only if provided by the user:
  # summary:
  # authors:
  # tags:
  # categories:
  # image:
  #   caption:
  # draft:
  ---
  ```
- Place images next to `index.md` or under `assets/media/` if the user asked. Use their provided relative paths.

### Format Existing Post (normalize content)
- Trigger phrases: "format this blogpost", "format this markdown", or "format the content of <path> to match existing posts".
- Scope: content-only formatting. Do not change, add, remove, or infer front matter keys unless explicitly instructed.
- Rules (apply consistently across all posts):
  - Preserve the user's exact words; do not paraphrase or translate.
  - Insert blank lines between logical paragraphs for readability.
  - Normalize lists: use `-` for bullets, one item per line; add a blank line before and after lists.
  - Convert bare URLs to Markdown links, preserving the original text.
  - Wrap provided code in fenced blocks (```lang ... ```), detecting language when obvious (e.g., `bash`, `powershell`, `json`, `tsql`). If unsure, use plain fenced blocks without a language hint.
  - Keep headings exactly as written; do not add or remove titles in the body to mirror front matter.
  - Images: keep exactly as provided; do not add alt text beyond the user's wording; do not change paths.
  - Maintain YAML front matter as-is: order and spacing can be left unchanged unless the user requests an order; keep `date` in ISO format (YYYY-MM-DD or YYYY-MM-DDThh:mm:ssZ) as provided.
  - For bundle files (`.../index.md`), ensure only one front matter block at the top and no additional `---` separators in the body.
- Path handling:
  - If the file is already a bundle (e.g., `content/post/YYYY/YYYY-MM-DD-slug/index.md`), keep its location and slug unchanged.
  - If the file is a single `.md` under `content/post/`, do not move it unless the user asks; only format the content.
- Quick usage examples:
  - "Format the content of `content/post/2026/2026-01-22-sendgrid-api-setup/index.md` following the existing post pattern."
  - "Normalize lists, link bare URLs, and fence any code blocks in `content/post/2009-03-29.md` without changing front matter."

### Paste-and-Format Workflow (auto-fill mode)
- Trigger phrase: when the user says "create a blogpost" and provides a path like `/2026/2026-01-22-sendgrid-api-setup.md` plus content.
- Section: if not specified, assume `post`; otherwise use the provided section.
- File location: create `content/<section>/<YEAR>/<YYYY-MM-DD-slug>/index.md`.
- Auto-fill front matter (only in this mode):
  - `title`: if not provided, Title-Case the slug from filename; otherwise use the provided title exactly.
  - `date`: derive from filename `YYYY-MM-DD`.
  - `authors`: set to `[admin]` unless the user specifies otherwise.
  - `summary`: generate a 1–2 sentence summary from the provided content (prefer the first paragraph). Do not add new facts; use the same language as the content.
  - `tags`: derive 3–6 concise keywords present in the content (use exact wording, lowercase, hyphenate multi-word phrases as they appear).
  - `categories`: choose 1–2 higher-level topics inferred from content (prefer nouns already present in the text).
- Content rules: paste the user's content verbatim, preserve headings/lists/line breaks; convert bare URLs to Markdown links; do not paraphrase.
  - Readable formatting (without changing wording):
    - Insert blank lines between logical paragraphs.
    - Normalize lists using `-` or numbered lists and ensure a blank line before/after lists.
    - Wrap any provided code in fenced blocks (```lang ... ```), detecting language when obvious.
    - Keep image placeholders as-is unless a real path is provided; do not invent alt text.
    - Do not add headings, emojis, or additional sentences.
- Example:
  - Request: "Create a blogpost /2026/2026-01-22-sendgrid-api-setup.md with the following content: ..."
  - Result path: `content/post/2026/2026-01-22-sendgrid-api-setup/index.md` with front matter auto-filled per above and body identical to provided content.

### Gotchas
- Rendering differences? Verify Hugo version and env flags (`HUGO_ENABLEGITINFO`, `HUGO_ENV`).
- CSS not applying? Check assets pipeline (`assets/`) and purge configs.
- Missing search? Ensure build succeeded and Pagefind ran against `public/`.

### Integrations
- Netlify: see `netlify.toml` (builds, plugin `netlify-plugin-hugo-cache-resources`).
- Hugo modules: managed via `go.mod`. Network required if modules change.

If anything is unclear or you need deeper examples (front matter variants, shortcodes, or template entry points), ask and we’ll expand this guide.
