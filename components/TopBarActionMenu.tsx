"use client";

import { Dialog } from "@base-ui/react/dialog";
import { ListBulletIcon } from "@heroicons/react/24/outline";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

import SharePageProvider from "@/components/SharePageProvider";
import TopBarActions from "@/components/TopBarActions";
import { useGlobalSearch } from "@/components/TopBarSearch";

export default function TopBarActionMenu({
  mobile,
  pathname,
  compact = true,
}: {
  mobile: boolean;
  pathname: string;
  compact?: boolean;
}) {
  return mobile && compact ? (
    <MobileActionMenu pathname={pathname} />
  ) : (
    <div className={compact ? "hidden sm:block" : undefined}>
      <TopBarActions pathname={pathname} />
    </div>
  );
}

function MobileActionMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const searchRequested = useRef(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const { openSearch } = useGlobalSearch();

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    const popup = popupRef.current;
    if (!trigger || !popup) {
      return;
    }
    const rect = trigger.getBoundingClientRect();
    popup.style.top = `${rect.bottom + 12}px`;
    popup.style.right = `${Math.max(16, document.documentElement.clientWidth - rect.right)}px`;
  }, []);

  const setPopupRef = useCallback(
    (element: HTMLDivElement | null) => {
      popupRef.current = element;
      if (element) {
        updatePosition();
      }
    },
    [updatePosition]
  );

  useLayoutEffect(() => {
    if (open) {
      updatePosition();
      window.addEventListener("resize", updatePosition);
      window.visualViewport?.addEventListener("resize", updatePosition);
    }
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.visualViewport?.removeEventListener("resize", updatePosition);
    };
  }, [open, updatePosition]);

  return (
    <SharePageProvider>
      <Dialog.Root
        modal
        open={open}
        onOpenChange={setOpen}
        onOpenChangeComplete={(nextOpen) => {
          if (!nextOpen && searchRequested.current && triggerRef.current) {
            searchRequested.current = false;
            openSearch(triggerRef.current);
          }
        }}
      >
        <div
          className={`floating-surface flex shrink-0 items-center border ${open ? "border-action!" : ""}`}
        >
          <Dialog.Trigger
            aria-label="Page actions"
            title="Page actions"
            data-header-actions-trigger=""
            ref={triggerRef}
            className="focus-visible:outline-action text-foreground flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 sm:size-9 hover:[&>svg]:opacity-50"
          >
            <ListBulletIcon
              aria-hidden="true"
              className="pointer-events-none size-5"
            />
          </Dialog.Trigger>
        </div>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-50" />
          <Dialog.Popup
            ref={setPopupRef}
            onClick={(event) => {
              if (
                event.target instanceof Element &&
                event.target.closest("button, a[href]")
              ) {
                setOpen(false);
              }
            }}
            finalFocus={() =>
              searchRequested.current ? false : triggerRef.current
            }
            className="border-middle-hover text-foreground corner-squircle fixed z-50 w-45 max-w-[calc(100vw-2rem)] overflow-hidden rounded-4xl border bg-white/50 shadow-xl outline-hidden saturate-150 backdrop-blur-lg"
          >
            <Dialog.Title className="sr-only">Page actions</Dialog.Title>
            <TopBarActions
              layout="list"
              pathname={pathname}
              onSearch={() => {
                searchRequested.current = true;
                setOpen(false);
              }}
            />
            <Dialog.Close className="sr-only">Close page actions</Dialog.Close>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </SharePageProvider>
  );
}
