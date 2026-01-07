import type { GetStaticProps } from "next";
import InternalLink from "@/components/InternalLink";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";

export default function Students({ students }) {
  return (
    <LayoutToExperiments domain="Nextjs" title="Students">
      <SubTitle>A list of students come from JSONPlaceholder API</SubTitle>
      <div className="flex flex-col space-y-3">
        {students.map((a) => (
          <InternalLink
            href={`/experiments/nextjs/students/${a.id}`}
            key={a.id}
          >
            {a.name}
          </InternalLink>
        ))}
      </div>
    </LayoutToExperiments>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();

  return {
    props: { students: data },
  };
};
