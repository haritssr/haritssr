import Layout from '@/components/Layout';
import { TitleBack, Topic } from '@/components/DesignSystem';
import { GetStaticPaths, GetStaticProps } from 'next';

export default function DynamicPage({ person }) {
  return (
    <Layout browserTitle='Student Details' description='Student Details'>
      <TitleBack href='All student' name='Student Details' />
      <Topic name='Identity' />
      <div className='text-emerald-500'>
        <span className='text-zinc-500'>Name :</span> {person.name}
      </div>
      <div className='text-emerald-500'>
        <span className='text-zinc-500'>Email </span>: {person.email}
      </div>
      <div className='text-emerald-500'>
        <span className='text-zinc-500'>Website</span> : {person.website}
      </div>
      <div className='text-emerald-500'>
        <span className='text-zinc-500'>City :</span> {person.address.city}
      </div>
    </Layout>
  );
}

// export async function getStaticPaths() {
export const getStaticPaths: GetStaticPaths = async () => {
  const users = await fetch('https://jsonplaceholder.typicode.com/users').then(user => user.json());

  const paths = users.map((user: { id: { toString: () => string } }) => {
    return { params: { id: user.id.toString() } };
  });

  return {
    paths,
    fallback: false,
  };
};

//Export const getStaticProps = async context => {}
//Export async function getStaticProps(context) {
//This is the static data that will be fetch for every page inside dynamic pages
export const getStaticProps: GetStaticProps = async context => {
  const person = await fetch(
    'https://jsonplaceholder.typicode.com/users/' + context.params.id
  ).then(p => p.json());
  return {
    props: { person },
  };
};
