"use client";

import { Toast } from "@base-ui/react/toast";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useCallback, useEffect } from "react";
import type { ReactNode } from "react";

import {
  playCompletionRing,
  playTaskSound,
  prepareTaskSound,
} from "@/app/(tools)/timer/utils/timerSound";
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
  const ringing = toasts.some(
    (toast) =>
      (toast.type === "timer-completion" ||
        toast.type === "timer-completion-pending") &&
      toast.transitionStatus !== "ending"
  );

  useEffect(() => {
    if (!ringing) {
      return () => {
        /* No completion sound is active. */
      };
    }
    let stopRing = () => {
      /* No ring has played yet. */
    };
    const ring = () => {
      stopRing();
      stopRing = playCompletionRing(prepareTaskSound());
    };
    ring();
    const interval = window.setInterval(ring, 2500);
    return () => {
      window.clearInterval(interval);
      stopRing();
    };
  }, [ringing]);

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
      <Toast.Viewport className="pointer-events-auto -m-3 flex max-h-[40dvh] w-[calc(100%+1.5rem)] list-none flex-col gap-3 overflow-y-auto p-3 outline-hidden sm:w-[calc(22.4rem+1.5rem)]">
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
                    onClick={() => {
                      playTaskSound(prepareTaskSound(), "done");
                    }}
                    aria-label={
                      toast.type === "timer-completion" ||
                      toast.type === "timer-completion-pending"
                        ? "Done"
                        : "Dismiss notification"
                    }
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
