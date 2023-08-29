import Section from "@/components/Section";
import SubTitle from "@/components/SubTitle";

import LayoutToExperiments from "@/components/LayoutToExperiments";

export default function TailwindColorVSAppleColor() {
	return (
		<LayoutToExperiments
			title="Tailwind CSS vs Apple Gray Color"
			domain="Tailwind CSS"
		>
			<SubTitle>
				Methods to centering div in Tailwind CSS or inline CSS
			</SubTitle>
			<Section name="Apple" />
			<div className="mb-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-10">
				{appleColorData.map(({ name, color }) => (
					<Box key={name} name={name} color={color} />
				))}
			</div>
			<Section name="zinc" />
			<div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-10">
				<Box name="900" color="#18181b" />
				<Box name="800" color="#27272a" />
				<Box name="700" color="#3f3f46" />
				<Box name="600" color="#52525b" />
				<Box name="500" color="#71717a" />
				<Box name="400" color="#a1a1aa" />
				<Box name="300" color="#d4d4d8" />
				<Box name="200" color="#e4e4e7" />
				<Box name="100" color="#f4f4f5" />
				<Box name="50" color="#fafafa" />
			</div>
		</LayoutToExperiments>
	);
}

function Box({ name, color }) {
	return (
		<div className="space-y-1">
			<div style={{ backgroundColor: color }} className="h-20 w-20 rounded" />
			<div className="text-tiny font-medium text-zinc-700">{name}</div>
			<div className="text-tiny text-zinc-400">{color}</div>
		</div>
	);
}

const appleColorData = [
	{ name: "Gray1", color: "#8e8e93" },
	{ name: "Gray2", color: "#aeaeb2" },
	{ name: "Gray3", color: "#c7c7cc" },
	{ name: "Gray4", color: "#d1d1d6" },
	{ name: "Gray5", color: "#e5e5ea" },
	{ name: "Gray6", color: "#f2f2f7" },
];
