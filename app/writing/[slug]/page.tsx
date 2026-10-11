import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type React from "react";

import BackButton from "@/components/BackButton";
import { createPageMetadata } from "@/utils/pageMetadata";
import { allWritingPosts, getWritingPost } from "@/utils/writing-posts";

import TableOfContents from "./TableOfContent";
import { getWritingModule } from "./writing-modules";

export function generateStaticParams() {
  return allWritingPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getWritingPost(slug);

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
    path: `/writing/${postSlug}`,
    publishedTime,
  });
}

export const dynamicParams = false;

const writingDateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  timeZone: "UTC",
  year: "numeric",
});

export default async function WritingPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getWritingPost(slug);
  const postModule = getWritingModule(slug);

  if (!(post && postModule)) {
    notFound();
  }

  const { default: PostContent } = await postModule;

  return (
    <div className="grid min-h-screen w-full grid-cols-1 sm:grid-cols-5">
      {/*<LeftBar />*/}
      <Content>
        <div className="mt-5 mb-10">
          <BackButton href="/writing" name="All Posts" />
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
  return writingDateFormatter.format(new Date(`${date}T00:00:00.000Z`));
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <section className="pb-5 sm:col-span-4 sm:pr-5 sm:pl-2">{children}</section>
  );
}
