import type { TimerDay } from "./timer";

export function scheduledCalendarTasks(day: TimerDay | undefined) {
  return (day?.tasks ?? [])
    .filter(
      (task) =>
        task.availabilityWindow !== null &&
        task.availabilityWindow !== undefined
    )
    .toSorted(
      (first, second) =>
        (first.availabilityWindow?.from ?? 0) -
        (second.availabilityWindow?.from ?? 0)
    );
}
