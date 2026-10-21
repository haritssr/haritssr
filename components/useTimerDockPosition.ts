import { useEffect, useRef } from "react";

// Match the navigation gap and keep other floating controls clear of the dock.
export default function useTimerDockPosition(
  visible: boolean,
  pathname: string
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dock = ref.current;
    if (!visible || !dock) {
      return () => {
        /* Hidden docks need no geometry tracking. */
      };
    }
    const root = document.documentElement;
    const navigation = document.querySelector<HTMLElement>(
      `[data-mobile-tabbar-surface="${CSS.escape(pathname)}"]`
    );
    let frame = 0;

    function updatePosition() {
      frame = 0;
      if (!dock) {
        return;
      }
      const desktop = window.matchMedia("(min-width: 640px)").matches;
      const rem = Number(getComputedStyle(root).fontSize.replace("px", ""));
      const safeBottom =
        Number(
          getComputedStyle(dock)
            .getPropertyValue("--timer-safe-bottom")
            .replace("px", "")
        ) || 0;
      let bottom = desktop ? 1.5 * rem : Math.max(0.75 * rem, safeBottom);
      const bounds = navigation?.getBoundingClientRect();
      if (
        !desktop &&
        bounds &&
        bounds.width > 0 &&
        bounds.bottom > 0 &&
        bounds.top < window.innerHeight
      ) {
        const gap = Math.max(bottom, window.innerHeight - bounds.bottom);
        bottom = window.innerHeight - bounds.top + gap;
        dock.style.setProperty("--timer-tabbar-height", `${bounds.height}px`);
      } else {
        dock.style.removeProperty("--timer-tabbar-height");
      }
      const height = dock.getBoundingClientRect().height + 0.75 * rem;
      dock.style.setProperty("--timer-dock-bottom", `${bottom}px`);
      root.style.setProperty("--timer-dock-clearance", `${bottom + height}px`);
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
    window.addEventListener("resize", schedulePosition, { passive: true });
    window.addEventListener("scroll", schedulePosition, { passive: true });
    updatePosition();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", schedulePosition);
      window.removeEventListener("scroll", schedulePosition);
      cancelAnimationFrame(frame);
      root.style.removeProperty("--timer-dock-clearance");
      dock.style.removeProperty("--timer-dock-bottom");
      dock.style.removeProperty("--timer-tabbar-height");
    };
  }, [visible, pathname]);

  return ref;
}
