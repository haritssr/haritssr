"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import { Dialog } from "@base-ui/react/dialog";
import {
  ChevronRightIcon,
  CodeBracketIcon,
  MagnifyingGlassIcon,
  LinkIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import type { RefObject } from "react";
import { useRef } from "react";

import { useSharePageUrl } from "@/components/SharePageProvider";
import type { RouteDoc } from "@/data/routes";
import {
  commitsRoute,
  getSearchMatchRanges,
  hasSearchQuery,
  navigationRoutes,
  searchRoutes,
} from "@/data/routes";
import { topLevelNavigation } from "@/data/topLevelNavigation";
import {
  commandWords,
  matchesCommand,
} from "@/utils/navigation/commandMatching";
import type { SourceCodeCommand } from "@/utils/navigation/sourceCodeCommands";
import { getSourceCodeCommands } from "@/utils/navigation/sourceCodeCommands";

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

interface PageSearchItem {
  kind: "page";
  title: string;
  entry: RouteDoc;
}

interface ShareCommand {
  kind: "share";
  title: string;
}

const SHARE_COMMAND: ShareCommand = {
  kind: "share",
  title: "Share: Copy page URL",
};
type SearchItem = SourceCodeCommand | ShareCommand | PageSearchItem;

const RESULT_ITEM_CLASS_NAME =
  "data-highlighted:bg-foreground/5 relative flex cursor-pointer items-center gap-2.25 rounded-xl border border-transparent px-2 py-1.5 transition-colors duration-150 select-none motion-reduce:transition-none";

interface SearchMatchTextProps {
  query: string;
  text: string;
}

const MAIN_ROUTES = new Set<string>(
  topLevelNavigation
    .filter(({ route }) => route !== "/")
    .map(({ route }) => route)
);

const TOOL_ENTRIES = ["/timer", "/commits", "/tree", "/music", "/url"].flatMap(
  (route) => {
    const entry = [...navigationRoutes, commitsRoute].find(
      (candidate) => candidate.route === route
    );
    return entry ? [entry] : [];
  }
);

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
  const selectedItemRef = useRef(false);
  const router = useRouter();
  const sharePageUrl = useSharePageUrl();
  const isSearching = hasSearchQuery(query);
  const isLoading = indexStatus === "loading";
  const loadError = indexStatus === "error";
  const showLoading = isLoading && isSearching;
  const sourceCodeCommands = getSourceCodeCommands(
    isSearching ? query : "github"
  );
  const shareCommands =
    !isSearching ||
    matchesCommand(commandWords(query), [
      "share",
      "copy",
      "link",
      "url",
      "page",
    ])
      ? [SHARE_COMMAND]
      : [];
  const commandCount = sourceCodeCommands.length + shareCommands.length;
  const pageEntries = searchRoutes(entries, query);
  const pages: PageSearchItem[] = showLoading
    ? []
    : pageEntries.map((entry) => ({
        kind: "page",
        title: entry.title,
        entry,
      }));
  const commands: SearchItem[] = [...shareCommands, ...sourceCodeCommands];
  const tools: PageSearchItem[] = TOOL_ENTRIES.map((entry) => ({
    kind: "page",
    title: entry.title,
    entry,
  }));
  const results: SearchItem[] = isSearching
    ? [...commands, ...pages]
    : [...pages, ...commands, ...tools];
  const showEmpty =
    !isLoading && !loadError && isSearching && results.length === 0;
  const { listLabel, resultStatus } = getSearchLabels(
    indexStatus,
    isSearching,
    results.length,
    commandCount
  );

  function selectItem(item: SearchItem) {
    selectedItemRef.current = true;
    if (item.kind === "share") {
      void sharePageUrl();
    } else if (item.kind === "source-code") {
      window.open(item.url, "_blank", "noopener,noreferrer");
    } else {
      router.push(item.entry.route);
    }
    onOpenChange(false);
  }

  return (
    <Dialog.Root onOpenChange={onOpenChange} open={open}>
      <Dialog.Portal>
        <Dialog.Backdrop className="bg-foreground/30 fixed inset-0 z-90 backdrop-blur-xs transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup
          className={`${styles.popup} corner-squircle border-middle-hover text-foreground bg-background z-90 flex flex-col overflow-hidden rounded-t-2xl border shadow-xl outline-hidden supports-[corner-shape:squircle]:rounded-t-4xl sm:rounded-xl sm:supports-[corner-shape:squircle]:rounded-3xl`}
          finalFocus={() =>
            selectedItemRef.current ? false : triggerRef.current
          }
          id="global-search-dialog"
          initialFocus={() => {
            selectedItemRef.current = false;
            return inputRef.current;
          }}
        >
          <Dialog.Title className="sr-only">Search the site</Dialog.Title>
          <Dialog.Description className="sr-only">
            Search pages, type share to copy this page URL, or type GitHub or
            source code to open this site&apos;s repository in a new tab. Use
            arrow keys to browse results and Enter to select.
          </Dialog.Description>
          <Autocomplete.Root
            autoHighlight="always"
            filter={null}
            inline
            items={results}
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
            <Autocomplete.InputGroup className="flex shrink-0 items-center gap-3 py-2.5 pr-2.5 pl-4">
              <MagnifyingGlassIcon
                aria-hidden="true"
                className="text-foreground size-5 shrink-0"
              />
              <Autocomplete.Input
                aria-label="Search pages and commands"
                autoComplete="off"
                className="placeholder:text-muted min-w-0 flex-1 border-0 bg-transparent p-0 text-base outline-none focus:ring-0"
                enterKeyHint="go"
                placeholder="Search pages or commands…"
                ref={inputRef}
                spellCheck={false}
              />
              <Autocomplete.Clear
                aria-label="Clear search"
                className="bg-foreground/5 text-muted hover:bg-foreground/8 hover:text-foreground focus-visible:outline-action shrink-0 cursor-pointer rounded-lg px-2 py-1 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none"
                tabIndex={0}
              >
                Clear
              </Autocomplete.Clear>
              <Dialog.Close
                aria-label="Close search"
                className="border-border bg-background/70 text-foreground shadow-foreground/5 hover:text-action focus-visible:outline-action hover:before:bg-foreground/8 relative isolate flex size-10.5 shrink-0 cursor-pointer items-center justify-center rounded-full border shadow-sm backdrop-blur-md transition-colors duration-150 [corner-shape:round] before:pointer-events-none before:absolute before:inset-1 before:-z-10 before:rounded-full before:transition-colors before:duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.95] motion-reduce:transition-none motion-reduce:before:transition-none"
                type="button"
              >
                <XMarkIcon
                  aria-hidden="true"
                  className="size-5"
                  strokeWidth={2.5}
                />
              </Dialog.Close>
            </Autocomplete.InputGroup>
            <div
              aria-busy={isLoading && commandCount === 0}
              className="scrollbar-subtle min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 pb-2"
            >
              {loadError ? (
                <div
                  className="px-4 py-10 text-center text-sm leading-6"
                  role="alert"
                >
                  <p className="text-danger">
                    The complete search index could not be loaded. Navigation
                    and commands are still available.
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
                  No pages or commands found for “{query}”. Try a topic, page
                  name, share, or GitHub.
                </div>
              ) : null}
              <Autocomplete.List
                aria-label={listLabel}
                className={`${styles.results} space-y-2`}
              >
                <Autocomplete.Collection>
                  {(item: SearchItem) => {
                    if (item.kind === "share") {
                      return (
                        <Autocomplete.Item
                          className={RESULT_ITEM_CLASS_NAME}
                          key={item.kind}
                          onClick={() => {
                            selectItem(item);
                          }}
                          value={item}
                        >
                          <LinkIcon
                            aria-hidden="true"
                            className="text-muted bg-foreground/5 size-10 shrink-0 rounded-full p-2.5"
                          />
                          <div className="min-w-0 flex-1 space-y-0.5">
                            <div className="text-sm">{item.title}</div>
                            <div className="text-muted text-xs">
                              Copy the current page link to your clipboard
                            </div>
                          </div>
                        </Autocomplete.Item>
                      );
                    }
                    if (item.kind === "source-code") {
                      return (
                        <SourceCodeCommandItem
                          command={item}
                          key={item.url}
                          onSelect={selectItem}
                        />
                      );
                    }
                    return (
                      <SearchResultItem
                        item={item}
                        isSearching={isSearching}
                        key={item.entry.route}
                        onSelect={selectItem}
                        query={query}
                      />
                    );
                  }}
                </Autocomplete.Collection>
              </Autocomplete.List>
            </div>
            <div className="border-middle-hover text-muted flex shrink-0 items-center justify-between gap-4 border-t px-5 py-2.5 text-xs">
              <output aria-live="polite">{resultStatus}</output>
              <span aria-hidden="true" className="hidden sm:inline">
                ↑ ↓ navigate · ↵ select · esc close
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

function SourceCodeCommandItem({
  command,
  onSelect,
}: {
  command: SourceCodeCommand;
  onSelect: (item: SearchItem) => void;
}) {
  return (
    <Autocomplete.Item
      className={RESULT_ITEM_CLASS_NAME}
      onClick={() => {
        onSelect(command);
      }}
      value={command}
    >
      <CodeBracketIcon
        aria-hidden="true"
        className="text-muted bg-foreground/5 size-10 shrink-0 rounded-full p-2.5"
      />
      <div className="min-w-0 flex-1 space-y-0.5">
        <div className="text-sm">{command.title}</div>
        <div className="text-muted text-xs">Opens in a new tab</div>
      </div>
    </Autocomplete.Item>
  );
}

function SearchResultItem({
  item,
  query,
  isSearching,
  onSelect,
}: {
  item: PageSearchItem;
  query: string;
  isSearching: boolean;
  onSelect: (item: SearchItem) => void;
}) {
  const { entry } = item;
  return (
    <Autocomplete.Item
      className={RESULT_ITEM_CLASS_NAME}
      onClick={() => {
        onSelect(item);
      }}
      value={item}
    >
      <div className="min-w-0 flex-1 space-y-0.5">
        <div className="text-foreground truncate text-sm">{entry.title}</div>
        {!isSearching || MAIN_ROUTES.has(entry.route) ? (
          <div className="text-foreground/70 truncate text-xs">
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
  resultCount: number,
  commandCount: number
) {
  const resultStatus = isSearching
    ? `${resultCount} ${resultCount === 1 ? "result" : "results"}`
    : "Jump to a page or search commands";
  const commandStatus = `${commandCount} ${commandCount === 1 ? "command" : "commands"}`;

  if (indexStatus === "error") {
    return {
      listLabel: "Commands and navigation fallback",
      resultStatus: `${resultStatus} · Full page search unavailable`,
    };
  }

  let status = resultStatus;
  if (indexStatus === "loading") {
    status =
      commandCount > 0
        ? `${commandStatus} · Loading pages…`
        : "Loading all pages…";
  }

  return {
    listLabel: isSearching
      ? "Pages and commands"
      : "Suggested pages and commands",
    resultStatus: status,
  };
}
