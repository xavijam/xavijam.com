import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { getSiteOrigin } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post" };
  const description =
    post.description ?? `Post by Javier Álvarez (Medina): ${post.title}.`;
  const ogUrl = `${getSiteOrigin()}/posts/${slug}`;
  return {
    title: post.title,
    description,
    openGraph: {
      type: "article",
      title: post.title,
      description,
      url: ogUrl,
      publishedTime: post.date,
    },
    twitter: {
      card: "summary",
      title: post.title,
      description,
    },
    alternates: {
      canonical: `/posts/${slug}`,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main id="main-content" className="mx-auto min-h-dvh max-w-2xl px-6 py-16">
      <Link
        href="/posts"
        className="text-sm text-neutral-600 underline-offset-4 outline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-950"
        aria-label="Back to posts list"
      >
        <span aria-hidden="true">← </span>
        Posts
      </Link>

      <article className="mt-8">
        <header className="mb-10 space-y-2">
          <time
            dateTime={post.date}
            className="text-sm text-neutral-500 tabular-nums"
          >
            {post.date}
          </time>
          <h1 className="text-3xl font-semibold tracking-tight">{post.title}</h1>
          {post.description ? (
            <p className="text-lg text-neutral-600">{post.description}</p>
          ) : null}
        </header>

        <div
          className="post-body"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
    </main>
  );
}
