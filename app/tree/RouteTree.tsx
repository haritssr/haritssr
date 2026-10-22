"use client";

import { Collapsible } from "@base-ui/react/collapsible";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

import Button from "@/components/Button";
import InternalLink from "@/components/InternalLink";

import type { RouteNode } from "./getRouteTree";

import styles from "./RouteTree.module.css";

function NodeLabel({ node }: { node: RouteNode }) {
  return node.href === undefined ? (
    <span className="min-w-0 wrap-anywhere">{node.title}</span>
  ) : (
    <InternalLink
      className="min-w-0 wrap-anywhere"
      href={node.href}
      variant="inline"
    >
      {node.title}
    </InternalLink>
  );
}

interface TreeListProps {
  nodes: RouteNode[];
  depth: number;
  allOpen: boolean;
  openOverrides: Record<string, boolean>;
  onOpenChange: (path: string, open: boolean) => void;
}

function TreeList({
  nodes,
  depth,
  allOpen,
  openOverrides,
  onOpenChange,
}: TreeListProps) {
  const listStyles = [styles.disc, styles.square, styles.triangle];
  const listStyle = listStyles[depth] ?? styles.dash;

  return (
    <ul
      className={`list-outside space-y-0.5 pl-5 sm:pl-7 ${styles.links} ${listStyle}`}
    >
      {nodes.map((node) =>
        node.children.length > 0 ? (
          <Collapsible.Root
            key={node.path}
            open={openOverrides[node.path] ?? allOpen}
            onOpenChange={(open) => {
              onOpenChange(node.path, open);
            }}
            render={<li />}
          >
            <div className="inline-flex min-h-8 max-w-full items-center space-x-2 align-middle">
              <NodeLabel node={node} />
              <Collapsible.Trigger
                aria-label={`Toggle ${node.title} routes (${node.children.length} children)`}
                className="focus-visible:outline-action group flex shrink-0 cursor-pointer items-center gap-2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <span className="bg-foreground/90 group-hover:bg-foreground/80 flex size-4.5 items-center justify-center rounded-full text-white [corner-shape:round]">
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="size-3 -rotate-90 group-data-panel-open:rotate-0"
                    strokeWidth={3}
                  />
                </span>
                <span className="text-muted tabular-nums">
                  {node.children.length}
                </span>
              </Collapsible.Trigger>
            </div>
            <Collapsible.Panel>
              <TreeList
                allOpen={allOpen}
                depth={depth + 1}
                nodes={node.children}
                onOpenChange={onOpenChange}
                openOverrides={openOverrides}
              />
            </Collapsible.Panel>
          </Collapsible.Root>
        ) : (
          <li className="py-1" key={node.path}>
            <NodeLabel node={node} />
          </li>
        )
      )}
    </ul>
  );
}

export default function RouteTree({ nodes }: { nodes: RouteNode[] }) {
  const [allOpen, setAllOpen] = useState(false);
  const [openOverrides, setOpenOverrides] = useState<Record<string, boolean>>(
    {}
  );
  const hasOpenBranch = nodes.some(
    (node) => node.children.length > 0 && (openOverrides[node.path] ?? allOpen)
  );

  function setAll(open: boolean) {
    setAllOpen(open);
    setOpenOverrides({});
  }

  function onOpenChange(path: string, open: boolean) {
    setOpenOverrides((previous) => ({ ...previous, [path]: open }));
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => {
            setAll(!hasOpenBranch);
          }}
          variant="secondary"
        >
          {hasOpenBranch ? "Collapse all" : "Expand all"}
        </Button>
      </div>
      <nav aria-label="Site route tree">
        <TreeList
          allOpen={allOpen}
          depth={0}
          nodes={nodes}
          onOpenChange={onOpenChange}
          openOverrides={openOverrides}
        />
      </nav>
    </div>
  );
}
