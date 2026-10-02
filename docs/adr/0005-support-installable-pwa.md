# 0005: Support an installable PWA with a small custom service worker

- Status: superseded
- Superseded by [0012](0012-use-a-self-contained-offline-fallback.md)
- Date: 2026-08-18
- Confidence: medium

## Context

The site is a content-heavy personal website that benefits from quick repeat
visits and a lightweight offline fallback. The application already exposes a
service worker, registers it only in production, and offers an install prompt
when the browser supports one.

## Decision

Implement the PWA behavior with a small custom service worker at `public/sw.js`.
Cache the root document and successful navigations, serve cached navigations
when the network is unavailable, and version the cache name for invalidation.
Register the worker from the root layout only in production and keep the
service-worker response uncached through the Next.js headers configuration.

## Alternatives

- Remain a regular web application, which would avoid service-worker cache
  lifecycle concerns but provide no install or offline experience.
- Adopt a PWA or Workbox framework, which could provide more strategies but
  would add configuration and dependency overhead for the current scope.

## Consequences

- Visitors can install the site and navigate to previously cached pages during
  a network outage.
- Cache names and caching behavior must be changed deliberately when the
  application shell or offline behavior changes.
- The service worker currently provides a best-effort navigation fallback, not
  a complete offline data model for every asset or interaction.
- Production-only registration avoids affecting local development behavior.

## Revisit when

Revisit this decision if offline support must cover authenticated data or more
resource types, if cache invalidation becomes difficult to maintain, or if the
site no longer needs installability.
