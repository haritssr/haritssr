import SubTitle from "@/components/SubTitle";
import ExternalLink from "@/components/ExternalLink";
import ExplanationList from "@/components/ExplanationList";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import {
	ChevronDownIcon,
	ArrowDownCircleIcon,
	BuildingOffice2Icon,
} from "@heroicons/react/24/outline";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Image from "next/image";

export default function NotionNavBar() {
	return (
		<LayoutToExperiments domain="UI Explorations" title="Notion NavBar">
			<SubTitle>
				<ExternalLink
					href="https://www.notion.so/desktop"
					name="Notion NavBar"
				/>
				<ExplanationList>
					<li>Navigation Bar at Notion Marketing Pages</li>
					<li>
						Using Radix UI{" "}
						<ExternalLink
							href="https://www.radix-ui.com/docs/primitives/components/navigation-menu"
							name="Navigation Menu"
						/>
						to enable this features.
					</li>
				</ExplanationList>
				<div className="flex items-center space-x-2 pt-16">
					<Logo />
					<Yes />
				</div>
			</SubTitle>
		</LayoutToExperiments>
	);
}
function Logo() {
	return (
		<div className="mr-2  flex items-center space-x-2">
			<Image
				src="/Icons/notion.jpg"
				height="30"
				width="30"
				alt=""
				blurDataURL="/Icons/notion.jpg"
			/>
			<div className="text-lg font-semibold text-black">Notion</div>
		</div>
	);
}
function Yes() {
	return (
		<NavigationMenu.Root className="w-full">
			<NavigationMenu.List className="flex space-x-2">
				<NavigationMenu.Item className="rounded px-2 py-1 hover:bg-zinc-100">
					<NavigationMenu.Trigger className="group flex items-center space-x-1">
						<div className="text-sm font-semibold text-black">Product</div>
						<ChevronDownIcon
							className="h-3 w-3 group-rdx-state-open:rotate-180"
							strokeWidth={3}
						/>
					</NavigationMenu.Trigger>
					<NavigationMenu.Content className="absolute mt-2 -ml-2 w-fit  rounded bg-white p-1 drop-shadow-lg">
						<div className="cursor-pointer rounded px-2 py-1 text-sm hover:bg-zinc-50">
							<div className="font-medium text-black">Home</div>
							<div className="text-zinc-500">Docs, projects, & wikis</div>
						</div>
						<div className="mt-2 mb-1 px-2">
							<div className="flex cursor-pointer items-center justify-center space-x-1 rounded-md border border-zinc-200 py-1 text-black">
								<ArrowDownCircleIcon className="h-4 w-4" strokeWidth={1} />
								<div className="text-sm font-medium">Download Notion</div>
							</div>
							<div className="mt-1 text-sm font-light text-zinc-400">
								Mac, Windows, iOS, & Android
							</div>
						</div>
					</NavigationMenu.Content>
				</NavigationMenu.Item>
				<NavigationMenu.Item className="rounded px-2 py-1 hover:bg-zinc-100">
					<NavigationMenu.Trigger className="group flex items-center space-x-1">
						<div className="text-sm font-semibold text-black">Download</div>
						<ChevronDownIcon
							className="h-3 w-3 group-rdx-state-open:rotate-180"
							strokeWidth={3}
						/>
					</NavigationMenu.Trigger>
					<NavigationMenu.Content className="absolute mt-2 -ml-2 w-fit  rounded bg-white p-1 text-sm font-medium drop-shadow-lg">
						<div className="space-y-1">
							<div className="cursor-pointer rounded px-2 py-0.5 text-zinc-800 hover:bg-zinc-50">
								iOS & Android
							</div>
							<div className="cursor-pointer rounded px-2 py-0.5 text-zinc-800 hover:bg-zinc-50">
								macOS & Windows
							</div>
							<div className="cursor-pointer rounded px-2 py-0.5 text-zinc-800 hover:bg-zinc-50">
								Web Clipper
							</div>
						</div>
					</NavigationMenu.Content>
				</NavigationMenu.Item>
				<NavigationMenu.Item className="rounded px-2 py-1 hover:bg-zinc-100">
					<NavigationMenu.Trigger className="group flex items-center space-x-1">
						<div className="text-sm font-semibold text-black">Solutions</div>
						<ChevronDownIcon
							className="h-3 w-3 group-rdx-state-open:rotate-180"
							strokeWidth={3}
						/>
					</NavigationMenu.Trigger>
					<NavigationMenu.Content className="absolute mt-2 -ml-2 w-fit  rounded bg-white p-1 font-medium drop-shadow-lg">
						<div className="flex divide-x divide-zinc-300">
							<article className="p-1">
								<div className="mb-2 text-[10px] text-zinc-400">
									BY TEAM SIZE
								</div>
								<div className="space-y-1">
									<section className="flex cursor-pointer items-center space-x-1 rounded px-1.5 py-0.5 hover:bg-zinc-50">
										<BuildingOffice2Icon
											strokeWidth={1.5}
											className="h-8   w-8 fill-zinc-200 text-zinc-700"
										/>
										<div className="flex flex-col justify-center text-[12px]">
											<div className="font-medium text-zinc-800">
												Enterprise
											</div>
											<div className="text-zinc-400">
												Advance features for your org
											</div>
										</div>
									</section>
									<section className="flex cursor-pointer items-center space-x-1 rounded px-1.5 py-0.5 hover:bg-zinc-50">
										<BuildingOffice2Icon
											strokeWidth={1.5}
											className="h-8   w-8 fill-zinc-200 text-zinc-700"
										/>
										<div className="flex flex-col justify-center text-[12px]">
											<div className="font-medium text-zinc-800">
												Small bussiness{" "}
											</div>
											<div className="text-zinc-400">
												Run your team on one tool
											</div>
										</div>
									</section>
									<section className="flex cursor-pointer items-center space-x-1 rounded px-1.5 py-0.5 hover:bg-zinc-50">
										<BuildingOffice2Icon
											strokeWidth={1.5}
											className="h-8   w-8 fill-zinc-200 text-zinc-700"
										/>
										<div className="flex flex-col justify-center text-[12px]">
											<div className="font-medium text-zinc-800">Personal</div>
											<div className="text-zinc-400">Free for individual</div>
										</div>
									</section>
								</div>
							</article>
							<article className="p-1">
								<div className="mb-2 px-1 text-[10px] text-zinc-400">
									BY TEAM SIZE
								</div>
								<div className="space-y-1 text-sm">
									<div className="cursor-pointer rounded px-1 py-0.5 text-zinc-800 hover:bg-zinc-50">
										Design
									</div>
									<div className="cursor-pointer rounded px-1 py-0.5 text-zinc-800 hover:bg-zinc-50">
										Engineering
									</div>
									<div className="cursor-pointer rounded px-1 py-0.5 text-zinc-800 hover:bg-zinc-50">
										Product Manager
									</div>
								</div>
							</article>
							<article className="p-1">
								<div className="mb-2 px-1 text-[10px] text-zinc-400">
									BY TEAM SIZE
								</div>
								<div className="space-y-1 text-sm">
									<div className="cursor-pointer rounded px-1 py-0.5 text-zinc-800 hover:bg-zinc-50">
										Design
									</div>
									<div className="cursor-pointer rounded px-1 py-0.5 text-zinc-800 hover:bg-zinc-50">
										Engineering
									</div>
									<div className="cursor-pointer rounded px-1 py-0.5 text-zinc-800 hover:bg-zinc-50">
										Product Manager
									</div>
								</div>
							</article>
						</div>
					</NavigationMenu.Content>
				</NavigationMenu.Item>
				<NavigationMenu.Item className="rounded px-2 py-1 hover:bg-zinc-100">
					<NavigationMenu.Trigger className="group flex items-center space-x-1">
						<div className="text-sm font-semibold text-black">Resources</div>
						<ChevronDownIcon
							className="h-3 w-3 group-rdx-state-open:rotate-180"
							strokeWidth={3}
						/>
					</NavigationMenu.Trigger>
					<NavigationMenu.Content className="absolute mt-2 -ml-2 w-fit  rounded bg-white p-1 text-sm font-medium drop-shadow-lg">
						<div className="space-y-1">
							<div className="cursor-pointer rounded px-2 py-0.5 text-zinc-800 hover:bg-zinc-50">
								Blog
							</div>
							<div className="cursor-pointer rounded px-2 py-0.5 text-zinc-800 hover:bg-zinc-50">
								Guide & Tutorials
							</div>
							<div className="cursor-pointer rounded px-2 py-0.5 text-zinc-800 hover:bg-zinc-50">
								Webinar
							</div>
							<div className="cursor-pointer rounded px-2 py-0.5 text-zinc-800 hover:bg-zinc-50">
								Help center
							</div>
							<div className="cursor-pointer rounded px-2 py-0.5 text-zinc-800 hover:bg-zinc-50">
								API Docs
							</div>
							<div className="cursor-pointer rounded px-2 py-0.5 text-zinc-800 hover:bg-zinc-50">
								Community
							</div>
						</div>
					</NavigationMenu.Content>
				</NavigationMenu.Item>
				<NavigationMenu.Item className="rounded px-2 py-1 hover:bg-zinc-100">
					<NavigationMenu.Trigger className="group flex items-center space-x-1">
						<div className="text-sm font-semibold text-black">Pricing</div>
					</NavigationMenu.Trigger>
				</NavigationMenu.Item>
			</NavigationMenu.List>
		</NavigationMenu.Root>
	);
}
