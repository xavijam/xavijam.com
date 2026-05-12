import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const projectsDir = path.join(process.cwd(), "content/projects");

export type ProjectListItem = {
  slug: string;
  title: string;
  description?: string;
  /** Live demo or homepage URL. */
  website?: string;
  /** Source code URL (e.g. GitHub repo). */
  repository?: string;
  /** Active period, e.g. "2020 - 2022" or "2024". */
  period?: string;
  /** Sort key for `/projects` index (lower first). */
  order: number;
};

export type Project = ProjectListItem & {
  contentHtml: string;
};

function readFrontmatter(file: string) {
  const raw = fs.readFileSync(path.join(projectsDir, file), "utf8");
  return matter(raw);
}

export function getProjectSlugs(): string[] {
  if (!fs.existsSync(projectsDir)) return [];
  return fs
    .readdirSync(projectsDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export async function getAllProjects(): Promise<ProjectListItem[]> {
  if (!fs.existsSync(projectsDir)) return [];
  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith(".md"));
  const projects = files.map((file) => {
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
      repository:
        record.repository !== undefined
          ? String(record.repository)
          : undefined,
      period:
        record.period !== undefined ? String(record.period) : undefined,
      order: typeof record.order === "number" ? record.order : 999,
    };
  });
  return projects.sort(
    (a, b) => a.order - b.order || a.title.localeCompare(b.title),
  );
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const file = `${slug}.md`;
  const full = path.join(projectsDir, file);
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
    repository:
      record.repository !== undefined ? String(record.repository) : undefined,
    period:
      record.period !== undefined ? String(record.period) : undefined,
    order: typeof record.order === "number" ? record.order : 999,
    contentHtml: processed.toString(),
  };
}
