import Layout from '@/components/Layout';
import { TitleBack, Topic } from '@/components/DesignSystem';

export default function DynamicPage({ person }) {
  // const router = useRouter();
  // const { id } = router.query;
  // console.log(id);
  return (
    <Layout browserTitle='Student Details' description='Student Details'>
      <TitleBack back='all student' name='Student Details' />
      <Topic name='Identity' />
      <div className='text-emerald-500'>
        <span className='font-semibold text-gray-700'>Name :</span> {person.name}
      </div>
      <div className='text-emerald-500'>
        <span className='font-semibold text-gray-700'>Email </span>: {person.email}
      </div>
      <div className='text-emerald-500'>
        <span className='font-semibold text-gray-700'>Website</span> : {person.website}
      </div>
      <div className='text-emerald-500'>
        <span className='font-semibold text-gray-700'>City :</span> {person.address.city}
      </div>
    </Layout>
  );
}

//export const getStaticPaths = async () => {}
export async function getStaticPaths() {
  const users = await fetch('https://jsonplaceholder.typicode.com/users').then(u => u.json());
  const paths = users.map(u => {
    return { params: { id: u.id.toString() } };
  });
  return {
    paths,
    fallback: false,
  };
}

//export const getStaticProps = async context => {}
export async function getStaticProps(context) {
  const id = context.params.id;
  const person = await fetch('https://jsonplaceholder.typicode.com/users/' + id).then(p =>
    p.json()
  );
  return {
    props: { person },
  };
}
