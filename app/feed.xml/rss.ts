import { BLOG_DESCRIPTION, BLOG_PATH, RSS_PATH, SITE_URL } from "@/utils/site";

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

function getSiteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

function renderRssItem(post: RssBlogPost, publicationDate: Date): string {
  const postUrl = escapeXml(getSiteUrl(`${BLOG_PATH}/${post.slug}`));

  return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${publicationDate.toUTCString()}</pubDate>
      <description>${escapeXml(post.summary)}</description>
    </item>`;
}

export function renderBlogRssFeed(
  posts: readonly RssBlogPost[],
  buildDate = new Date()
): string {
  const items = posts
    .map((post) => ({
      post,
      publicationDate: getPublicationDate(post.publishedAt),
    }))
    .toSorted(
      (left, right) =>
        right.publicationDate.valueOf() - left.publicationDate.valueOf() ||
        left.post.slug.localeCompare(right.post.slug)
    )
    .map(({ post, publicationDate }) => renderRssItem(post, publicationDate));
  const lastBuildDate =
    items.length > 0
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
