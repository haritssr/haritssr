"use client";

import Image from "next/image";

import ExternalLink from "@/components/ExternalLink";
import Section from "@/components/Section";
import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";
import LenovoWallpaper from "@/public/images/LenovoWallPaper.jpg";

export default function NextjsImageLocalDemo() {
  return (
    <>
      <SubTitle>
        <ExternalLink
          href="https://beta.nextjs.org/docs/optimizing/images"
          name="Nextjs 13 Image"
        />
      </SubTitle>
      <SourceCodeLink />

      <div className="space-y-20">
        <Section title="Bare minimum">
          <Image
            alt="Lenovo Wallpaper"
            placeholder="blur"
            src={LenovoWallpaper}
          />
        </Section>

        <Section title="Rounded image">
          <Image
            alt="Lenovo Wallpaper"
            className="rounded-md"
            placeholder="blur"
            src={LenovoWallpaper}
          />
        </Section>

        <Section title="Group images" contentClassName="grid grid-cols-2 gap-5">
          <Image
            alt="Lenovo Wallpaper"
            placeholder="blur"
            src={LenovoWallpaper}
          />
          <Image
            alt="Lenovo Wallpaper"
            placeholder="blur"
            src={LenovoWallpaper}
          />
          <Image
            alt="Lenovo Wallpaper"
            placeholder="blur"
            src={LenovoWallpaper}
          />
          <Image
            alt="Lenovo Wallpaper"
            placeholder="blur"
            src={LenovoWallpaper}
          />
        </Section>

        <Section title="Text over image" contentClassName="relative">
          <Image
            alt="Lenovo Wallpaper"
            placeholder="blur"
            src={LenovoWallpaper}
          />
          <div className="absolute top-1/2 left-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-zinc-700/40">
            <p className="overscroll-y-auto p-2 text-sm text-ellipsis text-white sm:p-20 sm:text-xl">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione
              hic molestiae rerum dolorem et labore laborum nobis est ipsam vel
              mollitia, debitis aliquid dolore? Culpa ipsa molestiae ipsam?
              Possimus iste tempore quas illo! Placeat perferendis odit
              accusantium officiis in voluptatibus earum eos illum, ab
              laudantium vel adipisci impedit eligendi facere?
            </p>
          </div>
        </Section>

        <Section title="Using fill" contentClassName="relative h-96">
          <Image
            alt="Lenovo Wallpaper"
            className="object-cover object-center"
            fill
            placeholder="blur"
            src={LenovoWallpaper}
          />
        </Section>

        <Section title="Using sizes" contentClassName="relative h-96">
          <Image
            alt="Lenovo Wallpaper"
            className="object-cover object-center"
            fill
            placeholder="blur"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={LenovoWallpaper}
          />
        </Section>

        {/* Still confused about this part */}
        {/* https://beta.nextjs.org/docs/api-reference/components/image#style */}
        <Section
          title="Using style + height/width auto"
          contentClassName="relative h-auto"
        >
          <Image
            alt="Lenovo Wallpaper"
            className="object-cover object-center"
            placeholder="blur"
            // fill
            // height="auto"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={LenovoWallpaper}
            style={{}}
          />
        </Section>
      </div>
    </>
  );
}
