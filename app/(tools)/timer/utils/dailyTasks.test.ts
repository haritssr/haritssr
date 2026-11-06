import { describe, expect, test } from "bun:test";

import {
  createDailyTasks,
  DEFAULT_DAILY_TASKS,
  isDailyTask,
  MAX_DAILY_TASKS,
} from "./dailyTasks";
import { MAX_TIMER_TASKS } from "./timer";

describe("daily tasks", () => {
  test("the defaults respect the daily and task limits", () => {
    expect(DEFAULT_DAILY_TASKS.length).toBeLessThanOrEqual(MAX_DAILY_TASKS);
    expect(MAX_DAILY_TASKS).toBeLessThanOrEqual(MAX_TIMER_TASKS);
    for (const entry of DEFAULT_DAILY_TASKS) {
      expect(entry.period.from).toBeLessThan(entry.period.until);
      expect(entry.duration).toBeGreaterThan(0);
    }
  });

  test("created tasks start untouched and copy their periods", () => {
    const created = createDailyTasks(DEFAULT_DAILY_TASKS);
    expect(created).toHaveLength(DEFAULT_DAILY_TASKS.length);
    for (const entry of created) {
      expect(isDailyTask(entry)).toBe(true);
      expect(entry).toMatchObject({
        spent: 0,
        startedAt: null,
        reachedAt: null,
        notifiedAt: null,
      });
    }
    const [first] = created;
    if (first === undefined) {
      throw new Error("Expected a daily task.");
    }
    first.period.from = 1;
    expect(DEFAULT_DAILY_TASKS[0]?.period.from).not.toBe(1);
  });

  test("daily ids are unique", () => {
    const ids = DEFAULT_DAILY_TASKS.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
