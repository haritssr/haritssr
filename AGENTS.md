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

## Next.js 16.4 Feature Assessment

Reviewed on 2026-10-13 against `next.config.ts`, the route implementations,
and the installed version-matched documentation. These are recommendations,
not measured speedups or instructions to enable every option.

| Feature | Current status | Recommendation | Fit and verification for this codebase |
| --- | --- | --- | --- |
| Smaller disk cache, lazy server HMR, shared runtime, and production minification | Automatic with Turbopack | Keep | Standard `next dev` and `next build` already receive these improvements; no extra flags needed. |
| `turbopackMemoryEviction: "full"` | Enabled | Keep; measure if recompilation becomes slow | Suits the 8 GB machine by evicting persisted compiler data aggressively. This is separate from garbage collection. |
| `experimental.turbopackGc: true` | Enabled for trial | Monitor before retaining long term | Removes unreachable compiler work from memory and disk across many experiment routes. Requires filesystem caching and affects both development and builds. Compare long-session memory, cache size, and recompilation time; verify CI. |
| `experimental.turbopackLazyDynamicImports: false` | Disabled after trial | Keep disabled pending a framework fix | Search hover/focus preloading triggered an unactivated lazy compilation proxy for `GlobalSearchDialog` on Next.js 16.4.0. Dynamic imports and application preloading remain in place. Re-test search, TOC, confetti, and Mermaid before another trial. Production behavior is unchanged. |
| `reactCompiler` with `experimental.turbopackRustReactCompiler` | Disabled | Pilot after profiling | Interactive physics/math labs and the changelog explorer could benefit from automatic memoization. The Rust implementation needs both flags and no Babel compiler dependency. Compare render cost and compilation time; preserve existing memoization and verify widget behavior before wider adoption. |
| `cacheComponents: true` with `partialPrefetching: true` | Disabled | Plan a separate migration | Static articles and interactive labs could benefit from reusable navigation shells and preserved state. Review uncached work, Suspense boundaries, and request-time `connection()` in Commits and local task routes. Audit timer, canvas, dialog, and TOC effects when routes become hidden and visible. Many shared links currently use `prefetch={false}`; change that policy deliberately. |
| Route `ensureStatic` | Unused | Use selectively after Cache Components adoption | Could protect writing and static article routes from accidental request-time rendering. Requires Cache Components. Avoid a root-wide static requirement: Commits and local database pages intentionally render at request time. |
| `navigation()` and `prefetch()` from `next/cache` | Unused | Use only for identified prefetch costs after migration | Useful for expensive server subtrees that should load later. Current large commit tables are passed to clients; these APIs do not make client accordion content fetch only when opened. |
| `experimental.turbopackPluginRuntimeStrategy: "workerThreads"` | Disabled | Defer | MDX and PostCSS could benefit, but the installed guide documents a fallback on Node 24.13.1 and newer; this machine currently uses Node 26.8.2. Recheck compatibility before trialing; avoid `forceWorkerThreads`. |
| React 19.3 View Transitions and Fragment Refs | Available, unused | Add only for a concrete UI requirement | They provide animation and DOM interaction capabilities, not automatic rendering speedups. Preserve reduced-motion behavior if adding transitions. |
| Additional Turbopack roots/global virtual stores | Not configured | Skip for the current structure | No linked workspace packages or external dependency roots are configured; there is no demonstrated need. |

Use the installed guides before changing configuration:
[garbage collection](node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/turbopackGc.md),
[lazy imports](node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/turbopackLazyDynamicImports.md),
[Rust compiler](node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/turbopackRustReactCompiler.md),
and [Cache Components](node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/cacheComponents.md).
The first two candidates follow the documented behavior in the official
[garbage collection](https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopackGc)
and [lazy import](https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopackLazyDynamicImports)
references; their suitability here is an inference from the codebase.

Trial one change at a time. Run the required checks above; production-build
verification belongs in CI or a local human workflow. Follow the existing
browser and test-file restrictions. Reassess this table after framework upgrades
or configuration changes.

# Design and Components

- Before changing UI, inspect `/design` and `app/design/`. Reuse suitable shared
  components and their demonstrated behavior; create new ones only when needed.
  Follow existing design tokens.
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
  size or class overrides. The layout always reserves a 24px breadcrumb row,
  with 32px before it and 32px after it (`py-8`);
  `PageHeader` always reserves a 24px navigation row followed by `gap-4`, even
  when breadcrumbs or a back link are absent. Pass back links through its
  `navigation` prop and put icons beside the title, keeping every title aligned
  to the same starting position. The header owns `gap-4` internally and `mb-16`
  before content; its child components have no vertical margins. Keep headers
  outside content stacks and omit an extra top margin on the first content block.
- Use `PageDescription` for page introductions (`as="div"` for block content).
- Physics and mathematics experiment section stacks use parent `space-y-20`,
  including lab/demo sections. Other experiment domains use `space-y-16`.
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
- Pages with a title and back button inside `PageHeader` share the scrolling
  top bar (`useScrolledPageHeader`). Pass the exact route through the header's
  `path` prop; the shared `PageTitle` and `BackButton` supply discovery markers.
  The title replaces center navigation and the back button replaces the site
  name once the title scrolls behind the top bar. Headers without either stay
  in the normal navigation mode.
- Nested pages with visible content headings (`h2`–`h6`, including MDX headings and
  shared `SectionHeading` components) show `TopBarContents` in its
  own pill to the right of the top bar actions. Contents use rendered heading anchors,
  a desktop popover below the trigger, and a mobile sheet. Hide it on Home and
  all first-level routes. Individual writing
  and experiment pages keep the floating `ArticleBackToTop` control, including
  articles without section headings. Show it only when scrolling upward away
  from the page top. Preserve their `data-article-*` title metadata.
- Keep `/api` current when GET endpoints change. Use shared `InternalLink` and
  concrete catch-all examples. Keep its footer link left of Install. Include
  the directory in search/sitemap, not raw endpoints; gate local-only entries.
- Keep public pages searchable.
- Keep task/tools SQLite experiments development-only: production routes return
  404 and stay out of navigation, search, and sitemap.

# Metadata and Site Behavior

- Use shared metadata in `utils/pageMetadata.ts` and the canonical domain from
  `utils/site.ts` for page URLs, social previews, sitemap, and RSS.
- Follow README.md's metadata, archive, and offline behavior safeguards when
  changing their implementations.

# Commits

- Commit only with explicit user permission; committing is a separate action.
- When asked to commit, run `bun run sync:changelog` before staging and include
  `data/changelog.json` in the requested commit when it changes. Run it again
  after every successful commit, including the last commit in a logical batch.
  Leave the final refreshed snapshot uncommitted: a commit cannot contain its
  own hash. Do not amend or create extra commits solely to include that hash.
- Use `type(context): message`, such as `fix(TopBar): align back icon`.
  Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`.
- Review staged changes and related documentation. Keep project guidance accurate
  in the same change; `test` commits remain subject to the testing policy above.
