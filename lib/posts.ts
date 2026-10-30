import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const postsDir = path.join(process.cwd(), "content/posts");

export type PostListItem = {
  slug: string;
  title: string;
  date: string;
  description?: string;
};

export type Post = PostListItem & {
  contentHtml: string;
};

/** Renders `YYYY-MM-DD` frontmatter as e.g. "1 May 2019"; otherwise returns the raw string. */
export function formatPostDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!m) return iso;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

function readFrontmatter(file: string) {
  const raw = fs.readFileSync(path.join(postsDir, file), "utf8");
  return matter(raw);
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export async function getAllPosts(): Promise<PostListItem[]> {
  if (!fs.existsSync(postsDir)) return [];
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));
  const posts = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const { data } = readFrontmatter(file);
    const record = data as Record<string, unknown>;
    return {
      slug,
      title: String(record.title ?? slug),
      date: String(record.date ?? ""),
      description:
        record.description !== undefined
          ? String(record.description)
          : undefined,
    };
  });
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Puts the linked site's favicon before every external link in a post. */
function addLinkFavicons(html: string): string {
  return html.replace(
    /<a href="(https?:\/\/[^"]+)"([^>]*)>/g,
    (match, href: string, rest: string) => {
      let host: string;
      try {
        host = new URL(href.replace(/&amp;/g, "&")).hostname;
      } catch {
        return match;
      }
      if (host === "xavijam.com" || host.endsWith(".xavijam.com")) return match;
      const icon = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&amp;sz=32`;
      return `<a href="${href}"${rest}><img src="${icon}" alt="" width="16" height="16" class="link-favicon" loading="lazy" decoding="async" />`;
    },
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const file = `${slug}.md`;
  const full = path.join(postsDir, file);
  if (!fs.existsSync(full)) return null;
  const { data, content } = readFrontmatter(file);
  const record = data as Record<string, unknown>;
  const processed = await remark()
    .use(remarkHtml, { sanitize: false })
    .process(content);
  return {
    slug,
    title: String(record.title ?? slug),
    date: String(record.date ?? ""),
    description:
      record.description !== undefined
        ? String(record.description)
        : undefined,
    contentHtml: addLinkFavicons(processed.toString()),
  };
}
