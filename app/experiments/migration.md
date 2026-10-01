# Experiments App Router Structure

## Overview

Every experiment URL is represented by a literal App Router folder. Fixed
experiment pages no longer pass through a dynamic component registry.

```text
app/experiments/
├── page.tsx
└── react/
    ├── layout.tsx
    ├── page.tsx
    └── activity-demo/
        ├── demo.tsx
        └── page.tsx
```

Shared experiment-domain components live in `components/`:
`ExperimentDomainIndex.tsx`, `ExperimentDomainLayout.tsx`, and
`ExperimentDomainShell.tsx`. The layout reads the catalog on the server and
passes only the current domain's labels and navigation settings to the client
shell.

The same structure is used for every experiment domain. The article, post,
and student detail pages under `nextjs` retain their dynamic `[id]` segments
because those routes are generated from data.

## Route and Catalog Responsibilities

- `app/experiments/<domain>/<experiment>/page.tsx` makes a route public and
  owns its metadata.
- `demo.tsx` is the colocated Client Component for interactive examples.
- `data/ExperimentsData.ts` stores display metadata and explicit URL slugs for
  the grid, domain indexes, page metadata, counts, and sitemap. It is server-only.
- `utils/experimentCatalog.ts` provides available experiment records for the
  grid, domain indexes, and counts, applying the local database availability
  policy.
- `utils/experimentRoutes.ts` provides experiment route entries for search and
  sitemap, including nested task pages and data-generated Next.js detail pages.
- The catalog never imports page or demo components.
- Unknown folders use the standard Next.js not-found behavior.

## Adding an Experiment

1. Add the domain and experiment metadata to `data/ExperimentsData.ts`.
2. Create `app/experiments/<domain>/<experiment>/page.tsx`.
3. If the example is interactive, place its Client Component in the same
   folder as `demo.tsx` and import it only from that route's `page.tsx`.

Use the existing route wrappers as the template:

```tsx
import type { Metadata } from "next";
import { getExperimentMetadata } from "@/data/ExperimentsData";
import Demo from "./demo";

export const metadata: Metadata = getExperimentMetadata(
  "react",
  "activity-demo"
);

export default function ExperimentPage() {
  return <Demo />;
}
```

No central import map or `generateStaticParams` entry is needed for fixed
experiment pages.

Set `hideTitle: true` on a catalog entry when the page renders its own title,
and `hideBackButton: true` when it provides its own navigation. These settings
also apply to nested pages under that experiment.

## Validation

Run `bun run check` and `bun run typecheck` after changing the catalog or shared
route helpers. Verify that search and sitemap expose the same experiment URLs
and omit the task and tools database routes in production. Each catalog entry
must still have a literal route page, and each direct experiment page must be
listed in the catalog.
