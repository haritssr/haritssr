const CACHE_NAME = "haritssr-offline-v4";
const OFFLINE_URL = "/offline.html";
const OWNED_PREFIXES = ["haritssr-shell-", "haritssr-offline-"];

self.addEventListener("notificationclick", (event) => {
  if (!event.notification.tag.startsWith("timer-")) {
    return;
  }
  event.notification.close();
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then(async (clients) => {
        const timer = clients.find(
          (client) => new URL(client.url).pathname === "/timer"
        );
        await (timer ? timer.focus() : self.clients.openWindow("/timer"));
      })
  );
});

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

// Music keeps its public document and immutable app assets separate from the
// generic offline fallback. Imported audio and private library data live in
// IndexedDB; included public songs stream online without being cached here.
const MUSIC_CACHE = "haritssr-music-v1";
let musicPreparation;

const immutableAsset = (response) =>
  response.ok &&
  /(?:^|,)\s*immutable\s*(?:,|$)/i.test(
    response.headers.get("cache-control") ?? ""
  );

const musicAsset = (value) => {
  try {
    const url = new URL(value, self.location.origin);
    return url.origin === self.location.origin &&
      url.pathname.startsWith("/_next/static/")
      ? url.href
      : null;
  } catch {
    return null;
  }
};

const cacheMusicShell = async (assets) => {
  const response = await fetch("/music", {
    credentials: "omit",
    cache: "no-cache",
    signal: AbortSignal.timeout(20_000),
  });
  if (
    !response.ok ||
    !response.headers.get("content-type")?.includes("text/html")
  ) {
    throw new Error("Music document is unavailable.");
  }
  const html = await response.clone().text();
  const embedded = Array.from(
    html.matchAll(/\/_next\/static\/[^"'<>\\\s]+/g),
    (match) => match[0].replaceAll("&amp;", "&")
  );
  const urls = [
    ...new Set([...assets, ...embedded].map(musicAsset).filter(Boolean)),
  ];
  if (!urls.length) {
    throw new Error("Music assets are unavailable.");
  }
  const cache = await caches.open(MUSIC_CACHE);
  // Bound concurrent downloads on small devices. Commit the document last so a
  // failed update never replaces the previous complete offline shell.
  for (let index = 0; index < urls.length; index += 4) {
    // oxlint-disable-next-line no-await-in-loop -- Limit concurrent asset downloads on small devices.
    await Promise.all(
      urls.slice(index, index + 4).map(async (url) => {
        const saved = await cache.match(url);
        if (saved && immutableAsset(saved)) {
          return;
        }
        const asset = await fetch(url, {
          credentials: "omit",
          signal: AbortSignal.timeout(20_000),
        });
        if (!immutableAsset(asset)) {
          throw new Error("Music asset is unavailable or not immutable.");
        }
        await cache.put(url, asset);
      })
    );
  }
  await cache.put("/music", response);
};

self.addEventListener("message", (event) => {
  if (
    event.data?.type !== "music-offline-prepare" &&
    event.data?.type !== "music-offline-status"
  ) {
    return;
  }
  event.waitUntil(
    (async () => {
      try {
        if (event.data.type === "music-offline-prepare") {
          const assets = Array.isArray(event.data.assets)
            ? event.data.assets.filter((asset) => typeof asset === "string")
            : [];
          // Serialize updates so two tabs cannot publish mismatched document/assets.
          musicPreparation = Promise.resolve(musicPreparation)
            .catch(() => {
              // A failed earlier preparation must not block the next attempt.
            })
            .then(async () => {
              await cacheMusicShell(assets);
            });
          await musicPreparation;
        }
      } catch {
        // A previously prepared shell is still usable if a refresh fails.
      }
      try {
        const cache = await caches.open(MUSIC_CACHE);
        event.ports[0]?.postMessage({
          ready: Boolean(await cache.match("/music")),
        });
      } catch {
        event.ports[0]?.postMessage({ ready: false });
      }
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (
    event.request.method !== "GET" ||
    url.origin !== self.location.origin ||
    url.pathname.startsWith("/api/")
  ) {
    return;
  }
  if (musicAsset(url.href)) {
    event.respondWith(
      (async () => {
        try {
          const cache = await caches.open(MUSIC_CACHE);
          const saved = await cache.match(event.request);
          if (saved && immutableAsset(saved)) {
            return saved;
          }
          if (saved) {
            await cache.delete(event.request);
          }
        } catch {
          /* Network remains available when cache storage is blocked. */
        }
        const response = await fetch(event.request);
        const client = event.clientId
          ? await self.clients.get(event.clientId)
          : null;
        if (
          immutableAsset(response) &&
          client &&
          new URL(client.url).pathname === "/music"
        ) {
          try {
            const cache = await caches.open(MUSIC_CACHE);
            await cache.put(event.request, response.clone());
          } catch {
            /* Offline preparation reports cache failures separately. */
          }
        }
        return response;
      })()
    );
    return;
  }
  // RSC, prefetch, and API requests never receive cached HTML documents.
  if (event.request.mode !== "navigate") {
    return;
  }
  event.respondWith(
    fetch(event.request).catch(async () => {
      if (url.pathname === "/music") {
        try {
          const cache = await caches.open(MUSIC_CACHE);
          const saved = await cache.match("/music");
          if (saved) {
            return saved;
          }
        } catch {
          /* Use the generic offline fallback when Music is not prepared. */
        }
      }
      return await offlineResponse();
    })
  );
});
