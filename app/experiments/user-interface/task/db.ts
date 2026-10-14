import { mkdirSync } from "node:fs";
import path from "node:path";

import Database from "better-sqlite3";
import "server-only";

import { createDailyTaskTemplate, sanitizeTasks } from "./data";
import type { Task, TaskSaveVersion } from "./type";

const DEFAULT_DATABASE_DIRECTORY = path.join(process.cwd(), ".data-haritssr");
// Local folder path for task SQLite storage (override via TASK_DB_DIR).
const DATABASE_DIRECTORY =
  process.env.TASK_DB_DIR ?? DEFAULT_DATABASE_DIRECTORY;
// Absolute SQLite file path used by better-sqlite3.
const DATABASE_PATH = path.join(DATABASE_DIRECTORY, "task.db");

let database: Database.Database | undefined;

function getDatabase() {
  if (database) {
    return database;
  }

  mkdirSync(DATABASE_DIRECTORY, { recursive: true });
  const nextDatabase = new Database(DATABASE_PATH);
  nextDatabase.pragma("journal_mode = WAL");
  nextDatabase.exec(`
    CREATE TABLE IF NOT EXISTS daily_tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task_date TEXT NOT NULL,
      title TEXT NOT NULL,
      duration INTEGER NOT NULL,
      progress REAL NOT NULL,
      type TEXT NOT NULL,
      position INTEGER NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(task_date, title)
    );
    CREATE TABLE IF NOT EXISTS task_day_versions (
      task_date TEXT PRIMARY KEY,
      revision INTEGER NOT NULL,
      writer_id TEXT,
      sequence INTEGER NOT NULL
    );
  `);
  migrateStatusColumn(nextDatabase);
  database = nextDatabase;
  return nextDatabase;
}

// Inspect the current table schema to see whether legacy `status` still exists.
function hasStatusColumn(db: Database.Database) {
  const columns = db
    .prepare<[], { name: string }>("PRAGMA table_info(daily_tasks)")
    .all();
  return columns.some((column) => column.name === "status");
}

// Migrate old schemas that still have `status` into the current `type`-only schema.
function migrateStatusColumn(db: Database.Database) {
  // Skip migration when the database already uses the current schema.
  if (!hasStatusColumn(db)) {
    return;
  }

  // Prepare a temporary destination table with the latest schema.
  db.exec(`
    DROP TABLE IF EXISTS daily_tasks_v2;
    CREATE TABLE IF NOT EXISTS daily_tasks_v2 (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task_date TEXT NOT NULL,
      title TEXT NOT NULL,
      duration INTEGER NOT NULL,
      progress REAL NOT NULL,
      type TEXT NOT NULL,
      position INTEGER NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(task_date, title)
    );
  `);

  // Run copy + table swap atomically to avoid partial migrations.
  const migrate = db.transaction(() => {
    // Copy data while converting legacy status/progress values to the new type format.
    db.exec(`
      INSERT INTO daily_tasks_v2
        (id, task_date, title, duration, progress, type, position, created_at, updated_at)
      SELECT
        id,
        task_date,
        title,
        duration,
        progress,
        CASE
          WHEN status = 'Done' OR progress >= 100 THEN 'Done'
          ELSE type
        END AS type,
        position,
        created_at,
        updated_at
      FROM daily_tasks;
    `);

    // Replace old table with migrated table once data copy succeeds.
    db.exec("DROP TABLE daily_tasks;");
    db.exec("ALTER TABLE daily_tasks_v2 RENAME TO daily_tasks;");
  });

  // Execute the migration transaction.
  migrate();
}

interface TaskHistoryDay {
  date: string;
  doneCount: number;
  totalCount: number;
}

export interface TaskHistoryEntry extends TaskHistoryDay {
  tasks: Task[];
}

interface TaskRow {
  duration: number;
  progress: number;
  title: string;
  type: Task["type"];
}

interface TaskDayVersion {
  revision: number;
  writerId: string | null;
  sequence: number;
}

interface SavedTasks {
  droppedNowCount: number;
  revision: number;
  tasks: Task[];
}

function readTaskDayVersion(
  db: Database.Database,
  taskDate: string
): TaskDayVersion {
  return (
    db
      .prepare<[string], TaskDayVersion>(
        "SELECT revision, writer_id AS writerId, sequence FROM task_day_versions WHERE task_date = ?"
      )
      .get(taskDate) ?? { revision: 0, writerId: null, sequence: 0 }
  );
}

function canSaveVersion(
  current: TaskDayVersion,
  requested: TaskSaveVersion
): boolean {
  if (requested.writerId === current.writerId) {
    // Later snapshots from this page may arrive before earlier beacon/PUT saves.
    return (
      requested.sequence > current.sequence &&
      requested.revision <= current.revision
    );
  }

  // A different page must have loaded the current revision before taking over.
  return requested.revision === current.revision;
}

// Clamp and normalize a task so persisted and returned values stay consistent.
function normalizeTask(task: Task): Task {
  // Keep progress in the supported 0..100 range.
  const normalizedProgress = Math.max(0, Math.min(100, task.progress));
  // Enforce "Done" when progress reaches completion.
  const normalizedType: Task["type"] =
    normalizedProgress >= 100 ? "Done" : task.type;

  // Normalize duration and return a cleaned task object.
  return {
    ...task,
    duration: Math.max(1, Math.round(task.duration)),
    progress: normalizedProgress,
    type: normalizedType,
  };
}

// Normalize all tasks first, then enforce business sanitization rules.
function normalizeAndSanitizeTasks(tasks: readonly Task[]) {
  const normalizedTasks = tasks.map(normalizeTask);
  const { demotedNowCount, sanitizedTasks } = sanitizeTasks(normalizedTasks);
  return { droppedNowCount: demotedNowCount, sanitizedTasks };
}

// Seed a date with template tasks if that date currently has no tasks.
function seedTasksForDate(taskDate: string) {
  const db = getDatabase();
  const seedTasks = createDailyTaskTemplate();
  // Do nothing when there is no template to insert.
  if (seedTasks.length === 0) {
    return;
  }

  // Check whether this date is already initialized.
  const countRow = db
    .prepare<[string], { count: number }>(
      "SELECT COUNT(1) AS count FROM daily_tasks WHERE task_date = ?"
    )
    .get(taskDate);

  // Avoid duplicating rows when tasks already exist for this date.
  if (!countRow || countRow.count > 0) {
    return;
  }
  // Prepare insert once and reuse for each seeded task.
  const insertTaskStatement = db.prepare(
    `
      INSERT INTO daily_tasks
      (task_date, title, duration, progress, type, position)
      VALUES (?, ?, ?, ?, ?, ?)
    `
  );

  // Insert all template tasks in one transaction and keep stable ordering by index.
  const insertSeedTasks = db.transaction((tasks: Task[]) => {
    for (const [index, task] of tasks.entries()) {
      insertTaskStatement.run(
        taskDate,
        task.title,
        task.duration,
        task.progress,
        task.type,
        index
      );
    }
  });

  // Execute seeding.
  insertSeedTasks(seedTasks);
}

// Read tasks for a date in persisted order, then normalize each row for consumers.
function readTasksForDate(taskDate: string): Task[] {
  const rows = getDatabase()
    .prepare<[string], TaskRow>(
      `
        SELECT title, duration, progress, type
        FROM daily_tasks
        WHERE task_date = ?
        ORDER BY position ASC, id ASC
      `
    )
    .all(taskDate);

  return rows.map((row) => normalizeTask(row));
}

// Format a Date object as YYYY-MM-DD for task partition keys.
export function getTodayTaskDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Load tasks for a date, auto-seed when empty, and persist sanitization corrections.
export function getTasksForDate(taskDate = getTodayTaskDate()) {
  const db = getDatabase();
  return db
    .transaction(() => {
      seedTasksForDate(taskDate);
      const { droppedNowCount, sanitizedTasks } = normalizeAndSanitizeTasks(
        readTasksForDate(taskDate)
      );

      if (droppedNowCount > 0) {
        return replaceTasksForDate(taskDate, sanitizedTasks);
      }

      const { revision } = readTaskDayVersion(db, taskDate);
      return { droppedNowCount, revision, tasks: sanitizedTasks };
    })
    .immediate();
}

// Replace all tasks for a date atomically after normalization/sanitization.
export function replaceTasksForDate(
  taskDate: string,
  tasks: readonly Task[]
): SavedTasks;
export function replaceTasksForDate(
  taskDate: string,
  tasks: readonly Task[],
  version: TaskSaveVersion
): SavedTasks | null;
export function replaceTasksForDate(
  taskDate: string,
  tasks: readonly Task[],
  version?: TaskSaveVersion
): SavedTasks | null {
  const db = getDatabase();
  const { droppedNowCount, sanitizedTasks } = normalizeAndSanitizeTasks(tasks);

  // Precompile statements used by the replace transaction.
  const deleteTasksStatement = db.prepare(
    "DELETE FROM daily_tasks WHERE task_date = ?"
  );
  const insertTaskStatement = db.prepare(
    `
      INSERT INTO daily_tasks
      (task_date, title, duration, progress, type, position, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `
  );

  // Delete existing rows and reinsert next rows in a single atomic operation.
  const replaceTasks = db.transaction((nextTasks: readonly Task[]) => {
    const currentVersion = readTaskDayVersion(db, taskDate);
    if (version && !canSaveVersion(currentVersion, version)) {
      return null;
    }

    deleteTasksStatement.run(taskDate);

    for (const [index, task] of nextTasks.entries()) {
      insertTaskStatement.run(
        taskDate,
        task.title,
        task.duration,
        task.progress,
        task.type,
        index
      );
    }

    const revision = currentVersion.revision + 1;
    db.prepare(`
      INSERT INTO task_day_versions (task_date, revision, writer_id, sequence)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(task_date) DO UPDATE SET
        revision = excluded.revision,
        writer_id = excluded.writer_id,
        sequence = excluded.sequence
    `).run(
      taskDate,
      revision,
      version?.writerId ?? null,
      version?.sequence ?? 0
    );

    return { droppedNowCount, revision, tasks: sanitizedTasks };
  });

  // Reserve the write lock before checking the revision, including across processes.
  return replaceTasks.immediate(sanitizedTasks);
}

// Return per-day completion stats for the most recent N days with any tasks.
function getTaskHistoryDays(limit = 30): TaskHistoryDay[] {
  const rows = getDatabase()
    .prepare<[number], TaskHistoryDay>(
      `
        SELECT
          task_date AS date,
          SUM(CASE WHEN type = 'Done' THEN 1 ELSE 0 END) AS doneCount,
          COUNT(1) AS totalCount
        FROM daily_tasks
        GROUP BY task_date
        ORDER BY task_date DESC
        LIMIT ?
      `
    )
    .all(limit);

  return rows;
}
/*
JSON output example (one record):
[
  {
    "date": "2026-02-24",
    "doneCount": 3,
    "totalCount": 5
  }
]
*/

// Return history days enriched with the full task list for each day.
export function getTaskHistory(limit = 30): TaskHistoryEntry[] {
  const days = getTaskHistoryDays(limit);
  return days.map((day) => ({
    ...day,
    tasks: readTasksForDate(day.date),
  }));
}
/*
JSON output example (one record):
[
  {
    "date": "2026-02-24",
    "doneCount": 3,
    "totalCount": 5,
    "tasks": [
      {
        "title": "Deep work block",
        "duration": 60,
        "progress": 100,
        "type": "Done"
      }
    ]
  }
]
*/
