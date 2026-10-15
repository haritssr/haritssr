"use client";

import { useEffect, useState } from "react";

import InternalLink from "@/components/InternalLink";
import { apiRoute } from "@/data/routes";

const ACTION_CLASS_NAME =
  "cursor-pointer rounded-sm select-none transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
};

interface FooterActionsProps {
  rssPath: string;
}

export default function FooterActions({ rssPath }: FooterActionsProps) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-x-4 sm:gap-x-6">
      <InternalLink href={apiRoute.route} variant="footer">
        {apiRoute.title}
      </InternalLink>
      <InternalLink href={rssPath} variant="footer">
        RSS
      </InternalLink>
      <InstallButton />
    </div>
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
