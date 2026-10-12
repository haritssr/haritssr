"use client";

import { Tooltip } from "@base-ui/react/tooltip";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useDeferredValue, useId, useState } from "react";

import Button from "@/components/Button";
import CommitTable from "@/components/CommitTable";
import Section from "@/components/Section";
import { SelectField } from "@/components/SelectField";
import {
  activityBuckets,
  changeTypes,
  commitDay,
  filterCommits,
  formatDay,
  periodRange,
  shiftPeriod,
} from "@/utils/changelog";
import type {
  ActivityBucket,
  ChangelogCommit,
  ChangelogPeriod,
} from "@/utils/changelog";

const periodOptions: readonly { value: ChangelogPeriod; label: string }[] = [
  { value: "all", label: "All history" },
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
];
const typeOptions = [{ value: "all", label: "All changes" }, ...changeTypes];
const INPUT_CLASS_NAME =
  "interactive-elevation form-control border-border focus:border-action focus:ring-action/20 w-full min-w-0 rounded-lg border bg-white px-3 py-2 text-sm text-foreground outline-hidden placeholder:text-muted focus:ring-2";
const monthFormatter = new Intl.DateTimeFormat("en-GB", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});
const numberFormatter = new Intl.NumberFormat("en-GB");
const PAGE_SIZE = 50;

function rangeLabel(period: ChangelogPeriod, anchor: string): string {
  const range = periodRange(period, anchor);
  if (!range) {
    return "All history";
  }
  if (period === "year") {
    return anchor.slice(0, 4);
  }
  if (period === "month") {
    return monthFormatter.format(new Date(`${range.start}T00:00:00Z`));
  }
  return range.start === range.end
    ? formatDay(range.start)
    : `${formatDay(range.start)} – ${formatDay(range.end)}`;
}

function countDays(commits: readonly ChangelogCommit[]): Map<string, number> {
  const days = new Map<string, number>();
  for (const commit of commits) {
    const day = commitDay(commit.date);
    days.set(day, (days.get(day) ?? 0) + 1);
  }
  return days;
}

export default function ChangelogExplorer({
  commits,
  initialDay,
}: {
  commits: readonly ChangelogCommit[];
  initialDay: string;
}) {
  const [period, setPeriod] = useState<ChangelogPeriod>("day");
  const lastDay = commitDay(commits[0]?.date ?? "2021-09-21T00:00:00Z");
  const firstDay = commitDay(commits.at(-1)?.date ?? "2021-09-21T00:00:00Z");
  const [anchor, setAnchor] = useState(initialDay);
  const [type, setType] = useState("all");
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(PAGE_SIZE);
  const deferredQuery = useDeferredValue(query);
  const matched = filterCommits(commits, period, anchor, type, deferredQuery);
  const days = countDays(matched);
  const [busiest] = [...days].toSorted(
    (a, b) => b[1] - a[1] || b[0].localeCompare(a[0])
  );
  const buckets = activityBuckets(matched, period, anchor, firstDay, lastDay);
  const label = rangeLabel(period, anchor);
  const graphUnit = graphGranularity(period);
  const activeFilter =
    period !== "day" ||
    anchor !== initialDay ||
    type !== "all" ||
    query.length > 0;

  function pickPeriod(nextPeriod: ChangelogPeriod, day = anchor) {
    setPeriod(nextPeriod);
    setAnchor(day);
    setLimit(PAGE_SIZE);
  }

  function resetFilters() {
    pickPeriod("day", initialDay);
    setType("all");
    setQuery("");
  }

  return (
    <div className="space-y-20">
      <ChangelogFilters
        period={period}
        anchor={anchor}
        firstDay={firstDay}
        lastDay={lastDay}
        type={type}
        query={query}
        activeFilter={activeFilter}
        pickPeriod={pickPeriod}
        resetFilters={resetFilters}
        onTypeChange={(value) => {
          setType(value);
          setLimit(PAGE_SIZE);
        }}
        onQueryChange={(value) => {
          setQuery(value);
          setLimit(PAGE_SIZE);
        }}
      />

      <Section
        title="Activity"
        description={`Commits per ${graphUnit} for ${label.toLowerCase()}. ${period === "day" ? "Hover or focus a bar for its count." : "Select a bar to explore that period."} The graph follows all active filters.`}
      >
        <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <Summary
            label="Matching commits"
            value={numberFormatter.format(matched.length)}
            detail={
              type === "all"
                ? "Across all change types"
                : (changeTypes.find((entry) => entry.value === type)?.label ??
                  type)
            }
          />
          <Summary
            label="Active days"
            value={numberFormatter.format(days.size)}
            detail="Days with at least one matching commit"
          />
          <Summary
            label="Busiest day"
            value={
              busiest === undefined ? "0" : numberFormatter.format(busiest[1])
            }
            detail={
              busiest === undefined
                ? "No activity in this selection"
                : `${formatDay(busiest[0])} · matching commits`
            }
          />
        </dl>
        <ActivityChart
          buckets={buckets}
          hourly={period === "day"}
          onPick={(bucket) => {
            pickPeriod(bucket.period, bucket.key);
          }}
        />
        <p className="text-muted text-xs">
          Commit counts show how often changes were recorded; they do not
          measure the size of a change. Older messages without a recognized
          commit prefix appear under Other.
        </p>
      </Section>

      <Section title="Timeline">
        <p aria-live="polite" aria-atomic="true" className="text-muted text-sm">
          Showing {numberFormatter.format(Math.min(limit, matched.length))} of{" "}
          {numberFormatter.format(matched.length)} matching commits
          {query === deferredQuery ? "" : " · Searching…"}
        </p>
        {matched.length === 0 ? (
          <div className="border-border rounded-xl border border-dashed p-8 text-center">
            <p className="font-medium">No commits match these filters.</p>
            <p className="text-muted mt-2 mb-5 text-sm">
              Try a different date, a broader change type, or fewer search
              words.
            </p>
            <Button onClick={resetFilters} variant="secondary">
              Back to this day
            </Button>
          </div>
        ) : (
          <CommitTable commits={matched.slice(0, limit)} />
        )}
        {limit < matched.length ? (
          <Button
            onClick={() => {
              setLimit((current) => current + PAGE_SIZE);
            }}
            variant="secondary"
          >
            Show {Math.min(PAGE_SIZE, matched.length - limit)} more commits
          </Button>
        ) : null}
      </Section>
    </div>
  );
}

function graphGranularity(period: ChangelogPeriod): string {
  if (period === "day") {
    return "hour";
  }
  return period === "all" || period === "year" ? "month" : "day";
}

interface ChangelogFiltersProps {
  period: ChangelogPeriod;
  anchor: string;
  firstDay: string;
  lastDay: string;
  type: string;
  query: string;
  activeFilter: boolean;
  pickPeriod: (period: ChangelogPeriod, day?: string) => void;
  resetFilters: () => void;
  onTypeChange: (type: string) => void;
  onQueryChange: (query: string) => void;
}

function ChangelogFilters({
  period,
  anchor,
  firstDay,
  lastDay,
  type,
  query,
  activeFilter,
  pickPeriod,
  resetFilters,
  onTypeChange,
  onQueryChange,
}: ChangelogFiltersProps) {
  const inputId = useId();
  const previous = shiftPeriod(anchor, period, -1);
  const next = shiftPeriod(anchor, period, 1);
  const previousEnd = periodRange(period, previous)?.end ?? firstDay;
  const nextStart = periodRange(period, next)?.start ?? lastDay;
  const label = rangeLabel(period, anchor);
  return (
    <Section title="Filters">
      <div className="flex flex-wrap gap-2">
        {(["day", "week", "month", "year"] as const).map((value) => (
          <Button
            key={value}
            onClick={() => {
              pickPeriod(value, commitDay(new Date().toISOString()));
            }}
            variant="secondary"
          >
            {value === "day" ? "Today" : `This ${value}`}
          </Button>
        ))}
        <Button
          disabled={!activeFilter}
          onClick={resetFilters}
          variant="secondary"
        >
          Reset filters
        </Button>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <SelectField
          label="Time period"
          options={periodOptions}
          value={period}
          onValueChange={(value) => {
            const option = periodOptions.find((entry) => entry.value === value);
            if (option) {
              pickPeriod(option.value);
            }
          }}
        />
        <DateFilter
          period={period}
          anchor={anchor}
          firstDay={firstDay}
          lastDay={lastDay}
          onChange={(day) => {
            pickPeriod(period, day);
          }}
        />
        <SelectField
          label="Change type"
          options={typeOptions}
          value={type}
          onValueChange={(value) => {
            onTypeChange(value);
          }}
        />
        <label className="min-w-0 space-y-2" htmlFor={`${inputId}-search`}>
          <span className="text-foreground/80 block text-sm font-medium">
            Search commits
          </span>
          <div className="relative">
            <MagnifyingGlassIcon
              aria-hidden="true"
              className="text-muted pointer-events-none absolute top-2.5 left-3 size-4"
            />
            <input
              autoComplete="off"
              className={`${INPUT_CLASS_NAME} pl-9`}
              id={`${inputId}-search`}
              onChange={(event) => {
                onQueryChange(event.currentTarget.value);
              }}
              placeholder="Message or hash…"
              type="search"
              value={query}
            />
          </div>
        </label>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-foreground font-medium">{label}</p>
        {period === "all" ? null : (
          <div className="flex gap-2">
            <Button
              aria-label={`Previous ${period}`}
              disabled={previousEnd < firstDay}
              onClick={() => {
                pickPeriod(period, previous);
              }}
              variant="secondary"
            >
              <ChevronLeftIcon aria-hidden="true" className="size-4" /> Prev
            </Button>
            <Button
              aria-label={`Next ${period}`}
              disabled={nextStart > lastDay}
              onClick={() => {
                pickPeriod(period, next);
              }}
              variant="secondary"
            >
              Next <ChevronRightIcon aria-hidden="true" className="size-4" />
            </Button>
          </div>
        )}
      </div>
    </Section>
  );
}

function DateFilter({
  period,
  anchor,
  firstDay,
  lastDay,
  onChange,
}: Pick<ChangelogFiltersProps, "period" | "anchor" | "firstDay" | "lastDay"> & {
  onChange: (day: string) => void;
}) {
  const inputId = useId();
  let dateLabel = "Date";
  if (period === "month") {
    dateLabel = "Month";
  }
  if (period === "week") {
    dateLabel = "Week containing";
  }
  const firstYear = Math.min(
    Number(firstDay.slice(0, 4)),
    Number(anchor.slice(0, 4))
  );
  const lastYear = Math.max(
    Number(lastDay.slice(0, 4)),
    Number(anchor.slice(0, 4))
  );
  const years = Array.from({ length: lastYear - firstYear + 1 }, (_, index) => {
    const year = String(lastYear - index);
    return { value: year, label: year };
  });
  return period === "year" ? (
    <SelectField
      label="Year"
      options={years}
      value={anchor.slice(0, 4)}
      onValueChange={(value) => {
        onChange(`${value}-01-01`);
      }}
    />
  ) : (
    <label className="min-w-0 space-y-2" htmlFor={`${inputId}-date`}>
      <span className="text-foreground/80 block text-sm font-medium">
        {dateLabel}
      </span>
      <input
        className={`${INPUT_CLASS_NAME} disabled:opacity-50`}
        disabled={period === "all"}
        id={`${inputId}-date`}
        onChange={(event) => {
          const { value, validity } = event.currentTarget;
          if (value && validity.valid) {
            onChange(period === "month" ? `${value}-01` : value);
          }
        }}
        type={period === "month" ? "month" : "date"}
        value={period === "month" ? anchor.slice(0, 7) : anchor}
      />
    </label>
  );
}

function Summary({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="border-border flex flex-col gap-2 rounded-xl border p-5">
      <dt className="text-muted text-sm">{label}</dt>
      <dd className="text-foreground text-3xl font-semibold tabular-nums">
        {value}
      </dd>
      <dd className="text-muted mt-auto text-xs">{detail}</dd>
    </div>
  );
}

function ActivityChart({
  buckets,
  hourly,
  onPick,
}: {
  buckets: readonly ActivityBucket[];
  hourly: boolean;
  onPick: (bucket: ActivityBucket) => void;
}) {
  const peak = Math.max(1, ...buckets.map((bucket) => bucket.count));
  const labelStep = Math.max(1, Math.ceil(buckets.length / 8));
  return (
    <figure className="border-border rounded-xl border p-5">
      <figcaption className="text-muted mb-4 flex justify-between gap-3 text-xs">
        <span>{hourly ? "Hourly activity · WIB" : "Commit activity"}</span>
        <span>
          Peak:{" "}
          {peak === 1 && buckets.every((bucket) => bucket.count === 0)
            ? 0
            : peak}{" "}
          commits
        </span>
      </figcaption>
      <div className="scrollbar-subtle overflow-x-auto pb-2">
        <Tooltip.Provider>
          <ol
            aria-label="Commit counts by period"
            className="flex min-w-96 gap-1"
          >
            {buckets.map((bucket, index) => (
              <li className="min-w-2 flex-1" key={bucket.key}>
                <Tooltip.Root>
                  <Tooltip.Trigger
                    aria-label={`${bucket.description}: ${bucket.count} commits${hourly ? "" : ". Show this period"}`}
                    className="group focus-visible:outline-action block w-full rounded-sm outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2"
                    onClick={() => {
                      if (!hourly) {
                        onPick(bucket);
                      }
                    }}
                    type="button"
                  >
                    <svg
                      aria-hidden="true"
                      className="h-44 w-full"
                      preserveAspectRatio="none"
                      viewBox="0 0 24 160"
                    >
                      <rect
                        className="fill-foreground/5"
                        height="160"
                        rx="3"
                        width="24"
                      />
                      <rect
                        className={
                          bucket.count > 0
                            ? "fill-action/70 group-hover:fill-action group-focus-visible:fill-action"
                            : "fill-border"
                        }
                        height={Math.max(2, (bucket.count / peak) * 150)}
                        rx="3"
                        width="24"
                        y={160 - Math.max(2, (bucket.count / peak) * 150)}
                      />
                    </svg>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Positioner side="top" sideOffset={8}>
                      <Tooltip.Popup className="bg-foreground text-background z-50 rounded-md px-3 py-2 text-xs shadow-lg">
                        <p className="font-medium">{bucket.description}</p>
                        <p>{bucket.count} commits</p>
                      </Tooltip.Popup>
                    </Tooltip.Positioner>
                  </Tooltip.Portal>
                </Tooltip.Root>
                <span
                  aria-hidden="true"
                  className="text-muted mt-2 block min-h-4 w-max text-xs"
                >
                  {index % labelStep === 0 ? bucket.label : ""}
                </span>
              </li>
            ))}
          </ol>
        </Tooltip.Provider>
      </div>
    </figure>
  );
}
