import type { Ref } from "react";

export default function PageTitle({
  title,
  ref,
}: {
  title: string;
  ref?: Ref<HTMLHeadingElement>;
}) {
  return (
    <div>
      <h1
        className="mt-10 mb-4 font-bold text-3xl text-zinc-800 sm:mt-16 sm:text-4xl"
        ref={ref}
      >
        {title}
      </h1>
    </div>
  );
}
