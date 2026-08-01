import { withContentCollections } from "@content-collections/next";

const nextConfig = {
  experimental: {},
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
      {
        hostname: "vignette.wikia.nocookie.net",
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
