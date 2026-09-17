import "server-only";
import type { MDXContent } from "mdx/types";

interface WritingModule {
  default: MDXContent;
}

const writingModules = {
  "context-switching": async () =>
    await import("../data/writing/context-switching.mdx"),
  graph: async () => await import("../data/writing/graph.mdx"),
  "how-brain-works": async () =>
    await import("../data/writing/how-brain-works.mdx"),
  "on-curiosity": async () => await import("../data/writing/on-curiosity.mdx"),
  "on-decision-making": async () =>
    await import("../data/writing/on-decision-making.mdx"),
  "on-design-principles": async () =>
    await import("../data/writing/on-design-principles.mdx"),
  "on-information": async () =>
    await import("../data/writing/on-information.mdx"),
  "on-knowledge": async () => await import("../data/writing/on-knowledge.mdx"),
  "on-learning": async () => await import("../data/writing/on-learning.mdx"),
  "on-problem": async () => await import("../data/writing/on-problem.mdx"),
  "on-questions": async () => await import("../data/writing/on-questions.mdx"),
  "on-writing": async () => await import("../data/writing/on-writing.mdx"),
  "product-engineering": async () =>
    await import("../data/writing/product-engineering.mdx"),
  "remembering-death": async () =>
    await import("../data/writing/remembering-death.mdx"),
  "the-most-persisted-myth": async () =>
    await import("../data/writing/the-most-persisted-myth.mdx"),
  "tim-cook-speech-stanford": async () =>
    await import("../data/writing/tim-cook-speech-stanford.mdx"),
  transformation: async () =>
    await import("../data/writing/transformation.mdx"),
  "why-i-am-building-haris-lab": async () =>
    await import("../data/writing/why-i-am-building-haris-lab.mdx"),
} satisfies Record<string, () => Promise<WritingModule>>;

type WritingSlug = keyof typeof writingModules;

export const writingModuleSlugs = Object.freeze(Object.keys(writingModules));

function isWritingSlug(slug: string): slug is WritingSlug {
  return Object.hasOwn(writingModules, slug);
}

export function getWritingModule(
  slug: string
): Promise<WritingModule> | undefined {
  return isWritingSlug(slug) ? writingModules[slug]() : undefined;
}
