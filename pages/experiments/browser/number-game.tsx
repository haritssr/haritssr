import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";

export default function NumberGame() {
	const router = useRouter();
	// the state of the game
	const [state, setState] = useState({
		num1: 1,
		num2: 2,
		response: "",
		score: 0,
		incorrect: false,
	});

	function inputKeyPress(event: { key: string }) {
		if (event.key === "Enter") {
			const answer = Number.parseInt(state.response, 10);
			if (state.num1 + state.num2 === answer) {
				setState({
					...state,
					num1: Math.ceil(Math.random() * 10),
					num2: Math.ceil(Math.random() * 10),
					score: state.score + 1,
					response: "",
					incorrect: false,
				});
			} else {
				setState({
					...state,
					score: state.score - 1,
					response: "",
					incorrect: true,
				});
			}
		}
	}

	function updateResponse(event: { target: { value: string } }) {
		setState({
			...state,
			response: event.target.value,
		});
	}

	if (state.score === 10) {
		return (
			<LayoutToExperiments title="Number Game" domain="Browser">
				<SubTitle>
					Random additional game.
					<br />
					Win if correct 10 times.
					<br />
					Every wrong answer decrease one score.
				</SubTitle>
				<div className="pt-24 text-center text-4xl font-bold text-green-500">
					You win!
				</div>

				<Link
					href="/experiments/browser/number-game"
					className="mt-5 flex justify-center"
				>
					<button
						type="button"
						onClick={() => router.reload()}
						className="border-harislab text-harislab mx-auto inline-block rounded-md border px-4 py-2 text-center hover:border-zinc-700 hover:bg-zinc-50"
					>
						Play Again
					</button>
				</Link>
			</LayoutToExperiments>
		);
	}

	return (
		<LayoutToExperiments title="Number Game" domain="Browser">
			<SubTitle>
				Random additional game.
				<br />
				Win if correct 10 times.
				<br />
				Every wrong answer decrease one score.
			</SubTitle>
			<div className="mx-auto flex max-w-xl flex-col items-center justify-center pt-24">
				<div className={state.incorrect ? "incorrect" : ""}>
					{state.num1}+{state.num2}
				</div>
				<input
					className="focus:ring-harislab rounded-md border border-gray-500 py-1 pl-2 focus:outline-hidden focus:ring-1"
					value={state.response}
					onChange={updateResponse}
					onKeyDown={inputKeyPress}
				/>
				<div>Score : {state.score}</div>
			</div>
		</LayoutToExperiments>
	);
}
