import React from "react";
import SubTitle from "@/components/SubTitle";
import ExternalLink from "@/components/ExternalLink";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import ExplanationList from "@/components/ExplanationList";
import * as Tabs from "@radix-ui/react-tabs";

export default function TabsPage() {
	return (
		<LayoutToExperiments title="Tabs" domain="Radix UI">
			<SubTitle>
				<ExternalLink
					href="https://www.radix-ui.com/docs/primitives/components/tabs"
					name="Radix UI Tabs"
				/>
				<ExplanationList>
					<li>
						A set of layered sections of content—known as tab panels—that are
						displayed one at a time.
					</li>
				</ExplanationList>
			</SubTitle>
			<TabsDemo />
		</LayoutToExperiments>
	);
}

export const TabsDemo = () => (
	<Tabs.Root className="flex flex-col w-[300px]" defaultValue="tab1">
		<Tabs.List
			className="shrink-0 flex bg-zinc-100 rounded-lg p-1 space-x-1"
			aria-label="Manage your account"
		>
			<Tabs.Trigger
				className="bg-white py-1.5 flex-1 flex items-center justify-center select-none data-[state=active]:text-zinc-800 data-[state=active]:bg-white data-[state=active]:focus:relative data-[state=active]:shadow outline-none cursor-pointer rounded-md hover:bg-zinc-200/80 font-medium text-zinc-500  border data-[state=active]:border-zinc-300 border-transparent"
				value="tab1"
			>
				Account
			</Tabs.Trigger>
			<Tabs.Trigger
				className="bg-white py-1.5 flex-1 flex items-center justify-center select-none  data-[state=active]:bg-white data-[state=active]:focus:relative data-[state=active]:shadow outline-none cursor-pointer rounded-md hover:bg-zinc-200/80 font-medium text-zinc-500 data-[state=active]:text-zinc-800 border data-[state=active]:border-zinc-300 border-transparent"
				value="tab2"
			>
				Password
			</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content
			className="grow p-5 mt-2 bg-white rounded-md outline-none border border-zinc-200"
			value="tab1"
		>
			<div className="">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut molestias
				veritatis ullam quae rem quis aliquam, accusantium debitis sint
				praesentium.
			</div>
		</Tabs.Content>
		<Tabs.Content
			className="grow p-5 mt-2 bg-white rounded-md outline-none border border-zinc-200"
			value="tab2"
		>
			<div className="">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut molestias
				veritatis ullam quae rem quis aliquam, accusantium debitis sint
				praesentium.
			</div>
		</Tabs.Content>
	</Tabs.Root>
);
