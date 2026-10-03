import Database from "bun:sqlite";
import path from "node:path";

const DEFAULT_DATABASE_DIRECTORY = path.join(process.cwd(), ".data-haritssr");
const DATABASE_DIRECTORY =
  process.env.TASK_DB_DIR ?? DEFAULT_DATABASE_DIRECTORY;
const DATABASE_PATH = path.join(DATABASE_DIRECTORY, "task.db");

const db = new Database(DATABASE_PATH, { readonly: true });

try {
  console.log(
    db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all()
  );
  console.log(db.prepare("SELECT * FROM daily_tasks ORDER BY id ASC").all());
  console.log(
    db
      .prepare("SELECT * FROM daily_tasks WHERE id > 5000 ORDER BY id ASC")
      .all()
  );
} finally {
  db.close();
}
