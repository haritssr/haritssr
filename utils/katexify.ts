import { renderToString } from "katex";

export default function katexify(math: string, displayMode: false) {
  const options = {
    displayMode,
    thrownOnError: false,
  };
  return renderToString(math, options);
}
