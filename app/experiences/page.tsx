import { ExperiencesData } from "data/ExperiencesData";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { PageTitle } from "@/components/SubTitle";
import Link from "next/link";

export default function ExperiencesPage() {
	return (
		<>
			<PageTitle title="Experiences" description="Detail informations on how projects I belong to being handled." />
			<section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
				{ExperiencesData.map(({ project_name, about_client }) => (
					<Link
						passHref
						href={`/experiences/${project_name.toLowerCase().split(" ").join("-")}`}
						key={project_name}
						className="space-y-1 p-4 hover:bg-zinc-50 border border-zinc-300 rounded-lg"
					>
						<div className="flex justify-between">
							<div className="flex items-center space-x-2">
								<div className="flex items-center space-x-2">
									<Image
										src={about_client.logo_src}
										alt={project_name}
										height={18}
										width={18}
										className="h-[18px] w-[18px]"
									/>
								</div>

								<div className="text-lg font-semibold">{project_name}</div>
							</div>
							<ChevronRightIcon width={2} className="w-5 h-5 text-zinc-500" />
						</div>
						<div className="text-zinc-800">{about_client.short_about}</div>
						{about_client.website.startsWith("https://www.") ? (
							<div className="text-zinc-400">{about_client.website.slice(12)}</div>
						) : (
							<div className="text-zinc-400">{about_client.website.slice(8)}</div>
						)}
					</Link>
				))}
			</section>
		</>
	);
}
