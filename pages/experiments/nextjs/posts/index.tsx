import SubTitle from "@/components/SubTitle";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import Link from "next/link";
import { getSortedPostsData } from "../../../../utils/posts";

export async function getStaticProps() {
	const allPostsData = getSortedPostsData();
	return {
		props: {
			allPostsData,
		},
	};
}

export default function Posts({ allPostsData }) {
	return (
		<LayoutToExperiments title="Posts" domain="Nextjs">
			<SubTitle>Posts by Nextjs tutorial</SubTitle>
			<ul className="space-y-5">
				{allPostsData.map(({ id, date, title }) => (
					<li key={id}>
						<Link passHref href={`/experiments/nextjs/posts/${id}`} className="block">
							<div className="font-medium text-zinc-700 hover:text-zinc-800">{title}</div>
							<div className="text-zinc-500">{date}</div>
						</Link>
					</li>
				))}
			</ul>
		</LayoutToExperiments>
	);
}
