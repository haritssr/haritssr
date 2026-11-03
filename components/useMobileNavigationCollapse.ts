import { useCallback, useEffect, useRef, useState } from "react";

function scrollPosition() {
  const maximum = Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight
  );
  return Math.min(maximum, Math.max(0, window.scrollY));
}

export default function useMobileNavigationCollapse(pathname: string) {
  const [collapseState, setCollapseState] = useState({
    pathname,
    collapsed: false,
  });
  if (collapseState.pathname !== pathname) {
    setCollapseState({ pathname, collapsed: false });
  }
  const tracking = useRef({
    last: 0,
    anchor: 0,
    direction: 0,
    collapsed: false,
  });

  const expand = useCallback(() => {
    const position = scrollPosition();
    tracking.current = {
      last: position,
      anchor: position,
      direction: 0,
      collapsed: false,
    };
    setCollapseState({ pathname, collapsed: false });
  }, [pathname]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    function reset() {
      const position = scrollPosition();
      tracking.current = {
        last: position,
        anchor: position,
        direction: 0,
        collapsed: false,
      };
      setCollapseState({ pathname, collapsed: false });
    }

    function onScroll() {
      const position = scrollPosition();
      const state = tracking.current;
      const focused = document.activeElement;
      if (
        desktop.matches ||
        (!state.collapsed &&
          focused instanceof Element &&
          focused.matches(":focus-visible") &&
          focused.closest("[data-mobile-collapse-region]") !== null)
      ) {
        state.last = position;
        state.anchor = position;
        state.direction = 0;
        return;
      }
      if (position <= 32) {
        if (state.collapsed) {
          setCollapseState({ pathname, collapsed: false });
        }
        tracking.current = {
          last: position,
          anchor: position,
          direction: 0,
          collapsed: false,
        };
        return;
      }
      const direction = Math.sign(position - state.last);
      if (direction === 0) {
        return;
      }
      if (direction !== state.direction) {
        state.anchor = state.last;
        state.direction = direction;
      }
      state.last = position;
      const distance = Math.abs(position - state.anchor);
      if (
        !state.collapsed &&
        direction > 0 &&
        position > 96 &&
        distance >= 24
      ) {
        state.collapsed = true;
        state.anchor = position;
        setCollapseState({ pathname, collapsed: true });
      } else if (state.collapsed && direction < 0 && distance >= 12) {
        state.collapsed = false;
        state.anchor = position;
        setCollapseState({ pathname, collapsed: false });
      }
    }

    const position = scrollPosition();
    tracking.current = {
      last: position,
      anchor: position,
      direction: 0,
      collapsed: false,
    };
    desktop.addEventListener("change", reset);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      desktop.removeEventListener("change", reset);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return {
    collapsed: collapseState.pathname === pathname && collapseState.collapsed,
    expand,
  };
}
