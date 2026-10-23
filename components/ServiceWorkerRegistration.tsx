"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    const registerServiceWorker = async () => {
      try {
        if (process.env.NODE_ENV !== "production") {
          await refreshDevelopmentWorker();
          return;
        }
        await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
          updateViaCache: "none",
        });
      } catch (error: unknown) {
        console.error("Service worker registration failed:", error);
      }
    };

    void registerServiceWorker();
  }, []);

  return null;
}

async function refreshDevelopmentWorker() {
  const registration = await navigator.serviceWorker.getRegistration("/");
  if (
    registration?.active?.scriptURL !== new URL("/sw.js", location.origin).href
  ) {
    return;
  }
  await registration.update();
  const installing = registration.installing ?? registration.waiting;
  if (installing && installing.state !== "activated") {
    // oxlint-disable-next-line promise/avoid-new -- Service worker activation is an event, not a promise API.
    await new Promise<void>((resolve) => {
      const finish = () => {
        clearTimeout(timeout);
        installing.removeEventListener("statechange", changed);
        resolve();
      };
      const changed = () => {
        if (
          installing.state === "activated" ||
          installing.state === "redundant"
        ) {
          finish();
        }
      };
      const timeout = setTimeout(finish, 10_000);
      installing.addEventListener("statechange", changed);
      changed();
    });
  }
  if (!("caches" in window)) {
    return;
  }
  const names = await caches.keys();
  const removed = await Promise.all(
    names
      .filter((name) => name.startsWith("haritssr-music-"))
      .map(async (name) => {
        const cache = await caches.open(name);
        const requests = await cache.keys();
        const stale = await Promise.all(
          requests
            .filter((request) =>
              new URL(request.url).pathname.startsWith("/_next/static/")
            )
            .map(async (request) => {
              const response = await cache.match(request);
              return (
                response !== undefined &&
                !/(?:^|,)\s*immutable\s*(?:,|$)/i.test(
                  response.headers.get("cache-control") ?? ""
                )
              );
            })
        );
        return stale.some(Boolean) && (await caches.delete(name));
      })
  );
  if (removed.some(Boolean) && navigator.serviceWorker.controller) {
    location.reload();
  }
}
