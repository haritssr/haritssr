import fs from "node:fs";

export default function generateTOC(mdxFilePath) {
  try {
    const mdxContent = fs.readFileSync(mdxFilePath, "utf-8");
    const headings = [];

    mdxContent.split("\n").forEach((line) => {
      const match = line.match(/^(#+)\s+(.+)$/);
      if (!match) {
        return;
      }

      const [, hashes, title] = match;
      const level = hashes.length;
      headings.push({ level, title: title.trim() });
    });

    return headings.map(({ title }) => title.toLowerCase());
  } catch (error) {
    console.error(`Error reading MDX file: ${error.message}`);
    return [];
  }
}
