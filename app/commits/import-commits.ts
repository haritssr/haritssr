import { spawnSync } from "node:child_process";

import { createClient } from "@libsql/client";
import { z } from "zod";

const commitsSchema = z
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
  );

const cliArgs = process.argv.slice(2);
if (
  cliArgs.length > 1 ||
  (cliArgs.length === 1 && cliArgs[0] !== "--dry-run")
) {
  throw new Error("Usage: bun run import:commits [--dry-run]");
}

function git(args: string[]): string {
  const result = spawnSync("git", args, {
    cwd: new URL("../../", import.meta.url),
    encoding: "utf-8",
    maxBuffer: 16 * 1024 * 1024,
  });
  if (result.error || result.status !== 0) {
    throw new Error("Cannot read Git history. Run from a full Git checkout.", {
      cause: result.error ?? result.stderr.trim(),
    });
  }
  return result.stdout.trim();
}

if (git(["rev-parse", "--is-shallow-repository"]) !== "false") {
  throw new Error("A full Git checkout is required to import commit history.");
}
const authors = new Set(["Harits Syah", "haritssr"]);
const records = git(["log", "HEAD", "--format=%H%x00%aI%x00%an%x00%s"]);
const commits = commitsSchema.parse(
  records.split("\n").flatMap((line) => {
    const [hash, date, author, subject] = line.split("\0");
    return author !== undefined && authors.has(author)
      ? [{ hash, date, subject }]
      : [];
  })
);
if (cliArgs[0] === "--dry-run") {
  console.info(
    `Validated ${commits.length} Git commits. No database changes made.`
  );
  process.exit(0);
}
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
      `Verified ${commits.length} Git commits; inserted or updated ${changed}. Database contains ${result.rows.length} commits.`
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
