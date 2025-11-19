import { AlertDialog } from "radix-ui";
import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";

export default function ExportedAlertDialog() {
	return (
		<LayoutToExperiments title="Alert Dialog" domain="Radix UI">
			<SubTitle>
				<ExternalLink
					href="https://www.radix-ui.com/docs/primitives/components/alert-dialog"
					name="Radix UI Alert Dialog"
				/>
				<ExplanationList>
					<li>
						A modal dialog that interrupts the user with important content and
						expects a response.
					</li>
					<li>
						Click the button and the popup will appear in the middle of the
						screen.
					</li>
				</ExplanationList>
			</SubTitle>
			<AlertDialogDemo
				buttonTitle="Delete"
				actionDesc="Continue"
				contentDesc="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro a officiis eaque laborum natus repellat exercitationem recusandae veniam et dolores!"
				contentTitle="This Is Title"
			/>
		</LayoutToExperiments>
	);
}

function AlertDialogDemo({
	buttonTitle,
	contentTitle,
	contentDesc,
	actionDesc,
}) {
	return (
		<AlertDialog.Root>
			<AlertDialog.Trigger className=" bg-white px-4 py-1 text-red-600 rounded-full duration-100 hover:bg-red-50 border border-red-600">
				{buttonTitle}
			</AlertDialog.Trigger>
			<AlertDialog.Overlay className="fixed inset-0 z-50 bg-gray-900/50" />
			<AlertDialog.Content className="fixed top-1/2 left-1/2 z-90 max-h-[80vh] w-4/5 -translate-x-1/2  -translate-y-1/2 rounded-md bg-white p-5 sm:max-w-screen-xs select-none">
				<AlertDialog.Title className="text-center text-xl font-semibold text-gray-800 sm:text-left">
					{contentTitle}
				</AlertDialog.Title>
				<AlertDialog.Description className="mb-5 text-center text-zinc-800 sm:text-left">
					{contentDesc}
				</AlertDialog.Description>
				<div className="flex flex-col space-y-2 sm:flex-row sm:justify-end sm:space-y-0 sm:space-x-4">
					<AlertDialog.Cancel className="rounded-md bg-white hover:bg-red-50 px-3 py-2 font-medium  sm:py-1.5 border border-red-600 text-red-600">
						Cancel
					</AlertDialog.Cancel>
					<AlertDialog.Action>
						<div className="bg-red-600 px-3 py-2 sm:py-1.5 hover:bg-red-700 rounded-md text-white">
							{actionDesc}
						</div>
					</AlertDialog.Action>
				</div>
			</AlertDialog.Content>
		</AlertDialog.Root>
	);
}
