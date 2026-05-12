import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjectSlugs } from "@/lib/projects";
import { getSiteOrigin } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project" };
  const description =
    project.description ??
    `Side project by Javier Álvarez (Medina): ${project.title}.`;
  const ogUrl = `${getSiteOrigin()}/projects/${slug}`;
  return {
    title: project.title,
    description,
    openGraph: {
      type: "article",
      title: project.title,
      description,
      url: ogUrl,
    },
    twitter: {
      card: "summary",
      title: project.title,
      description,
    },
    alternates: {
      canonical: `/projects/${slug}`,
    },
    robots: { index: false, follow: true },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <main id="main-content" className="mx-auto min-h-dvh max-w-2xl px-6 py-16">
      <Link
        href="/projects"
        className="text-sm text-neutral-600 underline-offset-4 outline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-950"
        aria-label="Back to projects list"
      >
        <span aria-hidden="true">← </span>
        Projects
      </Link>

      <article className="mt-8">
        <header className="mb-10 space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">
            {project.title}
          </h1>
          {project.period ? (
            <p className="text-sm text-neutral-500 tabular-nums">
              {project.period}
            </p>
          ) : null}
          {project.description ? (
            <p className="text-lg text-neutral-600">{project.description}</p>
          ) : null}
          {project.website || project.repository ? (
            <p className="flex flex-wrap gap-x-6 gap-y-2">
              {project.website ? (
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-neutral-950 underline decoration-neutral-300 underline-offset-4 outline-offset-2 transition-colors hover:decoration-neutral-950 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-950"
                >
                  Visit website
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              ) : null}
              {project.repository ? (
                <a
                  href={project.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-neutral-950 underline decoration-neutral-300 underline-offset-4 outline-offset-2 transition-colors hover:decoration-neutral-950 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-950"
                >
                  View repository
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              ) : null}
            </p>
          ) : null}
        </header>

        <div
          className="post-body"
          dangerouslySetInnerHTML={{ __html: project.contentHtml }}
        />
      </article>
    </main>
  );
}
