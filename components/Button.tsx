import type { ButtonHTMLAttributes, Ref } from "react";

type ButtonVariant = "danger" | "ghost" | "primary" | "secondary";

const BUTTON_BASE_CLASS =
  "inline-flex cursor-pointer items-center justify-center gap-1.5 corner-squircle rounded-lg px-3 text-sm transition-colors active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100";

const BUTTON_VARIANT_CLASS: Record<ButtonVariant, string> = {
  danger:
    "border border-red-600 bg-white py-1.25 font-medium text-red-700 select-none hover:bg-red-50 focus-visible:outline-red-700",
  ghost:
    "py-1.25 font-medium text-zinc-700 hover:bg-zinc-100 focus-visible:outline-zinc-700",
  primary:
    "bg-action py-1.25 font-medium text-white hover:bg-action-hover focus-visible:outline-action",
  secondary:
    "border border-zinc-300 bg-white py-1.25 text-zinc-600 select-none hover:bg-zinc-100 hover:text-zinc-700 focus-visible:outline-zinc-700",
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
      {loading ? (
        <span>Loading…</span>
      ) : (
        <span className="inline-flex items-center gap-1.5">{children}</span>
      )}
    </button>
  );
};

export default Button;
