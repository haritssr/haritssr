"use client";

import { usePathname } from "next/navigation";
import { useRef } from "react";

import BackButton from "@/components/BackButton";
import ExperimentTableOfContents from "@/components/ExperimentTableOfContents";
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
  const articleRef = useRef<HTMLElement>(null);
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
        <article className="sm:px-0" ref={articleRef}>
          {experiment?.hideBackButton !== true && (
            <BackButton href={parentPath} name={backButtonName} />
          )}
          {!isIndexPage && (
            <div
              data-experiment-back-label={backButtonName}
              data-experiment-parent={parentPath}
              data-experiment-path={
                segments.length === 3 ? pathname : undefined
              }
              data-experiment-title={title}
            >
              {experiment?.hideTitle !== true && <PageTitle>{title}</PageTitle>}
            </div>
          )}
          {children}
        </article>
        {!isIndexPage && (
          <ExperimentTableOfContents
            articleRef={articleRef}
            key={pathname}
            title={title}
          />
        )}
      </div>
    </div>
  );
}
