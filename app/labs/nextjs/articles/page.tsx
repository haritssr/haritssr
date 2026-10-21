import type { Metadata } from "next";
import Link from "next/link";

import { getLabMetadata } from "@/app/labs/data";
import ExternalLink from "@/components/ExternalLink";
import LabPageHeader from "@/components/LabPageHeader";
import PageDescription from "@/components/PageDescription";

import { NextjsArticlesData } from "./data";

export const metadata: Metadata = getLabMetadata("nextjs", "articles");

export default function ArticlesPage() {
  return (
    <>
      <LabPageHeader title="Articles">
        <PageDescription>
          Static article data from{" "}
          <code className="rounded-md border border-zinc-200 bg-zinc-50 px-1.5 py-0.5 font-mono text-sm">
            app/labs/nextjs/articles/data.ts
          </code>{" "}
          is rendered at build time, with a new page for each article using{" "}
          <ExternalLink
            href="https://nextjs.org/docs/app/api-reference/functions/generate-static-params"
            name="generateStaticParams"
          />
        </PageDescription>
      </LabPageHeader>

      <div className="xs:grid-cols-2 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {NextjsArticlesData.map((article) => (
          <Link
            className="rounded-md border border-zinc-300 bg-zinc-50 p-4 duration-200 ease-out hover:cursor-pointer hover:bg-white"
            href={`/labs/nextjs/articles/${article.id}`}
            key={article.id}
          >
            <div className="text-action">Article {article.id}</div>
            <div className="text-xl font-semibold text-gray-800">
              {article.title}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
