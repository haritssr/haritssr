"use client";

import { Button } from "@base-ui/react/button";
import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";

import { useTheme } from "@/components/ThemeProvider";
import type { ThemePreference } from "@/utils/theme";

const themeOptions = [
  { icon: ComputerDesktopIcon, label: "System", value: "system" },
  { icon: SunIcon, label: "Light", value: "light" },
  { icon: MoonIcon, label: "Dark", value: "dark" },
] as const satisfies {
  icon: typeof ComputerDesktopIcon;
  label: string;
  value: ThemePreference;
}[];

export default function ThemeSwitcher() {
  const { preference, setPreference } = useTheme();
  const index = themeOptions.findIndex(({ value }) => value === preference);
  const current = themeOptions[index];
  const next = themeOptions[(index + 1) % themeOptions.length];
  const Icon = current.icon;
  const label = `Theme: ${current.label}. Switch to ${next.label} theme.`;

  return (
    <Button
      aria-label={label}
      className="focus-visible:outline-action text-foreground flex size-10 cursor-pointer items-center justify-center rounded-lg hover:opacity-65 focus-visible:outline-2 focus-visible:outline-offset-2 sm:size-9"
      onClick={() => {
        setPreference(next.value);
      }}
      title={label}
      type="button"
    >
      <Icon aria-hidden="true" className="size-5" />
    </Button>
  );
}
