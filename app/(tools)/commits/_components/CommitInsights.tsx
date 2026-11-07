import type { CSSProperties } from "react";

import CommitTypeChart, {
  TypeLegend,
} from "@/app/(tools)/commits/_components/CommitTypeChart";
import Section from "@/components/Section";
import { formatDay } from "@/utils/commits/changelog";
import {
  INSIGHT_TYPES,
  emptyCounts,
  RHYTHM_BLOCKS,
  RHYTHM_DAYS,
  streakRange,
} from "@/utils/commits/insights";
import type { CommitInsights as Insights } from "@/utils/commits/insights";

const numberFormatter = new Intl.NumberFormat("en-GB");
const decimalFormatter = new Intl.NumberFormat("en-GB", {
  maximumFractionDigits: 1,
});
const percentFormatter = new Intl.NumberFormat("en-GB", {
  style: "percent",
  maximumFractionDigits: 0,
});
const HEAT = [
  "",
  "bg-heat-1",
  "bg-heat-2",
  "bg-heat-3",
  "bg-heat-4 text-white",
  "bg-heat-5 text-white",
] as const;
const CARD =
  "corner-squircle border-border bg-surface w-full min-w-0 space-y-4 rounded-xl border p-4 supports-[corner-shape:squircle]:rounded-3xl sm:p-5";

export default function CommitInsights({ insights }: { insights: Insights }) {
  const { busiest, longestStreak } = insights;
  const recent = recentMonths(insights.months);
  return (
    <Section
      title="Insights"
      description="Patterns across every commit. Filters below do not change them."
    >
      <dl className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        <Tile
          label="Per active day"
          value={decimalFormatter.format(insights.perActiveDay)}
          detail={`${numberFormatter.format(insights.activeDays)} days with commits`}
        />
        <Tile
          label="Busiest day"
          value={busiest ? numberFormatter.format(busiest.count) : "—"}
          detail={busiest ? formatDay(busiest.day) : "No commits"}
        />
        <Tile
          label="Longest streak"
          value={longestStreak ? `${longestStreak.days} days` : "—"}
          detail={longestStreak ? streakRange(longestStreak) : "No commits"}
        />
        <Tile
          label="After midnight"
          value={percentFormatter.format(insights.lateNightShare)}
          detail="Commits from 00:00 to 05:59"
        />
      </dl>

      <figure className={CARD}>
        <figcaption className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <span className="font-medium">What each month was made of</span>
          <span className="text-muted text-sm">
            Share of commits by change type, last 12 months
          </span>
        </figcaption>
        <TypeLegend totals={recent.totals} />
        <CommitTypeChart months={recent.months} />
        <TypeTable months={recent.months} />
        <p className="text-muted text-xs">
          The number above each bar is the month’s commit count; hover a bar for
          its breakdown. Other holds tests, performance, and commits without a
          recognized prefix.
        </p>
      </figure>

      <div className="grid gap-5 lg:grid-cols-2">
        <Areas areas={insights.areas} scoped={insights.scoped} />
        <Rhythm rhythm={insights.rhythm} />
      </div>
    </Section>
  );
}

type ShareStyle = CSSProperties & Record<"--share", string>;

function recentMonths(all: Insights["months"]) {
  const months = all.slice(-12);
  const totals = emptyCounts();
  for (const month of months) {
    for (const { value } of INSIGHT_TYPES) {
      totals[value] += month.counts[value];
    }
  }
  return { months, totals };
}

function Tile({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="bg-foreground/5 corner-squircle min-w-0 rounded-lg px-4 py-3 supports-[corner-shape:squircle]:rounded-2xl">
      <dt className="text-foreground text-sm">{label}</dt>
      <dd className="text-foreground mt-1 text-3xl font-semibold tabular-nums">
        {value}
      </dd>
      <dd className="text-muted mt-1 text-xs">{detail}</dd>
    </div>
  );
}

function TypeTable({ months }: { months: Insights["months"] }) {
  return (
    <details className="text-sm">
      <summary className="text-muted focus-visible:outline-action cursor-pointer rounded-sm">
        Table view
      </summary>
      <div className="scrollbar-subtle mt-2 overflow-x-auto">
        <table className="w-full text-left tabular-nums">
          <thead className="text-muted text-xs">
            <tr>
              <th className="py-1 pr-4 font-normal" scope="col">
                Month
              </th>
              {INSIGHT_TYPES.map(({ value, label }) => (
                <th
                  className="px-2 py-1 text-right font-normal"
                  key={value}
                  scope="col"
                >
                  {label}
                </th>
              ))}
              <th className="py-1 pl-2 text-right font-normal" scope="col">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {months.map((month) => (
              <tr className="border-border border-t" key={month.key}>
                <th className="py-1 pr-4 font-normal" scope="row">
                  {month.description}
                </th>
                {INSIGHT_TYPES.map(({ value }) => (
                  <td className="px-2 py-1 text-right" key={value}>
                    {month.counts[value]}
                  </td>
                ))}
                <td className="py-1 pl-2 text-right">{month.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}

function Areas({
  areas,
  scoped,
}: {
  areas: Insights["areas"];
  scoped: number;
}) {
  const peak = Math.max(1, ...areas.map((area) => area.count));
  return (
    <figure className={CARD}>
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="font-medium">Where the work happens</span>
        <span className="text-muted text-sm">Most-touched areas</span>
      </figcaption>
      <ol className="space-y-2">
        {areas.map((area, index) => {
          const barStyle: ShareStyle = {
            "--share": `${(area.count / peak) * 100}%`,
          };
          return (
            <li
              className="grid grid-cols-[minmax(4.5rem,7rem)_1fr_2.5rem] items-center gap-3 text-sm"
              key={area.name}
            >
              <span className="truncate" title={area.name}>
                {area.name}
              </span>
              <span
                aria-hidden="true"
                className="bg-foreground/5 h-3 rounded-sm"
              >
                <span
                  className={`block h-full w-(--share) rounded-sm ${index === 0 ? "bg-action" : "bg-action/35"}`}
                  style={barStyle}
                />
              </span>
              <span className="text-right tabular-nums">{area.count}</span>
            </li>
          );
        })}
      </ol>
      <p className="text-muted text-xs">
        Read from the scope in subjects like feat(Timer).{" "}
        {numberFormatter.format(scoped)} commits name one; spelling differences
        in capitalization are merged.
      </p>
    </figure>
  );
}

function Rhythm({ rhythm }: { rhythm: Insights["rhythm"] }) {
  const peak = Math.max(1, ...rhythm.flat());
  return (
    <figure className={CARD}>
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="font-medium">Weekly rhythm</span>
        <span className="text-muted text-sm">Commits by weekday and time</span>
      </figcaption>
      <div className="scrollbar-subtle overflow-x-auto">
        <table className="w-full min-w-80 border-separate border-spacing-0.5 text-center text-xs tabular-nums">
          <caption className="sr-only">
            Commits by weekday and three-hour block, Jakarta time
          </caption>
          <thead className="text-muted">
            <tr>
              <th className="font-normal" scope="col">
                <span className="sr-only">Weekday</span>
              </th>
              {RHYTHM_BLOCKS.map((block) => (
                <th className="pb-1 font-normal" key={block} scope="col">
                  {block}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rhythm.map((row, rowIndex) => (
              <tr key={RHYTHM_DAYS[rowIndex]}>
                <th
                  className="text-muted pr-2 text-left font-normal"
                  scope="row"
                >
                  <span aria-hidden="true">
                    {RHYTHM_DAYS[rowIndex]?.slice(0, 3)}
                  </span>
                  <span className="sr-only">{RHYTHM_DAYS[rowIndex]}</span>
                </th>
                {row.map((count, columnIndex) => {
                  const intensity = count / peak;
                  const level = Math.min(5, Math.ceil(intensity * 5));
                  return (
                    <td
                      className={`h-8 rounded-sm ${count === 0 ? "bg-foreground/5" : HEAT[level]}`}
                      key={RHYTHM_BLOCKS[columnIndex]}
                      title={`${RHYTHM_DAYS[rowIndex]} ${RHYTHM_BLOCKS[columnIndex]}: ${count} commits`}
                    >
                      {count === 0 ? (
                        <span className="text-muted">0</span>
                      ) : (
                        count
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-muted text-xs">
        Darker cells mean more commits. Hours are Jakarta time (WIB).
      </p>
      <p
        aria-hidden="true"
        className="text-muted flex items-center gap-1 text-xs"
      >
        Fewer
        {HEAT.slice(1).map((step) => (
          <span
            className={`size-3 rounded-xs ${step.split(" ")[0]}`}
            key={step}
          />
        ))}
        More
      </p>
    </figure>
  );
}
