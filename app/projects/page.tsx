import Link from "next/link";
import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Side projects by Javier Álvarez (Medina): things built outside of work.",
  alternates: { canonical: "/projects" },
  robots: { index: false, follow: true },
};

export default async function ProjectsIndexPage() {
  const projects = await getAllProjects();

  return (
    <main
      id="main-content"
      className="mx-auto flex min-h-dvh max-w-2xl flex-col gap-10 px-6 py-16"
    >
      <header className="space-y-2">
        <Link
          href="/"
          className="text-sm text-neutral-600 underline-offset-4 outline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-950"
          aria-label="Back to home"
        >
          <span aria-hidden="true">← </span>
          Home
        </Link>
        <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
      </header>

      <ul className="flex flex-col gap-8">
        {projects.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/projects/${p.slug}`}
              className="group block rounded-md outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-950"
              aria-label={`Read about ${p.title}`}
            >
              <h2 className="text-xl font-medium tracking-tight group-hover:underline">
                {p.title}
              </h2>
              {p.period ? (
                <p className="mt-1 text-sm text-neutral-500 tabular-nums">
                  {p.period}
                </p>
              ) : null}
              {p.description ? (
                <p className="mt-2 text-neutral-600">{p.description}</p>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>

      {projects.length === 0 ? (
        <p className="text-neutral-500">No projects yet.</p>
      ) : null}
    </main>
  );
}
