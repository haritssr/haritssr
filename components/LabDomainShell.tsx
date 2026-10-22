"use client";

import { usePathname } from "next/navigation";

import ArticleBackToTop from "@/components/ArticleBackToTop";
import { LabHeaderContext } from "@/components/LabPageHeader";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";

interface LabDomainShellProps {
  children: React.ReactNode;
  domainTitle: string;
  labs: readonly {
    hideTitle?: boolean;
    slug: string;
    title: string;
  }[];
}

export default function LabDomainShell({
  children,
  domainTitle,
  labs,
}: LabDomainShellProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const parentPath = `/${segments.slice(0, -1).join("/")}`;
  const previousSegment = segments.at(-2);
  const prevRoute =
    previousSegment === undefined || previousSegment.length === 0
      ? "back"
      : capitalizeFirstLetter(previousSegment.split("-").join(" "));
  const labSlug = segments.at(-1);
  const isIndexPage = segments.length === 2;
  const lab = labs.find((entry) => entry.slug === segments.at(2));
  const fallbackTitle =
    labSlug === undefined || labSlug.length === 0
      ? domainTitle
      : labSlug
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
  const title = isIndexPage ? domainTitle : (lab?.title ?? fallbackTitle);
  const backButtonName = segments.length === 3 ? domainTitle : prevRoute;

  return (
    <div className="w-full">
      <div className="w-full">
        <article className="sm:px-0">
          <LabHeaderContext
            value={{
              back: { href: parentPath, name: backButtonName },
              hideTitle: lab?.hideTitle === true,
              path: pathname,
              title,
            }}
          >
            {children}
          </LabHeaderContext>
        </article>
        {!isIndexPage && <ArticleBackToTop key={pathname} />}
      </div>
    </div>
  );
}
