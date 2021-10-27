import Layout from '@/components/Layout';
import { InternalLink, Title, TitleBack, Topic } from '@/components/DesignSystem';

export default function Students({ students }) {
  return (
    <Layout browserTitle='All Student' description='All Student'>
      <TitleBack back='work' name='Students' />
      <Topic name='All students' />
      <div className='space-y-3 '>
        {students.map(a => (
          <InternalLink key={a.id} name={a.name} href={`/work/students/${a.id}`} />
        ))}
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();

  return {
    props: { students: data },
  };
};
