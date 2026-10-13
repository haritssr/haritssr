"use client";

import Image from "next/image";

import ExperimentPageHeader from "@/components/ExperimentPageHeader";
import PageDescription from "@/components/PageDescription";

export default function FigureDemo() {
  return (
    <>
      <ExperimentPageHeader>
        <PageDescription>
          Image with figcaption.
          <br />
          Unfortunately the default behavior of figcaption has been overrided by
          tailwindcss preflight, so the figcaption is not italic by default, I
          need to design it.
        </PageDescription>
      </ExperimentPageHeader>

      <div>
        <figure>
          <Image
            alt="Mountain with beautiful panoramic sky wadadaw"
            blurDataURL="/images/hero.jpg"
            height="582"
            placeholder="blur"
            src="/images/hero.jpg"
            width="1007"
          />
          <figcaption className="text-center text-zinc-500 italic">
            Image 1. Mountain with beautiful panoramic sky wadadaw
          </figcaption>
        </figure>
      </div>
    </>
  );
}
