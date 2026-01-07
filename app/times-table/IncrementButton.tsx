"use client";
import { parseAsInteger, useQueryState } from "nuqs";

export function IncrementButton() {
	const [count, setCount] = useQueryState(
		"count",
		parseAsInteger.withDefault(0),
	);

	const [search, setSearch] = useQueryState("search", { defaultValue: " " });
	return (
		<>
			<button
				className="corner-squircle my-5 block cursor-pointer select-none rounded-2xl border border-zinc-300 px-4 py-1.5 text-zinc-700 hover:bg-zinc-50 active:translate-y-0.5 active:border-zinc-400 active:bg-zinc-100"
				type="button"
				onClick={() => setCount((c) => c + 1)}
			>
				Count: {count}
			</button>
			<input
				type="search"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
		</>
	);
}
