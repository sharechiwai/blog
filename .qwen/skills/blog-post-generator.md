# Blog Post Generator Skill

A skill to help create and format blog posts for your Hugo-based blog.

## Core Workflow

This skill has **two distinct phases**, each with its own trigger:

### Phase 1: Create Boilerplate
Set up the post structure and file so the user can focus on writing.

**Trigger:** Any of these:
1. **Interactive chat:** "Create a blog post" (asks step-by-step)
2. **One-liner:** `Create a new post "Post Title xyz", date: "yyyy-mm-dd", tags: "tag1, tag2", categories: "cat1, cat2"` → creates file immediately, no chat

### Phase 2: Format Existing Content
Format a draft that the user has already written.

**Trigger:** "Format this post" or "Format [file-path]" or "Reformat @content/post/..."

**Flow:**
1. Read the target file
2. Apply formatting rules (see below)
3. Report changes made + missing image reminders

---

## Phase 1: Create Boilerplate

### Mode A: One-Liner (Fast, No Chat)

When the user provides all details in a single command, parse and create the file immediately.

**Supported format:**
```
Create a new post "Post Title", date: "yyyy-mm-dd", tags: "tag1, tag2", categories: "cat1, cat2"
```

**Parsing rules:**
- `title` → quoted or unquoted text after "post" or "about"
- `date` → `date: "YYYY-MM-DD"` or `date: YYYY-MM-DD`
- `tags` → comma-separated list after `tags:`, quoted or unquoted
- `categories` → comma-separated list after `categories:`, quoted or unquoted
- Everything else uses defaults

**Example inputs:**
```
Create a new post "High RAM usage on VMmemWSL", date: "2026-02-01", tags: "docker, wsl, memory", categories: "Docker, WSL"

Create a new post "如何設定 React Router", date: "2026-04-20", tags: "reactjs, routing", categories: "Frontend, React"

Create a new post "Fix Docker port binding", date: "2026-05-15"
```

**Example output for the first input above:**
1. Generate slug: `2026-02-01-docker-vmemwsl-high-ram`
2. Create folder: `content/post/2026/2026-02-01-docker-vmemwsl-high-ram/`
3. Write `index.md` with frontmatter
4. Report:

```
✅ Post created!
📁 content/post/2026/2026-02-01-docker-vmemwsl-high-ram/index.md

Frontmatter:
  Title: "High RAM usage on VMmemWSL"
  Date: 2026-02-01
  Tags: docker, wsl, memory
  Categories: Docker, WSL

Start writing your content!
```

### Mode B: Interactive Chat

When the user just says "Create a blog post" without enough details, ask step-by-step.

```
📝 Blog Post Generator
======================

Step 1/5: Basic Info
--------------------
🤖 Title of your blog post?
   (Required - can be in any language)

🤖 Publication date? (YYYY-MM-DD)
   (Required - determines folder structure)

[User provides title and date]

🤖 Slug: `2026-02-01-docker-vmemwsl-high-ram`

Step 2/5: Tags & Categories
--------------------
🤖 Tags? (comma-separated, optional)
🤖 Categories? (comma-separated, optional)

[User provides or skips with "no" / "skip" / Enter]

Step 3/5: Summary
--------------------
🤖 Summary? (optional, 1-2 sentences for SEO)

[User provides or skips]

Step 4/5: Options
--------------------
🤖 Draft? (Yes/No, default: No)
🤖 Featured? (Yes/No, default: No)
🤖 Featured image? (Yes/No, default: No)

[User provides or skips each]

Step 5/5: Confirm & Create
--------------------
🤖 Summary:
  Title: "..."
  Date: 2026-02-01
  Slug: 2026-02-01-...
  File: content/post/2026/2026-02-01-.../index.md
  Authors: [admin]
  Tags: ...
  Categories: ...
  Draft: false | Featured: false | Image: None

  ✅ Create? (Yes/No/Edit)

[User confirms]

🤖 File created! Start writing your content.
```

**Key design principle:** After creation, **stop**. Don't ask about content. The user will write it themselves and come back for formatting.

---

## Phase 2: Format Existing Content

When the user says "format this post" or points to a file, apply these rules:

### Auto-Detection
- If user says "format this post" → find the most recently modified `index.md` in `content/post/`
- If user provides a path or `@file` reference → use that file
- If user pastes draft content → format it inline and show the result

### Formatting Rules

1. **Frontmatter cleanup**
   - Remove extra blank lines between fields
   - Ensure consistent field order: title → date → authors → image (if any) → summary → tags → categories → draft → featured
   - Remove fields that are at their default values (e.g., don't include `draft: false` if it's already false — but keep it if the user set it explicitly)

2. **Image placeholders**
   - Detect patterns like `// add image file`, `// image file`, `// TODO: image`, `[image]`, etc.
   - Convert to proper markdown: `![description](filename.png)`
   - If filename is embedded (e.g., `// add image file\nfeature.png`), use that filename
   - Generate a sensible alt text from the filename if none provided
   - After formatting, list all detected images and remind the user to add the actual files

3. **Code blocks**
   - Ensure all code blocks have a language specifier (```bash, ```ini, ```javascript, etc.)
   - Detect language from content if missing
   - Ensure consistent indentation

4. **Headings**
   - Convert bare section titles like `解決方法` → `## 解決方法`
   - Ensure heading hierarchy is consistent (no skipping from `#` to `###`)

5. **Bold emphasis**
   - Highlight key numbers and metrics: `14GB` → `**14GB**`
   - Highlight tool/product names on first mention: `Docker Desktop + WSL2` → `**Docker Desktop + WSL2**`

6. **Spacing & punctuation**
   - Add paragraph breaks between thoughts
   - Ensure consistent Chinese punctuation spacing (space before/after English words mixed with Chinese text)
   - Fix run-on sentences

7. **Signature ending**
   - Ensure post ends with "Hope you find it useful"
   - Add it if missing

### Post-Formatting Report

After formatting, show a concise summary:

```
✅ Formatted! Changes applied:

  • Cleaned frontmatter structure
  • Converted 4 image placeholders → proper markdown
  • Added ## heading for "解決方法"
  • Bold emphasis on key numbers (14GB, 4GB)
  • Fixed paragraph spacing

⚠️ Reminder: Add these image files to the folder:
  • feature.png
  • vnmemwsl-high-ram-usage.png
  • win-run-user-profile.png
  • vnmemwsl-memory-issue-fixed.png
```

---

## Default Values

| Field | Default |
|-------|---------|
| `authors` | `["admin"]` |
| `draft` | `false` |
| `featured` | `false` |
| `lastmod` | Same as `date` (omit from frontmatter) |
| `categories` | `[]` |
| `tags` | `[]` |
| `summary` | Hugo auto-generates from first 30 words (omit if user skips) |
| `image` | Auto-detect `featured.jpg/png` in post folder (omit if user skips) |

---

## Folder Structure & Slug Rules

**Slug format:** `YYYY-MM-DD-short-english-slug`

- Always English, max 5-7 words, hyphen-separated, lowercase
- Remove stop words: a, an, the, to, for, of, and, or, how, what
- Abbreviations: javascript→js, configuration→config, information→info
- Chinese titles → translate key concepts to English

| Chinese Title | Slug |
|---------------|------|
| 如何設定 SendGrid API | `sendgrid-api-setup` |
| JavaScript 取得執行時間 | `js-get-execution-time` |

**File storage:**
- **Pre-2026:** `content/post/YYYY-MM-DD-slug.md`
- **2026+:** `content/post/YYYY/YYYY-MM-DD-slug/index.md` (bundle with assets in same folder)

**Collision handling:** Append `-2`, `-3`, etc.

---

## Frontmatter Fields Reference

All fields are **verified Hugo/Hugo Blox compatible**. Do NOT use: `og_image`, `twitter_image`, `aliases` (disabled), `reading_time` (auto-calculated), `author` (use `authors` list).

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `title` | string | — | Display title |
| `date` | datetime | — | Publication date (`+08:00` for HKT) |
| `authors` | list | `["admin"]` | Maps to `dataauthors/` |
| `draft` | bool | `false` | Hide from public |
| `summary` | string | auto (30 words) | SEO description |
| `featured` | bool | `false` | Highlight on homepage |
| `categories` | list | `[]` | Broad topic categories |
| `tags` | list | `[]` | Specific keywords |
| `lastmod` | datetime | same as `date` | Last modified date |
| `subtitle` | string | — | Below title |
| `image` | object | auto-detect | Social sharing / OG. See below. |

### Featured Image

Hugo Blox uses `image` frontmatter for Open Graph / Twitter Cards:

```yaml
image:
  caption: "Image credit: [**sharechiwai**](https://sharechiwai.com)"
```

Or place `featured.jpg/png` in the post folder for auto-detect.

---

## Content Style Notes

- Mix of Traditional Chinese and English
- Code blocks with language specifier
- Images: relative paths for 2026+ bundles (`![alt](image.png)`)
- Older posts: `/media/year/image.png`
- End with: "Hope you find it useful"
- Bold for emphasis: **重要文字**
- Gists linked or embedded

---

## Common Commands

| Command | Action |
|---------|--------|
| `Create a new post "Title", date: "2026-02-01", tags: "t1, t2", categories: "c1"` | **One-liner mode** — creates file immediately |
| `Create a new post "Title", date: "2026-02-01"` | One-liner with just title + date (tags/categories default to empty) |
| `Create a blog post` | Interactive chat mode (asks step-by-step) |
| `Create a blog post about [topic]` | Interactive chat with title pre-filled |
| `Format this post` | Formats the most recently created/modified post |
| `Format [path]` | Formats a specific file |
| `Reformat @content/post/...` | Formats the referenced file |
| `Format this draft: [content]` | Formats pasted content inline |
