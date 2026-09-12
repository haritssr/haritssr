import type { Root } from "hast";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";

export default function MDX({ tree }: { tree: Root }) {
  return (
    <article className="prose prose-zinc max-w-none">
      {toJsxRuntime(tree, {
        Fragment,
        development: false,
        jsx,
        jsxs,
      })}
    </article>
  );
}
