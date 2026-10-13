import type { ComponentPropsWithRef, ReactNode } from "react";

export type PageTitleProps = Omit<ComponentPropsWithRef<"h1">, "className"> & {
  children: ReactNode;
};

export default function PageTitle({ children, ...props }: PageTitleProps) {
  return (
    <h1
      {...props}
      className="text-foreground text-3xl font-bold text-balance sm:text-4xl"
    >
      {children}
    </h1>
  );
}
