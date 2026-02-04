"use client";

import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import ExternalLink from "@/components/ExternalLink";
import SubTitle from "@/components/SubTitle";

export default function MantineCarouselDemo() {
  return (
    <>
      <SubTitle>
        Carousel from{" "}
        <ExternalLink
          href="https://mantine.dev/others/carousel/"
          name="Mantine"
        />
      </SubTitle>
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
    </>
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
      <Image alt="yes" src={url} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      mx="auto"
      styles={{
        control: {
          "&[data-inactive]": {
            opacity: 0,
            cursor: "default",
          },
        },
      }}
      sx={{ maxWidth: 320 }}
      withIndicators
    >
      {slides}
    </Carousel>
  );
}
