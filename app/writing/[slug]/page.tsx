import { allWritings } from "@content-collections";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type React from "react";
import BackButton from "@/components/BackButton";
import MDX from "@/components/mdx";
import { SITE_URL } from "@/utils/site";
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
  const writing = allWritings.find((entry) => entry.slug === slug);

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

function formatDate(date: string) {
  const currentDate = new Date();
  const [year, month, day] = date.split("-").map(Number);
  const targetDate = new Date(year, month - 1, day);

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  const daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = "Today";
  }

  const fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return `${fullDate} (${formattedDate})`;
}

// Process markdown to HTML
async function markdownToHtml(content: string) {
  const { unified } = await import("unified");
  const remarkParse = await import("remark-parse");
  const remarkGfm = await import("remark-gfm");
  const remarkRehype = await import("remark-rehype");
  const rehypeStringify = await import("rehype-stringify");

  // Create processor with basic plugins
  const processor = unified()
    // biome-ignore lint/suspicious/noExplicitAny: Plugin version compatibility
    .use(remarkParse.default as any)
    // biome-ignore lint/suspicious/noExplicitAny: Plugin version compatibility
    .use(remarkGfm.default as any)
    // biome-ignore lint/suspicious/noExplicitAny: Plugin version compatibility
    .use(remarkRehype.default as any);

  // Add optional plugins with error handling
  try {
    const rehypeSlug = await import("rehype-slug");
    // biome-ignore lint/suspicious/noExplicitAny: Plugin version compatibility
    processor.use(rehypeSlug.default as any);
  } catch {
    // Skip if plugin fails
  }

  try {
    const rehypeAutolinkHeadings = await import("rehype-autolink-headings");
    // biome-ignore lint/suspicious/noExplicitAny: Plugin version compatibility
    processor.use(rehypeAutolinkHeadings.default as any, {
      properties: {
        className: ["anchor"],
      },
    });
  } catch {
    // Skip if plugin fails
  }

  try {
    const rehypePrettyCode = await import("rehype-pretty-code");
    // biome-ignore lint/suspicious/noExplicitAny: Plugin version compatibility
    processor.use(rehypePrettyCode.default as any, {
      theme: "one-dark-pro",
    });
  } catch {
    // Skip if plugin fails
  }

  // Add stringify at the end
  // biome-ignore lint/suspicious/noExplicitAny: Plugin version compatibility
  processor.use(rehypeStringify.default as any);

  const result = await processor.process(content);
  return result.toString();
}

export default async function Writing({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const writing = allWritings.find((each) => each.slug === slug);

  if (!writing) {
    notFound();
  }

  const html = await markdownToHtml(writing.content);

  return (
    <div className="grid min-h-screen w-full grid-cols-1 sm:grid-cols-5">
      {/*<LeftBar />*/}
      <Content>
        <div className="mt-5 mb-10">
          <BackButton href="/writing" name="All Writings" />
        </div>

        <h1 className="font-bold text-2xl text-zinc-800 tracking-tighter sm:text-3xl">
          {writing.title}
        </h1>
        <div className="mt-2 mb-8 flex items-center text-sm">
          <p>{formatDate(writing.publishedAt)}</p>
          &nbsp;&nbsp; <span className="text-zinc-400">•</span> &nbsp;&nbsp;
          <p>{writing.wordCount} Words</p>
          &nbsp;&nbsp; <span className="text-zinc-400">•</span> &nbsp;&nbsp;
          <p>{Math.ceil(writing.wordCount / 200)} Min Read</p>
        </div>
        <MDX html={html} />
      </Content>
      <TableOfContents slug={writing.slug} />
    </div>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <section className="border-zinc-200 pb-5 sm:col-span-4 sm:border-r sm:pr-5 sm:pl-2">
      {children}
    </section>
  );
}
