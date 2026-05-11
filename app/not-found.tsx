import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-6 px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-neutral-600">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="w-fit rounded-md text-neutral-950 underline underline-offset-4 outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-950"
      >
        Back to home
      </Link>
    </main>
  );
}
