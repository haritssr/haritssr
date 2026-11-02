import { useId } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type SectionProps = Omit<
  ComponentPropsWithoutRef<"section">,
  "children" | "title" | "aria-label" | "aria-labelledby"
> & {
  children?: ReactNode;
  title: ReactNode;
  action?: ReactNode;
  description?: ReactNode;
  contentClassName?: string;
  spacing?: boolean;
  headingAs?: SectionHeadingProps["as"];
  headingClassName?: string;
  headingVariant?: SectionHeadingProps["variant"];
};

export default function Section({
  children,
  title,
  action,
  description,
  id,
  className = "",
  contentClassName = "",
  spacing = true,
  headingAs,
  headingClassName,
  headingVariant,
  ...props
}: SectionProps) {
  const generatedId = useId();
  const labelId = (id?.length ?? 0) > 0 ? `${id}-heading` : generatedId;
  const hasDescription = description !== undefined && description !== null;
  const wrapContent =
    children !== undefined && children !== null && contentClassName.length > 0;
  const heading = (
    <SectionHeading
      as={headingAs}
      className={headingClassName}
      id={labelId}
      spacingAfter={hasDescription ? "default" : "section"}
      variant={headingVariant}
    >
      {title}
    </SectionHeading>
  );

  return (
    <section
      {...props}
      aria-labelledby={labelId}
      className={`${spacing ? "space-y-5" : ""} ${className}`}
      id={id}
    >
      {action === undefined || action === null ? (
        heading
      ) : (
        <div
          className={`flex min-w-0 flex-wrap items-end justify-between gap-3 [&>[data-section-heading]]:mb-0 ${spacing ? "mb-2.5!" : ""}`}
        >
          {heading}
          {action}
        </div>
      )}
      {hasDescription ? <p className="text-muted mb-5">{description}</p> : null}
      {wrapContent ? (
        <div className={contentClassName}>{children}</div>
      ) : (
        children
      )}
    </section>
  );
}

export type SectionHeadingProps = ComponentPropsWithoutRef<"h2"> & {
  as?: "h2" | "h3";
  children: ReactNode;
  spacingAfter?: "default" | "section";
  variant?: "default" | "compact" | "toolbar";
};

export function SectionHeading({
  as: Heading = "h2",
  children,
  className,
  spacingAfter = "default",
  variant = "default",
  ...props
}: SectionHeadingProps) {
  const headingSize = Heading === "h2" ? "text-2xl" : "text-xl";
  let appearance =
    variant === "compact"
      ? "text-muted text-sm font-medium"
      : `text-foreground ${spacingAfter === "section" ? "mb-4" : "mb-2"} ${headingSize} font-semibold`;
  if (variant === "toolbar") {
    appearance = "text-foreground/80 text-base font-normal";
  }

  return (
    <Heading
      {...props}
      className={className ?? appearance}
      data-section-heading=""
    >
      {children}
    </Heading>
  );
}
