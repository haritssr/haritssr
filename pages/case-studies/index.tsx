import InternalLink from "@/components/InternalLink";
import BackButton from "@/components/BackButton";
import { experienceCaseStudyData } from "data/experienceCaseStudyData";

import Head from "next/head";
import { useRouter } from "next/router";
import GlobalHead from "@/components/GlobalHead";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function CaseStudiesHomePage() {
  const router = useRouter();
  const image = "/images/hero.jpg";
  const type = "website";

  const browserTitle = "Case Study";
  const description = "Case Studies";
  return (
    <div className="bg-white">
      <Head>
        <title>
          {router.asPath === "/"
            ? "Harits Syah"
            : `${browserTitle} - Harits Syah`}
        </title>
        <link rel="icon" href="/icons/haritssr.jpg" />
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

      <GlobalHead />

      <main className="mx-auto min-h-screen w-full max-w-3xl px-6 xl:px-0">
        <div className="text-3xl mt-10 sm:mt-20 mb-10 break-words font-semibold pb-3 ">
          Case Studies
        </div>
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-10">
          {experienceCaseStudyData.map(
            ({ project_name, hrefCaseStudy, about_client }) => (
              <div className="space-y-1.5" key={project_name}>
                <Image
                  src={about_client.logo_src}
                  alt={project_name}
                  height={40}
                  width={40}
                />
                <InternalLink
                  name={project_name}
                  href={`/case-studies/${hrefCaseStudy}`}
                />
              </div>
            )
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
