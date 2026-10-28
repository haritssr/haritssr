import InternalLink from "@/components/InternalLink";
import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import Table from "@/components/Table";
import ToggleList from "@/components/ToggleList";
import type { ToggleListNode } from "@/components/ToggleList";
import { createPageMetadata } from "@/utils/metadata/pageMetadata";

import { getRouteTree } from "./getRouteTree";
import type { RouteNode } from "./getRouteTree";

function toToggleNode(node: RouteNode): ToggleListNode {
  return {
    id: node.path,
    label: node.title,
    href: node.href,
    ...(node.children.length > 0 ? { count: node.children.length } : {}),
    children: node.children.map(toToggleNode),
  };
}

export const metadata = createPageMetadata({
  title: "Tree",
  description: "Tree views of site map information architecture",
  path: "/tree",
});

export default function TreePage() {
  const { nodes, stats } = getRouteTree();
  const analytics = [
    ["Total pages", stats.totalPages],
    ["Fixed routes (excluding dynamic pages)", stats.fixedRoutes],
    ["Dynamic route patterns", stats.dynamicPatterns],
    ["Pages generated from dynamic routes", stats.generatedPages],
    ["Route patterns (fixed + dynamic)", stats.routePatterns],
    ...stats.routesByLevel.map(
      (count, index) =>
        [
          `Hierarchy level ${index + 1} routes${index === 0 ? " (including Home)" : ""}`,
          count,
        ] as const
    ),
  ] as const;

  return (
    <>
      <PageHeader back={{ href: "/", name: "Home" }} path="/tree">
        <PageTitle>Tree</PageTitle>
        <PageDescription>Latest: 2026-10-22, Thu</PageDescription>
        <nav aria-label="Tree">
          <InternalLink href="/tree/details">Details</InternalLink>
        </nav>
      </PageHeader>
      <div className="space-y-5">
        <Table>
          <caption className="sr-only">Route analytics</caption>
          <thead>
            <tr className="divide-border bg-foreground/5 divide-x">
              <th className="px-3 text-left font-medium" scope="col">
                Metric
              </th>
              <th className="px-3 text-right font-medium" scope="col">
                Count
              </th>
            </tr>
          </thead>
          <tbody className="divide-border divide-y">
            {analytics.map(([label, count]) => (
              <tr className="divide-border divide-x" key={label}>
                <th className="px-3 py-2 text-left font-normal" scope="row">
                  {label}
                </th>
                <td className="px-3 py-2 text-right tabular-nums">{count}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <nav aria-label="Site route tree">
          <ToggleList
            initialExpanded="none"
            label="Site routes"
            nodes={nodes.map(toToggleNode)}
          />
        </nav>
      </div>
    </>
  );
}
