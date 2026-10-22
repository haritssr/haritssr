import type { ReactNode } from "react";

import ArticleBackToTop from "@/components/ArticleBackToTop";

export default function WritingArticle({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-3xl">
      <article className="pb-24">{children}</article>
      <ArticleBackToTop />
    </div>
  );
}
