import type { ReactNode } from "react";

const BADGE_STYLES = {
  general: { background: "bg-foreground/5", dot: "bg-muted" },
  success: { background: "bg-success/10", dot: "bg-success" },
  danger: { background: "bg-danger/10", dot: "bg-danger" },
  progress: { background: "bg-progress/10", dot: "bg-progress" },
  information: { background: "bg-accent/10", dot: "bg-accent" },
} as const;

export default function Badge({
  children,
  variant = "general",
}: {
  children: ReactNode;
  variant?: keyof typeof BADGE_STYLES;
}) {
  const style = BADGE_STYLES[variant];
  return (
    <span
      className={`text-foreground/70 inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${style.background}`}
    >
      <span
        aria-hidden="true"
        className={`size-1.5 shrink-0 rounded-full ${style.dot}`}
      />
      {children}
    </span>
  );
}
