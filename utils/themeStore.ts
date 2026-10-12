import { SITE_DARK_THEME_COLOR, SITE_THEME_COLOR } from "@/utils/site";
import { THEME_PREFERENCE_STORAGE_KEY } from "@/utils/theme";
import type { ThemePreference } from "@/utils/theme";

export function createThemeStore() {
  let preference: ThemePreference = "system";
  let initialized = false;
  const listeners = new Set<() => void>();

  function getSnapshot(): ThemePreference {
    if (!initialized) {
      preference = readThemePreference();
      initialized = true;
    }
    return preference;
  }

  function setPreference(nextPreference: ThemePreference) {
    preference = nextPreference;
    initialized = true;
    try {
      window.localStorage.setItem(THEME_PREFERENCE_STORAGE_KEY, preference);
    } catch {
      // Keep the preference in memory even when persistence is unavailable.
    }
    applyTheme(preference);
    for (const listener of listeners) {
      listener();
    }
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    applyTheme(getSnapshot());

    function handleSystemThemeChange() {
      if (preference === "system") {
        applyTheme(preference);
      }
    }

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => {
      listeners.delete(listener);
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }

  return {
    getSnapshot,
    getServerSnapshot: (): ThemePreference => "system",
    setPreference,
    subscribe,
  };
}

function readThemePreference(): ThemePreference {
  try {
    const stored = window.localStorage.getItem(THEME_PREFERENCE_STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
  } catch {
    // Use the system appearance when no saved preference can be read.
  }
  return "system";
}

function applyTheme(preference: ThemePreference) {
  let theme = preference;
  if (theme === "system") {
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  document.documentElement.dataset.theme = theme;
  const themeColor = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"]'
  );
  if (themeColor) {
    themeColor.content =
      theme === "dark" ? SITE_DARK_THEME_COLOR : SITE_THEME_COLOR;
  }
}
