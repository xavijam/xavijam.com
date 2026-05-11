import Link from "next/link";
import type { Metadata } from "next";
import { getAllCompanies } from "@/lib/companies";

export const metadata: Metadata = {
  title: "Companies",
  description:
    "Places Javier Álvarez (Medina) has worked: roles, teams, and what shipped at each stop.",
  alternates: { canonical: "/companies" },
};

export default async function CompaniesIndexPage() {
  const companies = await getAllCompanies();

  return (
    <main
      id="main-content"
      className="mx-auto flex min-h-dvh max-w-xl flex-col gap-10 px-6 py-16"
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
        <h1 className="text-3xl font-semibold tracking-tight">Companies</h1>
      </header>

      <ul className="flex flex-col gap-8">
        {companies.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/companies/${c.slug}`}
              className="group block rounded-md outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-950"
              aria-label={`Read about ${c.title}`}
            >
              <h2 className="text-xl font-medium tracking-tight group-hover:underline">
                {c.title}
              </h2>
              {c.period ? (
                <p className="mt-1 text-sm text-neutral-500 tabular-nums">{c.period}</p>
              ) : null}
              {c.description ? (
                <p className="mt-2 text-neutral-600">{c.description}</p>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
