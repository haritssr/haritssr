# Automatic route discovery

Status: proposed; implementation has not started.

## Goal

Adding an ordinary public page should automatically make its URL available to
Tree, search, and the sitemap. Removing or moving that page should remove its old
URL. Developers should not have to add a second registration merely to prove that
a page exists.

Keep descriptive metadata, navigation choices, content catalogs, and visibility
rules explicit where the filesystem cannot supply that information.

## Revised recommendation

Generate a small inventory of page paths during development and before deployment.
Have the existing shared manifest enrich that inventory with existing metadata and
content records. Do not generate a second copy of all lab, project, or writing data.

The earlier proposal mixed route discovery with extracting page metadata. Separate
these concerns:

- The filesystem determines which page patterns exist and their source files.
- Existing route definitions and catalogs provide curated titles, descriptions,
  groups, dates, and search suggestions.
- A new fixed route without curated metadata still appears with a readable title
  derived from its URL. Missing descriptive metadata produces a development or
  validation warning, rather than silently excluding the route.
- Dynamic content providers supply concrete URLs for patterns such as
  `/writing/[slug]`.
- Explicit visibility rules determine which discovered pages are published.

Do not import page modules to inspect their exports, execute `generateMetadata`,
parse arbitrary TypeScript expressions, or introduce a mandatory metadata sidecar
for every page. Those approaches introduce page dependencies or duplicate data
just to discover URLs. Browser metadata continues to use `createPageMetadata`.

## Current architecture

- [`utils/discovery/routeManifest.ts`](../utils/discovery/routeManifest.ts) combines
  manual route entries with labs, projects, and writing records.
- [`data/routes.ts`](../data/routes.ts) contains route descriptions, navigation
  suggestions, and search helpers. Preserve its public contracts during migration.
- [`utils/discovery/labRoutes.ts`](../utils/discovery/labRoutes.ts) and
  [`utils/discovery/labCatalog.ts`](../utils/discovery/labCatalog.ts) supply lab routes
  and content metadata.
- [`app/(tools)/tree/getRouteTree.ts`](../app/(tools)/tree/getRouteTree.ts),
  [`utils/discovery/searchIndex.ts`](../utils/discovery/searchIndex.ts), and
  [`app/sitemap.ts`](../app/sitemap.ts) consume the combined manifest.
- [`utils/content/validate-content.ts`](../utils/content/validate-content.ts) currently
  checks registered entries against page files, but does not generally discover
  unregistered fixed pages.
- [`utils/navigation/routePatterns.ts`](../utils/navigation/routePatterns.ts) contains
  dynamic pattern behavior and a source-directory mapping for grouped tools.

Today, the registered fixed pages already cover the current filesystem. The change
prevents future omissions; it should preserve the existing published route set.

## 1. Discover page patterns

Add a reusable scanner and a Bun generator under `utils/discovery/`. The scanner
returns deterministic records containing a public route pattern and a
repository-relative page source path.

Example generated records:

```ts
[
  { pattern: "/", source: "app/page.tsx" },
  {
    pattern: "/timer/clock",
    source: "app/(tools)/timer/clock/page.tsx",
  },
  {
    pattern: "/writing/[slug]",
    source: "app/writing/[slug]/page.tsx",
  },
]
```

Rules:

- Discover configured page extensions: currently `js`, `jsx`, `mdx`, `ts`, and
  `tsx`. Share this extension list with Next configuration to avoid drift.
- Remove route-group segments such as `(tools)` from public URLs, retaining them
  in source paths. Map the root page to `/`.
- Skip underscore-prefixed private directories and their descendants. Ordinary
  components, data files, layouts, handlers, metadata endpoints, and content MDX
  files whose basename is not `page` are not page routes.
- Retain dynamic segment syntax in inventory records; never publish a bracketed
  pattern as a concrete sitemap URL.
- Detect conflicting canonical page paths and report both source files. Do not
  silently overwrite one with the other.
- Recognize parallel-slot and interception syntax before removing group segments.
  These conventions require separate canonicalization. The first implementation
  should report unsupported cases explicitly instead of inventing URLs or silently
  omitting pages; add support when this repository actually uses them.
- Do not follow directory symlinks outside the app tree.
- Sort records by pattern and source. Do not include timestamps or absolute paths.

Keep the scanner independent of Next page imports, server-only runtime modules,
credentials, and database clients.

## 2. Store a generated inventory

Write a generated TypeScript module at
`utils/discovery/generated/pageRoutes.ts`, with a generated-file notice. Ignore it
in Git and recreate it from a clean checkout before commands that consume it.

Write atomically, and only when the inventory changes. This avoids unnecessary
Next recompilation, partial writes, and changes caused solely by wall-clock time.
Ignore this output in the discovery watcher to prevent regeneration loops.

The application imports the generated module normally. Production needs neither
an `app/` filesystem scan nor access to the original page source files to obtain
this inventory. Existing content providers retain their current loading behavior.

## 3. Enrich the shared manifest

Use the inventory as the authority for route existence, while keeping the current
`RouteRecord` response shape for consumers.

For fixed pages:

1. Apply explicit exclusion and environment policies.
2. Match an existing catalog or route definition when available.
3. Preserve that record's title, description, group, dates, and suggestion flag.
4. Otherwise derive a readable leaf title and group from the URL. Use `Home` for
   `/`; allow an empty description and report a missing-metadata warning.
5. Publish the record without requiring another manual registration.

Existing `data/routes.ts` entries become metadata overrides rather than the list
that determines whether a page exists. Leave top-level navigation and search
suggestions curated; discovering a page must not add a navigation button.

For dynamic pages:

- Keep the existing writing, project, and Next.js-demo content providers.
- Validate that each provider's concrete URLs resolve to a discovered page pattern.
- Register providers against explicit patterns and match complete segments. Avoid
  broad prefix matching that could misclassify a future fixed page such as
  `/writing/details` as a writing article.
- Require an explicit provider or exclusion for newly discovered dynamic patterns.
  A filesystem scan cannot enumerate database records or remote content safely.
- Preserve Tree's current collapsed placeholders and generated-page counts.

Do not silently keep metadata overrides for deleted pages. Report stale overrides
so they can be removed, and exclude their URLs from the manifest.

## 4. Preserve content and visibility rules

Automatic discovery applies to public fixed pages by default. Keep a small,
explicit policy for excluded and development-only routes, applied before Tree,
search, or sitemap receives records. Discovering a page is not authorization to
expose content that existing rules deliberately hide.

Lab catalog requirements remain: new labs still need descriptions, tags, creation
dates, and update history. Discovery makes omissions detectable but does not
invent catalog content. Retain validation failures for uncataloged labs.

An `/api/page.tsx` remains a discoverable directory page. API `route.ts` handlers
remain endpoints rather than sitemap pages.

Keep current last-modified values from content records. Do not use generation
time as the modification date of every page. The Tree header's manual `Latest`
date is a separate editorial concern.

## 5. Trigger generation

Use explicit Bun script wiring instead of relying on implicit `predev` or
`prebuild` lifecycle behavior, or on Next configuration evaluation as a hook.

| Entry point | Behavior |
| --- | --- |
| `bun run dev` | Generate once, then run the existing Next dev command with one filesystem watcher owned by the same runner. |
| Development file events | Debounce app-directory events and rescan for page additions, removals, or moves. Write only if records changed. |
| `bun run build` | Generate once before invoking the existing production build. Humans and CI run builds. |
| `bun run typecheck` | Generate before Next type generation and TypeScript so clean checkouts have the imported module. |
| `bun run validate:content` | Generate before loading the validator, then validate discovery and content together. |
| `bun run knip` / `bun run knip:production` | Ensure the generated module exists before module-graph analysis. |
| Manual discovery command | Provide generation and read-only comparison modes for diagnostics. |

The development watcher should use filesystem events, with no recurring polling
or extra Next server. It should exist only while its dev runner is alive, forward
shutdown signals, and stop when Next exits. Establish the watcher before the
initial scan so changes during startup are not missed.

The watcher only needs to update the path inventory. Changes to existing metadata
and dynamic catalogs flow through normal module imports and Next development
updates; they do not require another generated content snapshot.

If watching fails, show an actionable error instead of continuing with a silently
stale inventory. Direct `next dev` or `next build` invocations bypass these Bun
wrappers; document the supported entry points and ensure deployment uses the
wrapped build command.

## 6. Integrate validation and tooling

Extend content validation to check both directions:

- Every eligible fixed page is represented or deliberately excluded.
- Every published URL resolves to a discovered source pattern.
- Metadata overrides reference existing pages.
- Dynamic patterns have providers or exclusions, and provider URLs are unique.
- Production output contains no development-only routes.
- Generated ordering and fallback labels are deterministic.

Use discovered source paths for validation rather than rebuilding paths with
`appRouteDirectory`, which assumes a known set of grouped tools and `page.tsx`.
Keep View Source's current client-compatible mapping during this change; changing
that separate contract can be a later task.

Update Knip entries for operational scripts and generated-module consumers as
needed. Make generation before analysis explicit so a missing ignored file does
not create misleading dependency errors.

## 7. Implementation sequence

1. Capture the current development and production manifest records for comparison.
2. Implement the scanner and deterministic generator without changing consumers.
3. Wire generation into Bun commands and add the development watcher.
4. Merge discovered fixed pages with existing metadata and dynamic providers.
5. Extend content validation, including source-path and stale-override checks.
6. Confirm Tree, search, sitemap, metadata, navigation suggestions, and dynamic
   grouping preserve their current behavior.
7. Update architecture instructions in `AGENTS.md` and feature behavior on
   `/tree/details`. Keep the public README short.

Avoid a project-wide metadata migration in this change. Sharing route descriptions
with browser metadata can be improved incrementally when individual pages change.

## Verification and acceptance

Use focused non-test checks and temporary scanner fixture directories outside the
app. Do not add test/spec files, launch Chrome, start another dev server, or run a
production build in the agent environment.

Verify root routes, route groups, supported extensions, private folders, dynamic
patterns, deleted pages, duplicate paths, and unsupported routing conventions with
scanner fixtures. Use read-only generation comparison to confirm repeat runs do
not rewrite output. Exercise watcher creation, rename, deletion, debounce, and
shutdown with a fixture tree rather than the running application.

Compare the full manifest before and after migration in development and production,
including titles, descriptions, suggestions, modification dates, and Tree counts.
For an uncataloged ordinary fixed-page fixture, verify fallback inclusion; for an
uncataloged lab or unsupported dynamic pattern, verify the intended validation
failure.

After implementation, run the applicable full `bun run check`,
`bun run typecheck`, `bun run knip`, `bun run knip:production`,
`bun run validate:content`, and `NODE_ENV=production bun run validate:content`.
Also verify generation from an absent generated directory. Review the production
build wiring without executing a build; deployment verification belongs to CI or
a human-run build.

The change is complete when adding, moving, or deleting an ordinary fixed page
updates discovery without editing a central route registration, while current
catalog requirements, visibility rules, and dynamic URLs remain correct.
