import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";
import ExternalLink from "@/components/ExternalLink";

import { Popover, Transition } from "@headlessui/react";
import ExplanationList from "@/components/ExplanationList";
import Section from "@/components/Section";

export default function ExportedPopover() {
	return (
		<LayoutToExperiments title="Popover" domain="Headless UI">
			<SubTitle>
				<ExternalLink
					name="Headless UI Popover"
					href="https://headlessui.dev/react/popover"
				/>
				<ExplanationList>
					<li>
						A fully-managed, renderless dialog component jam-packed with
						accessibility and keyboard features, perfect for building completely
						custom modal and dialog windows for your next application.
					</li>
					<li>Click the popover to see what inside them.</li>
				</ExplanationList>
			</SubTitle>
			<div className="space-y-10">
				<Wrapper title="Popover (for Navigation)">
					<PopoverExample1 />
				</Wrapper>
				<Wrapper title="Popover (for Navigation) with Transition">
					<PopoverExample2 />
				</Wrapper>
			</div>
		</LayoutToExperiments>
	);
}

const Wrapper = ({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) => {
	return (
		<div>
			<Section name={title} />
			{children}
		</div>
	);
};

const PopoverExample1 = () => {
	return (
		<Popover className="relative">
			<Popover.Button className="rounded border border-zinc-400 bg-zinc-100 px-3 py-1.5 text-sm font-medium text-zinc-800 hover:bg-zinc-50">
				Navigation
			</Popover.Button>
			<Popover.Panel className="absolute w-fit mt-2 shadow-lg">
				<div className="divide-y divide-zinc-200 rounded-md overflow-hidden text-zinc-800 bg-white border border-zinc-400">
					<div className="px-3 py-2 hover:bg-zinc-50 cursor-pointer">
						Experiments
					</div>
					<div className="px-3 py-2 hover:bg-zinc-50 cursor-pointer">Blog</div>
					<div className="px-3 py-2 hover:bg-zinc-50 cursor-pointer">
						Articles
					</div>
					<div className="px-3 py-2 hover:bg-zinc-50 cursor-pointer">
						Experiences
					</div>
				</div>
			</Popover.Panel>
		</Popover>
	);
};

const PopoverExample2 = () => {
	return (
		<Popover className="relative">
			<Popover.Button className="rounded border border-zinc-400 bg-zinc-100 px-3 py-1.5 text-sm font-medium text-zinc-800 hover:bg-zinc-50">
				Navigation
			</Popover.Button>
			<Transition
				enter="duration-300 ease-out"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="duration-200 ease-in"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<Popover.Panel className="absolute w-fit mt-2 shadow-lg">
					<div className="divide-y divide-zinc-200 rounded-md overflow-hidden text-zinc-800 bg-white border border-zinc-400">
						<div className="px-3 py-2 hover:bg-zinc-50 cursor-pointer">
							Experiments
						</div>
						<div className="px-3 py-2 hover:bg-zinc-50 cursor-pointer">
							Blog
						</div>
						<div className="px-3 py-2 hover:bg-zinc-50 cursor-pointer">
							Articles
						</div>
						<div className="px-3 py-2 hover:bg-zinc-50 cursor-pointer">
							Experiences
						</div>
					</div>
				</Popover.Panel>
			</Transition>
		</Popover>
	);
};
