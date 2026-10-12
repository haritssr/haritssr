"use client";

import { Popover } from "@base-ui/react/popover";
import {
  CheckIcon,
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

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
  const [open, setOpen] = useState(false);
  const { preference, setPreference } = useTheme();

  return (
    <Popover.Root onOpenChange={setOpen} open={open}>
      <Popover.Trigger
        aria-label="Color theme options"
        className="focus-visible:outline-action text-foreground flex size-9 cursor-pointer items-center justify-center rounded-lg hover:opacity-65 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98]"
        title="Color theme"
      >
        <SunIcon aria-hidden="true" className="size-5" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner align="end" side="bottom" sideOffset={8}>
          <Popover.Popup
            aria-labelledby="theme-switcher-heading"
            className="border-border bg-surface text-foreground z-50 w-40 rounded-xl border p-2 shadow-xl outline-hidden"
          >
            <fieldset
              aria-labelledby="theme-switcher-heading"
              className="space-y-1"
            >
              <legend
                className="text-foreground px-2 pb-1 text-sm font-medium"
                id="theme-switcher-heading"
              >
                Appearance
              </legend>
              {themeOptions.map(({ icon: Icon, label, value }) => (
                <label
                  className={`flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors ${
                    preference === value
                      ? "bg-action/10 text-action font-medium"
                      : "text-foreground/80 hover:bg-foreground/10 has-focus-visible:bg-foreground/10"
                  }`}
                  key={value}
                >
                  <input
                    checked={preference === value}
                    className="sr-only"
                    name="theme-preference"
                    onChange={() => {
                      setPreference(value);
                    }}
                    type="radio"
                    value={value}
                  />
                  <Icon aria-hidden="true" className="size-4 shrink-0" />
                  <span className="flex-1">{label}</span>
                  {preference === value ? (
                    <CheckIcon aria-hidden="true" className="size-4 shrink-0" />
                  ) : null}
                </label>
              ))}
            </fieldset>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
