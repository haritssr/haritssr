import Database from "bun:sqlite";
import path from "node:path";

const DEFAULT_DATABASE_DIRECTORY = "/Users/haritssyah/developer/.data-haritssr";
const DATABASE_DIRECTORY =
  process.env.TASK_DB_DIR ?? DEFAULT_DATABASE_DIRECTORY;
const DATABASE_PATH = path.join(DATABASE_DIRECTORY, "task.db");

const db = new Database(DATABASE_PATH);

//showing all existed tables
const tables = db
  .prepare("SELECT name FROM sqlite_master WHERE type='table';")
  .all();
// .map((t) => t.name);
console.log(tables);

//showing all records inside of 'daily_tasks' table
const daily_tasks = db.prepare("SELECT * FROM daily_tasks").all();
console.log(daily_tasks);

//showing one record in 'daily_tasks' table where id > 5000
const idBiggerThan5000 = db
  .prepare("SELECT * FROM daily_tasks WHERE id > 5000")
  .all();
console.log(idBiggerThan5000);
