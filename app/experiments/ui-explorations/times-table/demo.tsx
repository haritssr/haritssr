"use client";

import { parseAsInteger, useQueryState } from "nuqs";
import { Suspense, useState } from "react";

import SourceCodeLink from "@/components/SourceCodeLink";
// import { IncrementButton } from "../../../app/times-table/IncrementButton";
// import TimesTableComponent from "../../../app/times-table/TimesTable";

export default function TimesTableDemo() {
  return (
    <>
      <SourceCodeLink />
      <Suspense fallback="..loading">
        <IncrementButton />
        <TimesTableComponent />
      </Suspense>
    </>
  );
}

function IncrementButton() {
  const [count, setCount] = useQueryState(
    "count",
    parseAsInteger.withDefault(0)
  );

  const [search, setSearch] = useQueryState("search", { defaultValue: " " });
  return (
    <>
      <button
        className="corner-squircle my-5 block cursor-pointer rounded-2xl border border-zinc-300 px-4 py-1.5 text-zinc-700 select-none hover:bg-zinc-50 active:translate-y-0.5 active:border-zinc-400 active:bg-zinc-100"
        onClick={async () => await setCount((c) => c + 1)}
        type="button"
      >
        Count: {count}
      </button>
      <input
        aria-label="Search"
        onChange={async (e) => await setSearch(e.target.value)}
        type="search"
        value={search}
      />
    </>
  );
}

interface MainData {
  col: number;
  index: string;
  row: number;
  value: string;
}

function TimesTableComponent() {
  const [currentInput, setCurrentInput] = useState<MainData>({
    col: 1,
    index: "NOT SELECTED",
    row: 1,
    value: "NOT SELECTED",
  });

  return (
    <>
      <div className="my-5 text-red-500">
        Attention: This app is not finished yet!
      </div>

      <div className="scrollbar-subtle overflow-x-auto">
        <table className="border-separate border-spacing-2">
          <caption className="sr-only">
            Multiplication practice: enter the product of each row and column
          </caption>
          <thead>
            <tr>
              <th scope="col">
                <span aria-hidden="true">×</span>
                <span className="sr-only">Row multiplier</span>
              </th>
              {Array.from({ length: 10 }, (_, index) => (
                <th
                  className="h-10 w-10 rounded border border-zinc-400 bg-zinc-50 p-1 text-center font-normal"
                  key={index + 1}
                  scope="col"
                >
                  {index + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }, (_, rowIndex) => (
              <tr key={rowIndex + 1}>
                <th
                  className="h-10 w-10 rounded border border-zinc-400 bg-zinc-50 p-1 text-center font-normal"
                  scope="row"
                >
                  {rowIndex + 1}
                </th>
                {Array.from({ length: 10 }, (_, colIndex) => (
                  <td key={colIndex + 1}>
                    <InputElement
                      col={colIndex + 1}
                      currentInput={currentInput}
                      handleOnClick={setCurrentInput}
                      handleOnchange={setCurrentInput}
                      index={rowIndex * 10 + colIndex + 1}
                      row={rowIndex + 1}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
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

  const currentValue = isCurrentCell ? currentInput.value : "";

  function getSelfCorrection(
    inputValue: string | null,
    inputRow: number,
    inputCol: number
  ) {
    if (inputValue === "") {
      return "";
    }
    const numeric = Number(inputValue);
    if (Number.isNaN(numeric)) {
      return "";
    }
    return inputRow * inputCol === numeric
      ? "bg-green-200 border-green-300"
      : "bg-red-200 border-red-300";
  }

  return (
    <input
      aria-label={`Row ${row}, column ${col}: ${row} times ${col}`}
      className={`h-10 w-10 rounded border border-zinc-300 p-1 text-center hover:border-blue-400 hover:bg-blue-50 ${getSelfCorrection(currentValue, row, col)}`}
      id={index.toString()}
      maxLength={3}
      onChange={(e) => {
        const { value } = e.target;
        handleOnchange({ col, index: index.toString(), row, value });
      }}
      onClick={(_e) => {
        handleOnClick((prev) => ({
          ...prev,
          col,
          row,
        }));
      }}
      type="text"
    />
  );
}
