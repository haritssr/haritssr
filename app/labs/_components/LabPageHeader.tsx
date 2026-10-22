"use client";

import { createContext, use } from "react";
import type { ReactNode } from "react";

import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";

interface LabHeaderDefaults {
  back: { href: string; name: string };
  hideTitle: boolean;
  path?: string;
  title: string;
}

export const LabHeaderContext = createContext<LabHeaderDefaults | null>(null);

export default function LabPageHeader({
  back,
  children,
  title,
}: {
  back?: { href: string; name: string };
  children?: ReactNode;
  title?: ReactNode;
}) {
  const defaults = use(LabHeaderContext);

  if (defaults === null) {
    throw new Error("LabPageHeader requires a lab domain shell.");
  }

  const resolvedBack = back ?? defaults.back;
  const resolvedTitle = title ?? (defaults.hideTitle ? null : defaults.title);

  return (
    <PageHeader back={resolvedBack} path={defaults.path}>
      {resolvedTitle === null ? null : (
        <PageTitle
          data-article-back-label={resolvedBack.name}
          data-article-parent={resolvedBack.href}
          data-article-path={defaults.path}
          data-article-title={
            typeof resolvedTitle === "string" ? resolvedTitle : defaults.title
          }
        >
          {resolvedTitle}
        </PageTitle>
      )}
      {children}
    </PageHeader>
  );
}
