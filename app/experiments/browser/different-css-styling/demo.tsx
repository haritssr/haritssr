"use client";

import Section from "@/components/Section";
import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";

export default function DifferentCssStylingDemo() {
  return (
    <>
      <SubTitle>
        Click blue &quot;source github button&quot; to see the source code
      </SubTitle>
      <SourceCodeLink />
      <Section name="Coloring, Box size, Rounded corner, Padding" />
      <div className="flex space-x-5">
        <div
          style={{
            backgroundColor: "#d1d1d6",
            height: "100px",
            width: "100px",
            borderRadius: "6px",
            padding: "8px",
          }}
        >
          Inline CSS
        </div>
        <div className="h-25 w-25 rounded-md bg-[#d1d1d6] p-2">
          Tailwind CSS
        </div>
        <div className="box">CSS Module</div>
      </div>
    </>
  );
}
