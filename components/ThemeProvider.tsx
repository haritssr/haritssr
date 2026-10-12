"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import type { ReactNode } from "react";

import type { ThemePreference } from "@/utils/theme";
import { createThemeStore } from "@/utils/themeStore";

interface ThemeContextValue {
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export default function ThemeProvider({ children }: { children: ReactNode }) {
  // oxlint-disable-next-line react/hook-use-state -- The store is stable for this provider's lifetime; its snapshots own the mutable state.
  const [store] = useState(createThemeStore);
  const preference = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot
  );
  const value = useMemo(
    () => ({ preference, setPreference: store.setPreference }),
    [preference, store]
  );
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("Theme controls must be used inside ThemeProvider");
  }
  return context;
}
