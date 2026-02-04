"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { ExperimentsData } from "data/ExperimentsData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useInView } from "react-intersection-observer";
import Breadcrumbs from "./Breadcrumbs";
import { GitHubIcon } from "./Icons";

interface ExperimentDomainLayoutProps {
  children: React.ReactNode;
  domain: string;
}

export default function ExperimentDomainLayout({
  children,
  domain,
}: ExperimentDomainLayoutProps) {
  const pathname = usePathname();
  const { ref, inView } = useInView({ rootMargin: "-90px" });

  // Get domain display name
  const domainDisplayName = domain
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Get experiment title from pathname
  const segments = pathname?.split("/") || [];
  const experimentSlug = segments.at(-1);
  const isIndexPage = segments.length === 3; // /experiments/[domain]

  // Get title for the page
  const title = isIndexPage
    ? domainDisplayName
    : experimentSlug
        ?.split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ") || domainDisplayName;

  // Get array of links for this domain
  const domainData = ExperimentsData.find(
    (exp) => exp.title.toLowerCase().replace(/\s+/g, "-") === domain
  );
  const links = domainData?.links || [];

  // Build GitHub source URL
  const lastSegment = segments.at(-1);
  const isExperimentPage = segments.length === 4;
  const githubRoute = `https://github.com/haritssr/haritssr/blob/main/app/experiments/${domain}${isExperimentPage ? `/${lastSegment}` : ""}/page.tsx`;

  return (
    <div className="mx-auto flex max-w-5xl sm:-mt-px sm:gap-10 sm:px-5 xl:px-0">
      <div className="grid min-h-screen w-full max-w-5xl grid-cols-1 sm:grid-cols-4">
        {/* Sidebar */}
        <SideBar domain={domain} links={links} />

        {/* Content */}
        <div className="border-r border-b sm:col-span-3 sm:border-t">
          <article className="sm:px-0">
            {/* SubNavigation */}
            <section
              className={`sticky top-0 border-b sm:top-[44.5px] ${
                inView
                  ? "border-zinc-200"
                  : "border-b bg-white/70 saturate-150 backdrop-blur-lg"
              } z-40 bg-white py-2`}
            >
              <div className="mx-auto flex max-w-5xl items-center justify-between px-3 sm:px-3.5">
                <BackToExperiments
                  domain={domainDisplayName}
                  inView={inView}
                  isIndexPage={isIndexPage}
                />
                <PageTitleCenter inView={inView} title={title} />
                <PageSource href={githubRoute} inView={inView} />
              </div>
            </section>

            {/* Header */}
            <div className="px-5">
              <Breadcrumbs />
              <h1
                className="wrap-break-word z-40 mx-auto mt-10 mb-2 block h-auto w-full text-left font-bold text-3xl text-zinc-800"
                ref={ref}
              >
                {title}
              </h1>
              {children}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

const SideBar = ({ domain, links }: { domain: string; links: string[] }) => {
  const pathname = usePathname();
  const segments = pathname?.split("/") || [];
  const lastSegment = segments.at(-1);

  return (
    <div className="hidden border sm:col-span-1 sm:block">
      <Link
        className="sticky top-[45px] block border-b bg-white px-5 py-2 font-medium"
        href={`/experiments/${domain}`}
      >
        {domain
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
      </Link>
      <div className="flex flex-col space-y-1 px-3 py-5 sm:max-h-screen sm:overflow-auto">
        {links.map((experimentPage) => {
          const experimentPageEdited = experimentPage
            .toLowerCase()
            .split(" ")
            .join("-");
          return (
            <Link
              className={`${
                lastSegment === experimentPageEdited
                  ? "bg-action text-white"
                  : "text-zinc-800 hover:bg-zinc-200/70 hover:text-zinc-950"
              } rounded-md px-2 py-1`}
              href={`/experiments/${domain}/${experimentPageEdited}`}
              key={experimentPage}
            >
              {experimentPage}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

function getBackButtonText(
  inView: boolean,
  isIndexPage: boolean,
  domain: string
): string {
  if (!inView) {
    return "Back";
  }
  if (isIndexPage) {
    return "Experiments";
  }
  return domain;
}

const BackToExperiments = ({
  inView,
  domain,
  isIndexPage,
}: {
  inView: boolean;
  domain: string;
  isIndexPage: boolean;
}) => {
  return (
    <Link
      className={`-ml-1 flex cursor-pointer items-center sm:w-1/4 ${inView ? "w-1/2" : "w-1/4"}`}
      href={
        isIndexPage
          ? "/experiments"
          : `/experiments/${domain.toLowerCase().replace(/\s+/g, "-")}`
      }
    >
      <span className="inline-block w-full">
        <span className="group flex items-center">
          <ChevronLeftIcon
            className="h-5 w-5 text-action sm:group-hover:text-action/90"
            strokeWidth={2}
          />
          <span className="-ml-0.5 truncate text-action text-base sm:group-hover:text-action/90 sm:group-hover:underline">
            {getBackButtonText(inView, isIndexPage, domain)}
          </span>
        </span>
      </span>
    </Link>
  );
};

const PageTitleCenter = ({
  title,
  inView,
}: {
  title: string;
  inView: boolean;
}) => {
  return (
    <div className={`sm:1/2 -mr-2 inline ${inView ? "w-0" : "w-1/2"}`}>
      <div className="flex justify-center py-0.5 sm:py-0">
        <div
          className={`truncate text-center font-semibold ${inView ? "hidden text-transparent" : "block text-zinc-800"}`}
        >
          {title}
        </div>
      </div>
    </div>
  );
};

const PageSource = ({ href, inView }: { href: string; inView: boolean }) => {
  return (
    <div className={`flex justify-end sm:w-1/4 ${inView ? "w-1/4" : "w-1/4"}`}>
      <cite className="group not-italic">
        <a
          className="flex w-fit cursor-pointer items-center text-action hover:text-[#2563eb]/90"
          href={href}
          rel="noopener noreferrer"
          target="_blank"
          title="This page source code"
        >
          <span className="mr-2 hidden text-action group-hover:text-action/90 sm:inline-block">
            Source
          </span>{" "}
          <GitHubIcon className="h-5 w-5 cursor-pointer text-action group-hover:text-action/90" />
        </a>
      </cite>
    </div>
  );
};
