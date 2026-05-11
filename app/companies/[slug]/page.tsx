import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCompanyBySlug, getCompanySlugs } from "@/lib/companies";
import { getSiteOrigin } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getCompanySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const company = await getCompanyBySlug(slug);
  if (!company) return { title: "Company" };
  const description =
    company.description ??
    `How Javier Álvarez (Medina) worked at ${company.title}.`;
  const ogUrl = `${getSiteOrigin()}/companies/${slug}`;
  return {
    title: company.title,
    description,
    openGraph: {
      type: "article",
      title: company.title,
      description,
      url: ogUrl,
    },
    twitter: {
      card: "summary",
      title: company.title,
      description,
    },
    alternates: {
      canonical: `/companies/${slug}`,
    },
  };
}

export default async function CompanyPage({ params }: Props) {
  const { slug } = await params;
  const company = await getCompanyBySlug(slug);
  if (!company) notFound();

  return (
    <main id="main-content" className="mx-auto min-h-dvh max-w-2xl px-6 py-16">
      <Link
        href="/companies"
        className="text-sm text-neutral-600 underline-offset-4 outline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-950"
        aria-label="Back to companies list"
      >
        <span aria-hidden="true">← </span>
        Companies
      </Link>

      <article className="mt-8">
        <header className="mb-10 space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">{company.title}</h1>
          {company.period ? (
            <p className="text-sm text-neutral-500 tabular-nums">{company.period}</p>
          ) : null}
          {company.description ? (
            <p className="text-lg text-neutral-600">{company.description}</p>
          ) : null}
          {company.website ? (
            <p>
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-neutral-950 underline decoration-neutral-300 underline-offset-4 outline-offset-2 transition-colors hover:decoration-neutral-950 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-950"
              >
                Official website
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            </p>
          ) : null}
        </header>

        <div
          className="post-body"
          dangerouslySetInnerHTML={{ __html: company.contentHtml }}
        />
      </article>
    </main>
  );
}
