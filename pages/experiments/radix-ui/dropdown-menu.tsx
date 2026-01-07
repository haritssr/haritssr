import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { DropdownMenu } from "radix-ui";
import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";

export default function ExportedDropdownMenu() {
	const item =
		"px-4 py-0.5 w-full bg-white text-gray-800 hover:bg-blue-600 hover:text-white hover:cursor-pointer";
	const group = "";
	return (
		<LayoutToExperiments title="Dropdown Menu" domain="Radix UI">
			<SubTitle>
				<ExternalLink
					href="https://www.radix-ui.com/docs/primitives/components/dropdown-menu"
					name="Radix UI Dropdown Menu"
				/>
				<ExplanationList>
					<li>
						Displays a menu to the user—such as a set of actions or
						functions—triggered by a button.
					</li>
					<li>
						Click the button and the set of action or nested set of action will
						appear.
					</li>
				</ExplanationList>
			</SubTitle>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<div className="rounded-md border border-zinc-400 px-3 py-1 font-medium text-zinc-800 hover:bg-zinc-100 focus:outline-hidden">
						Option
					</div>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content className="w-full origin-top-left overflow-hidden rounded-md border border-gray-500 bg-white py-3">
					<DropdownMenu.Arrow className="-mt-px fill-zinc-800 stroke-zinc-800" />
					<div className="space-y-3">
						<DropdownMenu.Group className={group}>
							<DropdownMenu.Item className={item}>New File</DropdownMenu.Item>{" "}
							<DropdownMenu.Item className={item}>New Folder</DropdownMenu.Item>
							<DropdownMenu.Item className={item}>New Page</DropdownMenu.Item>
						</DropdownMenu.Group>
						<DropdownMenu.Group className={group}>
							<DropdownMenu.Item className={item}>Option 1</DropdownMenu.Item>
							<DropdownMenu.Item className={item}>Option 2</DropdownMenu.Item>
							<DropdownMenu.Item className={item}>Option 3</DropdownMenu.Item>
							<DropdownMenu.Root>
								<DropdownMenu.Trigger
									className={`${item} flex items-center justify-between`}
								>
									<div>Arrage by</div>
									<ChevronRightIcon className="h-3.5 w-3.5" strokeWidth={2} />
								</DropdownMenu.Trigger>
								<DropdownMenu.Content className="divide-y divide-gray-800 overflow-hidden rounded-md border border-zinc-800">
									<DropdownMenu.Item className={item}>
										List view
									</DropdownMenu.Item>
									<DropdownMenu.Item className={item}>
										Details View
									</DropdownMenu.Item>
									<DropdownMenu.Item className={item}>
										Icon view
									</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						</DropdownMenu.Group>
						<DropdownMenu.Group className={group}>
							<DropdownMenu.Item className={item}>Action 1</DropdownMenu.Item>
							<DropdownMenu.Item className={item}>Action 2</DropdownMenu.Item>
							<DropdownMenu.Item className={item}>Action 3</DropdownMenu.Item>
						</DropdownMenu.Group>
					</div>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</LayoutToExperiments>
	);
}
