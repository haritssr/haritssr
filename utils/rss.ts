import { RSS_PATH, SITE_URL, WRITING_DESCRIPTION, WRITING_PATH } from "./site";

const RSS_LANGUAGE = "en-US";
const RSS_TITLE = "Harits Syah — Writing";
const XML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "'": "&apos;",
  '"': "&quot;",
  "<": "&lt;",
  ">": "&gt;",
};
const xmlEscapePattern = /[&<>"']/g;

export interface RssWriting {
  publishedAt: string;
  slug: string;
  summary: string;
  title: string;
  topic: string;
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

function getWritingUrl(slug: string): string {
  return getSiteUrl(`${WRITING_PATH}/${slug}`);
}

export function renderWritingRssFeed(writings: readonly RssWriting[]): string {
  const sortedWritings = writings.toSorted((left, right) => {
    const dateDifference =
      getPublicationDate(right.publishedAt).valueOf() -
      getPublicationDate(left.publishedAt).valueOf();

    return dateDifference === 0
      ? left.slug.localeCompare(right.slug)
      : dateDifference;
  });
  const [newestWriting] = sortedWritings;
  const items = sortedWritings.map((writing) => {
    const writingUrl = getWritingUrl(writing.slug);

    return [
      "    <item>",
      `      <title>${escapeXml(writing.title)}</title>`,
      `      <link>${escapeXml(writingUrl)}</link>`,
      `      <guid isPermaLink="true">${escapeXml(writingUrl)}</guid>`,
      `      <pubDate>${formatRssDate(writing.publishedAt)}</pubDate>`,
      `      <description>${escapeXml(writing.summary)}</description>`,
      `      <category>${escapeXml(writing.topic)}</category>`,
      "    </item>",
    ].join("\n");
  });
  const lastBuildDate = newestWriting
    ? [
        `    <lastBuildDate>${formatRssDate(newestWriting.publishedAt)}</lastBuildDate>`,
      ]
    : [];
  const feedUrl = getSiteUrl(RSS_PATH);
  const writingUrl = getSiteUrl(WRITING_PATH);

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(RSS_TITLE)}</title>`,
    `    <link>${escapeXml(writingUrl)}</link>`,
    `    <description>${escapeXml(WRITING_DESCRIPTION)}</description>`,
    `    <language>${RSS_LANGUAGE}</language>`,
    `    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />`,
    ...lastBuildDate,
    ...items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
}
