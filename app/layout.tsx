import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import MusicProvider from "@/app/(tools)/music/_components/MusicProvider";
import TimerProvider from "@/app/(tools)/timer/_components/TimerProvider";
import FloatingDock from "@/components/floating/FloatingDock";
import Footer from "@/components/Footer";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import SharePageProvider from "@/components/SharePageProvider";
import SiteShortcuts from "@/components/SiteShortcuts";
import { SiteStructuredData } from "@/components/StructuredData";
import TabBarButtom from "@/components/TabBarButtom";
import TopBar from "@/components/topbar/TopBar";
import { GlobalSearchProvider } from "@/components/topbar/TopBarSearch";
import { createPageMetadata } from "@/utils/metadata/pageMetadata";
import { SITE_THEME_COLOR, SITE_URL } from "@/utils/metadata/site";

import "./globals.css";

const inter = localFont({
  src: "../public/fonts/InterVariable.woff2",
});

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Harits Syah",
    description: "Developer, teacher, and founder.",
    path: "/",
  }),
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Harits Syah",
  },
  description: "Developer, teacher, and founder.",
  icons: {
    icon: [
      {
        url: "/favicon-32x32.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
        sizes: "any",
      },
    ],
    apple: "/apple-icon.png",
  },
  metadataBase: new URL(SITE_URL),
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
};

export const viewport: Viewport = {
  themeColor: SITE_THEME_COLOR,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={inter.className} lang="en">
      <body>
        <SiteStructuredData />
        <a
          className="focus:bg-action sr-only z-2147483647 rounded-md px-3 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          href="#main-content"
        >
          Skip to content
        </a>
        <ServiceWorkerRegistration />
        <SharePageProvider>
          <SiteShortcuts />
          <GlobalSearchProvider>
            <FloatingDock>
              <MusicProvider>
                <TimerProvider>
                  <TopBar />
                  <main
                    className="mx-auto w-full max-w-5xl flex-auto shrink-0 px-4 sm:pt-5 xl:px-0"
                    id="main-content"
                  >
                    {children}
                  </main>
                </TimerProvider>
              </MusicProvider>
            </FloatingDock>
          </GlobalSearchProvider>
        </SharePageProvider>
        <Footer />
        <TabBarButtom />
      </body>
    </html>
  );
}
