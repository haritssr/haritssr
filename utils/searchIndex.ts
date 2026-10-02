import "server-only";
import { ProjectsData } from "@/data/ProjectsData";
import { navigationRoutes } from "@/data/routes";
import type { RouteDoc } from "@/data/routes";
import { allBlogPosts } from "@/utils/blog-posts";
import { getExperimentRoutes } from "@/utils/experimentRoutes";
import { getProjectSlug } from "@/utils/projectSlug";

const homeSections: RouteDoc[] = [
  {
    route: "/#contacts",
    title: "Profile & contacts",
    description: "Find me and get in touch",
  },
  {
    route: "/#projects",
    title: "Projects",
    description: "Featured projects on the homepage",
  },
  {
    route: "/#experiments",
    title: "Experiments",
    description: "Featured experiments on the homepage",
  },
  {
    route: "/#blog",
    title: "Blog",
    description: "Recent blog posts on the homepage",
  },
  { route: "/#misc", title: "More", description: "More about Harits Syah" },
].map((doc) => ({
  ...doc,
  group: "Homepage sections",
}));

// Derive concrete URLs from the same content that renders each page. Keep
// filesystem reads and full content records out of the search client bundle.
export function getSearchIndex(): RouteDoc[] {
  const docs: RouteDoc[] = [
    ...navigationRoutes,
    ...homeSections,
    ...getExperimentRoutes(),
    ...ProjectsData.map((project) => ({
      route: `/projects/${getProjectSlug(project.project_name)}`,
      title: project.project_name,
      description: project.about_client.short_about,
      group: "Projects",
    })),
    ...allBlogPosts.map((post) => ({
      route: `/blog/${post.slug}`,
      title: post.title,
      description: post.summary,
      group: "Blog",
    })),
  ];

  return [...new Map(docs.map((doc) => [doc.route, doc])).values()];
}
