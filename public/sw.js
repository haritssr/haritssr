const CACHE_NAME = "haritssr-shell-v2";
const OFFLINE_URL = "/";

const canCacheResponse = (response) => {
  const cacheControl = response.headers.get("Cache-Control") ?? "";
  return (
    response.ok &&
    response.type === "basic" &&
    !cacheControl.includes("no-store") &&
    !cacheControl.includes("private")
  );
};

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.add(OFFLINE_URL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);
  if (
    event.request.mode !== "navigate" ||
    requestUrl.origin !== self.location.origin ||
    requestUrl.pathname.startsWith("/api/")
  ) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(async (response) => {
        if (canCacheResponse(response)) {
          const responseToCache = response.clone();
          const cache = await caches.open(CACHE_NAME);
          await cache.put(event.request, responseToCache);
        }

        return response;
      })
      .catch(() => caches.match(event.request))
      .then((response) => response || caches.match(OFFLINE_URL))
  );
});
