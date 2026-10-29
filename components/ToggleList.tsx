"use client";

import { Collapsible } from "@base-ui/react/collapsible";
import { Tooltip } from "@base-ui/react/tooltip";
import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useId, useMemo, useState } from "react";

import Button from "@/components/Button";
import InternalLink from "@/components/InternalLink";
import {
  getBranchDescendants,
  setSubtreeOpen,
} from "@/components/toggleListState";
import type { ToggleListNode } from "@/components/toggleListState";

export type { ToggleListNode } from "@/components/toggleListState";

const LEVEL_COLORS = [
  "bg-red-500/10 hover:bg-red-500/15",
  "bg-amber-500/10 hover:bg-amber-500/15",
  "bg-green-500/10 hover:bg-green-500/15",
  "bg-blue-500/10 hover:bg-blue-500/15",
] as const;

export default function ToggleList({
  nodes,
  label,
  initialExpanded = "roots",
  subtreeControls = false,
  keepMounted = true,
}: {
  nodes: readonly ToggleListNode[];
  label: string;
  initialExpanded?: "roots" | "none";
  subtreeControls?: boolean;
  keepMounted?: boolean;
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
  const branches = useMemo(() => getBranchDescendants(nodes), [nodes]);
  const ids = [...branches.keys()];
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

  function setSubtree(id: string, open: boolean) {
    setExpanded((previous) =>
      setSubtreeOpen(previous, id, branches.get(id) ?? [], open)
    );
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
          disabled={!ids.some((id) => expanded.has(id))}
          onClick={() => {
            setExpanded(new Set());
          }}
          variant="outline"
        >
          Collapse all
        </Button>
      </div>
      <div id={listId}>
        <Tooltip.Provider>
          <ul aria-label={label} className="font-mono text-sm">
            {nodes.map((node) => (
              <ToggleNode
                depth={0}
                expanded={expanded}
                key={node.id}
                node={node}
                setOpen={setOpen}
                branches={branches}
                keepMounted={keepMounted}
                setSubtree={subtreeControls ? setSubtree : undefined}
              />
            ))}
          </ul>
        </Tooltip.Provider>
      </div>
    </div>
  );
}

function ToggleNode({
  depth,
  node,
  expanded,
  setOpen,
  branches,
  keepMounted,
  setSubtree,
}: {
  depth: number;
  node: ToggleListNode;
  expanded: ReadonlySet<string>;
  setOpen: (id: string, open: boolean) => void;
  branches: ReadonlyMap<string, readonly string[]>;
  keepMounted: boolean;
  setSubtree?: (id: string, open: boolean) => void;
}) {
  const levelColor = LEVEL_COLORS[depth % LEVEL_COLORS.length];
  const descendants = branches.get(node.id) ?? [];
  const showSubtree = setSubtree !== undefined && descendants.length > 0;
  const subtreeExpanded =
    expanded.has(node.id) && descendants.every((id) => expanded.has(id));

  if (!node.children || node.children.length === 0) {
    return (
      <li
        className={`text-foreground marker:text-muted my-1 ml-5 min-w-0 list-outside list-disc rounded py-1.5 pr-2 pl-1 wrap-anywhere ${levelColor}`}
      >
        <span className="pl-1.5">
          <NodeLabel node={node} />
        </span>
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
        {showSubtree ? (
          <div className={`relative my-1 min-w-0 rounded ${levelColor}`}>
            <Collapsible.Trigger className="group text-foreground focus-visible:outline-action flex w-full min-w-0 cursor-pointer items-start gap-2 rounded py-1.5 pr-9 pl-2 text-left outline-hidden focus-visible:outline-2">
              <ChevronRightIcon
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 stroke-2 group-data-panel-open:rotate-90"
              />
              <span className="min-w-0 wrap-anywhere">{node.label}</span>
            </Collapsible.Trigger>
            <Tooltip.Root>
              <Tooltip.Trigger
                aria-label={`${subtreeExpanded ? "Collapse" : "Expand"} subtree of ${node.label}`}
                onClick={() => {
                  setSubtree(node.id, !subtreeExpanded);
                }}
                render={
                  <Button
                    className="absolute top-1/2 right-1 size-6! -translate-y-1/2"
                    size="icon-compact"
                    variant="icon-hover"
                  />
                }
              >
                {subtreeExpanded ? (
                  <ArrowsPointingInIcon aria-hidden="true" className="size-4" />
                ) : (
                  <ArrowsPointingOutIcon
                    aria-hidden="true"
                    className="size-4"
                  />
                )}
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Positioner
                  side="top"
                  sideOffset={6}
                  className="z-50 max-w-[min(20rem,calc(100vw-2rem))]"
                >
                  <Tooltip.Popup className="corner-squircle bg-foreground text-background rounded-md px-2.5 py-1.5 text-sm wrap-anywhere shadow-lg supports-[corner-shape:squircle]:rounded-xl">
                    {subtreeExpanded ? "Collapse" : "Expand"} subtree of{" "}
                    {node.label}
                  </Tooltip.Popup>
                </Tooltip.Positioner>
              </Tooltip.Portal>
            </Tooltip.Root>
          </div>
        ) : null}
        {!showSubtree && node.href === undefined && node.count === undefined ? (
          <Collapsible.Trigger
            className={`group text-foreground focus-visible:outline-action my-1 flex w-full cursor-pointer items-start gap-2 rounded py-1.5 pr-1 pl-2 text-left outline-hidden focus-visible:outline-2 ${levelColor}`}
          >
            <ChevronRightIcon
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0 stroke-2 group-data-panel-open:rotate-90"
            />
            <span className="min-w-0 wrap-anywhere">{node.label}</span>
          </Collapsible.Trigger>
        ) : null}
        {!showSubtree &&
        (node.href !== undefined || node.count !== undefined) ? (
          <div
            className={`my-1 flex min-w-0 items-center gap-2 rounded py-1.5 pr-1 pl-2 ${levelColor}`}
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
        ) : null}
        <Collapsible.Panel keepMounted={keepMounted}>
          <ul className="border-border ml-4 border-l pl-1 sm:pl-2">
            {node.children.map((child) => (
              <ToggleNode
                depth={depth + 1}
                expanded={expanded}
                key={child.id}
                node={child}
                setOpen={setOpen}
                branches={branches}
                keepMounted={keepMounted}
                setSubtree={setSubtree}
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
