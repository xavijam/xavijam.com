import type { MetadataRoute } from "next";
import { getAllCompanies } from "@/lib/companies";
import { getAllPosts } from "@/lib/posts";
import { getSiteOrigin } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteOrigin();
  const posts = await getAllPosts();
  const companies = await getAllCompanies();

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
    {
      url: `${base}/companies`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/posts/${post.slug}`,
    lastModified: safeDate(post.date) ?? new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const companyRoutes: MetadataRoute.Sitemap = companies.map((c) => ({
    url: `${base}/companies/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [...staticRoutes, ...postRoutes, ...companyRoutes];
}

function safeDate(iso: string): Date | undefined {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? undefined : d;
}
