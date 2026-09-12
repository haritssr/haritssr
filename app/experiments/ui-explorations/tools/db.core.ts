import { mkdirSync } from "node:fs";
import path from "node:path";

import Database from "better-sqlite3";
import "server-only";

const DEFAULT_DATABASE_DIRECTORY = path.join(process.cwd(), ".data-haritssr");
const DATABASE_DIRECTORY =
  process.env.TOOLS_DB_DIR ?? DEFAULT_DATABASE_DIRECTORY;
const DATABASE_PATH = path.join(DATABASE_DIRECTORY, "experiment.db");

let database: Database.Database | undefined;

function getDatabase() {
  if (database) {
    return database;
  }

  mkdirSync(DATABASE_DIRECTORY, { recursive: true });
  const nextDatabase = new Database(DATABASE_PATH);
  nextDatabase.exec(`
    CREATE TABLE IF NOT EXISTS tools (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      price INTEGER NOT NULL CHECK (price >= 0),
      amount INTEGER NOT NULL CHECK (amount >= 0)
    );
  `);
  database = nextDatabase;
  return nextDatabase;
}

export interface ToolRow {
  id: number;
  name: string;
  price: number;
  amount: number;
}

export function listTools(): ToolRow[] {
  return getDatabase()
    .prepare<[], ToolRow>(
      "SELECT id, name, price, amount FROM tools ORDER BY id ASC"
    )
    .all();
}

export function createTool(input: Omit<ToolRow, "id">) {
  return getDatabase()
    .prepare("INSERT INTO tools (name, price, amount) VALUES (?, ?, ?)")
    .run(input.name, input.price, input.amount);
}

export function updateTool(id: number, input: Omit<ToolRow, "id">) {
  return getDatabase()
    .prepare("UPDATE tools SET name = ?, price = ?, amount = ? WHERE id = ?")
    .run(input.name, input.price, input.amount, id);
}

export function deleteTool(id: number) {
  return getDatabase().prepare("DELETE FROM tools WHERE id = ?").run(id);
}
