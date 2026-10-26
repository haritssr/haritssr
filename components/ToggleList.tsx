"use client";

import { Collapsible } from "@base-ui/react/collapsible";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useId, useState } from "react";

import Button from "@/components/Button";
import InternalLink from "@/components/InternalLink";

export interface ToggleListNode {
  readonly id: string;
  readonly label: string;
  readonly href?: string;
  readonly count?: number;
  readonly children?: readonly ToggleListNode[];
}

const LEVEL_COLORS = [
  "bg-red-500/10 hover:bg-red-500/15",
  "bg-amber-500/10 hover:bg-amber-500/15",
  "bg-green-500/10 hover:bg-green-500/15",
  "bg-blue-500/10 hover:bg-blue-500/15",
] as const;

function branchIds(nodes: readonly ToggleListNode[]): string[] {
  return nodes.flatMap((node) => {
    const { children } = node;
    return children && children.length > 0
      ? [node.id, ...branchIds(children)]
      : [];
  });
}

export default function ToggleList({
  nodes,
  label,
  initialExpanded = "roots",
}: {
  nodes: readonly ToggleListNode[];
  label: string;
  initialExpanded?: "roots" | "none";
}) {
  const listId = useId();
  const [expanded, setExpanded] = useState(
    () =>
      new Set(
        (initialExpanded === "roots" ? nodes : [])
          .filter((node) => (node.children?.length ?? 0) > 0)
          .map((node) => node.id)
      )
  );
  const ids = branchIds(nodes);
  const allExpanded = ids.every((id) => expanded.has(id));

  function setOpen(id: string, open: boolean) {
    setExpanded((previous) => {
      const next = new Set(previous);
      if (open) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  }

  return (
    <div className="min-w-0 space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          aria-controls={listId}
          disabled={allExpanded}
          onClick={() => {
            setExpanded(new Set(ids));
          }}
          variant="outline"
        >
          Expand all
        </Button>
        <Button
          aria-controls={listId}
          disabled={expanded.size === 0}
          onClick={() => {
            setExpanded(new Set());
          }}
          variant="outline"
        >
          Collapse all
        </Button>
      </div>
      <div
        className="border-border bg-surface rounded-lg border p-2 sm:p-4"
        id={listId}
      >
        <ul aria-label={label} className="font-mono text-sm">
          {nodes.map((node) => (
            <ToggleNode
              depth={0}
              expanded={expanded}
              key={node.id}
              node={node}
              setOpen={setOpen}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

function ToggleNode({
  depth,
  node,
  expanded,
  setOpen,
}: {
  depth: number;
  node: ToggleListNode;
  expanded: ReadonlySet<string>;
  setOpen: (id: string, open: boolean) => void;
}) {
  const levelColor = LEVEL_COLORS[depth % LEVEL_COLORS.length];

  if (!node.children || node.children.length === 0) {
    return (
      <li
        className={`text-foreground marker:text-muted my-0.5 ml-5 min-w-0 list-outside list-disc rounded py-1.5 pr-2 pl-1 wrap-anywhere ${levelColor}`}
      >
        <NodeLabel node={node} />
      </li>
    );
  }

  return (
    <li className="min-w-0">
      <Collapsible.Root
        onOpenChange={(open) => {
          setOpen(node.id, open);
        }}
        open={expanded.has(node.id)}
      >
        {node.href === undefined && node.count === undefined ? (
          <Collapsible.Trigger
            className={`group text-foreground focus-visible:outline-action my-0.5 flex w-full cursor-pointer items-start gap-2 rounded px-1 py-1.5 text-left outline-hidden focus-visible:outline-2 ${levelColor}`}
          >
            <ChevronRightIcon
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0 stroke-2 group-data-panel-open:rotate-90"
            />
            <span className="min-w-0 wrap-anywhere">{node.label}</span>
          </Collapsible.Trigger>
        ) : (
          <div
            className={`my-0.5 flex min-w-0 items-center gap-2 rounded px-1 py-1.5 ${levelColor}`}
          >
            <Collapsible.Trigger
              aria-label={`Toggle ${node.label} (${node.children.length} children)`}
              className="group focus-visible:outline-action shrink-0 rounded outline-hidden focus-visible:outline-2"
            >
              <ChevronRightIcon
                aria-hidden="true"
                className="size-4 stroke-2 group-data-panel-open:rotate-90"
              />
            </Collapsible.Trigger>
            <NodeLabel node={node} />
            <span className="text-muted tabular-nums">{node.count}</span>
          </div>
        )}
        <Collapsible.Panel keepMounted>
          <ul className="border-border ml-3 border-l pl-2 sm:pl-3">
            {node.children.map((child) => (
              <ToggleNode
                depth={depth + 1}
                expanded={expanded}
                key={child.id}
                node={child}
                setOpen={setOpen}
              />
            ))}
          </ul>
        </Collapsible.Panel>
      </Collapsible.Root>
    </li>
  );
}

function NodeLabel({ node }: { node: ToggleListNode }) {
  return node.href === undefined ? (
    <span className="min-w-0 wrap-anywhere">{node.label}</span>
  ) : (
    <InternalLink
      className="min-w-0 wrap-anywhere"
      href={node.href}
      variant="inline"
    >
      {node.label}
    </InternalLink>
  );
}
