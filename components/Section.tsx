import { useId } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type SectionProps = Omit<
  ComponentPropsWithoutRef<"section">,
  "children" | "title" | "aria-label" | "aria-labelledby"
> & {
  children?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  contentClassName?: string;
  headingAs?: SectionHeadingProps["as"];
  headingClassName?: string;
  headingVariant?: SectionHeadingProps["variant"];
};

export default function Section({
  children,
  title,
  description,
  id,
  className = "",
  contentClassName = "",
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

  return (
    <section
      {...props}
      aria-labelledby={labelId}
      className={className.length > 0 ? `space-y-5 ${className}` : "space-y-5"}
      id={id}
    >
      <SectionHeading
        as={headingAs}
        className={headingClassName}
        id={labelId}
        spacingAfter={hasDescription ? "default" : "section"}
        variant={headingVariant}
      >
        {title}
      </SectionHeading>
      {hasDescription ? <p className="text-muted mb-7">{description}</p> : null}
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
  variant?: "default" | "compact";
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
  const appearance =
    variant === "compact"
      ? "text-muted text-sm font-medium"
      : `text-foreground ${spacingAfter === "section" ? "mb-4" : "mb-2"} ${headingSize} font-semibold`;

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
