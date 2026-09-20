import { fromHtml } from "hast-util-from-html";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { renderToString } from "katex";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";

export default function katexify(math: string, displayMode: boolean) {
  const markup = renderToString(math, {
    displayMode,
    throwOnError: false,
  });
  const tree = fromHtml(markup, { fragment: true });

  return (
    <>
      {toJsxRuntime(tree, {
        Fragment,
        development: false,
        jsx,
        jsxs,
      })}
    </>
  );
}
