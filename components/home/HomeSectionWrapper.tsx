"use client";

import * as Toast from "@radix-ui/react-toast";
import Link from "next/link";
import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

const ToastCopy = ({ topic, handleCopy }: { topic: string; handleCopy: (page: string) => Promise<void> }) => {
	const [open, setOpen] = React.useState(false);
	const eventDateRef = React.useRef(new Date());
	const timerRef = React.useRef(0);

	React.useEffect(() => {
		return () => clearTimeout(timerRef.current);
	}, []);

	function oneWeekAway() {
		const now = new Date();
		const inOneWeek = now.setDate(now.getDate() + 7);
		return new Date(inOneWeek);
	}

	return (
		<Toast.Provider swipeDirection="right">
			<div
				title="Copy this page section"
				className="cursor-pointer p-[5px]"
				onClick={() => {
					handleCopy(`haritssr.com/${topic.toLowerCase().split(" ").join("-")}`);
					setOpen(false);
					window.clearTimeout(timerRef.current);
					timerRef.current = window.setTimeout(() => {
						eventDateRef.current = oneWeekAway();
						setOpen(true);
					}, 100);
				}}
			>
				<svg
					className="-rotate-45 text-zinc-400 h-4 w-4 hover:text-zinc-800 stroke-2"
					fill="none"
					shapeRendering="geometricPrecision"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					viewBox="0 0 24 24"
				>
					<path d="M15 7h3a5 5 0 015 5 5 5 0 01-5 5h-3m-6 0H6a5 5 0 01-5-5 5 5 0 015-5h3" />
					<path d="M8 12h8" />
				</svg>
			</div>

			<Toast.Root
				className="border border-zinc-300 bg-white/70 saturate-150 backdrop-blur-md rounded-lg py-3 px-4 grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut shadow-xl"
				open={open}
				onOpenChange={setOpen}
			>
				<Toast.Title className="[grid-area:_title] mb-[5px] font-medium text-slate12 text-[15px]">Link copied to clipboard</Toast.Title>
				<Toast.Description asChild>
					<div className="[grid-area:_description] m-0 text-zinc-500 text-[13px] leading-[1.3]">{`haritssr.com/${topic
						.toLowerCase()
						.split(" ")
						.join("-")}`}</div>
				</Toast.Description>
			</Toast.Root>
			<Toast.Viewport className="p-3 sm:p-6 fixed bottom-0 right-0 flex flex-col gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
		</Toast.Provider>
	);
};

export default function HomeSectionWrapper({
	topic,
	className,
	children,
	id,
	explanation,
	collapsible = false,
}: {
	topic: string;
	className?: string;
	children: React.ReactNode;
	id: string;
	explanation: string;
	collapsible?: boolean;
}) {
	async function handleCopy(page: string) {
		try {
			await navigator.clipboard.writeText(page);
		} catch (err: any) {
			console.log(err);
		}
	}
	return (
		<div id={id}>
			{collapsible ? (
				<Disclosure as="div" defaultOpen>
					{({ open }) => (
						<>
							<div className="flex items-center justify-between w-full">
								<div className="flex items-center space-x-2">
									<Link href={`/#${id}`} className=" text-2xl sm:text-3xl font-bold text-zinc-800 dark:text-zinc-200">
										{topic}
									</Link>
									<div>
										<ToastCopy topic={topic} handleCopy={handleCopy} />
									</div>
								</div>

								<div className="flex items-center space-x-2">
									<Link
										href={`/${id}`}
										className="rounded-full text-action border border-zinc-300 hover:bg-zinc-100 text-tiny px-2.5 sm:px-3 py-[3px] select-none active:ring-2 active:ring-action active:ring-offset-1 dark:text-blue-500 dark:border-zinc-600 dark:hover:bg-zinc-800"
									>
										Detail
									</Link>
									<Disclosure.Button>
										{open ? (
											<div className="flex items-center space-x-1.5 px-1.5 sm:pl-2.5 py-1.5 sm:pr-3.5 sm:py-[3px] rounded-full border hover:bg-zinc-50 dark:hover:bg-zinc-800 border-zinc-300 dark:border-zinc-600">
												<ChevronUpIcon className="h-4 w-4 stroke-2 text-zinc-700 dark:text-zinc-300" />
												<span className="text-tiny hidden sm:block text-zinc-700 dark:text-zinc-300 select-none">Show Less</span>
											</div>
										) : (
											<div className="flex items-center space-x-1.5 px-1.5 sm:pl-2.5 py-1.5 sm:pr-3.5 sm:py-[3px] rounded-full border border-zinc-800 bg-zinc-800 text-white hover:bg-zinc-700">
												<ChevronDownIcon className="h-4 w-4 stroke-2" />
												<span className="text-tiny hidden sm:block select-none">Show More</span>
											</div>
										)}
									</Disclosure.Button>
								</div>
							</div>
							{/* body */}
							<Disclosure.Panel>
								<div className="mb-16">
									<div className="my-4 text-lg sm:text-xl text-zinc-800 dark:text-zinc-300 select-none">{explanation}</div>
									<div className={className}>{children}</div>
								</div>
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
			) : (
				<>
					{/* header */}
					<section className="mb-4 flex items-center justify-between">
						<div className="flex items-center space-x-2">
							<Link href={`/#${id}`} className=" text-2xl sm:text-3xl font-bold text-zinc-800 dark:text-zinc-200">
								{topic}
							</Link>
							<div>
								<ToastCopy topic={topic} handleCopy={handleCopy} />
							</div>
						</div>
					</section>
					{/* body */}
					<div className="mb-16">
						<div className="mb-4 text-lg sm:text-xl text-zinc-800 dark:text-zinc-300 select-none">{explanation}</div>
						<div className={className}>{children}</div>
					</div>
				</>
			)}
		</div>
	);
}
