# Pages → App Router Migration Plan

## Executive Summary

**Scope:** Migrate ~60 experiment pages from `pages/` to `app/`  
**Estimated Effort:** 8-13 hours  
**Risk Level:** Medium (can be done incrementally)  
**Key Challenge:** `LayoutToExperiments` refactor with sidebar navigation

---

## Pre-Migration Checklist

- [ ] Create backup branch: `git checkout -b migration/pages-to-app`
- [ ] Run full test: `bun run build && bun run lint`
- [ ] Document any hardcoded URL references

---

## Phase 1: Foundation (2 hours)

### 1.1 Create Experiments Root Layout

Create `app/experiments/layout.tsx`:

```typescript
import type { Metadata } from "next";
import { ExperimentsSidebar } from "@/app/components/ExperimentsSidebar";
import { ExperimentsHeader } from "@/app/components/ExperimentsHeader";

export const metadata: Metadata = {
  title: {
    default: "Experiments - Harits Syah",
    template: "%s - Experiments - Harits Syah",
  },
  description: "Interactive experiments across the JavaScript-React ecosystem",
};

export default function ExperimentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-5xl sm:-mt-px sm:gap-10 sm:px-5 xl:px-0">
      <div className="grid min-h-screen w-full max-w-5xl grid-cols-1 sm:grid-cols-4">
        <ExperimentsSidebar />
        <div className="border-r border-b sm:col-span-3 sm:border-t">
          {children}
        </div>
      </div>
    </div>
  );
}
```

### 1.2 Create Client Sidebar Component

Create `app/components/ExperimentsSidebar.tsx`:

```typescript
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExperimentsData } from "data/ExperimentsData";

export function ExperimentsSidebar() {
  const pathname = usePathname();
  
  // Extract domain from pathname: /experiments/react/counter -> react
  const domain = pathname.split("/")[2] || "";
  
  const experiment = ExperimentsData.find(
    (exp) => exp.title.toLowerCase().replace(" ", "-") === domain
  );
  
  const links = experiment?.links || [];

  return (
    <div className="hidden border sm:col-span-1 sm:block">
      <Link
        href={`/experiments/${domain}`}
        className="sticky top-[45px] block border-b bg-white px-5 py-2 font-medium"
      >
        {experiment?.title || "Experiments"}
      </Link>
      <div className="flex flex-col space-y-1 px-3 py-5 sm:max-h-screen sm:overflow-auto">
        {links.map((experimentPage) => {
          const slug = experimentPage.toLowerCase().split(" ").join("-");
          const href = `/experiments/${domain}/${slug}`;
          const isActive = pathname === href;

          return (
            <Link
              key={experimentPage}
              href={href}
              className={`rounded-md px-2 py-1 ${
                isActive
                  ? "bg-action text-white"
                  : "text-zinc-800 hover:bg-zinc-200/70"
              }`}
            >
              {experimentPage}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
```

### 1.3 Create Experiment Page Layout Component

Create `app/components/ExperimentPage.tsx`:

```typescript
"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useInView } from "react-intersection-observer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { GitHubIcon } from "@/components/Icons";

interface ExperimentPageProps {
  children: React.ReactNode;
  title: string;
  domain: string;
}

export function ExperimentPage({ children, title, domain }: ExperimentPageProps) {
  const pathname = usePathname();
  const githubRoute = `https://github.com/haritssr/haritssr/blob/main/app${pathname}/page.tsx`;
  const { ref, inView } = useInView({ rootMargin: "-90px" });

  return (
    <article className="sm:px-0">
      {/* SubNavigation */}
      <section
        className={`sticky top-0 border-b sm:top-[44.5px] z-40 bg-white py-2 ${
          inView ? "border-zinc-200" : "border-b bg-white/70 backdrop-blur-lg"
        }`}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-3 sm:px-3.5">
          <BackToExperiments domain={domain} inView={inView} />
          <PageTitleCenter inView={inView} title={title} />
          <PageSource href={githubRoute} inView={inView} />
        </div>
      </section>

      {/* Content */}
      <div className="px-5">
        <Breadcrumbs />
        <h1
          ref={ref}
          className="wrap-break-word z-40 mx-auto mt-10 mb-2 block h-auto w-full text-left font-bold text-3xl text-zinc-800"
        >
          {title}
        </h1>
        {children}
      </div>
    </article>
  );
}

// ... BackToExperiments, PageTitleCenter, PageSource components
```

### 1.4 Migrate Experiments Landing Page

Create `app/experiments/page.tsx`:

```typescript
import { ExperimentsData } from "data/ExperimentsData";
import ExperimentsGrid from "@/components/ExperimentsGrid";
import { PageTitle } from "@/components/SubTitle";

export const metadata = {
  title: "Experiments",
  description: "Home",
};

export default function ExperimentsPage() {
  const totalExperiment = ExperimentsData.reduce(
    (acc, exp) => acc + exp.links.length,
    0
  );

  return (
    <div className="px-5">
      <PageTitle
        description={`${totalExperiment} unique individual (per page) experiments across Javascript-React ecosystem stack`}
        title="Experiments"
      />
      <ExperimentsGrid />
    </div>
  );
}
```

**Verify:** Run `bun run dev` and check `/experiments` renders correctly.

---

## Phase 2: Static Pages (2 hours)

Migrate pages with no data fetching or client dependencies:

### 2.1 Template for Static Migration

For each static page (e.g., `pages/experiments/tailwind-css/grid.tsx`):

1. **Create directory:** `app/experiments/tailwind-css/grid/`
2. **Create page.tsx:**

```typescript
import { ExperimentPage } from "@/app/components/ExperimentPage";
import SubTitle from "@/components/SubTitle";

export const metadata = {
  title: "Grid",
};

export default function GridPage() {
  return (
    <ExperimentPage domain="Tailwind CSS" title="Grid">
      <SubTitle>CSS Grid examples</SubTitle>
      {/* Content from original page */}
    </ExperimentPage>
  );
}
```

### 2.2 Batch Migration Order

| Order | Directory | Files | Time |
|-------|-----------|-------|------|
| 1 | `tailwind-css/*` | 14 | 30 min |
| 2 | `browser/*` | 13 | 30 min |
| 3 | `radix-ui/index` | 1 | 10 min |
| 4 | `headless-ui/index` | 1 | 10 min |

---

## Phase 3: Client Component Pages (2 hours)

Pages using React hooks, browser APIs, or React Query:

### 3.1 Template for Client Pages

```typescript
"use client";

import { ExperimentPage } from "@/app/components/ExperimentPage";
import { useState } from "react";

export default function CounterPage() {
  const [count, setCount] = useState(0);

  return (
    <ExperimentPage domain="React" title="Counter">
      <button onClick={() => setCount(c => c + 1)}>
        Count: {count}
      </button>
    </ExperimentPage>
  );
}
```

### 3.2 Pages Requiring React Query

Create `app/components/ReactQueryProvider.tsx`:

```typescript
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

Create layout for React Query experiments:

```typescript
// app/experiments/react-query/layout.tsx
import { ReactQueryProvider } from "@/app/components/ReactQueryProvider";

export default function ReactQueryLayout({ children }: { children: React.ReactNode }) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
```

### 3.3 Batch Migration Order

| Order | Directory | Files | Notes |
|-------|-----------|-------|-------|
| 1 | `react/*` | 20 | Add `"use client"` |
| 2 | `react-query/*` | 2 | Use RQ layout |
| 3 | `react-table/*` | 5 | Add `"use client"` |
| 4 | `radix-ui/*` | 16 | Add `"use client"` |
| 5 | `headless-ui/*` | 7 | Add `"use client"` |

---

## Phase 4: Data Fetching Pages (2 hours)

Pages using `getStaticProps`, `getStaticPaths`, or `getServerSideProps`:

### 4.1 SSG Pages (getStaticProps/Paths)

**Before:** `pages/experiments/nextjs/posts/[id].tsx`

**After:** `app/experiments/nextjs/posts/[id]/page.tsx`

```typescript
import { getAllPostIds, getPostData } from "utils/posts";
import { ExperimentPage } from "@/app/components/ExperimentPage";
import { format, parseISO } from "date-fns";

// Replaces getStaticPaths
export async function generateStaticParams() {
  return getAllPostIds();
}

// Optional: Generate metadata
export async function generateMetadata({ params }: { params: { id: string } }) {
  const post = await getPostData(params.id);
  return {
    title: post.title,
  };
}

// Replaces getStaticProps + component
export default async function PostPage({ params }: { params: { id: string } }) {
  const postData = await getPostData(params.id);
  
  return (
    <ExperimentPage domain="Nextjs" title={postData.title}>
      <time dateTime={postData.date}>
        {format(parseISO(postData.date), "LLLL d, yyyy")}
      </time>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </ExperimentPage>
  );
}
```

### 4.2 SSR Pages (getServerSideProps)

**Before:** `pages/experiments/nextjs/students/[id].tsx`

**After:** `app/experiments/nextjs/students/[id]/page.tsx`

```typescript
// No generateStaticParams = SSR by default
export default async function StudentPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  // Direct data fetch on server
  const student = await fetchStudent(params.id);
  
  return (
    <ExperimentPage domain="Nextjs" title={student.name}>
      <StudentDetail student={student} />
    </ExperimentPage>
  );
}
```

### 4.3 Pages to Migrate

| Page | Pattern | New Location |
|------|---------|--------------|
| `experiments/nextjs/articles/[id]` | getStaticProps/Paths | `app/experiments/nextjs/articles/[id]/page.tsx` |
| `experiments/nextjs/articles/index` | Static | `app/experiments/nextjs/articles/page.tsx` |
| `experiments/nextjs/posts/[id]` | getStaticProps/Paths | `app/experiments/nextjs/posts/[id]/page.tsx` |
| `experiments/nextjs/posts/index` | Static | `app/experiments/nextjs/posts/page.tsx` |
| `experiments/nextjs/students/[id]` | getServerSideProps | `app/experiments/nextjs/students/[id]/page.tsx` |
| `experiments/nextjs/students/index` | Static | `app/experiments/nextjs/students/page.tsx` |
| `comments/[commentId]` | getStaticProps/Paths | `app/comments/[commentId]/page.tsx` |
| `comments` | Static | `app/comments/page.tsx` |

---

## Phase 5: Special Cases (1 hour)

### 5.1 Router Demo Page

`pages/experiments/nextjs/router.tsx` uses `useRouter` extensively.

**Strategy:** Add `"use client"` and update imports:

```typescript
"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function RouterPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Note: App Router's useRouter has different API
  // router.isReady, router.asPath not available
  // Use pathname and searchParams instead
  
  return (
    <ExperimentPage domain="Nextjs" title="Router">
      <div>pathname: {pathname}</div>
      <div>searchParams: {searchParams.toString()}</div>
      <button onClick={() => router.push("/experiments")}>
        Go to Experiments
      </button>
    </ExperimentPage>
  );
}
```

### 5.2 API Routes

**Decision:** Keep `pages/api/` as-is. No migration needed.

Optional Route Handlers (future):
```typescript
// app/api/comments/route.ts
import { comments } from "data/comments";

export async function GET() {
  return Response.json(comments);
}
```

---

## Phase 6: Cleanup (1 hour)

1. **Remove pages/_app.tsx** - No longer needed
2. **Remove pages/_document.tsx** - No longer needed
3. **Delete migrated pages** from `pages/`
4. **Update tsconfig.json** if needed
5. **Final build test:** `bun run build`
6. **Final lint check:** `bun run lint`

---

## Migration Tracker

| Phase | Status | Files Migrated | Notes |
|-------|--------|----------------|-------|
| Phase 1 | ⬜ | 0/2 | Foundation |
| Phase 2 | ⬜ | 0/28 | Static pages |
| Phase 3 | ⬜ | 0/50 | Client pages |
| Phase 4 | ⬜ | 0/8 | Data fetching |
| Phase 5 | ⬜ | 0/2 | Special cases |
| Phase 6 | ⬜ | - | Cleanup |

---

## Testing Checklist

After each phase:
- [ ] `bun run dev` starts without errors
- [ ] Navigate to migrated routes
- [ ] Check sidebar navigation works
- [ ] Check mobile responsiveness
- [ ] Verify metadata (tab titles)
- [ ] `bun run build` succeeds
- [ ] `bun run lint` passes

---

## Rollback Plan

If issues arise:

```bash
# Revert to main branch
git checkout main

# Or restore specific files
git checkout main -- pages/experiments/react/counter.tsx
```

The `pages/` and `app/` directories can coexist - prioritize `app/` routes when both exist.
