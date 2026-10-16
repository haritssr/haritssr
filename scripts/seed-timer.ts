import { mkdir, open } from "node:fs/promises";
import path from "node:path";

import {
  createSampleTimerDay,
  shiftTimerDate,
  timerDate,
} from "../utils/timer";

const directory = path.join(process.cwd(), "data", "timer");
await mkdir(directory, { recursive: true });
const results = await Promise.all(
  Array.from({ length: 30 }, async (_, index) => {
    const offset = index - 30;
    const date = shiftTimerDate(timerDate(), offset);
    try {
      const file = await open(
        path.join(directory, `${date}.json`),
        "wx",
        0o600
      );
      try {
        await file.writeFile(
          `${JSON.stringify(createSampleTimerDay(date), null, 2)}\n`
        );
      } finally {
        await file.close();
      }
      return 1;
    } catch (error) {
      if (
        !(error instanceof Error && "code" in error && error.code === "EEXIST")
      ) {
        throw error;
      }
      return 0;
    }
  })
);
const created = results.reduce<number>((sum, result) => sum + result, 0);
console.info(`Created ${created} sample days. Existing files were preserved.`);
