import ExplanationList from "@/components/ExplanationList";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import type React from "react";
import { useState } from "react";

export default function DialogButton({
	children,
	titleDescription,
	titleButton,
}: {
	children: React.ReactNode;
	titleDescription: string;
	titleButton: string;
}) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="my-5">
			<button
				type="button"
				onClick={() => setIsOpen(true)}
				className={`flex items-center space-x-1 rounded-md border border-blue-500 bg-white py-2 px-3  text-action duration-200 hover:bg-zinc-50 ${
					isOpen ? "ring-2 ring-blue-600" : ""
				}`}
			>
				<span>{titleButton}</span>
			</button>
			{/* <Transition.Root show={isOpen} as={Fragment}> */}
			<Dialog
				open={isOpen}
				onClose={() => setIsOpen(false)}
				className="fixed inset-x-0 top-[25vh] z-40 mx-auto h-fit w-[90%] sm:w-1/3"
			>
				<Dialog.Overlay className="fixed inset-0 bg-zinc-800/80" />

				<Dialog.Panel className="relative z-50 rounded-xl bg-white p-5 shadow-xl">
					<div className="mb-3 flex items-center justify-between  ">
						<div className="w-fit rounded-full bg-blue-100 px-3 pb-1 pt-1.5 text-[13px] font-medium text-blue-700">
							Reading
						</div>
						<div className="flex w-fit justify-end">
							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button
								className="rounded-full bg-zinc-200 p-2 ring-inset hover:bg-zinc-300 active:ring-1 active:ring-zinc-600"
								onClick={() => setIsOpen(false)}
							>
								<XMarkIcon
									className="h-4 w-4 text-zinc-700 hover:text-zinc-800"
									strokeWidth={3}
								/>
							</button>
						</div>
					</div>
					<Dialog.Title as="div" className="mb-2 text-xl font-semibold">
						<div>{titleDescription}</div>
					</Dialog.Title>
					<Dialog.Description as="div" className="text-zinc-600">
						<ExplanationList>{children}</ExplanationList>
					</Dialog.Description>
				</Dialog.Panel>
			</Dialog>
			{/* </Transition.Root> */}
		</div>
	);
}
