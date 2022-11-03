module.exports = {
  reactStrictMode: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [
      'vignette.wikia.nocookie.net',
      'images.unsplash.com',
      'res.cloudinary.com',
      'ws-public.interpol.int',
    ],
  },
  async redirects() {
    return [
      {
        source: '/experiments',
        destination: '/#experiments',
        permanent: false,
      },
    ];
  },
};
