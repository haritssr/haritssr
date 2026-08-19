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
      className="cursor-pointer select-none text-zinc-400 hover:text-zinc-800"
      onClick={installApp}
      type="button"
    >
      Install
    </button>
  );
}
