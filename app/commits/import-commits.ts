import { readFile } from "node:fs/promises";

import { createClient } from "@libsql/client";
import { z } from "zod";

const snapshotSchema = z.object({
  commits: z
    .array(
      z.object({
        hash: z.string().regex(/^[a-f0-9]{40}$/u),
        date: z.iso.datetime({ offset: true }),
        subject: z.string().min(1),
      })
    )
    .min(1)
    .refine(
      (commits) =>
        new Set(commits.map((commit) => commit.hash)).size === commits.length,
      "Commit hashes must be unique."
    ),
});

const source = process.argv.at(2) ?? new URL("changelog.json", import.meta.url);
const { commits } = snapshotSchema.parse(
  JSON.parse(await readFile(source, "utf-8"))
);
const url = process.env.TURSO_COMMITS_DATABASE_URL;
const authToken = process.env.TURSO_COMMITS_AUTH_TOKEN;
if (
  url === undefined ||
  url.length === 0 ||
  authToken === undefined ||
  authToken.length === 0
) {
  throw new Error(
    "Add TURSO_COMMITS_DATABASE_URL and TURSO_COMMITS_AUTH_TOKEN to .env.local before importing."
  );
}

const client = createClient({ url, authToken });
try {
  const tx = await client.transaction("write");
  try {
    await tx.execute(`CREATE TABLE IF NOT EXISTS commits (
      hash TEXT PRIMARY KEY,
      date TEXT NOT NULL,
      subject TEXT NOT NULL
    )`);
    let changed = 0;
    for (let offset = 0; offset < commits.length; offset += 100) {
      // oxlint-disable-next-line no-await-in-loop -- Keep bounded batches in one atomic import transaction.
      const results = await tx.batch(
        commits.slice(offset, offset + 100).map((commit) => ({
          sql: `INSERT INTO commits (hash, date, subject) VALUES (?, ?, ?)
            ON CONFLICT(hash) DO UPDATE SET date = excluded.date, subject = excluded.subject
            WHERE commits.date != excluded.date OR commits.subject != excluded.subject`,
          args: [commit.hash, commit.date, commit.subject],
        }))
      );
      changed += results.reduce(
        (total, result) => total + result.rowsAffected,
        0
      );
    }
    const result = await tx.execute("SELECT hash, date, subject FROM commits");
    const stored = new Map(result.rows.map((row) => [row.hash, row]));
    for (const commit of commits) {
      const row = stored.get(commit.hash);
      if (row?.date !== commit.date || row.subject !== commit.subject) {
        throw new Error("Import verification failed; rolling back.");
      }
    }
    await tx.commit();
    console.info(
      `Verified ${commits.length} source commits; inserted or updated ${changed}. Database contains ${result.rows.length} commits. Source JSON was preserved.`
    );
  } catch (error) {
    await tx.rollback();
    throw error;
  } finally {
    tx.close();
  }
} finally {
  client.close();
}
