import InternalLink from "@/components/InternalLink";
import { PageTitle } from "@/components/SubTitle";

const newExperimentsPages = ["inline maki", "countdown mabes", "form react 19"];

export default function NewExperimentsPage() {
	return (
		<>
			<PageTitle
				title="New Experiments"
				description="Random experiments that using newer version of React following Next.js App Router, the UI Experiments route still in pages router"
			/>
			<div className="my-10 flex flex-col space-y-2">
				{newExperimentsPages.map((page) => (
					<InternalLink
						key={page}
						href={`/new-experiments/${page.split(" ").join("-")}`}
					>
						{page}
					</InternalLink>
				))}
			</div>
		</>
	);
}
