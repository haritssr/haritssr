import Image from "next/image";

import ExternalLink from "@/components/ExternalLink";
import LabPageHeader from "@/components/LabPageHeader";
import PageDescription from "@/components/PageDescription";
import Section from "@/components/Section";
import LenovoWallpaper from "@/public/images/LenovoWallPaper.jpg";

export default function NextjsImageLocalDemo() {
  return (
    <>
      <LabPageHeader>
        <PageDescription>
          Compare local image layouts, blur placeholders, grids, and text
          overlays with Next.js Image. See the documentation for{" "}
          <ExternalLink
            href="https://nextjs.org/docs/app/api-reference/components/image"
            name="Next.js Image documentation"
          />
        </PageDescription>
      </LabPageHeader>

      <div className="space-y-16">
        <Section title="Bare minimum">
          <Image
            alt="Lenovo Wallpaper"
            placeholder="blur"
            sizes="(min-width: 1024px) 1024px, calc(100vw - 32px)"
            src={LenovoWallpaper}
          />
        </Section>

        <Section title="Rounded image">
          <Image
            alt="Lenovo Wallpaper"
            className="rounded-md"
            placeholder="blur"
            sizes="(min-width: 1024px) 1024px, calc(100vw - 32px)"
            src={LenovoWallpaper}
          />
        </Section>

        <Section title="Group images" contentClassName="grid grid-cols-2 gap-5">
          <Image
            alt="Lenovo Wallpaper"
            placeholder="blur"
            sizes="(min-width: 1024px) 502px, calc((100vw - 52px) / 2)"
            src={LenovoWallpaper}
          />
          <Image
            alt="Lenovo Wallpaper"
            placeholder="blur"
            sizes="(min-width: 1024px) 502px, calc((100vw - 52px) / 2)"
            src={LenovoWallpaper}
          />
          <Image
            alt="Lenovo Wallpaper"
            placeholder="blur"
            sizes="(min-width: 1024px) 502px, calc((100vw - 52px) / 2)"
            src={LenovoWallpaper}
          />
          <Image
            alt="Lenovo Wallpaper"
            placeholder="blur"
            sizes="(min-width: 1024px) 502px, calc((100vw - 52px) / 2)"
            src={LenovoWallpaper}
          />
        </Section>

        <Section title="Text over image" contentClassName="relative">
          <Image
            alt="Lenovo Wallpaper"
            placeholder="blur"
            sizes="(min-width: 1024px) 1024px, calc(100vw - 32px)"
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
            sizes="(min-width: 1024px) 1024px, calc(100vw - 32px)"
            src={LenovoWallpaper}
          />
        </Section>

        <Section title="Using sizes" contentClassName="relative h-96">
          <Image
            alt="Lenovo Wallpaper"
            className="object-cover object-center"
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 1024px, calc(100vw - 32px)"
            src={LenovoWallpaper}
          />
        </Section>

        <Section
          title="Using style + height/width auto"
          contentClassName="relative h-auto"
        >
          <Image
            alt="Lenovo Wallpaper"
            className="object-cover object-center"
            placeholder="blur"
            sizes="(min-width: 1024px) 1024px, calc(100vw - 32px)"
            src={LenovoWallpaper}
            style={{ width: "100%", height: "auto" }}
          />
        </Section>
      </div>
    </>
  );
}
