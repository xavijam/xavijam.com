import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CompanyLink } from "@/components/company-link";
import { PersonJsonLd } from "@/components/json-ld";
import { SocialLinks } from "@/components/social-links";
import { avatarSrc } from "@/lib/social";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: siteConfig.defaultTitle },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.defaultTitle,
    description: siteConfig.socialDescription,
    url: "/",
    type: "website",
    images: [
      {
        url: avatarSrc,
        width: 512,
        height: 512,
        alt: "Portrait photo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: siteConfig.defaultTitle,
    description: siteConfig.socialDescription,
    images: [avatarSrc],
  },
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <PersonJsonLd />
      <main
        id="main-content"
        className="flex min-h-dvh w-full flex-col items-start justify-center gap-8 px-6 md:items-center"
      >
        <div className="flex w-full max-w-md flex-row items-center gap-3 md:flex-col md:items-center md:gap-3">
          <Image
            src={avatarSrc}
            alt="Portrait photo"
            width={80}
            height={80}
            className="h-14 w-14 shrink-0 rounded-full object-cover ring-1 ring-neutral-200 md:h-24 md:w-24"
            priority
          />
          <h1 className="min-w-0 flex-1 text-left text-2xl font-semibold tracking-tight md:w-full md:flex-none md:text-center md:text-3xl">
            Javier Álvarez (Medina)
          </h1>
        </div>
        <p className="w-full max-w-md text-left text-neutral-600 md:text-center">
          I started my career at{" "}
          <CompanyLink
            href="https://www.vizzuality.com/"
            hoverClassName="hover:text-[#059669] hover:decoration-[#059669]/40"
          >
            Vizzuality
          </CompanyLink>, on software for
          biodiversity conservation. I was the first employee building the{" "}
          <CompanyLink
            href="https://carto.com/"
            hoverClassName="hover:text-[#EB1510] hover:decoration-[#EB1510]/40"
          >
            CARTO
          </CompanyLink>{" "}
          product, making
          geospatial data easier to visualize. At{" "}
          <CompanyLink
            href="https://www.tinybird.co/"
            hoverClassName="hover:text-[#27f795] hover:decoration-[#27f795]/40"
          >
            Tinybird
          </CompanyLink>, I co-founded it and
          built a product for analyzing real time data.
        </p>
        <div className="w-full max-w-md text-left md:text-center">
          <Link
            href="/posts"
            className="inline-flex items-center gap-1 rounded-sm text-sm font-medium text-neutral-700 underline-offset-4 outline-offset-4 transition-colors hover:text-neutral-950 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-950"
          >
            Read posts
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        <SocialLinks />
      </main>
    </>
  );
}
