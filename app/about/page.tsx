import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { AboutData, ContactData } from "data/AboutData";
import { EducationData } from "data/EducationData";
import { ExperiencesData } from "data/ExperiencesData";
import { NonFormalEducationData } from "data/NonFormalEducationData";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ExternalLink from "@/components/ExternalLink";
import SecondaryButton from "@/components/SecondaryButton";

export const metadata: Metadata = {
	title: "About",
	description: "About Harits Syah",
};

export default function About() {
	return (
		<div className="max-w-3xl mx-auto">
			<section className="my-8 sm:my-20 space-y-3">
				<div className="justify-center w-full flex ">
					<section className="flex justify-center">
						<Image
							priority
							src="/images/blur.jpg"
							height="165"
							width="165"
							className="z-10 rounded-full aspect-ratio h-32 w-32"
							alt="Harits Syah"
							blurDataURL="/images/blur.jpg"
						/>
					</section>
				</div>
				<div className="text-zinc-800 w-full text-center text-lg sm:text-xl font-medium">
					Harits Syah
				</div>
			</section>

			{/* Contacts */}
			<div className="mb-14">
				<div className="text-zinc-800 text-xl font-semibold mb-2">
					{ContactData.section}
				</div>
				<div className="mb-2 text-zinc-700">{ContactData.description}</div>
				<ul className="block divide-y divide-zinc-200/70 border-t border-b border-zinc-200/70">
					{ContactData.points.map((each) => (
						<li
							key={each.link}
							className="text-zinc-500 py-2 flex space-x-3 items-center"
						>
							<Image
								alt={each.link}
								src={each.icon}
								height={20}
								width={20}
								className="h-[18px] w-[18px]"
							/>
							{each.link.startsWith("https://www.") ? (
								<a
									title={each.link}
									className="hover:underline hover:text-zinc-800"
									target="_blank"
									rel="noreferrer noopener"
									href={each.link}
								>
									{each.link.slice(12)}
								</a>
							) : each.link.startsWith("https://") ? (
								<a
									title={each.link}
									className="hover:underline hover:text-zinc-800"
									target="_blank"
									rel="noreferrer noopener"
									href={each.link}
								>
									{each.link.slice(8)}
								</a>
							) : each.link.includes("@") ? (
								<a
									className="hover:underline hover:text-zinc-800"
									href={`mailto:${each.link}`}
								>
									{each.link}
								</a>
							) : (
								each.link
							)}
						</li>
					))}
				</ul>
			</div>
			<div className="space-y-14 mb-14">
				{AboutData.map((section) => {
					return (
						<div key={section.section}>
							<div className="text-zinc-800 text-xl font-medium mb-2">
								{section.section}
							</div>
							<div className="mb-2 text-zinc-600">{section.description}</div>
							<ul className="block sm:list-disc list-inside divide-y divide-zinc-200/70 border-t border-b border-zinc-200/70">
								{section.points.map((point) => (
									<li key={point} className="text-zinc-500 py-2">
										{point.startsWith("https://www.") ? (
											<a
												title={point}
												className="hover:underline hover:text-zinc-800"
												target="_blank"
												rel="noreferrer noopener"
												href={point}
											>
												{point.slice(12)}
											</a>
										) : point.startsWith("https://") ? (
											<a
												title={point}
												className="hover:underline hover:text-zinc-800"
												target="_blank"
												rel="noreferrer noopener"
												href={point}
											>
												{point.slice(8)}
											</a>
										) : point.includes("@") ? (
											<a
												className="hover:underline hover:text-zinc-800"
												href={`mailto:${point}`}
											>
												{point}
											</a>
										) : (
											point
										)}
									</li>
								))}
							</ul>
						</div>
					);
				})}
			</div>

			<div className="space-y-6 mb-6">
				<Box title="Core Skills">
					<div className="pt-5">
						<div className="font-semibold">Web Software Engineering</div>
						<p className="text-zinc-500">
							JavaScript, TypeScript, React.js, Next.js, Web platform, PWA,
							Node.js ecosystem.
						</p>
					</div>
					<div className="pt-5">
						<div className="font-semibold">Math & Physics</div>
						<p className="text-zinc-500">
							High school and early college level.
						</p>
					</div>
					<div className="pt-5">
						<div className="font-semibold">UI Design (with Figma)</div>
						<p className="text-zinc-500">
							Experiments, mockup, prototyping UI for mobile/desktop web.
						</p>
					</div>
				</Box>

				<Box title="Experiences">
					{ExperiencesData.map((project) => (
						<div key={project.project_name} className="pt-5">
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-2">
									<Image
										src={project.about_client.logo_src}
										height={20}
										width={20}
										alt={project.about_client.company_name}
										className="aspect-auto h-5 w-5"
										blurDataURL={project.about_client.logo_src}
										// placeholder='blur'
									/>
									<div className="font-semibold text-lg">
										{project.about_project.my_role[0]}
									</div>
								</div>
								<Link
									href={`/experiences/${project.project_name
										.toLowerCase()
										.split(" ")
										.join("-")}`}
									className="flex items-center justify-end text-zinc-400 hover:underline"
								>
									<div className="text-tiny ">Details</div>
									<ChevronRightIcon className="h-4 w-4 pt-[2px] stroke-2" />
								</Link>
							</div>
							<div className="pl-7 text-zinc-500 space-y-1.5 mt-1.5">
								<div>{project.about_client.company_name}</div>
								<div>{project.about_project.working_period}</div>
								<div>{project.skills}</div>
								<div>
									<ExternalLink
										href={project.about_client.website}
										name={project.about_client.website.slice(8)}
									/>
								</div>
							</div>
						</div>
					))}
				</Box>

				<Box title="Formal Working Experiences">
					<div className="pt-5">
						<div className="flex items-center space-x-2">
							<Image
								src="/Icons/sman5.jpg"
								height={20}
								width={20}
								alt="logo"
								className="aspect-auto h-5 w-5"
								blurDataURL="/Icons/sman5.jpg"
							/>
							<div className="font-semibold text-lg">Privat Teacher</div>
						</div>
						<div className="pl-7 text-zinc-500 space-y-1.5 mt-1.5">
							<div>Lia Privat</div>
							<div> June 2018 - Now (6.5 years)</div>
							<div>
								Teaching math and physics for junior and senior highschool
								students at home
							</div>
						</div>
					</div>
				</Box>

				<Box title="Formal Education">
					{EducationData.map((school) => (
						<div key={school.school} className="pt-5">
							<div className="flex items-center space-x-2">
								<Image
									src={school.logo}
									height={20}
									width={20}
									alt={school.school}
									className="aspect-auto h-5 w-5"
									blurDataURL={school.logo}
									// placeholder='blur'
								/>
								<div className="font-semibold text-lg">{school.level}</div>
							</div>
							<div className="pl-7 text-zinc-500 space-y-1.5 mt-1.5">
								<div>{school.school}</div>
								<div>{school.period}</div>
								<div>{school.status}</div>
							</div>
						</div>
					))}
				</Box>

				<Box title="Non Formal Education">
					{NonFormalEducationData.map((school) => (
						<div key={school.school} className="pt-5">
							<div className="flex items-center space-x-2">
								<Image
									src={school.logo}
									height={20}
									width={20}
									alt={school.school}
									className="aspect-auto h-5 w-5"
									blurDataURL={school.logo}
									// placeholder='blur'
								/>
								<div className="font-semibold text-lg">{school.level}</div>
							</div>
							<div className="pl-7 text-zinc-500 space-y-1.5 mt-1.5">
								<div>{school.school}</div>
								<div>{school.period}</div>
								<div>Status: {school.status}</div>
							</div>
						</div>
					))}
				</Box>
			</div>

			<div className="flex justify-end">
				<SecondaryButton
					href="/cv-dec-2024.pdf"
					download="cv-dec-2024.pdf"
					className="px-3 py-1 text-zinc-800 font-medium hover:bg-zinc-50 active:ring-1 active:ring-offset-1 active:ring-zinc-500 select-none rounded-xl corner-squircle ring-1 ring-zinc-950/20  focus:outline-hidden focus:ring-zinc-800 shadow"
				>
					Download CV
				</SecondaryButton>
			</div>
		</div>
	);
}

function Box({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div className="border border-zinc-400/50 rounded-xl corner-squircle overflow-hidden">
			<div className="bg-zinc-50 px-3 py-2 border-b border-zinc-400/50 text-zinc-800 select-none font-medium">
				{title}
			</div>
			<div className="px-5 pb-5 space-y-5 divide-y">{children}</div>
		</div>
	);
}
