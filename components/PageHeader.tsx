import type { ReactNode } from "react";

const CONTENT_CLASS_NAME = "flex min-w-0 flex-col gap-1 sm:gap-1.5";

export default function PageHeader({
  children,
  back,
  path,
  aside,
}: {
  children: ReactNode;
  back?: { href: string; name: string };
  path?: string;
  aside?: ReactNode;
}) {
  const hasAside = aside !== undefined && aside !== null;
  return (
    <header
      className={`mt-3 mb-10 w-full sm:mt-6 sm:mb-12 ${hasAside ? "flex items-start justify-between gap-5" : CONTENT_CLASS_NAME}`}
      data-page-back-href={back?.href}
      data-page-back-label={back?.name}
      data-page-header=""
      data-page-path={path}
    >
      {hasAside ? (
        <>
          <div className={`${CONTENT_CLASS_NAME} flex-1`}>{children}</div>
          <div className="shrink-0">{aside}</div>
        </>
      ) : (
        children
      )}
    </header>
  );
}
