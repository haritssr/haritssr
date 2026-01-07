"use client";

import Head from "next/head";
import { usePathname } from "next/navigation";
import Footer from "./Footer";
import GlobalNavigation from "./GlobalNavigation";
import GlobalNavigationMobile from "./GlobalNavigationMobile";

interface LayoutType {
  children: React.ReactNode;
  browserTitle: string;
  description: string;
}

export default function Layout({
  children,
  browserTitle,
  description,
}: LayoutType) {
  const pathname = usePathname();
  const image = "/images/hero.jpg";
  const type = "website";
  return (
    <>
      <Head>
        <title>
          {pathname === "/" ? "Harits Syah" : `${browserTitle} - Harits Syah`}
        </title>
        <link href="/Icons/haritssr.svg" rel="icon" />
        <meta content="#27272a" name="theme-color" />
        <meta content="follow, index" name="robots" />
        <meta content={description} name="description" />
        <meta content={type} property="og:type" />
        <meta content="HarisLab" property="og:site_name" />
        <meta content={description} property="og:description" />
        <meta content={browserTitle} property="og:title" />
        <meta content={image} property="og:image" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta content="@haritssr" name="twitter:site" />
        <meta content={browserTitle} name="twitter:title" />
        <meta content={description} name="twitter:description" />
        <meta content={image} name="twitter:image" />
        <link href="/static/favicons/site.webmanifest" rel="manifest" />
      </Head>

      <GlobalNavigation />

      <main className="mx-auto min-h-screen w-full max-w-5xl px-5 xl:px-0">
        {children}
      </main>

      <Footer />
      <GlobalNavigationMobile />
    </>
  );
}
