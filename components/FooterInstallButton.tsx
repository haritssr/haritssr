"use client";

import { useEffect, useState } from "react";

const ACTION_CLASS_NAME =
  "cursor-pointer rounded-sm select-none transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
};

function isBeforeInstallPromptEvent(
  event: Event
): event is BeforeInstallPromptEvent {
  return "prompt" in event && typeof event.prompt === "function";
}

export default function FooterInstallButton() {
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
