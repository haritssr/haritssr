//For ExportedComboboxHeadlessUIData
import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";
import ExternalLink from "@/components/ExternalLink";

//For ComboboxExample1
import { Dialog, Combobox, Transition } from "@headlessui/react";
import { Fragment, SetStateAction, useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import ExplanationList from "@/components/ExplanationList";

interface useStateStringType {
	target: { value: SetStateAction<string> };
}
interface filteredProjectsType {
	id: number | string;
	domain: string;
	team: string;
}

const ExportedComboboxHeadlessUIData = () => {
	return (
		<LayoutToExperiments
			title="Combobox - HeadlessUI Data"
			domain="Headless UI"
		>
			<SubTitle>
				<ExternalLink
					href="https://headlessui.dev/react/combobox"
					name="Headless UI Combobox"
				/>
				.
				<ExplanationList>
					<li>
						Comboboxes are the foundation of accessible autocompletes and
						command palettes for your app, complete with robust support for
						keyboard navigation.
					</li>
					<li>Press ctrl+b to open search dialog.</li>
				</ExplanationList>
			</SubTitle>
			<ComboboxExample1 projects={Data} />
		</LayoutToExperiments>
	);
};

const ComboboxExample1 = ({ projects }) => {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const [query, setQuery] = useState("");

	useEffect(() => {
		function onKeydown(event: { key: string; metaKey: any; ctrlKey: any }) {
			if (event.key === "b" && (event.metaKey || event.ctrlKey)) {
				setIsOpen(!isOpen);
			}
		}
		window.addEventListener("keydown", onKeydown);
		return () => {
			window.removeEventListener("keydown", onKeydown);
		};
	}, [isOpen]);

	const filteredProjects = query
		? projects.filter(
				(project: { domain: string; team: string }) =>
					project.domain.toLowerCase().includes(query.toLowerCase()) ||
					project.team.toLowerCase().includes(query.toLowerCase())
		  )
		: [];

	return (
		<Transition.Root
			show={isOpen}
			as={Fragment}
			afterLeave={() => setQuery("")}
		>
			<Dialog
				// open={isOpen} had been move to <Transition.Root/> as a show={isOpen}
				onClose={setIsOpen} //onClose={() => {setIsOpen(false);}}
				className="fixed inset-0 z-50 overflow-y-auto p-8 pt-[25vh]"
			>
				<Transition.Child
					enter="duration-100 ease-out"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="duration-100 ease-in"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<Dialog.Overlay className="fixed inset-0 bg-zinc-800/80 backdrop-blur-sm" />
				</Transition.Child>
				<Transition.Child
					enter="duration-100 ease-out"
					enterFrom="opacity-0 scale-95"
					enterTo="opacity-100 scale-100"
					leave="duration-100 ease-in"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-95"
				>
					<Combobox
						// what will happen when click the option in combobox
						onChange={(project) => {
							setIsOpen(false);
							router.push(`/projects/${project.id}`);
							// router.push(router.asPath);
						}}
						value={projects.id}
						// value={project}
						as="div"
						className="relative mx-auto max-w-xl divide-y divide-gray-200 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5"
					>
						<div className="flex items-center px-4">
							<MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />
							<Combobox.Input
								onChange={(event: useStateStringType) => {
									setQuery(event.target.value);
								}}
								className="h-12 w-full border-0 bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-0"
								placeholder="Search Experiments"
							/>
						</div>
						{filteredProjects.length > 0 && (
							<Combobox.Options
								static
								className="max-h-60 overflow-y-auto py-4 text-sm"
							>
								{/* : filteredProjectsType */}
								{/* value={{ id, domain, team }} */}
								{filteredProjects.map((project: filteredProjectsType) => (
									<Combobox.Option key={project.id} value={Data}>
										{({ active }) => (
											<div
												className={`space-x-1 px-4 py-2 ${
													active ? "bg-blue-500" : "bg-white"
												} cursor-pointer`}
											>
												<span
													className={`font-medium  ${
														active ? "text-white" : "text-gray-900"
													}`}
												>
													{project.domain}
												</span>
												<span
													className={` ${
														active ? "text-blue-200" : "text-gray-400"
													}`}
												>
													in {project.team}
												</span>
											</div>
										)}
									</Combobox.Option>
								))}
							</Combobox.Options>
						)}

						{query && filteredProjects.length === 0 && (
							<p className="p-4 text-sm text-gray-500">No results found</p>
						)}
					</Combobox>
				</Transition.Child>
			</Dialog>
		</Transition.Root>
	);
};

export default ExportedComboboxHeadlessUIData;

const Data = [
	{
		id: 1,
		domain: "Product Manager",
		team: "Director",
	},
	{
		id: 2,
		domain: "React Developer",
		team: "Engineering",
	},
	{
		id: 3,
		domain: "UX Researcher",
		team: "Design",
	},
	{
		id: 4,
		domain: "UI Designer",
		team: "Design",
	},
	{
		id: 5,
		domain: "Sales",
		team: "Marketing",
	},
	{
		id: 6,
		domain: "Ads",
		team: "Marketing",
	},
	{
		id: 7,
		domain: "Database developer",
		team: "Engineering",
	},
	{
		id: 8,
		domain: "Chief Executive Officer",
		team: "Director",
	},
	{
		id: 9,
		domain: "Chief Financial Officer",
		team: "Director",
	},
	{
		id: 10,
		domain: "Chief Technology Officer",
		team: "Director",
	},
];
