import SubTitle from "@/components/SubTitle";
import ExternalLink from "@/components/ExternalLink";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import { useRouter } from "next/router";
import { type SetStateAction, useState } from "react";

export default function UseStateReactingToInput() {
	return (
		<LayoutToExperiments domain="React" title="useState Reacting To Input">
			<SubTitle>
				From{" "}
				<ExternalLink
					name="beta.reactjs.org"
					href="https://beta.reactjs.org/learn/reacting-to-input-with-state#step-5-connect-the-event-handlers-to-set-state"
				/>
			</SubTitle>
			<Example />
		</LayoutToExperiments>
	);
}

const Example = () => {
	const [answer, setAnswer] = useState("");
	//perubahan state error dari null ke string, sedangkan kita harus detect whether is null or not to display the error message from try catch async await block in handleSubmit, can i use trus/false instead of null/string ?
	const [error, setError] = useState(null);
	const [status, setStatus] = useState("typing");
	const router = useRouter();
	const Button = () => {
		return (
			<button
				type="button"
				className="cursor-pointer"
				onClick={() => {
					router.reload();
					setAnswer("");
				}}
			>
				Try again
			</button>
		);
	};
	if (status === "success") {
		return (
			<div>
				<h1>Kamu benar</h1>
				<Button />
			</div>
		);
	}

	async function handleSubmit(e) {
		e.preventDefault();
		setStatus("submitting");
		try {
			await submitForm(answer);
			setStatus("success");
		} catch (err) {
			setStatus("typing");
			setError(err.message);
		}
	}

	function handleTextareaChange(e: {
		target: { value: SetStateAction<string> };
	}) {
		setAnswer(e.target.value);
	}

	return (
		<div>
			<h2>Di kota mana ada baliho yang ada tempat air yang bisa diminum?</h2>
			{error !== null && (
				<div className="text-red-500">
					<div>{error}</div>
					<Button />
				</div>
			)}

			{error === null && (
				<form onSubmit={handleSubmit}>
					<textarea
						className="border border-zinc-400 p-2"
						value={answer}
						onChange={handleTextareaChange}
					/>
					<button
						type="submit"
						disabled={answer.length === 0 || status === "submitting"}
					>
						Submit{" "}
					</button>
					{error}
				</form>
			)}
		</div>
	);
};

function submitForm(answer: string) {
	return new Promise<void>((resolve, reject) => {
		setTimeout(() => {
			const shouldError = answer.toLowerCase() !== "lima";
			if (shouldError) {
				reject(new Error("salah"));
			} else {
				resolve();
			}
		}, 1000);
	});
}
