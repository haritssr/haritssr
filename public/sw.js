const CACHE_NAME = "haritssr-offline-v1";
const OFFLINE_URL = "/offline.html";
const OWNED_PREFIXES = ["haritssr-shell-", "haritssr-offline-"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.add(OFFLINE_URL))
      .catch(() => {
        // Cache storage is optional; the worker also has a plain-text fallback.
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(
          names
            .filter(
              (name) =>
                name !== CACHE_NAME &&
                OWNED_PREFIXES.some((prefix) => name.startsWith(prefix))
            )
            .map((name) => caches.delete(name))
        )
      )
      .catch(() => {
        // Cache storage is optional; the worker also has a plain-text fallback.
      })
      .then(() => self.clients.claim())
  );
});

const offlineResponse = async () => {
  try {
    const cache = await caches.open(CACHE_NAME);
    const fallback = await cache.match(OFFLINE_URL);
    if (fallback) {
      return fallback;
    }
  } catch {
    // Online navigation remains usable even when cache storage is unavailable.
  }
  return new Response("You’re offline. Reconnect and refresh to continue.", {
    status: 503,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (
    event.request.mode !== "navigate" ||
    url.origin !== self.location.origin ||
    url.pathname.startsWith("/api/")
  ) {
    return;
  }
  event.respondWith(fetch(event.request).catch(offlineResponse));
});
