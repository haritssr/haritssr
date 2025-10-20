import ExplanationList from "@/components/ExplanationList";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";
import type { ReactElement } from "react";
import { useEffect, useRef, useState } from "react";
import data from "../../../data/Search2Data.json";

interface DataType {
	author: string;
	country: string;
	imageLink: string;
	language: string;
	link: string;
	pages: number;
	title: string;
	year: number;
}

function Search2(): ReactElement {
	const [filteredData, setFilteredData] = useState<DataType[]>([]);
	const [wordEntered, setWordEntered] = useState<string>("");

	const inputRef = useRef<HTMLInputElement | null>(null);
	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const handleFilter = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const searchWord = event.target.value.toLowerCase();
		setWordEntered(searchWord);

		const newFilter: DataType[] = data.filter(({ title }): boolean =>
			title.toLowerCase().includes(searchWord),
		);

		if (!searchWord) {
			setFilteredData([]);
			return;
		}
		setFilteredData(newFilter);
	};

	// const clearInput = (): void => {
	//   setFilteredData([]);
	//   setWordEntered('');
	//   inputRef.current?.focus();
	// };

	// const parsedData = JSON.parse(data);
	return (
		<LayoutToExperiments title="Search Books" domain="React">
			<SubTitle>
				<ExplanationList>
					<li>Include : case sensitive (lowercase).</li>
					<li>Not include: space sensitive.</li>
				</ExplanationList>
			</SubTitle>
			<div className="group mx-auto flex items-center sm:w-1/3">
				<input
					type="search"
					className="w-full"
					placeholder="Enter a book"
					value={wordEntered}
					onChange={handleFilter}
					ref={inputRef}
				/>
			</div>

			{filteredData.length !== 0 && (
				<div className="mx-auto mt-2 max-h-52 min-h-fit overflow-hidden rounded border border-zinc-600 sm:w-1/3">
					<ul className="space-y-1 overflow-y-auto py-2">
						{filteredData.map(({ link, title }) => (
							<li key={title}>
								<a
									href={link}
									target="_blank"
									rel="noopener noreferrer"
									className="flex px-2 py-1 hover:bg-[#2563eb]/90 hover:text-white"
								>
									{title}
								</a>
							</li>
						))}
					</ul>
				</div>
			)}
		</LayoutToExperiments>
	);
}

export default Search2;

// MANUAL CLOSE ICON
// Rendered via 'wordEntered' state
// Closed via clearInput()
// Placed after input field
// {
//   wordEntered.length !== 0 && (
//     <CloseIcon/>
//   );
// }
