import Image from "next/image";

import LabPageHeader from "@/app/labs/_components/LabPageHeader";
import PageDescription from "@/components/PageDescription";
import hero from "@/public/images/hero.jpg";

export default function FigureDemo() {
  return (
    <>
      <LabPageHeader>
        <PageDescription>
          Image with figcaption.
          <br />
          Unfortunately the default behavior of figcaption has been overrided by
          tailwindcss preflight, so the figcaption is not italic by default, I
          need to design it.
        </PageDescription>
      </LabPageHeader>

      <div>
        <figure>
          <Image
            alt="Mountain with beautiful panoramic sky wadadaw"
            height="582"
            placeholder="blur"
            sizes="(min-width: 1024px) 1024px, calc(100vw - 32px)"
            src={hero}
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
