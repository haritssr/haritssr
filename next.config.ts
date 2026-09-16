import createMDX from "@next/mdx";
import type { NextConfig } from "next";

import { SITE_URL } from "./utils/site";

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
  experimental: {
    useTypeScriptCli: true,
  },

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        hostname: "vignette.wikia.nocookie.net",
        pathname: "/**",
        port: "",
        protocol: "https",
      },
      {
        hostname: "unsplash.com",
        pathname: "/**",
        port: "",
        protocol: "https",
      },
      {
        hostname: "res.cloudinary.com",
        pathname: "/**",
        port: "",
        protocol: "https",
      },
      {
        hostname: "ws-public.interpol.int",
        pathname: "/**",
        port: "",
        protocol: "https",
      },
      {
        hostname: "assets.vercel.com",
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
  redirects() {
    return [
      {
        destination: `${SITE_URL}/:path*`,
        has: [
          {
            type: "host",
            value: "haritssr.vercel.app",
          },
        ],
        permanent: true,
        source: "/:path*",
      },
      {
        destination: "/experiments/ui-explorations/masalah-to-feature",
        permanent: true,
        source: "/masalah-to-feature",
      },
      ...(process.env.NODE_ENV === "production"
        ? []
        : [
            {
              destination: "/experiments/ui-explorations/task/:path*",
              permanent: true,
              source: "/task/:path*",
            },
            {
              destination: "/experiments/ui-explorations/tools",
              permanent: true,
              source: "/tools",
            },
          ]),
      {
        destination: "/writing",
        permanent: true,
        source: "/blog",
      },
      {
        destination: "/writing/:slug*",
        permanent: true,
        source: "/blog/:slug*",
      },
    ];
  },
  turbopack: {},
};

export default withMDX(nextConfig);
