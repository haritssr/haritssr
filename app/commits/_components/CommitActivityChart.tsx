import type { CSSProperties } from "react";

import type { ActivityBucket } from "@/utils/changelog";

const WIDTH = 800;
const HEIGHT = 210;
const LEFT = 80;
const RIGHT = WIDTH - 40;
const TOP = 32;
const BOTTOM = HEIGHT - 48;

export default function CommitActivityChart({
  buckets,
  title,
  subtitle,
  axisLabel,
  hourly = false,
  onPick,
}: {
  buckets: readonly ActivityBucket[];
  title: string;
  subtitle: string;
  axisLabel: string;
  hourly?: boolean;
  onPick?: (bucket: ActivityBucket) => void;
}) {
  const step = (RIGHT - LEFT) / Math.max(1, hourly ? 24 : buckets.length - 1);
  const labelStep = Math.max(1, Math.ceil(buckets.length / 8));
  const tickStep = Math.max(
    1,
    Math.ceil(Math.max(...buckets.map((bucket) => bucket.count)) / 4)
  );
  const maximum = tickStep * 4;
  const y = (count: number) => BOTTOM - (count / maximum) * (BOTTOM - TOP);
  const activeHours = buckets
    .map((bucket, hour) => ({ ...bucket, hour }))
    .filter((bucket) => bucket.count > 0);
  const points = buckets
    .map((bucket, hour) => ({ ...bucket, hour }))
    .map((bucket) => `${LEFT + bucket.hour * step},${y(bucket.count)}`)
    .join(" ");

  return (
    <figure className="border-border space-y-4 rounded-md border p-4">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-foreground font-medium">{title}</span>
        <span className="text-muted text-sm">{subtitle}</span>
      </figcaption>
      <div className="overflow-x-auto">
        <div className="relative min-w-xl">
          {/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Inline SVG needs image semantics while retaining its vector axes and points. */}
          <svg
            aria-label={`${title}: ${subtitle}`}
            className="block w-full min-w-xl font-sans text-sm tabular-nums"
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
            <text
              className="text-muted fill-current text-xs"
              textAnchor="middle"
              transform={`rotate(-90 20 ${(TOP + BOTTOM) / 2})`}
              x={20}
              y={(TOP + BOTTOM) / 2}
            >
              Commits
            </text>
            {Array.from({ length: 5 }, (_, index) => {
              const count = index * tickStep;
              return (
                <g key={count}>
                  <line
                    className="stroke-border"
                    strokeWidth={1}
                    x1={LEFT}
                    x2={RIGHT}
                    y1={y(count)}
                    y2={y(count)}
                  />
                  <text
                    className="text-muted fill-current"
                    dominantBaseline="middle"
                    textAnchor="end"
                    x={LEFT - 10}
                    y={y(count)}
                  >
                    {count}
                  </text>
                </g>
              );
            })}
            {buckets.map((bucket, index) =>
              index % labelStep === 0 ? (
                <text
                  className="text-muted fill-current"
                  key={bucket.key}
                  textAnchor="middle"
                  x={LEFT + index * step}
                  y={BOTTOM + 24}
                >
                  {bucket.label}
                </text>
              ) : null
            )}
            <polyline
              className="stroke-action"
              fill="none"
              points={points}
              strokeWidth={2}
            />
            {activeHours.map((bucket) => (
              <circle
                className="fill-action"
                cx={LEFT + bucket.hour * step}
                cy={y(bucket.count)}
                key={bucket.key}
                r={3}
              >
                <title>{`${bucket.description}: ${bucket.count} commits`}</title>
              </circle>
            ))}
            <text
              className="text-muted fill-current text-xs"
              textAnchor="middle"
              x={(LEFT + RIGHT) / 2}
              y={HEIGHT - 8}
            >
              {axisLabel}
            </text>
          </svg>
          {/* oxlint-enable jsx-a11y/prefer-tag-over-role */}
          {onPick
            ? buckets.map((bucket, index) => {
                const pointStyle: CSSProperties &
                  Record<`--${string}`, string> = {
                  "--point-x": `${((LEFT + index * step) / WIDTH) * 100}%`,
                  "--point-y": `${(y(bucket.count) / HEIGHT) * 100}%`,
                };
                return (
                  <button
                    aria-label={`${bucket.description}: ${bucket.count} commits. Show this period`}
                    className="focus-visible:outline-action absolute top-(--point-y) left-(--point-x) h-4 w-4 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full outline-hidden focus-visible:outline-2"
                    key={bucket.key}
                    onClick={() => {
                      onPick(bucket);
                    }}
                    style={pointStyle}
                    title={`${bucket.description}: ${bucket.count} commits`}
                    type="button"
                  />
                );
              })
            : null}
        </div>
      </div>
    </figure>
  );
}
