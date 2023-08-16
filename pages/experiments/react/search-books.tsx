import SubTitle from "@/components/SubTitle";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import React, { useRef, useState } from "react";
import data from "../../../data/Search2Data.json";
import { Combobox } from "@headlessui/react";
import ExplanationList from "@/components/ExplanationList";

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

const Search2: React.FC<{}> = (): JSX.Element => {
  const [filteredData, setFilteredData] = useState<DataType[]>([]);
  const [wordEntered, setWordEntered] = useState<string>("");

  const inputRef: React.RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  if (typeof window !== "undefined") {
    window.addEventListener("load", () => inputRef.current?.focus());
  }

  const handleFilter = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const searchWord: string = target.value.toLowerCase();
    setWordEntered(searchWord);

    const newFilter: DataType[] = data.filter(({ title }): boolean =>
      title.toLowerCase().includes(searchWord)
    );

    if (!searchWord) return setFilteredData([]);
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
      <Combobox value={data["title"]} as="div" onChange={() => null}>
        <div className="group mx-auto flex items-center  sm:w-1/3">
          <Combobox.Input
            type="search"
            className="w-full"
            placeholder="Enter a book"
            value={wordEntered}
            onChange={handleFilter}
            ref={inputRef}
          />
        </div>

        {filteredData.length !== 0 && (
          <Combobox.Options className="mx-auto mt-2 overflow-hidden rounded border border-zinc-600 sm:w-1/3">
            <div className="max-h-52 min-h-fit space-y-1 overflow-y-auto py-2">
              {filteredData.map(({ link, title }, key) => (
                <Combobox.Option key={key} value={data}>
                  {({ active }) => (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex px-2 py-1 hover:bg-blue-500 hover:text-white ${
                        active ? "bg-blue-500 text-white" : ""
                      }`}
                    >
                      {title}
                    </a>
                  )}
                </Combobox.Option>
              ))}
            </div>
          </Combobox.Options>
        )}
      </Combobox>
    </LayoutToExperiments>
  );
};

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
