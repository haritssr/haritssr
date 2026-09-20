import { format, parseISO } from "date-fns";
import { notFound } from "next/navigation";

import MarkdownContent from "@/components/mdx";
import PageTitle from "@/components/PageTitle";
import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";
import { getAllPostIds, getPostData } from "@/utils/posts";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postData = await getPostData(id);

  if (!postData) {
    notFound();
  }

  return (
    <>
      <PageTitle>{postData.title}</PageTitle>
      <SubTitle>
        <time dateTime={postData.date}>
          {format(parseISO(postData.date), "LLLL d, yyyy")}
        </time>
      </SubTitle>
      <SourceCodeLink sourcePath="app/experiments/nextjs/posts/[id]" />
      <div className="grid grid-cols-4 gap-5">
        <div className="col-span-1 rounded-md border border-zinc-300 p-2 sm:p-4">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia
          harum laudantium sint rem excepturi opti dolor id quasi, dicta illum
          eaque amet exercitationem? Maiores natus cupiditate reiciendis harum
          doloribus suscipit, magnam possimus. Tenetur quos id harum placeat
          obcaecati ullam corrupti illum officia, nostrum reprehenderit aliquam
          veniam alias
        </div>
        <div className="col-span-3 rounded-md border border-zinc-300 p-2 sm:p-4">
          <MarkdownContent tree={postData.contentTree} />
        </div>
      </div>
    </>
  );
}

export function generateStaticParams() {
  const paths = getAllPostIds();
  return paths.map((path) => ({ id: path.params.id }));
}

export const dynamicParams = false;
