"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import { Dialog } from "@base-ui/react/dialog";
import {
  CheckIcon,
  ChevronRightIcon,
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import type { RefObject } from "react";
import { useRef } from "react";

import { useTheme } from "@/components/ThemeProvider";
import type { RouteDoc } from "@/data/routes";
import {
  getSearchMatchRanges,
  hasSearchQuery,
  searchRoutes,
} from "@/data/routes";
import type { ThemeCommand } from "@/utils/themeCommands";
import { getThemeCommands } from "@/utils/themeCommands";

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

type SearchItem = ThemeCommand | PageSearchItem;

const RESULT_ITEM_CLASS_NAME =
  "data-highlighted:bg-interface-hover data-highlighted:border-border-interface-hover corner-squircle flex cursor-pointer items-center gap-4 rounded-xl border border-transparent py-2 pr-3 pl-3 select-none";

interface SearchMatchTextProps {
  query: string;
  text: string;
}

const MAIN_ROUTES = new Set([
  "/projects",
  "/experiments",
  "/writing",
  "/design",
]);

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
  const { preference, setPreference } = useTheme();
  const isSearching = hasSearchQuery(query);
  const isLoading = indexStatus === "loading";
  const loadError = indexStatus === "error";
  const showLoading = isLoading && isSearching;
  const themeCommands = getThemeCommands(query);
  const commandCount = themeCommands.length;
  const pages: PageSearchItem[] = showLoading
    ? []
    : searchRoutes(entries, query).map((entry) => ({
        kind: "page",
        title: entry.title,
        entry,
      }));
  const results: SearchItem[] = [...themeCommands, ...pages];
  const showEmpty =
    !isLoading && !loadError && isSearching && results.length === 0;
  const { groupTitle, listLabel, resultStatus } = getSearchLabels(
    indexStatus,
    isSearching,
    results.length,
    commandCount
  );

  function selectItem(item: SearchItem) {
    if (item.kind === "theme") {
      setPreference(item.preference);
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
            Search pages or change appearance with theme commands. Use arrow
            keys to browse results and Enter to select.
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
            <Autocomplete.InputGroup className="flex shrink-0 items-center gap-3 py-2.5 pr-3 pl-4">
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
              <Dialog.Close
                aria-label="Close search"
                className="text-muted focus-visible:outline-action flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg focus-visible:outline-2"
                type="button"
              >
                <XMarkIcon aria-hidden="true" className="size-5" />
              </Dialog.Close>
            </Autocomplete.InputGroup>
            <div
              aria-busy={isLoading && commandCount === 0}
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 pb-2"
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
                  name, or theme.
                </div>
              ) : null}
              <Autocomplete.List aria-label={listLabel}>
                {themeCommands.length > 0 ? (
                  <Autocomplete.Group items={themeCommands}>
                    <Autocomplete.GroupLabel className="text-muted px-3 pt-1 pb-2 text-xs font-medium">
                      Theme
                    </Autocomplete.GroupLabel>
                    <Autocomplete.Collection>
                      {(command: ThemeCommand) => (
                        <ThemeCommandItem
                          command={command}
                          current={preference === command.preference}
                          key={command.preference}
                          onSelect={selectItem}
                        />
                      )}
                    </Autocomplete.Collection>
                  </Autocomplete.Group>
                ) : null}
                {pages.length > 0 ? (
                  <Autocomplete.Group items={pages}>
                    <Autocomplete.GroupLabel className="text-muted px-3 pt-1 pb-2 text-xs font-medium">
                      {groupTitle}
                    </Autocomplete.GroupLabel>
                    <Autocomplete.Collection>
                      {(item: PageSearchItem) => (
                        <SearchResultItem
                          item={item}
                          isSearching={isSearching}
                          key={item.entry.route}
                          onSelect={selectItem}
                          query={query}
                        />
                      )}
                    </Autocomplete.Collection>
                  </Autocomplete.Group>
                ) : null}
              </Autocomplete.List>
            </div>
            <div className="border-middle-hover text-muted in-data-[theme=dark]:border-middle-hover/50 flex shrink-0 items-center justify-between gap-4 border-t px-5 py-3 text-xs">
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

function ThemeCommandItem({
  command,
  current,
  onSelect,
}: {
  command: ThemeCommand;
  current: boolean;
  onSelect: (item: SearchItem) => void;
}) {
  const Icon = {
    light: SunIcon,
    dark: MoonIcon,
    system: ComputerDesktopIcon,
  }[command.preference];
  return (
    <Autocomplete.Item
      className={RESULT_ITEM_CLASS_NAME}
      onClick={() => {
        onSelect(command);
      }}
      value={command}
    >
      <Icon aria-hidden="true" className="text-muted size-5 shrink-0" />
      <span className="min-w-0 flex-1 text-sm">{command.title}</span>
      {current ? (
        <span className="text-muted flex items-center gap-2 text-xs">
          Current
          <CheckIcon aria-hidden="true" className="size-4 shrink-0" />
        </span>
      ) : null}
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
  resultCount: number,
  commandCount: number
) {
  const resultStatus = isSearching
    ? `${resultCount} ${resultCount === 1 ? "result" : "results"}`
    : "Jump to a page or search commands";
  const commandStatus = `${commandCount} ${commandCount === 1 ? "command" : "commands"}`;

  if (indexStatus === "error") {
    return {
      groupTitle: "Navigation fallback",
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
    groupTitle: isSearching ? "Search results" : "Navigation",
    listLabel: isSearching ? "Pages and commands" : "Suggested pages",
    resultStatus: status,
  };
}
