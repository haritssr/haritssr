"use client";

import { useEffect, useState } from "react";

import LabPageHeader from "@/app/labs/_components/LabPageHeader";
import PageDescription from "@/components/PageDescription";

export default function ReactUseEffectTitleDemo() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title =
      count > 0 ? `Clicked = ${count} times` : "Please click the button";
  });

  return (
    <>
      <LabPageHeader>
        <PageDescription>Count = {count}</PageDescription>
      </LabPageHeader>

      <div className="space-x-2">
        <button
          onClick={() => {
            setCount(count + 1);
          }}
          type="button"
        >
          +1
        </button>
        <button
          onClick={() => {
            setCount(count - 1);
          }}
          type="button"
        >
          -1
        </button>
        <button
          onClick={() => {
            setCount(0);
          }}
          type="button"
        >
          reset
        </button>
      </div>
    </>
  );
}
