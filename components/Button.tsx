import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "danger" | "ghost" | "primary" | "secondary";

const BUTTON_BASE_CLASS =
  "inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 font-medium text-sm transition-colors active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100";

const BUTTON_VARIANT_CLASS: Record<ButtonVariant, string> = {
  danger:
    "border border-red-200 bg-white text-red-600 hover:bg-red-50 focus-visible:outline-red-500",
  ghost: "text-zinc-700 hover:bg-zinc-100 focus-visible:outline-zinc-700",
  primary:
    "bg-action text-white hover:bg-action-hover focus-visible:outline-action",
  secondary:
    "border border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-50 focus-visible:outline-zinc-700",
};

export default function Button({
  children,
  className,
  disabled,
  iconOnly = false,
  loading = false,
  type = "button",
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  iconOnly?: boolean;
  loading?: boolean;
  variant?: ButtonVariant;
}) {
  return (
    <button
      {...props}
      aria-busy={loading || undefined}
      className={`${BUTTON_BASE_CLASS} ${BUTTON_VARIANT_CLASS[variant]} ${iconOnly ? "p-2" : ""} ${className ?? ""}`}
      disabled={disabled || loading}
      type={type}
    >
      {loading ? (
        <span>Loading...</span>
      ) : (
        <span className="inline-flex items-center gap-1.5">{children}</span>
      )}
    </button>
  );
}
