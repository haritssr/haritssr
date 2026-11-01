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
    <Container className="corner-squircle bg-background flex min-w-0 flex-col overflow-hidden rounded-lg drop-shadow-2xl supports-[corner-shape:squircle]:rounded-2xl">
      <div className="border-border text-foreground flex items-center justify-between gap-2 border-b border-dashed px-3 py-2.5">
        <Heading className="text-foreground/90 min-w-0 text-sm font-medium">
          {title}
        </Heading>
        {name !== undefined && name.length > 0 ? (
          <span className="text-muted/70 font-mono text-sm">{`${name}.tsx`}</span>
        ) : null}
      </div>
      <div
        className={
          Container === "li"
            ? "bg-background text-foreground flex min-w-0 flex-1 flex-col gap-5 p-5"
            : "bg-background grid gap-5 p-4 [&>button]:justify-self-start"
        }
      >
        {children}
      </div>
    </Container>
  );
}
