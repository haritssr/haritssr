import { useEffect, useMemo, useState } from "react";

import ClockFace from "./clock-face";

export default function ClockDisplay() {
  const [now, setNow] = useState<Date | null>(null);
  const { timeFormatter, dateFormatter, timeZone } = useMemo(
    () => ({
      timeFormatter: new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }),
      dateFormatter: new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      timeZone: new Intl.DateTimeFormat()
        .resolvedOptions()
        .timeZone.replaceAll("_", " "),
    }),
    []
  );

  useEffect(() => {
    const updateTime = () => {
      setNow(new Date());
    };
    updateTime();
    const timer = window.setInterval(updateTime, 1000);
    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <>
      <ClockFace now={now} />
      <div className="space-y-2 text-center">
        <div className="text-foreground font-mono text-3xl font-medium tracking-wide tabular-nums">
          {now === null ? (
            <span aria-label="Loading local time">--:--:--</span>
          ) : (
            <time dateTime={now.toISOString()}>
              {timeFormatter.format(now)}
            </time>
          )}
        </div>
        <p className="text-muted min-h-6 text-sm">
          {now === null
            ? "Reading your device clock…"
            : dateFormatter.format(now)}
        </p>
        <p className="text-muted min-h-5 text-xs">
          {now === null ? "Local time" : timeZone}
        </p>
      </div>
    </>
  );
}
