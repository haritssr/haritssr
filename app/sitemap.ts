import type { MetadataRoute } from "next";

import {
  apiRoute,
  commitAnalysisRoute,
  commitsRoute,
  modelSuitabilityRoute,
} from "@/data/routes";
import { getAvailableExperimentSummaries } from "@/utils/experimentCatalog";
import { getExperimentRoutes } from "@/utils/experimentRoutes";
import { getProjectSlug } from "@/utils/projectSlug";
import { SITE_URL } from "@/utils/site";
import { allWritingPosts } from "@/utils/writing-posts";

import { ProjectsData } from "../data/ProjectsData";

const staticRoutes = [
  "/",
  "/projects",
  "/experiments",
  "/writing",
  "/design",
  "/more",
  commitsRoute.route,
  modelSuitabilityRoute.route,
  commitAnalysisRoute.route,
  apiRoute.route,
];

const experimentDates = new Map(
  getAvailableExperimentSummaries().map((entry) => [
    entry.route,
    entry.updatedAt,
  ])
);

const routeUrls = [
  ...new Set([
    ...staticRoutes,
    ...getExperimentRoutes().map((entry) => entry.route),
    ...ProjectsData.map(
      (project) => `/projects/${getProjectSlug(project.project_name)}`
    ),
  ]),
].map((route) => ({
  url: `${SITE_URL}${route}`,
  ...(experimentDates.has(route)
    ? { lastModified: experimentDates.get(route) }
    : {}),
}));

const writingPostUrls = allWritingPosts.map((post) => ({
  lastModified: new Date(post.publishedAt),
  url: `${SITE_URL}/writing/${post.slug}`,
}));

export default function sitemap(): MetadataRoute.Sitemap {
  return [...routeUrls, ...writingPostUrls];
}
