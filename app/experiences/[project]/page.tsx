"use client";

import BackButton from "@/components/BackButton";
import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import { ExperiencesData } from "data/ExperiencesData";
import Image from "next/image";
import { Suspense } from "react";
import Head from "next/head";
import { usePathname } from "next/navigation";

export async function generateStaticParams() {
	return ExperiencesData.map(({ project_name }) => {
		return {
			params: { project: project_name.toLowerCase().split(" ").join("-") },
		};
	});
}

export default function ExperiencesPage({ params }) {
	const project = ExperiencesData.filter(
		(p) => p.project_name.toLowerCase().split(" ").join("-") === params?.project
	)[0];
	const pathname = usePathname();
	const image = "/images/hero.jpg";
	const type = "website";

	const browserTitle = "Experiences";
	const description = "Lists of experience or project";
	return (
		<div className="bg-white">
			<Head>
				<title>
					{pathname === "/" ? "Harits Syah" : `${browserTitle} - Harits Syah`}
				</title>
				<link rel="icon" href="/Icons/haritssr.svg" />
				<meta name="theme-color" content="#27272a" />
				<meta name="robots" content="follow, index" />
				<meta name="description" content={description} />
				<meta property="og:type" content={type} />
				<meta property="og:site_name" content="HarisLab" />
				<meta property="og:description" content={description} />
				<meta property="og:title" content={browserTitle} />
				<meta property="og:image" content={image} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@haritssr" />
				<meta name="twitter:title" content={browserTitle} />
				<meta name="twitter:description" content={description} />
				<meta name="twitter:image" content={image} />
				<link rel="manifest" href="/static/favicons/site.webmanifest" />
			</Head>

			<main className="mx-auto min-h-screen w-full max-w-3xl">
				<div className="pt-10 sm:pt-20">
					<BackButton href="/experiences" name="All Experiences" />
				</div>
				{/* Title */}
				<section className="my-8 sm:my-10 flex items-center justify-between px-3 py-2 sm:px-5 sm:py-4 rounded-md bg-zinc-50 border border-zinc-300">
					<div className="">
						<div className="text-2xl sm:text-3xl break-words font-bold ">
							{project.project_name}
						</div>
						<div className="text-zinc-500 text-lg">
							{project.about_client.website}
						</div>
					</div>
					<Image
						src={project.about_client.logo_src}
						alt={project.project_name}
						height="40"
						width="40"
						className="h-12 w-12"
						blurDataURL={project.about_client.logo_src}
						// placeholder='blur'
					/>
				</section>
				<section className="grid grid-cols-1 sm:grid-cols-2 sm:gap-16 gap-10">
					{/* About The Client */}
					<section>
						<h2 className="mb-5 text-xl font-bold text-zinc-800 border-b pb-4 border-zinc-300">
							About The Client
						</h2>
						<div className="mt-5 text-zinc-800 font-medium ">Company Name</div>
						<p className="text-zinc-500">{project.about_client.company_name}</p>

						<div className="mt-5 text-zinc-800 font-medium ">Brand Name</div>
						<p className="text-zinc-500">{project.about_client.brand_name}</p>

						<div className="mt-5 text-zinc-800 font-medium ">About</div>
						<p className="text-zinc-500">{project.about_client.long_about}</p>

						<div className="mt-5 text-zinc-800 font-medium ">Phone Number</div>
						<p className="text-zinc-500">{project.about_client.phone_number}</p>

						<div className="mt-5 text-zinc-800 font-medium ">Website</div>
						<ExternalLink
							href={project.about_client.website}
							name={project.about_client.website}
						/>
						<div className="mt-5 text-zinc-800 font-medium ">
							Office Location
						</div>
						<p className="text-zinc-500">
							{project.about_client.office_location}
						</p>
					</section>

					{/* About The Project */}
					<section>
						<h2 className="mb-5 text-xl font-semibold text-zinc-800 border-b pb-4 border-zinc-300">
							About The Project
						</h2>

						<div className="mt-5 text-zinc-800 font-medium ">My Role</div>
						<ExplanationList>
							{project.about_project.my_role.map((a: string) => (
								<li className="text-zinc-500" key={a}>
									{a}
								</li>
							))}
						</ExplanationList>

						<div className="mt-5 text-zinc-800 font-medium ">
							Working Period
						</div>
						<p className="text-zinc-500">
							{project.about_project.working_period}
						</p>

						<div className="mt-5 text-zinc-800 font-medium ">
							Website Status
						</div>
						<ExplanationList>
							{project.about_project.website_status.map((a: string) => (
								<li className="text-zinc-500" key={a}>
									{a}
								</li>
							))}
						</ExplanationList>

						<div className="mt-5 text-zinc-800 font-medium ">
							Website Routes
						</div>
						<ExplanationList>
							{project.about_project.routes.map((a: string) => (
								<li className="text-zinc-500" key={a}>
									{a}
								</li>
							))}
						</ExplanationList>

						<div className="mt-5 text-zinc-800 font-medium ">
							Website Features
						</div>
						<ExplanationList>
							{project.about_project.features.map((a: string) => (
								<li className="text-zinc-500" key={a}>
									{a}
								</li>
							))}
						</ExplanationList>
					</section>
				</section>

				{/* Design */}
				<section className="mt-10">
					<h2 className="mb-5 text-xl font-semibold text-zinc-800 uppercase">
						Design
					</h2>
					<Suspense fallback={<div>Loading...</div>}>
						{project.figma !== "" ? (
							<iframe
								className="w-full h-[600px]"
								src={project.figma}
								allowFullScreen
							></iframe>
						) : (
							<p className="text-zinc-800 ">No design</p>
						)}
					</Suspense>
				</section>
			</main>
		</div>
	);
}
