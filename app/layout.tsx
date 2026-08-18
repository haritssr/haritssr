import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import BottomBar from "@/components/BottomBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import FooterSpacing from "@/components/FooterSpacing";
import TopBarBorderOnScroll from "@/components/TopBarBorderOnScroll";
import "./globals.css";
import localFont from "next/font/local";

const inter = localFont({
  src: "../public/fonts/InterVariable.woff2",
});

export const metadata: Metadata = {
  description: "Developer, teacher, and founder.",
  metadataBase: new URL("https://www.haritssr.com"),
  openGraph: {
    description: "Developer, teacher, and founder.",
    locale: "en-US",
    siteName: "Harits Syah",
    title: "Harits Syah",
    type: "website",
    url: "https://www.haritssr.com",
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
        <NuqsAdapter>
          <TopBarBorderOnScroll />
          <main className="mx-auto min-h-screen w-full max-w-5xl px-5 xl:px-0">
            {children}
          </main>
          <Breadcrumbs />
          <FooterSpacing>
            <Footer />
          </FooterSpacing>
          <BottomBar />
        </NuqsAdapter>
      </body>
    </html>
  );
}
