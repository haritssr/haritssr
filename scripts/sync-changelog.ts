import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

import { z } from "zod";

import type { ChangelogCommit } from "../utils/commits/changelog";

const root = new URL("../", import.meta.url);
const snapshotPath = new URL("../app/commits/changelog.json", import.meta.url);
const authors = new Set(["Harits Syah", "haritssr"]);
const snapshotSchema = z.object({
  commits: z.array(
    z.object({
      hash: z.string().regex(/^[a-f0-9]{40}$/u),
      date: z.iso.datetime({ offset: true }),
      subject: z.string(),
    })
  ),
});

function git(args: string[]) {
  return spawnSync("git", args, {
    cwd: root,
    encoding: "utf-8",
    maxBuffer: 16 * 1024 * 1024,
  });
}

const log = git(["log", "HEAD", "--format=%H%x00%aI%x00%an%x00%s"]);
if (log.status === 0) {
  const commits: ChangelogCommit[] = [];
  for (const line of log.stdout.trim().split("\n")) {
    const [hash, date, author, subject] = line.split("\0");
    if (
      !hash ||
      !date ||
      !author ||
      !subject ||
      !/^[a-f0-9]{40}$/u.test(hash) ||
      !Number.isFinite(Date.parse(date))
    ) {
      throw new Error("Invalid commit record in Git history.");
    }
    if (authors.has(author)) {
      commits.push({ hash, date, subject });
    }
  }
  // Deployment checkouts can be shallow. Retain the saved older history and
  // add the available commits instead of replacing it with a partial log.
  const shallow =
    git(["rev-parse", "--is-shallow-repository"]).stdout.trim() === "true";
  if (shallow && existsSync(snapshotPath)) {
    const previous = snapshotSchema.parse(
      JSON.parse(readFileSync(snapshotPath, "utf-8"))
    );
    commits.push(...previous.commits);
  } else if (shallow) {
    throw new Error(
      "A full Git checkout is required to create the first changelog snapshot."
    );
  }
  const unique = [
    ...new Map(commits.map((commit) => [commit.hash, commit])).values(),
  ].toSorted(
    (a, b) =>
      Date.parse(b.date) - Date.parse(a.date) || a.hash.localeCompare(b.hash)
  );
  // Match the formatter so repeated syncs do not create formatting-only diffs.
  const snapshot = `${JSON.stringify({ commits: unique }, null, 2)}\n`;
  if (
    !existsSync(snapshotPath) ||
    readFileSync(snapshotPath, "utf-8") !== snapshot
  ) {
    writeFileSync(snapshotPath, snapshot);
  }
  console.log(`Changelog includes ${unique.length} commits.`);
} else {
  if (!existsSync(snapshotPath)) {
    throw new Error(
      "Changelog history is missing. Run bun run sync:changelog in a Git checkout."
    );
  }
  console.log("Git history unavailable; keeping the saved changelog.");
}
