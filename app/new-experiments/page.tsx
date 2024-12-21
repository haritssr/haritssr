import InternalLink from "@/components/InternalLink";

const newExperimentsPages = ["inline maki", "countdown mabes", "form react 19"];

export default function NewExperimentsPage() {
	return (
		<div className="my-10 flex flex-col space-y-2">
			{newExperimentsPages.map((page) => (
				<InternalLink
					key={page}
					href={`/new-experiments/${page.split(" ").join("-")}`}
				>
					Inline MAKI
				</InternalLink>
			))}
		</div>
	);
}
