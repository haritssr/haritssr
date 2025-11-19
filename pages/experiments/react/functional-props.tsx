import { useState } from "react";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";

export default function FunctionalProps() {
	return (
		<LayoutToExperiments domain="React" title="Functional Props">
			<SubTitle>
				Functional Props - TypeScript for beginner to master - Jack Herrington
			</SubTitle>
			<TextWithNumber
				header={(num: number) => <span>The header is {num}</span>}
			>
				{(num: number) => <div>The number is {num}</div>}
			</TextWithNumber>

			{/* Why we can change the items array can be other than string? */}
			<List
				className="mt-10"
				items={["Jack", "Mo", "Ji"]}
				render={(item: string) => <div>{item}</div>}
			/>
		</LayoutToExperiments>
	);
}

function TextWithNumber({
	header,
	children,
}: {
	header: (num: number) => React.ReactNode;
	children: (num: number) => React.ReactNode;
}) {
	const [state, setState] = useState<number>(1);
	return (
		<div>
			<div className="text-xl font-semibold">{header(state)}</div>
			<div>{children(state)}</div>
			<button
				type="button"
				className="rounded-md bg-blue-500 px-3 py-0.5 text-white"
				onClick={() => setState(state + 1)}
			>
				Add
			</button>
		</div>
	);
}

function List<ListItem>({
	className,
	items,
	render,
}: {
	className: string;
	items: ListItem[];
	render: (item: ListItem) => React.ReactNode;
}) {
	return (
		<ul className={className}>
			{items.map((item, index) => (
				<li key={`${index}${item}`}>{render(item)}</li>
			))}
		</ul>
	);
}
