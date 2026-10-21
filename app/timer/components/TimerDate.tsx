"use client";

import { useTimer } from "@/components/TimerProvider";

const WEEKDAY_FORMATTER = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  timeZone: "Asia/Jakarta",
});

export default function TimerDate() {
  const { snapshot } = useTimer();

  return snapshot === undefined ? null : (
    <time dateTime={snapshot.today}>
      {snapshot.today},{" "}
      {WEEKDAY_FORMATTER.format(new Date(`${snapshot.today}T00:00:00+07:00`))}
    </time>
  );
}
