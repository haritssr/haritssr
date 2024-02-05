const { withContentlayer } = require("next-contentlayer");

// import { withContentlayer } from "next-contentLayer";

const nextConfig = {
	transpilePackages: ["geist"],
	reactStrictMode: false,
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
				hostname: "ws-public.interpol.intt",
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
