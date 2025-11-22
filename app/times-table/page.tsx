"use client";

import { parseAsInteger, useQueryState } from "nuqs";
import type React from "react";
import { useState } from "react";
import { PageTitle } from "@/components/SubTitle";

interface MainData {
	index: string;
	value: string;
	row: number;
	col: number;
}

export default function TimesTable() {
	const [currentInput, setCurrentInput] = useState<MainData>({
		index: "NOT SELECTED",
		value: "NOT SELECTED",
		row: 1,
		col: 1,
	});

	const [search, setSearch] = useQueryState("search", { defaultValue: " " });

	return (
		<>
			<PageTitle
				title="Times Table"
				description="Self-corrected 10x10 times table with statistics."
			/>

			{/* nuqs button */}
			<IncrementButton />

			{/* input using nuqs */}
			<input
				type="search"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>

			<div className="text-red-500 my-5">
				Attention: This app is not finished yet!
			</div>

			<div className="flex space-x-2">
				{/* Row Head */}
				<section className="grid w-fit grid-cols-1 gap-2 ">
					{Array.from({ length: 11 }, (_, index) => (
						<input
							className="h-10 w-10 select-none rounded border border-zinc-400 bg-zinc-50 p-1 text-center"
							defaultValue={index}
							type="text"
							disabled
							// biome-ignore lint/suspicious/noArrayIndexKey: static array, index is stable
							key={index}
						/>
					))}
				</section>
				<div>
					{/* Col Head */}
					<section className=" mb-2 grid w-fit grid-cols-10 gap-2">
						{Array.from({ length: 10 }, (_, index) => (
							<input
								className="h-10 w-10 select-none rounded border border-zinc-400 bg-zinc-50 p-1 text-center"
								defaultValue={index + 1}
								type="text"
								disabled
								// biome-ignore lint/suspicious/noArrayIndexKey: static array, index is stable
								key={index}
							/>
						))}
					</section>
					<div className="grid w-fit grid-cols-10 gap-2">
						{Array.from({ length: 100 }, (_, index) => {
							const row = Math.floor(index / 10) + 1;
							const col = (index % 10) + 1;
							return (
								<InputElement
									index={index + 1}
									// biome-ignore lint/suspicious/noArrayIndexKey: static array, index is stable
									key={index}
									row={row}
									col={col}
									handleOnchange={setCurrentInput}
									handleOnClick={setCurrentInput}
									currentInput={currentInput}
								/>
							);
						})}
					</div>
				</div>
			</div>

			<div className="mt-10">
				<div>Cell value: {currentInput.value}</div>
				<div>Index: {currentInput.index}</div>
				<div>Row: {currentInput.row}</div>
				<div>Col: {currentInput.col}</div>
			</div>
		</>
	);
}

function InputElement({
	index,
	row,
	col,
	handleOnchange,
	handleOnClick,
	currentInput,
}: {
	index: number;
	row: number;
	col: number;
	handleOnchange: React.Dispatch<React.SetStateAction<MainData>>;
	handleOnClick: React.Dispatch<React.SetStateAction<MainData>>;
	currentInput: MainData;
}) {
	const isCurrentCell = currentInput.index === index.toString();

	const value = isCurrentCell ? currentInput.value : "";

	const numericValue =
		value && !Number.isNaN(Number(value)) ? Number(value) : null;

	const selfCorrection =
		numericValue !== null
			? row * col === numericValue
				? "bg-green-200 border-green-300"
				: "bg-red-200 border-red-300"
			: "";

	return (
		<input
			className={`h-10 w-10 rounded border border-zinc-300 p-1 text-center hover:border-blue-400 hover:bg-blue-50 ${selfCorrection}`}
			type="text"
			id={index.toString()}
			maxLength={3}
			onChange={(e) => {
				const value = e.target.value;
				handleOnchange({ index: index.toString(), value, row: row, col: col });
			}}
			onClick={(_e) =>
				handleOnClick((prev) => ({
					...prev,
					row,
					col,
				}))
			}
		/>
	);
}

function IncrementButton() {
	const [count, setCount] = useQueryState(
		"count",
		parseAsInteger.withDefault(0),
	);
	return (
		<button
			className="block my-5 border rounded-2xl corner-squircle px-4 py-1.5 hover:bg-zinc-50 active:bg-zinc-100 border-zinc-300 cursor-pointer active:border-zinc-400 active:translate-y-0.5 text-zinc-700 select-none"
			type="button"
			onClick={() => setCount((c) => c + 1)}
		>
			Count: {count}
		</button>
	);
}
