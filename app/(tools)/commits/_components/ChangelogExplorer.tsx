"use client";

import {
  ArrowPathIcon,
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  useEffect,
  useId,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import useSWR from "swr";

import CommitActivityChart from "@/app/(tools)/commits/_components/CommitActivityChart";
import CommitTable from "@/app/(tools)/commits/_components/CommitTable";
import Button from "@/components/Button";
import { ButtonGroup, ButtonGroupItem } from "@/components/ButtonGroup";
import Section from "@/components/Section";
import { SelectField } from "@/components/SelectField";
import {
  changeTypes,
  formatDay,
  periodRange,
  shiftPeriod,
} from "@/utils/commits/changelog";
import type {
  ActivityBucket,
  ChangelogPeriod,
} from "@/utils/commits/changelog";
import { parseChangelogResult } from "@/utils/commits/changelogResponse";
import {
  changelogParams,
  parseChangelogSelection,
} from "@/utils/commits/changelogSelection";
import type {
  ChangelogResult,
  ChangelogSelection,
} from "@/utils/commits/changelogTypes";

const periodOptions: readonly { value: ChangelogPeriod; label: string }[] = [
  { value: "all", label: "All history" },
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
];
const typeOptions = [{ value: "all", label: "All changes" }, ...changeTypes];
const INPUT_CLASS_NAME =
  "corner-squircle form-control border-border focus:border-action focus:ring-action/20 w-full min-w-0 rounded-md border bg-white px-3 py-2.5 text-sm text-foreground outline-hidden placeholder:text-muted focus:ring-2 supports-[corner-shape:squircle]:rounded-xl";
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

function subscribeLocation(listener: () => void) {
  window.addEventListener("popstate", listener);
  window.addEventListener("changelog-filters", listener);
  return () => {
    window.removeEventListener("popstate", listener);
    window.removeEventListener("changelog-filters", listener);
  };
}

const getLocation = () => window.location.search;
const getServerLocation = () => "";

async function fetchSelection(url: string): Promise<ChangelogResult> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Commit history could not be loaded. Try again.");
  }
  return parseChangelogResult(await response.json());
}

export default function ChangelogExplorer({
  initial,
  initialDay,
}: {
  initial: ChangelogResult;
  initialDay: string;
}) {
  const search = useSyncExternalStore(
    subscribeLocation,
    getLocation,
    getServerLocation
  );
  const selection = useMemo(
    () => parseChangelogSelection(new URLSearchParams(search), initialDay),
    [search, initialDay]
  );
  const { period, anchor, type, query, limit } = selection;
  const [request, setRequest] = useState(selection);
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setRequest(selection);
    }, 200);
    return () => {
      window.clearTimeout(timeout);
    };
  }, [selection]);
  const initialKey = `/api/commits?${changelogParams(parseChangelogSelection(new URLSearchParams(), initialDay))}`;
  const key = `/api/commits?${changelogParams(request)}`;
  const { data, error, mutate, isValidating } = useSWR<ChangelogResult, Error>(
    key,
    fetchSelection,
    {
      fallbackData: key === initialKey ? initial : undefined,
      keepPreviousData: true,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const result = data ?? initial;
  const { firstDay, lastDay, total, activeDays, busiest, buckets } = result;
  const pending = request !== selection || isValidating;

  function updateSelection(
    patch: Partial<ChangelogSelection>,
    replace = false
  ) {
    const url = new URL(window.location.href);
    const next = {
      ...parseChangelogSelection(url.searchParams, initialDay),
      ...patch,
    };
    for (const [name, value] of changelogParams(next)) {
      url.searchParams.set(name, value);
    }
    window.history[replace ? "replaceState" : "pushState"](null, "", url);
    window.dispatchEvent(new Event("changelog-filters"));
  }

  const label = rangeLabel(period, anchor);
  const graphUnit = graphGranularity(period);
  const activeFilter =
    period !== "day" ||
    anchor !== initialDay ||
    type !== "all" ||
    query.length > 0;

  function pickPeriod(nextPeriod: ChangelogPeriod, day = anchor) {
    updateSelection({ period: nextPeriod, anchor: day, limit: PAGE_SIZE });
  }

  function resetFilters() {
    updateSelection({
      period: "day",
      anchor: initialDay,
      type: "all",
      query: "",
      limit: PAGE_SIZE,
    });
  }

  return (
    <div aria-busy={pending} className="space-y-16">
      <ChangelogFilters
        period={period}
        anchor={anchor}
        initialDay={initialDay}
        firstDay={firstDay}
        lastDay={lastDay}
        type={type}
        query={query}
        activeFilter={activeFilter}
        pickPeriod={pickPeriod}
        resetFilters={resetFilters}
        onTypeChange={(value) => {
          updateSelection({ type: value, limit: PAGE_SIZE });
        }}
        onQueryChange={(value) => {
          updateSelection({ query: value, limit: PAGE_SIZE }, true);
        }}
      />

      {error ? (
        <div role="alert" className="flex items-center gap-3">
          <p>Commit history could not be loaded.</p>
          <Button
            variant="secondary"
            onClick={() => {
              void mutate();
            }}
          >
            Try again
          </Button>
        </div>
      ) : null}
      <Section title="Activity">
        <CommitActivityChart
          buckets={buckets}
          title={`Commits by ${graphUnit}`}
          subtitle={label}
          axisLabel={period === "day" ? "Hour (WIB)" : graphUnit}
          hourly={period === "day"}
          onPick={
            period === "day"
              ? undefined
              : (bucket) => {
                  pickPeriod(bucket.period, bucket.key);
                }
          }
        >
          <ActivitySummary
            period={period}
            buckets={buckets}
            total={total}
            activeDays={activeDays}
            busiest={busiest}
            type={type}
          />
        </CommitActivityChart>
        <p className="text-muted text-xs">
          Counts show recorded commits, not the size of each change;
          unrecognized commit types appear under Other.
        </p>
      </Section>

      <Section
        title="Timeline"
        description={
          <span aria-live="polite" aria-atomic="true">
            Showing {numberFormatter.format(Math.min(limit, total))} of{" "}
            {numberFormatter.format(total)} matching commits
            {pending ? " · Updating…" : ""}
          </span>
        }
      >
        {total === 0 ? (
          <div className="border-border rounded-xl border border-dashed p-8 text-center">
            <p className="font-medium">No commits match these filters.</p>
            <p className="text-muted mt-2 mb-5 text-sm">
              Try a different date, a broader change type, or fewer search
              words.
            </p>
            <Button onClick={resetFilters} variant="secondary">
              Back to latest day
            </Button>
          </div>
        ) : (
          <CommitTable commits={result.commits} />
        )}
        {limit < total ? (
          <Button
            onClick={() => {
              updateSelection({ limit: limit + PAGE_SIZE });
            }}
            variant="secondary"
          >
            Show {Math.min(PAGE_SIZE, total - limit)} more commits
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
  initialDay: string;
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
  initialDay,
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
  const selectedRange = periodRange(period, anchor);
  return (
    <Section title="Filters">
      <div className="corner-squircle border-border bg-surface space-y-4 rounded-xl border p-4 supports-[corner-shape:squircle]:rounded-3xl sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <label className="min-w-0 flex-1" htmlFor={`${inputId}-search`}>
            <span className="sr-only">Search commits</span>
            <div className="relative">
              <MagnifyingGlassIcon
                aria-hidden="true"
                className="text-muted pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
              />
              <input
                autoComplete="off"
                className={`${INPUT_CLASS_NAME} pl-9`}
                id={`${inputId}-search`}
                onChange={(event) => {
                  onQueryChange(event.currentTarget.value);
                }}
                placeholder="Search messages or commit hashes…"
                type="search"
                value={query}
              />
            </div>
          </label>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="text-muted text-sm">Latest</span>
            <ButtonGroup aria-label="Latest commit periods">
              {(["day", "week", "month", "year"] as const).map((value) => {
                const currentRange = periodRange(value, initialDay);
                const isActive =
                  period === value &&
                  selectedRange?.start === currentRange?.start &&
                  selectedRange?.end === currentRange?.end;

                return (
                  <ButtonGroupItem
                    aria-label={`Latest ${value}`}
                    aria-pressed={isActive}
                    className="bg-secondary-button-surface aria-pressed:border-action aria-pressed:bg-action! aria-pressed:hover:bg-action-hover! min-h-10 px-3 capitalize aria-pressed:z-10 aria-pressed:text-white"
                    key={value}
                    onClick={() => {
                      pickPeriod(value, initialDay);
                    }}
                  >
                    {value}
                  </ButtonGroupItem>
                );
              })}
            </ButtonGroup>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <SelectField
            label="Time period"
            options={periodOptions}
            value={period}
            onValueChange={(value) => {
              const option = periodOptions.find(
                (entry) => entry.value === value
              );
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
            onValueChange={onTypeChange}
          />
        </div>
        <div className="border-border flex flex-wrap items-center justify-between gap-3 border-t border-dashed pt-4">
          <div className="flex min-w-0 flex-wrap items-center gap-3">
            {period === "all" ? null : (
              <ButtonGroup aria-label="Navigate commit periods">
                <ButtonGroupItem
                  aria-label={`Previous ${period}`}
                  className="bg-secondary-button-surface size-10 p-0"
                  disabled={previousEnd < firstDay}
                  onClick={() => {
                    pickPeriod(period, previous);
                  }}
                  title={`Previous ${period}`}
                >
                  <ChevronLeftIcon aria-hidden="true" className="size-4.5" />
                </ButtonGroupItem>
                <ButtonGroupItem
                  aria-label={`Next ${period}`}
                  className="bg-secondary-button-surface size-10 p-0"
                  disabled={nextStart > lastDay}
                  onClick={() => {
                    pickPeriod(period, next);
                  }}
                  title={`Next ${period}`}
                >
                  <ChevronRightIcon aria-hidden="true" className="size-4.5" />
                </ButtonGroupItem>
              </ButtonGroup>
            )}
            <p
              aria-live="polite"
              aria-atomic="true"
              className="text-foreground flex min-w-0 items-center gap-2 text-sm font-medium"
            >
              <CalendarDaysIcon
                aria-hidden="true"
                className="text-muted size-4 shrink-0"
              />
              {label}
            </p>
          </div>
          <Button
            className="min-h-10"
            disabled={!activeFilter}
            onClick={resetFilters}
            variant="ghost"
          >
            <ArrowPathIcon aria-hidden="true" className="size-4" />
            Reset filters
          </Button>
        </div>
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
    <label className="min-w-0 space-y-1.5" htmlFor={`${inputId}-date`}>
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

function ActivitySummary({
  period,
  buckets,
  total,
  activeDays,
  busiest,
  type,
}: {
  period: ChangelogPeriod;
  buckets: readonly ActivityBucket[];
  total: number;
  activeDays: number;
  busiest: ChangelogResult["busiest"];
  type: string;
}) {
  let activeLabel = "Active days";
  let activeValue = activeDays;
  let activeDetail = "Days with matching commits";
  let peakLabel = "Busiest day";
  let peakValue = "—";
  let peakDetail = "No matching activity";
  if (period === "day") {
    activeLabel = "Active hours";
    activeValue = buckets.filter((bucket) => bucket.count > 0).length;
    activeDetail = "Hours with matching commits";
    peakLabel = "Peak hour";
    const peakHour = buckets
      .toSorted((left, right) => right.count - left.count)
      .find((bucket) => bucket.count > 0);
    if (peakHour) {
      peakValue = peakHour.label;
      peakDetail = `${numberFormatter.format(peakHour.count)} matching commits`;
    }
  } else if (busiest) {
    peakValue = numberFormatter.format(busiest[1]);
    peakDetail = formatDay(busiest[0]);
  }
  return (
    <dl className="border-border sm:divide-border grid grid-cols-1 gap-4 border-y border-dashed py-5 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-dashed">
      <Summary
        label="Matching commits"
        value={numberFormatter.format(total)}
        detail={
          type === "all"
            ? "All change types"
            : (changeTypes.find((entry) => entry.value === type)?.label ?? type)
        }
      />
      <Summary
        label={activeLabel}
        value={numberFormatter.format(activeValue)}
        detail={activeDetail}
      />
      <Summary label={peakLabel} value={peakValue} detail={peakDetail} />
    </dl>
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
    <div className="flex min-w-0 flex-col gap-1.5 sm:px-5 sm:first:pl-0 sm:last:pr-0">
      <dt className="text-muted text-sm">{label}</dt>
      <dd className="text-foreground text-3xl font-semibold tabular-nums">
        {value}
      </dd>
      <dd className="text-muted mt-auto text-xs">{detail}</dd>
    </div>
  );
}
