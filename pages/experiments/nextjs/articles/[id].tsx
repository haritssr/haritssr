import { TitleBack } from '@/components/DesignSystem';
import Layout from '@/components/Layout';
import { GetStaticPaths } from 'next';
import { GetStaticProps } from 'next';

//getStaticPaths di [].tsx gunanya untuk ngambil dynamic route endpoint saja, untuk diteruskan ke getStaticProps
// alternatif tanpa typescript, export async function getStaticPaths() {
export const getStaticPaths: GetStaticPaths = async () => {
  //mengambil data keseluruhan
  const posts = await fetch('https://jsonplaceholder.typicode.com/posts').then(post => post.json());

  //mengambil data,  dimana dari data keseluruhan yang akan dijadikan sebagai route
  //disini data.id yang dipilih untuk menjadi dynamic route
  //jangan lupa diubah ke string karena data mentah (a) masih berupa json, (id) sudah berupa string
  const paths = posts.map(post => ({
    params: {
      id: post.id.toString(),
    },
  }));

  //kita mengembalikan nilai berupa keseluruhan path, yaitu const paths berupa array of string of post.id.toString()
  //falback: false, artinya selain route yang ada di paths, maka akan ke halaman 404
  return { paths, fallback: false };
};

//getStaticProps di [dynamicRoute].tsx digunakan untuk fetching data dan dikasih ke komponen dan juga untuk menaruh dynamic endpoint routenya
// tapa typescript, export async function getStaticProps({ params }) {
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts = await fetch('https://jsonplaceholder.typicode.com/posts/' + params.id).then(post =>
    post.json()
  );
  return {
    props: {
      posts,
    },
  };
};

export default function Halaman({ posts }) {
  return (
    <Layout browserTitle={posts.title} description={posts.title}>
      <TitleBack href='Articles' name={posts.title} />
      <div className='text-blue-500 '>Article {posts.id}</div>
      <div>{posts.body}</div>
    </Layout>
  );
}
