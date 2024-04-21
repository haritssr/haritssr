import InternalLink from "@/components/InternalLink";

export default function NewExperimentsPage() {
	return (
		<div className="my-10 flex flex-col space-y-2">
			<InternalLink name="Inline MAKI" href="/new-experiments/inline-maki" />
			<InternalLink name="Countdown Mabes" href="/new-experiments/countdown-mabes" />
		</div>
	);
}
