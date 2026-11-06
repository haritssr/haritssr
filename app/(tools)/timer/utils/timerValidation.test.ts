import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import path from "node:path";

import { DEFAULT_DAILY_TASKS } from "./dailyTasks";
import { DEFAULT_DURATION_PRESETS } from "./timer";
import { DATE, day, preferences, task } from "./timerTestFixtures";
import {
  actionSchema,
  daySchema,
  historySchema,
  preferencesPatchSchema,
  preferencesSchema,
} from "./timerValidation";

// Shapes the app stored before kind, period and the timeline preferences
// existed. They must keep loading, with the documented defaults.
const legacyTask = {
  id: "old",
  activity: "Reading",
  description: "chapter",
  duration: 1800,
  spent: 12.5,
  startedAt: null,
  reachedAt: null,
  notifiedAt: null,
  // Retired field: parsing strips it instead of failing.
  speed: 1,
};

describe("older data still parses", () => {
  test("a task without kind or period reads as work, all day", () => {
    const parsed = daySchema.parse({
      schemaVersion: 1,
      date: DATE,
      revision: 3,
      tasks: [legacyTask],
    });
    const [entry] = parsed.tasks;
    expect(entry?.period).toEqual({ from: 0, until: 1440 });
    expect(entry?.kind).toBeUndefined();
    expect(entry).not.toHaveProperty("speed");
  });

  test("a null period reads as all day", () => {
    const parsed = daySchema.parse({
      schemaVersion: 1,
      date: DATE,
      revision: 0,
      tasks: [{ ...legacyTask, period: null }],
    });
    expect(parsed.tasks[0]?.period).toEqual({ from: 0, until: 1440 });
  });

  test("the legacy availabilityWindow key becomes period", () => {
    const parsed = daySchema.parse({
      schemaVersion: 1,
      date: DATE,
      revision: 0,
      tasks: [{ ...legacyTask, availabilityWindow: { from: 60, until: 120 } }],
    });
    expect(parsed.tasks[0]?.period).toEqual({ from: 60, until: 120 });
  });

  test("preferences from before the optional fields get defaults", () => {
    const parsed = preferencesSchema.parse({
      revision: 1,
      autoplay: true,
      multitask: false,
      notificationsEnabled: true,
    });
    expect(parsed).toMatchObject({
      autoplay: true,
      desktopListView: false,
      pagedTimeline: false,
      followNowTimeline: false,
      durationPresets: DEFAULT_DURATION_PRESETS,
    });
    expect(parsed.dailyTasks).toEqual(DEFAULT_DAILY_TASKS);
  });
});

describe("data shape stays in sync", () => {
  test("the fixture, the schema and the patch schema list the same fields", () => {
    const fields = Object.keys(preferences()).toSorted();
    expect(Object.keys(preferencesSchema.shape).toSorted()).toEqual(fields);
    expect(Object.keys(preferencesPatchSchema.shape).toSorted()).toEqual(
      fields.filter((field) => field !== "revision")
    );
  });

  test("a full preferences object round-trips through the schema", () => {
    const full = preferences({
      revision: 9,
      autoplay: true,
      multitask: true,
      desktopListView: true,
      pagedTimeline: true,
      followNowTimeline: true,
      notificationsEnabled: false,
    });
    expect(preferencesSchema.parse(full)).toEqual(full);
  });
});

const total = (index: number) => ({
  date: `2026-03-${String(index + 1).padStart(2, "0")}`,
  spent: 60,
  budget: 120,
  work: 60,
  leisure: 0,
});

const history = (days: number) => ({
  day: day([]),
  today: DATE,
  mode: "demo",
  totals: Array.from({ length: days }, (_, index) => total(index % 28)),
});

describe("strict inputs", () => {
  test("patches reject unknown keys but accept real ones", () => {
    expect(preferencesPatchSchema.safeParse({ nope: true }).success).toBe(
      false
    );
    expect(preferencesPatchSchema.safeParse({}).success).toBe(true);
    expect(
      preferencesPatchSchema.safeParse({ followNowTimeline: true }).success
    ).toBe(true);
    expect(preferencesPatchSchema.safeParse({ multitask: "yes" }).success).toBe(
      false
    );
  });

  test("actions are checked by name and shape", () => {
    expect(
      actionSchema.safeParse({ action: "start", date: DATE, taskId: "a" })
        .success
    ).toBe(true);
    expect(
      actionSchema.safeParse({ action: "start", date: DATE }).success
    ).toBe(false);
    expect(
      actionSchema.safeParse({ action: "explode", date: DATE, taskId: "a" })
        .success
    ).toBe(false);
    expect(
      actionSchema.safeParse({
        action: "start",
        date: "2026-02-30",
        taskId: "a",
      }).success
    ).toBe(false);
  });

  test("an all-day add needs a description, a scheduled one does not", () => {
    const base = { action: "add", date: DATE, activity: "Read", duration: 600 };
    expect(actionSchema.safeParse({ ...base, description: "" }).success).toBe(
      false
    );
    expect(
      actionSchema.safeParse({
        ...base,
        description: "",
        period: { from: 600, until: 660 },
      }).success
    ).toBe(true);
    // Scheduled windows snap to 15 minutes.
    expect(
      actionSchema.safeParse({
        ...base,
        description: "x",
        period: { from: 601, until: 660 },
      }).success
    ).toBe(false);
  });

  test("days reject duplicate ids, overspent tasks and other versions", () => {
    const duplicate = day([task({ id: "same" }), task({ id: "same" })]);
    expect(daySchema.safeParse(duplicate).success).toBe(false);
    expect(
      daySchema.safeParse(day([task({ spent: 4000, duration: 3600 })])).success
    ).toBe(false);
    expect(daySchema.safeParse({ ...day([]), schemaVersion: 2 }).success).toBe(
      false
    );
  });

  test("history totals must cover 7, 30 or 90 days", () => {
    for (const days of [7, 30, 90]) {
      expect(historySchema.safeParse(history(days)).success).toBe(true);
    }
    expect(historySchema.safeParse(history(14)).success).toBe(false);
  });
});

// zod must stay out of the first Timer page load: browser code loads the
// schemas with a dynamic import() at the point of use.
describe("client bundle stays light", () => {
  const root = path.join(import.meta.dir, "..");
  const sources = [...new Bun.Glob("**/*.{ts,tsx}").scanSync(root)].filter(
    (file) =>
      /\.tsx?$/.test(file) &&
      !/\.test\.|^server\/|^store\.|^migrate-|^seed-|timerValidation\.ts$|timerBackup\.ts$/.test(
        file
      )
  );

  test("only dynamic or type imports reach the schemas", () => {
    const offenders = sources.filter((file) =>
      /^import (?!type )[^;]*?from "(?:zod|[^"]*timerValidation)";/ms.test(
        readFileSync(path.join(root, file), "utf-8")
      )
    );
    expect(offenders).toEqual([]);
  });
});
