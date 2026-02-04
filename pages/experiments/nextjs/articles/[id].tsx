import type { GetStaticPaths, GetStaticProps } from "next";
import Layout from "@/components/Layout";
import TitleBack from "@/components/TitleBack";

interface Post {
  id: number;
  title: string;
  body: string;
}

//getStaticPaths in [id].tsx used to take dynamic-route-endpoint only, to ocntinue to getStaticProps
//Alternative wihtout TypeScript -> export async function getStaticPaths() {...}
export const getStaticPaths: GetStaticPaths = async () => {
  //fetch 20 of 100 data
  //https://stackoverflow.com/questions/52842039 how-to-limit-the-amount-of-data-returned-from-a-json-file-using-fetch
  const posts: Post[] = await fetch(
    "https://jsonplaceholder.typicode.com/posts/?_limit=20"
  ).then((post) => post.json());

  // Mapping the posts array to new paths array with structure [{ params: { id: '1' }, { params: { id: '2' }]
  const paths = posts.map((post) => ({
    params: {
      // Where from all of the retrived data, only the data.id is needed to dynamic route.
      // post.id is in json, change to string
      id: post.id.toString(),
    },
  }));

  //We retrive all of the path, which is const paths as an array of string of post.id.toString()
  //falback: false, artinya selain route yang ada di paths, maka akan ke halaman 404
  // paths = paths : paths
  return { paths, fallback: false };
};

//getStaticProps in [dynamicRoute].tsx used to fetching data and passes to components that needed and for placing the dynamic endpoint route
//Tanpa TypeScript, export async function getStaticProps({ params }) {...}
// context.params
export const getStaticProps: GetStaticProps = async ({ params }) => {
  //fetch specific data based on the id from the API endpoint for every page inside the next.js dynamic route
  const posts: Post = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params?.id}`
  ).then((post) => post.json());
  return {
    props: {
      posts,
    },
  };
};

//Each dynamic pages
export default function Halaman({ posts }: { posts: Post }) {
  return (
    <Layout browserTitle={posts.title} description={posts.title}>
      <TitleBack href="Articles" name={posts.title} />
      <div className="text-action">Article {posts.id}</div>
      <div>{posts.body}</div>
    </Layout>
  );
}
