import "server-only";
import { getSearchIndex } from "@/utils/searchIndex";

export interface RouteNode {
  path: string;
  title: string;
  href?: string;
  children: RouteNode[];
}

const dynamicParents = [
  "/labs/nextjs/articles",
  "/labs/nextjs/posts",
  "/labs/nextjs/students",
];

const dynamicPageParents = [...dynamicParents, "/projects", "/writing"];

export function getRouteTree() {
  const roots: RouteNode[] = [];
  const nodes = new Map<string, RouteNode>();
  const routes = getSearchIndex();
  const activeDynamicParents = new Set<string>();
  const routesByLevel: number[] = [];
  let generatedPages = 0;

  for (const route of routes) {
    const level = Math.max(1, route.route.split("/").filter(Boolean).length);
    routesByLevel[level - 1] = (routesByLevel[level - 1] ?? 0) + 1;
    const dynamicPageParent = dynamicPageParents.find((parent) =>
      route.route.startsWith(`${parent}/`)
    );
    if (dynamicPageParent !== undefined) {
      generatedPages += 1;
      activeDynamicParents.add(dynamicPageParent);
    }
    const dynamicParent = dynamicParents.find((parent) =>
      route.route.startsWith(`${parent}/`)
    );
    const path =
      dynamicParent === undefined ? route.route : `${dynamicParent}/[...]`;
    const segments = path === "/" ? [""] : path.slice(1).split("/");
    let siblings = roots;

    for (let index = 0; index < segments.length; index += 1) {
      const segment = segments[index];
      const nodePath = `/${segments.slice(0, index + 1).join("/")}`;
      let node = nodes.get(nodePath);
      if (!node) {
        node = {
          path: nodePath,
          title: segment === "[...]" ? "[...]" : segment,
          children: [],
        };
        nodes.set(nodePath, node);
        siblings.push(node);
      }
      if (nodePath === path && dynamicParent === undefined) {
        node.title = route.title;
        node.href = route.route;
      }
      siblings = node.children;
    }
  }

  function sortNodes(siblings: RouteNode[]) {
    siblings.sort((left, right) => {
      if (left.path === "/") {
        return -1;
      }
      if (right.path === "/") {
        return 1;
      }
      return left.title.localeCompare(right.title);
    });
    for (const node of siblings) {
      sortNodes(node.children);
    }
  }

  sortNodes(roots);
  const fixedRoutes = routes.length - generatedPages;
  return {
    nodes: roots,
    stats: {
      totalPages: routes.length,
      fixedRoutes,
      dynamicPatterns: activeDynamicParents.size,
      generatedPages,
      routePatterns: fixedRoutes + activeDynamicParents.size,
      routesByLevel,
    },
  };
}
