import type { ThemePreference } from "@/utils/theme";

export interface ThemeCommand {
  kind: "theme";
  title: string;
  preference: ThemePreference;
  keywords: string;
}

const commands: readonly ThemeCommand[] = [
  {
    kind: "theme",
    title: "Theme: Light",
    preference: "light",
    keywords: "theme appearance light mode set switch change",
  },
  {
    kind: "theme",
    title: "Theme: Dark",
    preference: "dark",
    keywords: "theme appearance dark mode set switch change",
  },
  {
    kind: "theme",
    title: "Theme: System",
    preference: "system",
    keywords: "theme appearance system mode automatic auto set switch change",
  },
];

export function getThemeCommands(query: string): readonly ThemeCommand[] {
  const words = query
    .toLowerCase()
    .split(/[^a-z0-9]+/u)
    .filter(Boolean);
  if (words.length === 0) {
    return [];
  }
  return commands.filter((command) => {
    const keywords = command.keywords.split(" ");
    return words.every((word) =>
      keywords.some((keyword) => keyword.startsWith(word))
    );
  });
}
