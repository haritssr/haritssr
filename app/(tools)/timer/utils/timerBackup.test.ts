import { describe, expect, test } from "bun:test";

import {
  createTimerBackup,
  mergeTimerBackup,
  parseTimerBackup,
} from "./timerBackup";
import { TimerStoreError } from "./timerEngine";
import { at, DATE, day, task } from "./timerTestFixtures";

const EXPORTED = at("12:00");

function backupText(days: unknown[], overrides = {}) {
  return JSON.stringify({
    format: "haritssr-timer",
    version: 1,
    timeZone: "Asia/Jakarta",
    exportedAt: new Date(EXPORTED).toISOString(),
    days,
    ...overrides,
  });
}

describe("backup round trip", () => {
  test("export then import keeps the data and pauses running timers", () => {
    const paused = task({ id: "paused", spent: 300 });
    const running = task({
      id: "running",
      startedAt: new Date(at("11:00")).toISOString(),
    });
    const original = day([paused, running]);
    const backup = createTimerBackup([original], EXPORTED);
    expect(backup.format).toBe("haritssr-timer");
    const [restored] = parseTimerBackup(JSON.stringify(backup));
    expect(restored?.date).toBe(DATE);
    expect(restored?.tasks.map((entry) => entry.id)).toEqual([
      "paused",
      "running",
    ]);
    expect(restored?.tasks[0]?.spent).toBe(300);
    // One hour ran between 11:00 and the 12:00 export.
    expect(restored?.tasks[1]?.spent).toBe(3600);
    expect(restored?.tasks.every((entry) => entry.startedAt === null)).toBe(
      true
    );
  });

  test("exporting does not change the live day", () => {
    const original = day([
      task({ startedAt: new Date(at("11:00")).toISOString() }),
    ]);
    createTimerBackup([original], EXPORTED);
    expect(original.tasks[0]?.startedAt).not.toBeNull();
    expect(original.tasks[0]?.spent).toBe(0);
  });

  test("backups with the legacy availabilityWindow key still import", () => {
    const legacy = {
      schemaVersion: 1,
      date: DATE,
      revision: 1,
      tasks: [
        {
          id: "old",
          activity: "Old",
          description: "",
          duration: 600,
          spent: 0,
          startedAt: null,
          reachedAt: null,
          notifiedAt: null,
          availabilityWindow: { from: 60, until: 120 },
        },
      ],
    };
    const [restored] = parseTimerBackup(backupText([legacy]));
    expect(restored?.tasks[0]?.period).toEqual({ from: 60, until: 120 });
  });
});

describe("backup validation", () => {
  test("rejects text that is not JSON", () => {
    expect(() => parseTimerBackup("{nope")).toThrow(TimerStoreError);
  });

  test("rejects unknown formats, versions and time zones", () => {
    for (const overrides of [
      { format: "other" },
      { version: 2 },
      { timeZone: "UTC" },
    ]) {
      expect(() => parseTimerBackup(backupText([], overrides))).toThrow(
        TimerStoreError
      );
    }
  });

  test("rejects two days with the same date", () => {
    expect(() => parseTimerBackup(backupText([day([]), day([])]))).toThrow(
      TimerStoreError
    );
  });
});

describe("mergeTimerBackup", () => {
  test("adds days that do not exist yet and bumps their revision", () => {
    const { additions, skipped } = mergeTimerBackup([], [day([task()])]);
    expect(additions).toHaveLength(1);
    expect(additions[0]?.revision).toBe(1);
    expect(skipped).toBe(0);
  });

  test("skips days that are already identical", () => {
    const entry = task({ id: "same" });
    const { additions, skipped } = mergeTimerBackup(
      [day([entry])],
      [day([structuredClone(entry)])]
    );
    expect(additions).toHaveLength(0);
    expect(skipped).toBe(1);
  });

  test("fills a stored day that has no tasks", () => {
    const { additions } = mergeTimerBackup([day([])], [day([task()])]);
    expect(additions).toHaveLength(1);
  });

  test("refuses to import over different activities and lists the dates", () => {
    expect(() =>
      mergeTimerBackup(
        [day([task({ id: "mine" })])],
        [day([task({ id: "theirs" })])]
      )
    ).toThrow(DATE);
  });
});
