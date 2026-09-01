import { describe, expect, test } from "bun:test";

import { sourceUrl } from "./site";

describe("sourceUrl", () => {
  test("builds a source URL from a repository path", () => {
    expect(sourceUrl("app/experiments/react/cmdk")).toBe(
      "https://github.com/haritssr/haritssr/tree/main/app/experiments/react/cmdk"
    );
  });

  test("encodes dynamic route segments", () => {
    const url = sourceUrl("app/experiments/nextjs/articles/[id]");

    expect(url).toBe(
      "https://github.com/haritssr/haritssr/tree/main/app/experiments/nextjs/articles/%5Bid%5D"
    );
    expect(url).not.toContain("[id]");
  });
});
