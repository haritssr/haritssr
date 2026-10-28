import { Suspense } from "react";

import Section from "@/components/Section";
import Table from "@/components/Table";
import { commitDay } from "@/utils/commits/changelog";
import { getCommitHistory } from "@/utils/commits/commitHistory";

const tools = {
  timer: {
    name: "Timer",
    pattern: /\b(?:timer\w*|(?:add|edit|delete)task)\b/iu,
  },
  commits: { name: "Commits", pattern: /\b(?:commit\w*|changelog\w*)\b/iu },
  tree: { name: "Tree", pattern: /\b(?:tree|getRouteTree)\b/iu },
  music: { name: "Music", pattern: /\bmusic\w*\b/iu },
  url: { name: "URL", pattern: /\burl(?:cleaner|parts)?\b/iu },
} as const;

type Tool = keyof typeof tools;

const weekdayFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Jakarta",
  weekday: "short",
});
const timeFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Jakarta",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

export default function ToolChangelog({ tool }: { tool: Tool }) {
  return (
    <Section
      id="changelog"
      title="Changelog"
      description={`Messages mentioning ${tools[tool].name} or its components, oldest first; dates and times use Jakarta time (WIB).`}
    >
      <Suspense
        fallback={
          <output className="text-muted block text-sm">
            Loading change history…
          </output>
        }
      >
        <ToolHistory tool={tool} />
      </Suspense>
    </Section>
  );
}

async function ToolHistory({ tool }: { tool: Tool }) {
  const history = await getCommitHistory().catch(() => null);
  if (history === null) {
    return (
      <output className="text-muted block text-sm">
        Change history is temporarily unavailable. Reload this page to try
        again.
      </output>
    );
  }
  const { name, pattern } = tools[tool];
  const commits = history
    .filter((commit) => pattern.test(commit.subject))
    .toSorted(
      (left, right) =>
        Date.parse(left.date) - Date.parse(right.date) ||
        left.hash.localeCompare(right.hash)
    );
  if (commits.length === 0) {
    return (
      <p className="text-muted text-sm">
        No recorded commits mentioning {name} yet.
      </p>
    );
  }
  return (
    <Table>
      <caption className="sr-only">{name} change history, oldest first</caption>
      <thead>
        <tr className="divide-border bg-foreground/5 divide-x">
          <th className="px-3 text-left font-medium" scope="col">
            Change
          </th>
          <th className="px-3 text-left font-medium" scope="col">
            Date
          </th>
          <th
            className="px-3 text-left font-medium whitespace-nowrap"
            scope="col"
          >
            Time (WIB)
          </th>
        </tr>
      </thead>
      <tbody className="divide-border divide-y">
        {commits.map((commit) => (
          <tr className="divide-border divide-x" key={commit.hash}>
            <td className="px-3 py-2 align-top wrap-anywhere">
              {commit.subject}
            </td>
            <td className="px-3 py-2 align-top whitespace-nowrap">
              <time dateTime={commit.date}>
                {commitDay(commit.date)},{" "}
                {weekdayFormatter.format(new Date(commit.date))}
              </time>
            </td>
            <td className="px-3 py-2 align-top whitespace-nowrap tabular-nums">
              <time dateTime={commit.date}>
                {timeFormatter.format(new Date(commit.date))}
              </time>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
