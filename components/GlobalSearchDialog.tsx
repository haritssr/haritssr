"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import { Dialog } from "@base-ui/react/dialog";
import {
  ChevronRightIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import type { RefObject } from "react";
import { useRef } from "react";

import type { RouteDoc } from "@/data/routes";
import {
  getSearchMatchRanges,
  hasSearchQuery,
  searchRoutes,
} from "@/data/routes";

import styles from "./GlobalSearchDialog.module.css";

interface GlobalSearchDialogProps {
  entries: readonly RouteDoc[];
  indexStatus: "error" | "idle" | "loading" | "ready";
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onQueryChange: (query: string) => void;
  onRetry: () => void;
  query: string;
  triggerRef: RefObject<HTMLElement | null>;
}

interface SearchMatchTextProps {
  query: string;
  text: string;
}

const MAIN_ROUTES = new Set(["/projects", "/experiments", "/blog", "/design"]);

export default function GlobalSearchDialog({
  entries,
  indexStatus,
  open,
  onOpenChange,
  onQueryChange,
  onRetry,
  query,
  triggerRef,
}: GlobalSearchDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const results = searchRoutes(entries, query);
  const isSearching = hasSearchQuery(query);
  const isLoading = indexStatus === "loading";
  const loadError = indexStatus === "error";
  const showLoading = isLoading && isSearching;
  const showEmpty =
    !isLoading && !loadError && isSearching && results.length === 0;
  const { groupTitle, listLabel, resultStatus } = getSearchLabels(
    indexStatus,
    isSearching,
    results.length
  );

  function navigate(route: string) {
    onOpenChange(false);
    router.push(route);
  }

  return (
    <Dialog.Root onOpenChange={onOpenChange} open={open}>
      <Dialog.Portal>
        <Dialog.Backdrop className="bg-foreground/30 fixed inset-0 z-90 backdrop-blur-xs transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup
          className={`${styles.popup} bg-background border-border text-foreground z-90 flex flex-col overflow-hidden rounded-t-3xl border shadow-xl outline-hidden sm:rounded-2xl`}
          finalFocus={triggerRef}
          id="global-search-dialog"
          initialFocus={inputRef}
        >
          <div
            aria-hidden="true"
            className="bg-border mx-auto mt-3 h-1 w-10 shrink-0 rounded-full sm:hidden"
          />
          <Dialog.Title className="sr-only">Search the site</Dialog.Title>
          <Dialog.Description className="sr-only">
            Search navigation, projects, blog, design, and experiments. Use the
            arrow keys to browse results and Enter to open a page.
          </Dialog.Description>
          <Autocomplete.Root
            autoHighlight="always"
            filter={null}
            inline
            items={showLoading ? [] : results}
            itemToStringValue={(entry) => entry.title}
            keepHighlight
            loopFocus={false}
            onValueChange={(value, details) => {
              if (details.reason !== "item-press") {
                onQueryChange(value);
              }
            }}
            open
            value={query}
          >
            <Autocomplete.InputGroup className="border-border flex shrink-0 items-center gap-3 border-b py-2.5 pr-3 pl-4">
              <MagnifyingGlassIcon
                aria-hidden="true"
                className="text-foreground size-5 shrink-0"
              />
              <Autocomplete.Input
                aria-label="Search pages"
                autoComplete="off"
                className="placeholder:text-muted min-w-0 flex-1 border-0 bg-transparent p-0 text-base outline-none focus:ring-0"
                enterKeyHint="go"
                placeholder="Search pages, projects, experiments, blog…"
                ref={inputRef}
                spellCheck={false}
              />
              <Dialog.Close
                aria-label="Close search"
                className="text-muted focus-visible:outline-action flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg focus-visible:outline-2"
                type="button"
              >
                <XMarkIcon aria-hidden="true" className="size-5" />
              </Dialog.Close>
            </Autocomplete.InputGroup>
            <div
              aria-busy={isLoading}
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 pb-2"
            >
              {loadError ? (
                <div
                  className="px-4 py-10 text-center text-sm leading-6"
                  role="alert"
                >
                  <p className="text-danger">
                    The complete search index could not be loaded. Navigation is
                    still available.
                  </p>
                  <button
                    className="text-action hover:text-action-hover focus-visible:outline-action mt-4 cursor-pointer rounded-sm hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
                    onClick={onRetry}
                    type="button"
                  >
                    Try again
                  </button>
                </div>
              ) : null}
              {showLoading ? (
                <div className="text-muted px-4 py-10 text-center text-sm leading-6">
                  Loading all pages…
                </div>
              ) : null}
              {showEmpty ? (
                <div className="text-muted px-4 py-10 text-center text-sm leading-6">
                  No pages found for “{query}”. Try a project, topic, or page
                  name.
                </div>
              ) : null}
              <Autocomplete.List aria-label={listLabel}>
                {!showLoading && results.length > 0 ? (
                  <Autocomplete.Group>
                    <Autocomplete.GroupLabel className="text-muted px-3 pt-1 pb-2 text-xs font-medium">
                      {groupTitle}
                    </Autocomplete.GroupLabel>
                    <Autocomplete.Collection>
                      {(entry: RouteDoc) => (
                        <SearchResultItem
                          entry={entry}
                          isSearching={isSearching}
                          key={entry.route}
                          onSelect={navigate}
                          query={query}
                        />
                      )}
                    </Autocomplete.Collection>
                  </Autocomplete.Group>
                ) : null}
              </Autocomplete.List>
            </div>
            <div className="border-border text-muted flex shrink-0 items-center justify-between gap-4 border-t px-5 py-3 text-xs">
              <output aria-live={loadError ? "off" : "polite"}>
                {resultStatus}
              </output>
              <span aria-hidden="true" className="hidden sm:inline">
                ↑ ↓ navigate · ↵ open · esc close
              </span>
            </div>
          </Autocomplete.Root>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function SearchMatchText({ query, text }: SearchMatchTextProps) {
  const ranges = getSearchMatchRanges(text, query);
  if (ranges.length === 0) {
    return text;
  }

  const parts = [];
  let offset = 0;
  for (const range of ranges) {
    if (range.start > offset) {
      parts.push(text.slice(offset, range.start));
    }
    parts.push(
      <mark
        className="text-foreground bg-transparent"
        key={`${range.start}-${range.end}`}
      >
        {text.slice(range.start, range.end)}
      </mark>
    );
    offset = range.end;
  }
  if (offset < text.length) {
    parts.push(text.slice(offset));
  }

  return parts;
}

function SearchResultItem({
  entry,
  query,
  isSearching,
  onSelect,
}: {
  entry: RouteDoc;
  query: string;
  isSearching: boolean;
  onSelect: (route: string) => void;
}) {
  return (
    <Autocomplete.Item
      className="data-highlighted:bg-interface-hover data-highlighted:border-border-interface-hover corner-squircle flex cursor-pointer items-center gap-4 rounded-xl border border-white py-2.5 pr-3 pl-3 select-none"
      onClick={() => {
        onSelect(entry.route);
      }}
      value={entry}
    >
      <div className="min-w-0 flex-1 space-y-1">
        <div className="truncate text-sm">{entry.title}</div>
        {!isSearching || MAIN_ROUTES.has(entry.route) ? (
          <div className="text-muted truncate text-xs">
            {isSearching ? (
              <SearchMatchText
                query={query}
                text={`${entry.group} · ${entry.description}`}
              />
            ) : (
              entry.description
            )}
          </div>
        ) : null}
        {isSearching ? (
          <div className="text-muted truncate text-xs">{entry.route}</div>
        ) : null}
      </div>
      <ChevronRightIcon
        aria-hidden="true"
        className="text-muted size-5 shrink-0"
      />
    </Autocomplete.Item>
  );
}

function getSearchLabels(
  indexStatus: GlobalSearchDialogProps["indexStatus"],
  isSearching: boolean,
  resultCount: number
) {
  if (indexStatus === "error") {
    return {
      groupTitle: "Navigation fallback",
      listLabel: "Navigation fallback",
      resultStatus: "Full search unavailable",
    };
  }

  const resultStatus = isSearching
    ? `${resultCount} results`
    : "Jump to a page";

  return {
    groupTitle: isSearching ? "Search results" : "Navigation",
    listLabel: isSearching ? "Search results" : "Suggested pages",
    resultStatus:
      indexStatus === "loading" ? "Loading all pages…" : resultStatus,
  };
}
