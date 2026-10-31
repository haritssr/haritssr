"use client";

import { useEffect, useState } from "react";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const twoDigits = (value: number) => String(value).padStart(2, "0");

function formatLocalClock(timestamp: number) {
  const now = new Date(timestamp);
  return {
    date: `${now.getFullYear()}-${twoDigits(now.getMonth() + 1)}-${twoDigits(now.getDate())}`,
    weekday: WEEKDAYS[now.getDay()],
    time: `${twoDigits(now.getHours())}:${twoDigits(now.getMinutes())}:${twoDigits(now.getSeconds())}`,
  };
}

export default function FooterClock() {
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

  const clock = timestamp === null ? null : formatLocalClock(timestamp);

  return (
    <div className="flex h-6 min-w-0 items-center justify-between gap-4 leading-6 whitespace-nowrap tabular-nums lg:block">
      <span>
        {clock !== null && (
          <time dateTime={clock.date}>
            {clock.date}, {clock.weekday}
          </time>
        )}
      </span>
      {timestamp !== null && <span className="hidden lg:inline">, </span>}
      <span>
        {timestamp === null ? (
          <span aria-hidden="true" className="invisible">
            00:00:00
          </span>
        ) : (
          <time dateTime={new Date(timestamp).toISOString()}>
            {clock?.time}
          </time>
        )}
      </span>
    </div>
  );
}
