import type { TimerDayTotal } from "@/app/(tools)/timer/utils/timer";

import { formatHours, shortDate, weekdayIndex } from "./chartFormat";

const CELL = 28;
const GAP = 4;
const LEFT = 36;
const TOP = 8;
const LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/** Weekday rows by week columns; darker violet means more time spent. */
export default function WeekdayHeatmap({
  totals,
}: {
  totals: TimerDayTotal[];
}) {
  const [first] = totals;
  if (first === undefined) {
    return null;
  }
  const offset = weekdayIndex(first.date);
  const weeks = Math.ceil((offset + totals.length) / 7);
  const maximum = Math.max(1, ...totals.map((day) => day.spent));
  const width = LEFT + weeks * (CELL + GAP);
  const height = TOP + 7 * (CELL + GAP);

  return (
    <figure className="border-border space-y-4 rounded-xl border p-4 sm:p-6">
      <div className="scrollbar-subtle overflow-x-auto">
        {/* oxlint-disable jsx-a11y/prefer-tag-over-role -- SVG needs image semantics; the chart table above lists every value. */}
        <svg
          aria-label="Time spent by weekday and week"
          className="font-sans text-xs"
          height={height}
          role="img"
          viewBox={`0 0 ${width} ${height}`}
          width={width}
        >
          <title>Time spent by weekday and week</title>
          {LABELS.map((label, row) => (
            <text
              className="text-muted fill-current"
              dominantBaseline="middle"
              key={label}
              x={0}
              y={TOP + row * (CELL + GAP) + CELL / 2}
            >
              {label}
            </text>
          ))}
          {totals.map((day, index) => {
            const slot = offset + index;
            const ratio = day.spent / maximum;
            return (
              <rect
                className={
                  day.spent > 0 ? "fill-series-work" : "fill-foreground/5"
                }
                fillOpacity={day.spent > 0 ? 0.15 + 0.85 * ratio : 1}
                height={CELL}
                key={day.date}
                rx={4}
                width={CELL}
                x={LEFT + Math.floor(slot / 7) * (CELL + GAP)}
                y={TOP + (slot % 7) * (CELL + GAP)}
              >
                <title>
                  {shortDate(day.date)}: {formatHours(day.spent)}
                </title>
              </rect>
            );
          })}
        </svg>
        {/* oxlint-enable jsx-a11y/prefer-tag-over-role */}
      </div>
      <figcaption className="text-muted text-sm">
        Each column is a week, Monday to Sunday. Darker cells are days with more
        time spent.
      </figcaption>
    </figure>
  );
}
