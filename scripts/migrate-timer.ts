import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

import {
  createTimerBackup,
  mergeTimerBackup,
  parseTimerBackup,
} from "../utils/timerBackup";
import {
  readTimerDays,
  closeTimerDatabase,
  initializeTimerDatabase,
  timerDatabase,
  timerDatabaseTransaction,
  writeTimerDays,
} from "../utils/timerDatabase";
import { daySchema } from "../utils/timerValidation";

try {
  const client = timerDatabase();
  try {
    await initializeTimerDatabase(client);
  } finally {
    client.close();
  }
  console.info("Timer schema initialized. Existing records were preserved.");
  const source = process.argv.at(2);
  if (source !== undefined) {
    let text: string;
    if (source === "--local-json") {
      const directory = path.join(process.cwd(), "data", "timer");
      const entries = await readdir(directory);
      const names = entries.filter((name) =>
        /^\d{4}-\d{2}-\d{2}\.json$/u.test(name)
      );
      const days = await Promise.all(
        names.map(async (name) => {
          const day = daySchema.parse(
            JSON.parse(await readFile(path.join(directory, name), "utf-8"))
          );
          if (`${day.date}.json` !== name) {
            throw new Error(`Date mismatch: ${name}`);
          }
          return day;
        })
      );
      text = JSON.stringify(createTimerBackup(days, Date.now()));
    } else {
      text = await readFile(source, "utf-8");
    }
    if (Buffer.byteLength(text) > 10 * 1024 * 1024) {
      throw new Error("Backup exceeds 10 MB.");
    }
    const incoming = parseTimerBackup(text);
    const result = await timerDatabaseTransaction(async (tx) => {
      const { additions, skipped } = mergeTimerBackup(
        await readTimerDays(tx),
        incoming
      );
      await writeTimerDays(tx, additions);
      return { imported: additions.length, skipped };
    });
    console.info(
      `Imported ${result.imported} days; skipped ${result.skipped}. Imported timers are paused. Source files were kept.`
    );
  }
} finally {
  closeTimerDatabase();
}
