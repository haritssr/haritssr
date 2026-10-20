"use client";

import { Collapsible } from "@base-ui/react/collapsible";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

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

function TreeList({ nodes, depth }: { nodes: RouteNode[]; depth: number }) {
  const listStyles = [styles.disc, styles.square, styles.triangle];
  const listStyle = listStyles[depth] ?? styles.dash;

  return (
    <ul
      className={`list-outside space-y-1 pl-5 sm:pl-7 ${styles.links} ${listStyle}`}
    >
      {nodes.map((node) =>
        node.children.length > 0 ? (
          <Collapsible.Root defaultOpen key={node.path} render={<li />}>
            <div className="inline-flex min-h-10 max-w-full items-center gap-1 align-middle">
              <NodeLabel node={node} />
              <Collapsible.Trigger
                aria-label={`Toggle ${node.title} routes`}
                className="text-muted hover:text-foreground focus-visible:outline-action group flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <ChevronDownIcon
                  aria-hidden="true"
                  className="size-4 -rotate-90 group-data-panel-open:rotate-0"
                />
              </Collapsible.Trigger>
            </div>
            <Collapsible.Panel keepMounted>
              <TreeList depth={depth + 1} nodes={node.children} />
            </Collapsible.Panel>
          </Collapsible.Root>
        ) : (
          <li className="py-2" key={node.path}>
            <NodeLabel node={node} />
          </li>
        )
      )}
    </ul>
  );
}

export default function RouteTree({ nodes }: { nodes: RouteNode[] }) {
  return (
    <nav aria-label="Site route tree">
      <TreeList depth={0} nodes={nodes} />
    </nav>
  );
}
