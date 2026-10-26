"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import type { ReactNode } from "react";

import type {
  TimerController,
  TimerState,
} from "@/app/(tools)/timer/utils/timerController";
import { useTimerSession } from "@/utils/timerSession";

const TimerRuntime = dynamic(
  async () => await import("@/app/(tools)/timer/_components/TimerRuntime")
);
export const TimerContext = createContext<TimerController | null>(null);

export default function TimerProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { data } = useTimerSession();
  const [activated, setActivated] = useState(false);
  const [value, setValue] = useState<TimerController | null>(null);
  const needed =
    pathname === "/timer" ||
    pathname.startsWith("/timer/") ||
    (data !== undefined && data.account !== null);
  if (needed && !activated) {
    setActivated(true);
  }

  return (
    <TimerContext value={value}>
      {children}
      {activated ? <TimerRuntime onReady={setValue} /> : null}
    </TimerContext>
  );
}

export function TimerContent({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}): ReactNode {
  const context = useContext(TimerContext);
  return context === null
    ? (fallback ?? <output className="text-muted block">Loading Timer…</output>)
    : children;
}

export function useTimer<K extends keyof TimerState>(...keys: K[]) {
  const context = useContext(TimerContext);
  if (context === null) {
    throw new Error("Timer controls require an activated TimerProvider.");
  }
  const fields = keys.join(",");
  const getSnapshot = useMemo(
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- These comma-free keys are serialized from K[] above to keep the selector stable across renders.
    () => context.select(fields.split(",") as K[]),
    [context, fields]
  );
  return useSyncExternalStore(context.subscribe, getSnapshot, getSnapshot);
}
