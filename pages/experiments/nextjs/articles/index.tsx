import { ExternalCodeLink, SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import Link from 'next/link';
import { ReactChild, ReactFragment, ReactPortal } from 'react';

//This pages includes : the list of the available pages to be visited

export async function getStaticProps() {
  // https://stackoverflow.com/questions/52842039/how-to-limit-the-amount-of-data-returned-from-a-json-file-using-fetch
  const posts = await fetch('https://jsonplaceholder.typicode.com/posts/?_limit=20').then(post =>
    post.json()
  );
  return {
    props: {
      posts,
    },
  };
}

export default function Articles({ posts }) {
  return (
    <LayoutToExperiments title='Articles ' domain='Next.js'>
      <SubTitle>
        getStaticProps + Dynamic Pages. This data generated from external API
        (https://jsonplaceholder.typicode.com/posts) using
        <ExternalCodeLink href='https://nextjs.org/docs/basic-features/data-fetching/get-static-props'>
          getStaticProps
        </ExternalCodeLink>
        and populated to new page for each article using
        <ExternalCodeLink href='https://nextjs.org/docs/basic-features/data-fetching/get-static-paths'>
          getStaticPaths
        </ExternalCodeLink>
      </SubTitle>

      <div className='xs:grid-cols-2 mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-4 '>
        {posts.map(
          (post: {
            id: number;
            title: boolean | ReactChild | ReactFragment | ReactPortal;
            body: boolean | ReactChild | ReactFragment | ReactPortal;
          }) => (
            <Link href={`/experiments/nextjs/articles/${post.id}`} key={post.id}>
              <a className='rounded-md border border-zinc-300 bg-zinc-50 p-4 duration-200 ease-out hover:cursor-pointer hover:bg-white '>
                <div className='text-blue-600 '>Article {post.id}</div>
                <div className='text-xl font-semibold text-gray-800 '>{post.title}</div>
                <div className='text-gray-600 '>{post.body}</div>
              </a>
            </Link>
          )
        )}
      </div>
    </LayoutToExperiments>
  );
}
