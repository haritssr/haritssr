import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

import {
  DiscontinuedLabsData,
  discontinuedLabHistory,
} from "@/data/DiscontinuedLabsData";
import { LabsData, getLatestLabUpdate } from "@/data/LabsData";
import { getAvailableLabSummaries } from "@/utils/labCatalog";
import { getLabRoutes } from "@/utils/labRoutes";
import { getSearchIndex } from "@/utils/searchIndex";
import { parseWritingPost } from "@/utils/writing-posts";

const failures: string[] = [];
const catalogRoutes = new Set<string>();
const domains = new Set<string>();
const datePattern = /^\d{4}-\d{2}-\d{2}$/u;
const localRoutePattern = /^\/labs\/user-interface\/(?:task|tools)(?:\/|$)/u;
const titleSeparatorPattern = /[^a-z0-9]+/g;

function archivedRoutes(formerRoute: string): string[] {
  // Keep the recorded URL intact while also checking the renamed namespace.
  return [formerRoute, formerRoute.replace(/^\/experiments(?=\/|$)/u, "/labs")];
}

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

for (const domain of LabsData) {
  const usesTitleSlugs =
    domain.slug === "mathematics" || domain.slug === "physics";
  if (usesTitleSlugs && domain.slug !== titleSlug(domain.title)) {
    failures.push(`Domain name differs from URL: ${domain.slug}`);
  }
  if (domains.has(domain.slug)) {
    failures.push(`Duplicate domain: ${domain.slug}`);
  }
  domains.add(domain.slug);
  for (const lab of domain.labs) {
    const route = `/labs/${domain.slug}/${lab.slug}`;
    if (usesTitleSlugs && lab.slug !== titleSlug(lab.title)) {
      failures.push(`Lab name differs from URL: ${route}`);
    }
    if (catalogRoutes.has(route)) {
      failures.push(`Duplicate route: ${route}`);
    }
    catalogRoutes.add(route);
    if (!existsSync(path.join("app", route, "page.tsx"))) {
      failures.push(`Missing page: ${route}`);
    }
    if (
      lab.description.trim() === "" ||
      lab.tags.length === 0 ||
      lab.tags.some((tag) => tag.trim() === "")
    ) {
      failures.push(`Missing discovery content: ${route}`);
    }
    const dates = [lab.createdAt, ...lab.updatedAt];
    if (
      !dates.every(validDate) ||
      lab.updatedAt.some((date) => date < lab.createdAt)
    ) {
      failures.push(`Invalid dates: ${route}`);
    }
    if (new Set(lab.updatedAt).size !== lab.updatedAt.length) {
      failures.push(`Duplicate update date: ${route}`);
    }
    if (getLatestLabUpdate(lab) !== dates.toSorted().at(-1)) {
      failures.push(`Incorrect latest update: ${route}`);
    }
  }
}

for (const domain of readdirSync("app/labs", { withFileTypes: true })) {
  if (!domain.isDirectory() || domain.name.startsWith("_")) {
    continue;
  }
  for (const lab of readdirSync(path.join("app/labs", domain.name), {
    withFileTypes: true,
  })) {
    if (
      !lab.isDirectory() ||
      lab.name.startsWith("_") ||
      lab.name.startsWith("[")
    ) {
      continue;
    }
    const route = `/labs/${domain.name}/${lab.name}`;
    if (
      existsSync(path.join("app", route, "page.tsx")) &&
      !catalogRoutes.has(route)
    ) {
      failures.push(`Uncataloged page: ${route}`);
    }
  }
}

const writingFiles = readdirSync("data/writing").filter((file) =>
  file.endsWith(".mdx")
);
for (const file of writingFiles) {
  try {
    parseWritingPost(
      file,
      readFileSync(path.join("data/writing", file), "utf-8")
    );
  } catch (error) {
    failures.push(String(error));
  }
}

const archiveSlugs = new Set<string>();
for (const record of DiscontinuedLabsData) {
  if (archiveSlugs.has(record.slug)) {
    failures.push(`Duplicate archive record: ${record.slug}`);
  }
  archiveSlugs.add(record.slug);
  if (!Number.isInteger(record.labCount) || record.labCount < 1) {
    failures.push(`Invalid historical lab count: ${record.slug}`);
  }
  if (record.title.trim() === "" || record.description.trim() === "") {
    failures.push(`Missing archive content: ${record.slug}`);
  }
  for (const route of archivedRoutes(record.formerRoute)) {
    if (existsSync(path.join("app", route))) {
      failures.push(`Removed lab implementation still exists: ${route}`);
    }
  }
}
const { removalCommitSha } = discontinuedLabHistory;
if (
  removalCommitSha !== undefined &&
  !/^[a-f0-9]{40}$/u.test(removalCommitSha)
) {
  failures.push("Removal commit SHA must be a full Git commit hash.");
}

const routes = getLabRoutes();
const searchRoutes = new Set(getSearchIndex().map((entry) => entry.route));
for (const { route } of routes) {
  if (!searchRoutes.has(route)) {
    failures.push(`Lab absent from search: ${route}`);
  }
  if (process.env.NODE_ENV === "production" && localRoutePattern.test(route)) {
    failures.push(`Local-only route in production: ${route}`);
  }
}
for (const record of DiscontinuedLabsData) {
  if (
    routes.some(({ route }) =>
      archivedRoutes(record.formerRoute).some(
        (archivedRoute) =>
          route === archivedRoute || route.startsWith(`${archivedRoute}/`)
      )
    )
  ) {
    failures.push(
      `Archived lab appears in the live route index: ${record.formerRoute}`
    );
  }
}
const available = getAvailableLabSummaries();
for (const entry of available) {
  if (!routes.some(({ route }) => route === entry.route)) {
    failures.push(`Available lab absent from route index: ${entry.route}`);
  }
}
if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `Validated ${catalogRoutes.size} labs in ${domains.size} domains, ${writingFiles.length} writing posts, and ${available.length} available labs (${process.env.NODE_ENV ?? "development"}).`
  );
}
