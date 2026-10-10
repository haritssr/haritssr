import type { MetadataRoute } from "next";

import { allBlogPosts } from "@/utils/blog-posts";
import { getAvailableExperimentSummaries } from "@/utils/experimentCatalog";
import { getExperimentRoutes } from "@/utils/experimentRoutes";
import { getProjectSlug } from "@/utils/projectSlug";
import { SITE_URL } from "@/utils/site";

import { ProjectsData } from "../data/ProjectsData";

const staticRoutes = ["/", "/projects", "/experiments", "/blog", "/design"];

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

const blogPostUrls = allBlogPosts.map((post) => ({
  lastModified: new Date(post.publishedAt),
  url: `${SITE_URL}/blog/${post.slug}`,
}));

export default function sitemap(): MetadataRoute.Sitemap {
  return [...routeUrls, ...blogPostUrls];
}
