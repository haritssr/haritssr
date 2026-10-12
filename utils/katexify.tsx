import { fromHtml } from "hast-util-from-html";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { renderToString } from "katex";
import type { ReactElement } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";

const CACHE_LIMIT = 256;
const equations = new Map<string, ReactElement>();

export default function katexify(math: string, displayMode: boolean) {
  const key = `${displayMode ? "display" : "inline"}:${math}`;
  const cached = equations.get(key);
  if (cached !== undefined) {
    equations.delete(key);
    equations.set(key, cached);
    return cached;
  }

  const markup = renderToString(math, {
    displayMode,
    throwOnError: false,
  });
  const tree = fromHtml(markup, { fragment: true });

  const equation = (
    <>
      {toJsxRuntime(tree, {
        Fragment,
        development: false,
        jsx,
        jsxs,
      })}
    </>
  );
  equations.set(key, equation);
  if (equations.size > CACHE_LIMIT) {
    const oldest = equations.keys().next().value;
    if (oldest !== undefined) {
      equations.delete(oldest);
    }
  }
  return equation;
}
