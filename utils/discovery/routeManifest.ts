import "server-only";
import { ProjectsData } from "@/app/projects/data";
import {
  apiRoute,
  commitAnalysisRoute,
  commitsDetailsRoute,
  commitsRoute,
  modelSuitabilityRoute,
  october21AnalysisRoute,
  october22AnalysisRoute,
  todayModelSuitabilityRoute,
  navigationRoutes,
  weeklyChangelogRoute,
} from "@/data/routes";
import type { RouteDoc } from "@/data/routes";
import { allWritingPosts } from "@/utils/content/writing-posts";
import { getAvailableLabSummaries } from "@/utils/discovery/labCatalog";
import { getLabRoutes } from "@/utils/discovery/labRoutes";
import { getProjectSlug } from "@/utils/navigation/projectSlug";
import { getDynamicRoute } from "@/utils/navigation/routePatterns";

export interface RouteRecord extends RouteDoc {
  pattern: string;
  parent: string;
  lastModified?: string;
  collapseInTree: boolean;
}

// Available public pages and local-only pages in development, derived from route-owned content.
export function getRouteManifest(): RouteRecord[] {
  const docs: RouteDoc[] = [
    ...navigationRoutes,
    commitsRoute,
    weeklyChangelogRoute,
    commitsDetailsRoute,
    modelSuitabilityRoute,
    todayModelSuitabilityRoute,
    commitAnalysisRoute,
    october21AnalysisRoute,
    october22AnalysisRoute,
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

  const dates = new Map([
    ...getAvailableLabSummaries().map(
      (entry) => [entry.route, entry.updatedAt] as const
    ),
    ...allWritingPosts.map(
      (post) => [`/writing/${post.slug}`, post.publishedAt] as const
    ),
  ]);
  return [...new Map(docs.map((doc) => [doc.route, doc])).values()].map(
    (doc) => {
      const dynamic = getDynamicRoute(doc.route);
      return {
        ...doc,
        pattern: dynamic?.pattern ?? doc.route,
        parent:
          dynamic?.parent ??
          (doc.route.slice(0, doc.route.lastIndexOf("/")) || "/"),
        collapseInTree: dynamic?.collapseInTree ?? false,
        lastModified: dates.get(doc.route),
      };
    }
  );
}
