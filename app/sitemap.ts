import type { MetadataRoute } from "next";

import { SITE_URL } from "@/utils/site";
import { allWritings } from "@/utils/writings";

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
  "/design",
  "/experiments/ui-explorations/task/architecture",
  "/experiments/ui-explorations/task/history",
  "/experiments/ui-explorations/task/statistics",
];

const experimentRoutes = ExperimentsData.flatMap((domain) => {
  const routes = domain.experiments.map(
    (experiment) => `/experiments/${domain.slug}/${experiment.slug}`
  );

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

const routeUrls = [
  ...new Set([
    ...staticRoutes,
    ...experimentRoutes,
    ...localPostRoutes,
    ...articleRoutes,
    ...studentRoutes,
    ...ProjectsData.map(
      (project) =>
        `/projects/${project.project_name.toLowerCase().replace(whitespaceSequencePattern, "-")}`
    ),
  ]),
].map((route) => ({ url: `${SITE_URL}${route}` }));

const writingUrls = allWritings.map((writing) => ({
  lastModified: new Date(writing.publishedAt),
  url: `${SITE_URL}/writing/${writing.slug}`,
}));

export default function sitemap(): MetadataRoute.Sitemap {
  return [...routeUrls, ...writingUrls];
}
