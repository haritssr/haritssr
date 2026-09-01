"use client";

import { useDeferredValue, useState } from "react";

import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";

const fruits = [
  "Apple",
  "Banana",
  "Orange",
  "Grape",
  "Pineapple",
  "Mango",
  "Watermelon",
  "Strawberry",
  "Blueberry",
  "Kiwi",
];

export default function SimpleSearch() {
  const [query, setQuery] = useState("");

  const deferredQuery = useDeferredValue(query);

  // no need useMemo here
  const defferedFilter = fruits.filter((fruit) =>
    fruit.toLocaleLowerCase().includes(deferredQuery.toLocaleLowerCase())
  );

  // no need useCallback here
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <SubTitle>Search using useState, useMemo, useCallback</SubTitle>
      <div className="mb-14">
        <SourceCodeLink />
      </div>
      <input onChange={handleChange} placeholder="Search" value={query} />

      {query !== deferredQuery && <p>Searching...</p>}

      {defferedFilter.map((f) => (
        <div key={f}>{f}</div>
      ))}
    </div>
  );
}
