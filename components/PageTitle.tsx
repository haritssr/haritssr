import type { ReactNode, Ref } from "react";

export default function PageTitle({
  children,
  size = "default",
  ref,
  spacing = "default",
}: {
  children: ReactNode;
  size?: "default" | "large";
  ref?: Ref<HTMLHeadingElement>;
  spacing?: "default" | "none";
}) {
  const spacingClassName = spacing === "default" ? "mt-10 mb-4 sm:mt-16" : "";
  const sizeClassName =
    size === "large" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl";

  return (
    <div>
      <h1
        className={`text-foreground font-bold text-balance ${sizeClassName} ${spacingClassName}`}
        ref={ref}
      >
        {children}
      </h1>
    </div>
  );
}
