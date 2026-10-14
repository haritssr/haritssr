import "server-only";
import {
  NextjsArticlesData,
  NextjsStudentsData,
} from "@/data/NextjsExperimentsData";
import type { RouteDoc } from "@/data/routes";
import { isExperimentAvailable } from "@/utils/databaseExperiments";
import { getAvailableExperimentDomains } from "@/utils/experimentCatalog";
import { getSortedPostsData } from "@/utils/posts";

export function getExperimentRoutes(): RouteDoc[] {
  const experiments = getAvailableExperimentDomains().flatMap((domain) => [
    {
      route: `/experiments/${domain.slug}`,
      title: domain.title,
      description: domain.description,
      group: "Experiment categories",
    },
    ...domain.experiments.map((experiment) => ({
      route: `/experiments/${domain.slug}/${experiment.slug}`,
      title: experiment.title,
      description: `${domain.title} · ${experiment.description} · ${experiment.tags.join(", ")}`,
      group: "Experiments",
    })),
  ]);
  const taskPages = isExperimentAvailable("user-interface", "task")
    ? ["architecture", "history", "statistics"].map((page) => ({
        route: `/experiments/user-interface/task/${page}`,
        title: `Task ${page}`,
        description: "Task tracker · User Interface",
        group: "Experiments",
      }))
    : [];

  return [
    ...experiments,
    ...taskPages,
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
}
