import InternalLink from "@/components/InternalLink";
import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import Table from "@/components/Table";
import ToggleList from "@/components/ToggleList";
import type { ToggleListNode } from "@/components/ToggleList";
import { createPageMetadata } from "@/utils/metadata/pageMetadata";

import { getProjectTree } from "./getProjectTree";
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
  description: "Explore site routes, project files, and their structure.",
  path: "/tree",
});

export default function TreePage() {
  const { nodes, stats } = getRouteTree();
  const project = getProjectTree();
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
        <PageDescription>Latest: 2026-10-29, Thu</PageDescription>
        <nav aria-label="Tree">
          <InternalLink href="/tree/details">Details</InternalLink>
        </nav>
      </PageHeader>
      <div className="space-y-16">
        <Section id="client-routing" title="Client routing">
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
        </Section>
        <Section id="file-project-structure" title="File project structure">
          <p>
            Project files and folders, excluding ignored files and Git metadata.
            File-type and app-convention counts overlap.
          </p>
          <Table>
            <caption className="sr-only">
              Project file patterns and counts
            </caption>
            <thead>
              <tr className="divide-border bg-foreground/5 divide-x">
                <th className="px-3 text-left font-medium" scope="col">
                  Pattern
                </th>
                <th className="px-3 text-left font-medium" scope="col">
                  Meaning
                </th>
                <th className="px-3 text-right font-medium" scope="col">
                  Count
                </th>
              </tr>
            </thead>
            {project.analytics.map((group) => (
              <tbody className="divide-border divide-y" key={group.title}>
                <tr className="border-border bg-foreground/5 border-y">
                  <th
                    className="px-3 py-2 text-left font-medium"
                    colSpan={3}
                    scope="rowgroup"
                  >
                    {group.title}
                  </th>
                </tr>
                {group.rows.map((row) => (
                  <tr className="divide-border divide-x" key={row.pattern}>
                    <th
                      className="px-3 py-2 text-left font-mono font-normal wrap-anywhere"
                      scope="row"
                    >
                      {row.pattern}
                    </th>
                    <td className="px-3 py-2 wrap-anywhere">{row.meaning}</td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {row.count}
                    </td>
                  </tr>
                ))}
              </tbody>
            ))}
          </Table>
          <ToggleList
            label="Project files"
            nodes={project.nodes}
            subtreeControls
            keepMounted={false}
          />
        </Section>
      </div>
    </>
  );
}
