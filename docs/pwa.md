# Progressive Web App

The site is installable over HTTPS in supporting browsers. The offline behavior
is a clear fallback page, not an offline copy of the experiments or articles.

- `app/manifest.ts` defines the app identity and icons.
- `components/FooterActions.tsx` offers the native install prompt where available.
- `components/ServiceWorkerRegistration.tsx` registers the worker only in production.
- `public/sw.js` pre-caches only `public/offline.html`. That document uses inline
  styling and system fonts, so it needs no framework scripts or remote assets.
- Successful network navigations return directly, independently of cache writes.
  Failed same-origin document navigations show the offline fallback. API requests,
  assets, and client navigation requests retain their normal browser behavior.
- Activation deletes only older caches owned by this worker, including the
  previous HTML navigation caches. `/sw.js` keeps its no-cache response headers.

See [ADR 0012](adr/0012-use-a-self-contained-offline-fallback.md).

Validate in a production browser: install or register the worker online, disable
network access, and reload a visited and an unvisited URL. Both should show the
fallback. Reconnect and reload to recover. Check that updates remove old owned
caches and preserve unrelated caches. No full offline-content support is promised.
