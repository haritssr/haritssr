import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type SectionHeadingProps = ComponentPropsWithoutRef<"h2"> & {
  as?: "h2" | "h3";
  children: ReactNode;
  variant?: "default" | "compact";
};

export default function SectionHeading({
  as: Heading = "h2",
  children,
  className,
  variant = "default",
  ...props
}: SectionHeadingProps) {
  const headingSize = Heading === "h2" ? "text-2xl" : "text-xl";
  const appearance =
    variant === "compact"
      ? "text-muted text-sm font-medium"
      : `text-foreground mb-4 ${headingSize} font-semibold`;

  return (
    <Heading {...props} className={className ?? appearance}>
      {children}
    </Heading>
  );
}
