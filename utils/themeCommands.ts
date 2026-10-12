import { commandWords, matchesCommand } from "@/utils/commandMatching";
import type { ThemePreference } from "@/utils/theme";

export interface ThemeCommand {
  kind: "theme";
  title: string;
  preference: ThemePreference;
  keywords: readonly string[];
}

const commonKeywords = [
  "theme",
  "appearance",
  "mode",
  "set",
  "switch",
  "change",
];
const commands: readonly ThemeCommand[] = [
  {
    kind: "theme",
    title: "Theme: Light",
    preference: "light",
    keywords: [...commonKeywords, "light"],
  },
  {
    kind: "theme",
    title: "Theme: Dark",
    preference: "dark",
    keywords: [...commonKeywords, "dark"],
  },
  {
    kind: "theme",
    title: "Theme: System",
    preference: "system",
    keywords: [...commonKeywords, "system", "automatic", "auto"],
  },
];

export function getThemeCommands(query: string): readonly ThemeCommand[] {
  const words = commandWords(query);
  return commands.filter((command) => matchesCommand(words, command.keywords));
}
