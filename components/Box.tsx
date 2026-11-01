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
    <Container className="corner-squircle border-border bg-background flex min-w-0 flex-col overflow-hidden rounded-lg border drop-shadow-xs supports-[corner-shape:squircle]:rounded-2xl [&_button[data-bento-trigger]]:ml-auto [&_button[data-bento-trigger]]:justify-self-end">
      <div className="border-border flex items-center justify-between gap-2 px-4 pt-3">
        <Heading className="text-foreground min-w-0 font-medium">
          {title}
        </Heading>
        {name !== undefined && name.length > 0 ? (
          <span className="text-muted/70 font-mono text-sm">{`${name}.tsx`}</span>
        ) : null}
      </div>
      <div
        className={
          Container === "li"
            ? "bg-background text-foreground flex min-w-0 flex-1 flex-col gap-5 p-4"
            : "bg-background grid gap-5 p-4 [&>button]:justify-self-start"
        }
      >
        {children}
      </div>
    </Container>
  );
}
