# Architecture Decision Records

This directory records decisions that shape the structure, dependencies, and
long-term maintenance of the site.

Each ADR captures one decision. Accepted ADRs are historical records: when a
decision changes, add a new ADR and link the older record to it instead of
rewriting the old record.

Older ADRs may refer to the former `data/writing/` directory. Blog posts now
live in `data/blog/`.

## Conventions

- Use a monotonically increasing number and a descriptive kebab-case filename.
- Keep each record short and put the decision near the beginning.
- Record the context, important alternatives, consequences, confidence, and
  conditions that should trigger a review.
- Use `proposed`, `accepted`, or `superseded` as the status.

## Decisions

- [0001 — Use the Next.js App Router](./0001-use-nextjs-app-router.md)
- [0002 — Use Content Collections for blog content](./0002-use-content-collections-for-blog-content.md) (superseded)
- [0003 — Use Effect for TOC file processing](./0003-use-effect-for-toc-file-processing.md) (superseded)
- [0004 — Use Ultracite and Biome for code quality](./0004-use-ultracite-and-biome-for-code-quality.md) (superseded)
- [0005 — Support an installable PWA with a small custom service worker](./0005-support-installable-pwa.md) (superseded)
- [0006 — Use Ultracite with Oxlint and Oxfmt for code quality](./0006-use-ultracite-and-oxlint-oxfmt-for-code-quality.md)
- [0007 — Use Next.js MDX for writing content](./0007-use-nextjs-mdx-for-writing-content.md) (superseded)
- [0008 — Keep SQLite experiments local-only](./0008-keep-sqlite-experiments-local-only.md)
- [0009 — Keep public content searchable while opting out of AI training](./0009-keep-public-content-searchable-while-opting-out-of-ai-training.md)
- [0010 — Use native APIs for small utilities](./0010-use-native-apis-for-small-utilities.md)

- [0011 — Discover blog modules with Turbopack](./0011-discover-blog-modules-with-turbopack.md)
- [0012 — Use a self-contained offline fallback](./0012-use-a-self-contained-offline-fallback.md)
