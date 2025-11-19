import type { GetStaticProps } from "next";
import InternalLink from "@/components/InternalLink";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";

export default function Students({ students }) {
	return (
		<LayoutToExperiments title="Students" domain="Nextjs">
			<SubTitle>A list of students come from JSONPlaceholder API</SubTitle>
			<div className="space-y-3 flex flex-col">
				{students.map((a) => (
					<InternalLink
						key={a.id}
						href={`/experiments/nextjs/students/${a.id}`}
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
