# Progressive Web App

The site is configured as an installable Progressive Web App (PWA).
Installation requires HTTPS in production, plus a browser that supports web
app installation. See [ADR 0005](adr/0005-support-installable-pwa.md)
for the architectural rationale.

## Current implementation

- `app/manifest.ts` defines the app identity, scope, display mode, theme, and
  install icons.
- `components/ServiceWorkerRegistration.tsx` registers the service worker in
  production.
- `components/PWAInstallPrompt.tsx` exposes the browser's native install prompt
  when supported.
- `public/sw.js` caches the app shell and cacheable same-origin navigations,
  with the home page as an offline fallback. It excludes API responses and
  responses marked `private` or `no-store`.
- `next.config.ts` prevents stale service-worker responses by setting no-cache
  headers for `/sw.js`.

## Planned follow-ups

- Add Web Push notifications with VAPID keys and durable subscription storage.
- Replace the minimal navigation cache with a deliberate offline strategy for
  static assets and content, possibly using Serwist.
- Add automated Lighthouse or Playwright checks for manifest, installability,
  service-worker registration, and offline behavior.
- Add an iOS-specific installation hint because Safari does not expose
  `beforeinstallprompt`.
