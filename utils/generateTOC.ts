import fs from "node:fs";
import { Effect } from "effect";

const REGEX = /^(#+)\s+(.+)$/;

const readMdxFile = Effect.fn("readMdxFile")((mdxFilePath: string) =>
  Effect.try({
    try: () => fs.readFileSync(mdxFilePath, "utf-8"),
    catch: (cause) =>
      new Error(
        `Error reading MDX file: ${cause instanceof Error ? cause.message : String(cause)}`
      ),
  })
);

export default function generateTOC(mdxFilePath: string): string[] {
  return Effect.runSync(
    readMdxFile(mdxFilePath).pipe(
      Effect.map((mdxContent) => {
        const titles: string[] = [];

        for (const line of mdxContent.split("\n")) {
          const match = line.match(REGEX);
          if (!match) {
            continue;
          }

          const [, , title] = match;
          titles.push(title.trim().toLowerCase());
        }

        return titles;
      }),
      Effect.catch((error) =>
        Effect.sync(() => {
          console.error(error.message);
          return [];
        })
      )
    )
  );
}
