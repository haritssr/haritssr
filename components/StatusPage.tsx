import Link from "next/link";
import type { ReactNode } from "react";

import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";

const STATUS_ACTION_BASE_CLASS =
  "inline-flex w-full cursor-pointer items-center justify-center corner-squircle rounded-xl px-3.5 py-1.5 text-center text-sm transition-colors sm:basis-0 sm:flex-1 sm:w-auto";

const STATUS_ACTION_VARIANT_CLASS = {
  primary: "bg-zinc-700 text-zinc-100 select-none hover:bg-zinc-700/95",
  secondary:
    "border border-zinc-300 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-700",
} as const;

function getStatusActionClassName(
  variant: keyof typeof STATUS_ACTION_VARIANT_CLASS
) {
  return `${STATUS_ACTION_BASE_CLASS} ${STATUS_ACTION_VARIANT_CLASS[variant]}`;
}

export function StatusActionButton({
  children,
  onClick,
  variant = "primary",
}: {
  children: ReactNode;
  onClick: () => void;
  variant?: keyof typeof STATUS_ACTION_VARIANT_CLASS;
}) {
  return (
    <button
      className={getStatusActionClassName(variant)}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

export function StatusActionLink({
  children,
  href,
  variant = "primary",
}: {
  children: ReactNode;
  href: string;
  variant?: keyof typeof STATUS_ACTION_VARIANT_CLASS;
}) {
  return (
    <Link className={getStatusActionClassName(variant)} href={href}>
      {children}
    </Link>
  );
}

export function StatusPage({
  actions,
  description,
  fullScreen,
  title,
  tone = "neutral",
}: {
  actions?: ReactNode;
  description?: ReactNode;
  fullScreen?: boolean;
  title: string;
  tone?: "error" | "neutral";
}) {
  const wrapperClassName =
    fullScreen === true
      ? "mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-5"
      : "";
  const cardClassName =
    tone === "error"
      ? "border-danger/20 bg-danger/10"
      : "border-border bg-foreground/5";
  const badgeClassName = tone === "error" ? "text-danger" : "text-muted";

  return (
    <div className={wrapperClassName}>
      <PageHeader>
        <PageTitle>{title}</PageTitle>
        <div className={`text-xs font-medium uppercase ${badgeClassName}`}>
          {tone === "error" ? "Error" : "404"}
        </div>
        {description !== undefined && description !== null ? (
          <PageDescription>{description}</PageDescription>
        ) : null}
      </PageHeader>
      {actions !== undefined && actions !== null ? (
        <section
          className={`corner-squircle max-w-fit rounded-xl border px-4 py-5 text-left ${cardClassName}`}
        >
          <div className="flex w-full flex-col items-center justify-center gap-2 sm:flex-row">
            {actions}
          </div>
        </section>
      ) : null}
    </div>
  );
}
