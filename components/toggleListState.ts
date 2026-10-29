export interface ToggleListNode {
  readonly id: string;
  readonly label: string;
  readonly href?: string;
  readonly count?: number;
  readonly children?: readonly ToggleListNode[];
}

export function getBranchDescendants(nodes: readonly ToggleListNode[]) {
  const branches = new Map<string, string[]>();
  function visit(children: readonly ToggleListNode[]): string[] {
    return children.flatMap((node) => {
      if ((node.children?.length ?? 0) === 0) {
        return [];
      }
      const descendants = visit(node.children ?? []);
      branches.set(node.id, descendants);
      return [node.id, ...descendants];
    });
  }
  visit(nodes);
  return branches;
}

export function setSubtreeOpen(
  expanded: ReadonlySet<string>,
  id: string,
  descendants: readonly string[],
  open: boolean
): Set<string> {
  const next = new Set([...expanded, id]);
  for (const child of descendants) {
    if (open) {
      next.add(child);
    } else {
      next.delete(child);
    }
  }
  return next;
}
