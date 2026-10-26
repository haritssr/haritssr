"use client";

import { useSyncExternalStore } from "react";

import Button from "@/components/Button";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
};

let installPrompt: BeforeInstallPromptEvent | null = null;
const listeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) {
    listener();
  }
}

function isBeforeInstallPromptEvent(
  event: Event
): event is BeforeInstallPromptEvent {
  return "prompt" in event && typeof event.prompt === "function";
}

function handleBeforeInstallPrompt(event: Event) {
  if (!isBeforeInstallPromptEvent(event)) {
    return;
  }
  event.preventDefault();
  installPrompt = event;
  notify();
}

function handleAppInstalled() {
  installPrompt = null;
  notify();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    }
  };
}

function getSnapshot() {
  return installPrompt;
}

function getServerSnapshot() {
  return null;
}

async function install() {
  const prompt = installPrompt;
  if (!prompt) {
    return;
  }
  installPrompt = null;
  notify();
  try {
    await prompt.prompt();
  } catch (error: unknown) {
    console.error("Unable to show the install prompt.", error);
  }
}

export default function InstallButton({
  placement = "footer",
}: {
  placement?: "footer" | "feature";
}) {
  const prompt = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
  const isFeature = placement === "feature";

  if (!isFeature && prompt === null) {
    return null;
  }

  if (!isFeature) {
    return (
      <button
        aria-keyshortcuts="Alt+I"
        className="hover:text-foreground focus-visible:text-foreground cursor-pointer rounded-sm transition-colors select-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
        data-install-trigger=""
        onClick={() => {
          void install();
        }}
        type="button"
      >
        Install
      </button>
    );
  }

  return (
    <Button
      aria-keyshortcuts="Alt+I"
      className="w-full"
      data-install-trigger={prompt ? "" : undefined}
      disabled={prompt === null}
      onClick={() => {
        void install();
      }}
      size="mobile-roomy"
      title={
        prompt === null
          ? "Installation isn't available in this browser right now."
          : undefined
      }
      variant="primary"
    >
      Install
    </Button>
  );
}
