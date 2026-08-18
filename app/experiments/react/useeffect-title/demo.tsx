"use client";

import { useEffect, useState } from "react";
import SubTitle from "@/components/SubTitle";

export default function ReactUseEffectTitleDemo() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `${
      count > 0 ? `Clicked = ${count} times` : "Please click the button"
    }`;
  });

  return (
    <>
      <SubTitle>Count = {count}</SubTitle>
      <div className="space-x-2">
        <button onClick={() => setCount(count + 1)} type="button">
          +1
        </button>
        <button onClick={() => setCount(count - 1)} type="button">
          -1
        </button>
        <button onClick={() => setCount(0)} type="button">
          reset
        </button>
      </div>
    </>
  );
}
