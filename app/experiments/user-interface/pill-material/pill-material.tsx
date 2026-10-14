"use client";

import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";

import Button from "@/components/Button";
import Section from "@/components/Section";
import Slider from "@/components/Slider";

interface Sample {
  name: string;
  content: ReactNode;
}

const presets = [
  { name: "Clear", opacity: 0, blur: 0 },
  { name: "Light glass", opacity: 30, blur: 8 },
  { name: "Frosted", opacity: 50, blur: 16 },
  { name: "Dense", opacity: 85, blur: 24 },
];

export default function PillMaterial({ samples }: { samples: Sample[] }) {
  const [opacity, setOpacity] = useState(50);
  const [blur, setBlur] = useState(16);
  const [position, setPosition] = useState(50);

  return (
    <div className="space-y-16">
      <Section id="material" title="Adjust the material">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="space-y-2">
            <p className="text-sm font-medium">{`Background opacity · ${opacity}%`}</p>
            <Slider
              label={`Background opacity: ${opacity}%`}
              value={opacity}
              onValueChange={setOpacity}
              min={0}
              max={100}
              step={1}
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">{`Backdrop blur · ${blur}px`}</p>
            <Slider
              label={`Backdrop blur: ${blur}px`}
              value={blur}
              onValueChange={setBlur}
              min={0}
              max={40}
              step={1}
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">{`Pill position · ${position}%`}</p>
            <Slider
              label={`Pill position: ${position}%`}
              value={position}
              onValueChange={setPosition}
              min={15}
              max={85}
              step={1}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <Button
              key={preset.name}
              variant="secondary"
              aria-pressed={opacity === preset.opacity && blur === preset.blur}
              onClick={() => {
                setOpacity(preset.opacity);
                setBlur(preset.blur);
              }}
            >
              {preset.name}
            </Button>
          ))}
        </div>
        <p className="text-foreground/70 max-w-3xl">
          Background opacity changes the surface color without fading the pill’s
          label. Backdrop blur softens only the content behind it. Move the pill
          or scroll inside a preview to compare edges and readability. Try the
          site’s light and dark themes too.
        </p>
      </Section>
      <Section id="page-scroll" title="Scroll beneath the pill">
        <p className="text-foreground/70 max-w-3xl">
          Scroll the page: this pill stays below the site header while each type
          of content passes behind it. The sliders above control its material.
        </p>
        <div className="relative">
          <div className="pointer-events-none sticky top-24 z-10 mx-auto -mb-10 w-fit">
            <MaterialPill opacity={opacity} blur={blur} />
          </div>
          <div className="space-y-12">
            {samples.map((sample) => (
              <div key={sample.name} className="space-y-3">
                <p className="text-foreground/70 text-sm">{sample.name}</p>
                <div className="border-border relative min-h-64 overflow-hidden rounded-xl border">
                  {sample.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
      <Section id="previews" title="Over different content">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {samples.map((sample) => (
            <figure key={sample.name} className="min-w-0 space-y-2">
              <figcaption className="text-foreground font-medium">
                {sample.name}
              </figcaption>
              <Preview opacity={opacity} blur={blur} position={position}>
                {sample.content}
              </Preview>
            </figure>
          ))}
        </div>
      </Section>
      <Section id="comparison" title="Compare combinations">
        <p className="text-foreground/70 max-w-3xl">
          Each column increases opacity; each row increases blur. All nine
          previews use the same image, so only the material changes.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[0, 12, 24].flatMap((comparisonBlur) =>
            [20, 50, 80].map((comparisonOpacity) => (
              <figure
                key={`${comparisonBlur}-${comparisonOpacity}`}
                className="min-w-0 space-y-2"
              >
                <figcaption className="text-foreground/70 text-sm">
                  {comparisonOpacity}% opacity · {comparisonBlur}px blur
                </figcaption>
                <Preview
                  opacity={comparisonOpacity}
                  blur={comparisonBlur}
                  position={50}
                >
                  {samples[0].content}
                </Preview>
              </figure>
            ))
          )}
        </div>
      </Section>
    </div>
  );
}

function Preview({
  children,
  opacity,
  blur,
  position,
}: {
  children: ReactNode;
  opacity: number;
  blur: number;
  position: number;
}) {
  const style: CSSProperties & {
    "--pill-background": string;
    "--pill-blur": string;
    "--pill-position": string;
  } = {
    "--pill-background": `color-mix(in srgb, var(--color-surface) ${opacity}%, transparent)`,
    "--pill-blur": `${blur}px`,
    "--pill-position": `${position}%`,
  };
  return (
    <div
      className="border-border bg-background relative isolate overflow-hidden rounded-xl border"
      style={style}
    >
      <section
        className="relative h-64 overflow-auto"
        aria-label="Scrollable pill preview"
      >
        <div className="pointer-events-none sticky top-(--pill-position) z-10 mx-auto -mb-10 w-fit">
          <MaterialPill opacity={opacity} blur={blur} />
        </div>
        {[0, 1, 2].map((copy) => (
          <div
            key={copy}
            className="relative min-h-64"
            aria-hidden={copy > 0 ? true : undefined}
          >
            {children}
          </div>
        ))}
      </section>
    </div>
  );
}

function MaterialPill({ opacity, blur }: { opacity: number; blur: number }) {
  const style: CSSProperties & {
    "--pill-background": string;
    "--pill-blur": string;
  } = {
    "--pill-background": `color-mix(in srgb, var(--color-surface) ${opacity}%, transparent)`,
    "--pill-blur": `${blur}px`,
  };
  return (
    <div
      style={style}
      className="border-border text-foreground shadow-floating rounded-full border bg-(--pill-background) px-4 py-1.5 font-medium whitespace-nowrap backdrop-blur-(--pill-blur)"
    >
      Pill Material
    </div>
  );
}
