import { TitleBack } from '@/components/DesignSystem';
import Layout from '@/components/Layout';

export default function Halaman({ posts }) {
  return (
    <Layout browserTitle={posts.title} description={posts.title}>
      <TitleBack href='All article' name={posts.title} />
      <div className='text-blue-500 '>Article {posts.id}</div>
      <div>{posts.body}</div>
    </Layout>
  );
}

//getStaticProps di [dynamicRoute] digunakan untuk fetching data dan dikasih ke komponen dan juga untuk menaruh dynamic endpoint routenya
export async function getStaticProps({ params }) {
  const posts = await fetch('https://jsonplaceholder.typicode.com/posts/' + params.id).then(p =>
    p.json()
  );
  return {
    props: {
      posts,
    },
  };
}

//getStaticPaths di [].tsx gunanya untuk ngambil dynamic route endpoint saja, untuk diteruskan ke getStaticProps
export async function getStaticPaths() {
  //mengambil data keseluruhan
  const posts = await fetch('https://jsonplaceholder.typicode.com/posts').then(p => p.json());

  //mengambil data mana dari data keseluruhan yang akan dijadikan sebagai route
  //disini data.id yang dipilih untuk menjadi dynamic route
  //jangan lupa diubah ke string karena data mentah masih berupa json
  const paths = posts.map(a => ({
    params: {
      id: a.id.toString(),
    },
  }));

  //kita mengembalikan nilai berupa keseluruhan path, yaitu const paths
  //falback: false, artinya selain route yang ada di paths, maka akan ke halaman 404
  return { paths, fallback: false };
}
