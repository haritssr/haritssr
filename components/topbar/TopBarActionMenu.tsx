"use client";

import { Popover } from "@base-ui/react/popover";
import { QueueListIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";

import SharePageProvider from "@/components/SharePageProvider";

import TopBarActions from "./TopBarActions";
import { useGlobalSearch } from "./TopBarSearch";

export default function TopBarActionMenu({
  compact,
  pathname,
  onSearch,
}: {
  compact: boolean;
  pathname: string;
  onSearch?: (trigger: HTMLButtonElement) => void;
}) {
  return compact ? (
    <CompactActionMenu pathname={pathname} onSearch={onSearch} />
  ) : (
    <TopBarActions pathname={pathname} onSearch={onSearch} />
  );
}

function CompactActionMenu({
  pathname,
  onSearch,
}: {
  pathname: string;
  onSearch?: (trigger: HTMLButtonElement) => void;
}) {
  const [open, setOpen] = useState(false);
  const searchRequested = useRef(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { openSearch } = useGlobalSearch();
  const requestSearch = () => {
    if (triggerRef.current) {
      (onSearch ?? openSearch)(triggerRef.current);
    }
  };

  return (
    <SharePageProvider>
      <Popover.Root
        modal
        open={open}
        onOpenChange={setOpen}
        onOpenChangeComplete={(nextOpen) => {
          if (!nextOpen && searchRequested.current) {
            searchRequested.current = false;
            requestSearch();
          }
        }}
      >
        <Popover.Trigger
          aria-label="Page actions"
          title="Page actions"
          ref={triggerRef}
          className="focus-visible:outline-action text-foreground/70 hover:text-foreground flex shrink-0 cursor-pointer items-center justify-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <QueueListIcon aria-hidden="true" className="size-5" />
        </Popover.Trigger>
        <Popover.Portal keepMounted>
          <Popover.Positioner align="end" sideOffset={12} className="z-50">
            <Popover.Popup
              aria-label="Page actions"
              finalFocus={() =>
                searchRequested.current ? false : triggerRef.current
              }
              onClick={(event) => {
                if (
                  event.target instanceof Element &&
                  event.target.closest("button, a[href]") &&
                  !event.target.closest("[data-account-control]")
                ) {
                  setOpen(false);
                }
              }}
              className="border-border text-foreground corner-squircle w-48 max-w-[calc(100vw-2rem)] rounded-2xl border bg-white/80 shadow-xl outline-hidden backdrop-blur-lg"
            >
              <TopBarActions
                layout="list"
                pathname={pathname}
                onSearch={() => {
                  if (open) {
                    searchRequested.current = true;
                    setOpen(false);
                  } else {
                    requestSearch();
                  }
                }}
              />
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    </SharePageProvider>
  );
}
