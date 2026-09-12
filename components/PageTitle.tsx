import type { ReactNode, Ref } from "react";

export default function PageTitle({
  children,
  ref,
}: {
  children: ReactNode;
  ref?: Ref<HTMLHeadingElement>;
}) {
  return (
    <div>
      <h1
        className="mt-10 mb-4 text-3xl font-bold text-balance text-zinc-800 sm:mt-16 sm:text-4xl"
        ref={ref}
      >
        {children}
      </h1>
    </div>
  );
}
