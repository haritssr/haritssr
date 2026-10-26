import type { ToggleListNode } from "@/components/ToggleList";

export function referenceDiagram(root: ToggleListNode): string {
  const lines = [
    "flowchart LR",
    `  accTitle: ${root.label}`,
    "  accDescr: Subjek → Domain → Bab → Materi. Setiap panah menghubungkan induk dengan anak dalam pohon referensi.",
  ];
  let nextId = 0;

  function visit(node: ToggleListNode, parent?: string) {
    const id = `n${nextId}`;
    nextId += 1;
    const label = node.label
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;")
      .replaceAll("\n", " ");
    lines.push(`  ${id}["${label}"]`);
    if (parent !== undefined) {
      lines.push(`  ${parent} --> ${id}`);
    }
    for (const child of node.children ?? []) {
      visit(child, id);
    }
  }

  visit(root);
  return lines.join("\n");
}
