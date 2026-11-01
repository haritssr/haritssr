import Link from "next/link";
import type { ReactNode } from "react";

import Button, { buttonLinkClassName } from "@/components/Button";
import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";

type StatusActionVariant = "primary" | "secondary";

export function StatusActionButton({
  children,
  onClick,
  variant = "primary",
}: {
  children: ReactNode;
  onClick: () => void;
  variant?: StatusActionVariant;
}) {
  return (
    <Button onClick={onClick} variant={variant}>
      {children}
    </Button>
  );
}

export function StatusActionLink({
  children,
  href,
  variant = "primary",
}: {
  children: ReactNode;
  href: string;
  variant?: StatusActionVariant;
}) {
  return (
    <Link className={buttonLinkClassName(variant)} href={href}>
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
