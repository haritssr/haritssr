# Pages Router → App Router Migration Analysis

## 📊 Current State Overview

### Pages Directory (155 files total)
```
pages/
├── _app.tsx                    # Global providers (React Query)
├── _document.tsx               # Custom document with font-inter
├── api/                        # API routes (5 files)
│   ├── [[...params]].js        # Catch-all route
│   ├── comments/               # REST API for comments
│   ├── hello.js
│   ├── react-query-basic.js
│   └── searchWithApi.js
├── comments/                   # SSG pages with getStaticPaths/Props
├── comments.js
└── experiments/                # ~90 experiment pages
    ├── index.tsx               # Experiments landing
    ├── browser/                # Browser API experiments (13 files)
    ├── cmdk.tsx
    ├── haris-lab/              # HarisLab UI experiments (5 files)
    ├── headless-ui/            # Headless UI experiments (8 files)
    ├── katex/                  # Math rendering (2 files)
    ├── mantine/                # Mantine UI (2 files)
    ├── nextjs/                 # Next.js experiments
    │   ├── articles/           # SSG with markdown
    │   ├── posts/              # SSG with markdown
    │   ├── students/           # SSR example
    │   └── router.tsx          # useRouter demo
    ├── radix-ui/               # Radix UI experiments (17 files)
    ├── react/                  # React experiments (20 files)
    ├── react-aria/             # React Aria (2 files)
    ├── react-query/            # React Query experiments (2 files)
    ├── react-table/            # React Table (5 files)
    ├── tailwind-css/           # Tailwind experiments (14 files)
    ├── ui-explorations/        # UI experiments (2 files)
    └── visx/                   # Data viz (3 files)
```

### App Directory (Already Migrated - 29 files)
```
app/
├── layout.tsx                  # Root layout with NuqsAdapter
├── page.tsx                    # Home page
├── not-found.js                # 404 page
├── global-error.tsx            # Error boundary
├── robots.ts                   # Dynamic robots.txt
├── manifest.ts                 # Dynamic manifest
├── blog/                       # Blog (already using App Router)
├── experiences/                # Experiences section
├── times-table/                # Interactive app
├── editing-file/               # File editing demo
├── pure/                       # Pure CSS demo
├── sidebar/                    # Sidebar demo
└── new-experiments/            # New experiments using App Router
    └── parallel-routes/        # Parallel routes demo
```

---

## 🎯 Migration Complexity Analysis

### 1. **Data Fetching Patterns** (HIGH COMPLEXITY)

| Pattern | Count | Files | Migration Strategy |
|---------|-------|-------|-------------------|
| `getStaticProps` | 6 | `nextjs/articles/*`, `nextjs/posts/*`, `comments/*` | Use `generateStaticParams` + async Server Component |
| `getStaticPaths` | 6 | Same as above | Use `generateStaticParams` |
| `getServerSideProps` | 1 | `nextjs/students/*` | Use async Server Component |
| Client-side fetch | ~10 | `react-query/*`, `swr.tsx` | Keep as Client Components with `useEffect` |

**Example Migration:**
```typescript
// pages/experiments/nextjs/posts/[id].tsx (BEFORE)
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return { props: { postData } };
}

// app/experiments/nextjs/posts/[id]/page.tsx (AFTER)
export async function generateStaticParams() {
  return getAllPostIds();
}

export default async function Post({ params }: { params: { id: string } }) {
  const postData = await getPostData(params.id); // Direct data fetch
  return <PostView postData={postData} />;
}
```

### 2. **Router API Changes** (MEDIUM COMPLEXITY)

**Affected Files:** 8 files use `useRouter` or `usePathname`

| Hook (Pages) | Hook (App) | Files | Notes |
|--------------|-----------|-------|-------|
| `useRouter` | `useRouter` from `next/navigation` | `router.tsx`, `number-game.tsx`, `usestate-reacting-to-input.tsx` | Different API! |
| `useRouter().asPath` | `usePathname()` + `useSearchParams()` | `LayoutToExperiments.tsx` | Split into two hooks |
| `useRouter().push()` | `useRouter().push()` | Same | Similar but different import |
| `useRouter().query` | `useSearchParams()` | None currently | N/A |

**Critical Differences:**
```typescript
// Pages Router
import { useRouter } from "next/router";
const router = useRouter();
const { id } = router.query;        // { id: "123" }
const path = router.asPath;         // "/experiments/nextjs/router?id=123"
const isReady = router.isReady;     // true when query available

// App Router
import { useRouter, usePathname, useSearchParams, useParams } from "next/navigation";
const router = useRouter();
const pathname = usePathname();     // "/experiments/nextjs/router"
const searchParams = useSearchParams(); // URLSearchParams object
const params = useParams();         // { id: "123" } - route params
// No isReady - params always available in Client Components
```

### 3. **Layout Pattern Changes** (HIGH COMPLEXITY)

**Current Pages Pattern:**
```typescript
// pages/experiments/index.tsx
import Layout from "@/components/Layout";
export default function Page() {
  return (
    <Layout browserTitle="Experiments" description="Home">
      <Content />
    </Layout>
  );
}
```

**App Router Pattern:**
```typescript
// app/experiments/layout.tsx
export const metadata = {
  title: "Experiments - Harits Syah",
  description: "Home",
};

export default function ExperimentsLayout({ children }) {
  return (
    <>
      <TopBar />
      <main className="...">{children}</main>
      <Footer />
      <BottomBar />
    </>
  );
}

// app/experiments/page.tsx
export default function ExperimentsPage() {
  return <Content />;  // No wrapper needed!
}
```

**Challenge:** `LayoutToExperiments` has complex behavior:
- Dynamic sidebar based on domain
- Breadcrumb navigation
- GitHub source link generation
- Intersection observer for sticky header
- Uses `useRouter().asPath` for path detection

### 4. **Head/Metadata Changes** (MEDIUM COMPLEXITY)

**Pages Pattern:**
```typescript
import Head from "next/head";
<Head>
  <title>{browserTitle} - Harits Syah</title>
  <meta name="description" content={description} />
  {/* ... more meta tags */}
</Head>
```

**App Router Pattern:**
```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experiments - Harits Syah",
  description: "...",
  openGraph: { ... },
  twitter: { ... },
};

// OR dynamic:
export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: `${params.id} - Harits Syah`,
  };
}
```

### 5. **API Routes** (LOW COMPLEXITY - Keep in Pages)

API routes can stay in `pages/api/` indefinitely - they work fine alongside App Router. No migration needed unless you want Route Handlers.

**Optional Route Handlers Migration:**
```typescript
// app/api/comments/route.ts
export async function GET() {
  return Response.json(comments);
}

export async function POST(request: Request) {
  const body = await request.json();
  // ... handle post
  return Response.json(newComment, { status: 201 });
}
```

### 6. **Global Providers** (MEDIUM COMPLEXITY)

**Current `_app.tsx`:**
```typescript
const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
```

**App Router Pattern:**
```typescript
// app/providers.tsx
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

// app/layout.tsx
import { Providers } from "./providers";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### 7. **Client Component Boundaries** (HIGH COMPLEXITY)

Many experiment pages use browser APIs that require `"use client"`:

**Files needing `"use client"`:**
- All React Query experiments (useQuery is client-only)
- All react-dnd experiments
- Confetti, Intersection Observer, etc.
- Any using `useRouter` from `next/navigation`
- Any using `useState`, `useEffect`, etc.

**Strategy:** Start with `"use client"` at page level, then optimize by moving Server Components deeper.

---

## 📋 Detailed Migration Plan

### Phase 1: Foundation (1-2 hours)

1. **Create App Router layout for experiments**
   ```
   app/experiments/
   ├── layout.tsx          # Experiments layout (extracted from LayoutToExperiments)
   ├── page.tsx            # Experiments landing page
   ├── loading.tsx         # Optional loading state
   └── error.tsx           # Error boundary
   ```

2. **Extract shared components**
   - Create `app/components/Sidebar.tsx` (server-safe)
   - Create `app/components/ExperimentLayout.tsx`
   - Refactor `LayoutToExperiments` to work in App Router

3. **Update global layout if needed**
   - Ensure `QueryClientProvider` is set up in a client component
   - Already done: `NuqsAdapter` is in place

### Phase 2: Static Experiments (2-3 hours)

Migrate pages with no data fetching or client-side dependencies:

| Priority | Directory | Files | Notes |
|----------|-----------|-------|-------|
| P0 | `experiments/index.tsx` | 1 | Landing page |
| P1 | `experiments/tailwind-css/*` | 14 | Pure UI demos |
| P1 | `experiments/browser/*` | 13 | Browser API demos |
| P2 | `experiments/radix-ui/*` | 17 | Component demos |
| P2 | `experiments/headless-ui/*` | 8 | Component demos |

### Phase 3: Client-Heavy Experiments (2-3 hours)

Pages requiring `"use client"`:

| Priority | Directory | Files | Migration Notes |
|----------|-----------|-------|-----------------|
| P2 | `experiments/react/*` | 20 | Add `"use client"` |
| P2 | `experiments/react-query/*` | 2 | Add `"use client"` + providers |
| P3 | `experiments/react-table/*` | 5 | Add `"use client"` |
| P3 | `experiments/haris-lab/*` | 5 | May need drag-drop providers |

### Phase 4: Data-Fetching Pages (2-3 hours)

| Priority | Directory | Current Pattern | New Pattern |
|----------|-----------|-----------------|-------------|
| P3 | `experiments/nextjs/articles/*` | `getStaticProps/Paths` | `generateStaticParams` + async component |
| P3 | `experiments/nextjs/posts/*` | `getStaticProps/Paths` | Same as above |
| P3 | `experiments/nextjs/students/*` | `getServerSideProps` | Async Server Component |
| P4 | `comments/*` | `getStaticProps/Paths` | Same as above |

### Phase 5: API Routes (Optional, 1 hour)

- Keep `pages/api/` as-is, OR
- Migrate to Route Handlers in `app/api/`

### Phase 6: Cleanup (1 hour)

- Remove `pages/_app.tsx` and `pages/_document.tsx`
- Delete empty `pages/` directory
- Update any hardcoded path references

---

## ⚠️ Key Challenges & Solutions

### Challenge 1: `LayoutToExperiments` Sidebar

**Problem:** The sidebar dynamically renders links based on `ExperimentsData` and highlights current page using `usePathname()`.

**Solution:** Split into Server/Client components:
```typescript
// app/experiments/layout.tsx (Server Component)
export default function ExperimentsLayout({ children, params }) {
  const domain = extractDomain(params); // From URL
  return (
    <div className="flex">
      <Sidebar domain={domain} /> {/* Server-rendered */}
      <div>{children}</div>
    </div>
  );
}

// components/Sidebar.tsx (Client Component for active state)
"use client";
export function Sidebar({ domain, links }) {
  const pathname = usePathname(); // Now works in App Router
  // ... highlight logic
}
```

### Challenge 2: `useRouter().asPath` Usage

**Problem:** `LayoutToExperiments` uses `useRouter().asPath` to generate GitHub source link.

**Solution:** Use `usePathname()` from `next/navigation`:
```typescript
// Before
const lastThreeSegmentRoute = useRouter().asPath;

// After  
const pathname = usePathname();
// pathname === "/experiments/react/counter"
```

### Challenge 3: Head/Metadata per Page

**Problem:** Each experiment has different metadata currently set via `<Head>` in `LayoutToExperiments`.

**Solution:** Use `generateMetadata` in each page:
```typescript
// app/experiments/react/counter/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Counter - React Experiments - Harits Syah",
  description: "React useState counter example",
};
```

### Challenge 4: React Query Provider

**Problem:** React Query currently in `_app.tsx`, needs to be available in App Router.

**Solution:** Create client providers wrapper:
```typescript
// app/providers.tsx
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function ReactQueryProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

// Use in layouts that need it, or globally in root layout
```

---

## 📊 Effort Estimate

| Phase | Hours | Risk Level |
|-------|-------|------------|
| Phase 1: Foundation | 1-2 | Low |
| Phase 2: Static Experiments | 2-3 | Low |
| Phase 3: Client Experiments | 2-3 | Medium |
| Phase 4: Data-Fetching | 2-3 | Medium |
| Phase 5: API Routes | 0-1 | Low |
| Phase 6: Cleanup | 1 | Low |
| **Total** | **8-13 hours** | **Medium** |

---

## 🏆 Best Practices to Follow

1. **Incremental Migration**
   - Keep `pages/` and `app/` working simultaneously
   - Use Next.js rewrites to test routes
   - Migrate one directory at a time

2. **Server Components by Default**
   - Start all pages as Server Components
   - Add `"use client"` only when needed
   - Extract client logic into dedicated components

3. **Co-location**
   ```
   app/experiments/react/counter/
   ├── page.tsx           # Page component
   ├── layout.tsx         # Optional layout
   ├── Counter.tsx        # Client component
   ├── useCounter.ts      # Custom hook
   └── utils.ts           # Utilities
   ```

4. **Loading States**
   ```typescript
   // app/experiments/nextjs/posts/[id]/loading.tsx
   export default function Loading() {
     return <PostSkeleton />;
   }
   ```

5. **Error Boundaries**
   ```typescript
   // app/experiments/error.tsx
   "use client";
   export default function Error({ error, reset }) {
     return <ErrorDisplay error={error} onRetry={reset} />;
   }
   ```

---

## 🚀 Quick Start Decision Tree

```
Should I migrate pages X to App Router?
│
├─ Is it a simple static page?
│  └─ YES → Migrate immediately (easy win)
│
├─ Does it use getStaticProps/getServerSideProps?
│  └─ YES → Migrate with async Server Component
│
├─ Does it use client-side data fetching (React Query, SWR)?
│  └─ YES → Add "use client", migrate layout separately
│
├─ Does it use pages router specific APIs (router.events)?
│  └─ YES → Evaluate if feature still needed, then refactor
│
└─ Is it an API route?
   └─ YES → Can keep in pages/api/ indefinitely
```

---

## 📝 Migration Checklist Template

For each page migration:

- [ ] Create App Router file structure
- [ ] Copy component code
- [ ] Add `"use client"` if using browser APIs
- [ ] Update imports (`next/router` → `next/navigation`)
- [ ] Migrate data fetching (if any)
- [ ] Create `metadata` export
- [ ] Test build passes
- [ ] Test functionality in browser
- [ ] Update any internal links
- [ ] Delete pages/ version

---

## 🔗 Useful References

- [Next.js App Router Migration Guide](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)
- [Next.js App Router Roadmap](https://beta.nextjs.org/docs/app-directory-roadmap)
- [Server Components vs Client Components](https://nextjs.org/docs/getting-started/react-essentials)
