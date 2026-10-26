export interface ContentsLabelPart {
  kind: "text" | "math";
  value: string;
}

export function readHeadingLabel(heading: HTMLElement): ContentsLabelPart[] {
  const label: ContentsLabelPart[] = [];

  function visit(node: Node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const value = node.textContent ?? "";
      const previous = label.at(-1);
      if (previous?.kind === "text") {
        previous.value += value;
      } else {
        label.push({ kind: "text", value });
      }
      return;
    }

    if (!(node instanceof Element)) {
      return;
    }

    if (node.matches(".katex")) {
      const tex = node.querySelector(
        'annotation[encoding="application/x-tex"]'
      );
      if (
        tex?.textContent !== undefined &&
        tex.textContent !== null &&
        tex.textContent.length > 0
      ) {
        label.push({ kind: "math", value: tex.textContent });
      }
      return;
    }

    if (node.matches('svg, [aria-hidden="true"], [hidden], .anchor')) {
      return;
    }

    if (node.matches("br")) {
      label.push({ kind: "text", value: " " });
      return;
    }

    for (const child of node.childNodes) {
      visit(child);
    }
  }

  for (const child of heading.childNodes) {
    visit(child);
  }

  return label.filter((part) => part.value.trim().length > 0);
}
