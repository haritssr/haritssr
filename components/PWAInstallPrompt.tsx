"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
};

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
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
    await deferredPrompt?.prompt();
    setDeferredPrompt(null);
  }

  return (
    <button
      className="fixed right-4 bottom-20 z-90 rounded-full bg-black px-4 py-2 font-medium text-sm text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
      onClick={installApp}
      type="button"
    >
      Install app
    </button>
  );
}
