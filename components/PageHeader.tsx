import type { ReactNode } from "react";

export default function PageHeader({
  children,
  navigation,
  path,
}: {
  children: ReactNode;
  navigation?: ReactNode;
  path?: string;
}) {
  return (
    <header
      className="mb-16 flex w-full flex-col gap-4"
      data-page-header=""
      data-page-path={path}
    >
      <div
        className="flex h-6 min-w-0 items-center"
        data-page-header-navigation=""
      >
        {navigation}
      </div>
      {children}
    </header>
  );
}
