import type { Metadata } from "next";
import Link from "next/link";
import ExternalLink from "@/components/ExternalLink";
import PageTitle from "@/components/PageTitle";
import SubTitle from "@/components/SubTitle";
import { getExperimentMetadata } from "@/data/ExperimentsData";
import { NextjsArticlesData } from "@/data/NextjsExperimentsData";

export const metadata: Metadata = getExperimentMetadata("nextjs", "articles");

export default function ArticlesPage() {
  return (
    <>
      <PageTitle title="Articles" />
      <SubTitle>
        Static article data from{" "}
        <code className="rounded-md border border-zinc-200 bg-zinc-50 px-1.5 py-0.5 font-mono text-sm">
          data/NextjsExperimentsData.ts
        </code>{" "}
        is rendered at build time, with a new page for each article using{" "}
        <ExternalLink
          href="https://nextjs.org/docs/app/api-reference/functions/generate-static-params"
          name="generateStaticParams"
        />
      </SubTitle>

      <div className="mt-5 grid grid-cols-1 xs:grid-cols-2 gap-5 sm:grid-cols-3">
        {NextjsArticlesData.map((article) => (
          <Link
            className="rounded-md border border-zinc-300 bg-zinc-50 p-4 duration-200 ease-out hover:cursor-pointer hover:bg-white"
            href={`/experiments/nextjs/articles/${article.id}`}
            key={article.id}
          >
            <div className="text-action">Article {article.id}</div>
            <div className="font-semibold text-gray-800 text-xl">
              {article.title}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
