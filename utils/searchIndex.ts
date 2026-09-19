import "server-only";
import { ExperimentsData } from "@/data/ExperimentsData";
import {
  NextjsArticlesData,
  NextjsStudentsData,
} from "@/data/NextjsExperimentsData";
import { ProjectsData } from "@/data/ProjectsData";
import { navigationRoutes } from "@/data/routes";
import type { RouteDoc } from "@/data/routes";
import { isExperimentAvailable } from "@/utils/databaseExperiments";
import { getSortedPostsData } from "@/utils/posts";
import { getProjectSlug } from "@/utils/projectSlug";
import { allWritings } from "@/utils/writings";

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
    route: "/#writing",
    title: "Writing",
    description: "Recent writing on the homepage",
  },
  { route: "/#misc", title: "About", description: "More about Harits Syah" },
].map((doc) => ({
  ...doc,
  group: "Homepage sections",
}));

// Derive concrete URLs from the same content that renders each page. Keep
// filesystem reads and full content records out of the search client bundle.
export function getSearchIndex(): RouteDoc[] {
  const experiments = ExperimentsData.flatMap((domain) => [
    {
      route: `/experiments/${domain.slug}`,
      title: domain.title,
      description: domain.description,
      group: "Experiment categories",
    },
    ...domain.experiments
      .filter((experiment) =>
        isExperimentAvailable(domain.slug, experiment.slug)
      )
      .map((experiment) => ({
        route: `/experiments/${domain.slug}/${experiment.slug}`,
        title: experiment.title,
        description: domain.title,
        group: "Experiments",
      })),
  ]);

  const taskPages = isExperimentAvailable("ui-explorations", "task")
    ? ["architecture", "history", "statistics"].map((page) => ({
        route: `/experiments/ui-explorations/task/${page}`,
        title: `Task ${page}`,
        description: "Task tracker · UI explorations",
        group: "Experiments",
      }))
    : [];

  const docs: RouteDoc[] = [
    ...navigationRoutes,
    ...homeSections,
    ...experiments,
    ...taskPages,
    ...ProjectsData.map((project) => ({
      route: `/projects/${getProjectSlug(project.project_name)}`,
      title: project.project_name,
      description: project.about_client.short_about,
      group: "Projects",
    })),
    ...allWritings.map((writing) => ({
      route: `/writing/${writing.slug}`,
      title: writing.title,
      description: `${writing.topic} · ${writing.summary}`,
      group: "Writing",
    })),
    ...getSortedPostsData().map((post) => ({
      route: `/experiments/nextjs/posts/${post.id}`,
      title: post.title,
      description: "Next.js · Posts",
      group: "Experiments",
    })),
    ...NextjsArticlesData.map((article) => ({
      route: `/experiments/nextjs/articles/${article.id}`,
      title: article.title,
      description: "Next.js · Articles",
      group: "Experiments",
    })),
    ...NextjsStudentsData.map((student) => ({
      route: `/experiments/nextjs/students/${student.id}`,
      title: student.name,
      description: `Next.js · Students · ${student.address.city}`,
      group: "Experiments",
    })),
  ];

  return [...new Map(docs.map((doc) => [doc.route, doc])).values()];
}
