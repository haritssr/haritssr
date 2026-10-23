import "server-only";
import { NextjsArticlesData } from "@/app/labs/nextjs/articles/data";
import { NextjsStudentsData } from "@/app/labs/nextjs/students/data";
import type { RouteDoc } from "@/data/routes";
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

  return [
    ...labs,
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
