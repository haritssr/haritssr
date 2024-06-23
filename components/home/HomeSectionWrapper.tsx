"use client";

import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

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
	return (
		<div id={id}>
			{collapsible ? (
				<Disclosure as="div" defaultOpen>
					{({ open }) => (
						<>
							<div className="flex items-center justify-between w-full">
								<div className="flex items-center space-x-2">
									<Link
										href={`/#${id}`}
										className=" text-2xl sm:text-3xl font-bold text-zinc-800"
									>
										{topic}
									</Link>
								</div>

								<div className="flex items-center space-x-2 sm:space-x-0">
									<Link
										href={`/${id}`}
										className="select-none text-action hover:underline"
									>
										Details
									</Link>
									<Disclosure.Button>
										{open ? (
											<div className="flex items-center space-x-1.5 px-1.5 sm:pl-2.5 py-1.5 sm:pr-3.5 sm:py-[3px] rounded-full border hover:bg-zinc-50 border-zinc-300 sm:hidden">
												<ChevronUpIcon className="h-4 w-4 stroke-2 text-zinc-700" />
												<span className="text-tiny hidden sm:block text-zinc-700 select-none">
													Show Less
												</span>
											</div>
										) : (
											<div className="flex items-center space-x-1.5 px-1.5 sm:pl-2.5 py-1.5 sm:pr-3.5 sm:py-[3px] rounded-full border border-zinc-800 bg-zinc-800 text-white hover:bg-zinc-700 sm:hidden">
												<ChevronDownIcon className="h-4 w-4 stroke-2" />
												<span className="text-tiny hidden sm:block select-none">
													Show More
												</span>
											</div>
										)}
									</Disclosure.Button>
								</div>
							</div>
							{/* body */}
							<Disclosure.Panel>
								<div className="mb-16">
									<div className="my-5 text-lg sm:text-xl text-zinc-800 select-none">
										{explanation}
									</div>
									<div className={className}>{children}</div>
								</div>
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
			) : (
				<>
					{/* header */}
					<section className="flex items-center justify-between">
						<div className="flex items-center space-x-2">
							<Link
								href={`/#${id}`}
								className=" text-2xl sm:text-3xl font-bold text-zinc-800"
							>
								{topic}
							</Link>
						</div>
					</section>
					{/* body */}
					<div className="mb-16">
						<div className="my-5 text-lg sm:text-xl text-zinc-800 select-none">
							{explanation}
						</div>
						<div className={className}>{children}</div>
					</div>
				</>
			)}
		</div>
	);
}
