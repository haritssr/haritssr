import Database from "bun:sqlite";
import path from "node:path";

const databaseDirectory =
  process.env.TOOLS_DB_DIR ?? path.join(process.cwd(), ".data-haritssr");
const db = new Database(path.join(databaseDirectory, "experiment.db"), {
  readonly: true,
});

try {
  console.log(db.prepare("SELECT * FROM tools ORDER BY id ASC").all());
} finally {
  db.close();
}
