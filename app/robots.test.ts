import { describe, expect, test } from "bun:test";

import robots from "./robots";

describe("robots", () => {
  test("keeps public pages crawlable and excludes API routes", () => {
    expect(robots()).toEqual({
      rules: {
        allow: "/",
        disallow: "/api/",
        userAgent: "*",
      },
      sitemap: "https://www.haritssr.com/sitemap.xml",
    });
  });
});
