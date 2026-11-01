"use client";

import { useEffect, useState } from "react";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const twoDigits = (value: number) => String(value).padStart(2, "0");

function formatLocalClock(timestamp: number) {
  const now = new Date(timestamp);
  const date = `${now.getFullYear()}-${twoDigits(now.getMonth() + 1)}-${twoDigits(now.getDate())}`;
  return {
    date,
    shortDate: date.slice(2).replaceAll("-", "/"),
    weekday: WEEKDAYS[now.getDay()],
    hoursMinutes: `${twoDigits(now.getHours())}:${twoDigits(now.getMinutes())}`,
    seconds: `:${twoDigits(now.getSeconds())}`,
    dateTime: now.toISOString(),
  };
}

function useLocalTimestamp() {
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

  return timestamp;
}

export default function FooterClock() {
  const timestamp = useLocalTimestamp();
  const clock = timestamp === null ? null : formatLocalClock(timestamp);

  return (
    <div className="flex h-6 min-w-0 items-center justify-between gap-4 leading-6 whitespace-nowrap tabular-nums max-sm:block lg:block">
      <span>
        {clock !== null && (
          <time dateTime={clock.date}>
            <span className="sm:hidden">{clock.shortDate}</span>
            <span className="hidden sm:inline">
              {clock.date}, {clock.weekday}
            </span>
          </time>
        )}
      </span>
      {clock !== null && <span className="sm:hidden lg:inline">, </span>}
      <span>
        {clock === null ? (
          <span aria-hidden="true" className="invisible">
            00:00:00
          </span>
        ) : (
          <time dateTime={clock.dateTime}>
            {clock.hoursMinutes}
            <span className="hidden sm:inline">{clock.seconds}</span>
          </time>
        )}
      </span>
    </div>
  );
}
