import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";
import ExternalLink from "@/components/ExternalLink";

import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon, FireIcon } from "@heroicons/react/24/solid";
import ExplanationList from "@/components/ExplanationList";
import { BookOpenIcon } from "@heroicons/react/24/outline";

export default function ExportedMenu() {
	return (
		<LayoutToExperiments title="Menu" domain="Headless UI">
			<SubTitle>
				<ExternalLink
					href="https://headlessui.dev/react/menu"
					name="Headless UI Menu (Dropdown)"
				/>
				<ExplanationList>
					<li>
						Menus offer an easy way to build custom, accessible dropdown
						components with robust support for keyboard navigation.
					</li>
					<li>
						Click the button and the list of option will appear in the form of
						box which contain several types of button.
					</li>
				</ExplanationList>
			</SubTitle>
			<MenuExample1 />
		</LayoutToExperiments>
	);
}

const MenuExample1 = () => {
	return (
		//border to identify the width of the Menu.Button
		<div className="relative w-52 text-left">
			<Menu as="div" className="relative inline-block text-left">
				{({ open }) => (
					<>
						<div>
							<Menu.Button className="inline-flex w-full justify-center items-center rounded-md bg-zinc-800 px-3 py-1.5 text-sm font-medium text-zinc-800 hover:bg-zinc-100 border border-zinc-500 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
								Options
								<ChevronDownIcon
									className={`ml-2 -mr-1 h-5 w-5 text-zinc-800 ${
										open ? "rotate-180" : ""
									}`}
									aria-hidden="true"
								/>
							</Menu.Button>
						</div>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95"
						>
							<Menu.Items className="absolute left-0 mt-2 w-52 origin-top-left space-y-1 rounded-md border border-zinc-500 p-2 focus:outline-hidden">
								<Menu.Item>
									{({ active }) => (
										<button
											type="button"
											className={`flex w-full items-center justify-between rounded-md py-1.5 px-3 ${
												active ? "bg-blue-600 text-white" : "text-zinc-700"
											}`}
										>
											<div>Action</div>
											<BookOpenIcon className="h-4 w-4" />
										</button>
									)}
								</Menu.Item>

								<Menu.Item>
									{({ active }) => (
										<button
											type="button"
											className={`flex w-full items-center justify-between rounded-md py-1.5 px-3 ${
												active ? "bg-blue-600 text-white" : "text-zinc-700"
											}`}
										>
											<div>Action</div>
											<BookOpenIcon className="h-4 w-4" />
										</button>
									)}
								</Menu.Item>
								{/* Disabled item */}
								<Menu.Item disabled={true}>
									{({ disabled }) => (
										<button
											type="button"
											className={`flex w-full items-center justify-between rounded-md py-1.5 px-3 ${
												disabled ? "text-zinc-400" : ""
											}`}
										>
											<div>Disabled Action</div>
											<BookOpenIcon className="h-4 w-4" />
										</button>
									)}
								</Menu.Item>
							</Menu.Items>
						</Transition>
					</>
				)}
			</Menu>
		</div>
	);
};
