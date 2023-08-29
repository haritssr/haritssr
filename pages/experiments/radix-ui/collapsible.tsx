import * as Collapsible from "@radix-ui/react-collapsible";
import Section from "@/components/Section";
import InternalLink from "@/components/InternalLink";
import ExternalLink from "@/components/ExternalLink";
import SubTitle from "@/components/SubTitle";

import { useState } from "react";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import ExplanationList from "@/components/ExplanationList";

export default function ExportedCollapsible() {
	const [open, setOpen] = useState(false);
	return (
		<LayoutToExperiments title="Collapsible" domain="Radix UI">
			<SubTitle>
				<ExternalLink
					href="https://www.radix-ui.com/docs/primitives/components/alert-dialog"
					name="Radix UI Alert Dialog"
				/>
				<ExplanationList>
					<li>An interactive component which expands/collapses a panel.</li>
					<li>
						Click the &#39;Load more...&#39; to see more content, and click
						&#39;Collapse&#39; after the more content displayed to collapse the
						more displayed contents.
					</li>
				</ExplanationList>
			</SubTitle>
			<Collapsible.Root
				open={open}
				onOpenChange={setOpen}
				className="w-full sm:w-2/3"
			>
				<Section name="List of a groceries" />
				<div className="space-y-2">
					<InternalLink
						name="This is Accoordion"
						href="/work/radix-ui/accordion"
					/>
					<InternalLink
						name="This is Dropdown Menu"
						href="/work/radix-ui/dropdown-menu"
					/>
					<InternalLink
						name="This is Blurry Effect"
						href="/work/tailwindcss/blurry"
					/>
				</div>
				<Collapsible.Content className="mt-2 space-y-2">
					<InternalLink name="Accoordion" href="/work/radix-ui/accordion" />
					<InternalLink
						name="Dropdown Menu"
						href="/work/radix-ui/dropdown-menu"
					/>
					<InternalLink name="Blurry Effect" href="/work/tailwindcss/blurry" />
				</Collapsible.Content>
				<Collapsible.Trigger className="py-1 text-lg text-zinc-500 hover:underline sm:text-base">
					{open ? "Collapse" : "Load more..."}
				</Collapsible.Trigger>
			</Collapsible.Root>
		</LayoutToExperiments>
	);
}
