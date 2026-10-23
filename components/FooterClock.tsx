"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

const DATE_FORMATTER = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Jakarta",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
const WEEKDAY_FORMATTER = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Jakarta",
  weekday: "short",
});
const TIME_FORMATTER = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Jakarta",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

export default function FooterClock({ children }: { children: ReactNode }) {
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

  const date =
    timestamp === null ? undefined : DATE_FORMATTER.format(timestamp);

  return (
    <div className="mb-3 grid min-w-0 grid-cols-1 items-center gap-x-5 gap-y-3 lg:grid-cols-[minmax(0,1fr)_auto]">
      <div className="flex min-h-6 min-w-0">{children}</div>
      <div className="flex h-6 min-w-0 items-center justify-between gap-4 leading-6 whitespace-nowrap tabular-nums lg:block">
        <span>
          {timestamp !== null && (
            <time dateTime={date}>
              {date}, {WEEKDAY_FORMATTER.format(timestamp)}
            </time>
          )}
        </span>
        {timestamp !== null && <span className="hidden lg:inline">, </span>}
        <span>
          {timestamp === null ? (
            <span aria-hidden="true" className="invisible">
              00:00:00 WIB
            </span>
          ) : (
            <time dateTime={new Date(timestamp).toISOString()}>
              {TIME_FORMATTER.format(timestamp)} WIB
            </time>
          )}
        </span>
      </div>
    </div>
  );
}
