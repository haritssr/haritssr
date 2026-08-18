import { allBlogs } from "@content-collections";
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/utils/site";
import { ExperimentsData } from "../data/ExperimentsData";
import { ProjectsData } from "../data/ProjectsData";
import { getAllPostIds } from "../utils/posts.js";

const whitespaceSequencePattern = /\s+/g;

const staticRoutes = [
  "/",
  "/blog",
  "/experiments",
  "/projects",
  "/pure",
  "/task",
  "/task/architecture",
  "/task/history",
  "/task/statistics",
  "/tools",
];

const experimentRoutes = ExperimentsData.flatMap((domain) => {
  const routes = domain.experiments
    .filter((experiment) => !experiment.redirectTo)
    .map((experiment) => `/experiments/${domain.slug}/${experiment.slug}`);

  return [`/experiments/${domain.slug}`, ...routes];
});

const localPostRoutes = getAllPostIds().map(
  ({ params }) => `/experiments/nextjs/posts/${params.id}`
);

const articleRoutes = Array.from(
  { length: 20 },
  (_, index) => `/experiments/nextjs/articles/${index + 1}`
);

const studentRoutes = Array.from(
  { length: 10 },
  (_, index) => `/experiments/nextjs/students/${index + 1}`
);

const routeUrls = Array.from(
  new Set([
    ...staticRoutes,
    ...experimentRoutes,
    ...localPostRoutes,
    ...articleRoutes,
    ...studentRoutes,
    ...ProjectsData.map(
      (project) =>
        `/projects/${project.project_name.toLowerCase().replace(whitespaceSequencePattern, "-")}`
    ),
  ])
).map((route) => ({ url: `${SITE_URL}${route}` }));

const blogUrls = allBlogs.map((blog) => ({
  lastModified: new Date(blog.publishedAt),
  url: `${SITE_URL}/blog/${blog.slug}`,
}));

export default function sitemap(): MetadataRoute.Sitemap {
  return [...routeUrls, ...blogUrls];
}
