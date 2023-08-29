import Section from "@/components/Section";
import ExternalLink from "@/components/ExternalLink";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";

export default function AppleNavbar() {
	return (
		<LayoutToExperiments title="Apple NavBar" domain="Tailwind CSS">
			<SubTitle>
				<ExternalLink name="Apple.com" href="https://www.apple.com" />
				sticky navigation bar
			</SubTitle>
			<div>
				<div className="border border-zinc-300">
					<div className="sticky top-[88px] flex items-center justify-between border-b border-b-gray-300 bg-white/70 p-2 py-2 backdrop-blur-md">
						<div className="cursor-pointer text-xl font-semibold">
							iPhone 13 Pro
						</div>
						<div className=" flex items-center justify-between space-x-5 text-[12px] text-gray-900">
							<div className="hidden space-x-5 sm:flex">
								<div className="cursor-pointer hover:text-blue-500">
									Overview
								</div>
								<div className="cursor-pointer hover:text-blue-500">
									Switching to iPhone
								</div>
								<div className="cursor-pointer hover:text-blue-500">
									Tech Specs
								</div>
							</div>
							<div className="px-s cursor-pointer rounded-full bg-blue-500 px-3 py-1 text-[12px] text-white">
								Buy
							</div>
						</div>
					</div>
					<div className="my-2" />
					<div className="p-4">
						<Section name="Lorem ipsum" />
						<p className="mb-5">
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur
							nesciunt laudantium dolore consectetur animi voluptates fugit
							omnis nobis officiis assumenda praesentium accusantium vel,
							mollitia possimus repudiandae temporibus ea excepturi? Iste
							debitis ipsum corporis, sint quas nihil, reprehenderit ut a
							consectetur in voluptas sapiente asperiores impedit molestias
							voluptates provident unde corrupti inventore veniam animi officia
							perspiciatis. Deleniti, placeat facere. Voluptates ad repudiandae
							eius! Voluptatum quia numquam quasi inventore aliquid dolorum
							libero sint non corrupti et, omnis eveniet cum perferendis, magnam
							ad iusto quis nesciunt, illum asperiores quas ut distinctio?
							Voluptatem necessitatibus expedita, asperiores possimus
							consectetur at aliquam sequi nesciunt consequatur accusamus!
						</p>
						<Section name="Lorem ipsum" />
						<p>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur
							nesciunt laudantium dolore consectetur animi voluptates fugit
							omnis nobis officiis assumenda praesentium accusantium vel,
							mollitia possimus repudiandae temporibus ea excepturi? Iste
							debitis ipsum corporis, sint quas nihil, reprehenderit ut a
							consectetur in voluptas sapiente asperiores impedit molestias
							voluptates provident unde corrupti inventore veniam animi officia
							perspiciatis. Deleniti, placeat facere. Voluptates ad repudiandae
							eius! Voluptatum quia numquam quasi inventore aliquid dolorum
							libero sint non corrupti et, omnis eveniet cum perferendis, magnam
							ad iusto quis nesciunt, illum asperiores quas ut distinctio?
							Voluptatem necessitatibus expedita, asperiores possimus
							consectetur at aliquam sequi nesciunt consequatur accusamus!
						</p>
					</div>
				</div>
			</div>
		</LayoutToExperiments>
	);
}
