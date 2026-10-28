import type { AnchorHTMLAttributes, ButtonHTMLAttributes, Ref } from "react";

type ButtonVariant =
  | "black"
  | "attention-subtle"
  | "danger"
  | "danger-subtle"
  | "ghost"
  | "icon"
  | "icon-active"
  | "icon-hover"
  | "icon-active-hover"
  | "neutral-subtle"
  | "neutral-subtle-underlined"
  | "secondary-strong"
  | "floating-secondary"
  | "outline"
  | "floating-outline"
  | "outline-interactive"
  | "outline-toolbar"
  | "outline-regular"
  | "action-outline-regular"
  | "action-outline"
  | "primary"
  | "primary-subtle"
  | "profile-secondary"
  | "timer-running"
  | "timer-paused"
  | "music"
  | "secondary"
  | "success-subtle"
  | "theme-fill";

const BUTTON_BASE_CLASS =
  "inline-flex cursor-pointer items-center justify-center gap-1.5 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed";

const BUTTON_VARIANT_CLASS: Record<ButtonVariant, string> = {
  "theme-fill":
    "border border-transparent bg-(--pill-accent) text-white transition-opacity duration-150 enabled:hover:opacity-90 focus-visible:outline-action",
  "timer-running":
    "border border-transparent bg-timer-running font-medium text-white hover:bg-timer-running/90 focus-visible:outline-timer-running",
  "timer-paused":
    "border border-transparent bg-timer-paused font-medium text-white hover:bg-timer-paused/90 focus-visible:outline-timer-paused",
  music:
    "border border-transparent bg-music font-medium text-white hover:bg-music/90 focus-visible:outline-music",
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
  icon: "gap-0 text-foreground transition-colors duration-150 hover:text-action focus-visible:outline-action",
  "icon-hover":
    "gap-0 text-foreground transition-colors duration-150 enabled:hover:bg-foreground/5 hover:text-action focus-visible:outline-action",
  "icon-active-hover":
    "gap-0 text-action transition-colors duration-150 enabled:hover:bg-foreground/5 focus-visible:outline-action",
  "icon-active":
    "gap-0 text-action transition-colors duration-150 focus-visible:outline-action",
  "neutral-subtle":
    "border border-transparent bg-foreground/90 font-medium text-white transition-colors duration-150 enabled:hover:bg-foreground focus-visible:outline-foreground",
  "neutral-subtle-underlined":
    "gap-0 rounded-none p-0 font-semibold text-foreground underline underline-offset-2 transition-colors duration-150 hover:text-action focus-visible:outline-action",
  "secondary-strong":
    "border border-border bg-white font-medium text-foreground transition-colors duration-150 enabled:hover:bg-interface-hover focus-visible:outline-foreground",
  "floating-secondary":
    "border border-border bg-white font-medium text-foreground transition-colors duration-150 enabled:hover:bg-interface-hover focus-visible:outline-foreground",
  outline:
    "border-border text-foreground border bg-transparent font-medium transition-colors duration-150 enabled:hover:bg-foreground/5 focus-visible:outline-action",
  "floating-outline":
    "border-border text-foreground border bg-transparent font-medium transition-colors duration-150 enabled:hover:bg-foreground/5 focus-visible:outline-action",
  "outline-interactive":
    "border-border text-foreground border bg-transparent font-medium transition-[color,border-color,background-color,transform] duration-150 enabled:hover:bg-foreground/5 focus:border-foreground focus-visible:outline-foreground active:scale-95 active:border-foreground motion-reduce:transition-none",
  "outline-toolbar":
    "border-border text-foreground border bg-transparent transition-colors duration-150 enabled:hover:bg-foreground/5 focus-visible:outline-foreground motion-reduce:transition-none",
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
    "border border-zinc-300 bg-white font-medium text-foreground select-none hover:border-border-hover hover:bg-interface-hover data-popup-open:border-action focus-visible:outline-zinc-700",
  "profile-secondary":
    "border border-border-hover/50 bg-[white] font-medium text-foreground shadow-sm shadow-black/5 select-none hover:border-border-hover hover:bg-interface-hover focus-visible:outline-zinc-700",
  "success-subtle":
    "border border-transparent bg-success font-medium text-white transition-colors duration-150 focus-visible:outline-success",
};

const BUTTON_SIZE_CLASS = {
  "icon-circle":
    "size-10 shrink-0 rounded-full p-2 [corner-shape:round] sm:p-1.5",
  "icon-circle-large":
    "size-11 shrink-0 rounded-full p-2 [corner-shape:round] sm:p-1.5",
  "icon-large":
    "corner-squircle size-10 shrink-0 rounded-sm p-2 supports-[corner-shape:squircle]:rounded-md",
  "icon-compact":
    "corner-squircle size-7 shrink-0 rounded-sm p-1 supports-[corner-shape:squircle]:rounded-md",
  "icon-toolbar":
    "corner-squircle min-h-8.5 shrink-0 gap-1 rounded-md px-2 py-1.5 supports-[corner-shape:squircle]:rounded-xl",
  "icon-small": "size-4 shrink-0 rounded-full p-0.5 [corner-shape:round]",
  default:
    "corner-squircle rounded-md px-3 py-1.5 supports-[corner-shape:squircle]:rounded-xl",
  "mobile-roomy":
    "corner-squircle rounded-md px-3 py-2 supports-[corner-shape:squircle]:rounded-xl sm:py-1.5",
  text: "rounded-none p-0",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: keyof typeof BUTTON_SIZE_CLASS;
  iconOnly?: boolean;
  loading?: boolean;
  dimWhenDisabled?: boolean;
  ref?: Ref<HTMLButtonElement>;
  variant?: ButtonVariant;
};

export function ButtonLink({
  children,
  className,
  size = "default",
  variant = "primary",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  size?: "default" | "profile";
  variant?: "primary" | "secondary" | "profile-secondary";
}) {
  return (
    <a
      {...props}
      className={`${BUTTON_BASE_CLASS} ${BUTTON_VARIANT_CLASS[variant]} ${size === "profile" ? "corner-squircle min-h-10 rounded-md px-4 py-1 text-center supports-[corner-shape:squircle]:rounded-xl md:min-h-9.5" : BUTTON_SIZE_CLASS.default} ${className ?? ""}`}
    >
      {children}
    </a>
  );
}

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
      className={`${BUTTON_BASE_CLASS} ${BUTTON_VARIANT_CLASS[variant]} ${iconOnly && size !== "icon-small" && size !== "icon-circle" && size !== "icon-circle-large" && size !== "icon-compact" && size !== "icon-toolbar" ? "corner-squircle rounded-md p-2 supports-[corner-shape:squircle]:rounded-lg" : BUTTON_SIZE_CLASS[size]} ${dimWhenDisabled ? "disabled:opacity-50" : "disabled:opacity-100"} ${className ?? ""}`}
      disabled={disabled === true || loading}
      ref={ref}
      type={type}
    >
      {loading ? <span>Loading…</span> : children}
    </button>
  );
};

export default Button;
