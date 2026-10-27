"use client";

import { Toast } from "@base-ui/react/toast";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useCallback } from "react";
import type { ReactNode } from "react";

import Button from "@/components/Button";
import { FloatingDockNotice } from "@/components/floating/FloatingDock";
import FloatingNotification, {
  FLOATING_NOTIFICATION_CLASS_NAME,
} from "@/components/floating/FloatingNotification";

const SHARE_TOAST_ID = "share-toast";

export default function SharePageProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Toast.Provider limit={Number.POSITIVE_INFINITY} timeout={0}>
      {children}
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

export function ShareToastViewport() {
  const { toasts } = Toast.useToastManager();

  if (toasts.length === 0) {
    return null;
  }

  return (
    <FloatingDockNotice>
      {toasts.length > 1 && (
        <p className="text-muted text-right text-xs" aria-live="polite">
          {toasts.length} notifications
        </p>
      )}
      <Toast.Viewport className="pointer-events-auto m-0 flex max-h-[40dvh] w-full list-none flex-col gap-3 overflow-y-auto outline-hidden sm:w-[22.4rem]">
        {toasts.map((toast) => (
          <Toast.Root
            className={`${FLOATING_NOTIFICATION_CLASS_NAME} data-ending-style:animate-out data-ending-style:fade-out data-ending-style:slide-out-to-right data-starting-style:animate-in data-starting-style:fade-in data-starting-style:slide-in-from-right shrink-0 transition-[transform,opacity] duration-200 ease-out`}
            key={toast.id}
            swipeDirection={[]}
            toast={toast}
          >
            <Toast.Content>
              <FloatingNotification
                action={
                  <Toast.Close
                    aria-label="Dismiss notification"
                    render={
                      <Button
                        data-timer-play=""
                        size="icon-circle"
                        variant="primary-subtle"
                      />
                    }
                  >
                    <CheckIcon
                      aria-hidden="true"
                      className="size-4.5"
                      strokeWidth={2.5}
                    />
                  </Toast.Close>
                }
              >
                <Toast.Title className="text-foreground text-sm leading-5 font-medium" />
                <Toast.Description className="text-muted m-0 truncate text-xs leading-4" />
              </FloatingNotification>
            </Toast.Content>
          </Toast.Root>
        ))}
      </Toast.Viewport>
    </FloatingDockNotice>
  );
}
