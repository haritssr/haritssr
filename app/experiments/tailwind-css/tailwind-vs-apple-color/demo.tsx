"use client";

import Section from "@/components/Section";
import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";

interface BoxProps {
  name: string;
  color: string;
}

export default function TailwindVsAppleColorDemo() {
  return (
    <>
      <SubTitle>
        The difference between Tailwind CSS Gray colors vs Apple Gray colors
      </SubTitle>
      <SourceCodeLink />
      <div className="space-y-20">
        <section>
          <Section name="Apple" />
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-10">
            {appleColorData.map(({ name, color }) => (
              <Box color={color} key={name} name={name} />
            ))}
          </div>
        </section>

        <section>
          <Section name="zinc" />
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-10">
            <Box color="#18181b" name="900" />
            <Box color="#27272a" name="800" />
            <Box color="#3f3f46" name="700" />
            <Box color="#52525b" name="600" />
            <Box color="#71717a" name="500" />
            <Box color="#a1a1aa" name="400" />
            <Box color="#d4d4d8" name="300" />
            <Box color="#e4e4e7" name="200" />
            <Box color="#f4f4f5" name="100" />
            <Box color="#fafafa" name="50" />
          </div>
        </section>
      </div>
    </>
  );
}

function Box({ name, color }: BoxProps) {
  return (
    <div className="space-y-1">
      <div className="h-20 w-20 rounded" style={{ backgroundColor: color }} />
      <div className="text-tiny font-medium text-zinc-700">{name}</div>
      <div className="text-tiny text-zinc-400">{color}</div>
    </div>
  );
}

const appleColorData = [
  { name: "Gray1", color: "#8e8e93" },
  { name: "Gray2", color: "#aeaeb2" },
  { name: "Gray3", color: "#c7c7cc" },
  { name: "Gray4", color: "#d1d1d6" },
  { name: "Gray5", color: "#e5e5ea" },
  { name: "Gray6", color: "#f2f2f7" },
];
