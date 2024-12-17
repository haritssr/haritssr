import BackButton from "@/components/BackButton";
import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import { ExperiencesData } from "data/ExperiencesData";
import Image from "next/image";
import LoadingFigma from "./LoadingFigma";
import type { Metadata } from "next";
import type { ExperiencesDataType } from "data/ExperiencesData";

export const metadata: Metadata = {
	title: "Experience",
	description: "something",
};

export async function generateStaticParams() {
	return ExperiencesData.map(({ project_name }) => {
		return {
			params: { project: project_name.toLowerCase().split(" ").join("-") },
		};
	});
}

export default function ExperiencesPage({ params }) {
	const project: ExperiencesDataType = ExperiencesData.filter(
		(p) =>
			p.project_name.toLowerCase().split(" ").join("-") === params?.project,
	)[0];

	return (
		<div className="bg-white">
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
							{project.about_client.website.slice(8)}
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
						<h2 className="mb-5 text-xl text-zinc-800 border-b pb-4 border-zinc-300 font-semibold">
							About The Client
						</h2>
						<div className="mt-5 text-zinc-800 font-medium">Company Name</div>
						<p className="text-zinc-500">{project.about_client.company_name}</p>

						<div className="mt-5 text-zinc-800 font-medium">Brand Name</div>
						<p className="text-zinc-500">{project.about_client.brand_name}</p>

						<div className="mt-5 text-zinc-800 font-medium">About</div>
						<p className="text-zinc-500">{project.about_client.long_about}</p>

						<div className="mt-5 text-zinc-800 font-medium">Phone Number</div>
						<p className="text-zinc-500">{project.about_client.phone_number}</p>

						<div className="mt-5 text-zinc-800 font-medium">Website</div>
						<ExternalLink
							href={project.about_client.website}
							name={project.about_client.website.slice(8)}
						/>
						<div className="mt-5 text-zinc-800 font-medium">
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

						<div className="mt-5 text-zinc-800 font-medium">My Role</div>
						<ExplanationList>
							{project.about_project.my_role.map((a: string) => (
								<li className="text-zinc-500" key={a}>
									{a}
								</li>
							))}
						</ExplanationList>

						<div className="mt-5 text-zinc-800 font-medium">Working Period</div>
						<p className="text-zinc-500">
							{project.about_project.working_period}
						</p>

						<div className="mt-5 text-zinc-800 font-medium">Website Status</div>
						<ExplanationList>
							{project.about_project.website_status.map((a: string) => (
								<li className="text-zinc-500" key={a}>
									{a}
								</li>
							))}
						</ExplanationList>

						<div className="mt-5 text-zinc-800 font-medium">Website Routes</div>
						<ExplanationList>
							{project.about_project.routes.map((a: string) => (
								<li className="text-zinc-500" key={a}>
									{a}
								</li>
							))}
						</ExplanationList>

						<div className="mt-5 text-zinc-800 font-medium">
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
					<h2 className="mb-5 text-xl font-semibold text-zinc-800">
						Design (at Figma)
					</h2>
					<LoadingFigma project={project} />
				</section>
			</main>
		</div>
	);
}
