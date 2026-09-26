"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";

import { navigationRoutes } from "@/data/routes";
import type { RouteDoc } from "@/data/routes";

const loadGlobalSearchDialog = async () => await import("./GlobalSearchDialog");
const GlobalSearchDialog = dynamic(loadGlobalSearchDialog);

type SearchIndexStatus = "error" | "idle" | "loading" | "ready";

let searchIndexRequest: Promise<readonly RouteDoc[]> | undefined;

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

export default function TopBarSearch() {
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [entries, setEntries] = useState<readonly RouteDoc[]>(navigationRoutes);
  const [indexStatus, setIndexStatus] = useState<SearchIndexStatus>("idle");
  const requestStartedRef = useRef(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

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

  function openSearch() {
    prepareSearch();
    setHasOpened(true);
    setOpen(true);
  }

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
    <>
      <button
        aria-controls={hasOpened ? "global-search-dialog" : undefined}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-keyshortcuts="Meta+P Control+P"
        aria-label="Search the site"
        className="text-foreground focus-visible:outline-action hover:text-searchicon-hover flex size-9 cursor-pointer items-center justify-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2"
        onClick={openSearch}
        onFocus={prepareSearch}
        onPointerEnter={prepareSearch}
        ref={triggerRef}
        title="Search (⌘P / Ctrl+P)"
        type="button"
      >
        <MagnifyingGlassIcon aria-hidden="true" className="size-4.5 stroke-2" />
      </button>
      {hasOpened ? (
        <GlobalSearchDialog
          entries={entries}
          indexStatus={indexStatus}
          onOpenChange={setOpen}
          onRetry={prepareSearch}
          open={open}
          triggerRef={triggerRef}
        />
      ) : null}
    </>
  );
}
