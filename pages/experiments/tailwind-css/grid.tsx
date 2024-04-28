import SubTitle from "@/components/SubTitle";
import ExternalLink from "@/components/ExternalLink";
import LayoutToExperiments from "@/components/LayoutToExperiments";

export default function Grid() {
	return (
		<LayoutToExperiments title="Grid" domain="Tailwind CSS">
			<SubTitle>
				Responsive Grid Layout with Tailwind CSS.
				<ExternalLink
					name="Source"
					href="https://www.youtube.com/watch?v=WJDw1J7FZnE"
				/>
			</SubTitle>
			<div className="grid min-h-screen place-items-center ">
				<div className="grid max-w-5xl gap-4 xs:grid-cols-2 md:grid-cols-4 ">
					<h1 className="text-4xl font-extrabold xs:col-span-2 xs:grid xs:grid-cols-2 xs:gap-4 md:col-span-3 md:grid-cols-3 md:text-5xl ">
						<span className="bg-yellow-300 md:col-span-2">
							Grid layout with Tailwind CSS
						</span>
					</h1>
					<p className="xs:col-start-2 xs:row-start-2 xs:self-center md:col-span-2 md:col-start-1 md:pr-12 md:text-lg">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
						adipisci inventore explicabo quidem sunt molestiae quae quia
						blanditiis dolorum, obcaecati enim aut a .
					</p>
					<div className="xs:square h-16 bg-blue-500 xs:h-auto" />
					<div className="xs:square h-16 bg-blue-500 xs:h-auto" />
					<div className="xs:square h-16 bg-pink-500 xs:h-auto" />
					<div className="xs:square h-16 bg-blue-500 xs:h-auto md:col-start-2" />
					<div className="xs:square h-16 bg-pink-500 xs:h-auto" />
					<div className="xs:square h-16 bg-blue-500 xs:h-auto" />
					<div className="xs:square h-16 bg-blue-500 xs:h-auto" />
					<div className="xs:square h-16 bg-pink-500 xs:h-auto" />
					<p className="self-center md:col-span-2 md:px-4 md:text-center md:text-lg">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
						perferendis fugit at debitis.
					</p>
				</div>
			</div>
		</LayoutToExperiments>
	);
}
