"use client";

import { usePathname } from "next/navigation";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import BackButton from "./BackButton";
import PageTitle from "./PageTitle";

interface ExperimentDomainLayoutProps {
  children: React.ReactNode;
  domain: string;
}

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

  return (
    <div className="min-h-screen w-full sm:-mt-px">
      <div className="w-full sm:border-t">
        <article className="sm:px-0">
          <BackButton href="/experiments" name={prevRoute} />
          {!isIndexPage && <PageTitle title={title} />}
          {children}
        </article>
      </div>
    </div>
  );
}
