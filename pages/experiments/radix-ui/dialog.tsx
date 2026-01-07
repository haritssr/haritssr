import { XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog } from "radix-ui";
import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";

export default function ExportedDialog() {
	return (
		<LayoutToExperiments title="Dialog" domain="Radix UI">
			<SubTitle>
				<ExternalLink
					href="https://www.radix-ui.com/docs/primitives/components/dialog"
					name="Radix UI Dialog"
				/>
				<ExplanationList>
					<li>
						A window overlaid on either the primary window or another dialog
						window, rendering the content underneath inert.
					</li>
					<li>
						Click the button and popup will appear waiting to you to confirm to
						close the popup.
					</li>
				</ExplanationList>
			</SubTitle>
			<Dialog.Root>
				<Dialog.Trigger className="rounded-md border border-zinc-400 bg-zinc-50 px-3 py-1.5 font-medium text-zinc-800 rdx-state-open:ring-2 rdx-state-open:ring-blue-600 hover:bg-zinc-100">
					Show dialog
				</Dialog.Trigger>
				<Dialog.Overlay className="fixed inset-0 z-50 bg-zinc-900/70" />
				<Dialog.Content className="-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 z-50 w-3/4 max-w-screen-xs rounded-md bg-white px-5 py-4">
					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<Dialog.Title className="font-bold text-lg text-zinc-800 sm:text-xl">
								Title for Anything
							</Dialog.Title>
							<Dialog.Close>
								<XMarkIcon className="h-7 w-7 rounded-full p-1 text-gray-500 hover:bg-gray-200 hover:text-zinc-800" />
							</Dialog.Close>
						</div>
						<Dialog.Description className="text-gray-500">
							This modal can contain anything you need to perform, while at the
							same time make the UI behind not moving or inert.
						</Dialog.Description>
						<div className="flex justify-end">
							<Dialog.Close>
								<div className="rounded-md bg-blue-600 px-3 py-1 text-white hover:bg-[#2563eb]/90">
									Confirm
								</div>
							</Dialog.Close>
						</div>
					</div>
				</Dialog.Content>
			</Dialog.Root>
		</LayoutToExperiments>
	);
}
