"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

import useFloatingDockPosition from "./useFloatingDockPosition";

const DockContext = createContext<{
  target: HTMLDivElement | null;
  register: () => () => void;
} | null>(null);

export default function FloatingDock({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const [count, setCount] = useState(0);
  const ref = useFloatingDockPosition(count > 0, pathname);
  const register = useCallback(() => {
    setCount((value) => value + 1);
    return () => {
      setCount((value) => Math.max(0, value - 1));
    };
  }, []);
  const setDock = useCallback(
    (node: HTMLDivElement | null) => {
      ref.current = node;
      setTarget(node);
    },
    [ref]
  );

  const value = useMemo(() => ({ target, register }), [target, register]);
  return (
    <DockContext value={value}>
      {children}
      <div
        className={`${count === 0 ? "hidden" : "flex"} pointer-events-none fixed inset-x-0 bottom-[var(--floating-dock-bottom,max(0.75rem,env(safe-area-inset-bottom)))] z-50 mx-auto w-full max-w-5xl flex-col items-end gap-3 px-3.5 [--floating-safe-bottom:env(safe-area-inset-bottom,0px)] sm:bottom-[var(--floating-dock-bottom,1.5rem)] sm:items-center sm:px-4 xl:px-0`}
        ref={setDock}
      />
    </DockContext>
  );
}

export function FloatingDockSlot({
  children,
  position,
}: {
  children: ReactNode;
  position: "music" | "timer";
}) {
  const context = useContext(DockContext);
  const register = context?.register;
  useEffect(() => register?.(), [register]);
  return context?.target
    ? createPortal(
        <div
          className={`${position === "music" ? "order-1" : "order-2"} flex w-full flex-col items-end gap-3 sm:w-auto sm:items-center`}
        >
          {children}
        </div>,
        context.target
      )
    : null;
}
