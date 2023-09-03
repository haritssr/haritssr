import SubTitle from "@/components/SubTitle";
import ExternalLink from "@/components/ExternalLink";
import ExplanationList from "@/components/ExplanationList";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import { XMarkIcon } from "@heroicons/react/24/outline";
import * as Dialog from "@radix-ui/react-dialog";

export default function ExportedDialog() {
	return (
		<LayoutToExperiments title="Dialog" domain="Radix UI">
			<SubTitle>
				<ExternalLink href="https://www.radix-ui.com/docs/primitives/components/dialog" name="Radix UI Dialog" />
				<ExplanationList>
					<li>
						A window overlaid on either the primary window or another dialog window, rendering the content underneath
						inert.
					</li>
					<li>Click the button and popup will appear waiting to you to confirm to close the popup.</li>
				</ExplanationList>
			</SubTitle>
			<Dialog.Root>
				<Dialog.Trigger className="rounded-md border border-zinc-400 bg-zinc-50 px-3 py-1.5 font-medium text-zinc-800 hover:bg-zinc-100 rdx-state-open:ring-2 rdx-state-open:ring-blue-600">
					Show dialog
				</Dialog.Trigger>
				<Dialog.Overlay className="fixed inset-0 bg-zinc-900/70 z-50" />
				<Dialog.Content className="fixed top-1/2 left-1/2 w-3/4  max-w-screen-xs -translate-x-1/2 -translate-y-1/2 rounded-md bg-white px-5 py-4 z-50">
					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<Dialog.Title className="text-lg sm:text-xl font-bold text-zinc-800">Title for Anything</Dialog.Title>
							<Dialog.Close>
								<XMarkIcon className="h-7 w-7 rounded-full p-1 text-gray-500 hover:bg-gray-200 hover:text-zinc-800" />
							</Dialog.Close>
						</div>
						<Dialog.Description className="text-gray-500">
							This modal can contain anything you need to perform, while at the same time make the UI behind not moving
							or inert.
						</Dialog.Description>
						<div className="flex justify-end">
							<Dialog.Close>
								<div className="rounded-md bg-blue-600 px-3 py-1 text-white hover:bg-[#2563eb]/90">Confirm</div>
							</Dialog.Close>
						</div>
					</div>
				</Dialog.Content>
			</Dialog.Root>
		</LayoutToExperiments>
	);
}
