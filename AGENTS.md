<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->


# Development and Verification

- Use Bun: `bun install --frozen-lockfile` and `bun run dev`. Reuse the existing
  dev server; never start multiple servers. This machine has 8 GB RAM.
- Never run a production build from an agent environment or use `--webpack`.
  Production builds belong in local human workflows or CI.
- Never launch temporary Chrome, including headless or automation sessions.
  Reuse an already-running browser or use non-browser verification.
- Avoid unnecessary background processes and stop temporary processes afterward.
- Never create, add, rename, or restore test files (`*.test.*`, `*.spec.*`, or
  files under `test/`, `tests/`, or `__tests__/`). Modify existing tests only
  when explicitly requested. Verify with existing tests and non-test checks.
- Use the smallest set of skills specific to the task.
- See [README.md](README.md) for architecture and implementation details.

## Verification

Run only commands whose triggers apply; multiple rows may apply. Check once after
the final relevant edit, reuse unchanged passing results, and rerun only affected
checks after failures or new edits. Questions and status updates need no checks.
Markdown-only documentation needs diff/link review; writing MDX follows the
content rule below. Markdown/MDX are excluded from Oxfmt.

`check` uses Ultracite → Oxfmt + Oxlint (`oxlint-tsgolint` for type-aware rules).
`typecheck` separately runs Next.js route type generation → native TypeScript 7.

For simple visual changes (colors, spacing, borders, typography, or CSS classes),
run only scoped `check`; do not run `typecheck`. This also applies to small
styling-only cleanup of inline styles or CSS custom properties when component
contracts and behavior stay unchanged.

| Command | Trigger |
| --- | --- |
| `bun run check <files...>` | Changes to supported source, CSS, or JSON files, including classes and JSX copy. Pass changed paths; skip unsupported assets and Markdown/MDX. |
| `bun run check` | Lint/format config or dependency changes, or refactors across shared modules and consumers. Otherwise use scoped checks. |
| `bun run typecheck` | Imports/exports, types, props, JSX structure, logic/hooks, API handlers, route folders/params, data shapes, TS/Next config, or type-affecting dependencies. Skip CSS/classes, static copy, unchanged-shape data values, Markdown, and assets. |
| `bun run knip` | Imports/exports, added/removed/renamed source or route files, dependencies, scripts, discovery entry points, or Knip config. Skip changes that leave the module/dependency graph unchanged. |
| `bun run knip:production` | Production entry points, conditional imports, dependency classification, or production Knip config; otherwise skip. |
| `bun run validate:content` | Lab catalog/routes, discontinued records, writing MDX/frontmatter, catalog/route/search discovery, frontmatter parsing, or the validator and its utilities. Skip unrelated UI/layout/CSS/docs. |
| `NODE_ENV=production bun run validate:content` | Those changes could alter public lab availability, including production filters and local DB gates; otherwise skip. |
| `bun run fix <files...>` | Auto-fixable errors in edited files; review the diff. Skip passing checks/manual-only failures; never fix the whole project for a local change. |

Verify behavior with existing tests or focused non-test checks, retaining the
browser/test-file restrictions. Other commands:

- `bun run sync:changelog`: only for requested commits, before staging and after
  each commit (see Commits). `dev`/`build` also run it automatically.
- `bun run dev`: only when needed and no server exists; never just for checks.
- `bun run build`: human/CI only; never in an agent environment.
- `bun run start`: only when asked to serve an existing production build and no
  server exists; never build first or use it for verification.
- `bun install --frozen-lockfile`: only for missing dependencies or an installed
  dependency tree that does not match the lockfile.

## Next.js Documentation

[Official Next.js App Router documentation](https://nextjs.org/docs/app).

# Design and Components

- Before changing UI, inspect `/design` and `app/design/`. Reuse suitable shared
  components and their demonstrated behavior; create new ones only when needed.
  Follow existing design tokens.
- When discussing colors with the user, always use design-system color names,
  Tailwind tokens, or custom class/token names (for example, `zinc-50`,
  `bg-surface`, or `--color-border`). Never describe colors using hex values.
- Use Base UI for continuing widgets; React Aria is limited to the mobile
  article TOC Sheet and supporting controls. Do not reintroduce retired widget
  libraries; see README.md for architecture.
- Repeated grid cards must have equal widths and heights within each row.
  Align content and actions with flexible layouts; avoid clipping, fixed heights,
  and masonry unless explicitly requested.

## Links

- Use `InternalLink`: `variant="inline"` for sentences, descriptions, and
  explanatory list items; default navigation for standalone links/lists;
  `variant="footer"` for footer navigation. Choose at the call site, never by
  DOM ancestry. Inline/footer links omit chevrons; inline inherits text sizing.

## Sections and Headings

- Use shared `Section` for titled content and `SectionHeading` for heading-only
  layouts. Leave specialized local sections intact unless explicitly refactoring.
- `Section` owns accessible heading IDs and `space-y-5`, with no global line
  height or width cap. `className` styles the section; `contentClassName` styles
  an optional body wrapper; `description` supplies muted introductory content.
- Container attributes apply to `Section`. Configure its heading through
  `headingAs`, `headingClassName`, and `headingVariant`. Preserve existing
  fragment anchors by moving their IDs to the section container.
- Page titles use the shared `PageTitle` typography inside `PageHeader`, without
  size or class overrides. The layout provides 32px above page content. `Footer`
  owns a reserved 24px breadcrumb row above its actions; `Breadcrumbs` owns its spacing;
  `PageHeader` starts with its title and renders no back link or empty navigation
  row. Pass back destinations through `back={{ href, name }}` for the top bar;
  put icons beside the title, keeping every title aligned to the same starting
  position. The header owns `gap-4` internally and `mb-16`
  before content; its child components have no vertical margins. Keep headers
  outside content stacks and omit an extra top margin on the first content block.
- Use `PageDescription` for page introductions (`as="div"` for block content).
- Physics and mathematics lab section stacks use parent `space-y-20`,
  including lab/demo sections. Other lab domains use `space-y-16`.
  Omit section top/bottom margins; keep introductions and source links together.
- Keep independent exercise/rule cards unnumbered in unordered lists. Number
  ordered solution steps and question-navigation controls when needed.
- Exclude all accordion/disclosure trigger headings from article TOCs,
  including custom implementations. Visible headings inside open panels may appear.

## Lab Width

Apply these defaults to new or refactored labs in every domain:

- Keep page and section containers, titles, and introductory descriptions full
  width. Apply left-aligned `max-w-3xl` only to reading content (explanations,
  derivations, solution steps, proofs, summaries, takeaways), such as
  `<Section contentClassName="max-w-3xl space-y-5" ...>`. Never cap a container
  that also holds a title or description.
- Interactive sections, labs, demos, visualizations, tables, and card grids use
  full available width with responsive columns. Preserve suitable intrinsic
  sizing for diagrams, controls, and overlays.
- In mixed sections, narrow only explanatory body content; keep the heading,
  description, and interactive content full width. Do not add a global cap to
  `Section`.
- Keep mobile layouts fluid; scroll wide equations/tables locally without
  causing page overflow. Other pages stay full width unless directed otherwise.

## Mathematical Notation

- Render all mathematical notation as TeX through `@/utils/katexify`: inline
  within sentences, display mode for standalone equations. Do not substitute
  Unicode, plain text, `<sub>`/`<sup>`, or monospace mathematical typography.
- Ensure `katex/dist/katex.min.css` is available wherever KaTeX is rendered.

# Content and Routes

- Never add redirect rules in `next.config.ts`. Do not automatically add
  redirects when renaming routes; legacy URL aliases are intentionally absent.
- Lab routes are literal folders. Register title, description, tags,
  creation date, and update history in `app/labs/data.ts`. Append an
  update date once per calendar day; preserve creation dates and prior history.
- Physics and mathematics preview descriptions use concise catalog copy (aim
  for 80 characters or fewer) to fit roughly two lines in small link previews.
  Reuse it in page metadata instead of longer local overrides; keep detailed
  explanations in page content. Preview line wrapping depends on the host app.
- Writing uses local `app/writing/content/*.mdx` with validated frontmatter and
  automatic module discovery, without an import registry. Use `/writing` URLs directly.
- Every non-home page shows a pill `BackButton` in the top bar at every screen
  size, regardless of scroll position. Home keeps the site-name link. Pass the
  exact route through `PageHeader.path` and the destination through its `back`
  prop; the header supplies back metadata and `PageTitle` supplies the title marker
  for `useScrolledPageHeader`. Use Home when matching back metadata is unavailable.
  The title replaces center navigation only after scrolling behind the top bar;
  returning to the title restores center navigation while retaining the back pill.
- Nested pages with visible content headings (`h2`–`h6`, including MDX headings and
  shared `SectionHeading` components) show `TopBarContents` in its
  own pill to the right of the top bar actions. Contents use rendered heading anchors,
  a desktop popover below the trigger, and a mobile sheet. Hide it on Home and
  all first-level routes. Individual writing
  and lab pages keep the floating `ArticleBackToTop` control, including
  articles without section headings. Show it only when scrolling upward away
  from the page top. Preserve their `data-article-*` title metadata.
- Keep `/api` current when GET endpoints change. Use shared `InternalLink` and
  concrete catch-all examples. Keep its footer link left of Install. Include
  the directory in search/sitemap, not raw endpoints; gate local-only entries.
- Keep public pages searchable.
- Keep task/tools SQLite labs development-only: production routes return
  404 and stay out of navigation, search, and sitemap.

# Metadata and Site Behavior

- Use shared metadata in `utils/pageMetadata.ts` and the canonical domain from
  `utils/site.ts` for page URLs, social previews, sitemap, and RSS.
- Follow README.md's metadata, archive, and offline behavior safeguards when
  changing their implementations.

# Commits

- Commit only with explicit user permission; committing is a separate action.
- When asked to commit, run `bun run sync:changelog` before staging and include
  `app/commits/changelog.json` in the requested commit when it changes. Run it again
  after every successful commit, including the last commit in a logical batch.
  Leave the final refreshed snapshot uncommitted: a commit cannot contain its
  own hash. Do not amend or create extra commits solely to include that hash.
- Use `type(context): message`, such as `fix(TopBar): align back icon`.
  Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`.
- Review staged changes and related documentation. Keep project guidance accurate
  in the same change; `test` commits remain subject to the testing policy above.
