import { INSIGHT_TYPES } from "@/utils/commits/insights";
import type {
  InsightType,
  MonthlyMix,
  TypeCounts,
} from "@/utils/commits/insights";

/**
 * Fixed color per change type, in the validated categorical order. "Other"
 * is a neutral gray so the six named types stay distinct. Values live in the
 * theme as --color-series-*.
 */
const TYPE_FILL: Readonly<Record<InsightType, string>> = {
  feat: "fill-series-feat",
  fix: "fill-series-fix",
  refactor: "fill-series-refactor",
  style: "fill-series-style",
  docs: "fill-series-docs",
  chore: "fill-series-chore",
  other: "fill-series-other",
};
export const TYPE_BACKGROUND: Readonly<Record<InsightType, string>> = {
  feat: "bg-series-feat",
  fix: "bg-series-fix",
  refactor: "bg-series-refactor",
  style: "bg-series-style",
  docs: "bg-series-docs",
  chore: "bg-series-chore",
  other: "bg-series-other",
};

const GAP = 2;

function topRounded(x: number, y: number, width: number, height: number) {
  const radius = Math.min(4, width / 2, height);
  return `M${x},${y + height}V${y + radius}Q${x},${y} ${x + radius},${y}H${x + width - radius}Q${x + width},${y} ${x + width},${y + radius}V${y + height}Z`;
}

function describe(month: MonthlyMix) {
  const parts = INSIGHT_TYPES.filter(
    ({ value }) => month.counts[value] > 0
  ).map(({ label, value }) => `${label} ${month.counts[value]}`);
  return `${month.description}: ${month.total} commits${parts.length > 0 ? ` (${parts.join(", ")})` : ""}`;
}

export function TypeLegend({ totals }: { totals: TypeCounts }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
      {INSIGHT_TYPES.map(({ value, label }) => (
        <li className="flex items-center gap-1.5" key={value}>
          <span
            aria-hidden="true"
            className={`size-2.5 shrink-0 rounded-xs ${TYPE_BACKGROUND[value]}`}
          />
          <span>{label}</span>
          <span className="text-muted tabular-nums">{totals[value]}</span>
        </li>
      ))}
    </ul>
  );
}

export default function CommitTypeChart({
  months,
}: {
  months: readonly MonthlyMix[];
}) {
  return (
    <>
      <div className="sm:hidden">
        <TypePlot months={months} compact />
      </div>
      <div className="hidden sm:block">
        <TypePlot months={months} />
      </div>
    </>
  );
}

function TypePlot({
  months,
  compact = false,
}: {
  months: readonly MonthlyMix[];
  compact?: boolean;
}) {
  const WIDTH = compact ? 360 : 800;
  const HEIGHT = compact ? 210 : 250;
  const LEFT = compact ? 34 : 48;
  const RIGHT = WIDTH - (compact ? 8 : 16);
  const TOP = 26;
  const BOTTOM = HEIGHT - (compact ? 26 : 30);
  const step = (RIGHT - LEFT) / Math.max(1, months.length);
  const barWidth = Math.min(44, step * 0.7);
  const y = (share: number) => BOTTOM - share * (BOTTOM - TOP);
  return (
    <div className="w-full min-w-0">
      {/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Inline SVG needs image semantics while retaining its vector axes and bars. */}
      <svg
        aria-label="Share of each change type per month"
        className="block w-full font-sans text-sm tabular-nums"
        role="img"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      >
        <title>Share of each change type per month</title>
        <desc>{months.map(describe).join("; ")}</desc>
        {[0, 0.5, 1].map((share) => (
          <g key={share}>
            <line
              className="stroke-border/70"
              strokeWidth={1}
              x1={LEFT}
              x2={RIGHT}
              y1={y(share)}
              y2={y(share)}
            />
            <text
              className="text-muted fill-current text-xs"
              dominantBaseline="middle"
              textAnchor="end"
              x={LEFT - 8}
              y={y(share)}
            >
              {share * 100}%
            </text>
          </g>
        ))}
        {months.map((month, index) => {
          const x = LEFT + (index + 0.5) * step - barWidth / 2;
          const center = x + barWidth / 2;
          const segments = INSIGHT_TYPES.filter(
            ({ value }) => month.counts[value] > 0
          ).map(({ value }, position, present) => ({
            value,
            before: present
              .slice(0, position)
              .reduce((sum, entry) => sum + month.counts[entry.value], 0),
          }));
          return (
            <g key={month.key}>
              <title>{describe(month)}</title>
              {segments.map(({ value, before }, position) => {
                const top = y((before + month.counts[value]) / month.total);
                const bottom = y(before / month.total);
                const isTop = position === segments.length - 1;
                const height = Math.max(1, bottom - top - (isTop ? 0 : GAP));
                return isTop ? (
                  <path
                    className={TYPE_FILL[value]}
                    d={topRounded(x, top, barWidth, height)}
                    key={value}
                  />
                ) : (
                  <rect
                    className={TYPE_FILL[value]}
                    height={height}
                    key={value}
                    width={barWidth}
                    x={x}
                    y={top + GAP}
                  />
                );
              })}
              <text
                className="text-foreground fill-current text-xs"
                textAnchor="middle"
                x={center}
                y={(segments.length === 0 ? BOTTOM : TOP) - 6}
              >
                {month.total}
              </text>
              <text
                className="text-muted fill-current text-xs"
                textAnchor="middle"
                x={center}
                y={BOTTOM + 18}
              >
                {compact ? month.label.slice(0, 3) : month.label}
              </text>
            </g>
          );
        })}
      </svg>
      {/* oxlint-enable jsx-a11y/prefer-tag-over-role */}
    </div>
  );
}
