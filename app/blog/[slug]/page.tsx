import { allBlogs } from "@content-collections";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type React from "react";
import Balancer from "react-wrap-balancer";
import BackButton from "@/components/BackButton";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Mdx } from "@/components/mdx";
import LeftBar from "./LeftBar";
import TableOfContents from "./TableOfContent";

export function generateStaticParams() {
  return allBlogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = allBlogs.find((blog) => blog.slug === slug);

  if (!blog) {
    return {};
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    slug: blogSlug,
  } = blog;

  const image = "/images/openGraphImage.png";

  return {
    title,
    description,
    metadataBase: new URL("https://haritssr.vercel.app"),
    openGraph: {
      title,
      description,
      publishedTime,
      siteName: "Harits Syah Blog",
      url: `https://haritssr.vercel.app/blog/${blogSlug}`,
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
  const targetDate = new Date(date);

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

export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = allBlogs.find((blog) => blog.slug === slug);

  if (!blog) {
    notFound();
  }

  const html = await markdownToHtml(blog.content);

  return (
    <div className="grid min-h-screen w-full grid-cols-1 sm:grid-cols-5">
      <LeftBar />
      <Content>
        <Breadcrumbs />
        <div className="my-5">
          <BackButton href="/blog" name="All Articles" />
        </div>
        <script suppressHydrationWarning type="application/ld+json">
          {JSON.stringify(blog.structuredData)}
        </script>
        <h1 className="font-bold text-2xl tracking-tighter">
          <Balancer>{blog.title}</Balancer>
        </h1>
        <div className="mt-2 mb-8 flex items-center text-sm">
          <p>{formatDate(blog.publishedAt)}</p>
          &nbsp;&nbsp; <span className="text-zinc-400">•</span> &nbsp;&nbsp;
          <p>{blog.wordCount} Words</p>
          &nbsp;&nbsp; <span className="text-zinc-400">•</span> &nbsp;&nbsp;
          <p>{Math.ceil(blog.wordCount / 200)} Min Read</p>
        </div>
        <Mdx html={html} />
      </Content>
      <TableOfContents
        title={blog.title.toLocaleLowerCase().split(" ").join("-")}
      />
    </div>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <section className="border-zinc-200 pb-5 sm:col-span-3 sm:border-r sm:border-b sm:px-5">
      {children}
    </section>
  );
}
