# Keep SQLite experiments local-only

- Status: accepted
- Date: 2026-09-12

## Decision

The task and tools SQLite experiments run only when `NODE_ENV` is not
`production`. Production navigation and sitemap generation omit them, and
direct page or API requests return 404.

Local databases default to `.data-haritssr/` within the repository. The
`TASK_DB_DIR` and `TOOLS_DB_DIR` environment variables can override that path
for local development and tests.

## Context

The experiments have no user identity or authorization model. Their previous
absolute macOS storage path was not portable, and a serverless filesystem would
not provide durable production storage.

## Consequences

- Local development retains the complete SQLite experiments.
- Public visitors cannot read or mutate shared experimental data.
- Production deployment does not require a writable local filesystem.
- Enabling these features in production requires authentication,
  authorization, request limits, and durable external storage first.
