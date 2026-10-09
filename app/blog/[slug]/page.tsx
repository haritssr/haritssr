import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type React from "react";

import BackButton from "@/components/BackButton";
import { allBlogPosts, getBlogPost } from "@/utils/blog-posts";
import { createPageMetadata } from "@/utils/pageMetadata";

import { getBlogModule } from "./blog-modules";
import TableOfContents from "./TableOfContent";

export function generateStaticParams() {
  return allBlogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {};
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    slug: postSlug,
  } = post;

  return createPageMetadata({
    title,
    description,
    path: `/blog/${postSlug}`,
    publishedTime,
  });
}

export const dynamicParams = false;

const blogDateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  timeZone: "UTC",
  year: "numeric",
});

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const postModule = getBlogModule(slug);

  if (!(post && postModule)) {
    notFound();
  }

  const { default: PostContent } = await postModule;

  return (
    <div className="grid min-h-screen w-full grid-cols-1 sm:grid-cols-5">
      {/*<LeftBar />*/}
      <Content>
        <div className="mt-5 mb-10">
          <BackButton href="/blog" name="All Posts" />
        </div>

        <h1 className="text-foreground text-2xl font-bold tracking-tighter sm:text-3xl">
          {post.title}
        </h1>
        <div className="mt-2 mb-8 flex items-center text-sm">
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
          &nbsp;&nbsp; <span className="text-foreground/60">•</span>{" "}
          &nbsp;&nbsp;
          <p>{post.wordCount} Words</p>
          &nbsp;&nbsp; <span className="text-foreground/60">•</span>{" "}
          &nbsp;&nbsp;
          <p>{Math.ceil(post.wordCount / 200)} Min Read</p>
        </div>
        <article className="prose prose-zinc prose-headings:text-foreground in-data-[theme=dark]:prose-invert max-w-none">
          <PostContent />
        </article>
      </Content>
      <TableOfContents slug={post.slug} />
    </div>
  );
}

function formatDate(date: string) {
  return blogDateFormatter.format(new Date(`${date}T00:00:00.000Z`));
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <section className="pb-5 sm:col-span-4 sm:pr-5 sm:pl-2">{children}</section>
  );
}
