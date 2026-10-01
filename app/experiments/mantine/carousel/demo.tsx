"use client";

import { Carousel } from "@mantine/carousel";
import { Image, MantineProvider } from "@mantine/core";
import { useRef } from "react";

import "@mantine/core/styles/global.css";
import "@mantine/core/styles/UnstyledButton.css";
import "@mantine/core/styles/Image.css";
import "@mantine/carousel/styles.css";

import ExternalLink from "@/components/ExternalLink";
import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";

import styles from "./demo.module.css";

export default function MantineCarouselDemo() {
  const rootRef = useRef<HTMLDivElement>(null);
  return (
    <div
      data-mantine-color-scheme="light"
      id="mantine-carousel-demo"
      ref={rootRef}
    >
      <MantineProvider
        cssVariablesSelector="#mantine-carousel-demo"
        forceColorScheme="light"
        getRootElement={() => rootRef.current ?? undefined}
        withGlobalClasses={false}
      >
        <SubTitle>
          Carousel from{" "}
          <ExternalLink
            href="https://mantine.dev/others/carousel/"
            name="Mantine"
          />
        </SubTitle>
        <SourceCodeLink />
        <Carousel
          className="mx-auto max-w-sm"
          height={200}
          orientation="vertical"
          withIndicators
        >
          {["1", "2", "3"].map((item) => (
            <Carousel.Slide
              className="flex h-20 w-20 items-center justify-center bg-blue-500 text-white"
              key={item}
            >
              {item}
            </Carousel.Slide>
          ))}
        </Carousel>
        <Demo />
      </MantineProvider>
    </div>
  );
}

const images = [
  "https://placekitten.com/g/200/300",
  "https://placekitten.com/g/250/300",
  "https://placekitten.com/g/300/300",
];

function Demo() {
  const slides = images.map((url) => (
    <Carousel.Slide className="overflow-hidden" key={url}>
      <Image alt="" src={url} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      mx="auto"
      classNames={{ control: styles.control }}
      maw={320}
      withIndicators
    >
      {slides}
    </Carousel>
  );
}
