"use client";

import { Toast } from "@base-ui/react/toast";
import { useEffect, useState } from "react";

const ACTION_CLASS_NAME =
  "cursor-pointer rounded-sm select-none transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current";
const SHARE_TOAST_ID = "share-toast";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
};

interface FooterActionsProps {
  rssPath: string;
}

export default function FooterActions({ rssPath }: FooterActionsProps) {
  return (
    <Toast.Provider>
      <div className="flex items-center gap-5">
        <InstallButton />
        <a className={ACTION_CLASS_NAME} href={rssPath}>
          RSS
        </a>
        <ShareButton />
      </div>
      <Toast.Portal>
        <Toast.Viewport className="fixed right-0 bottom-0 z-2147483647 m-0 flex w-97.5 max-w-[100vw] list-none flex-col gap-2.5 p-3 outline-hidden sm:p-6">
          <ShareToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}

function isBeforeInstallPromptEvent(
  event: Event
): event is BeforeInstallPromptEvent {
  return "prompt" in event && typeof event.prompt === "function";
}

function InstallButton() {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      if (isBeforeInstallPromptEvent(event)) {
        setInstallPrompt(event);
      }
    };
    const handleAppInstalled = () => {
      setInstallPrompt(null);
    };

    window.addEventListener("appinstalled", handleAppInstalled);
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("appinstalled", handleAppInstalled);
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  if (installPrompt === null) {
    return null;
  }

  const handleInstall = async () => {
    setInstallPrompt(null);
    try {
      await installPrompt.prompt();
    } catch (error: unknown) {
      console.error("Unable to show the install prompt.", error);
    }
  };

  return (
    <button
      className={ACTION_CLASS_NAME}
      onClick={() => {
        void handleInstall();
      }}
      type="button"
    >
      Install
    </button>
  );
}

function ShareButton() {
  const toastManager = Toast.useToastManager();

  const handleShare = async () => {
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
  };

  return (
    <button
      className={ACTION_CLASS_NAME}
      onClick={() => {
        void handleShare();
      }}
      type="button"
    >
      Share
    </button>
  );
}

function ShareToastList() {
  const { toasts } = Toast.useToastManager();

  return toasts.map((toast) => (
    <Toast.Root
      className="data-ending-style:animate-out data-ending-style:fade-out data-ending-style:slide-out-to-right data-starting-style:animate-in data-starting-style:fade-in data-starting-style:slide-in-from-right border-border rounded-lg border bg-white/70 shadow-xl saturate-150 backdrop-blur-md transition-[transform,opacity] duration-200 ease-out"
      key={toast.id}
      swipeDirection="right"
      toast={toast}
    >
      <Toast.Content className="grid grid-cols-[auto_max-content] items-center gap-x-3.75 py-2 pr-4 pl-4 [grid-template-areas:'title_action'_'description_action']">
        <div>
          <Toast.Title className="text-foreground mb-1.25 text-[15px] font-medium [grid-area:title]" />
          <Toast.Description className="text-foreground/60 m-0 text-[13px] leading-[1.3] [grid-area:description]" />
        </div>
        <Toast.Close className="text-action hover:text-action-hover focus-visible:outline-action h-12 w-12 cursor-pointer rounded-sm focus-visible:outline-2">
          OK
        </Toast.Close>
      </Toast.Content>
    </Toast.Root>
  ));
}
