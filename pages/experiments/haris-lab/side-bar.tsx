import LayoutToExperiments from "@/components/LayoutToExperiments";
import { fisika } from "../../../data/fisika";

export default function GlobalModal() {
	return (
		<LayoutToExperiments title="Fisika" domain="Haris Lab">
			<App />
		</LayoutToExperiments>
	);
}

function App() {
	const [openAll, setOpenAll] = useState<boolean>(false);
	return (
		// Subjek
		<div className="w-full space-y-5">
			{/* Domains */}
			{fisika.map((domain) => (
				<div key={domain.domain_name}>
					<div>
						<div className="pl-2 text-lg font-medium">{domain.domain_name}</div>
						<button type="button" onClick={() => setOpenAll(!openAll)}>
							Open All
						</button>
						<div>{openAll.toString()}</div>
					</div>
					<div>
						{/* Chapters */}
						{domain.chapters.map((chapter) => (
							<AccordionC
								isOpen={openAll}
								key={chapter?.chapter_name}
								title={chapter?.chapter_name}
							>
								{chapter?.topics.map((topic) => (
									// Topic
									<div className="cursor-pointer hover:bg-zinc-200" key={topic}>
										{topic}
									</div>
								))}
							</AccordionC>
						))}
					</div>
				</div>
			))}
		</div>
	);
}

import { ChevronRightIcon } from "@heroicons/react/24/outline";
import * as Accordion from "@radix-ui/react-accordion";
import { useRef, useState } from "react";

function AccordionC({ title, children, isOpen }, props) {
	const ref = useRef<HTMLDivElement>(null);
	return (
		<Accordion.Root
			type="multiple"
			className="w-full rounded-md px-2 hover:bg-zinc-100 sm:w-1/3"
			{...props}
		>
			<Accordion.Item value="item-1">
				<Accordion.Header className="group">
					<Accordion.Trigger
						data-state={isOpen ? "open" : "closed"}
						className="flex w-full items-center justify-between py-1"
					>
						{title} {isOpen.toString()} {isOpen.toString()}
						{ref.current?.getAttribute("data-state")}
						<ChevronRightIcon className="h-4 w-4 group-rdx-state-open:rotate-90" />
					</Accordion.Trigger>
				</Accordion.Header>
				<Accordion.Content ref={ref} className="pl-3">
					{children}
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	);
}
