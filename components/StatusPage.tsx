import Link from "next/link";
import type { ReactNode } from "react";

import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";

const STATUS_ACTION_BASE_CLASS =
  "inline-flex min-h-10 cursor-pointer items-center justify-center corner-squircle rounded-xl border px-4 py-2 text-center text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action";

const STATUS_ACTION_VARIANT_CLASS = {
  primary: "border-transparent bg-action text-white hover:bg-action-hover",
  secondary: "border-border bg-white text-foreground hover:bg-secondary-hover",
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
  return (
    <div
      className={`flex w-full items-center py-16 ${fullScreen === true ? "bg-background text-foreground min-h-dvh px-4 sm:px-8" : "min-h-[60dvh]"}`}
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="max-w-xl">
          <p className="text-muted mb-5 text-sm font-medium">
            {tone === "error" ? "Error" : "404 · Page not found"}
          </p>
          <PageHeader back={{ href: "/", name: "Home" }}>
            <PageTitle>{title}</PageTitle>
            {description !== undefined && description !== null ? (
              <PageDescription>{description}</PageDescription>
            ) : null}
          </PageHeader>
          {actions !== undefined && actions !== null ? (
            <div className="flex flex-wrap gap-3">{actions}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
