"use client";

import { useEffect, useState } from "react";
import ExternalLink from "@/components/ExternalLink";
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
      <div className="mb-14">
        <ExternalLink
          href="https://github.com/haritssr/haritssr/tree/try/app/experiments/react/useeffect-title"
          name="Source code"
        />
      </div>
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
