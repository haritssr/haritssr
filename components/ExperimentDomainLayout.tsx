"use client";

import { usePathname } from "next/navigation";

import BackButton from "@/components/BackButton";
import PageTitle from "@/components/PageTitle";
import { getExperimentDomain } from "@/data/ExperimentsData";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";

interface ExperimentDomainLayoutProps {
  children: React.ReactNode;
  domain: string;
}

const standaloneNextjsRoutes = new Set(["articles", "posts", "students"]);

export default function ExperimentDomainLayout({
  children,
  domain,
}: ExperimentDomainLayoutProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const parentPath = `/${segments.slice(0, -1).join("/")}`;
  const previousSegment = segments.at(-2);
  const prevRoute =
    previousSegment === undefined || previousSegment.length === 0
      ? "back"
      : capitalizeFirstLetter(previousSegment.split("-").join(" "));

  const experimentDomain = getExperimentDomain(domain);
  const domainDisplayName = experimentDomain.title;

  // Get experiment title from pathname
  const experimentSlug = segments.at(-1);
  // The index route has only /experiments/<domain> segments.
  const isIndexPage = segments.length === 2;
  const domainChildSlug = segments.at(2);
  const isTaskRoute =
    domain === "ui-explorations" && domainChildSlug === "task";
  const isStandaloneNextjsRoute =
    domain === "nextjs" &&
    domainChildSlug !== undefined &&
    standaloneNextjsRoutes.has(domainChildSlug);
  const experimentTitle =
    domainChildSlug === undefined
      ? undefined
      : experimentDomain.experiments.find(
          (experiment) => experiment.slug === domainChildSlug
        )?.title;

  // Get title for the page
  const fallbackTitle =
    experimentSlug === undefined || experimentSlug.length === 0
      ? domainDisplayName
      : experimentSlug
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
  const title = isIndexPage
    ? domainDisplayName
    : (experimentTitle ?? fallbackTitle);
  const backButtonName = segments.length === 3 ? domainDisplayName : prevRoute;

  return (
    <div className="min-h-screen w-full sm:-mt-px">
      <div className="w-full">
        <article className="sm:px-0">
          {!isTaskRoute && (
            <BackButton href={parentPath} name={backButtonName} />
          )}
          {!(isTaskRoute || isIndexPage || isStandaloneNextjsRoute) && (
            <PageTitle>{title}</PageTitle>
          )}
          {children}
        </article>
      </div>
    </div>
  );
}
