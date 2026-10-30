"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useEffectEvent,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

import useFloatingDockPosition from "./useFloatingDockPosition";

type DockPosition = "music" | "timer";
type DockCounts = Record<DockPosition | "notice", number>;

interface DockContextValue {
  noticeTarget: HTMLDivElement | null;
  target: HTMLDivElement | null;
  register: (position: keyof DockCounts) => () => void;
}

const DockContext = createContext<DockContextValue | null>(null);
function useFloatingDock() {
  const context = useContext(DockContext);
  if (!context) {
    throw new Error("Floating controls require FloatingDock.");
  }
  return context;
}

function isSpaceShortcut(event: KeyboardEvent) {
  if (
    event.code !== "Space" ||
    event.defaultPrevented ||
    event.repeat ||
    event.isComposing ||
    event.altKey ||
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey
  ) {
    return false;
  }
  const { target } = event;
  return !(
    (target instanceof HTMLElement && target.isContentEditable) ||
    (target instanceof Element &&
      target.closest(
        "input, textarea, select, button, a, summary, [role='button'], [role='textbox'], [role='slider'], [role='menuitem'], [role='dialog'], [role='alertdialog']"
      ) !== null) ||
    document.querySelector("[role='dialog'], [role='alertdialog']") !== null
  );
}

export default function FloatingDock({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const [noticeTarget, setNoticeTarget] = useState<HTMLDivElement | null>(null);
  const [counts, setCounts] = useState<DockCounts>({
    music: 0,
    timer: 0,
    notice: 0,
  });
  const count = counts.music + counts.timer + counts.notice;
  const ref = useFloatingDockPosition(count > 0, pathname);
  const onKeyDown = useEffectEvent((event: KeyboardEvent) => {
    if (!isSpaceShortcut(event)) {
      return;
    }
    for (const priority of ["notification", "error", "music", "timer"]) {
      const candidates = ref.current?.querySelectorAll<HTMLButtonElement>(
        `button[data-floating-space="${priority}"]`
      );
      const button = [...(candidates ?? [])].find(
        (candidate) =>
          !candidate.disabled &&
          candidate.getAttribute("aria-disabled") !== "true" &&
          candidate.closest(
            '[data-ending-style], [hidden], [aria-hidden="true"]'
          ) === null &&
          candidate.getClientRects().length > 0
      );
      if (button) {
        event.preventDefault();
        button.click();
        return;
      }
    }
  });
  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const register = useCallback((position: keyof DockCounts) => {
    setCounts((current) => ({ ...current, [position]: current[position] + 1 }));
    return () => {
      setCounts((current) => ({
        ...current,
        [position]: Math.max(0, current[position] - 1),
      }));
    };
  }, []);

  const value = useMemo(
    () => ({ noticeTarget, target, register }),
    [noticeTarget, target, register]
  );
  const hasPlayers = counts.music + counts.timer > 0;

  return (
    <DockContext value={value}>
      {children}
      <div
        className={`${count === 0 ? "hidden" : "flex"} pointer-events-none fixed inset-x-0 bottom-[var(--floating-dock-bottom,max(0.5rem,env(safe-area-inset-bottom)))] z-50 mx-auto w-full max-w-5xl flex-col items-end gap-2 px-2 [--floating-safe-bottom:env(safe-area-inset-bottom,0px)] sm:bottom-[var(--floating-dock-bottom,1.5rem)] sm:items-center sm:px-4 xl:px-0`}
        ref={ref}
      >
        <div
          className={`${counts.notice === 0 ? "hidden" : "flex"} w-full flex-col items-end gap-2 sm:w-auto sm:items-center`}
          ref={setNoticeTarget}
        />
        <div
          className={`${hasPlayers ? "flex" : "hidden"} w-full flex-col items-end gap-2 sm:w-auto sm:items-center`}
          ref={setTarget}
        />
      </div>
    </DockContext>
  );
}

export function FloatingDockSlot({
  children,
  position,
}: {
  children: ReactNode;
  position: DockPosition;
}) {
  const { register, target } = useFloatingDock();
  useEffect(() => register(position), [position, register]);
  return target
    ? createPortal(
        <div
          className={`${position === "music" ? "order-1" : "order-2"} flex w-full flex-col items-end gap-2 sm:w-auto sm:items-center`}
        >
          {children}
        </div>,
        target
      )
    : null;
}

export function FloatingDockNotice({ children }: { children: ReactNode }) {
  const { noticeTarget, register } = useFloatingDock();
  useEffect(() => register("notice"), [register]);
  return noticeTarget ? createPortal(children, noticeTarget) : null;
}
