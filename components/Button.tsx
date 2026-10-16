import type { ButtonHTMLAttributes, Ref } from "react";

type ButtonVariant =
  | "danger"
  | "ghost"
  | "outline"
  | "primary"
  | "secondary"
  | "success-subtle";

const BUTTON_BASE_CLASS =
  "inline-flex cursor-pointer items-center justify-center gap-1.5 corner-squircle rounded-xl px-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const BUTTON_VARIANT_CLASS: Record<ButtonVariant, string> = {
  danger:
    "border border-danger bg-surface py-1.5 font-medium text-danger select-none hover:bg-danger/10 focus-visible:outline-danger",
  ghost:
    "py-1.5 font-medium text-zinc-700 transition-colors duration-150 hover:bg-zinc-100 focus-visible:outline-zinc-700",
  outline:
    "border-border text-foreground border bg-transparent py-1.5 font-medium transition-colors duration-150 enabled:hover:bg-foreground/5 focus-visible:outline-action",
  primary:
    "bg-action py-1.5 font-medium text-white hover:bg-action-hover focus-visible:outline-action",
  secondary:
    "border border-zinc-300 bg-white py-1.5 text-zinc-600 select-none hover:bg-zinc-100 hover:text-zinc-700 focus-visible:outline-zinc-700",
  "success-subtle":
    "border border-transparent bg-success py-1.5 font-medium text-white transition-colors duration-150 enabled:hover:bg-success/90 focus-visible:outline-success",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  iconOnly?: boolean;
  loading?: boolean;
  ref?: Ref<HTMLButtonElement>;
  variant?: ButtonVariant;
};

const Button = function Button({
  children,
  className,
  disabled,
  iconOnly = false,
  loading = false,
  type = "button",
  variant = "primary",
  ref,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      aria-busy={loading}
      className={`${BUTTON_BASE_CLASS} ${BUTTON_VARIANT_CLASS[variant]} ${iconOnly ? "p-2" : ""} ${className ?? ""}`}
      disabled={disabled === true || loading}
      ref={ref}
      type={type}
    >
      {loading ? <span>Loading…</span> : children}
    </button>
  );
};

export default Button;
