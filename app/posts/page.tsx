import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Posts",
  description:
    "Posts by Javier Álvarez (Medina): notes on work, tech, and things that come up over time.",
  openGraph: {
    title: "Posts",
      description:
        "Writing that sits next to the career page, published when there is something worth sharing.",
    url: "/posts",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Posts",
      description:
        "Writing that sits next to the career page, published when there is something worth sharing.",
  },
  alternates: {
    canonical: "/posts",
  },
};

export default async function PostsIndexPage() {
  const posts = await getAllPosts();

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
        <h1 className="text-3xl font-semibold tracking-tight">Posts</h1>
        <p className="text-neutral-600">
          Notes on work, tech, and whatever shows up, next to the career story on the home page.
        </p>
      </header>

      <ul className="flex flex-col gap-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/posts/${post.slug}`}
              className="group block rounded-md outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-950"
              aria-label={`Read post: ${post.title}`}
            >
              <time
                dateTime={post.date}
                className="text-sm text-neutral-500 tabular-nums"
              >
                {post.date}
              </time>
              <h2 className="mt-1 text-xl font-medium tracking-tight group-hover:underline">
                {post.title}
              </h2>
              {post.description ? (
                <p className="mt-2 text-neutral-600">{post.description}</p>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>

      {posts.length === 0 ? (
        <p className="text-neutral-500">No posts yet.</p>
      ) : null}
    </main>
  );
}
