"use client";

import { type SetStateAction, useState } from "react";
import { dataArray } from "./data";

export default function EditingFile() {
  const [newItem, setNewItem] = useState<string>("");

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    // this don't update the dataArray in dataArray.ts
    // dataArray is like copied for this page only
    dataArray.push({ name: newItem });
    setNewItem("");
  }
  function handleOnChange(e: { target: { value: SetStateAction<string> } }) {
    setNewItem(e.target.value);
    // dataArray.push({ name: newItem });
  }

  return (
    <div>
      <div>{dataArray.length}</div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleOnChange} type="text" value={newItem} />
        <button type="submit">Add Item</button>
      </form>
      {dataArray.map(({ name }) => (
        <div key={name}>{name}</div>
      ))}
    </div>
  );
}
