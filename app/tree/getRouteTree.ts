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

export function getRouteTree(): RouteNode[] {
  const roots: RouteNode[] = [];
  const nodes = new Map<string, RouteNode>();

  for (const route of getSearchIndex()) {
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
  return roots;
}
