import SubTitle from "@/components/SubTitle";
import ExternalLink from "@/components/ExternalLink";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import Link from "next/link";
import type { ReactChild, ReactFragment, ReactPortal } from "react";

//This pages includes : the list of the available pages to be visited

export async function getStaticProps() {
	// https://stackoverflow.com/questions/52842039/how-to-limit-the-amount-of-data-returned-from-a-json-file-using-fetch
	const posts = await fetch(
		"https://jsonplaceholder.typicode.com/posts/?_limit=20",
	).then((post) => post.json());
	return {
		props: {
			posts,
		},
	};
}

export default function Articles({ posts }) {
	return (
		<LayoutToExperiments title="Articles " domain="Nextjs">
			<SubTitle>
				getStaticProps + Dynamic Pages. This data generated from{" "}
				<ExternalLink
					name="json placeholder"
					href="https://jsonplaceholder.typicode.com/posts"
				/>{" "}
				using
				<ExternalLink
					name="getStaticProps"
					href="https://nextjs.org/docs/basic-features/data-fetching/get-static-props"
				/>
				and populated to new page for each article using
				<ExternalLink
					name="getStaticPaths"
					href="https://nextjs.org/docs/basic-features/data-fetching/get-static-paths"
				/>
			</SubTitle>

			<div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 sm:grid-cols-3">
				{posts.map(
					(post: {
						id: number;
						title: boolean | ReactChild | ReactFragment | ReactPortal;
						body: boolean | ReactChild | ReactFragment | ReactPortal;
					}) => (
						<Link
							href={`/experiments/nextjs/articles/${post.id}`}
							key={post.id}
							className="rounded-md border border-zinc-300 bg-zinc-50 p-4 duration-200 ease-out hover:cursor-pointer hover:bg-white "
						>
							<div className="text-blue-500 ">Article {post.id}</div>
							<div className="text-xl font-semibold text-gray-800">
								{post.title}
							</div>
							{/* <p className="text-gray-600 text-ellipsis">{post.body}</p> */}
						</Link>
					),
				)}
			</div>
		</LayoutToExperiments>
	);
}
