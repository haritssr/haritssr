import { describe, expect, mock, test } from "bun:test";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

import {
  getSearchMatchRanges,
  hasSearchQuery,
  searchRoutes,
} from "@/data/routes";

await mock.module("server-only", () => ({}));

const { getSearchIndex } = await import("./searchIndex");
const { isExperimentAvailable } = await import("./databaseExperiments");
const { default: sitemap } = await import("../app/sitemap");
const entries = getSearchIndex();
const routes = new Set(entries.map((entry) => entry.route));
const pageFile = /(?:^|\/)page\.(?:tsx?|jsx?|mdx)$/;
const pageSuffix = /\/?page\.(?:tsx?|jsx?|mdx)$/;

describe("global search index", () => {
  test("includes every available static page in the app directory", () => {
    const pages = readdirSync(path.join(process.cwd(), "app"), {
      recursive: true,
    });
    const missing = pages
      .filter(
        (file): file is string =>
          typeof file === "string" && pageFile.test(file) && !file.includes("[")
      )
      .map((file) => `/${file.replace(pageSuffix, "")}`)
      .filter((route) => {
        const [domain = "", experiment = ""] = route.split("/").slice(2);
        return isExperimentAvailable(domain, experiment) && !routes.has(route);
      });
    expect(missing).toEqual([]);
  });

  test("includes all sitemap pages, including concrete dynamic routes", () => {
    const missing = sitemap()
      .map((entry) => new URL(entry.url).pathname)
      .filter((route) => !routes.has(route));
    expect(missing).toEqual([]);
    expect(routes.size).toBe(entries.length);
  });

  test("each result resolves to a page file, never a route placeholder or API", () => {
    const dynamicRoutes = [
      { prefix: "/writing/", page: "writing/[slug]" },
      { prefix: "/projects/", page: "projects/[project]" },
      {
        prefix: "/experiments/nextjs/posts/",
        page: "experiments/nextjs/posts/[id]",
      },
      {
        prefix: "/experiments/nextjs/articles/",
        page: "experiments/nextjs/articles/[id]",
      },
      {
        prefix: "/experiments/nextjs/students/",
        page: "experiments/nextjs/students/[id]",
      },
    ];
    for (const { route } of entries) {
      expect(route).not.toContain("[");
      expect(route).not.toStartWith("/api/");
      const [pathname] = route.split("#");
      const dynamic = dynamicRoutes.find(({ prefix }) =>
        pathname.startsWith(prefix)
      );
      const directory = path.join(
        process.cwd(),
        "app",
        dynamic?.page ?? pathname
      );
      expect(
        ["tsx", "ts", "jsx", "js", "mdx"].some((extension) =>
          existsSync(path.join(directory, `page.${extension}`))
        )
      ).toBe(true);
    }
  });

  test("homepage suggestions link to real section anchors", () => {
    const directory = path.join(process.cwd(), "app/_HomeSections");
    const source = readdirSync(directory)
      .map((file) => readFileSync(path.join(directory, file), "utf-8"))
      .join("\n");
    for (const entry of entries.filter(
      (doc) => doc.group === "Homepage sections"
    )) {
      expect(source).toContain(`id="${entry.route.split("#")[1]}"`);
    }
  });

  test("respects deployment availability for database experiments", () => {
    const enabled = process.env.NODE_ENV !== "production";
    expect(routes.has("/experiments/ui-explorations/task")).toBe(enabled);
    expect(routes.has("/experiments/ui-explorations/task/history")).toBe(
      enabled
    );
    expect(routes.has("/experiments/ui-explorations/tools")).toBe(enabled);
  });
});

describe("search matching", () => {
  test("offers only primary navigation before typing", () => {
    const suggestions = searchRoutes(entries, "  ");
    expect(suggestions.map((entry) => entry.route)).toContain("/projects");
    expect(suggestions.map((entry) => entry.route)).not.toContain("/#misc");
    expect(
      suggestions.every((entry) => entry.suggestion === "Navigation")
    ).toBe(true);
  });

  test("treats punctuation-only input as an empty query", () => {
    expect(hasSearchQuery(" ... ")).toBe(false);
    expect(searchRoutes(entries, " ... ")).toEqual(searchRoutes(entries, ""));
  });

  test("keeps homepage sections searchable after typing", () => {
    expect(searchRoutes(entries, "profile contacts")[0]?.route).toBe(
      "/#contacts"
    );
  });

  test("matches partial words, mixed case, and multiple terms", () => {
    expect(
      searchRoutes(entries, "TAILW grid").map((entry) => entry.route)
    ).toContain("/experiments/tailwind-css/grid");
    expect(
      searchRoutes(entries, "haris lab").map((entry) => entry.route)
    ).toContain("/projects/haris-lab");
    expect(
      searchRoutes(entries, "product eng").map((entry) => entry.route)
    ).toContain("/writing/product-engineering");
    expect(
      searchRoutes(entries, "/experiments/nextjs/students/1").map(
        (entry) => entry.route
      )
    ).toContain("/experiments/nextjs/students/1");
  });

  test("normalizes accents and searches every indexed field", () => {
    const docs = [
      {
        description: "Résumé examples",
        group: "Reference Library",
        route: "/guides/cafe",
        title: "Café guide",
      },
    ];

    expect(searchRoutes(docs, "cafe")).toEqual(docs);
    expect(searchRoutes(docs, "resume")).toEqual(docs);
    expect(searchRoutes(docs, "reference")).toEqual(docs);
    expect(searchRoutes(docs, "/guides/cafe")).toEqual(docs);
  });

  test("locates visible matches using the same normalized search terms", () => {
    expect(
      getSearchMatchRanges("Reference · Résumé examples", "resume ref")
    ).toEqual([
      { end: 3, start: 0 },
      { end: 18, start: 12 },
    ]);
    expect(getSearchMatchRanges("Résumé", "resume sum")).toEqual([
      { end: 6, start: 0 },
    ]);
  });

  test("ranks exact title matches first and searches beyond the first twenty results", () => {
    expect(searchRoutes(entries, "Graph")[0].route).toBe("/writing/graph");
    expect(searchRoutes(entries, "experiments").length).toBeGreaterThan(20);
  });

  test("requires all query terms and returns no results for unmatched input", () => {
    expect(searchRoutes(entries, "tailwind nonexistentword")).toEqual([]);
    expect(searchRoutes(entries, "nonexistentword")).toEqual([]);
  });
});
