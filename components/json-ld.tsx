import { avatarSrc, socialUrls } from "@/lib/social";
import { getSiteOrigin, siteConfig } from "@/lib/site";

/** Person schema for the home page (rich results / knowledge graph). */
export function PersonJsonLd() {
  const url = getSiteOrigin();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Javier Álvarez (Medina)",
    url,
    image: `${url}${avatarSrc}`,
    sameAs: [socialUrls.x, socialUrls.linkedin, socialUrls.github],
    description: siteConfig.description,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
