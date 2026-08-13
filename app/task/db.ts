import { mkdirSync } from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import "server-only";
import { createDailyTaskTemplate, sanitizeTasks } from "./data";
import type { Task } from "./type";

const DEFAULT_DATABASE_DIRECTORY = "/Users/haritssyah/developer/.data-haritssr";
// Absolute folder path for task SQLite storage (override via TASK_DB_DIR).
const DATABASE_DIRECTORY =
  process.env.TASK_DB_DIR ?? DEFAULT_DATABASE_DIRECTORY;
// Absolute SQLite file path used by better-sqlite3.
const DATABASE_PATH = path.join(DATABASE_DIRECTORY, "task.db");

// Ensure the database directory exists before creating/opening the file.
mkdirSync(DATABASE_DIRECTORY, { recursive: true });

// Open a synchronous SQLite connection used by all task operations in this module.
const db = new Database(DATABASE_PATH);

// Enable WAL mode for safer concurrent reads/writes and better durability.
db.pragma("journal_mode = WAL");

// Create the canonical daily_tasks table if this is the first run.
db.exec(`
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
`);

// Inspect the current table schema to see whether legacy `status` still exists.
function hasStatusColumn() {
  const columns = db.prepare("PRAGMA table_info(daily_tasks)").all() as {
    name: string;
  }[];
  return columns.some((column) => column.name === "status");
}

// Migrate old schemas that still have `status` into the current `type`-only schema.
function migrateStatusColumn() {
  // Skip migration when the database already uses the current schema.
  if (!hasStatusColumn()) {
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

// Run migration on module load so all exported APIs work on a stable schema.
migrateStatusColumn();

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
  const seedTasks = createDailyTaskTemplate();
  // Do nothing when there is no template to insert.
  if (seedTasks.length === 0) {
    return;
  }

  // Check whether this date is already initialized.
  const countRow = db
    .prepare("SELECT COUNT(1) AS count FROM daily_tasks WHERE task_date = ?")
    .get(taskDate) as {
    count: number;
  };

  // Avoid duplicating rows when tasks already exist for this date.
  if (countRow.count > 0) {
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
    tasks.forEach((task, index) => {
      insertTaskStatement.run(
        taskDate,
        task.title,
        task.duration,
        task.progress,
        task.type,
        index
      );
    });
  });

  // Execute seeding.
  insertSeedTasks(seedTasks);
}

// Read tasks for a date in persisted order, then normalize each row for consumers.
function readTasksForDate(taskDate: string): Task[] {
  const rows = db
    .prepare(
      `
        SELECT title, duration, progress, type
        FROM daily_tasks
        WHERE task_date = ?
        ORDER BY position ASC, id ASC
      `
    )
    .all(taskDate) as TaskRow[];

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
  seedTasksForDate(taskDate);
  const { droppedNowCount, sanitizedTasks } = normalizeAndSanitizeTasks(
    readTasksForDate(taskDate)
  );

  // Rewrite rows only when sanitization changed task types/order constraints.
  if (droppedNowCount > 0) {
    return replaceTasksForDate(taskDate, sanitizedTasks);
  }

  return { droppedNowCount, tasks: sanitizedTasks };
}

// Replace all tasks for a date atomically after normalization/sanitization.
export function replaceTasksForDate(taskDate: string, tasks: readonly Task[]) {
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
    deleteTasksStatement.run(taskDate);

    nextTasks.forEach((task, index) => {
      insertTaskStatement.run(
        taskDate,
        task.title,
        task.duration,
        task.progress,
        task.type,
        index
      );
    });
  });

  // Execute replacement and return the normalized payload.
  replaceTasks(sanitizedTasks);
  return { droppedNowCount, tasks: sanitizedTasks };
}

// Return per-day completion stats for the most recent N days with any tasks.
function getTaskHistoryDays(limit = 30): TaskHistoryDay[] {
  const rows = db
    .prepare(
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
    .all(limit) as TaskHistoryDay[];

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
