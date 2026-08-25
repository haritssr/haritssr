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
  const prevRoute = pathname.split("/").at(-2)?.includes("-")
    ? capitalizeFirstLetter(
        pathname.split("/").at(-2)?.split("-").join(" ") as string
      )
    : (capitalizeFirstLetter(pathname.split("/").at(-2) as string) ?? "back");

  // Get domain display name
  const domainDisplayName = domain
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Get experiment title from pathname
  const segments = pathname.split("/");
  const experimentSlug = segments.at(-1);
  const isIndexPage = segments.length === 3; // /experiments/<domain>
  const domainChildSlug = segments.at(3);
  const isTaskRoute =
    domain === "ui-explorations" && domainChildSlug === "task";
  const isStandaloneNextjsRoute =
    domain === "nextjs" &&
    domainChildSlug &&
    standaloneNextjsRoutes.has(domainChildSlug);
  const experimentTitle = domainChildSlug
    ? getExperimentDomain(domain).experiments.find(
        (experiment) => experiment.slug === domainChildSlug
      )?.title
    : undefined;

  // Get title for the page
  const fallbackTitle =
    experimentSlug
      ?.split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ") || domainDisplayName;
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
