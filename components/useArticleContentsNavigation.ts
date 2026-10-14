"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import type {
  ArticleOutline,
  ContentsEntry,
} from "@/utils/articleTableOfContents";

const DESKTOP_QUERY = "(min-width: 1024px)";

function getDesktopSnapshot() {
  return window.matchMedia(DESKTOP_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

function scrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}

export function scrollArticleToTop() {
  window.scrollTo({ top: 0, behavior: scrollBehavior() });
}

function navigateToEntry(entry: ContentsEntry, focus: boolean) {
  if (!entry.target.isConnected) {
    return;
  }
  const hash = `#${encodeURIComponent(entry.id)}`;
  if (window.location.hash !== hash) {
    window.history.pushState(window.history.state, "", hash);
  }
  if (focus) {
    if (!entry.target.hasAttribute("tabindex")) {
      entry.target.setAttribute("tabindex", "-1");
    }
    entry.target.focus({ preventScroll: true });
  }
  entry.target.scrollIntoView({
    behavior: scrollBehavior(),
    block: "start",
  });
}

// Delay anchor navigation until the popover/sheet has finished restoring focus.
export default function useArticleContentsNavigation(minimumSections: number) {
  const [openView, setOpenView] = useState<boolean | null>(null);
  const [hasOpened, setHasOpened] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pendingNavigation = useRef<{
    entry: ContentsEntry;
    focus: boolean;
  } | null>(null);
  const pendingAction = useRef<(() => void) | null>(null);
  const navigationFrame = useRef(0);
  const cancelNavigation = useCallback(() => {
    pendingNavigation.current = null;
    pendingAction.current = null;
    cancelAnimationFrame(navigationFrame.current);
  }, []);
  const subscribeToDesktop = useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia(DESKTOP_QUERY);
      function handleChange() {
        cancelNavigation();
        setOpenView(null);
        onChange();
      }
      media.addEventListener("change", handleChange);
      return () => {
        media.removeEventListener("change", handleChange);
      };
    },
    [cancelNavigation]
  );
  const desktop = useSyncExternalStore(
    subscribeToDesktop,
    getDesktopSnapshot,
    getServerSnapshot
  );

  useEffect(() => cancelNavigation, [cancelNavigation]);

  const finishClose = useCallback((isOpen: boolean) => {
    const navigation = pendingNavigation.current;
    const action = pendingAction.current;
    if (isOpen || (!navigation && !action)) {
      return;
    }

    cancelAnimationFrame(navigationFrame.current);
    // React Aria restores focus on the next frame after the sheet unmounts.
    // Navigate on the following frame, once focus and scroll locking settle.
    navigationFrame.current = requestAnimationFrame(() => {
      navigationFrame.current = requestAnimationFrame(() => {
        if (
          pendingNavigation.current !== navigation ||
          pendingAction.current !== action
        ) {
          return;
        }
        pendingNavigation.current = null;
        pendingAction.current = null;
        if (navigation) {
          navigateToEntry(navigation.entry, navigation.focus);
        } else {
          action?.();
        }
      });
    });
  }, []);

  const sheetRef = useCallback(
    (element: HTMLDivElement | null) => {
      if (element === null) {
        finishClose(false);
      }
    },
    [finishClose]
  );

  function changeOpen(nextOpen: boolean) {
    if (nextOpen) {
      cancelNavigation();
      setHasOpened(true);
    }
    setOpenView(nextOpen ? desktop : null);
  }

  const onOutlineChange = useCallback(
    (outline: ArticleOutline) => {
      if (outline.sections.length < minimumSections) {
        cancelNavigation();
        setOpenView(null);
      }
    },
    [cancelNavigation, minimumSections]
  );

  function selectEntry(entry: ContentsEntry, focus: boolean) {
    cancelNavigation();
    pendingNavigation.current = { entry, focus };
    setOpenView(null);
  }

  function runAfterClose(action: () => void) {
    cancelNavigation();
    pendingAction.current = action;
    setOpenView(null);
  }

  function finalFocus() {
    return pendingNavigation.current || pendingAction.current
      ? false
      : triggerRef.current;
  }

  return {
    desktop,
    open: openView === desktop,
    hasOpened,
    triggerRef,
    sheetRef,
    changeOpen,
    finishClose,
    finalFocus,
    selectEntry,
    runAfterClose,
    onOutlineChange,
  };
}
