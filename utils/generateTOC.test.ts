import { afterEach, describe, expect, test } from "bun:test";

import generateTOC from "./generateTOC";

describe("generateTOC", () => {
  const originalConsoleError = console.error;

  afterEach(() => {
    console.error = originalConsoleError;
  });

  test("extracts and normalizes Markdown headings", () => {
    expect(
      generateTOC("data/writing/on-design-principles.mdx").map(({ title }) =>
        title.toLocaleLowerCase("en-US")
      )
    ).toEqual([
      "apps should provide",
      "everyone needs to..",
      "wayfinding system",
      "feedback",
      "visibility",
      "consistency",
      "mental model",
      "proximity",
      "grouping",
      "mapping",
      "affordance",
      "progressive disclosure",
      "pareto principle",
      "symmetry",
      "summary",
      "challanges applying design principles",
      "notes",
    ]);
  });

  test("matches rehype-slug for formatted and punctuation-heavy headings", () => {
    const learningItems = generateTOC("data/writing/on-learning.mdx");
    expect(learningItems).toContainEqual({
      id: "asynchronous-reading",
      title: "Asynchronous Reading",
    });

    const decisionItems = generateTOC("data/writing/on-decision-making.mdx");
    expect(decisionItems[1]?.id).toBe(
      "2-two-choice-looks-50--50-take-the-path-that-is-more-difficult-and-painful-in-the-short-term"
    );
  });

  test("returns an empty list when the file cannot be read", () => {
    console.error = () => {};

    expect(generateTOC("data/writing/__missing__.mdx")).toEqual([]);
  });
});
