import { TitleBack, Topic } from '@/components/DesignSystem';
import Layout from '@/components/Layout';
import Link from 'next/link';

export default function Articles({ posts }) {
  return (
    <Layout browserTitle='Articles' description='Articles'>
      <TitleBack href='Work' name='Articles' />

      <div>
        <b>Notes :</b>
      </div>
      <p>
        This data generated from external API (https://jsonplaceholder.typicode.com/posts) using
        getStaticProps and populated to new page for each article using getStaticPaths
      </p>

      <div className='grid grid-cols-1 gap-5 mt-5 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 '>
        {posts.map(a => (
          <Link href={`/work/articles/${a.id}`} key={a.id}>
            <a className='p-4 duration-200 ease-out bg-white rounded-md shadow hover:scale-101 hover:shadow-xl hover:cursor-pointer hover:-translate-y-1'>
              <div className='text-blue-600 '>Article {a.id}</div>
              <div className='text-xl font-semibold text-gray-800 '>{a.title}</div>
              <div className='text-gray-600 '>{a.body}</div>
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = await fetch('https://jsonplaceholder.typicode.com/posts').then(p => p.json());
  return {
    props: {
      posts,
    },
  };
}
