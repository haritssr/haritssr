import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Harits Syah's Site",
		short_name: "haritssr",
		description:
			"Harits Syah's Personal Site. Portofolio, Blog, and Experiments.",
		start_url: "/",
		display: "standalone",
		background_color: "#ffffff",
		theme_color: "#000000",
		icons: [
			{
				src: "/icon-192x192.png",
				sizes: "192x192",
				type: "image/svg",
			},
			{
				src: "/icon-512x512.png",
				sizes: "512x512",
				type: "image/svg",
			},
		],
	};
}
