"use client";

import { useState } from "react";
import type { CSSProperties, KeyboardEvent } from "react";

import { formatTimerTime } from "@/app/(tools)/timer/utils/timer";
import type { TimerDayTotal } from "@/app/(tools)/timer/utils/timer";
import Button from "@/components/Button";
import Table from "@/components/Table";

import { formatHours, shortDate, weekdayName } from "./chartFormat";

const WIDTH = 960;
const HEIGHT = 300;
const LEFT = 60;
const RIGHT = WIDTH - 20;
const TOP = 24;
const BOTTOM = HEIGHT - 60;
const RADIUS = 4;
const GAP = 2;
const AVERAGE_WINDOW = 7;

/** A column segment with only its top corners rounded. */
function segmentPath(x: number, y: number, width: number, height: number) {
  const r = Math.min(RADIUS, width / 2, height);
  return `M${x},${y + height}V${y + r}Q${x},${y} ${x + r},${y}H${x + width - r}Q${x + width},${y} ${x + width},${y + r}V${y + height}Z`;
}

function chartStats(totals: TimerDayTotal[]) {
  let total = 0;
  let peak = 0;
  let highest = 0;
  for (const [index, day] of totals.entries()) {
    total += day.spent;
    highest = Math.max(highest, day.spent, day.budget);
    if (day.spent > (totals[peak]?.spent ?? 0)) {
      peak = index;
    }
  }
  return {
    maximum: Math.max(1, Math.ceil(highest / 3600)),
    total,
    average: total / Math.max(1, totals.length),
    peak,
    peakSpent: totals[peak]?.spent ?? 0,
  };
}

/** Trailing mean of spent seconds per day; null until a full window exists. */
function rollingAverage(totals: TimerDayTotal[]) {
  if (totals.length < 30) {
    return [];
  }
  return totals.map((_, index) => {
    if (index < AVERAGE_WINDOW - 1) {
      return null;
    }
    let sum = 0;
    for (const day of totals.slice(index - AVERAGE_WINDOW + 1, index + 1)) {
      sum += day.spent;
    }
    return sum / AVERAGE_WINDOW;
  });
}

/** The bar to show after a key press; null clears it, undefined ignores it. */
function nextActive(key: string, active: number | null, days: number) {
  const moves: Record<string, number | null> = {
    ArrowLeft: Math.max(0, (active ?? days) - 1),
    ArrowRight: Math.min(days - 1, (active ?? -1) + 1),
    Home: 0,
    End: days - 1,
    Escape: null,
  };
  return moves[key];
}

function axisLabel(date: string, days: number) {
  if (days <= 7) {
    return `${weekdayName(date)} ${Number(date.slice(-2))}`;
  }
  return days <= 30 ? String(Number(date.slice(-2))) : shortDate(date);
}

export default function TimeChart({ totals }: { totals: TimerDayTotal[] }) {
  const [asTable, setAsTable] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const days = totals.length;
  const step = (RIGHT - LEFT) / Math.max(1, days);
  const barWidth = step * 0.7;
  const { maximum, total, average, peak, peakSpent } = chartStats(totals);
  const y = (hours: number) => BOTTOM - (hours / maximum) * (BOTTOM - TOP);
  const columnX = (index: number) =>
    LEFT + index * step + (step - barWidth) / 2;
  const centerX = (index: number) => LEFT + index * step + step / 2;

  const trend = rollingAverage(totals).flatMap((mean, index) =>
    mean === null ? [] : [`${centerX(index)},${y(mean / 3600)}`]
  );
  const labelEvery = days <= 30 ? 1 : 7;

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const next = nextActive(event.key, active, days);
    if (next !== undefined) {
      event.preventDefault();
      setActive(next);
    }
  }

  const activeDay = active === null ? undefined : totals[active];

  return (
    <figure className="border-border space-y-4 rounded-xl border p-4 sm:p-6">
      <figcaption className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 text-sm">
        <span>
          {shortDate(totals[0]?.date ?? "")} –{" "}
          {shortDate(totals.at(-1)?.date ?? "")}
        </span>
        <span className="text-muted flex flex-wrap gap-x-6 gap-y-1">
          <span>
            {days}-day total{" "}
            <span className="text-foreground ml-2 font-medium tabular-nums">
              {formatTimerTime(total)}
            </span>
          </span>
          <span>
            Average per day{" "}
            <span className="text-foreground ml-2 font-medium tabular-nums">
              {formatHours(average)}
            </span>
          </span>
        </span>
        <Button
          aria-pressed={asTable}
          onClick={() => {
            setAsTable((value) => !value);
          }}
          variant="secondary"
        >
          {asTable ? "Show chart" : "Show table"}
        </Button>
      </figcaption>
      <ul
        aria-label="Legend"
        className="text-muted flex flex-wrap gap-x-5 gap-y-2 text-sm"
      >
        <LegendItem swatch="bg-series-work" label="Work" />
        <LegendItem swatch="bg-series-leisure" label="Leisure" />
        <LegendItem swatch="bg-foreground h-0.5 w-3" label="Budget" />
        {trend.length > 0 ? (
          <LegendItem
            swatch="bg-foreground/45 h-0.5 w-3"
            label={`${AVERAGE_WINDOW}-day average`}
          />
        ) : null}
      </ul>
      {asTable ? (
        <ChartTable totals={totals} />
      ) : (
        <div className="scrollbar-subtle overflow-x-auto">
          {/* oxlint-disable jsx-a11y/prefer-tag-over-role, jsx-a11y/no-noninteractive-tabindex, jsx-a11y/no-noninteractive-element-interactions -- Arrow keys step through bars; the table view is the full alternative. */}
          <div
            aria-label="Time spent chart. Use the arrow keys to read each day."
            className="focus-visible:outline-action relative min-w-160 rounded-lg focus-visible:outline-2"
            onBlur={() => {
              setActive(null);
            }}
            onKeyDown={onKeyDown}
            onPointerLeave={() => {
              setActive(null);
            }}
            role="group"
            tabIndex={0}
          >
            <svg
              aria-label={`Daily time spent over ${days} days`}
              className="w-full font-sans text-xs tabular-nums"
              role="img"
              viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            >
              <title>{`Daily time spent over ${days} days`}</title>
              <desc>
                {totals
                  .map((day) => `${day.date}: ${formatTimerTime(day.spent)}`)
                  .join("; ")}
              </desc>
              {Array.from({ length: 5 }, (_, index) => {
                const hours = (maximum * index) / 4;
                return (
                  <g key={index}>
                    <line
                      className="stroke-border"
                      strokeDasharray="3 5"
                      x1={LEFT}
                      x2={RIGHT}
                      y1={y(hours)}
                      y2={y(hours)}
                    />
                    <text
                      className="text-muted fill-current"
                      dominantBaseline="middle"
                      textAnchor="end"
                      x={LEFT - 10}
                      y={y(hours)}
                    >
                      {Number(hours.toFixed(2))}h
                    </text>
                  </g>
                );
              })}
              {totals.map((day, index) => {
                const workHeight = (day.work / 3600 / maximum) * (BOTTOM - TOP);
                const leisureHeight =
                  (day.leisure / 3600 / maximum) * (BOTTOM - TOP);
                const both = workHeight > 0 && leisureHeight > 0;
                const workShown = Math.max(0, workHeight - (both ? GAP : 0));
                const lit = active === null || active === index;
                return (
                  <g key={day.date} opacity={lit ? 1 : 0.45}>
                    {workHeight > 0 ? (
                      <path
                        className="fill-series-work"
                        d={segmentPath(
                          columnX(index),
                          BOTTOM - workShown,
                          barWidth,
                          workShown
                        )}
                      />
                    ) : null}
                    {leisureHeight > 0 ? (
                      <path
                        className="fill-series-leisure"
                        d={segmentPath(
                          columnX(index),
                          BOTTOM - workHeight - leisureHeight,
                          barWidth,
                          leisureHeight
                        )}
                      />
                    ) : null}
                    {day.budget > 0 ? (
                      <line
                        className="stroke-foreground"
                        strokeWidth={2}
                        x1={columnX(index) - 2}
                        x2={columnX(index) + barWidth + 2}
                        y1={y(day.budget / 3600)}
                        y2={y(day.budget / 3600)}
                      />
                    ) : null}
                    {index % labelEvery === 0 ? (
                      <text
                        className="text-muted fill-current"
                        textAnchor="middle"
                        x={centerX(index)}
                        y={BOTTOM + 22}
                      >
                        {axisLabel(day.date, days)}
                      </text>
                    ) : null}
                    <rect
                      fill="transparent"
                      height={BOTTOM - TOP + 30}
                      onPointerEnter={() => {
                        setActive(index);
                      }}
                      onPointerMove={() => {
                        setActive(index);
                      }}
                      width={step}
                      x={LEFT + index * step}
                      y={TOP - 10}
                    />
                  </g>
                );
              })}
              {trend.length > 1 ? (
                <polyline
                  className="stroke-foreground/45"
                  fill="none"
                  points={trend.join(" ")}
                  pointerEvents="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              ) : null}
              {peakSpent > 0 ? (
                <text
                  className="text-foreground fill-current font-medium"
                  textAnchor="middle"
                  x={Math.min(RIGHT - 24, Math.max(LEFT + 24, centerX(peak)))}
                  y={y(peakSpent / 3600) - 8}
                >
                  Peak {formatHours(peakSpent)}
                </text>
              ) : null}
              {activeDay === undefined ? null : (
                <line
                  className="stroke-foreground/30"
                  pointerEvents="none"
                  strokeWidth={1}
                  x1={centerX(active ?? 0)}
                  x2={centerX(active ?? 0)}
                  y1={TOP - 10}
                  y2={BOTTOM}
                />
              )}
            </svg>
            {activeDay === undefined || active === null ? null : (
              <ChartTooltip
                day={activeDay}
                left={tooltipLeft(centerX(active))}
              />
            )}
          </div>
          {/* oxlint-enable jsx-a11y/prefer-tag-over-role, jsx-a11y/no-noninteractive-tabindex, jsx-a11y/no-noninteractive-element-interactions */}
        </div>
      )}
    </figure>
  );
}

function LegendItem({ swatch, label }: { swatch: string; label: string }) {
  return (
    <li className="flex items-center gap-2">
      <span
        aria-hidden="true"
        className={`${swatch} ${swatch.includes("h-0.5") ? "" : "size-3 rounded-sm"} inline-block`}
      />
      {label}
    </li>
  );
}

function TooltipRow({
  label,
  swatch,
  value,
  strong = false,
}: {
  label: string;
  swatch: string;
  value: number;
  strong?: boolean;
}) {
  return (
    <p className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-2">
        <span
          aria-hidden="true"
          className={`${swatch} inline-block h-0.5 w-3`}
        />
        <span className="text-muted">{label}</span>
      </span>
      <span
        className={`tabular-nums ${strong ? "text-foreground font-semibold" : "text-foreground"}`}
      >
        {formatHours(value)}
      </span>
    </p>
  );
}

function ChartTable({ totals }: { totals: TimerDayTotal[] }) {
  return (
    <div className="scrollbar-subtle overflow-x-auto">
      <Table className="min-w-120 whitespace-nowrap">
        <caption className="sr-only">Daily time spent by kind</caption>
        <thead>
          <tr className="divide-border bg-foreground/5 divide-x">
            {["Date", "Work", "Leisure", "Total", "Budget"].map((heading) => (
              <th
                className="px-3 text-left font-medium"
                key={heading}
                scope="col"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-border divide-y">
          {totals.map((day) => (
            <tr className="divide-border divide-x" key={day.date}>
              <th className="px-3 py-2 text-left font-medium" scope="row">
                {weekdayName(day.date)} {shortDate(day.date)}
              </th>
              {[day.work, day.leisure, day.spent, day.budget].map(
                (value, index) => (
                  <td className="px-3 py-2 tabular-nums" key={index}>
                    {formatTimerTime(value)}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

function tooltipLeft(x: number) {
  return `${Math.min(88, Math.max(12, (x / WIDTH) * 100))}%`;
}

function ChartTooltip({ day, left }: { day: TimerDayTotal; left: string }) {
  const style: CSSProperties & Record<"--tip-left", string> = {
    "--tip-left": left,
  };
  return (
    <output
      className="border-border bg-background pointer-events-none absolute top-0 left-(--tip-left) z-10 w-44 -translate-x-1/2 space-y-1 rounded-lg border p-3 text-sm shadow-md"
      style={style}
    >
      <p className="text-muted">
        {weekdayName(day.date)} {shortDate(day.date)}
      </p>
      <TooltipRow label="Work" swatch="bg-series-work" value={day.work} />
      <TooltipRow
        label="Leisure"
        swatch="bg-series-leisure"
        value={day.leisure}
      />
      <TooltipRow
        label="Total"
        strong
        swatch="bg-transparent"
        value={day.spent}
      />
      <TooltipRow label="Budget" swatch="bg-foreground" value={day.budget} />
    </output>
  );
}
