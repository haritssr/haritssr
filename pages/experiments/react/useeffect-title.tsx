import { useEffect, useState } from "react";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";

export default function UseEffect() {
	const [count, setCount] = useState(0);

	useEffect(() => {
		document.title = `${
			count > 0 ? `Clicked = ${count} times` : "Please click the button"
		}`;
	});

	return (
		<LayoutToExperiments title="useEffect" domain="React">
			<SubTitle>Count = {count}</SubTitle>
			<div className="space-x-2">
				<button type="button" onClick={() => setCount(count + 1)}>
					+1
				</button>
				<button type="button" onClick={() => setCount(count - 1)}>
					-1
				</button>
				<button type="button" onClick={() => setCount(0)}>
					reset
				</button>
			</div>
		</LayoutToExperiments>
	);
}
