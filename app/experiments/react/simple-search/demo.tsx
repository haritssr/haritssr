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
  const deferredFruits = fruits.filter((fruit) =>
    fruit.toLocaleLowerCase().includes(deferredQuery.toLocaleLowerCase())
  );

  // no need useCallback here
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <SubTitle>Search using useState, useMemo, useCallback</SubTitle>
      <SourceCodeLink />
      <input
        aria-label="Search fruits"
        onChange={handleChange}
        placeholder="Search"
        value={query}
      />

      {query !== deferredQuery && <p>Searching...</p>}

      {deferredFruits.map((fruit) => (
        <div key={fruit}>{fruit}</div>
      ))}
    </div>
  );
}
