import Database from "bun:sqlite";
import { mkdirSync } from "node:fs";
import path from "node:path";

const DEFAULT_DATABASE_DIRECTORY = path.join(process.cwd(), ".data-haritssr");
const DATABASE_DIRECTORY =
  process.env.TOOLS_DB_DIR ?? DEFAULT_DATABASE_DIRECTORY;
const DATABASE_PATH = path.join(DATABASE_DIRECTORY, "experiment.db");

mkdirSync(DATABASE_DIRECTORY, { recursive: true });

const db = new Database(DATABASE_PATH);

db.run(`
  CREATE TABLE IF NOT EXISTS tools (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    price INTEGER NOT NULL CHECK (price >= 0),
    amount INTEGER NOT NULL CHECK (amount >= 0)
  );
`);

export interface ToolRow {
  id: number;
  name: string;
  price: number;
  amount: number;
}

export function listTools(): ToolRow[] {
  return db
    .query<ToolRow, []>(
      "SELECT id, name, price, amount FROM tools ORDER BY id ASC"
    )
    .all();
}

export function createTool(input: Omit<ToolRow, "id">) {
  return db
    .prepare("INSERT INTO tools (name, price, amount) VALUES (?, ?, ?)")
    .run(input.name, input.price, input.amount);
}

export function updateTool(id: number, input: Omit<ToolRow, "id">) {
  return db
    .prepare("UPDATE tools SET name = ?, price = ?, amount = ? WHERE id = ?")
    .run(input.name, input.price, input.amount, id);
}

export function deleteTool(id: number) {
  return db.prepare("DELETE FROM tools WHERE id = ?").run(id);
}
