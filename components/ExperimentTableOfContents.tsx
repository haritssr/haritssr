"use client";

import { Popover } from "@base-ui/react/popover";
import { ArrowUpIcon, ListBulletIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { RefObject } from "react";
import { Button as AriaButton } from "react-aria-components/Button";
import { SheetTrigger } from "react-aria-components/Sheet";

import Button from "@/components/Button";
import {
  affectsExperimentHeadings,
  collectExperimentOutline,
} from "@/utils/experimentTableOfContents";
import type {
  ContentsEntry,
  ExperimentOutline,
} from "@/utils/experimentTableOfContents";

const ContentsPanel = dynamic(
  async () => await import("./ExperimentContentsPanel")
);
const DESKTOP_QUERY = "(min-width: 1024px)";
const FLOATING_BUTTON_CLASS =
  "border-middle-hover text-foreground/90! hover:bg-middle-hover/50! focus-visible:outline-action fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-40 h-9.5 rounded-full! border bg-white/50 px-3! py-1.5! text-base! saturate-150 backdrop-blur-lg select-none [corner-shape:round]!";

function getDesktopSnapshot() {
  return window.matchMedia(DESKTOP_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

function outlineSignature(outline: ExperimentOutline) {
  return JSON.stringify(
    [outline.entries[0], ...outline.sections].map((entry) => ({
      id: entry.id,
      label: entry.label,
      level: entry.level,
    }))
  );
}

export default function ExperimentTableOfContents({
  articleRef,
  title,
}: {
  articleRef: RefObject<HTMLElement | null>;
  title: string;
}) {
  const [outline, setOutline] = useState<ExperimentOutline | null>(null);
  const [activeId, setActiveId] = useState("");
  const [openView, setOpenView] = useState<boolean | null>(null);
  const [hasOpened, setHasOpened] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pendingNavigation = useRef<{
    entry: ContentsEntry;
    focus: boolean;
  } | null>(null);
  const navigationFrame = useRef(0);
  const subscribeToDesktop = useCallback((onChange: () => void) => {
    const media = window.matchMedia(DESKTOP_QUERY);
    function handleChange() {
      pendingNavigation.current = null;
      setOpenView(null);
      onChange();
    }
    media.addEventListener("change", handleChange);
    return () => {
      media.removeEventListener("change", handleChange);
    };
  }, []);
  const desktop = useSyncExternalStore(
    subscribeToDesktop,
    getDesktopSnapshot,
    getServerSnapshot
  );
  const visible = outline !== null && outline.sections.length >= 2;
  const open = visible && openView === desktop;

  useEffect(() => {
    const article = articleRef.current;

    let frame = 0;
    let previous: ExperimentOutline | null = null;
    let signature = "";
    let initialHash = window.location.hash;
    const generatedIds = new Map<HTMLElement, string>();

    function collect() {
      frame = 0;
      if (!article) {
        return;
      }
      const next = collectExperimentOutline(article, title, generatedIds);
      const nextSignature = outlineSignature(next);
      const nextTargets = [next.entries[0], ...next.sections];
      const previousTargets = previous
        ? [previous.entries[0], ...previous.sections]
        : [];
      const sameTargets = nextTargets.every(
        (entry, index) => entry.target === previousTargets[index]?.target
      );

      if (nextSignature !== signature || !sameTargets) {
        signature = nextSignature;
        previous = next;
        setOutline(next);
        if (next.sections.length < 2) {
          pendingNavigation.current = null;
          setOpenView(null);
        }
      }

      if (initialHash) {
        const target = nextTargets.find(
          (entry) => `#${encodeURIComponent(entry.id)}` === initialHash
        )?.target;
        if (target) {
          initialHash = "";
          target.scrollIntoView({ block: "start" });
        }
      }
    }

    function scheduleCollect() {
      if (!frame) {
        frame = requestAnimationFrame(collect);
      }
    }

    const observer = new MutationObserver((records) => {
      if (records.some(affectsExperimentHeadings)) {
        scheduleCollect();
      }
    });
    if (article !== null) {
      observer.observe(article, {
        attributeFilter: [
          "class",
          "style",
          "hidden",
          "aria-hidden",
          "open",
          "data-state",
          "data-open",
          "data-closed",
          "data-starting-style",
          "data-ending-style",
        ],
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true,
      });
      scheduleCollect();
      window.addEventListener("resize", scheduleCollect, { passive: true });
    }

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", scheduleCollect);
      for (const [target, id] of generatedIds) {
        if (target.id === id) {
          target.removeAttribute("id");
        }
      }
    };
  }, [articleRef, title]);

  useEffect(() => {
    const entries =
      outline === null ? [] : [outline.entries[0], ...outline.sections];
    let frame = 0;

    function updateActive() {
      frame = 0;
      let low = 0;
      let high = entries.length - 1;
      let [current] = entries;
      if (current === undefined) {
        return;
      }
      // Targets follow document order; avoid measuring every heading on scroll.
      while (low <= high) {
        const middle = Math.floor((low + high) / 2);
        const entry = entries[middle];
        if (entry.target.getBoundingClientRect().top <= 101) {
          current = entry;
          low = middle + 1;
        } else {
          high = middle - 1;
        }
      }
      setActiveId((previous) =>
        previous === current.id ? previous : current.id
      );
    }

    function scheduleActive() {
      if (!frame) {
        frame = requestAnimationFrame(updateActive);
      }
    }

    const observer = new IntersectionObserver(scheduleActive, {
      rootMargin: "-100px 0px 0px",
    });
    if (visible) {
      for (const entry of entries) {
        observer.observe(entry.target);
      }
      scheduleActive();
      window.addEventListener("scroll", scheduleActive, { passive: true });
      window.addEventListener("resize", scheduleActive, { passive: true });
    }

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleActive);
      window.removeEventListener("resize", scheduleActive);
    };
  }, [outline, visible]);

  useEffect(
    () => () => {
      pendingNavigation.current = null;
      cancelAnimationFrame(navigationFrame.current);
    },
    []
  );

  const finishClose = useCallback((isOpen: boolean) => {
    const navigation = pendingNavigation.current;
    if (isOpen || !navigation) {
      return;
    }

    cancelAnimationFrame(navigationFrame.current);
    // React Aria restores focus on the next frame after the sheet unmounts.
    // Navigate on the following frame, once focus and scroll locking settle.
    navigationFrame.current = requestAnimationFrame(() => {
      navigationFrame.current = requestAnimationFrame(() => {
        if (pendingNavigation.current !== navigation) {
          return;
        }
        pendingNavigation.current = null;
        const { entry, focus } = navigation;
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
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "auto"
            : "smooth",
          block: "start",
        });
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

  if (!visible || outline === null) {
    return null;
  }

  function changeOpen(nextOpen: boolean) {
    if (nextOpen) {
      pendingNavigation.current = null;
      cancelAnimationFrame(navigationFrame.current);
      setHasOpened(true);
    }
    setOpenView(nextOpen ? desktop : null);
  }

  const triggerClassName = `${FLOATING_BUTTON_CLASS} right-[max(1.25rem,env(safe-area-inset-right))]`;
  const triggerContent = (
    <>
      <ListBulletIcon
        aria-hidden="true"
        className="pointer-events-none size-5"
      />
      Contents
    </>
  );
  const panel = hasOpened ? (
    <ContentsPanel
      activeId={activeId}
      desktop={desktop}
      entries={outline.entries[0].children}
      finalFocus={() =>
        pendingNavigation.current ? false : triggerRef.current
      }
      sheetRef={sheetRef}
      onSelect={(entry, focus) => {
        pendingNavigation.current = { entry, focus };
        setOpenView(null);
      }}
      title={title}
    />
  ) : null;

  return (
    <>
      <Button
        aria-label="To the top"
        className={`${FLOATING_BUTTON_CLASS} left-[max(1.25rem,env(safe-area-inset-left))] size-9.5 p-0!`}
        iconOnly
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? "auto"
              : "smooth",
          });
        }}
        variant="ghost"
      >
        <ArrowUpIcon
          aria-hidden="true"
          className="pointer-events-none size-5"
        />
      </Button>
      {desktop ? (
        <Popover.Root
          modal={false}
          onOpenChange={changeOpen}
          onOpenChangeComplete={finishClose}
          open={open}
        >
          <Popover.Trigger
            render={
              <Button
                className={triggerClassName}
                data-experiment-toc-trigger=""
                ref={triggerRef}
                variant="ghost"
              />
            }
          >
            {triggerContent}
          </Popover.Trigger>
          {panel}
        </Popover.Root>
      ) : (
        <SheetTrigger isOpen={open} onOpenChange={changeOpen}>
          <AriaButton
            className={triggerClassName}
            data-experiment-toc-trigger=""
            ref={triggerRef}
            render={(props) => <Button {...props} variant="ghost" />}
          >
            {triggerContent}
          </AriaButton>
          {panel}
        </SheetTrigger>
      )}
    </>
  );
}
