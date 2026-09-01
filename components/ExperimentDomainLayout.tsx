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
  const previousSegment = pathname.split("/").at(-2);
  const prevRoute =
    previousSegment === undefined || previousSegment.length === 0
      ? "back"
      : capitalizeFirstLetter(previousSegment.split("-").join(" "));

  // Get domain display name
  const domainDisplayName = domain
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Get experiment title from pathname
  const segments = pathname.split("/");
  const experimentSlug = segments.at(-1);
  // The index route has only /experiments/<domain> segments.
  const isIndexPage = segments.length === 3;
  const domainChildSlug = segments.at(3);
  const isTaskRoute =
    domain === "ui-explorations" && domainChildSlug === "task";
  const isStandaloneNextjsRoute =
    domain === "nextjs" &&
    domainChildSlug !== undefined &&
    standaloneNextjsRoutes.has(domainChildSlug);
  const experimentTitle =
    domainChildSlug === undefined
      ? undefined
      : getExperimentDomain(domain).experiments.find(
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

  return (
    <div className="min-h-screen w-full sm:-mt-px">
      <div className="w-full sm:border-t">
        <article className="sm:px-0">
          {!isTaskRoute && <BackButton href="/experiments" name={prevRoute} />}
          {!(isTaskRoute || isIndexPage || isStandaloneNextjsRoute) && (
            <PageTitle title={title} />
          )}
          {children}
        </article>
      </div>
    </div>
  );
}
