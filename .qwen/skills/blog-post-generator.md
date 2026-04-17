# Blog Post Generator Skill

A skill to help create and format blog posts for your Hugo-based blog.

## Usage Modes

### Mode 1: Interactive Chat (Default)

When you trigger this skill, I will **automatically start an interactive chat** to guide you through filling in the details:

1. **Step 1**: Ask for title and date → Show generated English slug
2. **Step 2**: Ask for tags and categories (optional, defaults to empty)
3. **Step 3**: Ask for summary (optional, SEO benefit, defaults to auto-generated from content)
4. **Step 4**: Ask about draft status, featured status, and featured image (all optional with sensible defaults)
5. **Step 5**: Confirm all details with file path preview
6. **Step 6**: Offer to write content, format draft, or leave blank

**Default values applied automatically:**
- `authors`: `["admin"]` (ShareChiWai)
- `draft`: `false`
- `featured`: `false`
- `lastmod`: Same as `date` (no need to set separately)
- `categories`: `[]` (empty)
- `tags`: `[]` (empty)
- `image`: Auto-detect `featured.jpg/png` in post folder

**Key Features:**
- ✅ **Auto-generate short English slugs** from any title (even Chinese)
- ✅ **SEO-friendly** folder names (max 5-7 words, hyphenated)
- ✅ **Preview file path** before creating
- ✅ **Draft mode** support for unpublished posts
- ✅ **Featured post** support
- ✅ **Featured image** support for social sharing (Hugo Blox compatible)

**Just say:** "Create a blog post" or trigger the skill, and I'll guide you through!

### Mode 2: Direct Input

If you already have all the details, provide them upfront:

**Required:**
- **title**: The title of your blog post
- **date**: Publication date (YYYY-MM-DD format) - *This determines the folder structure*

**Optional:**
- **summary**: Brief summary/description (1-2 sentences)
- **tags**: List of tags (e.g., `reactjs, javascript, tutorial`)
- **categories**: List of categories (e.g., `React, Frontend`)
- **author**: Author name (defaults to "ShareChiWai" / `admin`)
- **language**: Content language preference (English, 中文, or mixed - defaults to mixed based on your style)
- **featured_image**: Path or filename for featured/social sharing image (optional)

### Folder Structure

**Slug Generation Rules** (for URL/folder naming):
- Always use **English slug**, never Chinese characters in path
- Format: `YYYY-MM-DD-short-english-slug`
- Keep it **short and SEO-friendly** (max 5-7 words, hyphen-separated)
- If title is in Chinese, I'll translate key concepts to English for the slug
- Remove stop words (a, an, the, to, for, etc.) for brevity

**Examples:**
| Title | Folder/File Slug |
|-------|------------------|
| "How to fix Docker port binding issue" | `2026-04-20-docker-port-binding-fix` |
| "Sendgrid Api Setup to send Email and read Quota Info" | `2026-01-01-sendgrid-api-setup` |
| "如何設定 React Router 的 Basic Auth 驗證" | `2026-04-20-react-router-basic-auth` |
| "JavaScript 取得執行時間的方法" | `2026-04-20-js-get-execution-time` |

**File Storage:**
- **Pre-2026 posts**: `content/post/YYYY-MM-DD-slug.md`
  - Example: `content/post/2021-07-03-js-get-execution-time.md`

- **2026 onwards**: `content/post/YYYY/YYYY-MM-DD-slug/index.md` (with assets in same folder)
  - Example: `content/post/2026/2026-01-01-sendgrid-api-setup/index.md`
  - Images/assets go in the same folder: `content/post/2026/2026-01-01-sendgrid-api-setup/image.png`

**Slug collision handling:** If the generated slug already exists, append `-2`, `-3`, etc. (e.g., `2026-04-20-docker-fix-2`).

**I will automatically:**
1. Generate a short, SEO-friendly English slug from any title
2. Create the correct folder structure based on the year
3. Generate the proper filename (`index.md` for 2026+, or `YYYY-MM-DD-slug.md` for older posts)
4. Include any images/assets in the same folder (for 2026+ posts)

### Formatting an Existing Blog Post

When you have draft content that needs formatting, just share it with me and I'll:
1. Add proper frontmatter (title, date, author, categories, tags, summary)
2. Format code blocks with proper language syntax
3. Ensure consistent heading levels
4. Add the signature "Hope you find it useful" if missing
5. Fix markdown formatting issues

## Blog Post Structure

Your blog follows this pattern:

```markdown
---
title: "Your Post Title"
date: YYYY-MM-DDTHH:MM:SS+08:00
authors:
  - admin
draft: false
summary: "Brief summary of the post"
featured: false
categories:
  - Category1
  - Category2
tags:
  - tag1
  - tag2
  - tag3
---

[Your content here]

Hope you find it useful
```

### Frontmatter Fields Reference

All fields listed below are **verified Hugo/Hugo Blox compatible**. Do NOT use unsupported fields like `og_image`, `twitter_image`, `aliases` (disabled in this blog), or `reading_time` (auto-calculated).

| Field | Required | Type | Default | Description |
|-------|----------|------|---------|-------------|
| `title` | ✅ | string | — | Display title of the post |
| `date` | ✅ | datetime | — | Publication date with timezone offset (`+08:00` for HKT) |
| `authors` | ✅ | list | `["admin"]` | Author identifiers. Maps to `dataauthors/admin/` |
| `draft` | ❌ | bool | `false` | Set `true` to hide from public |
| `summary` | ❌ | string | — (auto-generated from first 30 words) | Short description for SEO/listing pages |
| `featured` | ❌ | bool | `false` | Mark as featured post, highlighted on homepage |
| `categories` | ❌ | list | `[]` | Broad topic categories (taxonomy: `categories`) |
| `tags` | ❌ | list | `[]` | Specific keywords for the post (taxonomy: `tags`) |
| `lastmod` | ❌ | datetime | Same as `date` | Last modified date. Hugo auto-sets this to `date` if not specified. Update only when post content changes. |
| `subtitle` | ❌ | string | — | Subtitle displayed below the title |
| `image` | ❌ | object | — (auto-detect `featured.jpg/png`) | Featured image for social sharing / OG tags. See "Featured Image" section below. |

### Featured Image (Social Sharing)

Hugo Blox uses the `image` frontmatter field for Open Graph and Twitter Card meta tags. There are two ways to set a featured image:

**Option A: Place a file in the post folder (recommended for 2026+)**
- Put `featured.jpg` or `featured.png` in the same folder as `index.md`
- Hugo Blox will auto-detect it. No frontmatter needed.

**Option B: Use frontmatter `image` field**
```yaml
image:
  filename: 'featured.jpg'
  caption: 'Image credit: Unsplash'
  focal_point: 'smart'   # smart, center, top, bottom
  preview_only: false    # true = only show on listing, not single page
```

**If user does not provide a featured image:**
- Leave the `image` field out of frontmatter (Hugo will use a default or none)
- Optionally add a placeholder comment: `# TODO: Add featured image (place featured.jpg/png in this folder for auto-detect)`

### Content Style Notes

Based on your existing posts:
- Mix of Traditional Chinese and English is common
- Code examples use proper fenced code blocks (```language)
- Images in content use relative paths for same-folder assets: `![alt text](image.png 'tooltip')` (2026+ bundle posts)
- Older posts use: `![alt text](/media/year/image.png 'tooltip')`
- Posts often start with context/background in Chinese
- End with "Hope you find it useful"
- Use bold for emphasis: **重要文字**
- Gists can be linked or embedded

### Slug Generation Reference

When generating slugs for folder/file names, I follow these rules:

**Slug Format:** `YYYY-MM-DD-keyword1-keyword2-keyword3`

**Rules:**
1. Always English, never Chinese characters in paths
2. Max 5-7 keywords (keep it short)
3. Remove stop words: a, an, the, to, for, of, and, or, how, what
4. Use common abbreviations: javascript→js, configuration→config, information→info
5. Prioritize keywords that match your blog's existing slug patterns
6. Hyphen-separated, all lowercase

**Chinese Title Translation Examples:**
| Chinese Title | Generated Slug | Logic |
|---------------|----------------|-------|
| 如何設定 SendGrid API | `sendgrid-api-setup` | Focus on tool + action |
| JavaScript 取得執行時間 | `js-get-execution-time` | Language + concept |
| Docker Port Binding 問題解決 | `docker-port-binding-fix` | Tool + issue + solution |
| React Router 基本教學 | `react-router-basics` | Tool + tutorial indicator |
| 升級 React 到 18 | `upgrade-react-18` | Action + tool + version |

## Examples

### Example 1: Quick Boilerplate

**You say:**
```
Create a blog post:
Title: How to fix Docker port binding issue
Date: 2026-04-20
Tags: docker, networking, devops
Categories: Docker, DevOps
Summary: 遇到Docker port binding問題時的解決方法
```

**I'll create:**
- File: `content/post/2026/2026-04-20-docker-port-binding-fix/index.md`
- Content:
```markdown
---
title: "How to fix Docker port binding issue"
date: 2026-04-20T00:00:00+08:00
authors:
  - admin
summary: "遇到Docker port binding問題時的解決方法"
categories:
  - Docker
  - DevOps
tags:
  - docker
  - networking
  - devops
---

[Ready for your content]

Hope you find it useful
```

### Example 2: Format Draft

**You say:**
```
Please format this draft:

title: Setting up React Router
date: 2025-12-15
i want to write about how to setup react router

first you need to install react-router-dom
npm install react-router-dom

then wrap your app with BrowserRouter

Hope you find it useful
```

**I'll format it and create:**
- File: `content/post/2025-12-15-react-router-setup.md` (pre-2026 structure)
- Content properly formatted with frontmatter, code blocks, and styling

### Example 3: With Featured Image

**You say:**
```
Create a blog post:
Title: AWS EC2 Install PostgreSQL
Date: 2026-05-01
Featured image: aws-ec2-postgres.png
```

**I'll create:**
- File: `content/post/2026/2026-05-01-aws-ec2-install-postgresql/index.md`
- Image: `content/post/2026/2026-05-01-aws-ec2-install-postgresql/aws-ec2-postgres.png` (if provided)
- Frontmatter includes `image` block for social sharing

## Interactive Chat Flow

When triggered, the skill follows this conversation flow:

```
📝 Blog Post Generator - Interactive Mode
==========================================

Step 1/6: Basic Info
---------------------
🤖 What's the title of your blog post?
   (Required - can be in any language)

🤖 What's the publication date? (YYYY-MM-DD)
   (Required - determines folder structure)

[User provides title and date]

🤖 Generated slug: `2026-04-20-short-english-slug`
   (Short, SEO-friendly, always in English)

Step 2/6: Tags & Categories
---------------------
🤖 What tags would you like to add? (comma-separated, optional)
   Examples: reactjs, javascript, tutorial

🤖 What categories? (comma-separated, optional)
   Examples: React, Frontend, DevOps

[User provides or skips]

Step 3/6: Summary
---------------------
🤖 Would you like to add a brief summary? (optional)
   (1-2 sentences describing the post - good for SEO)

[User provides or skips]

Step 4/6: Post Options
---------------------
🤖 Should this be a draft? (Yes/No, default: No)
   (Drafts won't appear on the live site)

🤖 Feature this post? (Yes/No, default: No)
   (Featured posts get highlighted on homepage)

🤖 Add a featured image for social sharing? (Yes/No, default: No)
   If Yes:
     - Provide an image filename (e.g., aws-ec2.png) or file path
     - Or: Skip this, I'll place a `featured.jpg/png` in the folder later
   (Used for Open Graph / Twitter Card social sharing.
    If skipped, Hugo will auto-detect `featured.jpg/png` from the post folder.)

[User provides or skips]

Step 5/6: Confirmation
---------------------
🤖 Here's what I've gathered:

  Title: "Your Post Title / 你的標題"
  Date: 2026-04-20
  Slug: 2026-04-20-short-english-slug
  File: content/post/2026/2026-04-20-short-english-slug/index.md
  Authors: [admin]
  Tags: tag1, tag2
  Categories: Cat1, Cat2
  Summary: "Brief summary here"
  Draft: false
  Featured: false
  Featured Image: None (will auto-detect featured.jpg/png if placed in folder)
  lastmod: 2026-04-20 (same as date)

  ✅ Create this file now? (Yes/No/Edit)

[User confirms]

Step 6/6: Content
---------------------
🤖 File created! ✅

Would you like to:
  1. Write the content now (I'll guide you section by section)
  2. Format existing content (paste it here)
  3. Leave it blank for later

[User chooses option]
```

## Common Commands

Just tell me:
- "Create a blog post" → Starts interactive chat
- "Create a blog post about [topic]" → Starts chat with title pre-filled
- "Generate boilerplate for [title] on [date]" → Creates file directly
- "Format this draft: [content]" → Formats existing content

I'll handle the rest!
