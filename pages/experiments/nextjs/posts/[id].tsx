import { SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import { getAllPostIds, getPostData } from 'utils/posts';
import Date from '@/components/date';

export default function Post({ postData }) {
  return (
    <LayoutToExperiments title={postData.title} domain={`/experiments/nextjs/posts`}>
      <SubTitle>
        <Date dateString={postData.date}></Date>
      </SubTitle>
      <div className='grid grid-cols-4 gap-5'>
        <div className='col-span-1 rounded-md border border-zinc-300 p-2'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia harum laudantium sint
          rem excepturi opti dolor id quasi, dicta illum eaque amet exercitationem? Maiores natus
          cupiditate reiciendis harum doloribus suscipit, magnam possimus. Tenetur quos id harum
          placeat obcaecati ullam corrupti illum officia, nostrum reprehenderit aliquam veniam alias
          velit similique error perferendis eveniet rerum fugiat fuga! Reiciendis ullam vel
          praesentium! Ipsam, quia! Voluptatem magni quaerat quo, accusamus fugit quos ad ipsam nisi
          perspiciatis, soluta, officia mollitia qui nam omnis aut nobis voluptates? Dolorem,
          quisquam voluptates vel eius voluptatum aspernatur ullam expedita recusandae adipisci
          voluptatem, dolore odio quod tempore sit incidunt! Reiciendis?
        </div>
        <div
          className='col-span-3 rounded-md border border-zinc-300 p-2'
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </div>
    </LayoutToExperiments>
  );
}

//return an array of possible value for id
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

//fetches neccesary data for the post with id
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: { postData },
  };
}
