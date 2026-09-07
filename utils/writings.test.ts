import { describe, expect, mock, test } from "bun:test";

await mock.module("server-only", () => ({}));

const { allWritings, getWriting, parseWriting } = await import("./writings");
const { writingModuleSlugs } = await import("./writing-modules");

const expectedSlugs = [
  "context-switching",
  "how-brain-works",
  "on-curiosity",
  "on-decision-making",
  "on-design-principles",
  "on-information",
  "on-knowledge",
  "on-learning",
  "on-problem",
  "on-questions",
  "on-writing",
  "product-engineering",
  "remembering-death",
  "the-most-persisted-myth",
  "tim-cook-speech-stanford",
  "why-i-am-building-haris-lab",
];

describe("writing index", () => {
  test("loads every MDX file in deterministic slug order", () => {
    expect(allWritings.map(({ slug }) => slug)).toEqual(expectedSlugs);
    expect(Object.isFrozen(allWritings)).toBe(true);
  });

  test("keeps the MDX registry synchronized with the content directory", () => {
    expect(writingModuleSlugs.toSorted()).toEqual(expectedSlugs);
  });

  test("looks up known writings and rejects unknown slugs", () => {
    expect(getWriting("product-engineering")).toMatchObject({
      publishedAt: "2026-08-22",
      title: "Product Engineering",
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
summary: A summary
topic: Engineering
---

One two\nthree`
      )
    ).toEqual({
      publishedAt: "2026-09-07",
      slug: "example",
      summary: "A summary",
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
});
