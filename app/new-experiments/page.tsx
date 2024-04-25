import InternalLink from "@/components/InternalLink";

export default function NewExperimentsPage() {
	return (
		<div className="my-10 flex flex-col space-y-2">
			<InternalLink href="/new-experiments/inline-maki">
				Inline MAKI
			</InternalLink>
			<InternalLink href="/new-experiments/countdown-mabes">
				Countdown Mabes
			</InternalLink>
		</div>
	);
}
