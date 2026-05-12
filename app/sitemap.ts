import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { getSiteOrigin } from "@/lib/site";

// Companies (`/companies`, `/companies/[slug]`) and projects (`/projects`,
// `/projects/[slug]`) are intentionally excluded from the sitemap while those
// sections are still being filled in. Their pages also set
// `robots: { index: false, follow: true }`. Re-add the routes here (mirroring
// the `posts` block) once they are ready to be indexed publicly, and remove
// the `robots` overrides on the corresponding pages.

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteOrigin();
  const posts = await getAllPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/posts`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/posts/${post.slug}`,
    lastModified: safeDate(post.date) ?? new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}

function safeDate(iso: string): Date | undefined {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? undefined : d;
}
