"use client";

import type { ReactElement } from "react";
import { useEffect, useRef, useState } from "react";
import ExplanationList from "@/components/ExplanationList";
import SubTitle from "@/components/SubTitle";
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

export default function ReactSearchBooksDemo(): ReactElement {
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
      title.toLowerCase().includes(searchWord)
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
    <>
      <SubTitle>
        <ExplanationList>
          <li>Include : case sensitive (lowercase).</li>
          <li>Not include: space sensitive.</li>
        </ExplanationList>
      </SubTitle>
      <div className="group mx-auto flex items-center sm:w-1/3">
        <input
          className="w-full"
          onChange={handleFilter}
          placeholder="Enter a book"
          ref={inputRef}
          type="search"
          value={wordEntered}
        />
      </div>

      {filteredData.length !== 0 && (
        <div className="mx-auto mt-2 max-h-52 min-h-fit overflow-hidden rounded border border-zinc-600 sm:w-1/3">
          <ul className="space-y-1 overflow-y-auto py-2">
            {filteredData.map(({ link, title }) => (
              <li key={title}>
                <a
                  className="flex px-2 py-1 hover:bg-[#2563eb]/90 hover:text-white"
                  href={link}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

// MANUAL CLOSE ICON
// Rendered via 'wordEntered' state
// Closed via clearInput()
// Placed after input field
// {
//   wordEntered.length !== 0 && (
//     <CloseIcon/>
//   );
// }
