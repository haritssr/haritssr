import LayoutToExperiments from "@/components/LayoutToExperiments";
import { PhysicsHiearchyData } from "data/PhysicsHiearchyData";
import Link from "next/link";

export default function SidebarHierarchy() {
	return (
		<LayoutToExperiments title="Sidebar Hieararchy" domain="Haris Lab">
			<div className="space-y-5 sm:w-2/5">
				{PhysicsHiearchyData.map((domain) => (
					<details key={domain.domain} aria-label="domain-area" className="bg-red-100 p-1 ">
						<summary className="font-semibold cursor-pointer select-none" aria-label="domain-title">
							{domain.domain}
						</summary>
						<div aria-label="chapter-area" className="bg-yellow-100 p-1 space-y-2">
							{domain.chapters.map((chapter) => (
								<details key={chapter.title} className="bg-green-100 p-1" aria-label="materi-area">
									<summary>
										<Link href={chapter.title} aria-label="chapter-title" className="hover:underline">
											{chapter.title}
										</Link>
									</summary>
									<div className="bg-blue-100 p-1" aria-label="materi-area">
										{chapter.material.map((materi) => (
											<Link key={materi} href={materi} className="bg-blue-100 ml-2 p-1 block hover:underline">
												{materi}
											</Link>
										))}
									</div>
								</details>
							))}
						</div>
					</details>
				))}
			</div>
		</LayoutToExperiments>
	);
}
