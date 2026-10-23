import type { ButtonHTMLAttributes, Ref } from "react";

type ButtonVariant =
  | "black"
  | "attention-subtle"
  | "danger"
  | "danger-subtle"
  | "ghost"
  | "neutral-subtle"
  | "secondary-strong"
  | "outline"
  | "outline-regular"
  | "action-outline-regular"
  | "action-outline"
  | "primary"
  | "primary-subtle"
  | "secondary"
  | "success-subtle";

const BUTTON_BASE_CLASS =
  "inline-flex cursor-pointer items-center justify-center gap-1.5 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed";

const BUTTON_VARIANT_CLASS: Record<ButtonVariant, string> = {
  black:
    "bg-zinc-500 text-zinc-50 transition-colors duration-150 enabled:hover:bg-zinc-600 focus-visible:outline-zinc-500",
  "attention-subtle":
    "border border-transparent bg-attention font-medium text-white transition-colors duration-150 enabled:hover:bg-[color-mix(in_oklab,var(--color-attention)_60%,var(--color-amber-600))] focus-visible:outline-attention",
  danger:
    "border border-danger/30 bg-surface font-medium text-danger select-none hover:bg-danger/10 focus-visible:outline-danger",
  "danger-subtle":
    "border border-transparent bg-danger font-medium text-white transition-colors duration-150 enabled:hover:bg-[color-mix(in_oklab,var(--color-danger)_60%,var(--color-red-600))] focus-visible:outline-danger",
  ghost:
    "font-medium text-zinc-700 transition-colors duration-150 hover:bg-zinc-100 focus-visible:outline-zinc-700",
  "neutral-subtle":
    "border border-transparent bg-foreground/90 font-medium text-white transition-colors duration-150 enabled:hover:bg-foreground focus-visible:outline-foreground",
  "secondary-strong":
    "border border-border bg-white font-medium text-foreground transition-colors duration-150 enabled:hover:bg-interface-hover focus-visible:outline-foreground",
  outline:
    "border-border text-foreground border bg-transparent font-medium transition-colors duration-150 enabled:hover:bg-foreground/5 focus-visible:outline-action",
  "action-outline":
    "border border-action bg-surface font-medium text-action transition-colors duration-150 enabled:hover:bg-action/10 focus-visible:outline-action",
  "outline-regular":
    "border-border text-foreground border bg-transparent font-normal transition-colors duration-150 enabled:hover:bg-foreground/5 focus-visible:outline-action",
  "action-outline-regular":
    "border border-action bg-surface font-normal text-action transition-colors duration-150 enabled:hover:bg-action/10 focus-visible:outline-action",
  primary:
    "bg-action font-medium text-white hover:bg-action-hover focus-visible:outline-action",
  "primary-subtle":
    "border border-transparent bg-action font-medium text-white transition-colors duration-150 enabled:hover:bg-action/90 focus-visible:outline-action",
  secondary:
    "border border-zinc-300 bg-white text-secondary-foreground select-none hover:bg-interface-hover hover:text-secondary-hover-foreground data-popup-open:border-action focus-visible:outline-zinc-700",
  "success-subtle":
    "border border-transparent bg-success font-medium text-white transition-colors duration-150 enabled:hover:bg-success-hover focus-visible:outline-success",
};

const BUTTON_SIZE_CLASS = {
  "icon-circle":
    "size-10 shrink-0 rounded-full p-2 [corner-shape:round] sm:size-8 sm:p-1.5",
  "icon-small": "size-4 shrink-0 rounded-full p-0.5 [corner-shape:round]",
  default: "rounded-md px-3 py-1.5",
  "mobile-roomy": "rounded-md px-3 py-2 sm:py-1.5",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: keyof typeof BUTTON_SIZE_CLASS;
  iconOnly?: boolean;
  loading?: boolean;
  dimWhenDisabled?: boolean;
  ref?: Ref<HTMLButtonElement>;
  variant?: ButtonVariant;
};

const Button = function Button({
  children,
  className,
  disabled,
  iconOnly = false,
  loading = false,
  dimWhenDisabled = true,
  size = "default",
  type = "button",
  variant = "primary",
  ref,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      aria-busy={loading}
      className={`${BUTTON_BASE_CLASS} ${BUTTON_VARIANT_CLASS[variant]} ${iconOnly && size !== "icon-small" && size !== "icon-circle" ? "rounded-lg p-2" : BUTTON_SIZE_CLASS[size]} ${dimWhenDisabled ? "disabled:opacity-50" : "disabled:opacity-100"} ${className ?? ""}`}
      disabled={disabled === true || loading}
      ref={ref}
      type={type}
    >
      {loading ? <span>Loading…</span> : children}
    </button>
  );
};

export default Button;
