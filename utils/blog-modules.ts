import "server-only";
import type { MDXContent } from "mdx/types";

interface BlogModule {
  default: MDXContent;
}

// Future refactor: consider a lazy import.meta.glob("../data/blog/*.mdx") here.
// Derive slugs from its path keys and keep the file set aligned with blog-posts.ts.
const blogModules = {
  "context-switching": async () =>
    await import("../data/blog/context-switching.mdx"),
  graph: async () => await import("../data/blog/graph.mdx"),
  "how-brain-works": async () =>
    await import("../data/blog/how-brain-works.mdx"),
  "on-curiosity": async () => await import("../data/blog/on-curiosity.mdx"),
  "on-decision-making": async () =>
    await import("../data/blog/on-decision-making.mdx"),
  "on-design-principles": async () =>
    await import("../data/blog/on-design-principles.mdx"),
  "on-information": async () => await import("../data/blog/on-information.mdx"),
  "on-knowledge": async () => await import("../data/blog/on-knowledge.mdx"),
  "on-learning": async () => await import("../data/blog/on-learning.mdx"),
  "on-problem": async () => await import("../data/blog/on-problem.mdx"),
  "on-questions": async () => await import("../data/blog/on-questions.mdx"),
  "on-writing": async () => await import("../data/blog/on-writing.mdx"),
  "product-engineering": async () =>
    await import("../data/blog/product-engineering.mdx"),
  "remembering-death": async () =>
    await import("../data/blog/remembering-death.mdx"),
  "the-most-persisted-myth": async () =>
    await import("../data/blog/the-most-persisted-myth.mdx"),
  "tim-cook-speech-stanford": async () =>
    await import("../data/blog/tim-cook-speech-stanford.mdx"),
  transformation: async () => await import("../data/blog/transformation.mdx"),
  "why-i-am-building-haris-lab": async () =>
    await import("../data/blog/why-i-am-building-haris-lab.mdx"),
} satisfies Record<string, () => Promise<BlogModule>>;

type BlogSlug = keyof typeof blogModules;

export const blogModuleSlugs = Object.freeze(Object.keys(blogModules));

function isBlogSlug(slug: string): slug is BlogSlug {
  return Object.hasOwn(blogModules, slug);
}

export function getBlogModule(slug: string): Promise<BlogModule> | undefined {
  return isBlogSlug(slug) ? blogModules[slug]() : undefined;
}
