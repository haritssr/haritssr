import fs from "node:fs";

const REGEX = /^(#+)\s+(.+)$/;

export default function generateTOC(mdxFilePath) {
  try {
    const mdxContent = fs.readFileSync(mdxFilePath, "utf-8");
    const titles = [];

    for (const line of mdxContent.split("\n")) {
      const match = line.match(REGEX);
      if (!match) {
        continue;
      }

      const [, , title] = match;
      titles.push(title.trim().toLowerCase());
    }

    return titles;
  } catch (error) {
    console.error(`Error reading MDX file: ${error.message}`);
    return [];
  }
}
