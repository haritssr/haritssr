import { SOURCE_CODE_URL } from "@/utils/site";

export interface SourceCodeCommand {
  kind: "source-code";
  title: string;
  url: string;
}

const command: SourceCodeCommand = {
  kind: "source-code",
  title: "GitHub: Source code",
  url: SOURCE_CODE_URL,
};
const keywords = [
  "github",
  "git",
  "hub",
  "source",
  "code",
  "repository",
  "repo",
];

export function getSourceCodeCommands(
  query: string
): readonly SourceCodeCommand[] {
  const words = query
    .toLowerCase()
    .split(/[^a-z0-9]+/u)
    .filter(Boolean);

  return words.length > 0 &&
    words.every((word) => keywords.some((keyword) => keyword.startsWith(word)))
    ? [command]
    : [];
}
