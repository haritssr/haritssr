import { describe, expect, mock, test } from "bun:test";

await mock.module("server-only", () => ({}));

const { allWritings, getWriting, parseWriting } = await import("./writings");
const { writingModuleSlugs } = await import("./writing-modules");

const expectedSlugs = [
  "graph",
  "product-engineering",
  "transformation",
  "on-design-principles",
  "how-brain-works",
  "on-decision-making",
  "on-problem",
  "on-curiosity",
  "on-knowledge",
  "on-learning",
  "on-writing",
  "the-most-persisted-myth",
  "on-information",
  "why-i-am-building-haris-lab",
  "context-switching",
  "on-questions",
  "remembering-death",
  "tim-cook-speech-stanford",
];

describe("writing index", () => {
  test("loads every MDX file in reverse chronological order", () => {
    expect(allWritings.map(({ slug }) => slug)).toEqual(expectedSlugs);
    expect(Object.isFrozen(allWritings)).toBe(true);
  });

  test("keeps the MDX registry synchronized with the content directory", () => {
    expect(writingModuleSlugs.toSorted()).toEqual(expectedSlugs.toSorted());
  });

  test("keeps every summary at exactly six words", () => {
    for (const writing of allWritings) {
      const wordCount = writing.summary.trim().split(/\s+/).length;

      expect(wordCount).toBe(6);
    }
  });

  test("looks up known writings and rejects unknown slugs", () => {
    expect(getWriting("graph")).toMatchObject({
      publishedAt: "2026-09-04",
      title: "Graph",
    });
    expect(getWriting("product-engineering")).toMatchObject({
      publishedAt: "2026-08-22",
      title: "Product Engineering",
    });
    expect(getWriting("transformation")).toMatchObject({
      publishedAt: "2026-08-16",
      title: "Transformation",
    });
    expect(getWriting("missing-writing")).toBeUndefined();
  });
});

describe("parseWriting", () => {
  test("normalizes YAML dates and counts content words", () => {
    expect(
      parseWriting(
        "example.mdx",
        `---
title: Example
publishedAt: 2026-09-07
summary: A concise summary containing exactly six
topic: Engineering
---

One two\nthree`
      )
    ).toEqual({
      publishedAt: "2026-09-07",
      slug: "example",
      summary: "A concise summary containing exactly six",
      title: "Example",
      topic: "Engineering",
      wordCount: 3,
    });
  });

  test("reports invalid frontmatter with its filename", () => {
    expect(() =>
      parseWriting(
        "invalid.mdx",
        `---
title: Invalid
publishedAt: not-a-date
summary: A summary
topic: Engineering
extra: rejected
---`
      )
    ).toThrow("Invalid writing frontmatter in invalid.mdx");
  });

  test("rejects summaries that do not contain exactly six words", () => {
    for (const summary of [
      "Too short",
      "This summary contains more than exactly six words",
    ]) {
      expect(() =>
        parseWriting(
          "invalid-summary.mdx",
          `---
title: Invalid summary
publishedAt: 2026-09-07
summary: ${summary}
topic: Engineering
---`
        )
      ).toThrow("Invalid writing frontmatter in invalid-summary.mdx");
    }
  });
});
