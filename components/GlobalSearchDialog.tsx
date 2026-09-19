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
import { searchRoutes } from "@/data/routes";

import styles from "./GlobalSearchDialog.module.css";

interface GlobalSearchDialogProps {
  entries: readonly RouteDoc[];
  isLoading: boolean;
  loadError: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}

export default function GlobalSearchDialog({
  entries,
  isLoading,
  loadError,
  open,
  onOpenChange,
  triggerRef,
}: GlobalSearchDialogProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const results = searchRoutes(entries, query);
  const isSearching = query.trim().length > 0;
  const groups = [
    { title: isSearching ? "Search results" : "Navigation", entries: results },
  ];
  let resultStatus = "Jump to a page";
  if (isLoading) {
    resultStatus = "Loading all pages…";
  } else if (isSearching) {
    resultStatus = `${results.length} results`;
  }

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
            Search pages, projects, writing, and experiments. Use the arrow keys
            to browse results and Enter to open a page.
          </Dialog.Description>
          <Command
            className="flex min-h-0 flex-1 flex-col"
            label="Site search"
            loop
            shouldFilter={false}
            vimBindings={false}
          >
            <div className="border-border flex shrink-0 items-center gap-3 border-b px-4 py-3">
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
                placeholder="Search projects, experiments, writings, ... "
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
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2"
              label={isSearching ? "Search results" : "Suggested pages"}
            >
              {loadError ? (
                <output className="text-danger block px-4 py-12 text-center text-sm">
                  The complete search index could not be loaded. Try opening
                  search again.
                </output>
              ) : null}
              {!isLoading && !loadError && results.length === 0 ? (
                <output className="text-foreground/60 block px-4 py-12 text-center text-sm">
                  No pages found for “{query}”. Try a project, topic, or page
                  name.
                </output>
              ) : null}
              {groups.map((group) => (
                <Command.Group
                  heading={group.title}
                  key={group.title}
                  className="**:[[cmdk-group-heading]]:text-foreground/50 **:[[cmdk-group-heading]]:px-3 **:[[cmdk-group-heading]]:pt-3 **:[[cmdk-group-heading]]:pb-2 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium"
                >
                  {group.entries.map((entry) => (
                    <Command.Item
                      className="data-[selected=true]:bg-interface-hover data-[selected=true]:border-border-interface-hover flex cursor-pointer items-center gap-3 rounded-xl border border-white px-3 py-3 select-none data-[selected=true]:border sm:py-2.5"
                      key={entry.route}
                      onSelect={navigate}
                      value={entry.route}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium">
                          {entry.title}
                        </div>
                        <div className="text-foreground/60 truncate text-xs">
                          {isSearching
                            ? `${entry.group} · ${entry.description}`
                            : entry.description}
                        </div>
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
                  ))}
                </Command.Group>
              ))}
            </Command.List>
            <div className="border-border text-foreground/50 flex shrink-0 items-center justify-between border-t px-4 py-3 text-xs">
              <output aria-live="polite">{resultStatus}</output>
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
