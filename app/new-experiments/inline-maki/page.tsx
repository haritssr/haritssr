"use client";

import {
	ChevronDownIcon,
	PlusIcon,
	QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { Accordion, Switch, Tooltip } from "radix-ui";

export default function InlineMakiPage() {
	return (
		<div className="mx-auto my-20 max-w-xs space-y-2">
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
						<div className="flex w-full items-center justify-between rounded-md border border-zinc-200 bg-zinc-50/50 px-3 py-1 text-tiny group-rdx-state-open:rounded-b-0 group-rdx-state-open:border-b-0">
							<div className="text-zinc-400">Nomor Soal</div>
							<div className="text-action">Kerjakan</div>
						</div>
					</Accordion.Trigger>
				</Accordion.Header>
				<Accordion.Content>
					<div className="space-y-2 rounded-b-md border-zinc-200 border-r border-b border-l bg-zinc-50 px-2 pt-0.5 pb-2">
						<Section title="Masalah" />
						<Section title="Abstraksi" />
						<Section title="Kalkulasi" />
						<div className="flex items-center space-x-1 text-zinc-400">
							<PlusIcon className="h-3 w-3 stroke-2" />
							<span className="select-none text-xs">Interpretasi</span>
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
			<Accordion.Item value="s" className="rounded-md bg-white shadow">
				<Accordion.Header className="group">
					<section className="flex w-full items-center justify-between overflow-hidden rounded border border-zinc-400 bg-zinc-100 py-1 pr-3 pl-2 font-medium text-sm group-rdx-state-open:rounded-b-none group-rdx-state-open:border-b-0">
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
								className="block w-[34px] items-center rounded-full rdx-state-checked:bg-green-600 rdx-state-unchecked:bg-zinc-600 p-[3px]"
							>
								<Switch.Thumb className="block h-3.5 w-3.5 rdx-state-checked:translate-x-[14px] rounded-full bg-white rdx-state-checked:bg-white shadow duration-100 will-change-transform" />
							</Switch.Root>
							<Accordion.Trigger>
								<ChevronDownIcon className="h-4 w-4 stroke-2 text-zinc-500 group-rdx-state-open:rotate-180" />
							</Accordion.Trigger>
						</div>
					</section>
				</Accordion.Header>
				<Accordion.Content className="rounded-b-md border border-zinc-400 duration-100">
					<textarea
						className="h-auto w-full px-2 py-1 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
						rows={1}
						placeholder="Empty"
					/>
					<div className="flex items-center space-x-2 overscroll-auto border-zinc-400 border-t p-2">
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
		<button
			className="flex items-center space-x-1 rounded border border-zinc-400 py-0.5 pr-2 pl-1 text-zinc-700 shadow-sm shadow-zinc-200 duration-100 hover:bg-zinc-50 active:translate-y-px"
			type="button"
		>
			<PlusIcon className="h-3 w-3 stroke-2" />
			<span className="select-none text-xs">Action</span>
		</button>
	);
}
