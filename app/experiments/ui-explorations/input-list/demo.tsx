"use client";

import { useState } from "react";

export default function InputList() {
  const [input, setInput] = useState<string>("");
  const [list, setList] = useState<{ id: number; text: string }[]>([]);

  function handleAdd() {
    if (input.trim()) {
      setList([...list, { id: Math.random(), text: input }]);
      setInput("");
    }
  }

  return (
    <div>
      <input
        className="border px-2 py-1"
        onChange={(e) => setInput(e.target.value)}
        type="text"
        value={input}
      />

      <button
        className="rounded bg-blue-500 px-2 py-1 text-white"
        onClick={handleAdd}
        type="button"
      >
        Add
      </button>

      <div>
        {list.map((x) => (
          <div key={x.id}>
            {x.id} &nbsp;
            {x.text}
          </div>
        ))}
      </div>
    </div>
  );
}
