import { describe, expect, test } from "bun:test";
import { renderWritingRssFeed } from "./rss";

describe("renderWritingRssFeed", () => {
  test("renders escaped, canonical, newest-first RSS items", () => {
    const writings = [
      {
        publishedAt: "2023-08-16",
        slug: "older",
        summary: "Notes about A & B < C > D",
        title: "Older & <Post> '",
        topic: "Humanity",
      },
      {
        publishedAt: "2023-09-09",
        slug: "zeta",
        summary: "A newer note",
        title: "Zeta",
        topic: "Engineering",
      },
      {
        publishedAt: "2023-09-09",
        slug: "alpha",
        summary: "Another newer note",
        title: "Alpha",
        topic: "Engineering",
      },
    ];

    const xml = renderWritingRssFeed(
      writings,
      new Date("2023-10-01T12:34:56.000Z")
    );

    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain(
      '<atom:link href="https://www.haritssr.com/feed.xml" rel="self" type="application/rss+xml" />'
    );
    expect(xml).toContain(
      "<link>https://www.haritssr.com/writing/alpha</link>"
    );
    expect(xml).toContain("<title>Older &amp; &lt;Post&gt; &apos;</title>");
    expect(xml).toContain(
      "<description>Notes about A &amp; B &lt; C &gt; D</description>"
    );
    expect(xml).toContain("<pubDate>Sat, 09 Sep 2023 00:00:00 GMT</pubDate>");
    expect(xml).toContain(
      "<lastBuildDate>Sun, 01 Oct 2023 12:34:56 GMT</lastBuildDate>"
    );
    expect(xml).toContain(
      '<guid isPermaLink="true">https://www.haritssr.com/writing/alpha</guid>'
    );
    expect(xml.indexOf("<title>Alpha</title>")).toBeLessThan(
      xml.indexOf("<title>Zeta</title>")
    );
    expect(xml.indexOf("<title>Zeta</title>")).toBeLessThan(
      xml.indexOf("<title>Older &amp; &lt;Post&gt; &apos;</title>")
    );
    expect(writings.map((writing) => writing.slug)).toEqual([
      "older",
      "zeta",
      "alpha",
    ]);
  });

  test("renders a channel without items when there are no writings", () => {
    const xml = renderWritingRssFeed([]);

    expect(xml).toContain("<channel>");
    expect(xml).not.toContain("<item>");
    expect(xml).not.toContain("<lastBuildDate>");
  });

  test("rejects invalid publication dates", () => {
    for (const publishedAt of ["2023-99-99", "2023-02-31"]) {
      expect(() =>
        renderWritingRssFeed([
          {
            publishedAt,
            slug: "invalid",
            summary: "Invalid",
            title: "Invalid",
            topic: "Engineering",
          },
        ])
      ).toThrow(`Invalid publishedAt date: ${publishedAt}`);
    }
  });
});
