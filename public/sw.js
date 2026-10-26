const CACHE_NAME = "haritssr-offline-v4";
const OFFLINE_URL = "/offline.html";
const OWNED_PREFIXES = ["haritssr-shell-", "haritssr-offline-"];
const MUSIC_URL = "/music";
const ASSET_DOWNLOAD_LIMIT = 4;
const FETCH_TIMEOUT_MS = 20_000;

const openTimer = async () => {
  const clients = await self.clients.matchAll({
    type: "window",
    includeUncontrolled: true,
  });
  const timer = clients.find(
    (client) => new URL(client.url).pathname === "/timer"
  );
  await (timer ? timer.focus() : self.clients.openWindow("/timer"));
};

const installOfflineFallback = async () => {
  try {
    const cache = await caches.open(CACHE_NAME);
    await cache.add(OFFLINE_URL);
  } catch {
    // Cache storage is optional; the worker also has a plain-text fallback.
  }
  await self.skipWaiting();
};

const activateOfflineFallback = async () => {
  try {
    const names = await caches.keys();
    await Promise.all(
      names
        .filter(
          (name) =>
            name !== CACHE_NAME &&
            OWNED_PREFIXES.some((prefix) => name.startsWith(prefix))
        )
        .map((name) => caches.delete(name))
    );
  } catch {
    // Cache storage is optional; the worker also has a plain-text fallback.
  }
  await self.clients.claim();
};

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

const isImmutableAsset = (response) =>
  response.ok &&
  /(?:^|,)\s*immutable\s*(?:,|$)/i.test(
    response.headers.get("cache-control") ?? ""
  );

const musicAssetUrl = (value) => {
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
  const response = await fetch(MUSIC_URL, {
    credentials: "omit",
    cache: "no-cache",
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
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
    ...new Set([...assets, ...embedded].map(musicAssetUrl).filter(Boolean)),
  ];
  if (!urls.length) {
    throw new Error("Music assets are unavailable.");
  }
  const cache = await caches.open(MUSIC_CACHE);
  // Bound concurrent downloads on small devices. Commit the document last so a
  // failed update never replaces the previous complete offline shell.
  for (let index = 0; index < urls.length; index += ASSET_DOWNLOAD_LIMIT) {
    // oxlint-disable-next-line no-await-in-loop -- Limit concurrent asset downloads on small devices.
    await Promise.all(
      urls.slice(index, index + ASSET_DOWNLOAD_LIMIT).map(async (url) => {
        const saved = await cache.match(url);
        if (saved && isImmutableAsset(saved)) {
          return;
        }
        const asset = await fetch(url, {
          credentials: "omit",
          signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
        });
        if (!isImmutableAsset(asset)) {
          throw new Error("Music asset is unavailable or not immutable.");
        }
        await cache.put(url, asset);
      })
    );
  }
  await cache.put(MUSIC_URL, response);
};

const prepareMusicOffline = async (assets) => {
  // Serialize updates so two tabs cannot publish mismatched document/assets.
  musicPreparation = Promise.resolve(musicPreparation)
    .catch(() => {
      // A failed earlier preparation must not block the next attempt.
    })
    .then(async () => {
      await cacheMusicShell(assets);
    });
  await musicPreparation;
};

const handleMusicMessage = async (event) => {
  try {
    if (event.data.type === "music-offline-prepare") {
      const assets = Array.isArray(event.data.assets)
        ? event.data.assets.filter((asset) => typeof asset === "string")
        : [];
      await prepareMusicOffline(assets);
    }
  } catch {
    // A previously prepared shell is still usable if a refresh fails.
  }
  try {
    const cache = await caches.open(MUSIC_CACHE);
    event.ports[0]?.postMessage({
      ready: Boolean(await cache.match(MUSIC_URL)),
    });
  } catch {
    event.ports[0]?.postMessage({ ready: false });
  }
};

const serveMusicAsset = async (request, clientId) => {
  try {
    const cache = await caches.open(MUSIC_CACHE);
    const saved = await cache.match(request);
    if (saved && isImmutableAsset(saved)) {
      return saved;
    }
    if (saved) {
      await cache.delete(request);
    }
  } catch {
    /* Network remains available when cache storage is blocked. */
  }
  const response = await fetch(request);
  const client = clientId ? await self.clients.get(clientId) : null;
  if (
    isImmutableAsset(response) &&
    client &&
    new URL(client.url).pathname === MUSIC_URL
  ) {
    try {
      const cache = await caches.open(MUSIC_CACHE);
      await cache.put(request, response.clone());
    } catch {
      /* Offline preparation reports cache failures separately. */
    }
  }
  return response;
};

const serveNavigation = async (request, pathname) =>
  await fetch(request).catch(async () => {
    if (pathname === MUSIC_URL) {
      try {
        const cache = await caches.open(MUSIC_CACHE);
        const saved = await cache.match(MUSIC_URL);
        if (saved) {
          return saved;
        }
      } catch {
        /* Use the generic offline fallback when Music is not prepared. */
      }
    }
    return await offlineResponse();
  });

self.addEventListener("notificationclick", (event) => {
  if (!event.notification.tag.startsWith("timer-")) {
    return;
  }
  event.notification.close();
  event.waitUntil(openTimer());
});

self.addEventListener("install", (event) => {
  event.waitUntil(installOfflineFallback());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(activateOfflineFallback());
});

self.addEventListener("message", (event) => {
  if (
    event.data?.type === "music-offline-prepare" ||
    event.data?.type === "music-offline-status"
  ) {
    event.waitUntil(handleMusicMessage(event));
  }
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (
    request.method !== "GET" ||
    url.origin !== self.location.origin ||
    url.pathname.startsWith("/api/")
  ) {
    return;
  }
  if (musicAssetUrl(url.href)) {
    event.respondWith(serveMusicAsset(request, event.clientId));
    return;
  }
  // RSC, prefetch, and API requests never receive cached HTML documents.
  if (request.mode === "navigate") {
    event.respondWith(serveNavigation(request, url.pathname));
  }
});
