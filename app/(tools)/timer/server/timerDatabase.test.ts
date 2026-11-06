import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

import { createClient } from "@libsql/client";
import type { Client } from "@libsql/client";

import { DEFAULT_DAILY_TASKS } from "../utils/dailyTasks";
import { DATE, day, preferences, task } from "../utils/timerTestFixtures";
import {
  closeTimerDatabase,
  initializeTimerDatabase,
  readTimerDays,
  readTimerHistoryState,
  readTimerState,
  timerDatabaseTransaction,
  writeTimerDays,
  writeTimerPreferences,
} from "./timerDatabase";

// These tests only ever open a throwaway SQLite file. The environment is
// pointed at it before any connection, so real Turso credentials loaded from
// .env.local are never used.
let directory = "";
let client: Client;
const savedEnvironment = {
  url: process.env.TURSO_DATABASE_URL,
  token: process.env.TURSO_AUTH_TOKEN,
};

function localUrl() {
  const url = process.env.TURSO_DATABASE_URL ?? "";
  if (!url.startsWith("file:")) {
    throw new Error(`Refusing to run Timer tests against ${url}`);
  }
  return url;
}

beforeEach(() => {
  directory = mkdtempSync(path.join(tmpdir(), "timer-test-"));
  process.env.TURSO_DATABASE_URL = `file:${path.join(directory, "timer.db")}`;
  process.env.TURSO_AUTH_TOKEN = "local-test";
  client = createClient({ url: localUrl() });
});

afterEach(() => {
  closeTimerDatabase();
  client.close();
  rmSync(directory, { recursive: true, force: true });
  if (savedEnvironment.url === undefined) {
    delete process.env.TURSO_DATABASE_URL;
  } else {
    process.env.TURSO_DATABASE_URL = savedEnvironment.url;
  }
  if (savedEnvironment.token === undefined) {
    delete process.env.TURSO_AUTH_TOKEN;
  } else {
    process.env.TURSO_AUTH_TOKEN = savedEnvironment.token;
  }
});

async function columns(table: string) {
  const result = await client.execute(`PRAGMA table_info(${table})`);
  return result.rows.flatMap((row) =>
    typeof row.name === "string" ? [row.name] : []
  );
}

// Rows as stored with explicit defaults, so a read returns exactly what was written.
const stored = (overrides = {}) =>
  task({ kind: "work", deadlineReminderAt: null, ...overrides });

describe("schema", () => {
  test("a fresh database has every current column", async () => {
    await initializeTimerDatabase(client);
    const preferenceColumns = await columns("timer_preferences");
    for (const name of [
      "autoplay",
      "multitask",
      "desktop_list_view",
      "paged_timeline",
      "follow_now_timeline",
      "notifications_enabled",
      "duration_presets",
      "task_presets",
      "daily_tasks",
    ]) {
      expect(preferenceColumns).toContain(name);
    }
    const taskColumns = await columns("timer_tasks");
    for (const name of ["period", "kind", "deadline_reminder_at"]) {
      expect(taskColumns).toContain(name);
    }
    expect(await columns("timer_days")).toContain("spent_seconds");
  });

  test("initializing twice changes nothing", async () => {
    await initializeTimerDatabase(client);
    const before = await columns("timer_preferences");
    await initializeTimerDatabase(client);
    expect(await columns("timer_preferences")).toEqual(before);
  });

  test("an old database upgrades in place and keeps its data", async () => {
    // The oldest layout: availability_window instead of period, no kind,
    // no deadline reminder, no spent total, and none of the newer preferences.
    await client.batch([
      "CREATE TABLE timer_days (date TEXT PRIMARY KEY, revision INTEGER NOT NULL CHECK(revision >= 0))",
      `CREATE TABLE timer_tasks (
        id TEXT NOT NULL,
        date TEXT NOT NULL REFERENCES timer_days(date) ON DELETE CASCADE,
        position INTEGER NOT NULL CHECK(position >= 0),
        activity TEXT NOT NULL, description TEXT NOT NULL,
        duration_seconds INTEGER NOT NULL CHECK(duration_seconds BETWEEN 1 AND 86400),
        spent_seconds REAL NOT NULL CHECK(spent_seconds >= 0 AND spent_seconds <= duration_seconds),
        started_at TEXT, last_started_at TEXT, completed_at TEXT, notification_claimed_at TEXT,
        availability_window TEXT,
        PRIMARY KEY(date, id), UNIQUE(date, position)
      )`,
      `CREATE TABLE timer_preferences (
        id INTEGER PRIMARY KEY CHECK(id = 1), revision INTEGER NOT NULL DEFAULT 0,
        autoplay INTEGER NOT NULL DEFAULT 0, multitask INTEGER NOT NULL DEFAULT 0,
        notifications_enabled INTEGER NOT NULL DEFAULT 1
      )`,
      `INSERT INTO timer_preferences(id, revision, autoplay, multitask, notifications_enabled) VALUES (1, 4, 1, 0, 1)`,
      `INSERT INTO timer_days(date, revision) VALUES ('${DATE}', 2)`,
      `INSERT INTO timer_tasks(id, date, position, activity, description, duration_seconds, spent_seconds, availability_window)
        VALUES ('a', '${DATE}', 0, 'Reading', 'book', 1800, 300, '{"from":540,"until":600}')`,
      `INSERT INTO timer_tasks(id, date, position, activity, description, duration_seconds, spent_seconds, availability_window)
        VALUES ('b', '${DATE}', 1, 'YouTube', 'watch', 3600, 100, NULL)`,
    ]);

    await initializeTimerDatabase(client);

    const upgradedColumns = await columns("timer_preferences");
    expect(upgradedColumns).toContain("paged_timeline");
    expect(upgradedColumns).toContain("follow_now_timeline");
    const upgraded = await timerDatabaseTransaction(
      async (tx) => await readTimerState(tx, DATE),
      "read"
    );
    expect(upgraded.preferences).toMatchObject({
      autoplay: true,
      multitask: false,
      pagedTimeline: false,
      followNowTimeline: false,
    });
    expect(upgraded.preferences.revision).toBeGreaterThanOrEqual(4);
    expect(upgraded.preferences.dailyTasks).toHaveLength(
      DEFAULT_DAILY_TASKS.length
    );
    const [saved] = upgraded.days;
    expect(saved?.revision).toBe(2);
    expect(saved?.tasks).toMatchObject([
      { id: "a", period: { from: 540, until: 600 }, kind: "work", spent: 300 },
      {
        id: "b",
        period: { from: 0, until: 1440 },
        kind: "leisure",
        spent: 100,
      },
    ]);
    const spentRows = await client.execute(
      `SELECT spent_seconds FROM timer_days WHERE date = '${DATE}'`
    );
    const [spentRow] = spentRows.rows;
    expect(Number(spentRow?.spent_seconds)).toBe(400);

    // Running the migration again must not alter the upgraded data.
    await initializeTimerDatabase(client);
    const again = await timerDatabaseTransaction(
      async (tx) => await readTimerState(tx, DATE),
      "read"
    );
    expect(again.days).toEqual(upgraded.days);
  });
});

describe("storage round trips", () => {
  test("days and their tasks read back exactly as written", async () => {
    await initializeTimerDatabase(client);
    const written = [
      day(
        [
          stored({
            id: "one",
            activity: "Deep work",
            spent: 600,
            period: { from: 540, until: 660 },
          }),
          stored({
            id: "two",
            kind: "leisure",
            startedAt: "2026-03-10T03:00:00.000Z",
            lastStartedAt: "2026-03-10T02:00:00.000Z",
            reachedAt: null,
          }),
        ],
        DATE
      ),
      day([], "2026-03-11"),
    ];
    const read = await timerDatabaseTransaction(async (tx) => {
      await writeTimerDays(tx, written);
      return await readTimerDays(tx);
    });
    expect(read).toEqual(written);
  });

  test("every preference field survives a write and read", async () => {
    await initializeTimerDatabase(client);
    const written = preferences({
      revision: 7,
      autoplay: true,
      multitask: true,
      desktopListView: true,
      pagedTimeline: true,
      followNowTimeline: true,
      notificationsEnabled: false,
      durationPresets: [60, 120],
    });
    const read = await timerDatabaseTransaction(async (tx) => {
      await writeTimerPreferences(tx, written);
      const state = await readTimerState(tx, DATE);
      return state.preferences;
    });
    expect(read).toEqual(written);
  });

  test("history totals split spent time by kind", async () => {
    await initializeTimerDatabase(client);
    const totals = await timerDatabaseTransaction(async (tx) => {
      await writeTimerDays(tx, [
        day(
          [
            stored({ id: "w", spent: 600, duration: 1200 }),
            stored({ id: "l", kind: "leisure", spent: 300, duration: 900 }),
          ],
          "2026-03-09"
        ),
        day([], DATE),
      ]);
      const history = await readTimerHistoryState(tx, "2026-03-09", DATE);
      return history.totals;
    });
    expect(totals.get("2026-03-09")).toEqual({
      spent: 900,
      budget: 2100,
      work: 600,
      leisure: 300,
    });
    expect(totals.get(DATE)).toEqual({
      spent: 0,
      budget: 0,
      work: 0,
      leisure: 0,
    });
  });
});
