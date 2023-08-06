import SubTitle from "@/components/SubTitle";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import { getAllPostIds, getPostData } from "utils/posts";
import Date from "@/components/date";

export default function Post({ postData }) {
  return (
    <LayoutToExperiments title={postData.title} domain="Nextjs">
      <SubTitle>
        <Date dateString={postData.date}></Date>
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
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </div>
    </LayoutToExperiments>
  );
}

//Return an array of possible value for id
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

//Fetches neccesary data for the post with id
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: { postData },
  };
}
