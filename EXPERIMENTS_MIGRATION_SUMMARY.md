# Experiments Migration Summary

## Overview
Migrated `pages/experiments/` from Pages Router to App Router (`app/experiments/`).

---

## New App Router Structure

```
app/experiments/
├── page.tsx                          # /experiments (root page)
├── [domain]/
│   ├── layout.tsx                    # Domain layout with sidebar navigation
│   ├── page.tsx                      # Domain index page (lists all experiments)
│   └── [experiment]/
│       └── page.tsx                  # Individual experiment page
└── nextjs/                           # Special handling for dynamic content
    ├── posts/page.tsx                # Posts list (SSG)
    ├── posts/[id]/page.tsx           # Individual post
    ├── articles/page.tsx             # Articles list
    ├── articles/[id]/page.tsx        # Individual article
    ├── students/page.tsx             # Students list
    └── students/[id]/page.tsx        # Individual student
```

---

## New Components Structure

All experiment components moved to `components/experiments/`:

| Domain | Count | Files |
|--------|-------|-------|
| browser | 13 | ClockDemo, CustomScrollDemo, DescriptionListDemo, DetailsDemo, DifferentCssStylingDemo, FigureDemo, InputsDemo, IntersectionObserverDemo, NumberGameDemo, ScrollTitleDemo, SelectDemo, TextEditingDemo, YoutubeEmbedDemo |
| haris-lab | 4 | ContextModalDemo, GlobalModalDemo, SideBarDemo, SidebarHierarchyDemo |
| headless-ui | 8 | HeadlessDialogDemo, HeadlessDisclosureDemo, HeadlessListboxDemo, HeadlessMenuDemo, HeadlessPopoverDemo, HeadlessRadioGroupDemo, HeadlessSwitchDemo, HeadlessTabsDemo |
| katex | 1 | KaTeXBasicDemo |
| mantine | 1 | MantineCarouselDemo |
| nextjs | 4 | NextjsImageLocalDemo, NextjsImageRemoteDemo, **NextjsRouterDemo**, NextjsSWRDemo |
| radix-ui | 19 | RadixAccordionDemo, RadixAlertDialogDemo, RadixCheckboxDemo, RadixCollapsibleDemo, RadixDialogDemo, RadixDropdownMenuDemo, RadixHoverCardDemo, RadixPopoverDemo, RadixRadioGroupDemo, RadixScrollAreaDemo, RadixSelectDemo, RadixSliderDemo, RadixSwitchDemo, RadixTabsDemo, RadixToastDemo, RadixToggleDemo, RadixToggleGroupDemo, RadixToolbarDemo, RadixTooltipDemo |
| react | 25 (+1) | ReactConfettiDemo, ReactCounterDemo, ReactEditProfileDemo, ReactFontMixerDemo, ReactForwardRefDemo, ReactFunctionalPropsDemo, ReactGenericSelectDemo, ReactModalInsideModalDemo, ReactSearchBooksDemo, ReactSearchInterpolDemo, ReactSearchTableDemo, ReactSearchableProductDataDemo, ReactSubmitFormDemo, ReactUseContextDarkModeDemo, ReactUseEffectTitleDemo, ReactUseImperativeHandleDemo, ReactUseMemo1Demo, ReactUseReducerTodoListDemo, ReactUseReducerTodoListImmerDemo, ReactUseStateDraggableBoxDemo, ReactUseStateFormDemo, ReactUseStateObjectFormDemo, ReactUseStateReactingToInputDemo, ReactUseStateTodoListDemo, ReactWrapBalancerDemo, **ReactCmdkDemo** |
| react-aria | 1 | ReactAriaCalendarDemo |
| react-query | 1 | ReactQueryBasicDemo |
| react-table | 4 | ReactTableBasicDemo, ReactTableColumnGroupDemo, ReactTableColumnOrderingDemo, ReactTableColumnPinningDemo |
| tailwind-css | 14 | TailwindAppleNavbarDemo, TailwindBlurryDemo, TailwindCenteringDivDemo, TailwindColumnsDemo, TailwindFeedbackDemo, TailwindFloatingLabelsDemo, TailwindGlowingBackgroundDemo, TailwindGridDemo, TailwindNewspaperDemo, TailwindPlanetscaleNavbarDemo, TailwindPositionDemo, TailwindSidebarDemo, TailwindVsAppleColorDemo, TailwindYoutubeThumbnailDemo |
| ui-explorations | 1 | NotionNavbarDemo |
| visx | 2 | VisxBarChartDemo, VisxPieChartDemo |

**Total: 98 experiment components**

---

## Key Changes

### 1. Layout Handling
- **Before**: `LayoutToExperiments` component wrapping each page
- **After**: `ExperimentDomainLayout` client component in `app/experiments/[domain]/layout.tsx`
- Sidebar navigation now uses `usePathname` from `next/navigation` instead of `useRouter` from `next/router`

### 2. Router Migration
| Pages Router | App Router |
|--------------|------------|
| `useRouter()` from `next/router` | `usePathname()` from `next/navigation` |
| `router.reload()` | `window.location.reload()` |
| `next/head` Head component | `metadata` export |
| `getStaticProps()` | Async Server Components |
| `getStaticPaths()` | `generateStaticParams()` |

### 3. Data Fetching Migration

**Before (Pages Router):**
```tsx
export function getStaticProps() {
  const data = getData();
  return { props: { data } };
}

export default function Page({ data }) {
  return <Layout>...</Layout>;
}
```

**After (App Router):**
```tsx
export default async function Page() {
  const data = getData();
  return <>...</>;
}

export function generateStaticParams() {
  return params;
}
```

### 4. Component Refactoring
- Removed `LayoutToExperiments` wrapper from all experiment components
- Added `"use client"` directive to all client components
- Wrapped content in React Fragment (`<>...</>`) instead of layout component

---

## Special Cases Handled

### React Query
Added `QueryClientProvider` wrapper in `ReactQueryBasicDemo`:
```tsx
const queryClient = new QueryClient();

export default function ReactQueryBasicDemo() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}
```

### Router Reload Demos
Replaced `router.reload()` with `window.location.reload()` in:
- `NumberGameDemo.tsx`
- `ReactUseStateReactingToInputDemo.tsx`

### Dynamic Content (Nextjs Domain)
- **Posts**: Uses local markdown files via `utils/posts.js`
- **Articles**: Fetches from JSONPlaceholder API
- **Students**: Fetches from JSONPlaceholder API

All converted from `getStaticProps`/`getStaticPaths` to `generateStaticParams` with async Server Components.

### Router Demo Migration
The `nextjs/router.tsx` page was migrated to showcase App Router navigation hooks:

**Before (Pages Router):**
- `useRouter()` from `next/router`
- Accessed `router.asPath`, `router.pathname`, `router.isFallback`, etc.
- Used `router.push()` for navigation

**After (App Router):**
- `usePathname()` - Get current pathname
- `useSearchParams()` - Get URL search parameters
- `useRouter()` from `next/navigation` - For navigation methods (push, replace, back, forward, refresh)
- Wrapped in `<Suspense>` boundary for CSR bailout compatibility

---

## Configuration Updates

### tsconfig.json
Added path alias for utils:
```json
"@/utils/*": ["utils/*"]
```

---

## Build Results

```
✓ Compiled successfully
✓ Lint passed (208 files)
✓ 184 pages generated

Route (app)
├ ○ /experiments
├ ● /experiments/[domain] (14 domains)
├ ● /experiments/[domain]/[experiment] (98 experiments)
├ ○ /experiments/nextjs/posts
├ ● /experiments/nextjs/posts/[id]
├ ○ /experiments/nextjs/articles
├ ● /experiments/nextjs/articles/[id]
├ ○ /experiments/nextjs/students
└ ● /experiments/nextjs/students/[id]
```

---

## Deleted Files

```
pages/experiments/
├── index.tsx
├── cmdk.tsx
├── browser/
├── haris-lab/
├── headless-ui/
├── katex/
├── mantine/
├── nextjs/
├── radix-ui/
├── react/
├── react-aria/
├── react-query/
├── react-table/
├── tailwind-css/
├── ui-explorations/
└── visx/

pages/_app.tsx (deleted - no longer needed)
pages/_document.tsx (deleted - no longer needed)
```

---

## New Files Created

```
app/experiments/page.tsx
app/experiments/[domain]/layout.tsx
app/experiments/[domain]/page.tsx
app/experiments/[domain]/[experiment]/page.tsx
app/experiments/nextjs/posts/page.tsx
app/experiments/nextjs/posts/[id]/page.tsx
app/experiments/nextjs/articles/page.tsx
app/experiments/nextjs/articles/[id]/page.tsx
app/experiments/nextjs/students/page.tsx
app/experiments/nextjs/students/[id]/page.tsx

components/ExperimentDomainLayout.tsx
components/experiments/* (98 demo components)
```

---

## Notes

- All URLs remain the same (no breaking changes to routes)
- SEO metadata handled via `metadata` export in layout files
- Static generation (SSG) preserved for all experiment pages
- Client interactivity preserved with proper "use client" directives
