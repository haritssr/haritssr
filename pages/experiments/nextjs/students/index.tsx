import LayoutToExperiments from '@/components/LayoutToExperiments';
import SubTitle from '@/components/SubTitle';
import InternalLink from '@/components/InternalLink';
import { GetStaticProps } from 'next';

export default function Students({ students }) {
  return (
    <LayoutToExperiments title='Students' domain='Nextjs'>
      <SubTitle>A list of students come from JSONPlaceholder API</SubTitle>
      <div className='mt-2 space-y-3'>
        {students.map(a => (
          <InternalLink key={a.id} name={a.name} href={`/experiments/nextjs/students/${a.id}`} />
        ))}
      </div>
    </LayoutToExperiments>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();

  return {
    props: { students: data },
  };
};
