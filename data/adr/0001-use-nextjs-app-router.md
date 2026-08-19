# 0001: Use the Next.js App Router

- Status: accepted
- Date: 2023-08-17
- Confidence: high

## Context

The site contains content pages, blog routes, metadata, sitemap generation,
and interactive experiments. These routes benefit from colocated layouts,
server-first rendering, and route-level metadata. The repository migrated its
main routes from the Pages Router to the `app/` directory.

## Decision

Use the Next.js App Router as the routing and rendering model for the site.

Routes should live under `app/`, shared route structure should use layouts, and
server-side work should remain in server components or server utilities unless
the browser requires client-side behavior.

## Alternatives

- Continue using the Pages Router, which would preserve the older routing model
  but limit access to App Router conventions used by the current site.
- Maintain a long-term split between the Pages Router and App Router, which
  would increase the number of routing models contributors need to understand.

## Consequences

- Route metadata, static parameters, sitemap generation, and layouts use App
  Router APIs.
- Components must explicitly opt into client behavior when they use browser
  APIs or React client hooks.
- Next.js upgrades need to account for App Router-specific API changes,
  including asynchronous route parameters.

## Revisit when

Revisit this decision if the site needs a routing capability that App Router
cannot provide, or if the application moves to a framework with a different
server/client rendering model.
