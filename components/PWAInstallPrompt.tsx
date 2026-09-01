"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
};

function isBeforeInstallPromptEvent(
  event: Event
): event is BeforeInstallPromptEvent {
  return "prompt" in event && typeof event.prompt === "function";
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      if (isBeforeInstallPromptEvent(event)) {
        setDeferredPrompt(event);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  if (!deferredPrompt) {
    return null;
  }

  async function installApp() {
    if (deferredPrompt === null) {
      return;
    }

    await deferredPrompt.prompt();
    setDeferredPrompt(null);
  }

  return (
    <button
      className="cursor-pointer text-zinc-500 select-none hover:text-zinc-800"
      onClick={() => {
        void installApp();
      }}
      type="button"
    >
      Install
    </button>
  );
}
