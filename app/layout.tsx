import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import BottomBar from "@/components/BottomBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import { SiteStructuredData } from "@/components/StructuredData";
import TopBar from "@/components/TopBar";
import { GlobalSearchProvider } from "@/components/TopBarSearch";
import { createPageMetadata } from "@/utils/pageMetadata";
import {
  SITE_DARK_THEME_COLOR,
  SITE_THEME_COLOR,
  SITE_URL,
} from "@/utils/site";
import { THEME_PREFERENCE_STORAGE_KEY } from "@/utils/theme";

import "./globals.css";

const inter = localFont({
  src: "../public/fonts/InterVariable.woff2",
});

const themeBootstrapScript = `(() => {
  let preference = null;

  try {
    preference = localStorage.getItem("${THEME_PREFERENCE_STORAGE_KEY}");
  } catch {}

  const prefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const theme =
    preference === "dark" || (preference !== "light" && prefersDark)
      ? "dark"
      : "light";

  document.documentElement.dataset.theme = theme;

  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) {
    themeColor.content =
      theme === "dark" ? "${SITE_DARK_THEME_COLOR}" : "${SITE_THEME_COLOR}";
  }
})();`;

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
    <html className={inter.className} lang="en" suppressHydrationWarning>
      <head>
        <script type="text/javascript">{themeBootstrapScript}</script>
      </head>
      <body>
        <SiteStructuredData />
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
