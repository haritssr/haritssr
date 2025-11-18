import { useState } from "react";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";

export default function FontMixerP() {
	return (
		<LayoutToExperiments title="Font Mixer" domain="React">
			<SubTitle>Font Mixer</SubTitle>
			<FontMixer fonts={["Arial", "Arial"]}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
				convallis mauris dui, non placerat urna fringilla at. Suspendisse a orci
				quis arcu tristique sagittis at sed leo. Nam quis neque dapibus, semper
				nisl non, lacinia ligula. Duis viverra a nisl ut consectetur. Ut
				elementum fringilla odio viverra egestas. Morbi aliquet lorem lorem, in
				suscipit nibh tempus quis. Mauris gravida dapibus odio, vitae interdum
				lectus pretium ut. Vivamus tincidunt laoreet pellentesque. Praesent
				tincidunt elementum tempus.
			</FontMixer>
		</LayoutToExperiments>
	);
}

interface FontMixerProps {
	fonts: [string, string];
	children: string;
}

const FontMixer: React.FC<FontMixerProps> = ({ fonts: [a, b], children }) => {
	// 0 < fader <= 25
	const [fader, setFader] = useState(0);

	return (
		<section className="flex flex-col items-center gap-6">
			<section className="relative flex h-[320px] w-full gap-6  border border-gray-200 bg-red-100/50 leading-6">
				<article
					className="absolute h-[320px] overflow-hidden overflow-y-auto text-ellipsis bg-yellow-100/50 p-4 text-action"
					style={{
						fontFamily: a,
						width: "50%",
						left: `${fader}%`,
						filter: `grayscale(${1 - fader / 25})`,
					}}
				>
					{children}
				</article>
				<article
					className="absolute h-[320px] overflow-hidden overflow-y-auto text-ellipsis bg-green-100/50 p-4 text-pink-500"
					style={{
						fontFamily: b,
						width: "50%",
						right: `${fader}%`,
						filter: `grayscale(${1 - fader / 25})`,
					}}
				>
					{children}
				</article>
			</section>
			<input
				value={fader}
				min={0}
				max={25}
				onChange={(e) => setFader(Number(e.target.value))}
				className="w-[50%]"
				type="range"
			/>
			<button type="button" onClick={(e) => setFader(0)}>
				Reset
			</button>
		</section>
	);
};
