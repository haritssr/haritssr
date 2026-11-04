import { useLayoutEffect, useRef } from "react";

import createFloatingPlayerMotion from "./floatingPlayerMotion";

// Match the navigation gap and reserve mobile footer clearance for the dock.
export default function useFloatingDockPosition(
  visible: boolean,
  pathname: string,
  playersDocked: boolean
) {
  const ref = useRef<HTMLDivElement>(null);
  const reservation = useRef({ pathname, height: 0 });
  const motion = useRef<ReturnType<typeof createFloatingPlayerMotion> | null>(
    null
  );
  const previousLayout = useRef({ pathname, playersDocked });

  useLayoutEffect(() => () => motion.current?.clear(), []);

  useLayoutEffect(() => {
    const dock = ref.current;
    const playerMotion = motion.current ?? createFloatingPlayerMotion();
    motion.current = playerMotion;
    if ((!visible && pathname !== "/timer") || !dock) {
      playerMotion.clear();
      reservation.current.height = 0;
      return () => {
        /* Hidden docks need no geometry tracking. */
      };
    }
    if (!visible) {
      playerMotion.clear();
      reservation.current.height = 0;
    }
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const layoutChanged =
      previousLayout.current.pathname === pathname &&
      previousLayout.current.playersDocked !== playersDocked;
    if (previousLayout.current.pathname !== pathname) {
      playerMotion.clear();
    }
    previousLayout.current = { pathname, playersDocked };
    const animateUntil = layoutChanged ? performance.now() + 500 : 0;
    const navigation = document.querySelector<HTMLElement>(
      `[data-mobile-tabbar-surface="${CSS.escape(pathname)}"]`
    );
    const playerSlot = document.querySelector<HTMLElement>(
      `[data-mobile-player-slot="${CSS.escape(pathname)}"]`
    );
    if (reservation.current.pathname !== pathname) {
      reservation.current = { pathname, height: 0 };
    }
    let frame = 0;

    function updatePosition() {
      frame = 0;
      if (!dock) {
        return;
      }
      const desktop = window.matchMedia("(min-width: 1024px)").matches;
      const rem = Number(getComputedStyle(root).fontSize.replace("px", ""));
      const safeBottom =
        Number(
          getComputedStyle(dock)
            .getPropertyValue("--floating-safe-bottom")
            .replace("px", "")
        ) || 0;
      // Read all geometry before changing styles to avoid forced layout between writes.
      const { height } = dock.getBoundingClientRect();
      // Preserve document space while controls shrink, avoiding scroll feedback.
      reservation.current.height = Math.max(reservation.current.height, height);
      const deepPath = pathname.split("/").filter(Boolean).length >= 3;
      let bottom = window.matchMedia("(min-width: 768px)").matches
        ? (deepPath ? 2.75 : 1) * rem
        : Math.max(0.5 * rem, safeBottom);
      const footerGap = bottom;
      let gap = 0.75 * rem;
      const bounds = navigation?.getBoundingClientRect();
      let navigationClearance = 0;
      const slotBounds = playersDocked
        ? playerSlot?.getBoundingClientRect()
        : undefined;
      if (
        !desktop &&
        bounds &&
        bounds.width > 0 &&
        bounds.bottom > 0 &&
        bounds.top < window.innerHeight
      ) {
        navigationClearance = window.innerHeight - bounds.top;
        gap = Math.max(bottom, window.innerHeight - bounds.bottom);
        bottom = window.innerHeight - bounds.top + gap;
      }
      dock.style.setProperty("--floating-dock-bottom", `${bottom}px`);
      // Mobile page actions sit above whichever controls currently reach highest.
      root.style.setProperty(
        "--floating-controls-clearance",
        `${Math.max(safeBottom, navigationClearance, visible ? bottom + height : 0) + rem}px`
      );
      if (slotBounds === undefined) {
        dock.style.removeProperty("--floating-player-top");
        dock.style.removeProperty("--floating-player-left");
        dock.style.removeProperty("--floating-player-width");
      } else {
        dock.style.setProperty("--floating-player-top", `${slotBounds.top}px`);
        dock.style.setProperty(
          "--floating-player-left",
          `${slotBounds.left}px`
        );
        dock.style.setProperty(
          "--floating-player-width",
          `${slotBounds.width}px`
        );
      }
      root.style.setProperty(
        "--floating-footer-clearance",
        // Keep document spacing independent of the sticky navigation's position.
        // Otherwise moving the footer moves navigation and feeds back into this margin.
        `${visible ? Math.max(1.25 * rem, reservation.current.height + 2 * footerGap) : 1.25 * rem}px`
      );
      playerMotion.update(
        dock,
        !reducedMotion.matches && performance.now() < animateUntil
      );
    }

    function schedulePosition() {
      if (!frame) {
        frame = requestAnimationFrame(updatePosition);
      }
    }

    const observer = new ResizeObserver(schedulePosition);
    observer.observe(dock);
    observer.observe(document.body);
    if (navigation) {
      observer.observe(navigation);
    }
    if (playerSlot) {
      observer.observe(playerSlot);
    }
    window.addEventListener("resize", schedulePosition, { passive: true });
    window.addEventListener("scroll", schedulePosition, { passive: true });
    reducedMotion.addEventListener("change", schedulePosition);
    updatePosition();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", schedulePosition);
      window.removeEventListener("scroll", schedulePosition);
      reducedMotion.removeEventListener("change", schedulePosition);
      cancelAnimationFrame(frame);
      root.style.removeProperty("--floating-footer-clearance");
      root.style.removeProperty("--floating-controls-clearance");
      dock.style.removeProperty("--floating-dock-bottom");
      dock.style.removeProperty("--floating-player-top");
      dock.style.removeProperty("--floating-player-left");
      dock.style.removeProperty("--floating-player-width");
    };
  }, [visible, pathname, playersDocked]);

  return ref;
}
