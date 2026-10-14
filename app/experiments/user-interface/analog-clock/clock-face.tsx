import styles from "./analog-clock.module.css";

const ticks = Array.from({ length: 60 }, (_, index) => index);
const numerals = Array.from({ length: 12 }, (_, index) => {
  const hour = index + 1;
  const radians = (hour * Math.PI) / 6;
  return {
    hour,
    x: 160 + Math.sin(radians) * 111,
    y: 160 - Math.cos(radians) * 111,
  };
});

const dialMarkings = (
  <g>
    {ticks.map((tick) => (
      <line
        className={tick % 5 === 0 ? "text-foreground/70" : "text-foreground/25"}
        key={tick}
        x1="160"
        y1={tick % 5 === 0 ? 13 : 17}
        x2="160"
        y2="23"
        stroke="currentColor"
        strokeWidth={tick % 5 === 0 ? 2 : 1}
        strokeLinecap="round"
        transform={`rotate(${tick * 6} 160 160)`}
      />
    ))}
    {numerals.map(({ hour, x, y }) => (
      <text
        key={hour}
        x={x}
        y={y}
        fill="currentColor"
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-foreground/80 text-base font-medium tabular-nums"
      >
        {hour}
      </text>
    ))}
  </g>
);

export default function ClockFace({ now }: { now: Date | null }) {
  const seconds = now?.getSeconds() ?? 0;
  const minutes = (now?.getMinutes() ?? 0) + seconds / 60;
  const hours = ((now?.getHours() ?? 0) % 12) + minutes / 60;

  return (
    <div
      className={`${styles.face} border-border bg-background text-foreground w-full max-w-88 rounded-full border p-3 shadow-sm sm:p-4`}
    >
      <svg
        aria-hidden="true"
        className="block h-auto w-full"
        viewBox="0 0 320 320"
        fill="none"
      >
        {dialMarkings}
        {now === null ? null : (
          <g strokeLinecap="round">
            <line
              x1="160"
              y1="174"
              x2="160"
              y2="88"
              stroke="currentColor"
              strokeWidth="6"
              transform={`rotate(${hours * 30} 160 160)`}
            />
            <line
              x1="160"
              y1="180"
              x2="160"
              y2="55"
              stroke="currentColor"
              strokeWidth="4"
              transform={`rotate(${minutes * 6} 160 160)`}
            />
            <g
              className="text-action"
              transform={`rotate(${seconds * 6} 160 160)`}
            >
              <line
                x1="160"
                y1="185"
                x2="160"
                y2="36"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="160" cy="160" r="5" fill="currentColor" />
            </g>
            <circle cx="160" cy="160" r="2" className="fill-background" />
          </g>
        )}
      </svg>
    </div>
  );
}
