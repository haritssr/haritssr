"use client";

import { usePathname } from "next/navigation";

import ExternalLink from "@/components/ExternalLink";
import { sourceUrl } from "@/utils/site";

export default function SourceCodeLink({
  sourcePath,
}: {
  sourcePath?: string;
}) {
  const pathname = usePathname();
  const path = sourcePath ?? (pathname ? `app${pathname}` : undefined);

  if (path === undefined) {
    return null;
  }

  return (
    <div className="mt-3 mb-14">
      <ExternalLink href={sourceUrl(path)} name="Source code" />
    </div>
  );
}
