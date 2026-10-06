"use client";

import { Popover } from "@base-ui/react/popover";
import {
  CheckIcon,
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

import { SITE_DARK_THEME_COLOR, SITE_THEME_COLOR } from "@/utils/site";
import type { ThemePreference } from "@/utils/theme";
import { THEME_PREFERENCE_STORAGE_KEY } from "@/utils/theme";

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
  const [preference, setPreference] = useState<ThemePreference>("system");
  const preferenceRef = useRef<ThemePreference>("system");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const initialPreference = readThemePreference();

    preferenceRef.current = initialPreference;
    applyTheme(initialPreference, mediaQuery.matches);

    function handleSystemThemeChange(event: MediaQueryListEvent) {
      if (preferenceRef.current === "system") {
        applyResolvedTheme(event.matches ? "dark" : "light");
      }
    }

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      const storedPreference = readThemePreference();
      preferenceRef.current = storedPreference;
      setPreference(storedPreference);
    }

    setOpen(nextOpen);
  }

  function selectPreference(nextPreference: ThemePreference) {
    preferenceRef.current = nextPreference;
    setPreference(nextPreference);

    try {
      window.localStorage.setItem(THEME_PREFERENCE_STORAGE_KEY, nextPreference);
    } catch {
      // The selection still applies for this page if storage is unavailable.
    }

    applyTheme(
      nextPreference,
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }

  return (
    <Popover.Root onOpenChange={handleOpenChange} open={open}>
      <Popover.Trigger
        aria-label="Color theme options"
        className="focus-visible:outline-action text-foreground flex size-9 cursor-pointer items-center justify-center rounded-lg hover:opacity-65 focus-visible:outline-2 focus-visible:outline-offset-2"
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
                className="text-foreground px-2 pb-1 text-sm font-semibold"
                id="theme-switcher-heading"
              >
                Appearance
              </legend>
              {themeOptions.map(({ icon: Icon, label, value }) => (
                <label
                  className={`focus-within:outline-action flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm focus-within:outline-2 focus-within:outline-offset-2 ${
                    preference === value
                      ? "bg-action/10 text-action font-medium"
                      : "text-foreground/80 hover:bg-interface-hover"
                  }`}
                  key={value}
                >
                  <input
                    checked={preference === value}
                    className="sr-only"
                    name="theme-preference"
                    onChange={() => {
                      selectPreference(value);
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

function readThemePreference(): ThemePreference {
  try {
    const storedPreference = window.localStorage.getItem(
      THEME_PREFERENCE_STORAGE_KEY
    );

    if (
      storedPreference === "light" ||
      storedPreference === "dark" ||
      storedPreference === "system"
    ) {
      return storedPreference;
    }
  } catch {
    // Fall back to the system preference when storage is unavailable.
  }

  return "system";
}

function applyTheme(preference: ThemePreference, systemPrefersDark: boolean) {
  let theme: "light" | "dark";

  if (preference === "system") {
    theme = systemPrefersDark ? "dark" : "light";
  } else {
    theme = preference;
  }

  applyResolvedTheme(theme);
}

function applyResolvedTheme(theme: "light" | "dark") {
  document.documentElement.dataset.theme = theme;

  const themeColor = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"]'
  );

  if (themeColor) {
    themeColor.content =
      theme === "dark" ? SITE_DARK_THEME_COLOR : SITE_THEME_COLOR;
  }
}
