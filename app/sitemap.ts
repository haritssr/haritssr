import { allWritings } from "@content-collections";
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/utils/site";
import { ExperimentsData } from "../data/ExperimentsData";
import {
  NextjsArticlesData,
  NextjsStudentsData,
} from "../data/NextjsExperimentsData";
import { ProjectsData } from "../data/ProjectsData";
import { getAllPostIds } from "../utils/posts.js";

const whitespaceSequencePattern = /\s+/g;

const staticRoutes = [
  "/",
  "/writing",
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

const articleRoutes = NextjsArticlesData.map(
  (article) => `/experiments/nextjs/articles/${article.id}`
);

const studentRoutes = NextjsStudentsData.map(
  (student) => `/experiments/nextjs/students/${student.id}`
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

const writingUrls = allWritings.map((writing) => ({
  lastModified: new Date(writing.publishedAt),
  url: `${SITE_URL}/writing/${writing.slug}`,
}));

export default function sitemap(): MetadataRoute.Sitemap {
  return [...routeUrls, ...writingUrls];
}
