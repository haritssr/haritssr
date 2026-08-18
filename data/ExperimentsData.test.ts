import { describe, expect, test } from "bun:test";
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { ExperimentsData } from "./ExperimentsData";

const experimentsRoot = path.join(process.cwd(), "app", "experiments");

function hasRouteFile(...segments: string[]): boolean {
  return existsSync(path.join(experimentsRoot, ...segments, "page.tsx"));
}

describe("experiments route catalog", () => {
  test("uses unique domain and experiment slugs", () => {
    const domainSlugs = ExperimentsData.map((domain) => domain.slug);

    expect(new Set(domainSlugs).size).toBe(domainSlugs.length);

    for (const domain of ExperimentsData) {
      const experimentSlugs = domain.experiments.map(
        (experiment) => experiment.slug
      );

      expect(new Set(experimentSlugs).size).toBe(experimentSlugs.length);
    }
  });

  test("maps every catalog entry to an explicit App Router page", () => {
    for (const domain of ExperimentsData) {
      expect(hasRouteFile(domain.slug)).toBe(true);
      expect(
        existsSync(path.join(experimentsRoot, domain.slug, "layout.tsx"))
      ).toBe(true);

      for (const experiment of domain.experiments) {
        expect(hasRouteFile(domain.slug, experiment.slug)).toBe(true);
      }
    }
  });

  test("catalogs every direct experiment page", () => {
    for (const domain of ExperimentsData) {
      const routeSlugs = readdirSync(path.join(experimentsRoot, domain.slug), {
        withFileTypes: true,
      })
        .filter(
          (entry) =>
            entry.isDirectory() && hasRouteFile(domain.slug, entry.name)
        )
        .map((entry) => entry.name)
        .toSorted();
      const catalogSlugs = domain.experiments
        .map((experiment) => experiment.slug)
        .toSorted();

      expect(routeSlugs).toEqual(catalogSlugs);
    }
  });

  test("does not retain the dynamic component registry", () => {
    expect(
      existsSync(
        path.join(experimentsRoot, "[domain]", "[experiment]", "page.tsx")
      )
    ).toBe(false);
  });
});
