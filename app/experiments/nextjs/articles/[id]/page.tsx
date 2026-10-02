import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PageTitle from "@/components/PageTitle";
import SourceCodeLink from "@/components/SourceCodeLink";
import {
  getNextjsArticle,
  NextjsArticlesData,
} from "@/data/NextjsExperimentsData";
import { createPageMetadata } from "@/utils/pageMetadata";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const article = getNextjsArticle(id);

  return article
    ? createPageMetadata({
        path: `/experiments/nextjs/articles/${id}`,
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
    <div className="mx-auto min-h-screen w-full max-w-5xl px-5 xl:px-0">
      <PageTitle>{article.title}</PageTitle>
      <SourceCodeLink sourcePath="app/experiments/nextjs/articles/[id]" />
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
