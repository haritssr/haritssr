"use client";

import { useState } from "react";

interface MainData {
  index: string;
  value: string;
  row: number;
  col: number;
}

export default function TimesTableComponent() {
  const [currentInput, setCurrentInput] = useState<MainData>({
    index: "NOT SELECTED",
    value: "NOT SELECTED",
    row: 1,
    col: 1,
  });

  return (
    <>
      <div className="my-5 text-red-500">
        Attention: This app is not finished yet!
      </div>

      <div className="flex space-x-2">
        {/* Row Head */}
        <section className="grid w-fit grid-cols-1 gap-2">
          {Array.from({ length: 11 }, (_, index) => {
            const row = index + 1;
            return (
              <input
                className="h-10 w-10 select-none rounded border border-zinc-400 bg-zinc-50 p-1 text-center"
                defaultValue={index}
                disabled
                key={row}
                type="text"
              />
            );
          })}
        </section>
        <div>
          {/* Col Head */}
          <section className="mb-2 grid w-fit grid-cols-10 gap-2">
            {Array.from({ length: 10 }, (_, index) => {
              const col = index + 1;
              return (
                <input
                  className="h-10 w-10 select-none rounded border border-zinc-400 bg-zinc-50 p-1 text-center"
                  defaultValue={col}
                  disabled
                  key={`col-${col}`}
                  type="text"
                />
              );
            })}
          </section>
          <div className="grid w-fit grid-cols-10 gap-2">
            {Array.from({ length: 100 }, (_, index) => {
              const row = Math.floor(index / 10) + 1;
              const col = (index % 10) + 1;
              return (
                <InputElement
                  col={col}
                  currentInput={currentInput}
                  handleOnClick={setCurrentInput}
                  handleOnchange={setCurrentInput}
                  index={index + 1}
                  key={"$row-$col"}
                  row={row}
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

  function getSelfCorrection(value: string | null, row: number, col: number) {
    if (value === "") {
      return "";
    }
    const numeric = Number(value);
    if (Number.isNaN(numeric)) {
      return "";
    }
    return row * col === numeric
      ? "bg-green-200 border-green-300"
      : "bg-red-200 border-red-300";
  }

  return (
    <input
      className={`h-10 w-10 rounded border border-zinc-300 p-1 text-center hover:border-blue-400 hover:bg-blue-50 ${getSelfCorrection(value, row, col)}`}
      id={index.toString()}
      maxLength={3}
      onChange={(e) => {
        const value = e.target.value;
        handleOnchange({ index: index.toString(), value, row, col });
      }}
      onClick={(_e) =>
        handleOnClick((prev) => ({
          ...prev,
          row,
          col,
        }))
      }
      type="text"
    />
  );
}
