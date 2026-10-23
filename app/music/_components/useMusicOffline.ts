import { useEffect, useState } from "react";

export default function useMusicOffline(
  librarySize: number,
  prepareOnVisit = true
) {
  const [status, setStatus] = useState(() => {
    if (typeof navigator !== "undefined" && !("serviceWorker" in navigator)) {
      return "Offline reopening is unavailable in this browser.";
    }
    return prepareOnVisit
      ? "Preparing offline playback…"
      : "Checking offline availability…";
  });
  useEffect(() => {
    if (
      process.env.NODE_ENV !== "production" ||
      !("serviceWorker" in navigator)
    ) {
      return () => {
        /* No service-worker listeners were installed. */
      };
    }
    let cancelled = false;
    let sequence = 0;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    let port: MessagePort | undefined;
    async function prepare(attempt: number) {
      try {
        const registration = await navigator.serviceWorker.ready;
        if (cancelled || attempt !== sequence) {
          return;
        }
        const worker =
          navigator.serviceWorker.controller ?? registration.active;
        if (!worker) {
          return;
        }
        const channel = new MessageChannel();
        port?.close();
        port = channel.port1;
        port.addEventListener("message", (event: MessageEvent<unknown>) => {
          if (cancelled || attempt !== sequence) {
            return;
          }
          clearTimeout(timeout);
          const ready =
            typeof event.data === "object" &&
            event.data !== null &&
            "ready" in event.data &&
            event.data.ready === true;
          const notReady = prepareOnVisit
            ? "Connect to prepare offline playback."
            : "Open Music while online to prepare offline playback.";
          setStatus(
            ready ? "Player and imported songs available offline" : notReady
          );
          port?.close();
        });
        port.start();
        const assets = [
          ...new Set([
            ...performance
              .getEntriesByType("resource")
              .map((entry) => entry.name),
            ...[
              ...document.querySelectorAll<HTMLScriptElement>("script[src]"),
            ].map((element) => element.src),
            ...[
              ...document.querySelectorAll<HTMLLinkElement>(
                'link[rel="stylesheet"],link[rel="preload"],link[rel="modulepreload"]'
              ),
            ].map((element) => element.href),
          ]),
        ].filter((url) => {
          const parsed = new URL(url, location.href);
          return (
            parsed.origin === location.origin &&
            parsed.pathname.startsWith("/_next/static/")
          );
        });
        worker.postMessage(
          {
            type:
              navigator.onLine && prepareOnVisit
                ? "music-offline-prepare"
                : "music-offline-status",
            assets,
            librarySize,
          },
          [channel.port2]
        );
      } catch {
        clearTimeout(timeout);
        if (!cancelled && attempt === sequence) {
          setStatus("Offline setup failed. Reconnect and reload to retry.");
        }
      }
    }
    const schedule = () => {
      sequence += 1;
      clearTimeout(timeout);
      port?.close();
      timeout = setTimeout(() => {
        if (!cancelled) {
          setStatus("Connect to prepare offline playback.");
        }
        port?.close();
      }, 30_000);
      void prepare(sequence);
    };
    schedule();
    navigator.serviceWorker.addEventListener("controllerchange", schedule);
    window.addEventListener("online", schedule);
    return () => {
      cancelled = true;
      clearTimeout(timeout);
      port?.close();
      navigator.serviceWorker.removeEventListener("controllerchange", schedule);
      window.removeEventListener("online", schedule);
    };
  }, [librarySize, prepareOnVisit]);
  if (process.env.NODE_ENV !== "production") {
    return "Offline reopening is available in production.";
  }
  return status;
}
