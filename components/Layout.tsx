"use client";

import Head from "next/head";
import GlobalNavigation from "./GlobalNavigation";
import { usePathname } from "next/navigation";
import Footer from "./Footer";
import GlobalNavigationMobile from "./GlobalNavigationMobile";

interface LayoutType {
	children: React.ReactNode;
	browserTitle: string;
	description: string;
}

export default function Layout({ children, browserTitle, description }: LayoutType) {
	const pathname = usePathname();
	const image = "/images/hero.jpg";
	const type = "website";
	return (
		<>
			<Head>
				<title>{pathname === "/" ? "Harits Syah" : `${browserTitle} - Harits Syah`}</title>
				<link rel="icon" href="/Icons/haritssr.svg" />
				<meta name="theme-color" content="#27272a" />
				<meta name="robots" content="follow, index" />
				<meta name="description" content={description} />
				<meta property="og:type" content={type} />
				<meta property="og:site_name" content="HarisLab" />
				<meta property="og:description" content={description} />
				<meta property="og:title" content={browserTitle} />
				<meta property="og:image" content={image} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@haritssr" />
				<meta name="twitter:title" content={browserTitle} />
				<meta name="twitter:description" content={description} />
				<meta name="twitter:image" content={image} />
				<link rel="manifest" href="/static/favicons/site.webmanifest" />
			</Head>

			<GlobalNavigation />

			<main className="mx-auto min-h-screen w-full max-w-5xl px-5 xl:px-0">{children}</main>

			<Footer />
			<GlobalNavigationMobile />
		</>
	);
}
