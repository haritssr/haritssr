import type { ReactNode } from "react";

export default function Box({
  as: Container = "div",
  headingAs: Heading = "span",
  title,
  name,
  children,
}: {
  as?: "div" | "li";
  headingAs?: "span" | "h3";
  title: ReactNode;
  name?: string;
  children: ReactNode;
}) {
  return (
    <Container className="corner-squircle border-border flex min-w-0 flex-col overflow-hidden rounded-xl border">
      <div className="border-border bg-surface-hover text-foreground flex items-center justify-between gap-2 border-b px-3 py-2">
        <Heading className="text-foreground/90 min-w-0 text-sm font-medium">
          {title}
        </Heading>
        {name !== undefined && name.length > 0 ? (
          <span className="text-muted font-mono text-sm">{`${name}.tsx`}</span>
        ) : null}
      </div>
      <div
        className={
          Container === "li"
            ? "text-foreground flex min-w-0 flex-1 flex-col gap-5 p-5"
            : "space-y-5 p-4"
        }
      >
        {children}
      </div>
    </Container>
  );
}
