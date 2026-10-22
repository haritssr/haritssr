"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

import type { TimerState } from "@/app/timer/_components/TimerRuntime";
import { useTimerSession } from "@/utils/timerSession";

const TimerRuntime = dynamic(
  async () => await import("@/app/timer/_components/TimerRuntime")
);
export const TimerContext = createContext<TimerState | null>(null);

export default function TimerProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { data } = useTimerSession();
  const [activated, setActivated] = useState(false);
  const [value, setValue] = useState<TimerState | null>(null);
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
      {activated ? <TimerRuntime onStateChange={setValue} /> : null}
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

export function useTimer() {
  const context = useContext(TimerContext);
  if (context === null) {
    throw new Error("Timer controls require an activated TimerProvider.");
  }
  return context;
}
