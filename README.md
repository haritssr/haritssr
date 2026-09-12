# About This Repo

This repo is Harits Syah's personal site built with Next.js (App Router).

- [`projects`](/projects): Project portfolio and project detail pages.
- [`experiments`](/experiments): Frontend experiments across frameworks and libraries.
- [`writing`](/writing): Writing and notes.
- [`design`](/design): Design system reference.

## Site Structure

```mermaid
%%{init: {'flowchart': {'curve': 'basis'}} }%%
graph TD
  haritssr["www.haritssr.com"]
  haritssr --> home["/"]
  haritssr --> projects["/projects"]
  haritssr --> experiments["/experiments"]
  haritssr --> writing["/writing"]
  haritssr --> design["/design"]
```

## Documentation

- [RSS feed](docs/rss.md): feed usage and generation details.
- [Progressive Web App](docs/pwa.md): installability and service-worker details.
- [Architecture Decision Records](docs/adr/README.md): decisions that shape the site.

## Tooling

- Run `bun run check` to check formatting with Oxfmt and lint with type-aware Oxlint.
- Run `bun run fix` to format files and apply supported lint fixes.
- Run `bun test` to execute the unit and integration tests.
- Run `bun run typecheck` to regenerate Next.js route types and type-check the
  complete project.
- Run `bun run knip` to check for unused files, exports, and dependencies.
- Run `bun run knip:production` to run the same check against production code.
- Use [`utils/sqlite3.js`](utils/sqlite3.js) and
  [`utils/dbExperiment.js`](utils/dbExperiment.js) to inspect the shared
  `experiment.db` or `task.db`. They log table names and sample rows using
  `bun:sqlite`.

## Local database experiments

The task and tools database experiments are available only in development.
They store SQLite files in `.data-haritssr/` by default; set `TASK_DB_DIR` or
`TOOLS_DB_DIR` to override that directory. Production builds omit these
experiments from navigation and the sitemap, and their routes return 404.

They must remain local-only until they have user authentication, authorization,
rate limits, and durable production storage. See
[ADR 0008](docs/adr/0008-keep-sqlite-experiments-local-only.md).

## Author

Harits Syah
[www.haritssr.com](https://www.haritssr.com)

## My Core Skills

- High school and college-level math and physics
- Touch typing
- Deep understanding of the latest JavaScript, TypeScript, React.js, Next.js,
  Effect.ts, and browser internals along with the principles that connect them
  and explain why they work the way they do. This foundation enables building
  modern, optimized user interfaces that align with user experience principles
  at scale.
- Functional Programming
  - Using it as a way to code and understanding React.js functional approach in functional component and concurrent features.
  - Using it as a way to code and understand Effect.ts structured concurrency, which enables many features through a functional approach in conjunction with the `Effect<A, E, R>` monad type.
  - In general, using it as a way to tame complexity, eliminate hidden bugs, and make code easier to test and change.
- Currently learning to integrate authentication, databases, observability,
  and payments. Not yet comfortable highlighting those areas as core skills.
