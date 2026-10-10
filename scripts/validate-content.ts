import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

import {
  DiscontinuedExperimentsData,
  discontinuedExperimentHistory,
} from "@/data/DiscontinuedExperimentsData";
import {
  ExperimentsData,
  getLatestExperimentUpdate,
} from "@/data/ExperimentsData";
import { parseBlogPost } from "@/utils/blog-posts";
import { getAvailableExperimentSummaries } from "@/utils/experimentCatalog";
import { getExperimentRoutes } from "@/utils/experimentRoutes";
import { getSearchIndex } from "@/utils/searchIndex";

const failures: string[] = [];
const catalogRoutes = new Set<string>();
const domains = new Set<string>();
const datePattern = /^\d{4}-\d{2}-\d{2}$/u;
const localRoutePattern =
  /^\/experiments\/ui-explorations\/(?:task|tools)(?:\/|$)/u;
const titleSeparatorPattern = /[^a-z0-9]+/g;

function titleSlug(title: string): string {
  return title.toLowerCase().replace(titleSeparatorPattern, "-");
}

function validDate(value: string): boolean {
  if (!datePattern.test(value)) {
    return false;
  }
  const date = new Date(`${value}T00:00:00.000Z`);
  return (
    Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value
  );
}

for (const domain of ExperimentsData) {
  const usesTitleSlugs =
    domain.slug === "mathematics" || domain.slug === "physics";
  if (usesTitleSlugs && domain.slug !== titleSlug(domain.title)) {
    failures.push(`Domain name differs from URL: ${domain.slug}`);
  }
  if (domains.has(domain.slug)) {
    failures.push(`Duplicate domain: ${domain.slug}`);
  }
  domains.add(domain.slug);
  for (const experiment of domain.experiments) {
    const route = `/experiments/${domain.slug}/${experiment.slug}`;
    if (usesTitleSlugs && experiment.slug !== titleSlug(experiment.title)) {
      failures.push(`Experiment name differs from URL: ${route}`);
    }
    if (catalogRoutes.has(route)) {
      failures.push(`Duplicate route: ${route}`);
    }
    catalogRoutes.add(route);
    if (!existsSync(path.join("app", route, "page.tsx"))) {
      failures.push(`Missing page: ${route}`);
    }
    if (
      experiment.description.trim() === "" ||
      experiment.tags.length === 0 ||
      experiment.tags.some((tag) => tag.trim() === "")
    ) {
      failures.push(`Missing discovery content: ${route}`);
    }
    const dates = [experiment.createdAt, ...experiment.updatedAt];
    if (
      !dates.every(validDate) ||
      experiment.updatedAt.some((date) => date < experiment.createdAt)
    ) {
      failures.push(`Invalid dates: ${route}`);
    }
    if (new Set(experiment.updatedAt).size !== experiment.updatedAt.length) {
      failures.push(`Duplicate update date: ${route}`);
    }
    if (getLatestExperimentUpdate(experiment) !== dates.toSorted().at(-1)) {
      failures.push(`Incorrect latest update: ${route}`);
    }
  }
}

for (const domain of readdirSync("app/experiments", { withFileTypes: true })) {
  if (!domain.isDirectory() || domain.name.startsWith("_")) {
    continue;
  }
  for (const experiment of readdirSync(
    path.join("app/experiments", domain.name),
    { withFileTypes: true }
  )) {
    if (
      !experiment.isDirectory() ||
      experiment.name.startsWith("_") ||
      experiment.name.startsWith("[")
    ) {
      continue;
    }
    const route = `/experiments/${domain.name}/${experiment.name}`;
    if (
      existsSync(path.join("app", route, "page.tsx")) &&
      !catalogRoutes.has(route)
    ) {
      failures.push(`Uncataloged page: ${route}`);
    }
  }
}

const blogFiles = readdirSync("data/blog").filter((file) =>
  file.endsWith(".mdx")
);
for (const file of blogFiles) {
  try {
    parseBlogPost(file, readFileSync(path.join("data/blog", file), "utf-8"));
  } catch (error) {
    failures.push(String(error));
  }
}

const archiveSlugs = new Set<string>();
for (const record of DiscontinuedExperimentsData) {
  if (archiveSlugs.has(record.slug)) {
    failures.push(`Duplicate archive record: ${record.slug}`);
  }
  archiveSlugs.add(record.slug);
  if (!Number.isInteger(record.experimentCount) || record.experimentCount < 1) {
    failures.push(`Invalid historical experiment count: ${record.slug}`);
  }
  if (record.title.trim() === "" || record.description.trim() === "") {
    failures.push(`Missing archive content: ${record.slug}`);
  }
  if (existsSync(path.join("app", record.formerRoute))) {
    failures.push(
      `Removed experiment implementation still exists: ${record.formerRoute}`
    );
  }
}
const { removalCommitSha } = discontinuedExperimentHistory;
if (
  removalCommitSha !== undefined &&
  !/^[a-f0-9]{40}$/u.test(removalCommitSha)
) {
  failures.push("Removal commit SHA must be a full Git commit hash.");
}

const routes = getExperimentRoutes();
const searchRoutes = new Set(getSearchIndex().map((entry) => entry.route));
for (const { route } of routes) {
  if (!searchRoutes.has(route)) {
    failures.push(`Experiment absent from search: ${route}`);
  }
  if (process.env.NODE_ENV === "production" && localRoutePattern.test(route)) {
    failures.push(`Local-only route in production: ${route}`);
  }
}
for (const record of DiscontinuedExperimentsData) {
  if (
    routes.some(
      ({ route }) =>
        route === record.formerRoute ||
        route.startsWith(`${record.formerRoute}/`)
    )
  ) {
    failures.push(
      `Archived experiment appears in the live route index: ${record.formerRoute}`
    );
  }
}
const available = getAvailableExperimentSummaries();
for (const entry of available) {
  if (!routes.some(({ route }) => route === entry.route)) {
    failures.push(
      `Available experiment absent from route index: ${entry.route}`
    );
  }
}
if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `Validated ${catalogRoutes.size} experiments in ${domains.size} domains, ${blogFiles.length} blog posts, and ${available.length} available experiments (${process.env.NODE_ENV ?? "development"}).`
  );
}
