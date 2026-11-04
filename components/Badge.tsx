import type { ReactNode } from "react";

// Each badge uses one hue: tinted background, solid dot, and a darker shade for text.
const BADGE_STYLES = {
  general: {
    background: "bg-foreground/5",
    dot: "bg-muted",
    text: "text-foreground/70",
  },
  success: {
    background: "bg-success/10",
    dot: "bg-success",
    text: "text-green-800",
  },
  danger: {
    background: "bg-danger/10",
    dot: "bg-danger",
    text: "text-red-800",
  },
  progress: {
    background: "bg-progress/10",
    dot: "bg-progress",
    text: "text-orange-800",
  },
  information: {
    background: "bg-accent/10",
    dot: "bg-accent",
    text: "text-violet-800",
  },
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
      className={`${style.text} inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${style.background}`}
    >
      <span
        aria-hidden="true"
        className={`size-1.5 shrink-0 rounded-full ${style.dot}`}
      />
      {children}
    </span>
  );
}
