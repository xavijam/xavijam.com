# Agent context for xavijam.com

Use this file when working in this repository so changes stay aligned with how the site is meant to work.

## What this is

Repository for **Javier Álvarez (Medina)**’s personal site at **xavijam.com**. It serves two goals:

1. **Career documentation:** a concise home page (bio, company links with brand hover colors, social icons) that summarizes where he has worked and what he has built.
2. **Writing:** Markdown posts under `/posts` for things that come up over time (work, tech, side projects, whatever is worth capturing).

The codebase also includes SEO metadata (Open Graph, Twitter cards, sitemap, robots, `Person` JSON-LD on the home page).

## Stack

- **Next.js** 16 (App Router, Turbopack in dev)
- **React** 19, **TypeScript**
- **Tailwind CSS** v4 (`@import "tailwindcss"` in `app/globals.css`)
- **pnpm** as the package manager (`pnpm-lock.yaml`)

Prefer `pnpm` over npm/yarn in docs and scripts.

## Language and tone

- **All user-visible UI and Markdown post content should be in English** (copy, metadata descriptions, post frontmatter, `lang` on `<html>`).
- The owner may write chat messages in Spanish; deliver code and site copy in **English** unless they explicitly ask otherwise.

For blog posts, preserve the tone shown by the current personal posts: reflective, candid, and warm, written in first person, with small concrete memories and simple metaphors. Keep the voice slightly informal and human, close to a translated personal note, but polish grammar and clarity without making it sound corporate or over edited. Prefer commas, colons, or short sentences over dash punctuation in prose when possible.

## Where things live

| Area | Location |
| --- | --- |
| Home layout & career summary | `app/page.tsx` |
| Global layout & default metadata | `app/layout.tsx` |
| Post list & post page | `app/posts/page.tsx`, `app/posts/[slug]/page.tsx` |
| Companies list & company page | `app/companies/page.tsx`, `app/companies/[slug]/page.tsx` |
| Projects list & project page | `app/projects/page.tsx`, `app/projects/[slug]/page.tsx` |
| Markdown sources | `content/posts/*.md`, `content/companies/*.md`, `content/projects/*.md` (YAML frontmatter per type) |
| Post loading & remark pipeline | `lib/posts.ts` |
| Company loading & remark pipeline | `lib/companies.ts` |
| Project loading & remark pipeline | `lib/projects.ts` |
| Social profile URLs and avatar path | `lib/social.ts` (`avatarSrc` → `public/avatar.png`) |
| Site title/description helpers & URL resolution | `lib/site.ts` |
| Company links (reusable) | `components/company-link.tsx` |
| Social icons row | `components/social-links.tsx` |
| Home `Person` JSON-LD | `components/json-ld.tsx` |
| Sitemap / robots | `app/sitemap.ts`, `app/robots.ts` |

## Conventions

- **URLs:** posts are `/posts` and `/posts/[slug]`, companies are `/companies` and `/companies/[slug]`, and projects are `/projects` and `/projects/[slug]`. Social, company, and project external links use `target="_blank"` and `rel="noopener noreferrer"` where applicable.
- **Home layout:** on **small screens**, **avatar + title share one row** (smaller avatar, `text-2xl` title); from **`md`**, they **stack** and center with a larger avatar and `text-3xl`. The bio is **left** on mobile and **center** from `md`. **Social icons:** on **mobile only** (`max-md`), the `<nav>` uses **`w-max` + `self-start`** so the three icons stay **grouped on the left**; from **`md`**, **`w-full max-w-md justify-center`** centers them with the rest of the content (`app/page.tsx`, `components/social-links.tsx`).
- **Company link hovers:** brand colors are intentional; do not replace with generic gray hovers without being asked.
- **Section indexes:** posts, companies, and projects index pages share the same maximum width as their detail pages (`max-w-2xl`) for visual consistency.
- **Hidden sections (temporary):** the companies and projects sections are reachable at their URLs but are intentionally hidden from search engines while content is being filled in. Their pages set `robots: { index: false, follow: true }` and they are **not listed in `app/sitemap.ts`**. Do not re-add them to the sitemap or remove the `robots` overrides unless the owner asks.
- **SEO:** production should set `NEXT_PUBLIC_SITE_URL` to the canonical origin (no trailing slash), e.g. `https://xavijam.com`. See `lib/site.ts` and `README.md` → SEO.
- **Scope:** keep edits focused on the task; avoid unrelated refactors, extra dependencies, or new markdown docs unless requested.

## Accessibility (WCAG 2.1 AA oriented)

- **Skip link:** first focusable control in `app/layout.tsx` jumps to `#main-content` on every page that exposes `<main id="main-content">` (home, posts, post, `not-found`).
- **Keyboard focus:** interactive elements use visible `focus-visible` outlines (Tailwind on links; `.post-body a:focus-visible` in `app/globals.css` for Markdown links).
- **New tabs:** external company links announce “(opens in new tab)” via screen-reader-only text; social icons use `aria-label` including the same hint.
- **Touch targets:** social links use at least **44×44 CSS px** hit area (`min-h-11 min-w-11`).
- **Avatar:** `alt="Portrait photo"` so the adjacent `<h1>` is the primary name (avoids redundant vocalization).
- **Authoring:** keep a logical heading order in Markdown (`h1` in layout, then `h2`/`h3` in post bodies). Run **axe** or **Lighthouse** in CI or before releases for automated checks.


## Human-oriented docs

For commands, folder table, and deploy notes, see **`README.md`**.
