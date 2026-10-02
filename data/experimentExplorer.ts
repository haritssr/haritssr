import { hasSearchQuery, searchRoutes } from "@/data/routes";

export interface ExperimentSummary {
  route: string;
  title: string;
  description: string;
  domain: string;
  domainTitle: string;
  tags: readonly string[];
  updatedAt: string;
}

export function filterExperiments(
  items: readonly ExperimentSummary[],
  filters: {
    q: string;
    domain: string;
    tag: string;
    sort: "recent" | "title";
  }
): ExperimentSummary[] {
  const matches = hasSearchQuery(filters.q)
    ? new Set(
        searchRoutes(
          items.map((item) => ({
            route: item.route,
            title: item.title,
            description: `${item.description} ${item.tags.join(" ")}`,
            group: item.domainTitle,
          })),
          filters.q
        ).map((item) => item.route)
      )
    : null;
  return items
    .filter(
      (item) =>
        (filters.domain === "" || item.domain === filters.domain) &&
        (filters.tag === "" || item.tags.includes(filters.tag)) &&
        (matches === null || matches.has(item.route))
    )
    .toSorted((left, right) =>
      filters.sort === "title"
        ? left.title.localeCompare(right.title, "en")
        : right.updatedAt.localeCompare(left.updatedAt)
    );
}
