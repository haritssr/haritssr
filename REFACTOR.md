# Refactor opportunities

There is no need for a broad rewrite. These are focused opportunities, ordered by likely value.

## 1. Keep the experiment catalog out of the client shell

[`components/ExperimentDomainLayout.tsx`](components/ExperimentDomainLayout.tsx) is a Client Component and imports `getExperimentDomain` from [`data/ExperimentsData.ts`](data/ExperimentsData.ts), a 947-line registry. The shell only needs a few labels to render its title and breadcrumb, but the import makes the full registry reachable from the client bundle.

Keep the full catalog on the server and give the client shell only the current domain and route labels it needs, or provide a small client-safe label map. This also creates a natural place to replace the shell's pathname-specific exceptions for task and standalone Next.js routes with explicit route metadata.

## 2. Centralize available experiment routes

Experiment metadata lives in [`data/ExperimentsData.ts`](data/ExperimentsData.ts), while route lists and availability filtering are assembled separately in [`components/ExperimentsGrid.tsx`](components/ExperimentsGrid.tsx), [`components/ExperimentDomainIndex.tsx`](components/ExperimentDomainIndex.tsx), [`app/experiments/page.tsx`](app/experiments/page.tsx), [`utils/searchIndex.ts`](utils/searchIndex.ts), and [`app/sitemap.ts`](app/sitemap.ts). The catalog is large enough that adding or hiding an experiment can leave one of those views out of sync.

Split the catalog into per-domain modules behind a stable index, then expose one helper for available experiment records or route entries. Reuse it for the domain grid, index, search, and sitemap so the production-only database filtering and route shape stay consistent. Keep Next.js article, student, and post data as their own content records, while letting the shared route helper register their URLs.

## 3. Clarify the second SQLite adapter

[`app/experiments/ui-explorations/tools/db.bun.ts`](app/experiments/ui-explorations/tools/db.bun.ts) duplicates the schema and CRUD operations in `db.core.ts`, but the tools page imports through `db.ts`, which re-exports the `better-sqlite3` implementation. No other file currently imports `db.bun.ts`.

If the Bun adapter is an intentional runtime comparison, give it a small documented entry point. Otherwise, remove the unused duplicate. If both adapters need to remain, share the schema and operation contract so the two implementations cannot drift independently.

Large experiment components are specialized demos; splitting them just to reduce line counts would not be a clear improvement without a specific shared boundary.
