import GlobalNavigation from "@/components/GlobalNavigation";
import "../styles/globals.css";
import Footer from "@/components/Footer";
import GlobalNavigationMobile from "@/components/GlobalNavigationMobile";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import ThemeProvider from "provider/ThemeProvider";

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
	// verification: {
	//   google: 'eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw',
	//   yandex: '14d2e73487fa6c71',
	// },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={`${GeistSans.className}`}>
				<ThemeProvider>
					<div className="dark:bg-zinc-900">
						<GlobalNavigation />
						<main className="mx-auto min-h-screen w-full max-w-5xl px-5 xl:px-0 ">{children}</main>
						<Footer />
						<GlobalNavigationMobile />
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
