import "server-only";
import type { MDXContent } from "mdx/types";

import { writingModules } from "../content/modules";

interface WritingModule {
  default: MDXContent;
}

export function getWritingModule(
  slug: string
): Promise<WritingModule> | undefined {
  const path = `./${slug}.mdx`;
  if (!Object.hasOwn(writingModules, path)) {
    return undefined;
  }
  return writingModules[path]().then((module) => {
    if (!isWritingModule(module)) {
      throw new TypeError(`Invalid MDX module: ${slug}`);
    }
    return module;
  });
}

function isWritingModule(value: unknown): value is WritingModule {
  return (
    typeof value === "object" &&
    value !== null &&
    "default" in value &&
    typeof value.default === "function"
  );
}
