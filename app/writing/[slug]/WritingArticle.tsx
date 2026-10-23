import type { ReactNode } from "react";

export default function WritingArticle({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-3xl">
      <article className="pb-24">{children}</article>
    </div>
  );
}
