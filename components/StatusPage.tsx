import Link from "next/link";
import type { ReactNode } from "react";

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
      ? "flex min-h-screen w-full items-center justify-center"
      : "";
  const cardClassName =
    tone === "error"
      ? "border-rose-200 bg-rose-50"
      : "border-zinc-200 bg-zinc-50/40";
  const badgeClassName = tone === "error" ? "text-rose-700" : "text-zinc-500";

  return (
    <div className={wrapperClassName}>
      <section
        className={`corner-squircle max-w-fit rounded-xl border px-4 py-5 text-left ${cardClassName}`}
      >
        <div className={`text-xs font-medium uppercase ${badgeClassName}`}>
          {tone === "error" ? "Error" : "404"}
        </div>
        <h1 className="mt-2 text-2xl font-semibold text-zinc-800">{title}</h1>
        {description !== undefined && description !== null ? (
          <p className="mt-2 text-sm text-zinc-600">{description}</p>
        ) : null}
        {actions !== undefined && actions !== null ? (
          <div className="mt-5 flex w-full flex-col items-center justify-center gap-2 sm:flex-row">
            {actions}
          </div>
        ) : null}
      </section>
    </div>
  );
}
