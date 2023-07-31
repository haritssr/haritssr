module.exports = {
  reactStrictMode: false,
  images: {
    // remotePatterns: [
    // 	{
    // 		protocol: 'https',
    // 		hostname: 'assets.vercel.com',
    // 		port: '',
    // 		pathname: '/image/upload/**',
    // 	},
    // 	{
    // 		protocol: 'https',
    // 		hostname: 'unsplash.com',
    // 		port: '',
    // 		pathname: '/photos/**',
    // 	},
    // ],
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
  async redirects() {
    return [
      {
        source: "/experiences",
        destination: "/case-studies",
        permanent: false,
      },
    ];
  },
};
