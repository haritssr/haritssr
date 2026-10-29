"use client";

import { useEffect, useState } from "react";

const MARKS = Array.from({ length: 60 }, (_, index) => index);
const TIME_FORMATTER = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Jakarta",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

export default function AnalogClock({
  className = "absolute top-0 right-0 h-full w-auto",
}: {
  className?: string;
}) {
  const [timestamp, setTimestamp] = useState<number | null>(null);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const tick = () => {
      clearTimeout(timeout);
      if (document.hidden) {
        return;
      }
      setTimestamp(Date.now());
      timeout = setTimeout(tick, 1000 - (Date.now() % 1000));
    };

    tick();
    document.addEventListener("visibilitychange", tick);
    return () => {
      clearTimeout(timeout);
      document.removeEventListener("visibilitychange", tick);
    };
  }, []);

  const time = timestamp === null ? null : TIME_FORMATTER.format(timestamp);
  const jakarta = new Date((timestamp ?? 0) + 7 * 60 * 60 * 1000);
  const seconds = jakarta.getUTCSeconds();
  const minutes = jakarta.getUTCMinutes() + seconds / 60;
  const hours = (jakarta.getUTCHours() % 12) + minutes / 60;

  return (
    <svg className={`text-foreground ${className}`} viewBox="0 0 100 100">
      <title>
        {time === null ? "Jakarta time · WIB" : `Jakarta time ${time} WIB`}
      </title>
      <circle
        className="fill-background stroke-border"
        cx="50"
        cy="50"
        r="49"
        strokeWidth="1"
      />
      {MARKS.map((mark) => (
        <line
          className={mark % 5 === 0 ? "stroke-muted" : "stroke-border"}
          key={mark}
          strokeLinecap="round"
          strokeWidth={mark % 5 === 0 ? 1.6 : 1}
          transform={`rotate(${mark * 6} 50 50)`}
          x1="50"
          x2="50"
          y1="7"
          y2={mark % 5 === 0 ? "15" : "12"}
        />
      ))}
      <g className="fill-muted text-xs font-medium" textAnchor="middle">
        <text x="50" y="28">
          12
        </text>
        <text x="76" y="55">
          3
        </text>
        <text x="50" y="81">
          6
        </text>
        <text x="24" y="55">
          9
        </text>
      </g>
      {time !== null && (
        <g strokeLinecap="round">
          <line
            className="stroke-muted/70"
            strokeWidth="3.5"
            transform={`rotate(${hours * 30} 50 50)`}
            x1="50"
            x2="50"
            y1="52"
            y2="29"
          />
          <line
            className="stroke-foreground"
            strokeWidth="3.5"
            transform={`rotate(${minutes * 6} 50 50)`}
            x1="50"
            x2="50"
            y1="52"
            y2="19"
          />
          <g
            className="stroke-attention"
            transform={`rotate(${seconds * 6} 50 50)`}
          >
            <line strokeWidth="1.6" x1="50" x2="50" y1="57" y2="12" />
            <circle className="fill-attention" cx="50" cy="50" r="2" />
          </g>
        </g>
      )}
    </svg>
  );
}
