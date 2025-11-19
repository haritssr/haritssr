import Image from "next/image";
import ExternalLink from "@/components/ExternalLink";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import Section from "@/components/Section";
import SubTitle from "@/components/SubTitle";
import LenovoWallpaper from "../../../public/images/LenovoWallPaper.jpg";

export default function Next13Image() {
	return (
		<LayoutToExperiments domain="Nextjs" title="Next 13 Image Local">
			<SubTitle>
				<ExternalLink
					href="https://beta.nextjs.org/docs/optimizing/images"
					name="Nextjs 13 Image"
				/>
			</SubTitle>

			<section className="space-y-5">
				<Section name="Bare minimum" />
				<Image
					src={LenovoWallpaper}
					alt="Lenovo Wallpaper"
					placeholder="blur"
				/>

				<Section name="Rounded image" />
				<Image
					src={LenovoWallpaper}
					alt="Lenovo Wallpaper"
					placeholder="blur"
					className="rounded-md"
				/>

				<Section name="Group images" />
				<div className="grid grid-cols-2 gap-5">
					<Image
						src={LenovoWallpaper}
						alt="Lenovo Wallpaper"
						placeholder="blur"
					/>
					<Image
						src={LenovoWallpaper}
						alt="Lenovo Wallpaper"
						placeholder="blur"
					/>
					<Image
						src={LenovoWallpaper}
						alt="Lenovo Wallpaper"
						placeholder="blur"
					/>
					<Image
						src={LenovoWallpaper}
						alt="Lenovo Wallpaper"
						placeholder="blur"
					/>
				</div>

				<Section name="Text over image" />
				<div className="relative">
					<Image
						src={LenovoWallpaper}
						alt="Lenovo Wallpaper"
						placeholder="blur"
					/>
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-700/40 w-full h-full flex items-center justify-center">
						<p className="text-sm overscroll-y-auto text-ellipsis sm:text-xl text-white p-2 sm:p-20">
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione
							hic molestiae rerum dolorem et labore laborum nobis est ipsam vel
							mollitia, debitis aliquid dolore? Culpa ipsa molestiae ipsam?
							Possimus iste tempore quas illo! Placeat perferendis odit
							accusantium officiis in voluptatibus earum eos illum, ab
							laudantium vel adipisci impedit eligendi facere?
						</p>
					</div>
				</div>

				<Section name="Using fill" />
				<div className="relative h-96">
					<Image
						src={LenovoWallpaper}
						alt="Lenovo Wallpaper"
						placeholder="blur"
						fill
						className="object-cover object-center"
					/>
				</div>

				<Section name="Using sizes" />
				<div className="relative h-96">
					<Image
						src={LenovoWallpaper}
						alt="Lenovo Wallpaper"
						placeholder="blur"
						fill
						className="object-cover object-center"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
				</div>

				{/* Still confused about this part */}
				{/* https://beta.nextjs.org/docs/api-reference/components/image#style */}
				<Section name="Using style + height/width auto" />
				<div className="relative h-auto">
					<Image
						src={LenovoWallpaper}
						alt="Lenovo Wallpaper"
						placeholder="blur"
						// fill
						// height="auto"
						style={{}}
						className="object-cover object-center"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
				</div>
			</section>
		</LayoutToExperiments>
	);
}
