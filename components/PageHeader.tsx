import type { ReactNode } from "react";

export default function PageHeader({
  children,
  back,
  path,
}: {
  children: ReactNode;
  back?: { href: string; name: string };
  path?: string;
}) {
  return (
    <header
      className="mt-6 mb-12 flex w-full flex-col gap-1 sm:gap-3"
      data-page-back-href={back?.href}
      data-page-back-label={back?.name}
      data-page-header=""
      data-page-path={path}
    >
      {children}
    </header>
  );
}
