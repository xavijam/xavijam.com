# xavijam.com

Personal website for **Javier Álvarez (Medina)**. It **documents his career** on the home page and lets him **publish posts** (Markdown under `/posts`) about things that happen along the way. Built with [Next.js](https://nextjs.org) (App Router), [React](https://react.dev), [TypeScript](https://www.typescriptlang.org), and [Tailwind CSS](https://tailwindcss.com) v4.

**Coding agents:** read [`AGENTS.md`](./AGENTS.md) in this repo for stack, file map, language rules, and conventions.

## Requirements

- [Node.js](https://nodejs.org) (LTS recommended)
- [pnpm](https://pnpm.io)

## Scripts

```bash
pnpm dev      # local dev server (Turbopack)
pnpm build    # production build
pnpm start    # run production server
pnpm lint     # ESLint
```

Dev server: [http://localhost:3000](http://localhost:3000).

## Project layout

| Path | Purpose |
| --- | --- |
| `app/page.tsx` | Home: avatar, name, career copy, company links, social icons |
| `app/layout.tsx` | Root layout and metadata |
| `app/posts/` | Post index (`/posts`) and `[slug]` pages |
| `app/companies/` | Companies index (`/companies`) and `[slug]` pages |
| `app/projects/` | Projects index (`/projects`) and `[slug]` pages |
| `content/posts/` | Markdown posts (`.md` + YAML frontmatter) |
| `content/companies/` | Markdown company pages (`.md` + YAML frontmatter) |
| `content/projects/` | Markdown project pages (`.md` + YAML frontmatter) |
| `lib/posts.ts` | Read posts from disk, compile Markdown with remark |
| `lib/companies.ts` | Read companies from disk, compile Markdown with remark |
| `lib/projects.ts` | Read projects from disk, compile Markdown with remark |
| `lib/social.ts` | Social URLs and `avatarSrc` (`/avatar.png` in `public/`) |
| `components/company-link.tsx` | External company links with brand hover colors |
| `components/social-links.tsx` | Social icon row |
| `lib/site.ts` | Site URL helper, default titles/descriptions for metadata |
| `app/sitemap.ts` | `sitemap.xml` (home, section indexes, each post / company / project) |
| `app/robots.ts` | `robots.txt` and sitemap URL |
| `public/avatar.png` | Profile photo (home + favicon via `app/icon.png` copy) |

## Posts

Posts complement the career page: add Markdown when you want to capture something that happened (work, tech, side notes, etc.).

Add a file under `content/posts/` named `{slug}.md`. It is served at `/posts/{slug}`.

Frontmatter fields:

- `title` (required)
- `date` (ISO-ish string, used for sorting and display)
- `description` (optional)

The post index lists all `.md` files sorted by `date` (newest first).

## SEO

- **`metadataBase`** and global defaults are in `app/layout.tsx` (Open Graph, Twitter `summary` card, `robots`, keywords, authors).
- **Per route:** `app/page.tsx` (home canonical + OG), `app/posts/page.tsx`, and `generateMetadata` on each post (`article` OG type + `publishedTime` when available).
- **Structured data:** `PersonJsonLd` on the home page (name, site URL, `sameAs` from `lib/social.ts`).
- **Production URL:** set `NEXT_PUBLIC_SITE_URL=https://xavijam.com` (no trailing slash) in the deployment environment so canonicals, Open Graph URLs, the sitemap, and JSON-LD use the real domain. If unset on Vercel, `VERCEL_URL` is used; locally it falls back to `http://localhost:3000`.

## Configuration

- **Social links:** edit `lib/social.ts`.
- **Profile photo:** replace `public/avatar.png` (and copy to `app/icon.png` if you want the favicon to match).
- **Titles / descriptions for meta & JSON-LD:** edit `lib/site.ts`.
- **Company link URLs / hover colors:** edit `app/page.tsx` (and `components/company-link.tsx` if you change the component API).

## Deploy

Any host that supports Node or static export works. The default setup is a standard Next.js app (SSR/SSG for posts). See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).
