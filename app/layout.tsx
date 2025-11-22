import GlobalNavigation from "@/components/GlobalNavigation";
import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import Footer from "@/components/Footer";
import GlobalNavigationMobile from "@/components/GlobalNavigationMobile";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	metadataBase: new URL("https://www.haritssr.com"),
	title: {
		default: "Harits Syah",
		template: "%s - Harits Syah",
	},
	description: "Developer, teacher, and founder.",
	openGraph: {
		title: "Harits Syah",
		description: "Developer, teacher, and founder.",
		url: "https://www.haritssr.com",
		siteName: "Harits Syah",
		locale: "en-US",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	twitter: {
		title: "Harits Syah",
		card: "summary_large_image",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={inter.className}>
			<body>
				<NuqsAdapter>
					<GlobalNavigation />
					<main className="mx-auto min-h-screen w-full max-w-5xl px-5 xl:px-0 ">
						{children}
					</main>
					<Footer />
					<GlobalNavigationMobile />
				</NuqsAdapter>
			</body>
		</html>
	);
}
