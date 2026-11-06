import { describe, expect, test } from "bun:test";

import {
  createSampleTimerDay,
  formatTimerTime,
  historyRange,
  isAllDay,
  scheduledPeriod,
  shiftTimerDate,
  summarizeTimerDay,
  taskAvailable,
  taskKind,
  taskSpent,
  timerDate,
  timerDayBounds,
  timerProgressPercent,
  validTimerDate,
} from "./timer";
import { at, DATE, task } from "./timerTestFixtures";

describe("Jakarta dates", () => {
  test("the date follows Jakarta, not UTC", () => {
    expect(timerDate(at("23:59"))).toBe("2026-03-10");
    expect(timerDate(at("00:00", "2026-03-11"))).toBe("2026-03-11");
    // 20:00 UTC is already 03:00 the next day in Jakarta.
    expect(timerDate(Date.parse("2026-03-10T20:00:00Z"))).toBe("2026-03-11");
  });

  test("validTimerDate rejects impossible and malformed dates", () => {
    expect(validTimerDate("2024-02-29")).toBe(true);
    expect(validTimerDate("2026-02-29")).toBe(false);
    expect(validTimerDate("2026-13-01")).toBe(false);
    expect(validTimerDate("2026-3-1")).toBe(false);
  });

  test("shiftTimerDate crosses month and year edges", () => {
    expect(shiftTimerDate("2026-03-01", -1)).toBe("2026-02-28");
    expect(shiftTimerDate("2026-12-31", 1)).toBe("2027-01-01");
    expect(shiftTimerDate(DATE, 0)).toBe(DATE);
  });

  test("a day spans exactly 24 hours from Jakarta midnight", () => {
    const { start, end } = timerDayBounds(DATE);
    expect(start).toBe(at("00:00"));
    expect(end - start).toBe(86_400_000);
  });
});

describe("periods and kinds", () => {
  test("missing, null and whole-day periods are all day", () => {
    expect(isAllDay(null)).toBe(true);
    expect(isAllDay({ from: 0, until: 1440 })).toBe(true);
    expect(isAllDay({ from: 0, until: 60 })).toBe(false);
  });

  test("scheduledPeriod is null for all-day tasks", () => {
    expect(scheduledPeriod({ period: { from: 0, until: 1440 } })).toBeNull();
    expect(scheduledPeriod({ period: { from: 60, until: 120 } })).toEqual({
      from: 60,
      until: 120,
    });
  });

  test("a missing kind reads as work", () => {
    expect(taskKind({})).toBe("work");
    expect(taskKind({ kind: "leisure" })).toBe("leisure");
  });
});

describe("task timing", () => {
  const scheduled = task({ period: { from: 540, until: 600 } });

  test("availability includes the opening minute and excludes the end", () => {
    expect(taskAvailable(scheduled, DATE, at("08:59:59"))).toBe(false);
    expect(taskAvailable(scheduled, DATE, at("09:00"))).toBe(true);
    expect(taskAvailable(scheduled, DATE, at("09:59:59"))).toBe(true);
    expect(taskAvailable(scheduled, DATE, at("10:00"))).toBe(false);
  });

  test("running time is capped by the duration and the window end", () => {
    const entry = task({
      duration: 3600,
      startedAt: new Date(at("09:30")).toISOString(),
      period: { from: 540, until: 600 },
    });
    expect(taskSpent(entry, DATE, at("09:45"))).toBe(900);
    // The window closes at 10:00, so later time does not accrue.
    expect(taskSpent(entry, DATE, at("11:00"))).toBe(1800);
  });

  test("paused tasks report their stored time", () => {
    expect(taskSpent(task({ spent: 42 }), DATE, at("12:00"))).toBe(42);
  });
});

describe("formatting and ranges", () => {
  test("formatTimerTime", () => {
    expect(formatTimerTime(0)).toBe("0:00");
    expect(formatTimerTime(65)).toBe("1:05");
    expect(formatTimerTime(3661)).toBe("1:01:01");
    expect(formatTimerTime(-5)).toBe("0:00");
  });

  test("timerProgressPercent clamps to 0-100", () => {
    expect(timerProgressPercent(30, 60)).toBe(50);
    expect(timerProgressPercent(61, 60)).toBe(100);
    expect(timerProgressPercent(0, 60)).toBe(0);
  });

  test("historyRange accepts only 7, 30 and 90 days", () => {
    expect(historyRange("30")).toBe(30);
    expect(historyRange(7)).toBe(7);
    expect(historyRange("90")).toBe(90);
    expect(historyRange("14")).toBeNull();
    expect(historyRange(null)).toBeNull();
  });
});

describe("summaries", () => {
  test("work and leisure always add up to the total spent", () => {
    const tasks = [
      task({ spent: 600, duration: 1200 }),
      task({ spent: 300, duration: 900, kind: "leisure" }),
      task({ spent: 0, duration: 600 }),
    ];
    const summary = summarizeTimerDay(tasks, DATE, at("12:00"));
    expect(summary).toEqual({
      spent: 900,
      budget: 2700,
      work: 600,
      leisure: 300,
    });
    expect(summary.work + summary.leisure).toBe(summary.spent);
  });

  test("sample days are deterministic per date", () => {
    expect(createSampleTimerDay(DATE)).toEqual(createSampleTimerDay(DATE));
  });
});
