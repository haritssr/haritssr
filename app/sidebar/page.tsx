import { RadixUIData } from "data/ExperimentsData";

export default function Sidebar() {
	return (
		<div className="grid grid-cols-4 min-h-screen">
			<div className="col-span-1 bg-purple-400 p-5">
				<div className="text-2xl">Radix UI</div>
				<div className="">
					{RadixUIData.links.map((a) => {
						return <div key={a}>{a}</div>;
					})}
				</div>
			</div>
			<div className="col-span-3 bg-green-400"></div>
		</div>
	);
}
