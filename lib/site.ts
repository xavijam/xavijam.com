/** Production origin, used whenever NEXT_PUBLIC_SITE_URL is not set. */
const PRODUCTION_ORIGIN = "https://xavijam.com";

/**
 * Canonical site URL for metadata, sitemap, and JSON-LD.
 * Optional override: NEXT_PUBLIC_SITE_URL (no trailing slash).
 * Vercel system env vars are not exposed to this build, so we cannot rely on
 * VERCEL_ENV or VERCEL_URL. Builds default to the production origin (previews
 * then point their canonical at production, which is what we want for SEO);
 * only `next dev` uses localhost.
 */
export function getMetadataBase(): URL {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv) {
    try {
      return new URL(fromEnv.endsWith("/") ? fromEnv.slice(0, -1) : fromEnv);
    } catch {
      /* ignore invalid */
    }
  }
  if (process.env.NODE_ENV === "development") {
    return new URL("http://localhost:3000");
  }
  return new URL(PRODUCTION_ORIGIN);
}

export function getSiteOrigin(): string {
  return getMetadataBase().origin;
}

export const siteConfig = {
  shortName: "xavijam",
  /** Default <title> when no segment is set */
  defaultTitle: "Javier Álvarez (Medina) · xavijam.com",
  /** Shown after " · " for inner pages via title.template */
  titleTemplateSuffix: "xavijam.com",
  description:
    "Career and writing by Javier Álvarez (Medina): a short professional story on the home page, plus posts about things that come up along the way.",
  /** Default Open Graph / Twitter description (can match or shorten `description`) */
  socialDescription:
    "Documenting a career in software, and posting notes when something worth writing about happens.",
  locale: "en",
} as const;
