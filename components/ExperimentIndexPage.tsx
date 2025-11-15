import Image from "next/image";
import type { ExperimentsData } from "../data/ExperimentsData";
import Layout from "./Layout";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useInView } from "react-intersection-observer";

import { useRouter } from "next/router";
import React from "react";
import { GitHubIcon } from "./Icons";
import { ChevronRightIcon } from "@radix-ui/react-icons";

export default function ExperimentIndexPage({
	experiment,
}: { experiment: ExperimentsData }) {
	const lastThreeSegmentRoute = useRouter().asPath;
	const githubRoute = `https://github.com/haritssr/haritssr/blob/main/pages${lastThreeSegmentRoute}.tsx`;
	const { ref, inView } = useInView({ rootMargin: "-90px" });

	return (
		<Layout
			browserTitle={experiment.title}
			description={experiment.description}
		>
			{/* SubNavigation */}
			<section
				className={`sticky -top-0 sm:top-[44.5px] border-b -mx-5 sm:max-w-5xl sm:mx-auto sm:mt-10 ${
					inView
						? "border-zinc-200"
						: "border-b bg-white/70 saturate-150 backdrop-blur-lg"
				} z-40 mb-5 bg-white py-2.5 sm:border-none`}
			>
				<div className="mx-auto flex max-w-5xl items-center justify-between px-3 sm:px-3.5">
					<BackToExperiments inView={inView} />
					<PageTitleCenter inView={inView} title={experiment.title} />
					<PageSource inView={inView} href={githubRoute} />
				</div>
			</section>
			{/* mx-auto min-h-screen w-full max-w-5xl px-6 xl:px-0 */}
			<div className="mt-10 mx-auto min-h-screen w-full sm:px-0">
				<div className="mb-10 space-y-2">
					<div className="flex items-center space-x-2">
						<Image
							src={experiment.logoSrc}
							height={36}
							width={36}
							alt={experiment.title}
						/>
					</div>
					<div ref={ref} className="text-2xl sm:text-3xl font-semibold">
						{experiment.title}
					</div>
					<div className="text-zinc-800 text-lg">{experiment.description}</div>
					<div className="text-zinc-400 text-lg">
						{experiment.links.length} experiments
					</div>
				</div>
				<ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 px-3.5 py-2 -ml-[14px]">
					{experiment.links?.map((link) => (
						<li key={link}>
							<Link
								key={link}
								href={`/experiments/${experiment.title
									.toLowerCase()
									.replace(" ", "-")}/${link
									.toLowerCase()
									// /\s/g regex -> search all (g = global) whitespace, and replace them with '-'
									.replace(/\s/g, "-")}`}
								className="rounded-md border border-zinc-300 pl-3 pr-3.5 py-2 hover:bg-zinc-50 flex items-center justify-between  group"
							>
								<>
									<div className="text-zinc-700">{link}</div>
									<ChevronRightIcon
										width={2}
										className="w-5 h-5 text-zinc-500 group-hover:text-zinc-800"
									/>
								</>
							</Link>
						</li>
					))}
				</ol>
			</div>
		</Layout>
	);
}

const BackToExperiments = ({ inView }: { inView: unknown }) => {
	return (
		<Link
			href="/experiments"
			className={`-ml-1 flex w-1/3 cursor-pointer items-center sm:w-1/6 ${
				inView ? "w-1/2 sm:-ml-5" : "w-1/4"
			}`}
		>
			<span className=" inline-block w-full">
				<span className="group flex items-center">
					<ChevronLeftIcon
						className=" text-blue-500 sm:group-hover:text-[#2563eb]/90 h-5 w-5"
						strokeWidth={2}
					/>
					<span
						className={`-ml-0.5 truncate text-blue-500 sm:group-hover:underline sm:group-hover:text-[#2563eb]/90 text-base ${
							inView ? "block" : "hidden"
						}`}
					>
						Experiments
					</span>
				</span>
			</span>
		</Link>
	);
};

const PageTitleCenter = ({
	title,
	inView,
}: { title: string; inView: unknown }) => {
	return (
		<div className={`sm:2/4 -mr-2 inline ${inView ? "w-0" : "w-1/2"}`}>
			<div className="flex justify-center py-0.5">
				<div
					className={`truncate text-center font-semibold ${
						inView ? "text-transparent hidden" : "text-zinc-800 block"
					}`}
				>
					{title}
				</div>
			</div>
		</div>
	);
};

const PageSource = ({ href, inView }: { href: string; inView: unknown }) => {
	return (
		<div
			className={`flex justify-end sm:w-1/6 ${
				inView ? "w-1/2 sm:-mr-3.5" : "w-1/4"
			}`}
		>
			<cite className="not-italic group">
				<a
					title="This page source code"
					href={href}
					target="_blank"
					rel="noopener noreferrer"
					className="flex w-fit cursor-pointer items-center text-blue-500 hover:text-[#2563eb]/90"
				>
					<span className="mr-2 hidden sm:inline-block text-blue-500 group-hover:text-[#2563eb]/90">
						Source
					</span>{" "}
					<GitHubIcon className="h-5 w-5 cursor-pointer text-blue-500 group-hover:text-[#2563eb]/90" />
				</a>
			</cite>
		</div>
	);
};
