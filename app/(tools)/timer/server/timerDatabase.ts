import { createHash } from "node:crypto";
import { setTimeout } from "node:timers/promises";

import { createClient } from "@libsql/client";
import type {
  Client,
  InStatement,
  ResultSet,
  Transaction,
} from "@libsql/client";

import { DEFAULT_DAILY_TASKS } from "@/app/(tools)/timer/utils/dailyTasks";
import type {
  TimerDay,
  TimerPreferences,
} from "@/app/(tools)/timer/utils/timer";
import {
  createEmptyTimerDay,
  timerMidnight,
  taskWindowEnd,
} from "@/app/(tools)/timer/utils/timer";
import {
  daySchema,
  preferencesSchema,
  availabilityWindowSchema,
} from "@/app/(tools)/timer/utils/timerValidation";

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
    started_at TEXT, last_started_at TEXT, completed_at TEXT, notification_claimed_at TEXT,
    availability_window TEXT,
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
    duration_presets TEXT, task_presets TEXT, daily_tasks TEXT
  )`,
  "INSERT OR IGNORE INTO timer_preferences(id) VALUES (1)",
];

export async function initializeTimerDatabase(client: Client) {
  const tx = await client.transaction("write");
  try {
    await tx.batch(TIMER_DATABASE_SCHEMA);
    const columns = await tx.execute("PRAGMA table_info(timer_preferences)");
    const names = new Set(columns.rows.map((column) => column.name));
    const additions = ["duration_presets", "task_presets", "daily_tasks"]
      .filter((name) => !names.has(name))
      .map((name) => `ALTER TABLE timer_preferences ADD COLUMN ${name} TEXT`);
    if (additions.length > 0) {
      await tx.batch(additions);
    }
    await tx.execute({
      sql: "UPDATE timer_preferences SET daily_tasks = ?, revision = revision + 1 WHERE id = 1 AND daily_tasks IS NULL",
      args: [JSON.stringify(DEFAULT_DAILY_TASKS)],
    });
    const taskColumns = await tx.execute("PRAGMA table_info(timer_tasks)");
    if (
      !taskColumns.rows.some((column) => column.name === "availability_window")
    ) {
      await tx.execute(
        "ALTER TABLE timer_tasks ADD COLUMN availability_window TEXT"
      );
    }
    const dayColumns = await tx.execute("PRAGMA table_info(timer_days)");
    if (!dayColumns.rows.some((column) => column.name === "spent_seconds")) {
      await tx.execute(
        "ALTER TABLE timer_days ADD COLUMN spent_seconds REAL NOT NULL DEFAULT 0"
      );
      await tx.execute(`UPDATE timer_days SET spent_seconds = COALESCE(
        (SELECT SUM(spent_seconds) FROM timer_tasks WHERE timer_tasks.date = timer_days.date), 0)`);
    }
    await tx.batch([
      `CREATE TRIGGER IF NOT EXISTS timer_totals_insert AFTER INSERT ON timer_tasks BEGIN
        UPDATE timer_days SET spent_seconds = spent_seconds + NEW.spent_seconds WHERE date = NEW.date;
      END`,
      `CREATE TRIGGER IF NOT EXISTS timer_totals_delete AFTER DELETE ON timer_tasks BEGIN
        UPDATE timer_days SET spent_seconds = MAX(0, spent_seconds - OLD.spent_seconds) WHERE date = OLD.date;
      END`,
      `CREATE TRIGGER IF NOT EXISTS timer_totals_update AFTER UPDATE OF spent_seconds, date ON timer_tasks BEGIN
        UPDATE timer_days SET spent_seconds = MAX(0, spent_seconds - OLD.spent_seconds) WHERE date = OLD.date;
        UPDATE timer_days SET spent_seconds = spent_seconds + NEW.spent_seconds WHERE date = NEW.date;
      END`,
    ]);
    await tx.commit();
  } catch (error) {
    await tx.rollback();
    throw error;
  } finally {
    tx.close();
  }
}

const ACTIVE_DAY_DATES = `SELECT ? AS date
  UNION SELECT date FROM timer_tasks WHERE started_at IS NOT NULL
  UNION SELECT date FROM timer_tasks WHERE completed_at IS NOT NULL AND notification_claimed_at IS NULL`;

export function timerSnapshotVersion(
  today: string,
  days: readonly Pick<TimerDay, "date" | "revision">[],
  preferenceRevision: number
) {
  const revisions = days
    .map((day) => [day.date, day.revision] as const)
    .toSorted(([left], [right]) => left.localeCompare(right));
  const hash = createHash("sha256")
    .update(JSON.stringify([today, preferenceRevision, revisions]))
    .digest("hex");
  return `W/"timer-${hash}"`;
}

export async function readTimerSnapshotVersion(tx: Transaction, today: string) {
  const [days, preferences, running] = await tx.batch([
    {
      sql: `SELECT date, revision FROM timer_days WHERE date IN (${ACTIVE_DAY_DATES}) ORDER BY date`,
      args: [today],
    },
    "SELECT revision FROM timer_preferences WHERE id = 1",
    "SELECT date, started_at, duration_seconds, spent_seconds, availability_window FROM timer_tasks WHERE started_at IS NOT NULL",
  ]);
  const [preference] = preferences.rows;
  if (preference === undefined) {
    throw new Error("Run bun run migrate:timer to initialize Turso.");
  }
  let nextTransitionAt = timerMidnight(today);
  for (const task of running.rows) {
    if (typeof task.started_at !== "string" || typeof task.date !== "string") {
      nextTransitionAt = 0;
      break;
    }
    const finish =
      Date.parse(task.started_at) +
      (Number(task.duration_seconds) - Number(task.spent_seconds)) * 1000;
    nextTransitionAt = Math.min(
      nextTransitionAt,
      taskWindowEnd(
        {
          availabilityWindow:
            typeof task.availability_window === "string"
              ? availabilityWindowSchema.parse(
                  JSON.parse(task.availability_window) as unknown
                )
              : null,
        },
        task.date
      ),
      Number.isFinite(finish) ? finish : 0
    );
  }
  return {
    hasToday: days.rows.some((day) => day.date === today),
    version: timerSnapshotVersion(
      today,
      days.rows.map((day) => {
        if (typeof day.date !== "string") {
          throw new TypeError("Timer contains an invalid date.");
        }
        return { date: day.date, revision: Number(day.revision) };
      }),
      Number(preference.revision)
    ),
    nextTransitionAt,
  };
}

async function dayQueries(
  tx: Transaction,
  date?: string
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
    sql: ACTIVE_DAY_DATES,
    args: [date],
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
        startedAt: task.started_at,
        ...(task.last_started_at === null
          ? {}
          : { lastStartedAt: task.last_started_at }),
        reachedAt: task.completed_at,
        notifiedAt: task.notification_claimed_at,
        availabilityWindow:
          typeof task.availability_window === "string"
            ? (JSON.parse(task.availability_window) as unknown)
            : null,
      })),
    })
  );
}

export async function readTimerDays(tx: Transaction, date?: string) {
  const [days, tasks] = await tx.batch(await dayQueries(tx, date));
  return decodeDays(days, tasks);
}

export async function readTimerState(tx: Transaction, date: string) {
  const [days, tasks, preferences] = await tx.batch([
    ...(await dayQueries(tx, date)),
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
      dailyTasks:
        typeof row.daily_tasks === "string"
          ? (JSON.parse(row.daily_tasks) as unknown)
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
      sql: "INSERT INTO timer_tasks(id, date, position, activity, description, duration_seconds, spent_seconds, started_at, last_started_at, completed_at, notification_claimed_at, availability_window) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      args: [
        task.id,
        day.date,
        position,
        task.activity,
        task.description,
        task.duration,
        task.spent,
        task.startedAt,
        task.lastStartedAt ?? null,
        task.reachedAt,
        task.notifiedAt,
        availabilityValue(task),
      ],
    })),
  ]);
  if (statements.length > 0) {
    await tx.batch(statements);
  }
}

function availabilityValue(task: TimerDay["tasks"][number]) {
  const window = task.availabilityWindow ?? null;
  return window === null ? null : JSON.stringify(window);
}

function taskValues(task: TimerDay["tasks"][number], position: number) {
  return [
    position,
    task.activity,
    task.description,
    task.duration,
    task.spent,
    task.startedAt,
    task.lastStartedAt ?? null,
    task.reachedAt,
    task.notifiedAt,
    availabilityValue(task),
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
        sql: `INSERT INTO timer_tasks(date, id, position, activity, description, duration_seconds, spent_seconds, started_at, last_started_at, completed_at, notification_claimed_at, availability_window)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(date, id) DO UPDATE SET position = excluded.position, activity = excluded.activity,
          description = excluded.description, duration_seconds = excluded.duration_seconds, spent_seconds = excluded.spent_seconds,
          started_at = excluded.started_at, last_started_at = excluded.last_started_at,
          completed_at = excluded.completed_at, notification_claimed_at = excluded.notification_claimed_at,
          availability_window = excluded.availability_window`,
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

export async function writeTimerPreferences(
  tx: Transaction,
  prefs: TimerPreferences
) {
  await tx.execute({
    sql: "UPDATE timer_preferences SET revision = ?, autoplay = ?, multitask = ?, notifications_enabled = ?, duration_presets = ?, task_presets = ?, daily_tasks = ? WHERE id = 1",
    args: [
      prefs.revision,
      Number(prefs.autoplay),
      Number(prefs.multitask),
      Number(prefs.notificationsEnabled),
      JSON.stringify(prefs.durationPresets),
      JSON.stringify(prefs.taskPresets),
      JSON.stringify(prefs.dailyTasks),
    ],
  });
}

export async function readTimerHistoryState(
  tx: Transaction,
  from: string,
  date: string
) {
  const [days, tasks, running] = await tx.batch([
    {
      sql: "SELECT date, revision, spent_seconds FROM timer_days WHERE date BETWEEN ? AND ? ORDER BY date",
      args: [from, date],
    },
    {
      sql: "SELECT * FROM timer_tasks WHERE date = ? ORDER BY position",
      args: [date],
    },
    {
      // Keep this branch on the running-only index instead of scanning every
      // task in the history window to satisfy the ordering.
      sql: "SELECT * FROM timer_tasks INDEXED BY timer_tasks_running WHERE started_at IS NOT NULL AND date BETWEEN ? AND ? ORDER BY date, position",
      args: [from, date],
    },
  ]);
  return {
    day:
      decodeDays(days, tasks).find((day) => day.date === date) ??
      createEmptyTimerDay(date),
    runningDays: decodeDays(days, running).filter(
      (day) => day.tasks.length > 0
    ),
    totals: new Map(
      days.rows.map((row) => [
        typeof row.date === "string" ? row.date : "",
        Number(row.spent_seconds),
      ])
    ),
  };
}
