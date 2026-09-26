import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type React from "react";

import BackButton from "@/components/BackButton";
import { getBlogModule } from "@/utils/blog-modules";
import { allBlogPosts, getBlogPost } from "@/utils/blog-posts";
import { SITE_URL } from "@/utils/site";

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

  const image = "/images/openGraphImage.png";

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title,
      description,
      publishedTime,
      siteName: "Harits Syah Blog",
      url: `${SITE_URL}/blog/${postSlug}`,
      images: [{ url: image }],
      locale: "en-US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

const blogDateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  timeZone: "UTC",
  year: "numeric",
});

function formatDate(date: string) {
  return blogDateFormatter.format(new Date(`${date}T00:00:00.000Z`));
}

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
        <article className="prose prose-zinc prose-headings:text-foreground max-w-none">
          <PostContent />
        </article>
      </Content>
      <TableOfContents slug={post.slug} />
    </div>
  );
}

export const dynamicParams = false;

function Content({ children }: { children: React.ReactNode }) {
  return (
    <section className="pb-5 sm:col-span-4 sm:pr-5 sm:pl-2">{children}</section>
  );
}
