import { allBlogs } from "@content-collections";
import type { MetadataRoute } from "next";
import { ExperimentsData } from "../data/ExperimentsData";
import { ProjectsData } from "../data/ProjectsData";
import { getAllPostIds } from "../utils/posts.js";

const SITE_URL = "https://www.haritssr.com";

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

function toSlug(value: string): string {
  return value.toLowerCase().replace(/\s+/g, "-");
}

const experimentRoutes = ExperimentsData.flatMap((experiment) => {
  const domain = toSlug(experiment.title);
  const routes = experiment.links
    .filter((link) => {
      // This route redirects to /task and should not appear in the sitemap.
      if (experiment.title === "UI Explorations" && link === "Task") {
        return false;
      }

      // This legacy entry no longer has a corresponding experiment component.
      return !(experiment.title === "React" && link === "forwardRefExample");
    })
    .map((link) => `/experiments/${domain}/${toSlug(link)}`);

  return [`/experiments/${domain}`, ...routes];
});

const localPostRoutes = getAllPostIds().map(
  ({ params }) => `/experiments/nextjs/posts/${params.id}`
);

const additionalExperimentRoutes = [
  "/experiments/react/react-use-reducer-july-2026",
];

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
    ...additionalExperimentRoutes,
    ...localPostRoutes,
    ...articleRoutes,
    ...studentRoutes,
    ...ProjectsData.map(
      (project) => `/projects/${toSlug(project.project_name)}`
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
