const { withContentlayer } = require("next-contentlayer");

const nextConfig = {
	reactStrictMode: false,
	experimental: {
		reactCompiler: true,
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

module.exports = withContentlayer(nextConfig);
