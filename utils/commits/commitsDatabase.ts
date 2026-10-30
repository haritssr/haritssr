import "server-only";
import { createClient } from "@libsql/client";
import type { Client } from "@libsql/client";
import { z } from "zod";

const commitsSchema = z
  .array(
    z.object({
      hash: z.string().regex(/^[a-f0-9]{40}$/u),
      date: z.iso.datetime({ offset: true }),
      subject: z.string().min(1),
    })
  )
  .min(1);
let client: Client | undefined;

function commitsDatabase(): Client {
  if (client === undefined) {
    const url = process.env.TURSO_COMMITS_DATABASE_URL;
    const authToken = process.env.TURSO_COMMITS_AUTH_TOKEN;
    if (
      url === undefined ||
      url.length === 0 ||
      authToken === undefined ||
      authToken.length === 0
    ) {
      throw new Error("Configure the Turso commits database on the server.");
    }
    client = createClient({ url, authToken });
  }
  return client;
}

export async function readCommitHistory() {
  const result = await commitsDatabase().execute(
    "SELECT hash, date, subject FROM commits"
  );
  return commitsSchema
    .parse(result.rows)
    .toSorted(
      (left, right) =>
        Date.parse(right.date) - Date.parse(left.date) ||
        left.hash.localeCompare(right.hash)
    );
}
