import { mkdirSync } from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import "server-only";
import { createDailyTaskTemplate, sanitizeTasks } from "./data";
import type { Task } from "./type";

const DATABASE_DIRECTORY = path.join(process.cwd(), ".data");
const DATABASE_PATH = path.join(DATABASE_DIRECTORY, "task.db");

mkdirSync(DATABASE_DIRECTORY, { recursive: true });

const db = new Database(DATABASE_PATH);

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS daily_tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_date TEXT NOT NULL,
    title TEXT NOT NULL,
    duration INTEGER NOT NULL,
    progress REAL NOT NULL,
    status TEXT NOT NULL,
    type TEXT NOT NULL,
    position INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(task_date, title)
  );
`);

export interface TaskHistoryDay {
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
  status: Task["status"];
  title: string;
  type: Task["type"];
}

function normalizeTask(task: Task): Task {
  const normalizedProgress = Math.max(0, Math.min(100, task.progress));
  const normalizedStatus: Task["status"] =
    task.status === "Done" || normalizedProgress >= 100 ? "Done" : "Todo";

  return {
    ...task,
    duration: Math.max(1, Math.round(task.duration)),
    progress: normalizedProgress,
    status: normalizedStatus,
  };
}

function normalizeAndSanitizeTasks(tasks: readonly Task[]) {
  const normalizedTasks = tasks.map(normalizeTask);
  const { demotedNowCount, sanitizedTasks } = sanitizeTasks(normalizedTasks);
  return { droppedNowCount: demotedNowCount, sanitizedTasks };
}

function seedTasksForDate(taskDate: string) {
  const seedTasks = createDailyTaskTemplate();
  if (seedTasks.length === 0) {
    return;
  }

  const countRow = db
    .prepare("SELECT COUNT(1) AS count FROM daily_tasks WHERE task_date = ?")
    .get(taskDate) as { count: number };

  if (countRow.count > 0) {
    return;
  }
  const insertTaskStatement = db.prepare(
    `
      INSERT INTO daily_tasks
      (task_date, title, duration, progress, status, type, position)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `
  );

  const insertSeedTasks = db.transaction((tasks: Task[]) => {
    tasks.forEach((task, index) => {
      insertTaskStatement.run(
        taskDate,
        task.title,
        task.duration,
        task.progress,
        task.status,
        task.type,
        index
      );
    });
  });

  insertSeedTasks(seedTasks);
}

function readTasksForDate(taskDate: string): Task[] {
  const rows = db
    .prepare(
      `
        SELECT title, duration, progress, status, type
        FROM daily_tasks
        WHERE task_date = ?
        ORDER BY position ASC, id ASC
      `
    )
    .all(taskDate) as TaskRow[];

  return rows.map((row) => normalizeTask(row));
}

export function getTodayTaskDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getTasksForDate(taskDate = getTodayTaskDate()) {
  seedTasksForDate(taskDate);
  const { droppedNowCount, sanitizedTasks } = normalizeAndSanitizeTasks(
    readTasksForDate(taskDate)
  );

  if (droppedNowCount > 0) {
    return replaceTasksForDate(taskDate, sanitizedTasks);
  }

  return { droppedNowCount, tasks: sanitizedTasks };
}

export function replaceTasksForDate(taskDate: string, tasks: readonly Task[]) {
  const { droppedNowCount, sanitizedTasks } = normalizeAndSanitizeTasks(tasks);

  const deleteTasksStatement = db.prepare(
    "DELETE FROM daily_tasks WHERE task_date = ?"
  );
  const insertTaskStatement = db.prepare(
    `
      INSERT INTO daily_tasks
      (task_date, title, duration, progress, status, type, position, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `
  );

  const replaceTasks = db.transaction((nextTasks: readonly Task[]) => {
    deleteTasksStatement.run(taskDate);

    nextTasks.forEach((task, index) => {
      insertTaskStatement.run(
        taskDate,
        task.title,
        task.duration,
        task.progress,
        task.status,
        task.type,
        index
      );
    });
  });

  replaceTasks(sanitizedTasks);
  return { droppedNowCount, tasks: sanitizedTasks };
}

export function getTaskHistoryDays(limit = 30): TaskHistoryDay[] {
  const rows = db
    .prepare(
      `
        SELECT
          task_date AS date,
          SUM(CASE WHEN status = 'Done' THEN 1 ELSE 0 END) AS doneCount,
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
        "status": "Done",
        "type": "Now"
      }
    ]
  }
]
*/
