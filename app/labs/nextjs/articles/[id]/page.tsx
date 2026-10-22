import type { Metadata } from "next";
import { notFound } from "next/navigation";

import LabPageHeader from "@/app/labs/_components/LabPageHeader";
import PageDescription from "@/components/PageDescription";
import { createPageMetadata } from "@/utils/pageMetadata";

import { getNextjsArticle, NextjsArticlesData } from "../data";

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
      <LabPageHeader title={article.title}>
        <PageDescription>
          An article from local data, rendered as a static App Router page.
        </PageDescription>
      </LabPageHeader>

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
