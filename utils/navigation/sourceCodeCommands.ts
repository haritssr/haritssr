import { SOURCE_CODE_URL } from "@/utils/metadata/site";
import {
  commandWords,
  matchesCommand,
} from "@/utils/navigation/commandMatching";

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
  return matchesCommand(commandWords(query), keywords) ? [command] : [];
}
