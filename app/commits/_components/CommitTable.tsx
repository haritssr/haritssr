import ExternalLink from "@/components/ExternalLink";
import Table from "@/components/Table";
import type { ChangelogCommit } from "@/utils/changelog";

const JAKARTA_OFFSET_MS = 7 * 60 * 60 * 1000;

const MODEL_COLORS: Readonly<Record<string, string>> = {
  "6 Luna": "text-blue-700",
  "6 Sol": "text-green-700",
  "6.1 Sol": "text-yellow-700",
  "6 Astra": "text-red-700",
};

const EFFORT_COLORS: Readonly<Record<string, string>> = {
  Low: "text-violet-700",
  Medium: "text-blue-700",
  High: "text-green-700",
  Xhigh: "text-yellow-700",
  Max: "text-orange-700",
  Ultra: "text-red-700",
};

const COLOR_LEGEND = [
  { model: null, effort: "Low" },
  { model: "6 Luna", effort: "Medium" },
  { model: "6 Sol", effort: "High" },
  { model: "6.1 Sol", effort: "Xhigh" },
  { model: null, effort: "Max" },
  { model: "6 Astra", effort: "Ultra" },
] as const;

interface ModelRecommendation {
  model: string;
  effort: string;
}

export function SuitabilityLabel({
  type,
  value,
}: {
  type: "model" | "effort";
  value: string;
}) {
  const colors = type === "model" ? MODEL_COLORS : EFFORT_COLORS;
  return <span className={colors[value] ?? "text-muted"}>{value}</span>;
}

export function ModelSuitabilityLegend() {
  return (
    <Table className="min-w-70 table-fixed">
      <caption className="sr-only">Model and effort color meanings</caption>
      <thead>
        <tr className="divide-border bg-foreground/5 divide-x">
          <th className="px-3 text-left font-medium" scope="col">
            Model
          </th>
          <th className="px-3 text-left font-medium" scope="col">
            Effort
          </th>
        </tr>
      </thead>
      <tbody className="divide-border divide-y">
        {COLOR_LEGEND.map(({ model, effort }) => (
          <tr className="divide-border divide-x" key={effort}>
            <td
              className={`px-3 py-2 ${model === null ? "text-muted" : MODEL_COLORS[model]}`}
            >
              {model ?? "—"}
            </td>
            <td className={`px-3 py-2 ${EFFORT_COLORS[effort]}`}>{effort}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default function CommitTable({
  commits,
  caption = "Commit timeline, newest first",
  models,
}: {
  commits: readonly ChangelogCommit[];
  caption?: string;
  models?: Readonly<Record<string, ModelRecommendation>>;
}) {
  return (
    <Table className={models ? "min-w-xl table-fixed" : "table-fixed"}>
      <caption className="sr-only">{caption}</caption>
      <thead>
        <tr className="divide-border bg-foreground/5 divide-x">
          <th className="px-3 text-left font-medium" scope="col">
            Message
          </th>
          <th className="w-28 px-3 text-left font-medium sm:w-32" scope="col">
            Date
          </th>
          <th className="w-20 px-3 text-left font-medium" scope="col">
            Time
          </th>
          {models ? (
            <>
              <th className="w-28 px-3 text-left font-medium" scope="col">
                Model
              </th>
              <th className="w-24 px-3 text-left font-medium" scope="col">
                Effort
              </th>
            </>
          ) : null}
        </tr>
      </thead>
      <tbody className="divide-border divide-y">
        {commits.map((commit) => (
          <CommitRow
            commit={commit}
            key={commit.hash}
            recommendation={
              models
                ? (models[commit.hash] ?? {
                    model: "Not assessed",
                    effort: "—",
                  })
                : undefined
            }
          />
        ))}
      </tbody>
    </Table>
  );
}

function CommitRow({
  commit,
  recommendation,
}: {
  commit: ChangelogCommit;
  recommendation?: ModelRecommendation;
}) {
  const timestamp = new Date(
    new Date(commit.date).getTime() + JAKARTA_OFFSET_MS
  ).toISOString();
  return (
    <tr className="divide-border divide-x">
      <td className="px-3 py-3 align-top wrap-anywhere">
        <ExternalLink
          href={`https://github.com/haritssr/haritssr/commit/${commit.hash}`}
          name={commit.subject}
          size="inherit"
        />
      </td>
      <td className="text-muted px-3 py-3 align-top tabular-nums">
        <time dateTime={commit.date}>{timestamp.slice(0, 10)}</time>
      </td>
      <td className="text-muted px-3 py-3 align-top tabular-nums">
        <time dateTime={commit.date}>{timestamp.slice(11, 16)}</time>
      </td>
      {recommendation === undefined ? null : (
        <>
          <td
            className={`px-3 py-3 align-top ${MODEL_COLORS[recommendation.model] ?? "text-muted"}`}
          >
            {recommendation.model}
          </td>
          <td
            className={`px-3 py-3 align-top ${EFFORT_COLORS[recommendation.effort] ?? "text-muted"}`}
          >
            {recommendation.effort}
          </td>
        </>
      )}
    </tr>
  );
}
