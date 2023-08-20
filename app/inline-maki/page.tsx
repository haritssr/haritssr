"use client";

import * as Accordion from "@radix-ui/react-accordion";
import * as Tooltip from "@radix-ui/react-tooltip";
import * as Switch from "@radix-ui/react-switch";
import {
	ChevronDownIcon,
	PlusIcon,
	QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

export default function InlineMakiPage() {
	return (
		<div className="my-20 space-y-2 max-w-xs mx-auto">
			<InlineMAKI value="1" />
			<InlineMAKI value="2" />
			<InlineMAKI value="3" />
			<InlineMAKI value="4" />
			<InlineMAKI value="5" />
		</div>
	);
}

function InlineMAKI({ value }: { value: string }) {
	return (
		<Accordion.Root type="multiple" asChild>
			<Accordion.Item value={value}>
				<Accordion.Header className="group">
					<Accordion.Trigger className="w-full">
						<div className="w-full flex items-center justify-between rounded-md bg-zinc-50/50 border border-zinc-200 px-3 py-1 group-rdx-state-open:rounded-b-none group-rdx-state-open:border-b-0 text-tiny">
							<div className="text-zinc-400">Nomor Soal</div>
							<div className="text-action">Kerjakan</div>
						</div>
					</Accordion.Trigger>
				</Accordion.Header>
				<Accordion.Content>
					<div className="border-l border-r pt-0.5 border-zinc-200 bg-zinc-50 px-2 pb-2 border-b rounded-b-md space-y-2">
						<Section title="Masalah" />
						<Section title="Abstraksi" />
						<Section title="Kalkulasi" />
						<div className="flex items-center text-zinc-400 space-x-1">
							<PlusIcon className="h-3 w-3 stroke-2" />
							<span className="text-xs select-none">Interpretasi</span>
						</div>
					</div>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	);
}

function Section({ title }: { title: string }) {
	return (
		<Accordion.Root type="multiple">
			<Accordion.Item value="s" className="bg-white rounded-md shadow">
				<Accordion.Header className="group">
					<section className="w-full rounded overflow-hidden border-zinc-400 border pl-2 pr-3 py-1 flex items-center justify-between text-sm font-medium bg-zinc-100 group-rdx-state-open:rounded-b-none group-rdx-state-open:border-b-0">
						<div className="flex items-center space-x-1">
							<div className="text-zinc-700">{title}</div>
							<Tooltip.Provider>
								<Tooltip.Root>
									<Tooltip.Trigger className="flex items-center rounded px-1 py-0.5 hover:bg-zinc-100 active:ring-1 active:ring-zinc-700">
										<QuestionMarkCircleIcon
											className="h-4 w-4 text-zinc-400"
											strokeWidth={2}
										/>
									</Tooltip.Trigger>
									<Tooltip.Content
										side="top"
										align="center"
										className="rounded-md bg-zinc-700 px-2.5 py-1.5 text-white shadow-xl"
									>
										<div>Mozilla Developer Network</div>
										<Tooltip.Arrow
											offset={5}
											width={10}
											height={5}
											className="fill-[#3F3F46]"
										/>
									</Tooltip.Content>
								</Tooltip.Root>
							</Tooltip.Provider>
						</div>
						<div className="flex items-center space-x-2">
							<Switch.Root
								id="s1"
								className="block w-[34px] p-[3px] rdx-state-unchecked:bg-zinc-600  rounded-full  rdx-state-checked:bg-green-600 items-center"
							>
								<Switch.Thumb className="block h-3.5 w-3.5 rounded-full bg-white will-change-transform rdx-state-checked:translate-x-[14px] shadow  rdx-state-checked:bg-white duration-100" />
							</Switch.Root>
							<Accordion.Trigger>
								<ChevronDownIcon className="w-4 h-4 stroke-2 text-zinc-500 group-rdx-state-open:rotate-180" />
							</Accordion.Trigger>
						</div>
					</section>
				</Accordion.Header>
				<Accordion.Content className=" border border-zinc-400 rounded-b-md duration-100">
					<textarea
						className="w-full px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-600 h-auto"
						rows={1}
						placeholder="Empty"
					/>
					<div className="p-2 space-x-2 flex items-center overscroll-auto border-t border-zinc-400">
						<ActionButton />
						<ActionButton />
						<ActionButton />
					</div>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	);
}

function ActionButton() {
	return (
		<button className="flex items-center text-zinc-700 space-x-1 rounded pl-1 pr-2 py-0.5 border  hover:bg-zinc-50 border-zinc-400 shadow-sm active:translate-y-[1px] duration-100 shadow-zinc-200">
			<PlusIcon className="h-3 w-3 stroke-2" />
			<span className="text-xs select-none">Action</span>
		</button>
	);
}
