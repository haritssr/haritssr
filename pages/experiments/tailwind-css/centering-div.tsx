import type React from "react";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";

export default function CenteringDiv() {
  return (
    <LayoutToExperiments domain="Tailwind CSS" title="Centering Div">
      <SubTitle>
        Methods to centering div in Tailwind CSS or inline CSS
      </SubTitle>

      <section className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        <Wrapper
          child="h-20 w-20 "
          parent="flex  aspect-square items-center justify-center"
        >
          <div className="flex aspect-square w-full items-center justify-center bg-purple-500">
            <div className="h-20 w-20 bg-orange-400" />
          </div>
        </Wrapper>
        <Wrapper child="absolute inset-44" parent="relative aspect-square">
          <div className="relative aspect-square w-full bg-purple-500">
            <div className="absolute inset-44 bg-orange-400" />
          </div>
        </Wrapper>
      </section>
    </LayoutToExperiments>
  );
}

const Wrapper = ({
  parent,
  child,
  children,
}: {
  parent: string;
  child: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="text-zinc-500">
      <div>
        <span className="font-semibold text-zinc-800">Parent</span> : {parent}
      </div>
      <div className="mb-2">
        <span className="font-semibold text-zinc-800">Child</span> : {child}
      </div>
      {children}
    </div>
  );
};
