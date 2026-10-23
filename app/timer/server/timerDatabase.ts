import { setTimeout } from "node:timers/promises";

import { createClient } from "@libsql/client";
import type {
  Client,
  InStatement,
  ResultSet,
  Transaction,
} from "@libsql/client";

import type { TimerDay } from "@/app/timer/utils/timer";
import {
  daySchema,
  preferencesSchema,
} from "@/app/timer/utils/timerValidation";

export function timerDatabase() {
  const url = process.env.TURSO_DATABASE_URL;
  if (
    url === undefined ||
    url.length === 0 ||
    process.env.TURSO_AUTH_TOKEN === undefined ||
    process.env.TURSO_AUTH_TOKEN.length === 0
  ) {
    throw new Error(
      "Configure TURSO_DATABASE_URL and TURSO_AUTH_TOKEN on the server."
    );
  }
  return createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN });
}

const TIMER_DATABASE_SCHEMA: InStatement[] = [
  `CREATE TABLE IF NOT EXISTS timer_days (
    date TEXT PRIMARY KEY, revision INTEGER NOT NULL CHECK(revision >= 0)
  )`,
  `CREATE TABLE IF NOT EXISTS timer_tasks (
    id TEXT NOT NULL,
    date TEXT NOT NULL REFERENCES timer_days(date) ON DELETE CASCADE,
    position INTEGER NOT NULL CHECK(position >= 0),
    activity TEXT NOT NULL, description TEXT NOT NULL,
    duration_seconds INTEGER NOT NULL CHECK(duration_seconds BETWEEN 1 AND 86400),
    spent_seconds REAL NOT NULL CHECK(spent_seconds >= 0 AND spent_seconds <= duration_seconds),
    speed REAL NOT NULL DEFAULT 1 CHECK(speed IN (1, 1.5, 2, 2.5, 3)),
    started_at TEXT, last_started_at TEXT, completed_at TEXT, notification_claimed_at TEXT,
    PRIMARY KEY(date, id),
    UNIQUE(date, position)
  )`,
  "CREATE INDEX IF NOT EXISTS timer_tasks_date_position ON timer_tasks(date, position)",
  "CREATE INDEX IF NOT EXISTS timer_tasks_running ON timer_tasks(date) WHERE started_at IS NOT NULL",
  "CREATE INDEX IF NOT EXISTS timer_tasks_pending_notice ON timer_tasks(date) WHERE completed_at IS NOT NULL AND notification_claimed_at IS NULL",
  `CREATE TABLE IF NOT EXISTS timer_preferences (
    id INTEGER PRIMARY KEY CHECK(id = 1), revision INTEGER NOT NULL DEFAULT 0,
    autoplay INTEGER NOT NULL DEFAULT 0 CHECK(autoplay IN (0, 1)),
    multitask INTEGER NOT NULL DEFAULT 0 CHECK(multitask IN (0, 1)),
    notifications_enabled INTEGER NOT NULL DEFAULT 1 CHECK(notifications_enabled IN (0, 1)),
    duration_presets TEXT, task_presets TEXT
  )`,
  "INSERT OR IGNORE INTO timer_preferences(id) VALUES (1)",
];

export async function initializeTimerDatabase(client: Client) {
  const tx = await client.transaction("write");
  try {
    await tx.batch(TIMER_DATABASE_SCHEMA);
    const columns = await tx.execute("PRAGMA table_info(timer_preferences)");
    const names = new Set(columns.rows.map((column) => column.name));
    const additions = ["duration_presets", "task_presets"]
      .filter((name) => !names.has(name))
      .map((name) => `ALTER TABLE timer_preferences ADD COLUMN ${name} TEXT`);
    if (additions.length > 0) {
      await tx.batch(additions);
    }
    await tx.commit();
  } catch (error) {
    await tx.rollback();
    throw error;
  } finally {
    tx.close();
  }
}

async function dayQueries(
  tx: Transaction,
  date?: string,
  range?: { from: string; to: string }
): Promise<InStatement[]> {
  if (date === undefined) {
    // Full history is reserved for backups and imports.
    return [
      "SELECT * FROM timer_days ORDER BY date",
      "SELECT * FROM timer_tasks ORDER BY date, position",
    ];
  }
  // Discover dates once. Separate branches use the small partial indexes instead
  // of scanning task history for an OR condition in both subsequent queries.
  const dates = await tx.execute({
    sql: `SELECT ? AS date
      UNION SELECT date FROM timer_tasks WHERE started_at IS NOT NULL
      UNION SELECT date FROM timer_tasks WHERE completed_at IS NOT NULL AND notification_claimed_at IS NULL
      ${range === undefined ? "" : "UNION SELECT date FROM timer_days WHERE date BETWEEN ? AND ?"}`,
    args: range === undefined ? [date] : [date, range.from, range.to],
  });
  const args = dates.rows.map((row) => row.date);
  const placeholders = args.map(() => "?").join(", ");
  return [
    {
      sql: `SELECT * FROM timer_days WHERE date IN (${placeholders}) ORDER BY date`,
      args,
    },
    {
      sql: `SELECT * FROM timer_tasks WHERE date IN (${placeholders}) ORDER BY date, position`,
      args,
    },
  ];
}

function decodeDays(days: ResultSet, tasks: ResultSet) {
  const tasksByDate = new Map<unknown, typeof tasks.rows>();
  for (const task of tasks.rows) {
    const group = tasksByDate.get(task.date);
    if (group) {
      group.push(task);
    } else {
      tasksByDate.set(task.date, [task]);
    }
  }
  return days.rows.map((day) =>
    daySchema.parse({
      schemaVersion: 1,
      date: day.date,
      revision: Number(day.revision),
      tasks: (tasksByDate.get(day.date) ?? []).map((task) => ({
        id: task.id,
        activity: task.activity,
        description: task.description,
        duration: Number(task.duration_seconds),
        spent: Number(task.spent_seconds),
        speed: Number(task.speed),
        startedAt: task.started_at,
        ...(task.last_started_at === null
          ? {}
          : { lastStartedAt: task.last_started_at }),
        reachedAt: task.completed_at,
        notifiedAt: task.notification_claimed_at,
      })),
    })
  );
}

export async function readTimerDays(tx: Transaction, date?: string) {
  const [days, tasks] = await tx.batch(await dayQueries(tx, date));
  return decodeDays(days, tasks);
}

export async function readTimerState(
  tx: Transaction,
  date: string,
  range?: { from: string; to: string }
) {
  const [days, tasks, preferences] = await tx.batch([
    ...(await dayQueries(tx, date, range)),
    "SELECT * FROM timer_preferences WHERE id = 1",
  ]);
  const [row] = preferences.rows;
  if (row === undefined) {
    throw new Error("Run bun run migrate:timer to initialize Turso.");
  }
  return {
    days: decodeDays(days, tasks),
    preferences: preferencesSchema.parse({
      revision: Number(row.revision),
      autoplay: row.autoplay === 1,
      multitask: row.multitask === 1,
      notificationsEnabled: row.notifications_enabled === 1,
      durationPresets:
        typeof row.duration_presets === "string"
          ? (JSON.parse(row.duration_presets) as unknown)
          : undefined,
      taskPresets:
        typeof row.task_presets === "string"
          ? (JSON.parse(row.task_presets) as unknown)
          : undefined,
    }),
  };
}

export async function writeTimerDays(tx: Transaction, days: TimerDay[]) {
  const statements: InStatement[] = days.flatMap((day) => [
    {
      sql: "INSERT INTO timer_days(date, revision) VALUES (?, ?) ON CONFLICT(date) DO UPDATE SET revision = excluded.revision",
      args: [day.date, day.revision],
    },
    { sql: "DELETE FROM timer_tasks WHERE date = ?", args: [day.date] },
    ...day.tasks.map((task, position) => ({
      sql: "INSERT INTO timer_tasks(id, date, position, activity, description, duration_seconds, spent_seconds, speed, started_at, last_started_at, completed_at, notification_claimed_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      args: [
        task.id,
        day.date,
        position,
        task.activity,
        task.description,
        task.duration,
        task.spent,
        task.speed ?? 1,
        task.startedAt,
        task.lastStartedAt ?? null,
        task.reachedAt,
        task.notifiedAt,
      ],
    })),
  ]);
  if (statements.length > 0) {
    await tx.batch(statements);
  }
}

function taskValues(task: TimerDay["tasks"][number], position: number) {
  return [
    position,
    task.activity,
    task.description,
    task.duration,
    task.spent,
    task.speed ?? 1,
    task.startedAt,
    task.lastStartedAt ?? null,
    task.reachedAt,
    task.notifiedAt,
  ];
}

export async function updateTimerDays(
  tx: Transaction,
  days: TimerDay[],
  previous: TimerDay[]
) {
  const oldDays = new Map(previous.map((day) => [day.date, day]));
  const statements: InStatement[] = [];
  for (const day of days) {
    const before = oldDays.get(day.date);
    if (
      before !== undefined &&
      JSON.stringify(day) === JSON.stringify(before)
    ) {
      continue;
    }
    statements.push({
      sql: "INSERT INTO timer_days(date, revision) VALUES (?, ?) ON CONFLICT(date) DO UPDATE SET revision = excluded.revision",
      args: [day.date, day.revision],
    });
    const remaining = new Set(day.tasks.map((task) => task.id));
    const oldTasks = new Map(
      before?.tasks.map((task, position) => [task.id, { task, position }])
    );
    for (const task of before?.tasks ?? []) {
      if (!remaining.has(task.id)) {
        statements.push({
          sql: "DELETE FROM timer_tasks WHERE date = ? AND id = ?",
          args: [day.date, task.id],
        });
      }
    }
    // Free moved positions before upserts, including swaps, without violating UNIQUE.
    for (const [position, task] of day.tasks.entries()) {
      const old = oldTasks.get(task.id);
      if (old !== undefined && old.position !== position) {
        statements.push({
          sql: "UPDATE timer_tasks SET position = ? WHERE date = ? AND id = ?",
          args: [
            (before?.tasks.length ?? 0) + day.tasks.length + position,
            day.date,
            task.id,
          ],
        });
      }
    }
    for (const [position, task] of day.tasks.entries()) {
      const values = taskValues(task, position);
      const old = oldTasks.get(task.id);
      if (
        old !== undefined &&
        JSON.stringify(values) ===
          JSON.stringify(taskValues(old.task, old.position))
      ) {
        continue;
      }
      statements.push({
        sql: `INSERT INTO timer_tasks(date, id, position, activity, description, duration_seconds, spent_seconds, speed, started_at, last_started_at, completed_at, notification_claimed_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(date, id) DO UPDATE SET position = excluded.position, activity = excluded.activity,
          description = excluded.description, duration_seconds = excluded.duration_seconds, spent_seconds = excluded.spent_seconds,
          speed = excluded.speed, started_at = excluded.started_at, last_started_at = excluded.last_started_at,
          completed_at = excluded.completed_at, notification_claimed_at = excluded.notification_claimed_at`,
        args: [day.date, task.id, ...values],
      });
    }
  }
  if (statements.length > 0) {
    await tx.batch(statements);
  }
}

async function beginTransaction(
  client: Client,
  mode: "read" | "write",
  attempt = 0
): Promise<Transaction> {
  try {
    return await client.transaction(mode);
  } catch (error) {
    if (
      attempt >= 4 ||
      !(error instanceof Error) ||
      !("code" in error) ||
      error.code !== "SQLITE_BUSY"
    ) {
      throw error;
    }
    // Retry only transaction acquisition: no application changes have run yet.
    await setTimeout(25 * 2 ** attempt);
    return await beginTransaction(client, mode, attempt + 1);
  }
}

let runtimeClient: Client | undefined;

// Operational scripts close this explicitly; the server reuses it between requests.
export function closeTimerDatabase() {
  runtimeClient?.close();
  runtimeClient = undefined;
}

export async function timerDatabaseTransaction<T>(
  operation: (tx: Transaction) => Promise<T>,
  mode: "read" | "write" = "write"
) {
  runtimeClient ??= timerDatabase();
  const tx = await beginTransaction(runtimeClient, mode);
  try {
    const result = await operation(tx);
    await tx.commit();
    return result;
  } catch (error) {
    await tx.rollback();
    throw error;
  } finally {
    tx.close();
  }
}
