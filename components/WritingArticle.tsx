"use client";

import { useRef } from "react";
import type { ReactNode } from "react";

import ArticleTableOfContents from "@/components/ArticleTableOfContents";

export default function WritingArticle({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  const articleRef = useRef<HTMLElement>(null);

  return (
    <div className="min-h-screen w-full">
      <article className="pb-24" ref={articleRef}>
        {children}
      </article>
      <ArticleTableOfContents
        articleRef={articleRef}
        minimumSections={1}
        title={title}
      />
    </div>
  );
}
