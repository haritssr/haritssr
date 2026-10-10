import { useId } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import SectionHeading from "@/components/SectionHeading";
import type { SectionHeadingProps } from "@/components/SectionHeading";

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
  className,
  contentClassName,
  headingAs,
  headingClassName,
  headingVariant,
  ...props
}: SectionProps) {
  const generatedId = useId();
  const labelId =
    id !== undefined && id.length > 0 ? `${id}-heading` : generatedId;
  const hasClassName = className !== undefined && className.length > 0;
  const hasContentClassName =
    contentClassName !== undefined && contentClassName.length > 0;
  const sectionClassName = hasClassName
    ? `space-y-5 leading-8 ${className}`
    : "space-y-5 leading-8";
  const hasChildren = children !== undefined && children !== null;

  return (
    <section
      {...props}
      aria-labelledby={labelId}
      className={sectionClassName}
      id={id}
    >
      <SectionHeading
        as={headingAs}
        className={headingClassName}
        id={labelId}
        variant={headingVariant}
      >
        {title}
      </SectionHeading>
      {description !== undefined && description !== null ? (
        <p className="text-muted max-w-3xl">{description}</p>
      ) : null}
      {hasChildren && hasContentClassName ? (
        <div className={contentClassName}>{children}</div>
      ) : (
        children
      )}
    </section>
  );
}
