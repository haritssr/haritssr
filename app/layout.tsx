import type { Metadata } from "next";
import localFont from "next/font/local";

import BottomBar from "@/components/BottomBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import TopBar from "@/components/TopBar";
import { GlobalSearchProvider } from "@/components/TopBarSearch";

import "./globals.css";
import { RSS_PATH, SITE_URL } from "@/utils/site";

const inter = localFont({
  src: "../public/fonts/InterVariable.woff2",
});

export const metadata: Metadata = {
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Harits Syah",
  },
  alternates: {
    types: {
      "application/rss+xml": new URL(RSS_PATH, SITE_URL).toString(),
    },
  },
  description: "Developer, teacher, and founder.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    description: "Developer, teacher, and founder.",
    locale: "en-US",
    siteName: "Harits Syah",
    title: "Harits Syah",
    type: "website",
    url: SITE_URL,
  },
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    index: true,
  },
  title: {
    default: "Harits Syah",
    template: "%s - Harits Syah",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harits Syah",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={inter.className} lang="en">
      <body>
        <a
          className="focus:bg-action sr-only z-2147483647 rounded-md px-3 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          href="#main-content"
        >
          Skip to content
        </a>
        <ServiceWorkerRegistration />
        <GlobalSearchProvider>
          <TopBar />
          <Breadcrumbs />
          <main
            className="mx-auto min-h-screen w-full max-w-5xl px-5 xl:px-0"
            id="main-content"
          >
            {children}
          </main>
        </GlobalSearchProvider>
        <Footer />
        <BottomBar />
      </body>
    </html>
  );
}
