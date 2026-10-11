"use client";

import { useState } from "react";

import Button from "@/components/Button";
import Section from "@/components/Section";
import Slider from "@/components/Slider";
import katexify from "@/utils/katexify";

import UnitCircleDiagram from "./unit-circle-diagram";

const landmarks = [
  {
    degrees: 0,
    angle: "0",
    value: "1",
    real: 1,
    imaginary: 0,
    description: "Start on the positive real axis.",
  },
  {
    degrees: 90,
    angle: String.raw`\frac{\pi}{2}`,
    value: "i",
    real: 0,
    imaginary: 1,
    description: "A quarter-turn reaches the positive imaginary axis.",
  },
  {
    degrees: 180,
    angle: String.raw`\pi`,
    value: "-1",
    real: -1,
    imaginary: 0,
    description:
      "A half-turn reaches the negative real axis: Euler’s identity.",
  },
  {
    degrees: 270,
    angle: String.raw`\frac{3\pi}{2}`,
    value: "-i",
    real: 0,
    imaginary: -1,
    description: "Three quarter-turns reach the negative imaginary axis.",
  },
  {
    degrees: 360,
    angle: String.raw`2\pi`,
    value: "1",
    real: 1,
    imaginary: 0,
    description: "A full turn returns to the starting point.",
  },
] as const;

function decimal(value: number) {
  return Number(value.toFixed(3)).toString();
}

export default function UnitCircleLab() {
  const [degrees, setDegrees] = useState(180);
  const radians = (degrees * Math.PI) / 180;
  const landmark = landmarks.find((point) => point.degrees === degrees);
  const real = landmark?.real ?? Math.cos(radians);
  const imaginary = landmark?.imaginary ?? Math.sin(radians);
  const angle = landmark?.angle ?? decimal(radians);
  return (
    <Section
      className="w-full max-w-full min-w-0"
      id="unit-circle-heading"
      title="Explore a complex exponential"
      description="Move the angle to rotate the point. The horizontal coordinate is the real part; the vertical coordinate is the imaginary part."
    >
      <div className="border-border grid w-full max-w-full min-w-0 grid-cols-1 overflow-hidden rounded-2xl border lg:grid-cols-2">
        <UnitCircleDiagram
          radians={radians}
          real={real}
          imaginary={imaginary}
        />
        <div className="border-border min-w-0 space-y-5 border-t p-5 sm:p-6 lg:border-t-0 lg:border-l">
          <div className="space-y-3">
            <p className="text-sm font-medium">
              Rotation angle: {katexify(`${degrees}^\\circ`, false)}
            </p>
            <Slider
              label="Rotation angle"
              valueText={`${degrees} degrees, ${decimal(radians)} radians`}
              min={0}
              max={360}
              step={1}
              value={degrees}
              onValueChange={setDegrees}
            />
            <div className="flex justify-between text-xs">
              <span>{katexify("0", false)}</span>
              <span>{katexify(String.raw`\pi`, false)}</span>
              <span>{katexify(String.raw`2\pi`, false)}</span>
            </div>
          </div>
          <fieldset
            className="flex flex-wrap gap-2"
            aria-label="Choose a landmark angle"
          >
            {landmarks.map((point) => (
              <Button
                aria-label={`Rotate to ${point.degrees} degrees`}
                aria-pressed={degrees === point.degrees}
                className="aria-pressed:border-action aria-pressed:bg-action/10"
                variant="secondary"
                key={point.degrees}
                onClick={() => {
                  setDegrees(point.degrees);
                }}
              >
                {katexify(point.angle, false)}
              </Button>
            ))}
          </fieldset>
          <div
            className="border-border max-w-full min-w-0 space-y-3 overflow-x-auto rounded-xl border p-4"
            aria-live="polite"
            aria-atomic="true"
          >
            <p className="text-muted text-xs">Angle in radians</p>
            {katexify(`\\theta${landmark ? "=" : "\\approx"}${angle}`, true)}
            <p className="text-muted text-xs">Point on the complex plane</p>
            {landmark
              ? katexify(
                  `e^{i${angle === "0" ? "\\cdot0" : angle}}=${landmark.value}`,
                  true
                )
              : katexify(
                  `e^{i\\theta}\\approx ${decimal(real)}${imaginary < 0 ? "-" : "+"}${decimal(Math.abs(imaginary))}i`,
                  true
                )}
            <p className="text-muted text-sm leading-6">
              {landmark?.description ??
                "Both coordinates change with the angle, but the distance from the origin stays one. Values here are rounded to three decimal places."}
            </p>
          </div>
          <p className="text-muted text-sm leading-6">
            The slider uses degrees for convenience. Euler’s formula uses
            radians, converted by:
          </p>
          <div className="max-w-full min-w-0 overflow-x-auto">
            {katexify(String.raw`\theta=\frac{\text{degrees}}{180}\pi`, true)}
          </div>
        </div>
      </div>
    </Section>
  );
}
