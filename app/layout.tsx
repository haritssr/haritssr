import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import BottomBar from "@/components/BottomBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import FooterSpacing from "@/components/FooterSpacing";
import TopBarBorderOnScroll from "@/components/TopBarBorderOnScroll";
import "../styles/globals.css";
import localFont from "next/font/local";

const inter = localFont({
  src: "../public/fonts/InterVariable.woff2",
});

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={inter.className} lang="en">
      <body>
        <NuqsAdapter>
          <TopBarBorderOnScroll />
          <main className="mx-auto min-h-screen w-full max-w-5xl px-5 xl:px-0">{children}</main>
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
