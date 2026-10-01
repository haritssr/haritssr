"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode, RefObject } from "react";

import { navigationRoutes } from "@/data/routes";
import type { RouteDoc } from "@/data/routes";

type SearchIndexStatus = "error" | "idle" | "loading" | "ready";

let searchIndexRequest: Promise<readonly RouteDoc[]> | undefined;

interface GlobalSearchContextValue {
  hasOpened: boolean;
  open: boolean;
  openSearch: (trigger: HTMLElement, query?: string) => void;
  prepareSearch: () => void;
  topBarTriggerRef: RefObject<HTMLButtonElement | null>;
}

const GlobalSearchContext = createContext<GlobalSearchContextValue | null>(
  null
);

export function GlobalSearchProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [query, setQuery] = useState("");
  const [entries, setEntries] = useState<readonly RouteDoc[]>(navigationRoutes);
  const [indexStatus, setIndexStatus] = useState<SearchIndexStatus>("idle");
  const requestStartedRef = useRef(false);
  const topBarTriggerRef = useRef<HTMLButtonElement>(null);
  const activeTriggerRef = useRef<HTMLElement>(null);

  const prepareSearch = useCallback(() => {
    void loadGlobalSearchDialog();

    if (requestStartedRef.current) {
      return;
    }

    requestStartedRef.current = true;
    setIndexStatus("loading");

    async function loadSearchIndex() {
      try {
        const searchEntries = await requestSearchIndex();
        setEntries(searchEntries);
        setIndexStatus("ready");
      } catch {
        requestStartedRef.current = false;
        setIndexStatus("error");
      }
    }

    void loadSearchIndex();
  }, []);

  const openSearch = useCallback(
    (trigger: HTMLElement, initialQuery = "") => {
      activeTriggerRef.current = trigger;
      setQuery(initialQuery);
      prepareSearch();
      setHasOpened(true);
      setOpen(true);
    },
    [prepareSearch]
  );

  const contextValue = useMemo(
    () => ({ hasOpened, open, openSearch, prepareSearch, topBarTriggerRef }),
    [hasOpened, open, openSearch, prepareSearch]
  );

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "p" &&
        !event.altKey &&
        !event.shiftKey &&
        !event.isComposing
      ) {
        event.preventDefault();
        event.stopPropagation();
        if (!event.repeat) {
          prepareSearch();
          setHasOpened(true);
          activeTriggerRef.current = topBarTriggerRef.current;
          setQuery("");
          setOpen((previous) => !previous);
        }
      }
    }

    function closeSearch() {
      setOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("popstate", closeSearch);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      window.removeEventListener("popstate", closeSearch);
    };
  }, [prepareSearch]);

  return (
    <GlobalSearchContext.Provider value={contextValue}>
      {children}
      {hasOpened ? (
        <GlobalSearchDialog
          entries={entries}
          indexStatus={indexStatus}
          onOpenChange={setOpen}
          onQueryChange={setQuery}
          onRetry={prepareSearch}
          open={open}
          query={query}
          triggerRef={activeTriggerRef}
        />
      ) : null}
    </GlobalSearchContext.Provider>
  );
}

export function useGlobalSearch() {
  const context = useContext(GlobalSearchContext);
  if (!context) {
    throw new Error("Global search must be used inside GlobalSearchProvider");
  }
  return context;
}

export default function TopBarSearch() {
  const { hasOpened, open, openSearch, prepareSearch, topBarTriggerRef } =
    useGlobalSearch();

  return (
    <button
      aria-controls={hasOpened ? "global-search-dialog" : undefined}
      aria-expanded={open}
      aria-haspopup="dialog"
      aria-keyshortcuts="Meta+P Control+P"
      aria-label="Search the site"
      className="text-foreground focus-visible:outline-action hover:text-searchicon-hover flex size-9 cursor-pointer items-center justify-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2"
      onClick={(event) => {
        openSearch(event.currentTarget);
      }}
      onFocus={prepareSearch}
      onPointerEnter={prepareSearch}
      ref={topBarTriggerRef}
      title="Search"
      type="button"
    >
      <MagnifyingGlassIcon aria-hidden="true" className="size-4.5 stroke-2" />
    </button>
  );
}

const loadGlobalSearchDialog = async () => await import("./GlobalSearchDialog");
const GlobalSearchDialog = dynamic(loadGlobalSearchDialog);

function isRouteDoc(value: unknown): value is RouteDoc {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Partial<RouteDoc>;
  return (
    typeof candidate.description === "string" &&
    typeof candidate.group === "string" &&
    typeof candidate.route === "string" &&
    typeof candidate.title === "string" &&
    (candidate.suggestion === undefined ||
      candidate.suggestion === "Navigation")
  );
}

async function fetchSearchIndex(): Promise<readonly RouteDoc[]> {
  const response = await fetch("/api/search-index");
  if (!response.ok) {
    throw new Error(`Search index request failed: ${response.status}`);
  }

  const searchIndexPayload: unknown = await response.json();
  if (
    !Array.isArray(searchIndexPayload) ||
    !searchIndexPayload.every(isRouteDoc)
  ) {
    throw new TypeError("Search index response is invalid");
  }

  return searchIndexPayload;
}

async function requestSearchIndex(): Promise<readonly RouteDoc[]> {
  searchIndexRequest ??= fetchSearchIndex();

  try {
    return await searchIndexRequest;
  } catch (error: unknown) {
    searchIndexRequest = undefined;
    throw error;
  }
}
