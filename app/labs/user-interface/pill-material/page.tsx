import Image from "next/image";

import "katex/dist/katex.min.css";

import LabPageHeader from "@/components/LabPageHeader";
import PageDescription from "@/components/PageDescription";
import { getLabMetadata } from "@/data/LabsData";
import katexify from "@/utils/katexify";

import PillMaterial from "./pill-material";

export const metadata = getLabMetadata("user-interface", "pill-material");

export default function PillMaterialPage() {
  const samples = [
    {
      name: "Image",
      content: (
        <Image
          alt="Street scene behind a translucent pill"
          src="/images/street.jpg"
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover"
        />
      ),
    },
    {
      name: "Regular text",
      content: (
        <p className="text-foreground/70 p-5 leading-7">
          A translucent surface lets the content beneath it remain visible.
          Notice how letters lose their sharp edges as blur increases, while
          opacity determines how much of their contrast reaches the surface.
          Scroll this panel to see the material pass over each line of text.
        </p>
      ),
    },
    {
      name: "Page title",
      content: (
        <p className="p-5 text-4xl font-semibold">Ideas become interfaces.</p>
      ),
    },
    {
      name: "Math equation",
      content: (
        <div className="overflow-x-auto p-5 text-xl">
          {katexify("e^{i\\pi}+1=0", true)}
          {katexify("\\int_0^1 x^2\\,dx=\\frac{1}{3}", true)}
        </div>
      ),
    },
    {
      name: "Lines",
      content: (
        <div className="space-y-6 p-5">
          <hr className="border-border" />
          <hr className="border-foreground/70" />
          <hr className="border-action border-t-2" />
          <hr className="border-foreground border-t-4" />
        </div>
      ),
    },
    {
      name: "Table",
      content: (
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-border border-b">
              <th className="p-3">Material</th>
              <th className="p-3">Appearance</th>
            </tr>
          </thead>
          <tbody>
            {["Clear", "Frosted", "Opaque", "Tinted"].map((name, index) => (
              <tr
                key={name}
                className="border-border odd:bg-foreground/5 border-b"
              >
                <td className="p-3">{name}</td>
                <td className="text-foreground/70 p-3">Sample {index + 1}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ),
    },
  ];

  return (
    <div>
      <LabPageHeader>
        <PageDescription>
          Explore translucent pills with adjustable opacity and blur.
        </PageDescription>
      </LabPageHeader>
      <PillMaterial samples={samples} />
    </div>
  );
}
