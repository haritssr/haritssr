"use client";

import { useRef } from "react";

import ExperimentPageHeader from "@/components/ExperimentPageHeader";
import PageDescription from "@/components/PageDescription";

export default function TextEditingDemo() {
  const elementSelected = useRef(null);

  // useEffect(() => console.log(elementSelected), []);

  return (
    <>
      <ExperimentPageHeader>
        <PageDescription>HTML built-in text editing tag</PageDescription>
      </ExperimentPageHeader>

      <div className="flex flex-col space-y-2" ref={elementSelected}>
        <del>del</del>
        <s>s</s>
        <mark>mark</mark>
        <blockquote className="border-l-2 border-zinc-400 bg-zinc-100 py-1 pl-3 text-zinc-600">
          blockquote blockquote blockquote blockquote blockquote blockquote
          blockquote blockquote blockquote blockquote blockquote blockquote
          blockquote blockquote blockquote blockquote blockquote blockquote
          blockquote blockquote blockquote blockquote blockquote blockquote
          blockquote blockquote blockquote blockquote blockquote blockquote
          blockquote blockquote
        </blockquote>
        <strong>strong</strong>
        <b>b</b>
        <div>
          X<sup>2</sup>
        </div>
        <div>
          X<sub>2</sub>
        </div>
        <u>underline</u>
        <em>em</em>
      </div>
    </>
  );
}
