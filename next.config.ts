import { withContentCollections } from "@content-collections/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  reactStrictMode: false,
  experimental: {},
  redirects() {
    return [
      {
        source: "/experiments/ui-explorations/task",
        destination: "/task",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vignette.wikia.nocookie.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ws-public.interpol.int",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.vercel.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "vignette.wikia.nocookie.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default withContentCollections(nextConfig);
