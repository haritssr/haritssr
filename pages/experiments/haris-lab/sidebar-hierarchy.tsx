import { PhysicsHierarchyData } from "data/PhysicsHierarchyData";
import Link from "next/link";
import LayoutToExperiments from "@/components/LayoutToExperiments";

export default function SidebarHierarchy() {
	return (
		<LayoutToExperiments title="Sidebar Hieararchy" domain="Haris Lab">
			<div className="space-y-5 sm:w-2/5">
				{PhysicsHierarchyData.map((domain) => (
					<details
						key={domain.domain_title}
						aria-label="domain-area"
						className="bg-red-100 p-1"
					>
						<summary
							className="cursor-pointer select-none font-semibold"
							aria-label="domain-title"
						>
							{domain.domain_title}
						</summary>
						<section
							aria-label="chapter-area"
							className="space-y-2 bg-yellow-100 p-1"
						>
							{domain.chapters.map((chapter) => (
								<details
									key={chapter.chapter_title}
									className="bg-green-100 p-1"
									aria-label="materi-area"
								>
									<summary>
										<Link
											href={chapter.chapter_title}
											aria-label="chapter-title"
											className="hover:underline"
										>
											{chapter.chapter_title}
										</Link>
									</summary>
									<section className="bg-blue-100 p-1" aria-label="materi-area">
										{chapter.material.map((materi) => (
											<Link
												key={materi}
												href={materi}
												className="ml-2 block bg-blue-100 p-1 hover:underline"
											>
												{materi}
											</Link>
										))}
									</section>
								</details>
							))}
						</section>
					</details>
				))}
			</div>
		</LayoutToExperiments>
	);
}
