import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { ExperimentsData } from "data/ExperimentsData";
import Head from "next/head";
import Link from "next/link";
// used in sidebar
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import type React from "react";
import { useInView } from "react-intersection-observer";
import Breadcrumbs from "@/components/Breadcrumbs";
import GlobalNavigationMobile from "@/components/GlobalNavigationMobile";
import Footer from "./Footer";
import GlobalNavigation from "./GlobalNavigation";
import { GitHubIcon } from "./Icons";

interface LayoutToExperimentsType {
	children: React.ReactNode;
	title: string;
	domain: string;
}

export default function LayoutToExperiments({
	children,
	title,
	domain,
}: LayoutToExperimentsType) {
	const lastThreeSegmentRoute = useRouter().asPath;
	const githubRoute = `https://github.com/haritssr/haritssr/blob/main/pages${lastThreeSegmentRoute}.tsx`;
	const image = "/images/hero.jpg";
	const yes = `${title} - Harits Syah`;
	const { ref, inView } = useInView({ rootMargin: "-90px" });

	return (
		<>
			<Head>
				<title>{yes}</title>
				<link rel="icon" href="/Icons/haritssr.svg" />
				<meta name="theme-color" content="#27272a" />
				<meta name="robots" content="follow, index" />
				<meta name="description" content={title} />
				<meta property="og:type" content="website" />
				<meta property="og:site_name" content="HarisLab" />
				<meta property="og:description" content={title} />
				<meta property="og:title" content={title} />
				<meta property="og:image" content={image} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@haritssr" />
				<meta name="twitter:title" content={title} />
				<meta name="twitter:description" content={title} />
				<meta name="twitter:image" content={image} />
				<link rel="manifest" href="/static/favicons/site.webmanifest" />
			</Head>

			<GlobalNavigation />

			<main className="sm:-mt-px mx-auto flex max-w-5xl sm:gap-10 sm:px-5 xl:px-0">
				<div className="grid min-h-screen w-full max-w-5xl grid-cols-1 sm:grid-cols-4">
					<SideBar domain={domain} />

					{/* Content */}
					<div className="border-r border-b sm:col-span-3 sm:border-t">
						<article className="sm:px-0">
							{/* SubNavigation */}
							<section
								className={`sticky top-0 border-b sm:top-[44.5px] ${
									inView
										? "border-zinc-200"
										: "border-b bg-white/70 saturate-150 backdrop-blur-lg"
								} z-40 bg-white py-2`}
							>
								<div className="mx-auto flex max-w-5xl items-center justify-between px-3 sm:px-3.5">
									<BackToExperiments inView={inView} domain={domain} />
									<PageTitleCenter inView={inView} title={title} />
									<PageSource inView={inView} href={githubRoute} />
								</div>
							</section>

							{/* Header */}
							<div className="px-5">
								<Breadcrumbs />
								<h1
									ref={ref}
									className="wrap-break-word z-40 mx-auto mt-10 mb-2 block h-auto w-full text-left font-bold text-3xl text-zinc-800"
								>
									{title}
								</h1>
								{children}
							</div>
						</article>
					</div>
				</div>
			</main>

			<Footer />
			<GlobalNavigationMobile />
		</>
	);
}

const SideBar = ({ domain }: { domain: string }) => {
	//getting a links of experiments under domain as an array
	function getArrayDomain(domain: string) {
		const experiment = ExperimentsData.find((exp) => exp.title === domain);
		return experiment ? experiment.links : [];
	}
	const links = getArrayDomain(domain);

	// getting a "last segment of the url" to match with the "experiment page under domain" for hover coloring logic at sidebar
	const pathname = usePathname();
	const segments = pathname?.split("/") as string[];
	const lastSegment = segments[segments.length - 1];

	return (
		<div className="hidden border sm:col-span-1 sm:block">
			<Link
				className="sticky top-[45px] block border-b bg-white px-5 py-2 font-medium"
				href={`/experiments/${domain.toLowerCase().replace(" ", "-")}`}
			>
				{domain}
			</Link>
			<div className="flex flex-col space-y-1 px-3 py-5 sm:max-h-screen sm:overflow-auto">
				{links.map((experimentPage) => {
					// experimentPage = string; e.g. Apple Navbar, Floating Labels
					// experimentPageEdited = a lowercased with "-"; e.g. apple-navbar, floating-labels
					const experimentPageEdited = experimentPage
						.toLowerCase()
						.split(" ")
						.join("-");
					return (
						<Link
							href={`/experiments/${domain
								.toLowerCase()
								.split(" ")
								.join("-")}/${experimentPageEdited}`}
							key={experimentPage}
							className={`${
								lastSegment === experimentPageEdited
									? "bg-action text-white"
									: "text-zinc-800 hover:bg-zinc-200/70 hover:text-zinc-950"
							} rounded-md px-2 py-1`}
						>
							{experimentPage}
						</Link>
					);
				})}
			</div>
		</div>
	);
};

const BackToExperiments = ({
	inView,
	domain,
}: {
	inView: unknown;
	domain: string;
}) => {
	return (
		<Link
			href={`/experiments/${domain.toLowerCase().replace(" ", "-")}`}
			className={`-ml-1 flex cursor-pointer items-center sm:w-1/4 ${
				inView ? "w-1/2" : "w-1/4"
			}`}
		>
			<span className="inline-block w-full">
				<span className="group flex items-center">
					<ChevronLeftIcon
						className="h-5 w-5 text-action sm:group-hover:text-action/90"
						strokeWidth={2}
					/>
					<span className="-ml-0.5 truncate text-action text-base sm:group-hover:text-action/90 sm:group-hover:underline">
						{inView ? domain : "Back"}
					</span>
				</span>
			</span>
		</Link>
	);
};

const PageTitleCenter = ({
	title,
	inView,
}: {
	title: string;
	inView: unknown;
}) => {
	return (
		<div className={`sm:1/2 -mr-2 inline ${inView ? "w-0" : "w-1/2"}`}>
			<div className="flex justify-center py-0.5 sm:py-0">
				<div
					className={`truncate text-center font-semibold ${
						inView ? "hidden text-transparent" : "block text-zinc-800"
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
		<div className={`flex justify-end sm:w-1/4 ${inView ? "w-1/2" : "w-1/4"}`}>
			<cite className="group not-italic">
				<a
					title="This page source code"
					href={href}
					target="_blank"
					rel="noopener noreferrer"
					className="flex w-fit cursor-pointer items-center text-action hover:text-[#2563eb]/90"
				>
					<span className="mr-2 hidden text-action group-hover:text-action/90 sm:inline-block">
						Source
					</span>{" "}
					<GitHubIcon className="h-5 w-5 cursor-pointer text-action group-hover:text-action/90" />
				</a>
			</cite>
		</div>
	);
};
