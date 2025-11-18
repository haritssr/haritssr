import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";
import ExternalLink from "@/components/ExternalLink";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import type { ComponentType } from "react";
import ExplanationList from "@/components/ExplanationList";
import Section from "@/components/Section";

const HeadlessDialog = Dialog as unknown as ComponentType<any> & {
	Title: ComponentType<any>;
	Description: ComponentType<any>;
	Overlay: ComponentType<any>;
};

const TransitionRoot = Transition.Root as unknown as ComponentType<any>;
const TransitionChild = Transition.Child as unknown as ComponentType<any>;

export default function ExportedDialog() {
	return (
		<LayoutToExperiments title="Dialog" domain="Headless UI">
			<SubTitle>
				<ExternalLink
					name="Headless UI Dialog"
					href="https://headlessui.dev/react/dialog"
				/>
				<ExplanationList>
					<li>
						A fully-managed, renderless dialog component jam-packed with
						accessibility and keyboard features, perfect for building completely
						custom modal and dialog windows for your next application.
					</li>
					<li>
						Click the button and the box will appear (usually) in the center of
						screen, and the user should close it using close button or click on
						the outside the box area.
					</li>
				</ExplanationList>
			</SubTitle>

			<div className="space-y-10">
				<Wrapper title="Dialog without transition">
					<DialogExample1 />
				</Wrapper>
				<Wrapper title="Dialog with transition">
					<DialogExample2 />
				</Wrapper>
			</div>
		</LayoutToExperiments>
	);
}

const Wrapper = ({
	title,
	children,
}: { title: string; children: React.ReactNode }) => {
	return (
		<div>
			<Section name={title} />
			{children}
		</div>
	);
};

const DialogExample1 = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div>
			<button
				type="button"
				onClick={() => setIsOpen(true)}
				className={`rounded-full px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-[#2563eb]/90 text-white active:ring-orange-500 ${
					isOpen ? "ring-2 ring-orange-500" : ""
				}`}
			>
				Open dialog
			</button>

			<HeadlessDialog
				open={isOpen}
				onClose={() => setIsOpen(false)}
				className="fixed inset-x-0 top-[25vh] z-40 mx-auto h-fit w-2/3 sm:w-1/2"
			>
				<HeadlessDialog.Overlay className="fixed inset-0 bg-zinc-800/80" />

				<div className="relative z-50 rounded-md bg-white p-4 shadow-xl">
					<HeadlessDialog.Title className="text-xl font-semibold">
						Title
					</HeadlessDialog.Title>
					<HeadlessDialog.Description className="text-zinc-600">
						Lorem ipsum is simply dummy text of the printing and typesetting
						industry. Lorem Ipsum has been the industry&apos;s standard dummy
						text ever since the 1500s.
					</HeadlessDialog.Description>
					<div className="flex w-full justify-end">
						<button
							type="button"
							className="rounded-md px-2 py-1 text-action hover:bg-zinc-100 hover:text-action"
							onClick={() => setIsOpen(false)}
						>
							Close
						</button>
					</div>
				</div>
			</HeadlessDialog>
		</div>
	);
};

const DialogExample2 = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div>
			<button
				type="button"
				onClick={() => setIsOpen(true)}
				className={`rounded-full bg-blue-600 hover:bg-[#2563eb]/90 px-4 py-2 text-sm font-medium text-white active:ring-orange-500 ${
					isOpen ? "ring-2 ring-orange-500" : ""
				}`}
			>
				Open dialog
			</button>
			<TransitionRoot show={isOpen} as={Fragment}>
				<HeadlessDialog
					open={isOpen}
					onClose={() => setIsOpen(false)}
					className="fixed inset-x-0 top-[25vh] z-40 mx-auto h-fit w-2/3 sm:w-1/2"
				>
					<TransitionChild
						enter="duration-300 ease-out"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="duration-200 ease-in"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<HeadlessDialog.Overlay className="fixed inset-0 bg-zinc-800/80" />
					</TransitionChild>

					<div className="relative z-50 rounded-md bg-white p-4 shadow-xl">
						<HeadlessDialog.Title className="text-xl font-semibold">
							Title
						</HeadlessDialog.Title>
						<HeadlessDialog.Description className="text-zinc-600">
							Lorem ipsum is simply dummy text of the printing and typesetting
							industry. Lorem Ipsum has been the industry&apos;s standard dummy
							text ever since the 1500s.
						</HeadlessDialog.Description>
						<div className="flex w-full justify-end">
							<button
								type="button"
								className="rounded-md px-2 py-1 text-action hover:bg-zinc-100 hover:text-action"
								onClick={() => setIsOpen(false)}
							>
								Close
							</button>
						</div>
					</div>
				</HeadlessDialog>
			</TransitionRoot>
		</div>
	);
};
