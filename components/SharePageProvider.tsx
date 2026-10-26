"use client";

import { Toast } from "@base-ui/react/toast";
import { useCallback } from "react";
import type { ReactNode } from "react";

const SHARE_TOAST_ID = "share-toast";

export default function SharePageProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Toast.Provider>
      {children}
      <Toast.Portal>
        <Toast.Viewport className="pointer-events-none fixed right-0 bottom-0 left-0 z-2147483647 m-0 flex list-none flex-col items-center gap-2 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] outline-hidden lg:left-auto lg:w-97.5 lg:max-w-[100vw] lg:p-6">
          <ShareToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}

export function useSharePageUrl() {
  const toastManager = Toast.useToastManager();

  return useCallback(async () => {
    const pageUrl = window.location.href;
    let copied = false;

    try {
      await navigator.clipboard.writeText(pageUrl);
      copied = true;
    } catch (error: unknown) {
      console.error("Unable to copy the page URL.", error);
    }

    toastManager.add({
      description: pageUrl,
      id: SHARE_TOAST_ID,
      title: copied ? "Link copied to clipboard" : "Unable to copy link",
    });
  }, [toastManager]);
}

function ShareToastList() {
  const { toasts } = Toast.useToastManager();

  return toasts.map((toast) => (
    <Toast.Root
      className="data-ending-style:animate-out data-ending-style:fade-out data-ending-style:slide-out-to-right data-starting-style:animate-in data-starting-style:fade-in data-starting-style:slide-in-from-right border-border bg-background/70 shadow-foreground/5 pointer-events-auto w-full rounded-full border p-1 shadow-sm backdrop-blur-md transition-[transform,opacity] duration-200 ease-out [corner-shape:round] sm:max-w-[22.4rem]"
      key={toast.id}
      swipeDirection="right"
      toast={toast}
    >
      <Toast.Content className="flex min-h-11.75 items-center gap-2 pl-5.5">
        <div className="min-w-0 flex-1">
          <Toast.Title className="text-foreground text-sm leading-5 font-medium" />
          <Toast.Description className="text-muted m-0 truncate text-xs leading-4" />
        </div>
        <Toast.Close className="text-action hover:text-action-hover focus-visible:outline-action min-h-11.75 shrink-0 cursor-pointer rounded-full px-4 text-base font-medium [corner-shape:round] focus-visible:outline-2">
          Got it
        </Toast.Close>
      </Toast.Content>
    </Toast.Root>
  ));
}
