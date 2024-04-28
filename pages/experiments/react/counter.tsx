import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";
import { useCallback, useEffect, useState } from "react";

function formatTime(second: number) {
	const minute = Math.floor(second / 60);

	return `${`${minute}`.padStart(2, "0")}:${`${second % 60}`.padStart(2, "0")}`;
}

export default function Counter() {
	const [second, setSecond] = useState(0);
	const [play, setPlay] = useState(false);
	useEffect(() => {
		if (!play) return;
		const interval = setInterval(() => {
			setSecond((prev) => prev + 1);
		}, 100);
		return () => {
			clearInterval(interval);
		};
	}, [play]);

	const onToggle = useCallback(() => {
		setPlay((play) => !play);
	}, []);
	const onReset = useCallback(() => {
		setSecond(0);
		setPlay(false);
	}, []);

	return (
		<LayoutToExperiments domain="React" title="Counter">
			<SubTitle>Counter</SubTitle>
			<div>{formatTime(second)}</div>
			<div>{second}</div>
			<div
				onClick={onToggle}
				onKeyDown={onToggle}
				className="cursor-pointer select-none hover:text-action"
			>
				{play
					? "Stop"
					: play === false && second > 0
					  ? "Continue"
					  : play === false && second === 0 && "Start"}
			</div>
			<div
				onClick={onReset}
				onKeyDown={onReset}
				className="cursor-pointer select-none hover:text-action"
			>
				Reset
			</div>
		</LayoutToExperiments>
	);
}
