import { withContentCollections } from "@content-collections/next";
import type { NextConfig } from "next";

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
  reactStrictMode: false,
  redirects() {
    return [
      {
        destination: "/task",
        permanent: true,
        source: "/experiments/ui-explorations/task",
      },
    ];
  },
  turbopack: {},
};

export default withContentCollections(nextConfig);
