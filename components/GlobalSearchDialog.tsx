"use client";

import { Dialog } from "@base-ui/react/dialog";
import {
  ArrowUpRightIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import type { RefObject } from "react";
import { useRef, useState } from "react";

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
  onRetry: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}

interface SearchMatchTextProps {
  query: string;
  text: string;
}

const MAIN_ROUTES = new Set(["/projects", "/experiments", "/blog", "/design"]);

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
    <Command.Item
      className="data-[selected=true]:bg-interface-hover data-[selected=true]:border-border-interface-hover flex cursor-pointer items-center gap-4 rounded-xl border border-white px-3 py-3 select-none data-[selected=true]:border"
      onSelect={onSelect}
      value={entry.route}
    >
      <div className="min-w-0 flex-1 space-y-1">
        <div className="truncate text-sm font-medium">{entry.title}</div>
        {!isSearching || MAIN_ROUTES.has(entry.route) ? (
          <div className="text-foreground/60 truncate text-xs">
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
          <div className="text-foreground/40 truncate text-xs">
            {entry.route}
          </div>
        ) : null}
      </div>
      <ArrowUpRightIcon
        aria-hidden="true"
        className="text-foreground/40 size-4 shrink-0"
      />
    </Command.Item>
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

export default function GlobalSearchDialog({
  entries,
  indexStatus,
  open,
  onOpenChange,
  onRetry,
  triggerRef,
}: GlobalSearchDialogProps) {
  const [query, setQuery] = useState("");
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
    <Dialog.Root
      onOpenChange={onOpenChange}
      onOpenChangeComplete={(isOpen) => {
        if (!isOpen) {
          setQuery("");
        }
      }}
      open={open}
    >
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
          <Command
            className="flex min-h-0 flex-1 flex-col"
            label="Site search"
            loop
            shouldFilter={false}
            vimBindings={false}
          >
            <div className="border-border flex shrink-0 items-center gap-3 border-b px-5 py-3.5">
              <MagnifyingGlassIcon
                aria-hidden="true"
                className="text-foreground size-5 shrink-0"
              />
              <Command.Input
                aria-label="Search pages"
                autoComplete="off"
                className="placeholder:text-foreground/50 min-w-0 flex-1 border-0 bg-transparent p-0 text-base outline-none focus:ring-0"
                enterKeyHint="go"
                onValueChange={setQuery}
                placeholder="Search pages, projects, experiments, blog…"
                ref={inputRef}
                spellCheck={false}
                value={query}
              />
              <Dialog.Close
                aria-label="Close search"
                className="text-foreground/60 focus-visible:outline-action flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg focus-visible:outline-2"
                type="button"
              >
                <XMarkIcon aria-hidden="true" className="size-5" />
              </Dialog.Close>
            </div>
            <Command.List
              aria-busy={isLoading}
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2"
              label={listLabel}
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
                <div className="text-foreground/60 px-4 py-10 text-center text-sm leading-6">
                  Loading all pages…
                </div>
              ) : null}
              {showEmpty ? (
                <div className="text-foreground/60 px-4 py-10 text-center text-sm leading-6">
                  No pages found for “{query}”. Try a project, topic, or page
                  name.
                </div>
              ) : null}
              {!showLoading && results.length > 0 ? (
                <Command.Group
                  className="**:[[cmdk-group-heading]]:text-foreground/50 **:[[cmdk-group-heading]]:px-3 **:[[cmdk-group-heading]]:pt-2 **:[[cmdk-group-heading]]:pb-2 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium"
                  heading={groupTitle}
                >
                  {results.map((entry) => (
                    <SearchResultItem
                      entry={entry}
                      isSearching={isSearching}
                      key={entry.route}
                      onSelect={navigate}
                      query={query}
                    />
                  ))}
                </Command.Group>
              ) : null}
            </Command.List>
            <div className="border-border text-foreground/50 flex shrink-0 items-center justify-between gap-4 border-t px-5 py-3 text-xs">
              <output aria-live={loadError ? "off" : "polite"}>
                {resultStatus}
              </output>
              <span aria-hidden="true" className="hidden sm:inline">
                ↑ ↓ navigate · ↵ open · esc close
              </span>
            </div>
          </Command>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
