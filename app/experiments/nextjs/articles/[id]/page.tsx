import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ExternalLink from "@/components/ExternalLink";
import PageTitle from "@/components/PageTitle";
import {
  getNextjsArticle,
  NextjsArticlesData,
} from "@/data/NextjsExperimentsData";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const article = getNextjsArticle(id);

  return article
    ? {
        title: article.title,
        description: article.title,
      }
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
      <PageTitle title={article.title} />
      <div className="mb-14">
        <ExternalLink
          href="https://github.com/haritssr/haritssr/tree/try/app/experiments/nextjs/articles/[id]"
          name="Source code"
        />
      </div>
      <div className="text-action">Article {article.id}</div>
      <div className="mt-5 text-zinc-600">{article.body}</div>
    </div>
  );
}

export async function generateStaticParams() {
  return NextjsArticlesData.map((article) => ({
    id: article.id.toString(),
  }));
}
