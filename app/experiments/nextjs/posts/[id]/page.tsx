import { format, parseISO } from "date-fns";
import SubTitle from "@/components/SubTitle";
import { getAllPostIds, getPostData } from "@/utils/posts.js";

interface PostData {
  id: string;
  title: string;
  date: string;
  contentHtml: string;
  [key: string]: string;
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postData = (await getPostData(id)) as PostData;

  return (
    <>
      <SubTitle>
        <time dateTime={postData.date}>
          {format(parseISO(postData.date), "LLLL d, yyyy")}
        </time>
      </SubTitle>
      <div className="grid grid-cols-4 gap-5">
        <div className="col-span-1 rounded-md border border-zinc-300 p-2 sm:p-4">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia
          harum laudantium sint rem excepturi opti dolor id quasi, dicta illum
          eaque amet exercitationem? Maiores natus cupiditate reiciendis harum
          doloribus suscipit, magnam possimus. Tenetur quos id harum placeat
          obcaecati ullam corrupti illum officia, nostrum reprehenderit aliquam
          veniam alias
        </div>
        <div
          className="col-span-3 rounded-md border border-zinc-300 p-2 sm:p-4"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: needed to render HTML from markdown
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </div>
    </>
  );
}

export function generateStaticParams() {
  const paths = getAllPostIds();
  return paths.map((path) => ({ id: path.params.id }));
}
