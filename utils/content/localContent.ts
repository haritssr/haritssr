import "server-only";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

export function readLocalContent<T>(
  directory: string,
  extension: string,
  parse: (fileName: string, source: string) => T
): T[] {
  return readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(extension))
    .map((entry) =>
      parse(entry.name, readFileSync(path.join(directory, entry.name), "utf-8"))
    );
}
