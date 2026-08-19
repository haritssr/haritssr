"use client";

import ExternalLink from "@/components/ExternalLink";
import Section from "@/components/Section";
import SubTitle from "@/components/SubTitle";

export default function DifferentCssStylingDemo() {
  return (
    <>
      <SubTitle>
        Click blue &quot;source github button&quot; to see the source code
      </SubTitle>
      <div className="mb-14">
        <ExternalLink
          href="https://github.com/haritssr/haritssr/tree/try/app/experiments/browser/different-css-styling"
          name="Source code"
        />
      </div>
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
        <div className="h-[100px] w-[100px] rounded-md bg-[#d1d1d6] p-2">
          Tailwind CSS
        </div>
        <div className="box">CSS Module</div>
      </div>
    </>
  );
}
