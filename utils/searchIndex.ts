import "server-only";
import { ProjectsData } from "@/data/ProjectsData";
import {
  apiRoute,
  commitAnalysisRoute,
  commitsRoute,
  modelSuitabilityRoute,
  todayModelSuitabilityRoute,
  navigationRoutes,
} from "@/data/routes";
import type { RouteDoc } from "@/data/routes";
import { getLabRoutes } from "@/utils/labRoutes";
import { getProjectSlug } from "@/utils/projectSlug";
import { allWritingPosts } from "@/utils/writing-posts";

// Derive concrete URLs from the same content that renders each page. Keep
// filesystem reads and full content records out of the search client bundle.
export function getSearchIndex(): RouteDoc[] {
  const docs: RouteDoc[] = [
    ...navigationRoutes,
    commitsRoute,
    modelSuitabilityRoute,
    todayModelSuitabilityRoute,
    commitAnalysisRoute,
    apiRoute,
    ...getLabRoutes(),
    ...ProjectsData.map((project) => ({
      route: `/projects/${getProjectSlug(project.project_name)}`,
      title: project.project_name,
      description: project.about_client.short_about,
      group: "Projects",
    })),
    ...allWritingPosts.map((post) => ({
      route: `/writing/${post.slug}`,
      title: post.title,
      description: post.summary,
      group: "Writing",
    })),
  ];

  return [...new Map(docs.map((doc) => [doc.route, doc])).values()];
}
