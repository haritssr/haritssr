"use client";

import { Popover } from "@base-ui/react/popover";
import { QueueListIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";

import {
  TOP_BAR_CAPSULE_CLASS_NAME,
  topBarActionClassName,
} from "./TopBarAction";
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
    <div className={TOP_BAR_CAPSULE_CLASS_NAME}>
      <CompactActionMenu pathname={pathname} onSearch={onSearch} />
    </div>
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
        className={topBarActionClassName()}
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
  );
}
