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

  if (!path) {
    return null;
  }

  return <ExternalLink href={sourceUrl(path)} name="Source code" />;
}
