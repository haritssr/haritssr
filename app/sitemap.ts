import type { MetadataRoute } from "next";

import {
  apiRoute,
  commitAnalysisRoute,
  commitsRoute,
  modelSuitabilityRoute,
  october21AnalysisRoute,
  october22AnalysisRoute,
  todayModelSuitabilityRoute,
  weeklyChangelogRoute,
} from "@/data/routes";
import { getAvailableLabSummaries } from "@/utils/labCatalog";
import { getLabRoutes } from "@/utils/labRoutes";
import { getProjectSlug } from "@/utils/projectSlug";
import { SITE_URL } from "@/utils/site";
import { allWritingPosts } from "@/utils/writing-posts";

import { ProjectsData } from "./projects/data";

const staticRoutes = [
  "/",
  "/projects",
  "/labs",
  "/writing",
  "/design",
  "/more",
  "/timer",
  "/tree",
  "/timer/statistic",
  "/timer/details",
  commitsRoute.route,
  weeklyChangelogRoute.route,
  modelSuitabilityRoute.route,
  todayModelSuitabilityRoute.route,
  commitAnalysisRoute.route,
  october21AnalysisRoute.route,
  october22AnalysisRoute.route,
  apiRoute.route,
];

const labDates = new Map(
  getAvailableLabSummaries().map((entry) => [entry.route, entry.updatedAt])
);

const routeUrls = [
  ...new Set([
    ...staticRoutes,
    ...getLabRoutes().map((entry) => entry.route),
    ...ProjectsData.map(
      (project) => `/projects/${getProjectSlug(project.project_name)}`
    ),
  ]),
].map((route) => ({
  url: `${SITE_URL}${route}`,
  ...(labDates.has(route) ? { lastModified: labDates.get(route) } : {}),
}));

const writingPostUrls = allWritingPosts.map((post) => ({
  lastModified: new Date(post.publishedAt),
  url: `${SITE_URL}/writing/${post.slug}`,
}));

export default function sitemap(): MetadataRoute.Sitemap {
  return [...routeUrls, ...writingPostUrls];
}
