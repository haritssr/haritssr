const dynamicRoutes = [
  {
    parent: "/labs/nextjs/articles",
    pattern: "/labs/nextjs/articles/[id]",
    collapseInTree: true,
  },
  {
    parent: "/labs/nextjs/posts",
    pattern: "/labs/nextjs/posts/[id]",
    collapseInTree: true,
  },
  {
    parent: "/labs/nextjs/students",
    pattern: "/labs/nextjs/students/[id]",
    collapseInTree: true,
  },
  {
    parent: "/projects",
    pattern: "/projects/[project]",
    collapseInTree: false,
  },
  { parent: "/writing", pattern: "/writing/[slug]", collapseInTree: false },
];

export function getDynamicRoute(pathname: string) {
  return dynamicRoutes.find(({ parent }) => pathname.startsWith(`${parent}/`));
}
