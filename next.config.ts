import { createContentCollectionPlugin } from "@content-collections/next";
import type { NextConfig } from "next";

const withContentCollections = createContentCollectionPlugin({
  configPath: "utils/content-collections.ts",
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
  reactStrictMode: false,
  turbopack: {},
};

export default withContentCollections(nextConfig);
