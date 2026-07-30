import Link from "next/link";
import type { ReactNode } from "react";

const STATUS_ACTION_BASE_CLASS =
  "inline-flex cursor-pointer items-center justify-center rounded-lg corner-squircle px-3.5 py-1.5 text-sm transition-colors";

const STATUS_ACTION_VARIANT_CLASS = {
  primary: "bg-blue-500 text-white hover:bg-blue-400",
  secondary: "border border-zinc-300 text-zinc-700 hover:bg-zinc-100",
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
  const wrapperClassName = fullScreen
    ? "flex min-h-screen w-full items-center justify-center px-5"
    : "px-5";
  const cardClassName =
    tone === "error"
      ? "border-rose-200 bg-rose-50"
      : "border-zinc-200 bg-zinc-50/40";
  const badgeClassName =
    tone === "error" ? "text-rose-600/80" : "text-zinc-500";

  return (
    <div className={wrapperClassName}>
      <section
        className={`corner-squircle w-full max-w-xl rounded-xl border px-5 py-6 text-center ${cardClassName}`}
      >
        <div className={`font-medium text-xs uppercase ${badgeClassName}`}>
          {tone === "error" ? "Error" : "Status"}
        </div>
        <h1 className="mt-2 font-semibold text-2xl text-zinc-800">{title}</h1>
        {description ? (
          <p className="mt-2 text-sm text-zinc-600">{description}</p>
        ) : null}
        {actions ? (
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {actions}
          </div>
        ) : null}
      </section>
    </div>
  );
}
