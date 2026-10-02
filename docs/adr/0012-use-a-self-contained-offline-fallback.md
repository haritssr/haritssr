# 0012: Use a self-contained offline fallback

- Status: accepted
- Date: 2026-10-03
- Confidence: high
- Supersedes [0005](0005-support-installable-pwa.md)

## Decision

Keep installability and the small custom service worker. Cache only a standalone
offline document with inline CSS and system fonts. Serve online document requests
directly and show the fallback when the network is unavailable. Do not cache
Next.js HTML without its deployment-specific scripts and assets.

## Consequences

The offline screen works without React or remote resources. Cache storage errors
do not replace successful network responses. Cleanup targets only this worker's
cache prefixes, including its older navigation caches. Offline reading and
interactive experiments are not supported; client navigation retains the normal
Next.js behavior.

## Alternatives and review

Complete saved-content support would need asset lifecycle management and a clear
user-facing save/update workflow. Revisit if that becomes a product requirement.
