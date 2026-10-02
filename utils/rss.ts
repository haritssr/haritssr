import { BLOG_DESCRIPTION, BLOG_PATH, RSS_PATH, SITE_URL } from "./site";

const RSS_LANGUAGE = "en-US";
const RSS_TITLE = "Harits Syah — Blog";
const XML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "'": "&apos;",
  '"': "&quot;",
  "<": "&lt;",
  ">": "&gt;",
};
const xmlEscapePattern = /[&<>"']/g;

export interface RssBlogPost {
  publishedAt: string;
  slug: string;
  summary: string;
  title: string;
}

function escapeXml(value: string): string {
  return value.replace(xmlEscapePattern, (character) => XML_ESCAPES[character]);
}

function getPublicationDate(publishedAt: string): Date {
  const date = new Date(`${publishedAt}T00:00:00.000Z`);

  if (
    Number.isNaN(date.valueOf()) ||
    date.toISOString().slice(0, 10) !== publishedAt
  ) {
    throw new Error(`Invalid publishedAt date: ${publishedAt}`);
  }

  return date;
}

function formatRssDate(publishedAt: string): string {
  return getPublicationDate(publishedAt).toUTCString();
}

function getSiteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

function getBlogPostUrl(slug: string): string {
  return getSiteUrl(`${BLOG_PATH}/${slug}`);
}

export function renderBlogRssFeed(
  posts: readonly RssBlogPost[],
  buildDate = new Date()
): string {
  const sortedPosts = posts.toSorted((left, right) => {
    const dateDifference =
      getPublicationDate(right.publishedAt).valueOf() -
      getPublicationDate(left.publishedAt).valueOf();

    return dateDifference === 0
      ? left.slug.localeCompare(right.slug)
      : dateDifference;
  });
  const items = sortedPosts.map((post) => {
    const postUrl = getBlogPostUrl(post.slug);

    return [
      "    <item>",
      `      <title>${escapeXml(post.title)}</title>`,
      `      <link>${escapeXml(postUrl)}</link>`,
      `      <guid isPermaLink="true">${escapeXml(postUrl)}</guid>`,
      `      <pubDate>${formatRssDate(post.publishedAt)}</pubDate>`,
      `      <description>${escapeXml(post.summary)}</description>`,
      "    </item>",
    ].join("\n");
  });
  const lastBuildDate =
    sortedPosts.length > 0
      ? [`    <lastBuildDate>${buildDate.toUTCString()}</lastBuildDate>`]
      : [];
  const feedUrl = getSiteUrl(RSS_PATH);
  const blogUrl = getSiteUrl(BLOG_PATH);

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(RSS_TITLE)}</title>`,
    `    <link>${escapeXml(blogUrl)}</link>`,
    `    <description>${escapeXml(BLOG_DESCRIPTION)}</description>`,
    `    <language>${RSS_LANGUAGE}</language>`,
    `    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />`,
    ...lastBuildDate,
    ...items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
}
