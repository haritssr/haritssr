import { useEffect, useRef } from "react";

// Match the navigation gap and reserve mobile footer clearance for the dock.
export default function useFloatingDockPosition(
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
      let bottom = desktop ? 1.5 * rem : Math.max(0.75 * rem, safeBottom);
      const footerGap = bottom;
      let gap = 0.75 * rem;
      const bounds = navigation?.getBoundingClientRect();
      if (
        !desktop &&
        bounds &&
        bounds.width > 0 &&
        bounds.bottom > 0 &&
        bounds.top < window.innerHeight
      ) {
        gap = Math.max(bottom, window.innerHeight - bounds.bottom);
        bottom = window.innerHeight - bounds.top + gap;
        dock.style.setProperty(
          "--floating-tabbar-height",
          `${bounds.height}px`
        );
      } else {
        dock.style.removeProperty("--floating-tabbar-height");
      }
      dock.style.setProperty("--floating-dock-bottom", `${bottom}px`);
      root.style.setProperty(
        "--floating-footer-clearance",
        // Keep document spacing independent of the sticky navigation's position.
        // Otherwise moving the footer moves navigation and feeds back into this margin.
        `${Math.max(1.25 * rem, height + 2 * footerGap)}px`
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
    window.addEventListener("resize", schedulePosition, { passive: true });
    window.addEventListener("scroll", schedulePosition, { passive: true });
    updatePosition();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", schedulePosition);
      window.removeEventListener("scroll", schedulePosition);
      cancelAnimationFrame(frame);
      root.style.removeProperty("--floating-footer-clearance");
      dock.style.removeProperty("--floating-dock-bottom");
      dock.style.removeProperty("--floating-tabbar-height");
    };
  }, [visible, pathname]);

  return ref;
}
