import type { ReactNode, Ref } from "react";

export default function PageTitle({
  children,
  ref,
  spacing = "default",
}: {
  children: ReactNode;
  ref?: Ref<HTMLHeadingElement>;
  spacing?: "default" | "none";
}) {
  const spacingClassName = spacing === "default" ? "mt-10 mb-4 sm:mt-16" : "";

  return (
    <div>
      <h1
        className={`text-foreground text-3xl font-bold text-balance sm:text-4xl ${spacingClassName}`}
        ref={ref}
      >
        {children}
      </h1>
    </div>
  );
}
