import "server-only";
import { NextjsArticlesData, NextjsStudentsData } from "@/data/NextjsLabsData";
import type { RouteDoc } from "@/data/routes";
import { isLabAvailable } from "@/utils/databaseLabs";
import { getAvailableLabDomains } from "@/utils/labCatalog";
import { getSortedPostsData } from "@/utils/posts";

export function getLabRoutes(): RouteDoc[] {
  const labs = getAvailableLabDomains().flatMap((domain) => [
    {
      route: `/labs/${domain.slug}`,
      title: domain.title,
      description: domain.description,
      group: "Lab categories",
    },
    ...domain.labs.map((lab) => ({
      route: `/labs/${domain.slug}/${lab.slug}`,
      title: lab.title,
      description: `${domain.title} · ${lab.description} · ${lab.tags.join(", ")}`,
      group: "Labs",
    })),
  ]);
  const taskPages = isLabAvailable("user-interface", "task")
    ? ["architecture", "history", "statistics"].map((page) => ({
        route: `/labs/user-interface/task/${page}`,
        title: `Task ${page}`,
        description: "Task tracker · User Interface",
        group: "Labs",
      }))
    : [];

  return [
    ...labs,
    ...taskPages,
    ...getSortedPostsData().map((post) => ({
      route: `/labs/nextjs/posts/${post.id}`,
      title: post.title,
      description: "Next.js · Posts",
      group: "Labs",
    })),
    ...NextjsArticlesData.map((article) => ({
      route: `/labs/nextjs/articles/${article.id}`,
      title: article.title,
      description: "Next.js · Articles",
      group: "Labs",
    })),
    ...NextjsStudentsData.map((student) => ({
      route: `/labs/nextjs/students/${student.id}`,
      title: student.name,
      description: `Next.js · Students · ${student.address.city}`,
      group: "Labs",
    })),
  ];
}
