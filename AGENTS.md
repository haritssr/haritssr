<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Development

- Use Bun. Install with `bun install --frozen-lockfile` only when dependencies
  are missing or differ from the lockfile.
- Reuse the dev server. Run `bun run dev` only when needed and none exists, never
  just for checks. This machine has 8 GB RAM; avoid unnecessary background
  processes and stop temporary ones afterward.
- Never run production builds or use `--webpack` in an agent environment.
  Builds belong to humans/CI. Use `bun run start` only when asked to serve an
  existing build and no server exists; never build first or use it for checks.
- Never launch temporary Chrome, including headless/automation sessions. Reuse
  an existing browser or verify without one.
- Never create, add, rename, or restore `*.test.*`, `*.spec.*`, or files under
  `test/`, `tests/`, or `__tests__/`. Modify existing tests only when explicitly
  requested. Use existing tests or focused non-test checks.
- Use the smallest set of task-specific skills.
- Keep [README.md](README.md) a short public introduction and feature behavior
  on its Details route.

## Verification

- Run applicable checks after the final relevant edit. Reuse unchanged passing
  results and rerun only affected checks after edits or failures. Questions and
  status need no checks. Markdown-only changes need diff/link review; writing
  MDX also needs content validation.

| Command | Trigger |
| --- | --- |
| `bun run check <files...>` | Changed supported source, CSS, or JSON, including classes and JSX copy. Pass changed paths; exclude assets and Markdown/MDX. |
| `bun run check` | Lint/format config, dependencies, or refactors across shared modules and consumers. Otherwise scope it. |
| `bun run typecheck` | Imports/exports, types, props, JSX structure, logic/hooks, API handlers, route folders/params, data shapes, TS/Next config, or type-affecting dependencies. Skip styling, static copy, unchanged-shape values, Markdown, and assets. |
| `bun run knip` | Module/dependency graph changes: imports/exports, source/route files, dependencies, scripts, discovery entry points, or Knip config. |
| `bun run knip:production` | Production entry points, conditional imports, dependency classification, or production Knip config. |
| `bun run validate:content` | Lab catalog/routes, discontinued records, writing MDX/frontmatter, catalog/route/search discovery, frontmatter parsing, or validator utilities. |
| `NODE_ENV=production bun run validate:content` | Content changes that could affect public lab availability, production filters, or local DB gates. |
| `bun run fix <files...>` | Auto-fixable errors in edited files; review the diff. Never fix the whole project for a local change or run on passing/manual-only checks. |

- Simple styling changes need only scoped `check` when contracts and behavior
  stay unchanged. Apply the other triggers above if logic, types, imports, or the
  module graph also change.

# Project guidance

- Inspect `/design` and `app/design/` before UI changes; reuse shared components
  and design tokens. Use Base UI for widgets, except the existing mobile article
  TOC Sheet and supporting controls.
- Use `Section`, `PageHeader`, and `PageTitle` for page layouts. Keep lab
  interactive content full width and render mathematics through `@/utils/katexify`.
- Keep route-specific code beside its page, feature-shared code in `_components/`,
  and site-wide UI in `components/`. Register labs in `app/labs/data.ts`.
- Each tool needs a Details page. Read `app/(tools)/<tool>/details/page.tsx` and
  relevant code for feature behavior and architecture. Do not add route redirects.
- Keep public pages searchable and preserve shared navigation behavior.

# Setup and safeguards

- Commit history uses server-only `TURSO_COMMITS_DATABASE_URL` and
  `TURSO_COMMITS_AUTH_TOKEN`. Import requires a full Git checkout.
- Timer uses server-only `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN`. Run
  `bun run migrate:timer` before schema deployments; back up first. Importing a
  backup with `bun run migrate:timer path/to/backup.json` or `--local-json` writes
  to configured Turso.
- Configure Timer authentication in `.env.local` and deployment with
  `TIMER_GOOGLE_CLIENT_ID`, `TIMER_GOOGLE_CLIENT_SECRET`, `TIMER_GOOGLE_EMAIL`,
  `TIMER_SESSION_SECRET`, and `TIMER_AUTH_ORIGIN`; `TIMER_GOOGLE_USER_ID` is
  optional. Use a Google OAuth Web client with callback
  `{TIMER_AUTH_ORIGIN}/api/timer/auth/callback`; use HTTPS in production.
- Keep credentials server-only. Preserve owner-only Timer authentication,
  server-authoritative writes and completion claims, failed drafts, and the rule
  against automatically resending uncertain writes. Do not store runtime Timer
  tasks in local JSON or IndexedDB.
- Never upload imported Music files or alter their originals. Keep the service
  worker's offline and notification behavior; never cache API/account responses,
  RSC payloads, or unrelated documents, or return HTML for RSC requests.

# Commits

- Commit only with explicit permission; it does not authorize database uploads.
- Use `type(context): message`, e.g. `fix(TopBar): align back icon`. Types:
  `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`.
- Review staged changes and related docs; update guidance in the same change.
  The test-file policy still applies to `test` commits.
- Never generate/restore `changelog.json`. Upload Git history to Turso only when
  explicitly requested with `bun run sync:commits`, never during development,
  builds, or commits. `bun run import:commits --dry-run` validates without DB access.
