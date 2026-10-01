"use client";

import { usePathname } from "next/navigation";

import BackButton from "@/components/BackButton";
import PageTitle from "@/components/PageTitle";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";

interface ExperimentDomainShellProps {
  children: React.ReactNode;
  domainTitle: string;
  experiments: readonly {
    hideBackButton?: boolean;
    hideTitle?: boolean;
    slug: string;
    title: string;
  }[];
}

export default function ExperimentDomainShell({
  children,
  domainTitle,
  experiments,
}: ExperimentDomainShellProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const parentPath = `/${segments.slice(0, -1).join("/")}`;
  const previousSegment = segments.at(-2);
  const prevRoute =
    previousSegment === undefined || previousSegment.length === 0
      ? "back"
      : capitalizeFirstLetter(previousSegment.split("-").join(" "));
  const experimentSlug = segments.at(-1);
  const isIndexPage = segments.length === 2;
  const experiment = experiments.find((entry) => entry.slug === segments.at(2));
  const fallbackTitle =
    experimentSlug === undefined || experimentSlug.length === 0
      ? domainTitle
      : experimentSlug
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
  const title = isIndexPage
    ? domainTitle
    : (experiment?.title ?? fallbackTitle);
  const backButtonName = segments.length === 3 ? domainTitle : prevRoute;

  return (
    <div className="min-h-screen w-full sm:-mt-px">
      <div className="w-full">
        <article className="sm:px-0">
          {experiment?.hideBackButton !== true && (
            <BackButton href={parentPath} name={backButtonName} />
          )}
          {!isIndexPage && experiment?.hideTitle !== true && (
            <PageTitle>{title}</PageTitle>
          )}
          {children}
        </article>
      </div>
    </div>
  );
}
