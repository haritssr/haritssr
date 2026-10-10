"use client";

import { useState } from "react";

import Box from "@/components/Box";
import Button from "@/components/Button";
import Section from "@/components/Section";
import Slider from "@/components/Slider";
import katexify from "@/utils/katexify";

// Special angles have unequal gaps, so each slider step selects an index.
const SPECIAL_ANGLES = [
  0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330, 360,
] as const;
const DEFAULT_ANGLE_INDEX = 4;

function decimal(value: number) {
  return Number(value.toFixed(3)).toString();
}

function CircleDiagram({
  radius,
  degrees,
}: {
  radius: number;
  degrees: number;
}) {
  const size = radius * 14;
  const radians = (degrees * Math.PI) / 180;
  const endX = 180 + size * Math.cos(radians);
  const endY = 180 - size * Math.sin(radians);
  // Sampling handles zero and full turns without coincident SVG arc endpoints.
  const arc = Array.from({ length: 73 }, (_, index) => {
    const angle = (radians * index) / 72;
    return `${index === 0 ? "M" : "L"}${(180 + size * Math.cos(angle)).toFixed(3)},${(180 - size * Math.sin(angle)).toFixed(3)}`;
  }).join(" ");

  return (
    <figure className="min-w-0">
      <svg
        aria-hidden="true"
        focusable="false"
        className="mx-auto w-full max-w-sm"
        viewBox="0 0 360 360"
      >
        <circle
          cx="180"
          cy="180"
          r={size}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="2"
        />
        <path
          d={`${arc} L180,180 Z`}
          fill="var(--color-action)"
          fillOpacity="0.12"
        />
        <line
          x1={180 - size}
          y1="180"
          x2={180 + size}
          y2="180"
          stroke="var(--color-muted)"
          strokeWidth="2"
          strokeDasharray="5 5"
        />
        <line
          x1="180"
          y1="180"
          x2={180 + size}
          y2="180"
          stroke="var(--color-action)"
          strokeWidth="2"
        />
        <line
          x1="180"
          y1="180"
          x2={endX}
          y2={endY}
          stroke="var(--color-action)"
          strokeWidth="2"
        />
        <path
          d={arc}
          fill="none"
          stroke="var(--color-action)"
          strokeWidth="4"
        />
        <circle cx="180" cy="180" r="4" fill="var(--color-foreground)" />
      </svg>
      <figcaption className="text-muted space-y-2 text-sm leading-7">
        <p>
          The dot marks the center. The dashed line spans the diameter; blue
          radii and the blue arc enclose the shaded sector.
        </p>
        <p>
          Radius: {katexify(`${decimal(radius)}\\ \\mathrm{cm}`, false)}.{" "}
          Central angle: {katexify(`${decimal(degrees)}^\\circ`, false)}.
        </p>
      </figcaption>
    </figure>
  );
}

function Measurements({
  radius,
  degrees,
}: {
  radius: number;
  degrees: number;
}) {
  const circumference = 2 * Math.PI * radius;
  const area = Math.PI * radius ** 2;
  const fraction = degrees / 360;
  const measurements = [
    { label: "Diameter", tex: `d=${decimal(2 * radius)}\\ \\mathrm{cm}` },
    {
      label: "Circumference",
      tex: `C\\approx${decimal(circumference)}\\ \\mathrm{cm}`,
    },
    { label: "Disk area", tex: `A\\approx${decimal(area)}\\ \\mathrm{cm}^2` },
    {
      label: "Arc length",
      tex: `s\\approx${decimal(fraction * circumference)}\\ \\mathrm{cm}`,
    },
    {
      label: "Sector area",
      tex: `A_{\\mathrm{sector}}\\approx${decimal(fraction * area)}\\ \\mathrm{cm}^2`,
    },
  ];

  return (
    <dl className="space-y-3">
      {measurements.map((measurement) => (
        <div key={measurement.label} className="space-y-1">
          <dt className="text-muted text-sm">{measurement.label}</dt>
          <dd className="overflow-x-auto py-1">
            {katexify(measurement.tex, false)}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default function CircleLab() {
  const [radius, setRadius] = useState(5);
  const [angleIndex, setAngleIndex] = useState(DEFAULT_ANGLE_INDEX);
  const degrees = SPECIAL_ANGLES[angleIndex] ?? 90;

  return (
    <Section
      title="Explore the circle"
      id="circle-lab"
      description={
        <>
          Change the radius to resize the circle, or the angle to select a
          different sector. Try doubling the radius and compare circumference
          with area. Measurements are rounded to three decimal places.
        </>
      }
    >
      <Box title="Circle explorer">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <CircleDiagram radius={radius} degrees={degrees} />
          <div className="min-w-0 space-y-5">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-medium">Radius in centimeters</p>
                <output className="shrink-0">
                  {katexify(`${radius}\\ \\mathrm{cm}`, false)}
                </output>
              </div>
              <Slider
                label="Radius in centimeters"
                value={radius}
                onValueChange={setRadius}
                min={1}
                max={10}
                step={1}
                valueText={`${radius} centimeters`}
              />
              <div className="text-muted flex justify-between text-xs">
                <span>{katexify(String.raw`1\ \mathrm{cm}`, false)}</span>
                <span>{katexify(String.raw`10\ \mathrm{cm}`, false)}</span>
              </div>
              <p className="text-muted text-xs leading-6">
                Adjust the radius in{" "}
                {katexify(String.raw`1\ \mathrm{cm}`, false)} steps.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-medium">Central angle in degrees</p>
                <output className="shrink-0">
                  {katexify(`${degrees}^\\circ`, false)}
                </output>
              </div>
              <Slider
                label="Central angle in degrees"
                value={angleIndex}
                onValueChange={setAngleIndex}
                min={0}
                max={SPECIAL_ANGLES.length - 1}
                step={1}
                valueText={`${degrees} degrees`}
              />
              <div className="text-muted flex justify-between text-xs">
                <span>{katexify(String.raw`0^\circ`, false)}</span>
                <span>{katexify(String.raw`360^\circ`, false)}</span>
              </div>
              <p className="text-muted text-xs leading-6">
                Snaps to sudut istimewa in every quadrant: multiples of{" "}
                {katexify(String.raw`30^\circ`, false)} or{" "}
                {katexify(String.raw`45^\circ`, false)}, including a full turn.
              </p>
            </div>
            <Button
              variant="secondary"
              onClick={() => {
                setRadius(5);
                setAngleIndex(DEFAULT_ANGLE_INDEX);
              }}
            >
              Reset values
            </Button>
            <div
              aria-live="polite"
              aria-atomic="true"
              className="border-border border-t pt-5"
            >
              <Measurements radius={radius} degrees={degrees} />
            </div>
          </div>
        </div>
      </Box>
    </Section>
  );
}
