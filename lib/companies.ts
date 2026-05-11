import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const companiesDir = path.join(process.cwd(), "content/companies");

export type CompanyListItem = {
  slug: string;
  title: string;
  description?: string;
  /** Public company website (shown on the detail page). */
  website?: string;
  /** Years at the company, e.g. "2009 - 2014". */
  period?: string;
  /** Sort key for `/companies` index (lower first). */
  order: number;
};

export type Company = CompanyListItem & {
  contentHtml: string;
};

function readFrontmatter(file: string) {
  const raw = fs.readFileSync(path.join(companiesDir, file), "utf8");
  return matter(raw);
}

export function getCompanySlugs(): string[] {
  if (!fs.existsSync(companiesDir)) return [];
  return fs
    .readdirSync(companiesDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export async function getAllCompanies(): Promise<CompanyListItem[]> {
  if (!fs.existsSync(companiesDir)) return [];
  const files = fs.readdirSync(companiesDir).filter((f) => f.endsWith(".md"));
  const companies = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const { data } = readFrontmatter(file);
    const record = data as Record<string, unknown>;
    return {
      slug,
      title: String(record.title ?? slug),
      description:
        record.description !== undefined
          ? String(record.description)
          : undefined,
      website:
        record.website !== undefined ? String(record.website) : undefined,
      period:
        record.period !== undefined ? String(record.period) : undefined,
      order: typeof record.order === "number" ? record.order : 999,
    };
  });
  return companies.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export async function getCompanyBySlug(slug: string): Promise<Company | null> {
  const file = `${slug}.md`;
  const full = path.join(companiesDir, file);
  if (!fs.existsSync(full)) return null;
  const { data, content } = readFrontmatter(file);
  const record = data as Record<string, unknown>;
  const processed = await remark().use(remarkHtml).process(content);
  return {
    slug,
    title: String(record.title ?? slug),
    description:
      record.description !== undefined
        ? String(record.description)
        : undefined,
    website:
      record.website !== undefined ? String(record.website) : undefined,
    period:
      record.period !== undefined ? String(record.period) : undefined,
    order: typeof record.order === "number" ? record.order : 999,
    contentHtml: processed.toString(),
  };
}
