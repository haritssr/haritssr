# Next.js bundle audit — 2026-10-29

Scope: all 163 routes; audit mode. The audit made no application, dependency, or lockfile changes. This report records the captured baseline; later URL autofocus and Details copy changes are not included in that snapshot.

## Baseline and metric

- Next.js 16.4.3; snapshot `audit-2026-10-29-before`.
- Capture: `bunx --no-install next analyze --output --snapshot audit-2026-10-29-before` (completed).
- Export: `set -o pipefail; bunx --no-install next analyze export --snapshot audit-2026-10-29-before | gzip > /tmp/haritssr-analyze-before.jsonl.gz` (completed).
- 6,804 module identities; 639 client output members across 585 source paths.
- Metric: attributed compressed JavaScript bytes in `[client-fs]` `.js` outputs. Deduplicate each `(filename, source_path)` per route; whole-app attribution deduplicates the same pair across routes. Do not add route totals together.
- Route totals include async outputs: `/timer` 994,259 bytes, `/music` 926,939, `/` 921,161, `/design` 1,007,247. These are neither initial-load transfer measurements nor expected savings.
- Assets and CSS excluded from JavaScript ranking. Exported fonts and images are not evidence they are requested by every browser.

## Ranked candidates

### 1. Defer Timer preset settings until Settings opens

Source chain: `TimerClient.tsx` → `TimerSettings.tsx` → `PresetSettings.tsx` → `timerValidation.ts` → `zod`.

Exact target identity: `[project]/app/(tools)/timer/_components/PresetSettings.tsx [app-client] (ecmascript)`.

Render condition: `/timer` before Settings opens. Presets and Daily Tasks are dialog-only UI. Current static import loads their implementation regardless of whether Base UI mounts its portal.

Proposed boundary: retain dialog handle, trigger, and provider eagerly; load preset content inside the open dialog using a stable loading state. Ensure an async component is mounted only when needed; unconditional rendering could trigger loading immediately.

Directed min-cut with unit cost on imports into PresetSettings and all other edges protected: one edge, `TimerSettings.tsx` → `PresetSettings.tsx`. No alternate synchronous root path found in the indexed graph. Removing that edge makes source paths carrying 144,540 attributed compressed JS bytes unreachable synchronously from the selected Timer roots. This is a candidate footprint, not an emitted-size delta or guaranteed transfer saving; source-path attribution can include variants and async output occurrences. PresetSettings itself accounts for 1,503 bytes.

Validation needed before acceptance: compare an after snapshot; open Settings with pointer and keyboard; preserve focus, loading/error recovery, switch controls, preset Save/Cancel, Daily Tasks draft handling, and direct daily-section triggers. No behavior tests performed in audit mode.

### 2. Separate task form fields from the lazy dialog body

Exact target: `[project]/app/(tools)/timer/_components/TaskFormDialog.tsx [app-client] (ecmascript)`.

Three synchronous importers exist: `TaskDialog.tsx`, `PresetSettings.tsx`, and `DailyTaskFields.tsx`. The latter two consume exported fields. A lazy import from TaskDialog alone leaves the module reachable through Settings.

Directed min-cut with unit cost on imports into this target and other edges protected: three edges, those listed above. Target-only footprint: 1,961 attributed compressed bytes. Combined cut of `TimerSettings` → `PresetSettings` and `TaskDialog` → `TaskFormDialog` disconnects a larger synchronous region with 159,426 attributed compressed JS bytes. Do not add this to candidate 1: they overlap.

Proposed edit: extract reusable field components into a small module, then defer the dialog body only on Add/Edit. Preserve dialog provider and trigger state, Shift+N, draft recovery after save failure, duration validation, delete behavior, focus restoration, and daily-task editing rules. Opening a dialog would acquire a loading stage; approve that behavior before implementation. No changes applied.

### 3. Investigate narrow Zod imports

`app/(tools)/timer/utils/timerValidation.ts` imports `{ z }` from `zod`. The graph attributes locale modules, JSON-schema helpers, compilation code, and validation implementation to its synchronous region. Some may be avoided with supported narrower entry points or library APIs, but this requires API/error-message compatibility review. Do not replace validation or weaken server checks. Candidate 1 may already defer the relevant browser work; avoid counting it twice. This candidate remains unverified, with no proposed size guarantee.

## Investigated targets already deferred / rejected

- Search: GlobalSearchDialog has no synchronous path from Timer roots. No new lazy boundary proposed.
- Diagrams: FlowDiagram has no synchronous Timer-root path; Pele core and diagram types use dynamic imports. Rendering starts near the viewport through IntersectionObserver. Deferring further could change visible behavior.
- Contents math: ContentsMath is dynamically imported and rendered only for mathematical labels. KaTeX is still synchronous in interactive math/physics labs where live browser inputs require it; do not remove it globally. Static display formulas would need a separate per-lab rendering review.
- Music metadata: dynamic import executes inside `readMusicFile` after a nonempty MP3 is selected. MPEG, MP4, ASF and other parsers appear in the async graph; narrowing supported parser loading is a possible later import-only optimization, not an initial-load finding.
- Shared React/Next runtime and Base UI widgets: retain required initial UI edges. High attribution alone does not justify deferring accessible navigation or replacing widgets.
- Duplicate versions: no verified duplicate-package browser finding. Repeated attribution across outputs is not proof of separate installed versions.

## Graph method and coverage

Community discovery: unweighted synchronous client import graph, symmetrized, deterministic asynchronous label propagation, sorted initial order, PRNG seed 17, maximum 30 rounds. Converged in 9 rounds to 99 communities. Community source-path attribution is exploratory: shared source variants can span communities, so community totals must not be summed as emitted savings. Selected optional Timer form/preset regions from the large shared UI community; protected runtime and initial UI edges in directed min-cuts. Synchronous traversal includes cycles with visited sets; async imports were not treated as synchronous edges. All selected Timer roots are recorded below.

All 163 routes have exact entry/group metadata. Client outputs: 7,927 exact route/output occurrences, 9,690 non-chunk occurrences, one unsupported output (`/labs/physics/electron-configuration`, `turbopack-23c0fpl1deus5.js`). All exported groups have joined triggers. Non-chunk runtimes/assets and the unsupported output prevent universal client reachability/leak claims. Some attributed library source paths (including KaTeX) do not appear as direct output members, so constituent dependency joins are required; attribution is not a one-to-one identity weight. Timer cuts are provisional static graph results; an after snapshot must verify emitted changes.

## Possible server-only leaks

No possible server-only leak was established in the indexed emitted client members. This does not certify unsupported/non-chunk outputs or unjoined constituent contents. The scan checks sync and async emitted membership, not only byte ranking.

No project `use server` declarations or client-imported project Server Actions were found by source scan or named emitted identities. Framework Action transport is expected browser code; no application Action implementation was identified to reconcile.

## Client-dependency scan / Suppressed matches

Each row preserves the emitted identity. Attribution below is deduplicated across all client JavaScript outputs; it is not observed transfer. Route coverage is listed in the final column. Importers are graph source paths (up to three shown). All matches are suppressed because source/package ownership indicates public UI or intentional browser framework/parser code, not private policy or credentials.

| Source + client importer | Emitted identity | Compressed bytes | Disposition + evidence / routes |
| --- | --- | ---: | --- |
| [project]/app/(tools)/timer/_components/TaskActions.tsx ← importer not resolved in emitted-member subset | `[project]/app/(tools)/timer/_components/TaskActions.tsx [app-client] (ecmascript)` | 2325 | suppressed: public UI event handling; 149 routes (shared) |
| [project]/app/labs/browser/intersection-observer-api/demo.tsx ← importer not resolved in emitted-member subset | `[project]/app/labs/browser/intersection-observer-api/demo.tsx [app-client] (ecmascript)` | 938 | suppressed: public UI event handling; /labs/browser/intersection-observer-api |
| [project]/app/labs/physics/atomic-orbitals/interactions.tsx ← importer not resolved in emitted-member subset | `[project]/app/labs/physics/atomic-orbitals/interactions.tsx [app-client] (ecmascript)` | 4766 | suppressed: public UI event handling; /labs/physics/atomic-orbitals |
| [project]/node_modules/@base-ui/react/floating-ui-react/hooks/useHoverFloatingInteraction.mjs ← importer not resolved in emitted-member subset | `[project]/node_modules/@base-ui/react/floating-ui-react/hooks/useHoverFloatingInteraction.mjs [app-client] (ecmascript)` | 1103 | suppressed: intentional browser UI library; 149 routes (shared) |
| [project]/node_modules/@base-ui/react/floating-ui-react/hooks/useHoverInteractionSharedState.mjs ← [project]/node_modules/@base-ui/react/floating-ui-react/hooks/useHoverFloatingInteraction.mjs, [project]/node_modules/@base-ui/react/floating-ui-react/hooks/useHoverReferenceInteraction.mjs | `[project]/node_modules/@base-ui/react/floating-ui-react/hooks/useHoverInteractionSharedState.mjs [app-client] (ecmascript) <locals>` | 598 | suppressed: intentional browser UI library; 149 routes (shared) |
| [project]/node_modules/@base-ui/react/floating-ui-react/hooks/useHoverReferenceInteraction.mjs ← importer not resolved in emitted-member subset | `[project]/node_modules/@base-ui/react/floating-ui-react/hooks/useHoverReferenceInteraction.mjs [app-client] (ecmascript)` | 1777 | suppressed: intentional browser UI library; 149 routes (shared) |
| [project]/node_modules/@base-ui/react/utils/useOpenInteractionType.mjs ← importer not resolved in emitted-member subset | `[project]/node_modules/@base-ui/react/utils/useOpenInteractionType.mjs [app-client] (ecmascript)` | 289 | suppressed: intentional browser UI library; 149 routes (shared) |
| [project]/node_modules/next/dist/build/polyfills/process.js ← [project]/app/(tools)/music/_components/useMusicOffline.ts, [project]/components/ServiceWorkerRegistration.tsx, [project]/node_modules/@base-ui/react/accordion/header/AccordionHeader.mjs | `[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)` | 115 | suppressed: intentional Next.js browser runtime/transport/shim; 149 routes (shared) |
| [project]/node_modules/next/dist/client/app-call-server.js ← [project]/node_modules/next/dist/client/app-index.js, [project]/node_modules/next/dist/client/components/router-reducer/fetch-server-response.js, [project]/node_modules/next/dist/client/components/router-reducer/reducers/server-action-reducer.js | `[project]/node_modules/next/dist/client/app-call-server.js [app-client] (ecmascript)` | 211 | suppressed: intentional Next.js browser runtime/transport/shim; 149 routes (shared) |
| [project]/node_modules/next/dist/client/components/navigation.react-server.js ← [project]/node_modules/next/dist/client/components/navigation.js | `[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-client] (ecmascript)` | 463 | suppressed: intentional Next.js browser runtime/transport/shim; 149 routes (shared) |
| [project]/node_modules/next/dist/client/components/router-reducer/fetch-server-response.js ← [project]/node_modules/next/dist/client/components/app-router-state.js, [project]/node_modules/next/dist/client/components/render-tree.js, [project]/node_modules/next/dist/client/components/router-reducer/create-initial-router-state.js | `[project]/node_modules/next/dist/client/components/router-reducer/fetch-server-response.js [app-client] (ecmascript)` | 1960 | suppressed: intentional Next.js browser runtime/transport/shim; 149 routes (shared) |
| [project]/node_modules/next/dist/client/components/router-reducer/reducers/server-action-reducer.js ← [project]/node_modules/next/dist/client/components/router-reducer/router-reducer.js | `[project]/node_modules/next/dist/client/components/router-reducer/reducers/server-action-reducer.js [app-client] (ecmascript)` | 2201 | suppressed: intentional Next.js browser runtime/transport/shim; 149 routes (shared) |
| [project]/node_modules/next/dist/client/components/router-reducer/reducers/server-patch-reducer.js ← [project]/node_modules/next/dist/client/components/router-reducer/router-reducer.js | `[project]/node_modules/next/dist/client/components/router-reducer/reducers/server-patch-reducer.js [app-client] (ecmascript)` | 559 | suppressed: intentional Next.js browser runtime/transport/shim; 149 routes (shared) |
| [project]/node_modules/next/dist/client/components/segment-cache/decode-server-response.js ← [project]/node_modules/next/dist/client/components/app-router-state.js, [project]/node_modules/next/dist/client/components/render-tree.js, [project]/node_modules/next/dist/client/components/router-reducer/create-initial-router-state.js | `[project]/node_modules/next/dist/client/components/segment-cache/decode-server-response.js [app-client] (ecmascript)` | 1958 | suppressed: intentional Next.js browser runtime/transport/shim; 149 routes (shared) |
| [project]/node_modules/next/dist/client/components/server-async-storage.browser.js ← [project]/node_modules/next/dist/client/components/handle-isr-error.js, [project]/node_modules/next/dist/client/components/navigation-untracked.js, [project]/node_modules/next/dist/client/components/redirect.js | `[project]/node_modules/next/dist/client/components/server-async-storage.browser.js [app-client] (ecmascript)` | 242 | suppressed: intentional Next.js browser runtime/transport/shim; 149 routes (shared) |
| [project]/node_modules/next/dist/client/components/unauthorized.js ← [project]/node_modules/next/dist/client/components/navigation.react-server.js | `[project]/node_modules/next/dist/client/components/unauthorized.js [app-client] (ecmascript)` | 308 | suppressed: intentional Next.js browser runtime/transport/shim; 149 routes (shared) |
| [project]/node_modules/next/dist/client/components/unrecognized-action-error.js ← [project]/node_modules/next/dist/client/components/navigation.js, [project]/node_modules/next/dist/client/components/router-reducer/reducers/server-action-reducer.js | `[project]/node_modules/next/dist/client/components/unrecognized-action-error.js [app-client] (ecmascript)` | 308 | suppressed: intentional Next.js browser runtime/transport/shim; 149 routes (shared) |
| [project]/node_modules/next/dist/client/components/use-action-queue.js ← [project]/node_modules/next/dist/client/components/app-router-instance.js, [project]/node_modules/next/dist/client/components/app-router.js, [project]/node_modules/next/dist/client/components/render-tree.js | `[project]/node_modules/next/dist/client/components/use-action-queue.js [app-client] (ecmascript)` | 525 | suppressed: intentional Next.js browser runtime/transport/shim; 149 routes (shared) |
| [project]/node_modules/next/dist/client/sequential-call-server.js ← [project]/node_modules/next/dist/client/app-call-server.js | `[project]/node_modules/next/dist/client/sequential-call-server.js [app-client] (ecmascript)` | 338 | suppressed: intentional Next.js browser runtime/transport/shim; 149 routes (shared) |
| [project]/node_modules/next/dist/compiled/process/browser.js ← [project]/node_modules/next/dist/build/polyfills/process.js | `[project]/node_modules/next/dist/compiled/process/browser.js [app-client] (ecmascript)` | 801 | suppressed: intentional Next.js browser runtime/transport/shim; 149 routes (shared) |
| [project]/node_modules/next/dist/compiled/react-server-dom-turbopack/cjs/react-server-dom-turbopack-client.browser.production.js ← [project]/node_modules/next/dist/compiled/react-server-dom-turbopack/client.browser.js | `[project]/node_modules/next/dist/compiled/react-server-dom-turbopack/cjs/react-server-dom-turbopack-client.browser.production.js [app-client] (ecmascript)` | 7783 | suppressed: intentional Next.js browser runtime/transport/shim; 149 routes (shared) |
| [project]/node_modules/next/dist/compiled/react-server-dom-turbopack/client.browser.js ← [project]/node_modules/next/dist/compiled/react-server-dom-turbopack/client.js | `[project]/node_modules/next/dist/compiled/react-server-dom-turbopack/client.browser.js [app-client] (ecmascript)` | 45 | suppressed: intentional Next.js browser runtime/transport/shim; 149 routes (shared) |
| [project]/node_modules/next/dist/compiled/react-server-dom-turbopack/client.js ← [project]/node_modules/next/dist/client/app-index.js, [project]/node_modules/next/dist/client/components/router-reducer/fetch-server-response.js, [project]/node_modules/next/dist/client/components/router-reducer/reducers/server-action-reducer.js | `[project]/node_modules/next/dist/compiled/react-server-dom-turbopack/client.js [app-client] (ecmascript)` | 45 | suppressed: intentional Next.js browser runtime/transport/shim; 149 routes (shared) |
| [project]/node_modules/next/dist/server/app-render/async-local-storage.js ← [project]/node_modules/next/dist/server/app-render/work-async-storage-instance.js | `[project]/node_modules/next/dist/server/app-render/async-local-storage.js [app-client] (ecmascript)` | 413 | suppressed: intentional Next.js browser runtime/transport/shim; 149 routes (shared) |
| [project]/node_modules/next/dist/server/app-render/work-async-storage-instance.js ← [project]/node_modules/next/dist/server/app-render/work-async-storage.external.js | `[project]/node_modules/next/dist/server/app-render/work-async-storage-instance.js [app-client] (ecmascript)` | 180 | suppressed: intentional Next.js browser runtime/transport/shim; 149 routes (shared) |
| [project]/node_modules/next/dist/server/app-render/work-async-storage.external.js ← [project]/node_modules/next/dist/shared/lib/lazy-dynamic/preload-chunks.js | `[project]/node_modules/next/dist/server/app-render/work-async-storage.external.js [app-client] (ecmascript)` | 144 | suppressed: intentional Next.js browser runtime/transport/shim; 149 routes (shared) |
| [project]/node_modules/next/dist/shared/lib/action-revalidation-kind.js ← [project]/node_modules/next/dist/client/components/router-reducer/reducers/server-action-reducer.js | `[project]/node_modules/next/dist/shared/lib/action-revalidation-kind.js [app-client] (ecmascript)` | 192 | suppressed: intentional Next.js browser runtime/transport/shim; 149 routes (shared) |
| [project]/node_modules/next/dist/shared/lib/server-inserted-html.shared-runtime.js ← [project]/node_modules/next/dist/client/components/navigation.js | `[project]/node_modules/next/dist/shared/lib/server-inserted-html.shared-runtime.js [app-client] (ecmascript)` | 235 | suppressed: intentional Next.js browser runtime/transport/shim; 149 routes (shared) |
| [project]/node_modules/next/dist/shared/lib/server-reference-info.js ← [project]/node_modules/next/dist/client/components/router-reducer/reducers/server-action-reducer.js | `[project]/node_modules/next/dist/shared/lib/server-reference-info.js [app-client] (ecmascript)` | 420 | suppressed: intentional Next.js browser runtime/transport/shim; 149 routes (shared) |
| [project]/node_modules/react-intersection-observer/dist/index.mjs ← [project]/app/labs/browser/intersection-observer-api/demo.tsx, [project]/app/labs/browser/scroll-title/demo.tsx | `[project]/node_modules/react-intersection-observer/dist/index.mjs [app-client] (ecmascript)` | 2685 | suppressed: intentional browser UI library; /labs/browser/intersection-observer-api, /labs/browser/scroll-title |
| [project]/node_modules/strtok3/lib/stream/Errors.js ← [project]/node_modules/file-type/source/index.js, [project]/node_modules/music-metadata/lib/aiff/AiffParser.js, [project]/node_modules/music-metadata/lib/asf/AsfParser.js | `[project]/node_modules/strtok3/lib/stream/Errors.js [app-client] (ecmascript)` | 139 | suppressed: browser MP3 import parser error type; 149 routes (shared) |

## Evidence gaps

No browser request recording or interaction timing was captured; no savings claimed. Unsupported/non-chunk outputs and constituent identity mapping limit the client scan. No after snapshot exists because audit mode makes no edits. The audit itself changed no source code. Separate URL changes were checked independently. Blank importer mappings in the original scan are recorded explicitly as unresolved; they are not evidence of absent importers. Static analyzer capture/export succeeded.

## Selected Timer roots

- `[project]/app/(tools)/music/_components/MusicProvider.tsx [app-client] (ecmascript)`
- `[project]/app/(tools)/timer/TimerClient.tsx [app-client] (ecmascript)`
- `[project]/app/(tools)/timer/_components/AnalogClock.tsx [app-client] (ecmascript)`
- `[project]/app/(tools)/timer/_components/TimerDate.tsx [app-client] (ecmascript)`
- `[project]/app/(tools)/timer/_components/TimerProvider.tsx [app-client] (ecmascript)`
- `[project]/app/global-error.tsx [app-client] (ecmascript)`
- `[project]/app/not-found.tsx [app-client] (ecmascript)`
- `[project]/components/Breadcrumbs.tsx [app-client] (ecmascript)`
- `[project]/components/FooterClock.tsx [app-client] (ecmascript)`
- `[project]/components/InstallButton.tsx [app-client] (ecmascript)`
- `[project]/components/ServiceWorkerRegistration.tsx [app-client] (ecmascript)`
- `[project]/components/SharePageProvider.tsx [app-client] (ecmascript)`
- `[project]/components/SiteShortcuts.tsx [app-client] (ecmascript)`
- `[project]/components/TabBarButtom.tsx [app-client] (ecmascript)`
- `[project]/components/floating/FloatingDock.tsx [app-client] (ecmascript)`
- `[project]/components/topbar/TopBar.tsx [app-client] (ecmascript)`
- `[project]/components/topbar/TopBarSearch.tsx [app-client] (ecmascript)`
- `[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)`
- `[project]/node_modules/next/dist/client/app-next-turbopack.js [app-client] (ecmascript)`
- `[project]/node_modules/next/dist/client/components/client-page.js [app-client] (ecmascript)`
- `[project]/node_modules/next/dist/client/components/client-segment.js [app-client] (ecmascript)`
- `[project]/node_modules/next/dist/client/components/http-access-fallback/error-boundary.js [app-client] (ecmascript)`
- `[project]/node_modules/next/dist/client/components/layout-router.js [app-client] (ecmascript)`
- `[project]/node_modules/next/dist/client/components/render-from-template-context.js [app-client] (ecmascript)`
- `[project]/node_modules/next/dist/lib/framework/boundary-components.js [app-client] (ecmascript)`
- `[project]/node_modules/next/dist/lib/metadata/generate/icon-mark.js [app-client] (ecmascript)`

## Follow-up work

- [ ] Reuse the retained baseline, or capture a new baseline if application changes affect the comparison.
- [ ] Start with Timer preset settings: validate every importer and add an interaction-gated boundary.
- [ ] Extract shared task fields before deferring Add/Edit dialog content.
- [ ] Capture a distinct after snapshot and compare the same route, output class, and attribution metric.
- [ ] Verify keyboard/pointer opening, focus, preset saves, daily task editing, draft recovery, and errors.
- [ ] Record measured deltas and remaining evidence gaps before accepting each optimization.

The graph export and analysis scripts currently live in `/tmp`; they are temporary local evidence, not repository artifacts. The named snapshot lives under `.next/diagnostics/analyze` and can be removed by cleaning `.next`. Preserve or regenerate these artifacts before continuing measurement. This report alone cannot reproduce byte attribution without the baseline export.
