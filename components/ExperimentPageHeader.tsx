"use client";

import { createContext, use } from "react";
import type { ReactNode } from "react";

import BackButton from "@/components/BackButton";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";

interface ExperimentHeaderDefaults {
  back: { href: string; name: string };
  hideBackButton: boolean;
  hideTitle: boolean;
  path?: string;
  title: string;
}

export const ExperimentHeaderContext =
  createContext<ExperimentHeaderDefaults | null>(null);

export default function ExperimentPageHeader({
  back,
  children,
  title,
}: {
  back?: { href: string; name: string };
  children?: ReactNode;
  title?: ReactNode;
}) {
  const defaults = use(ExperimentHeaderContext);

  if (defaults === null) {
    throw new Error(
      "ExperimentPageHeader requires an experiment domain shell."
    );
  }

  const resolvedBack = back ?? (defaults.hideBackButton ? null : defaults.back);
  const resolvedTitle = title ?? (defaults.hideTitle ? null : defaults.title);

  return (
    <PageHeader
      navigation={
        resolvedBack === null ? null : <BackButton {...resolvedBack} />
      }
      path={defaults.path}
    >
      {resolvedTitle === null ? null : (
        <PageTitle
          data-article-back-label={resolvedBack?.name ?? defaults.back.name}
          data-article-parent={resolvedBack?.href ?? defaults.back.href}
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
