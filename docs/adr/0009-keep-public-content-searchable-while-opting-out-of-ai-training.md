# Keep public content searchable while opting out of AI training

- Status: accepted
- Date: 2026-09-17
- Confidence: high

## Context

The site publishes public writing that should remain discoverable through
search engines, while search crawlers and AI-training crawlers increasingly
serve different purposes. The app currently exposes a general `robots.txt`
policy and uses `www.haritssr.com` as its canonical URL.

## Decision

Keep Vercel as the application host and treat Cloudflare as an optional edge
control layer. The canonical domain should remain searchable, while the
production crawler policy should use Cloudflare's Search: Allow, Training:
Disallow AI Training, and Agent: Allow settings when Cloudflare is enabled.

The repository will keep public pages indexable, exclude `/api/` from crawler
discovery, and use the canonical site URL in public links. Vendor-specific AI
crawler rules should be managed by Cloudflare Bot Preference Sync rather than
hardcoded in the application.

## Alternatives

- Allow all crawlers, which maximizes reuse but gives up the training opt-out.
- Migrate the application to Cloudflare, which is unnecessary because the
  crawler controls can sit in front of the existing Vercel origin.
- Hardcode individual AI user agents, which duplicates an external bot policy
  and becomes stale as crawler identities and support change.

## Consequences

- Search visibility, sitemap generation, RSS, and writing metadata remain
  unchanged.
- `/api/` is no longer advertised as crawlable, but robots rules are not an
  access-control boundary for direct requests.
- Without a Cloudflare proxy, the no-training preference remains voluntary.
- The known `haritssr.vercel.app` alias redirects to the canonical domain so it
  cannot bypass the canonical domain's edge policy. Other generated deployment
  URLs remain a Vercel deployment-protection concern.

## Revisit when

Revisit this decision if the site adds advertising, private content, user data,
authenticated APIs, or a need to block AI agents separately from AI training.
