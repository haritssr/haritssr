import Database from "bun:sqlite";
import { mkdirSync } from "node:fs";
import path from "node:path";

const databaseDirectory =
  process.env.TOOLS_DB_DIR ?? path.join(process.cwd(), ".data-haritssr");
mkdirSync(databaseDirectory, { recursive: true });
const db = new Database(path.join(databaseDirectory, "experiment.db"));

db.run(
  "CREATE TABLE IF NOT EXISTS tools (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, price NOT NULL, amount INTEGER NOT NULL)"
);

// const insert = db.prepare("INSERT INTO tools (name, price, amount) VALUES (?, ?, ?)");

// insert.run("Hammer", 15_000, 2);

//showing all table inside experiment.db
// const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' ").all();
// console.log(tables);

//delete duplicated hammer
// db.exec("DELETE FROM tools WHERE id NOT IN (SELECT MIN(id) FROM tools)");

const tools = db.prepare("SELECT * FROM tools").all();
console.log(tools);

db.close();
