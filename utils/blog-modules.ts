import "server-only";
import type { MDXContent } from "mdx/types";

import { blogModules } from "@/data/blog/modules";

interface BlogModule {
  default: MDXContent;
}

export function getBlogModule(slug: string): Promise<BlogModule> | undefined {
  const path = `./${slug}.mdx`;
  if (!Object.hasOwn(blogModules, path)) {
    return undefined;
  }
  return blogModules[path]().then((module) => {
    if (!isBlogModule(module)) {
      throw new TypeError(`Invalid MDX module: ${slug}`);
    }
    return module;
  });
}

function isBlogModule(value: unknown): value is BlogModule {
  return (
    typeof value === "object" &&
    value !== null &&
    "default" in value &&
    typeof value.default === "function"
  );
}
