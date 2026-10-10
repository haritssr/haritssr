export interface ContentsLabelPart {
  kind: "text" | "math";
  value: string;
}

export interface ContentsEntry {
  children: ContentsEntry[];
  id: string;
  label: ContentsLabelPart[];
  level: number;
  target: HTMLElement;
}

export interface ExperimentOutline {
  entries: ContentsEntry[];
  sections: ContentsEntry[];
}

const HEADING_SELECTOR = "h1, h2, h3, h4, h5, h6";

function readLabel(heading: HTMLElement): ContentsLabelPart[] {
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

function isVisible(heading: HTMLElement, article: HTMLElement) {
  if (heading.getClientRects().length === 0) {
    return false;
  }

  // Modal isolation can mark the article itself aria-hidden while the TOC is
  // open. Keep its outline, but still exclude hidden content within the article.
  for (
    let ancestor: HTMLElement | null = heading;
    ancestor !== null && article.contains(ancestor);
    ancestor = ancestor.parentElement
  ) {
    if (
      ancestor.matches(
        'dialog, .sr-only, [hidden], [data-toc-ignore], [role="dialog"], [role="alertdialog"]'
      ) ||
      (ancestor !== article && ancestor.getAttribute("aria-hidden") === "true")
    ) {
      return false;
    }
  }

  const style = getComputedStyle(heading);
  return style.visibility !== "hidden" && style.visibility !== "collapse";
}

function getTarget(heading: HTMLElement) {
  const section = heading.closest("section[id]");
  const labels = section?.getAttribute("aria-labelledby")?.split(/\s+/);
  return section instanceof HTMLElement && labels?.includes(heading.id) === true
    ? section
    : heading;
}

function assignId(
  target: HTMLElement,
  label: ContentsLabelPart[],
  generatedIds: Map<HTMLElement, string>
) {
  if (target.id) {
    return target.id;
  }

  const slug = label
    .map((part) => part.value)
    .join("")
    .normalize("NFKD")
    .toLowerCase()
    .replaceAll(/\p{M}/gu, "")
    .replaceAll(/[^\p{L}\p{N}]+/gu, "-")
    .replaceAll(/^-|-$/g, "");
  const baseId = `contents-${slug || "section"}`;
  let id = baseId;
  let suffix = 2;
  while (document.querySelector(`#${id}`)) {
    id = `${baseId}-${suffix}`;
    suffix += 1;
  }
  target.id = id;
  generatedIds.set(target, id);
  return id;
}

export function collectExperimentOutline(
  article: HTMLElement,
  fallbackTitle: string,
  generatedIds = new Map<HTMLElement, string>()
): ExperimentOutline {
  const headings = [...article.querySelectorAll<HTMLElement>(HEADING_SELECTOR)]
    .filter((heading) => isVisible(heading, article))
    .map((heading) => ({ heading, label: readLabel(heading) }))
    .filter(({ label }) => label.length > 0);
  const pageHeading = headings.find(({ heading }) => heading.tagName === "H1");
  const titleLabel = pageHeading?.label ?? [
    { kind: "text" as const, value: fallbackTitle },
  ];
  const titleTarget = pageHeading?.heading ?? article;
  const titleEntry: ContentsEntry = {
    children: [],
    id: assignId(titleTarget, titleLabel, generatedIds),
    label: titleLabel,
    level: 1,
    target: titleTarget,
  };
  const sections: ContentsEntry[] = [];
  const parents = [titleEntry];

  for (const { heading, label } of headings) {
    if (heading.tagName === "H1") {
      continue;
    }

    const level = Number(heading.tagName.slice(1));
    const target = getTarget(heading);
    const entry: ContentsEntry = {
      children: [],
      id: assignId(target, label, generatedIds),
      label,
      level,
      target,
    };
    while (parents.length > 1 && (parents.at(-1)?.level ?? 1) >= level) {
      parents.pop();
    }
    parents.at(-1)?.children.push(entry);
    parents.push(entry);
    sections.push(entry);
  }

  return { entries: [titleEntry], sections };
}

export function affectsExperimentHeadings(record: MutationRecord) {
  const target =
    record.target instanceof Element
      ? record.target
      : record.target.parentElement;
  if (target?.closest(HEADING_SELECTOR)) {
    return true;
  }

  if (record.type === "attributes") {
    return target !== null && target.querySelector(HEADING_SELECTOR) !== null;
  }

  return [...record.addedNodes, ...record.removedNodes].some(
    (node) =>
      node instanceof Element &&
      (node.matches(HEADING_SELECTOR) ||
        node.querySelector(HEADING_SELECTOR) !== null)
  );
}
