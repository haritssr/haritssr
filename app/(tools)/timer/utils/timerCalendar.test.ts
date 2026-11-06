import { describe, expect, test } from "bun:test";

import { createDailyTasks, DEFAULT_DAILY_TASKS } from "./dailyTasks";
import { createEmptyTimerDay } from "./timer";
import {
  monthCells,
  monthDates,
  resolveCalendarDays,
  scheduledCalendarTasks,
  shiftTimerMonth,
  validTimerMonth,
  weekDates,
  weekStart,
} from "./timerCalendar";
import { day, task } from "./timerTestFixtures";

describe("calendar math", () => {
  test("month lengths, including leap years", () => {
    expect(monthDates("2026-02")).toHaveLength(28);
    expect(monthDates("2024-02")).toHaveLength(29);
    expect(monthDates("2026-03")).toHaveLength(31);
    expect(validTimerMonth("2026-13")).toBe(false);
    expect(validTimerMonth("2026-3")).toBe(false);
  });

  test("shiftTimerMonth crosses year edges", () => {
    expect(shiftTimerMonth("2026-01", -1)).toBe("2025-12");
    expect(shiftTimerMonth("2026-12", 1)).toBe("2027-01");
  });

  test("weeks run Monday to Sunday", () => {
    // 2026-03-10 is a Tuesday.
    expect(weekStart("2026-03-10")).toBe("2026-03-09");
    expect(weekStart("2026-03-15")).toBe("2026-03-09");
    expect(weekDates("2026-03-10")[6]).toBe("2026-03-15");
  });

  test("month grids are whole weeks and start on a Monday", () => {
    const cells = monthCells("2026-03");
    expect(cells.length % 7).toBe(0);
    // March 1, 2026 is a Sunday, so six empty cells come first.
    expect(cells.indexOf("2026-03-01")).toBe(6);
  });
});

describe("resolveCalendarDays", () => {
  test("future days get the daily tasks, past days stay empty", () => {
    const days = resolveCalendarDays(
      "2026-03",
      "2026-03-10",
      [],
      DEFAULT_DAILY_TASKS
    );
    expect(days).toHaveLength(31);
    expect(days[0]).toEqual(createEmptyTimerDay("2026-03-01"));
    expect(days[30]?.tasks.map((entry) => entry.id)).toEqual(
      createDailyTasks(DEFAULT_DAILY_TASKS).map((entry) => entry.id)
    );
  });

  test("saved days always win", () => {
    const saved = day([task({ id: "kept" })], "2026-03-20");
    const days = resolveCalendarDays(
      "2026-03",
      "2026-03-10",
      [saved],
      DEFAULT_DAILY_TASKS
    );
    expect(days[19]).toBe(saved);
  });

  test("scheduledCalendarTasks sorts by start and drops all-day tasks", () => {
    const late = task({ period: { from: 600, until: 660 } });
    const early = task({ period: { from: 60, until: 120 } });
    const allDay = task();
    expect(
      scheduledCalendarTasks(day([late, allDay, early])).map(
        (entry) => entry.id
      )
    ).toEqual([early.id, late.id]);
  });
});
