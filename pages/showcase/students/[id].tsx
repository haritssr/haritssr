import Layout from '@/components/Layout';
import { Title, Topic } from '@/components/DesignSystem';
import { useRouter } from 'next/router';

export const getStaticPaths = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();
  const paths = data.map(a => {
    return { params: { id: a.id.toString() } };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async context => {
  const id = context.params.id;
  const res = await fetch('https://jsonplaceholder.typicode.com/users/' + id);
  const data = await res.json();

  return {
    props: { person: data },
  };
};

export default function DynamicPage({ person }) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Layout browserTitle='Student Details' description='Student Details'>
      <Title name='Student Details' />
      <Topic name='Identity' />
      <div className='text-gray-500'>
        <span className='font-semibold text-gray-700'>Name :</span> {person.name}
      </div>
      <div className='text-gray-500'>
        <span className='font-semibold text-gray-700'>Email </span>: {person.email}
      </div>
      <div className='text-gray-500'>
        <span className='font-semibold text-gray-700'>Website</span> : {person.website}
      </div>
      <div className='text-gray-500'>
        <span className='font-semibold text-gray-700'>City :</span> {person.address.city}
      </div>
    </Layout>
  );
}
