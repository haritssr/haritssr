import type { GetStaticPaths, GetStaticProps } from "next";
import Layout from "@/components/Layout";
import TitleBack from "@/components/TitleBack";

export default function DynamicPage({ person }) {
  return (
    <Layout browserTitle="Student Details" description="Student Details">
      <TitleBack href="All student" name="Student Details" />
      <div className="text-zinc-500">
        <span className="font-semibold text-zinc-800">Name :</span>{" "}
        {person.name}
      </div>
      <div className="text-zinc-500">
        <span className="font-semibold text-zinc-800">Email </span>:{" "}
        {person.email}
      </div>
      <div className="text-zinc-500">
        <span className="font-semibold text-zinc-800">Website</span> :{" "}
        {person.website}
      </div>
      <div className="text-zinc-500">
        <span className="font-semibold text-zinc-800">City :</span>{" "}
        {person.address.city}
      </div>
    </Layout>
  );
}

// export async function getStaticPaths() {
export const getStaticPaths: GetStaticPaths = async () => {
  const users = await fetch("https://jsonplaceholder.typicode.com/users").then(
    (user) => user.json()
  );

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
export const getStaticProps: GetStaticProps = async (context) => {
  const person = await fetch(
    `https://jsonplaceholder.typicode.com/users/${context.params?.id}`
  ).then((p) => p.json());
  return {
    props: { person },
  };
};
