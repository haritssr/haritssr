import type { ChangelogCommit } from "@/utils/changelog";
import { activityBuckets } from "@/utils/changelog";

const WIDTH = 800;
const HEIGHT = 210;
const LEFT = 80;
const RIGHT = WIDTH - 40;
const TOP = 32;
const BOTTOM = HEIGHT - 48;
const HOUR_WIDTH = (RIGHT - LEFT) / 24;

export default function CommitHourlyChart({
  commits,
  day,
}: {
  commits: readonly ChangelogCommit[];
  day: string;
}) {
  const buckets = activityBuckets(commits, "day", day, day, day);
  const tickStep = Math.max(
    1,
    Math.ceil(Math.max(...buckets.map((bucket) => bucket.count)) / 4)
  );
  const maximum = tickStep * 4;
  const y = (count: number) => BOTTOM - (count / maximum) * (BOTTOM - TOP);
  const activeHours = buckets
    .map((bucket, hour) => ({ ...bucket, hour }))
    .filter((bucket) => bucket.count > 0);
  const points = activeHours
    .map((bucket) => `${LEFT + bucket.hour * HOUR_WIDTH},${y(bucket.count)}`)
    .join(" ");

  return (
    <figure className="border-border rounded-md border p-4">
      <div className="overflow-x-auto">
        {/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Inline SVG needs image semantics while retaining its vector axes and points. */}
        <svg
          aria-label={`Commits per hour on ${day}, Jakarta time`}
          className="block w-full min-w-xl font-sans text-sm tabular-nums"
          role="img"
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        >
          <title>{`Hourly commit counts for ${day}`}</title>
          <desc>
            {buckets
              .map((bucket) => `${bucket.description}: ${bucket.count} commits`)
              .join("; ")}
          </desc>
          <text
            className="text-foreground fill-current"
            textAnchor="middle"
            transform={`rotate(-90 20 ${(TOP + BOTTOM) / 2})`}
            x={20}
            y={(TOP + BOTTOM) / 2}
          >
            Commit number
          </text>
          {Array.from({ length: 5 }, (_, index) => {
            const count = index * tickStep;
            return (
              <g key={count}>
                <line
                  stroke="var(--color-zinc-700)"
                  strokeWidth={1.5}
                  x1={LEFT}
                  x2={RIGHT}
                  y1={y(count)}
                  y2={y(count)}
                />
                <line
                  className="stroke-foreground"
                  strokeWidth={1.5}
                  x1={LEFT - 6}
                  x2={LEFT + 6}
                  y1={y(count)}
                  y2={y(count)}
                />
                <text
                  className="text-foreground fill-current"
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
          {Array.from({ length: 25 }, (_, hour) => {
            const x = LEFT + hour * HOUR_WIDTH;
            return (
              <g key={hour}>
                <line
                  stroke="var(--color-zinc-700)"
                  strokeWidth={1.5}
                  x1={x}
                  x2={x}
                  y1={TOP}
                  y2={BOTTOM}
                />
                <line
                  className="stroke-foreground"
                  strokeWidth={1.5}
                  x1={x}
                  x2={x}
                  y1={BOTTOM - 6}
                  y2={BOTTOM + 6}
                />
                <text
                  className="text-foreground fill-current"
                  textAnchor="middle"
                  x={x}
                  y={BOTTOM + 24}
                >
                  {hour}
                </text>
              </g>
            );
          })}
          <path
            className="stroke-foreground"
            d={`M ${LEFT} ${TOP - 20} V ${BOTTOM} H ${RIGHT + 20}`}
            fill="none"
            strokeWidth={1.5}
          />
          <path
            className="text-foreground fill-current"
            d={`M ${LEFT} ${TOP - 28} l -6 12 h 12 Z M ${RIGHT + 28} ${BOTTOM} l -12 -6 v 12 Z`}
          />
          <polyline
            className="stroke-foreground"
            fill="none"
            points={points}
            strokeDasharray="5 7"
            strokeWidth={2}
          />
          {activeHours.map((bucket) => (
            <g key={bucket.key}>
              <circle
                cx={LEFT + bucket.hour * HOUR_WIDTH}
                cy={y(bucket.count)}
                fill="var(--color-blue-600)"
                r={5}
              />
              <text
                className="text-foreground fill-current"
                textAnchor="middle"
                x={LEFT + bucket.hour * HOUR_WIDTH}
                y={y(bucket.count) - 12}
              >
                {bucket.count}
              </text>
            </g>
          ))}
          <text
            className="text-foreground fill-current"
            textAnchor="middle"
            x={(LEFT + RIGHT) / 2}
            y={HEIGHT - 8}
          >
            Time in hours (WIB)
          </text>
        </svg>
        {/* oxlint-enable jsx-a11y/prefer-tag-over-role */}
      </div>
    </figure>
  );
}
