"use client";

import { useId, useState } from "react";

import katexify from "@/utils/katexify";

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
  const sliderId = useId();
  const radians = (degrees * Math.PI) / 180;
  const landmark = landmarks.find((point) => point.degrees === degrees);
  const real = landmark?.real ?? Math.cos(radians);
  const imaginary = landmark?.imaginary ?? Math.sin(radians);
  const angle = landmark?.angle ?? decimal(radians);
  const x = 200 + 132 * real;
  const y = 200 - 132 * imaginary;
  // A sampled arc also handles a full turn, whose endpoints coincide.
  const arc = Array.from({ length: 91 }, (_, index) => {
    const theta = (radians * index) / 90;
    return `${index === 0 ? "M" : "L"}${(200 + 132 * Math.cos(theta)).toFixed(2)},${(200 - 132 * Math.sin(theta)).toFixed(2)}`;
  }).join(" ");

  return (
    <section
      aria-labelledby="unit-circle-heading"
      className="border-border overflow-hidden rounded-2xl border"
    >
      <div className="border-border border-b px-5 py-4 sm:px-6">
        <h2 className="text-lg font-semibold" id="unit-circle-heading">
          Explore a complex exponential
        </h2>
        <p className="text-muted mt-1 text-sm leading-6">
          Move the angle to rotate the point. The horizontal coordinate is the
          real part; the vertical coordinate is the imaginary part.
        </p>
      </div>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_20rem]">
        <figure className="min-w-0 p-5 sm:p-6">
          <svg
            aria-hidden="true"
            className="mx-auto w-full max-w-md"
            focusable="false"
            viewBox="0 0 400 400"
          >
            <circle
              cx="200"
              cy="200"
              fill="none"
              r="132"
              stroke="var(--color-border)"
              strokeWidth="2"
            />
            <line
              stroke="var(--color-muted)"
              x1="35"
              x2="365"
              y1="200"
              y2="200"
            />
            <line
              stroke="var(--color-muted)"
              x1="200"
              x2="200"
              y1="35"
              y2="365"
            />
            <path
              d={arc}
              fill="none"
              stroke="var(--color-action)"
              strokeOpacity="0.45"
              strokeWidth="5"
            />
            <line
              stroke="var(--color-muted)"
              strokeDasharray="4 4"
              x1={x}
              x2={x}
              y1="200"
              y2={y}
            />
            <line
              stroke="var(--color-muted)"
              strokeDasharray="4 4"
              x1="200"
              x2={x}
              y1={y}
              y2={y}
            />
            <line
              stroke="var(--color-action)"
              strokeWidth="3"
              x1="200"
              x2={x}
              y1="200"
              y2={y}
            />
            <circle cx="200" cy="200" fill="var(--color-muted)" r="3" />
            <circle
              cx={x}
              cy={y}
              fill="var(--color-action)"
              r="7"
              stroke="var(--color-background)"
              strokeWidth="2"
            />
            {[
              { tex: "1", x: 337, y: 204 },
              { tex: "-1", x: 18, y: 204 },
              { tex: "i", x: 209, y: 43 },
              { tex: "-i", x: 209, y: 336 },
            ].map((label) => (
              <foreignObject
                height="32"
                key={label.tex}
                width="44"
                x={label.x}
                y={label.y}
              >
                <div className="text-muted text-center text-sm">
                  {katexify(label.tex, false)}
                </div>
              </foreignObject>
            ))}
            <foreignObject height="30" width="80" x="309" y="169">
              <div className="text-muted text-center text-xs">Real axis</div>
            </foreignObject>
            <foreignObject height="30" width="108" x="207" y="18">
              <div className="text-muted text-xs">Imaginary axis</div>
            </foreignObject>
          </svg>
          <figcaption className="text-muted text-center text-sm leading-6">
            The point stays one unit from the origin. The highlighted arc traces
            the counterclockwise rotation from the positive real axis.
          </figcaption>
        </figure>
        <div className="border-border min-w-0 space-y-5 border-t p-5 sm:p-6 lg:border-t-0 lg:border-l">
          <div className="space-y-3">
            <label className="block text-sm font-medium" htmlFor={sliderId}>
              Rotation angle: {katexify(`${degrees}^\\circ`, false)}
            </label>
            <input
              aria-valuetext={`${degrees} degrees, ${decimal(radians)} radians`}
              className="accent-action focus-visible:outline-action w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4"
              id={sliderId}
              max={360}
              min={0}
              onChange={(event) => {
                setDegrees(Number(event.target.value));
              }}
              step={1}
              type="range"
              value={degrees}
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
              <button
                aria-label={`Rotate to ${point.degrees} degrees`}
                aria-pressed={degrees === point.degrees}
                className="border-border hover:bg-interface-hover focus-visible:outline-action aria-pressed:border-action aria-pressed:bg-action/10 cursor-pointer rounded-lg border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2"
                key={point.degrees}
                onClick={() => {
                  setDegrees(point.degrees);
                }}
                type="button"
              >
                {katexify(point.angle, false)}
              </button>
            ))}
          </fieldset>
          <div
            className="border-border space-y-3 overflow-x-auto rounded-xl border p-4"
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
          <div className="overflow-x-auto">
            {katexify(String.raw`\theta=\frac{\text{degrees}}{180}\pi`, true)}
          </div>
        </div>
      </div>
    </section>
  );
}
