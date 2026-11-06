import { describe, expect, test } from "bun:test";

import {
  applyTimerCommand,
  applyTimerPreferencePatch,
  settleTimerDay,
  TimerStoreError,
  timerNotices,
} from "./timerEngine";
import { at, DATE, day, preferences, task } from "./timerTestFixtures";

function running(startedAt: string, overrides = {}) {
  return task({
    startedAt: new Date(at(startedAt)).toISOString(),
    lastStartedAt: new Date(at(startedAt)).toISOString(),
    ...overrides,
  });
}

describe("settleTimerDay", () => {
  test("adds elapsed time and moves the baseline forward", () => {
    const entry = running("09:00");
    const current = day([entry]);
    expect(settleTimerDay(current, at("09:30"))).toBe(true);
    expect(entry.spent).toBe(1800);
    expect(entry.startedAt).toBe(new Date(at("09:30")).toISOString());
    expect(current.revision).toBe(1);
  });

  test("completes a task exactly when its duration is reached", () => {
    const entry = running("09:00");
    settleTimerDay(day([entry]), at("10:30"));
    expect(entry.spent).toBe(3600);
    expect(entry.startedAt).toBeNull();
    expect(entry.reachedAt).toBe(new Date(at("10:00")).toISOString());
  });

  test("stops counting at the end of the Jakarta day", () => {
    const entry = running("23:50");
    settleTimerDay(day([entry]), at("00:30", "2026-03-11"));
    expect(entry.spent).toBe(600);
    expect(entry.startedAt).toBeNull();
    expect(entry.reachedAt).toBeNull();
  });

  test("leaves paused days untouched", () => {
    const current = day([task()]);
    expect(settleTimerDay(current, at("12:00"))).toBe(false);
    expect(current.revision).toBe(0);
  });
});

describe("start, pause and done", () => {
  test("starting a task pauses the others without multitask", () => {
    const first = running("09:00");
    const second = task();
    const current = day([first, second]);
    applyTimerCommand(
      current,
      { action: "start", date: DATE, taskId: second.id },
      preferences(),
      at("09:10")
    );
    expect(first.startedAt).toBeNull();
    expect(first.spent).toBe(600);
    expect(second.startedAt).toBe(new Date(at("09:10")).toISOString());
  });

  test("multitask keeps both tasks running", () => {
    const first = running("09:00");
    const second = task();
    applyTimerCommand(
      day([first, second]),
      { action: "start", date: DATE, taskId: second.id },
      preferences({ multitask: true }),
      at("09:10")
    );
    expect(first.startedAt).not.toBeNull();
    expect(second.startedAt).not.toBeNull();
  });

  test("a task outside its scheduled window cannot start", () => {
    const scheduled = task({ period: { from: 600, until: 660 } });
    expect(() =>
      applyTimerCommand(
        day([scheduled]),
        { action: "start", date: DATE, taskId: scheduled.id },
        preferences(),
        at("09:00")
      )
    ).toThrow(TimerStoreError);
  });

  test("a finished task cannot start again", () => {
    const finished = task({ spent: 3600, reachedAt: "2026-03-10T01:00:00Z" });
    expect(() =>
      applyTimerCommand(
        day([finished]),
        { action: "start", date: DATE, taskId: finished.id },
        preferences(),
        at("09:00")
      )
    ).toThrow("reached its duration");
  });

  test("pause settles elapsed time", () => {
    const entry = running("09:00");
    applyTimerCommand(
      day([entry]),
      { action: "pause", date: DATE, taskId: entry.id },
      preferences(),
      at("09:20")
    );
    expect(entry.startedAt).toBeNull();
    expect(entry.spent).toBe(1200);
  });

  test("done marks the task finished and notified", () => {
    const entry = running("09:00");
    applyTimerCommand(
      day([entry]),
      { action: "done", date: DATE, taskId: entry.id },
      preferences(),
      at("09:20")
    );
    expect(entry.reachedAt).not.toBeNull();
    expect(entry.notifiedAt).not.toBeNull();
    expect(entry.startedAt).toBeNull();
  });

  test("autoplay starts the next unfinished task after done", () => {
    const first = running("09:00");
    const next = task();
    applyTimerCommand(
      day([first, next]),
      { action: "done", date: DATE, taskId: first.id },
      preferences({ autoplay: true }),
      at("09:20")
    );
    expect(next.startedAt).toBe(new Date(at("09:20")).toISOString());
  });

  test("autoplay never starts daily tasks", () => {
    const first = running("09:00");
    const daily = task({ id: "daily:test" });
    applyTimerCommand(
      day([first, daily]),
      { action: "done", date: DATE, taskId: first.id },
      preferences({ autoplay: true }),
      at("09:20")
    );
    expect(daily.startedAt).toBeNull();
  });

  test("restore reopens an early finished task only", () => {
    const early = task({
      spent: 600,
      reachedAt: "2026-03-10T02:00:00Z",
      notifiedAt: "2026-03-10T02:00:00Z",
    });
    const complete = task({ spent: 3600, reachedAt: "2026-03-10T02:00:00Z" });
    const current = day([early, complete]);
    applyTimerCommand(
      current,
      { action: "restore", date: DATE, taskId: early.id },
      preferences(),
      at("12:00")
    );
    expect(early.reachedAt).toBeNull();
    expect(early.notifiedAt).toBeNull();
    expect(() =>
      applyTimerCommand(
        current,
        { action: "restore", date: DATE, taskId: complete.id },
        preferences(),
        at("12:00")
      )
    ).toThrow(TimerStoreError);
  });
});

const add = (overrides = {}) => ({
  action: "add" as const,
  date: DATE,
  activity: "Read",
  description: "",
  duration: 1800,
  ...overrides,
});

describe("planning commands", () => {
  test("add appends an all-day task by default", () => {
    const current = day([]);
    applyTimerCommand(
      current,
      add({ taskId: "new" }),
      preferences(),
      at("09:00")
    );
    expect(current.tasks).toHaveLength(1);
    expect(current.tasks[0]).toMatchObject({
      id: "new",
      period: { from: 0, until: 1440 },
      spent: 0,
      startedAt: null,
    });
  });

  test("adding the same id twice is a no-op", () => {
    const current = day([]);
    applyTimerCommand(
      current,
      add({ taskId: "same" }),
      preferences(),
      at("09:00")
    );
    applyTimerCommand(
      current,
      add({ taskId: "same" }),
      preferences(),
      at("09:00")
    );
    expect(current.tasks).toHaveLength(1);
  });

  test("a scheduled task cannot start in the past", () => {
    expect(() =>
      applyTimerCommand(
        day([]),
        add({ period: { from: 480, until: 540 } }),
        preferences(),
        at("09:00")
      )
    ).toThrow("future availability window");
  });

  test("edit rejects durations at or below the time already spent", () => {
    const entry = task({ spent: 1200 });
    expect(() =>
      applyTimerCommand(
        day([entry]),
        {
          action: "edit",
          date: DATE,
          taskId: entry.id,
          activity: "Task",
          description: "",
          duration: 1200,
        },
        preferences(),
        at("09:00")
      )
    ).toThrow("longer than the time already spent");
  });

  test("daily tasks cannot be deleted from a day", () => {
    const daily = task({ id: "daily:x" });
    expect(() =>
      applyTimerCommand(
        day([daily]),
        { action: "delete", date: DATE, taskId: daily.id },
        preferences(),
        at("09:00")
      )
    ).toThrow(TimerStoreError);
  });

  test("delete removes the task and unknown ids are 404", () => {
    const entry = task();
    const current = day([entry]);
    applyTimerCommand(
      current,
      { action: "delete", date: DATE, taskId: entry.id },
      preferences(),
      at("09:00")
    );
    expect(current.tasks).toHaveLength(0);
    expect(() =>
      applyTimerCommand(
        current,
        { action: "pause", date: DATE, taskId: "missing" },
        preferences(),
        at("09:00")
      )
    ).toThrow("Task not found.");
  });
});

describe("scheduled starts", () => {
  test("a window that just opened backdates the start to its opening", () => {
    const entry = task({ period: { from: 540, until: 600 } });
    applyTimerCommand(
      day([entry]),
      { action: "start-scheduled", date: DATE, taskIds: [entry.id] },
      preferences(),
      at("09:00:30")
    );
    expect(entry.startedAt).toBe(new Date(at("09:00")).toISOString());
  });

  test("a late arrival starts at the current time", () => {
    const entry = task({ period: { from: 540, until: 600 } });
    applyTimerCommand(
      day([entry]),
      { action: "start-scheduled", date: DATE, taskIds: [entry.id] },
      preferences(),
      at("09:05")
    );
    expect(entry.startedAt).toBe(new Date(at("09:05")).toISOString());
  });

  test("a duplicate request neither restarts nor double counts", () => {
    const entry = task({ period: { from: 540, until: 600 } });
    const current = day([entry]);
    const command = {
      action: "start-scheduled" as const,
      date: DATE,
      taskIds: [entry.id],
    };
    applyTimerCommand(current, command, preferences(), at("09:00:10"));
    const firstStart = entry.lastStartedAt;
    applyTimerCommand(current, command, preferences(), at("09:00:40"));
    // Not restarted, and the 40 seconds since the opening are counted once.
    expect(entry.lastStartedAt).toBe(firstStart);
    expect(entry.spent).toBe(40);
  });
});

describe("notices and preference patches", () => {
  test("timerNotices lists finished but unacknowledged tasks", () => {
    const pending = task({ reachedAt: "2026-03-10T02:00:00Z" });
    const seen = task({
      reachedAt: "2026-03-10T02:00:00Z",
      notifiedAt: "2026-03-10T02:00:01Z",
    });
    expect(timerNotices(day([pending, seen]))).toEqual([
      { date: DATE, taskId: pending.id, activity: "Task" },
    ]);
  });

  test("turning multitask off keeps only the latest running task", () => {
    const older = running("09:00");
    const newer = running("09:10");
    const current = day([older, newer]);
    const next = applyTimerPreferencePatch(
      current,
      preferences({ multitask: true }),
      { multitask: false },
      at("09:20")
    );
    expect(next.multitask).toBe(false);
    expect(older.startedAt).toBeNull();
    expect(newer.startedAt).not.toBeNull();
  });

  test("a patch changes only the named fields", () => {
    const base = preferences({ revision: 4 });
    const next = applyTimerPreferencePatch(
      day([]),
      base,
      { followNowTimeline: true },
      at("09:00")
    );
    expect(next).toEqual({ ...base, followNowTimeline: true });
  });
});
