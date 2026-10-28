import type { CSSProperties, ReactNode } from "react";

import type { ActivityBucket } from "@/utils/commits/changelog";

const WIDTH = 800;
const HEIGHT = 230;
const LEFT = 44;
const RIGHT = WIDTH - 16;
const TOP = 24;
const BOTTOM = HEIGHT - 44;

export default function CommitActivityChart({
  buckets,
  children,
  title,
  subtitle,
  axisLabel,
  hourly = false,
  onPick,
}: {
  buckets: readonly ActivityBucket[];
  children?: ReactNode;
  title: string;
  subtitle: string;
  axisLabel: string;
  hourly?: boolean;
  onPick?: (bucket: ActivityBucket) => void;
}) {
  const step = (RIGHT - LEFT) / Math.max(1, hourly ? 24 : buckets.length);
  const barWidth = Math.min(40, step * 0.65);
  const labelStep = Math.max(1, Math.ceil(buckets.length / 8));
  const peak = Math.max(0, ...buckets.map((bucket) => bucket.count));
  const tickStep = Math.max(1, Math.ceil(peak / 4));
  const maximum = tickStep * 4;
  const y = (count: number) => BOTTOM - (count / maximum) * (BOTTOM - TOP);
  const x = (index: number) => LEFT + (index + 0.5) * step;
  const Target = onPick ? "button" : "div";

  return (
    <figure className="corner-squircle border-border bg-surface space-y-5 rounded-xl border p-4 supports-[corner-shape:squircle]:rounded-3xl sm:p-5">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="text-foreground font-medium">{title}</span>
        <span className="text-muted text-sm">{subtitle}</span>
      </figcaption>
      {children}
      {peak === 0 ? (
        <p className="text-muted py-12 text-center text-sm">
          No commit activity in this selection.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <div className="relative min-w-xl">
            {/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Inline SVG needs image semantics while retaining its vector axes and bars. */}
            <svg
              aria-label={`${title}: ${subtitle}`}
              className="block w-full font-sans text-sm tabular-nums"
              role="img"
              viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            >
              <title>{title}</title>
              <desc>
                {buckets
                  .map(
                    (bucket) => `${bucket.description}: ${bucket.count} commits`
                  )
                  .join("; ")}
              </desc>
              {Array.from({ length: 5 }, (_, index) => {
                const count = index * tickStep;
                return (
                  <g key={count}>
                    <line
                      className="stroke-border/70"
                      strokeDasharray={count === 0 ? undefined : "3 5"}
                      strokeWidth={1}
                      x1={LEFT}
                      x2={RIGHT}
                      y1={y(count)}
                      y2={y(count)}
                    />
                    <text
                      className="text-muted fill-current text-xs"
                      dominantBaseline="middle"
                      textAnchor="end"
                      x={LEFT - 12}
                      y={y(count)}
                    >
                      {count}
                    </text>
                  </g>
                );
              })}
              {buckets.map((bucket, index) => (
                <g key={bucket.key}>
                  {bucket.count > 0 ? (
                    <rect
                      className={
                        bucket.count === peak ? "fill-action" : "fill-action/35"
                      }
                      height={BOTTOM - y(bucket.count)}
                      rx={Math.min(3, barWidth / 2)}
                      width={barWidth}
                      x={x(index) - barWidth / 2}
                      y={y(bucket.count)}
                    />
                  ) : null}
                  {index % labelStep === 0 ? (
                    <text
                      className="text-muted fill-current text-xs"
                      textAnchor="middle"
                      x={x(index)}
                      y={BOTTOM + 23}
                    >
                      {bucket.label}
                    </text>
                  ) : null}
                </g>
              ))}
              <text
                className="text-muted fill-current text-xs"
                textAnchor="middle"
                x={(LEFT + RIGHT) / 2}
                y={HEIGHT - 3}
              >
                {axisLabel}
              </text>
            </svg>
            {/* oxlint-enable jsx-a11y/prefer-tag-over-role */}
            {buckets.map((bucket, index) => {
              const targetStyle: CSSProperties & Record<`--${string}`, string> =
                {
                  "--bucket-x": `${(x(index) / WIDTH) * 100}%`,
                  "--bucket-width": `${(step / WIDTH) * 100}%`,
                  "--plot-top": `${(TOP / HEIGHT) * 100}%`,
                  "--plot-height": `${((BOTTOM - TOP) / HEIGHT) * 100}%`,
                };
              const tooltipPosition = tooltipAlignment(index, buckets.length);
              return (
                <Target
                  aria-label={`${bucket.description}: ${bucket.count} commits${onPick ? ". Show this period" : ""}`}
                  className={`group hover:bg-action/5 focus-visible:bg-action/5 focus-visible:outline-action absolute top-(--plot-top) left-(--bucket-x) h-(--plot-height) w-(--bucket-width) -translate-x-1/2 rounded-sm outline-hidden focus-visible:outline-2 ${onPick ? "cursor-pointer" : "cursor-default"}`}
                  key={bucket.key}
                  onClick={
                    onPick
                      ? () => {
                          onPick(bucket);
                        }
                      : undefined
                  }
                  role={onPick ? undefined : "img"}
                  style={targetStyle}
                  tabIndex={0}
                  type={onPick ? "button" : undefined}
                >
                  <span
                    aria-hidden="true"
                    className={`bg-foreground text-background pointer-events-none absolute top-0 z-10 w-max max-w-48 rounded-md px-2.5 py-2 text-left text-xs opacity-0 shadow-sm group-hover:opacity-100 group-focus-visible:opacity-100 ${tooltipPosition}`}
                  >
                    <span className="block font-medium">
                      {bucket.count} commits
                    </span>
                    <span className="text-background/80 mt-0.5 block">
                      {bucket.description}
                    </span>
                  </span>
                </Target>
              );
            })}
          </div>
        </div>
      )}
      <p className="text-muted text-xs">
        {onPick
          ? "Select a bar to explore its period."
          : "Hover or focus a bar to see its count."}{" "}
        Times use Jakarta time (WIB).
      </p>
    </figure>
  );
}

function tooltipAlignment(index: number, total: number) {
  if (index < total / 3) {
    return "left-0";
  }
  if (index > (total * 2) / 3) {
    return "right-0";
  }
  return "left-1/2 -translate-x-1/2";
}
