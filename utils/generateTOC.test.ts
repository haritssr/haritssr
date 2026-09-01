import { afterEach, describe, expect, test } from "bun:test";

import generateTOC from "./generateTOC";

describe("generateTOC", () => {
  const originalConsoleError = console.error;

  afterEach(() => {
    console.error = originalConsoleError;
  });

  test("extracts and normalizes Markdown headings", () => {
    expect(generateTOC("data/writing/on-design-principles.mdx")).toEqual([
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

  test("returns an empty list when the file cannot be read", () => {
    console.error = () => {};

    expect(generateTOC("data/writing/__missing__.mdx")).toEqual([]);
  });
});
