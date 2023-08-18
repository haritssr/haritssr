const { withContentlayer } = require("next-contentlayer");

const nextConfig = {
  reactStrictMode: false,
  images: {
    formats: ["image/avif", "image/webp"],
    domains: [
      "vignette.wikia.nocookie.net",
      "unsplash.com",
      "res.cloudinary.com",
      "ws-public.interpol.int",
      "assets.vercel.com",
      "unsplash.com",
    ],
  },
};

module.exports = withContentlayer(nextConfig);
