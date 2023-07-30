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
        <link rel="icon" href="/icons/haritssr.png" />
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
        <BackButton href="/#my-experience" name="All Projects" />
        <div className="text-3xl mt-5 sm:mt-10 mb-10 break-words font-semibold pb-3 ">
          Case Studies
        </div>
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-10">
          {experienceCaseStudyData.map(
            ({ project_name, hrefCaseStudy, about_client }) => (
              <div className="space-y-1">
                <Image
                  src={about_client.logo_src}
                  alt={project_name}
                  height={40}
                  width={40}
                />
                <Link
                  key={project_name}
                  passHref
                  href={`/case-studies/${hrefCaseStudy}`}
                  className="block group w-fit cursor-pointer items-center justify-start py-0.5 text-[17px] text-blue-600 hover:text-blue-700 hover:underline sm:text-base"
                >
                  <p className="flex items-center">
                    {project_name}
                    <ChevronRightIcon
                      className="h-4 w-4 text-blue-600 -mb-[1.5px] duration-200 group-hover:text-blue-700 group-hover:underline"
                      strokeWidth={2}
                    />
                  </p>
                </Link>
              </div>
            )
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
