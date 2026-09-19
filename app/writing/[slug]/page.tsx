import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type React from "react";

import BackButton from "@/components/BackButton";
import { SITE_URL } from "@/utils/site";
import { getWritingModule } from "@/utils/writing-modules";
import { allWritings, getWriting } from "@/utils/writings";

import TableOfContents from "./TableOfContent";

export function generateStaticParams() {
  return allWritings.map((writing) => ({
    slug: writing.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const writing = getWriting(slug);

  if (!writing) {
    return {};
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    slug: writingSlug,
  } = writing;

  const image = "/images/openGraphImage.png";

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title,
      description,
      publishedTime,
      siteName: "Harits Syah Writing",
      url: `${SITE_URL}/writing/${writingSlug}`,
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

const writingDateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  timeZone: "UTC",
  year: "numeric",
});

function formatDate(date: string) {
  return writingDateFormatter.format(new Date(`${date}T00:00:00.000Z`));
}

export default async function Writing({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const writing = getWriting(slug);
  const writingModule = getWritingModule(slug);

  if (!(writing && writingModule)) {
    notFound();
  }

  const { default: WritingContent } = await writingModule;

  return (
    <div className="grid min-h-screen w-full grid-cols-1 sm:grid-cols-5">
      {/*<LeftBar />*/}
      <Content>
        <div className="mt-5 mb-10">
          <BackButton href="/writing" name="All Writings" />
        </div>

        <h1 className="text-foreground text-2xl font-bold tracking-tighter sm:text-3xl">
          {writing.title}
        </h1>
        <div className="mt-2 mb-8 flex items-center text-sm">
          <time dateTime={writing.publishedAt}>
            {formatDate(writing.publishedAt)}
          </time>
          &nbsp;&nbsp; <span className="text-foreground/60">•</span>{" "}
          &nbsp;&nbsp;
          <p>{writing.wordCount} Words</p>
          &nbsp;&nbsp; <span className="text-foreground/60">•</span>{" "}
          &nbsp;&nbsp;
          <p>{Math.ceil(writing.wordCount / 200)} Min Read</p>
        </div>
        <article className="prose prose-zinc max-w-none">
          <WritingContent />
        </article>
      </Content>
      <TableOfContents slug={writing.slug} />
    </div>
  );
}

export const dynamicParams = false;

function Content({ children }: { children: React.ReactNode }) {
  return (
    <section className="pb-5 sm:col-span-4 sm:pr-5 sm:pl-2">{children}</section>
  );
}
