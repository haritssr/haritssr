import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const withMDX = createMDX({
  options: {
    rehypePlugins: [
      "rehype-slug",
      [
        "rehype-autolink-headings",
        {
          properties: {
            className: ["anchor"],
          },
        },
      ],
    ],
    remarkPlugins: ["remark-frontmatter", "remark-gfm"],
  },
});

const nextConfig: NextConfig = {
  // Related top-level features; enabling these requires a route migration.
  // Cache component/function output and stream dynamic content behind a static shell.
  // - cacheComponents: true,

  // Prefetch reusable route shells; requires cacheComponents.
  // - partialPrefetching: true,

  // Automatically memoize React components; choose a compiler implementation below.
  // - reactCompiler: true,

  experimental: {
    // Remove unreachable compiler work from memory and disk.
    turbopackGc: true,

    // Disabled after search preloading hit an unactivated lazy compilation proxy.
    turbopackLazyDynamicImports: false,

    // Reclaim persisted dev-cache memory on this 8 GB machine.
    turbopackMemoryEviction: "full",

    // Optional examples for Next.js 16.4, not recommendations or default overrides.
    // Reference: node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/

    // Covers documented experimental options; excludes deprecated/internal switches.
    // Re-read the matching guide before enabling; examples may need dependencies.

    // Turbopack compilation and caching
    // Compile Node.js dynamic imports when server rendering reaches them; dev only.
    // - turbopackLazyDynamicImportsSSR: true,

    // Use the Rust React Compiler; requires top-level reactCompiler: true.
    // - turbopackRustReactCompiler: true,

    // Evaluate loaders/PostCSS in workers; Node 24.13.1+ currently falls back.
    // - turbopackPluginRuntimeStrategy: "workerThreads",

    // Reuse development compilation across restarts; already true by default.
    // - turbopackFileSystemCacheForDev: true,

    // Reuse production compilation in CI; already true, requires preserving .next/cache.
    // - turbopackFileSystemCacheForBuild: true,

    // Prefer the PostCSS config nearest each CSS file over the root config.
    // - turbopackLocalPostcssConfig: true,

    // Follow symlinked packages outside the project; paths must also exist in CI.
    // - turbopackAdditionalRoots: { linkedPackages: { path: "../packages" } },

    // Emit reusable component chunks within merged production JS chunks.
    // Other knobs: minChunkSize, maxChunkCountPerGroup, maxMergeChunkSize,
    // minComponentChunkSize, clusters, firstPageLoadPriority, priorityRoutes,
    // priorityBoost, requestCost. Tune against actual navigation/bundle measurements.
    // - turbopackChunking: { generateComponentChunks: true },

    // CSS, MDX, and package imports
    // Group CSS using a route graph; trades fewer requests for some unused CSS.
    // - cssChunking: "graph",

    // Inline CSS into HTML instead of external stylesheets; compare HTML/cache cost.
    // - inlineCss: true,

    // Override Lightning CSS transforms; applies to Turbopack too.
    // - lightningCssFeatures: { include: ["light-dark"], exclude: ["nesting"] },

    // Use Lightning CSS with webpack; no effect here, Turbopack already uses it.
    // - useLightningcss: true,

    // Compile MDX with Rust; verify compatibility with this site's remark/rehype plugins.
    // - mdxRs: true,

    // Optimize named imports from additional barrel packages; many are already covered.
    // - optimizePackageImports: ["package-name"],

    // Import from trusted remote URLs; creates next.lock; verify bundler support first.
    // - urlImports: ["https://example.com/assets/"],

    // Navigation and development data
    // Automatically retry failed navigation/prefetch/actions after reconnecting.
    // Does not replace this site's service-worker offline document fallback.
    // - useOffline: true,

    // Tune client page-segment freshness in seconds; can display older data longer.
    // - staleTimes: { dynamic: 30, static: 180 },

    // Bundle small prefetch responses; already enabled, object form tunes thresholds.
    // - prefetchInlining: true,

    // Cache Server Component fetches across dev HMR; already true, including no-store.
    // - serverComponentsHmrCache: true,

    // Server APIs and data boundaries
    // Enable forbidden()/unauthorized() and their error pages; experimental APIs.
    // - authInterrupts: true,

    // Enable React taint APIs; switches App Router to React's experimental channel.
    // - taint: true,

    // Tune stable Server Actions: body limit and extra trusted invocation hosts.
    // - serverActions: { bodySizeLimit: "1mb", allowedOrigins: ["my-proxy.com"] },

    // Limit Proxy's cloned body buffer; not a general upload rejection limit.
    // - proxyClientMaxBodySize: "1mb",

    // Build controls and diagnostics
    // Retry failed static page generation before failing the build.
    // - staticGenerationRetryCount: 1,

    // Limit concurrent pages per static-generation worker; consider the 8 GB budget.
    // - staticGenerationMaxConcurrency: 8,

    // Set the minimum page workload before starting another generation worker.
    // - staticGenerationMinPagesPerWorker: 25,

    // Use the project TypeScript CLI during builds; already true, needed for TS 7.
    // - useTypeScriptCli: true,

    // Attach source attribution to reported Web Vitals; requires a reporting consumer.
    // - webVitalsAttribution: ["CLS", "LCP", "INP"],

    // Expose instant-navigation controls only in dedicated test builds, never public CI output.
    // Requires cacheComponents; repository policy currently forbids new test files.
    // - exposeTestingApiInProductionBuild: true,

    // Agent integrations
    // Suggest stable updates/future defaults; reminders only, no automatic upgrade.
    // - agentUpgrade: "experimental-future",

    // Generate agent feedback instructions; requires telemetry and user review to send.
    // - agentFeedback: true,
  },

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        hostname: "ws-public.interpol.int",
        pathname: "/**",
        port: "",
        protocol: "https",
      },
    ],
  },
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "Content-Type",
            value: "application/javascript; charset=utf-8",
          },
        ],
      },
    ];
  },
};

export default withMDX(nextConfig);
