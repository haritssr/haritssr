import Image from "next/image";
import { AboutData } from "data/AboutData";
import Section from "@/components/Section";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import ExternalLink from "@/components/ExternalLink";
import { EducationData } from "data/EducationData";
import { ExperiencesData } from "data/ExperiencesData";
import { NonFormalEducationData } from "data/NonFormalEducationData";

export default function About() {
	return (
		<>
			<div className="max-w-3xl mx-auto">
				<div className="my-8 sm:my-20 space-y-2">
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
					<div className="">
						<div className="text-zinc-800 w-full text-center text-lg font-semibold">
							Harits Syah
						</div>
						<a
							className="block text-center text-zinc-500"
							href="https://www.twitter.com/haritssr"
							target="_blank"
							rel="noreferrer noopener"
						>
							@haritssr
						</a>
						<div className="bg-zinc-200"></div>
					</div>
				</div>
				<div className="space-y-14 mb-16">
					{AboutData.map((section) => {
						return (
							<div key={section.section}>
								<div className="text-zinc-800 text-xl font-semibold mb-1.5">
									{section.section}
								</div>
								<div className="mb-1.5 text-zinc-800">
									{section.description}
								</div>
								<ul className="block sm:list-disc list-inside divide-y divide-zinc-200/70 border-t border-b border-zinc-200/70">
									{section.points.map((point) => (
										<li key={point} className="text-zinc-500 py-1.5">
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
				<div className="space-y-5">
					<section className="-mt-[1px] p-4 border border-zinc-300 rounded-lg h-fit">
						<Section name="Core Skills" />
						<div className="font-semibold">Web Software Engineering</div>
						<p className="text-zinc-500 pb-4">
							JavaScript, TypeScript, React.js, Next.js, Web platform, PWA,
							Node.js ecosystem.
						</p>
						<div className="font-semibold">Math & Physics</div>
						<p className="text-zinc-500 pb-4">
							High school and early college level.
						</p>
						<div className="font-semibold">UI Design (with Figma)</div>
						<p className="text-zinc-500 ">
							Experiments, mockup, prototyping UI for mobile/desktop web.
						</p>
					</section>

					<section className="-mt-[1px] p-4 border border-zinc-300 rounded-lg">
						<section className="space-y-6">
							{ExperiencesData.map((project) => (
								<div key={project.project_name}>
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
											passHref
											href={`/experiences/${project.project_name
												.toLowerCase()
												.split(" ")
												.join("-")}`}
											className="flex items-center justify-end text-zinc-400 hover:underline"
										>
											<div className="text-tiny ">Details</div>
											<ChevronRightIcon className="h-4 w-4" />
										</Link>
									</div>
									<div className="pl-7 text-zinc-500 space-y-1.5 mt-1.5">
										<div>{project.about_client.company_name}</div>
										<div>{project.about_project.working_period}</div>
										<div>{project.skills}</div>
										<div>
											<ExternalLink
												href={project.about_client.website}
												name={project.about_client.website}
											/>
										</div>
									</div>
								</div>
							))}
							<Section name="Formal Working Experience" />
							<div className="">
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
									<div> June 2018 - Now (5 years)</div>
									<div>
										Teaching math and physics for junior and senior highschool
										students at home
									</div>
								</div>
							</div>
							<Section name="Formal Education" />
							{EducationData.map((school) => (
								<div key={school.school}>
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
							<Section name="Non Formal Education" />
							{NonFormalEducationData.map((school) => (
								<div key={school.school}>
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
										<ExternalLink name="Sertificate" href="www.harislab.com" />
									</div>
								</div>
							))}
						</section>
					</section>
				</div>
			</div>
		</>
	);
}
