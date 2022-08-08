import { SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import Link from 'next/link';
import { getSortedPostsData } from '../../../../utils/posts';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Posts({ allPostsData }) {
  return (
    <LayoutToExperiments title='Posts' domain='Next.js'>
      <SubTitle>Posts by Next.js tutorial</SubTitle>
      <ul className='space-y-5'>
        {allPostsData.map(({ id, date, title }) => (
          <li className='' key={id}>
            <Link href={`/experiments/nextjs/posts/${id}`}>
              <a className='block'>
                <div className='font-medium text-zinc-700 hover:text-zinc-800'>{title}</div>
                <div className='text-zinc-500'>{date}</div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </LayoutToExperiments>
  );
}
