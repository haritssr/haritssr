import type { Metadata } from "next";
import { notFound } from "next/navigation";

import LabPageHeader from "@/components/LabPageHeader";
import { getNextjsArticle, NextjsArticlesData } from "@/data/NextjsLabsData";
import { createPageMetadata } from "@/utils/pageMetadata";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const article = getNextjsArticle(id);

  return article
    ? createPageMetadata({
        path: `/labs/nextjs/articles/${id}`,
        title: article.title,
        description: article.title,
      })
    : {};
}

export default async function ArticlePage({ params }: Props) {
  const { id } = await params;
  const article = getNextjsArticle(id);

  if (!article) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-full px-5 xl:px-0">
      <LabPageHeader title={article.title} />

      <div className="text-action">Article {article.id}</div>
      <div className="mt-5 text-zinc-600">{article.body}</div>
    </div>
  );
}

export function generateStaticParams() {
  return NextjsArticlesData.map((article) => ({
    id: article.id.toString(),
  }));
}
