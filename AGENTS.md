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
  Prefer targeted verification; run the full test suite only when necessary.
- Before submitting changes, run `bun run check`, `bun run typecheck`,
  `bun run knip`, `bun run validate:content`, and
  `NODE_ENV=production bun run validate:content`.
- Never create, add, rename, or restore test files (`*.test.*`, `*.spec.*`, or
  files under `test/`, `tests/`, or `__tests__/`). Modify existing tests only
  when explicitly requested. Verify with existing tests and non-test checks.
- Use the smallest set of skills specific to the task.
- See [README.md](README.md) for architecture and implementation details.

# Design and Components

- Before changing UI, inspect `/design` and `app/design/`. Reuse suitable shared
  components and their demonstrated behavior; create new ones only when needed.
  Follow existing design tokens.
- Repeated grid cards must have equal widths and equal heights within each row.
  Align headings, content areas, and bottom actions or equations with grid,
  subgrid, or flexible rows. No uneven heights or masonry unless explicitly
  requested. Do not clip content or impose fixed pixel heights to force alignment.
- Use Base UI for continuing widgets. React Aria is allowed only for the mobile
  article TOC Sheet (experiments and writing) and its supporting controls.
- Do not reintroduce Headless UI, Mantine, Radix UI, React Table, React Query,
  cmdk, or VisX dependencies. Prefer native APIs for small helpers.

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
- Experiment section stacks use parent `space-y-20`, including lab/demo sections.
  Omit section top/bottom margins; keep introductions and source links together.
- Keep independent exercise/rule cards unnumbered in unordered lists. Number
  ordered solution steps and question-navigation controls when needed.
- Exclude all accordion/disclosure trigger headings from article TOCs,
  including custom implementations. Visible headings inside open panels may appear.

## Experiment Width

Apply these defaults to new or refactored experiments in every domain:

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
- Experiment routes are literal folders. Register title, description, tags,
  creation date, and update history in `data/ExperimentsData.ts`. Append an
  update date once per calendar day; preserve creation dates and prior history.
- Physics and mathematics preview descriptions use concise catalog copy (aim
  for 80 characters or fewer) to fit roughly two lines in small link previews.
  Reuse it in page metadata instead of longer local overrides; keep detailed
  explanations in page content. Preview line wrapping depends on the host app.
- Writing uses local `data/writing/*.mdx` with validated frontmatter and automatic
  module discovery, without an import registry. Use `/writing` URLs directly.
- Individual writing and experiment pages share the scrolling top bar and
  floating reading controls (`useScrolledArticle`, `ArticleTableOfContents`).
  Keep page titles marked with `data-article-*` for the top bar. Contents use
  rendered heading anchors, a desktop popover, and a mobile sheet; back-to-top
  remains available on articles without section headings.
- Keep `/api` current when GET endpoints change. Use shared `InternalLink` and
  concrete catch-all examples. Keep its footer link left of Install. Include
  the directory in search/sitemap, not raw endpoints; gate local-only entries.
- Keep public pages searchable. Cloudflare handles AI-training opt-out when enabled.

## Archived and Local Experiments

- Preserve retired names, marks, and counts in `data/DiscontinuedExperimentsData.ts`,
  separate from the live catalog. Show static cards in the collapsed archive;
  no deleted-route links, live pages, search entries, or sitemap URLs. Omit cmdk.
- Preserve `discontinuedExperimentHistory.removalCommitSha` as the original
  removal commit's full SHA; never replace it with HEAD or a deployment SHA.
- Task/tools SQLite experiments remain development-only until authentication,
  authorization, rate limits, and durable storage exist. Production routes return
  404 and are excluded from navigation, search, and sitemap.

# Metadata and Site Behavior

- Use shared metadata in `utils/pageMetadata.ts` and the canonical domain from
  `utils/site.ts` for page URLs, social previews, sitemap, and RSS.
- OG images use `app/api/og/OpenGraphCard.tsx`: simple blue gradient, large title,
  `haritssr.com` and author branding; descriptions stay in metadata. Show parent
  breadcrumbs only on nested pages. Experiment titles have two lines: name,
  then a smaller domain “Experiments” label, without a pipe; scale lines to fit.
- Bump the image URL's `v` in `utils/pageMetadata.ts` when changing OG design.
  Preserve crawler access to `/api/og` and the shared Twitter account `@haritssr`.
- Reuse shared structured-data components; escape `<` in serialized JSON-LD.
- Keep `SITE_THEME_COLOR`, manifest/viewport, and offline theme colors consistent.
  Icons use the site logo's saturated blue palette in both themes.
- Preserve the PWA's offline fallback: cache only `public/offline.html`, never
  Next.js pages. Preserve API/asset/client-navigation behavior, production-only
  registration, `/sw.js` no-cache headers, and deletion of only owned old caches.
- RSS uses writing summaries linking to canonical full posts, with publication
  dates and generation-time `lastBuildDate`.

# Commits

- Commit only with explicit user permission; committing is a separate action.
- Use `type(context): message`, such as `fix(TopBar): align back icon`.
  Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`.
- Review staged changes and related documentation. Keep project guidance accurate
  in the same change; `test` commits remain subject to the testing policy above.
