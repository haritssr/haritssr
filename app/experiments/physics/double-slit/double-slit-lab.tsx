"use client";

import { useState } from "react";
import type { ReactNode } from "react";

import katexify from "@/utils/katexify";

const SCREEN_HALF_RANGE_MM = 20;
const DEFAULT_VALUES = {
  screenDistance: 2.5,
  screenPosition: 0,
  slitSeparation: 0.25,
  wavelength: 532,
};
const COLOR_STOPS = [
  { color: [124, 58, 237], wavelength: 380 },
  { color: [37, 99, 235], wavelength: 450 },
  { color: [22, 163, 74], wavelength: 520 },
  { color: [234, 179, 8], wavelength: 590 },
  { color: [239, 68, 68], wavelength: 650 },
  { color: [220, 38, 38], wavelength: 700 },
] as const;
const WAVEFRONT_RADII = [64, 128, 192, 256, 320, 384, 448];

interface LabValues {
  screenDistance: number;
  screenPosition: number;
  slitSeparation: number;
  wavelength: number;
}

interface RangeControlProps {
  id: string;
  label: ReactNode;
  max: number;
  min: number;
  onChange: (value: number) => void;
  step: number;
  value: number;
  valueLabel: ReactNode;
}

function getLightColor(wavelength: number): string {
  const upperIndex = COLOR_STOPS.findIndex(
    (stop) => stop.wavelength >= wavelength
  );
  const lower = COLOR_STOPS[Math.max(0, upperIndex - 1)] ?? COLOR_STOPS[0];
  const upper = COLOR_STOPS[upperIndex] ?? COLOR_STOPS.at(-1) ?? COLOR_STOPS[0];
  const amount =
    (wavelength - lower.wavelength) /
    (upper.wavelength - lower.wavelength || 1);
  const channels = lower.color.map((channel, index) =>
    Math.round(channel + (upper.color[index] - channel) * amount)
  );

  return `rgb(${channels.join(", ")})`;
}

function getIntensity(screenPosition: number, fringeSpacing: number): number {
  const phase = (Math.PI * screenPosition) / fringeSpacing;
  return Math.cos(phase) ** 2;
}

function RangeControl({
  id,
  label,
  max,
  min,
  onChange,
  step,
  value,
  valueLabel,
}: RangeControlProps) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-start justify-between gap-3">
        <label className="text-sm font-medium text-zinc-700" htmlFor={id}>
          {label}
        </label>
        <output
          className="shrink-0 font-mono text-sm font-semibold text-zinc-950 tabular-nums"
          htmlFor={id}
        >
          {valueLabel}
        </output>
      </div>
      <input
        className="h-2 w-full cursor-pointer accent-violet-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-700"
        id={id}
        max={max}
        min={min}
        onChange={(event) => {
          onChange(event.currentTarget.valueAsNumber);
        }}
        step={step}
        type="range"
        value={value}
      />
      <div className="flex justify-between font-mono text-[11px] text-zinc-400 tabular-nums">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

export default function DoubleSlitLab() {
  const [lab, setLab] = useState<LabValues>(DEFAULT_VALUES);
  const lightColor = getLightColor(lab.wavelength);
  const fringeSpacing =
    (lab.wavelength * 0.001 * lab.screenDistance) / lab.slitSeparation;
  const measuredIntensity = getIntensity(lab.screenPosition, fringeSpacing);
  const pathDifferenceNm = Math.abs(
    (lab.slitSeparation * lab.screenPosition * 1000) / lab.screenDistance
  );
  const phaseDifference = (2 * Math.PI * pathDifferenceNm) / lab.wavelength;
  const slitGap = 18 + ((lab.slitSeparation - 0.1) / 0.7) * 26;
  const wavefrontScale = 0.78 + ((lab.wavelength - 380) / 320) * 0.44;
  const wavefrontRadii = WAVEFRONT_RADII.map(
    (radius) => radius * wavefrontScale
  );
  const slitYPositions = [150 - slitGap / 2, 150 + slitGap / 2];
  const screenY = (position: number) =>
    150 - (position / SCREEN_HALF_RANGE_MM) * 88;
  const visibleOrders = Array.from(
    { length: 7 },
    (_, index) => index - 3
  ).filter((order) => Math.abs(order * fringeSpacing) <= SCREEN_HALF_RANGE_MM);
  const screenReadings = Array.from({ length: 61 }, (_, index) => {
    const position =
      SCREEN_HALF_RANGE_MM - (index / 60) * SCREEN_HALF_RANGE_MM * 2;
    return {
      intensity: getIntensity(position, fringeSpacing),
      y: 62 + index * (176 / 60),
    };
  });
  const plot = { bottom: 174, height: 136, left: 56, width: 654, top: 38 };
  const plotPoints = Array.from({ length: 241 }, (_, index) => {
    const position =
      -SCREEN_HALF_RANGE_MM + (index / 240) * SCREEN_HALF_RANGE_MM * 2;
    return {
      intensity: getIntensity(position, fringeSpacing),
      x: plot.left + (index / 240) * plot.width,
    };
  });
  const intensityPath = plotPoints
    .map((point, index) => {
      const y = plot.bottom - point.intensity * plot.height;
      return `${index === 0 ? "M" : "L"} ${point.x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
  const areaPath = `${intensityPath} L ${plot.left + plot.width} ${plot.bottom} L ${plot.left} ${plot.bottom} Z`;
  const selectedX =
    plot.left +
    ((lab.screenPosition + SCREEN_HALF_RANGE_MM) / (SCREEN_HALF_RANGE_MM * 2)) *
      plot.width;

  function updateLab(key: keyof LabValues, value: number) {
    setLab((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="space-y-8">
      <section
        aria-labelledby="double-slit-lab-heading"
        className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm"
      >
        <div className="flex flex-col gap-4 border-b border-zinc-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div>
            <h2
              className="text-lg font-semibold tracking-tight text-zinc-950"
              id="double-slit-lab-heading"
            >
              Young’s double slit
            </h2>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-600">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: lightColor }}
            />
            Coherent monochromatic light
          </span>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_19rem]">
          <div className="min-w-0 p-4 sm:p-7">
            <figure>
              <svg
                aria-labelledby="apparatus-title apparatus-description"
                className="w-full overflow-visible rounded-2xl bg-zinc-50"
                viewBox="0 0 760 300"
              >
                <title id="apparatus-title">
                  Double-slit apparatus and interference fringes
                </title>
                <desc id="apparatus-description">
                  Light travels from a source through two narrow slits. Circular
                  wavefronts overlap before reaching a screen with bright and
                  dark bands.
                </desc>
                <defs>
                  <clipPath id="double-slit-wave-region">
                    <rect height="190" width="472" x="214" y="55" />
                  </clipPath>
                </defs>

                <line
                  stroke="#d4d4d8"
                  strokeDasharray="3 6"
                  x1="50"
                  x2="715"
                  y1="150"
                  y2="150"
                />
                <circle cx="56" cy="150" fill={lightColor} r="7" />
                <circle
                  cx="56"
                  cy="150"
                  fill="none"
                  opacity="0.2"
                  r="16"
                  stroke={lightColor}
                  strokeWidth="2"
                />
                <line
                  opacity="0.7"
                  stroke={lightColor}
                  strokeWidth="2"
                  x1="74"
                  x2="203"
                  y1="150"
                  y2="150"
                />

                <g clipPath="url(#double-slit-wave-region)">
                  {slitYPositions.map((slitY, slitIndex) =>
                    wavefrontRadii.map((radius) => (
                      <circle
                        cx="214"
                        cy={slitY}
                        fill="none"
                        key={`${slitIndex}-${radius}`}
                        opacity="0.22"
                        r={radius}
                        stroke={lightColor}
                        strokeWidth="1.25"
                      />
                    ))
                  )}
                  {visibleOrders.map((order) => {
                    const position = order * fringeSpacing;
                    const targetY = screenY(position);

                    return slitYPositions.map((slitY, slitIndex) => (
                      <line
                        key={`ray-${order}-${slitIndex}`}
                        opacity="0.16"
                        stroke={lightColor}
                        strokeDasharray="4 5"
                        strokeWidth="1.3"
                        x1="218"
                        x2="694"
                        y1={slitY}
                        y2={targetY}
                      />
                    ));
                  })}
                </g>

                <rect
                  fill="#71717a"
                  height="190"
                  rx="2"
                  width="8"
                  x="206"
                  y="55"
                />
                {slitYPositions.map((slitY, index) => (
                  <g key={`slit-${index}`}>
                    <rect
                      fill="#fafafa"
                      height="16"
                      width="10"
                      x="205"
                      y={slitY - 8}
                    />
                    <circle cx="218" cy={slitY} fill={lightColor} r="3" />
                  </g>
                ))}

                <rect
                  fill="#e4e4e7"
                  height="192"
                  rx="3"
                  width="14"
                  x="696"
                  y="54"
                />
                <rect fill="#ffffff" height="176" width="10" x="698" y="62" />
                {screenReadings.map((reading, index) => (
                  <rect
                    fill={lightColor}
                    height="2.8"
                    key={`fringe-${index}`}
                    opacity={0.06 + reading.intensity * 0.94}
                    width="10"
                    x="698"
                    y={reading.y - 1.4}
                  />
                ))}
                <line
                  stroke="#27272a"
                  strokeDasharray="2 3"
                  strokeWidth="1.2"
                  x1="691"
                  x2="718"
                  y1={screenY(lab.screenPosition)}
                  y2={screenY(lab.screenPosition)}
                />
                <circle
                  cx="703"
                  cy={screenY(lab.screenPosition)}
                  fill="#fff"
                  r="4"
                  stroke="#27272a"
                  strokeWidth="1.5"
                />

                <text
                  fill="#71717a"
                  fontSize="11"
                  textAnchor="middle"
                  x="56"
                  y="273"
                >
                  LIGHT SOURCE
                </text>
                <text
                  fill="#71717a"
                  fontSize="11"
                  textAnchor="middle"
                  x="210"
                  y="273"
                >
                  DOUBLE SLIT
                </text>
                <text
                  fill="#71717a"
                  fontSize="11"
                  textAnchor="middle"
                  x="703"
                  y="273"
                >
                  SCREEN
                </text>
                <text
                  fill="#a1a1aa"
                  fontSize="10"
                  textAnchor="middle"
                  x="452"
                  y="291"
                >
                  schematic · not to scale
                </text>
              </svg>
              <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500">
                <span>
                  The marker on the screen follows the measurement control.
                </span>
                <span className="font-mono tabular-nums">
                  {katexify(
                    String.raw`\lambda = ${lab.wavelength}\,\mathrm{nm}`,
                    false
                  )}
                </span>
              </figcaption>
            </figure>

            <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5">
              <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.16em] text-zinc-400 uppercase">
                    Screen readout
                  </p>
                  <h3 className="mt-1 font-medium text-zinc-900">
                    Relative light intensity
                  </h3>
                </div>
                <div className="text-right">
                  <p className="font-mono text-lg font-semibold text-zinc-900 tabular-nums">
                    {katexify(
                      String.raw`\Delta y = ${fringeSpacing.toFixed(2)}\,\mathrm{mm}`,
                      false
                    )}
                  </p>
                  <p className="text-[11px] text-zinc-500">
                    bright fringe spacing
                  </p>
                </div>
              </div>

              <figure>
                <div className="relative">
                  <div className="absolute top-1 left-2 text-[11px] text-zinc-500">
                    {katexify(String.raw`\frac{I}{I_0}`, false)}
                  </div>
                  <svg
                    aria-labelledby="intensity-plot-title intensity-plot-description"
                    className="w-full"
                    viewBox="0 0 760 220"
                  >
                    <title id="intensity-plot-title">
                      Predicted interference intensity across the screen
                    </title>
                    <desc id="intensity-plot-description">
                      The graph shows repeating bright maxima and dark minima
                      over screen positions from minus twenty to plus twenty
                      millimeters. The selected measurement is at{" "}
                      {lab.screenPosition.toFixed(1)} millimeters.
                    </desc>
                    {[0, 0.5, 1].map((level) => {
                      const y = plot.bottom - level * plot.height;
                      return (
                        <g key={level}>
                          <line
                            stroke="#e4e4e7"
                            strokeDasharray={level === 0 ? undefined : "3 5"}
                            x1={plot.left}
                            x2={plot.left + plot.width}
                            y1={y}
                            y2={y}
                          />
                          <text
                            fill="#a1a1aa"
                            fontSize="10"
                            textAnchor="end"
                            x="46"
                            y={y + 3}
                          >
                            {level.toFixed(1)}
                          </text>
                        </g>
                      );
                    })}
                    {[-20, -10, 0, 10, 20].map((position) => {
                      const x =
                        plot.left +
                        ((position + SCREEN_HALF_RANGE_MM) /
                          (SCREEN_HALF_RANGE_MM * 2)) *
                          plot.width;
                      return (
                        <g key={position}>
                          <line
                            stroke="#f4f4f5"
                            x1={x}
                            x2={x}
                            y1={plot.top}
                            y2={plot.bottom}
                          />
                          <text
                            fill="#a1a1aa"
                            fontSize="10"
                            textAnchor="middle"
                            x={x}
                            y="195"
                          >
                            {position}
                          </text>
                        </g>
                      );
                    })}
                    <path d={areaPath} fill={lightColor} fillOpacity="0.1" />
                    <path
                      d={intensityPath}
                      fill="none"
                      stroke={lightColor}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                    />
                    <line
                      opacity="0.7"
                      stroke="#52525b"
                      strokeDasharray="4 4"
                      x1={selectedX}
                      x2={selectedX}
                      y1={plot.top}
                      y2={plot.bottom}
                    />
                    <circle
                      cx={selectedX}
                      cy={plot.bottom - measuredIntensity * plot.height}
                      fill="white"
                      r="5"
                      stroke={lightColor}
                      strokeWidth="2.5"
                    />
                  </svg>
                </div>
                <div className="mt-1 text-center text-xs text-zinc-500">
                  {katexify(
                    String.raw`\text{Position on screen, } y\,(\mathrm{mm})`,
                    false
                  )}
                </div>
                <figcaption className="sr-only">
                  For an ideal pair of slits, relative intensity is the cosine
                  squared of pi times screen position divided by fringe spacing.
                </figcaption>
              </figure>
            </div>
          </div>

          <aside className="space-y-7 border-t border-zinc-200 bg-zinc-50/70 p-5 sm:p-7 lg:border-t-0 lg:border-l">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.16em] text-zinc-400 uppercase">
                Adjust the setup
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Each control changes the spacing between neighboring bright
                fringes.
              </p>
            </div>

            <div className="space-y-7">
              <div className="space-y-3">
                <RangeControl
                  id="double-slit-wavelength"
                  label={
                    <>Wavelength, {katexify(String.raw`\lambda`, false)}</>
                  }
                  max={700}
                  min={380}
                  onChange={(value) => {
                    updateLab("wavelength", value);
                  }}
                  step={1}
                  value={lab.wavelength}
                  valueLabel={katexify(
                    String.raw`${lab.wavelength}\,\mathrm{nm}`,
                    false
                  )}
                />
                <fieldset
                  aria-label="Wavelength presets"
                  className="m-0 flex min-w-0 gap-2 border-0 p-0"
                >
                  {[
                    { label: "Violet", value: 405 },
                    { label: "Green", value: 532 },
                    { label: "Red", value: 650 },
                  ].map((preset) => (
                    <button
                      aria-pressed={lab.wavelength === preset.value}
                      className="rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-[11px] font-medium text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700 aria-pressed:border-violet-300 aria-pressed:bg-violet-50 aria-pressed:text-violet-800"
                      key={preset.value}
                      onClick={() => {
                        updateLab("wavelength", preset.value);
                      }}
                      type="button"
                    >
                      {preset.label}
                    </button>
                  ))}
                </fieldset>
              </div>

              <RangeControl
                id="double-slit-separation"
                label={<>Slit separation, {katexify(String.raw`d`, false)}</>}
                max={0.8}
                min={0.1}
                onChange={(value) => {
                  updateLab("slitSeparation", value);
                }}
                step={0.01}
                value={lab.slitSeparation}
                valueLabel={katexify(
                  String.raw`${lab.slitSeparation.toFixed(2)}\,\mathrm{mm}`,
                  false
                )}
              />

              <RangeControl
                id="double-slit-distance"
                label={<>Screen distance, {katexify(String.raw`L`, false)}</>}
                max={5}
                min={1}
                onChange={(value) => {
                  updateLab("screenDistance", value);
                }}
                step={0.1}
                value={lab.screenDistance}
                valueLabel={katexify(
                  String.raw`${lab.screenDistance.toFixed(1)}\,\mathrm{m}`,
                  false
                )}
              />

              <div className="border-t border-zinc-200 pt-6">
                <RangeControl
                  id="double-slit-position"
                  label={
                    <>Measure at position, {katexify(String.raw`y`, false)}</>
                  }
                  max={SCREEN_HALF_RANGE_MM}
                  min={-SCREEN_HALF_RANGE_MM}
                  onChange={(value) => {
                    updateLab("screenPosition", value);
                  }}
                  step={0.1}
                  value={lab.screenPosition}
                  valueLabel={katexify(
                    String.raw`${lab.screenPosition.toFixed(1)}\,\mathrm{mm}`,
                    false
                  )}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-4">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-zinc-400 uppercase">
                At the marker
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-zinc-500">Path difference</p>
                  <p className="mt-1 font-mono text-lg font-semibold text-zinc-900 tabular-nums">
                    {katexify(
                      String.raw`${pathDifferenceNm.toFixed(0)}\,\mathrm{nm}`,
                      false
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500">Relative intensity</p>
                  <p className="mt-1 font-mono text-lg font-semibold text-zinc-900 tabular-nums">
                    {katexify(
                      String.raw`${(measuredIntensity * 100).toFixed(0)}\%`,
                      false
                    )}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 text-xs text-zinc-500">
                <span>Phase difference</span>
                <span className="font-mono tabular-nums">
                  {katexify(
                    String.raw`${(phaseDifference % (2 * Math.PI)).toFixed(2)}\,\mathrm{rad}`,
                    false
                  )}
                </span>
              </div>
            </div>

            <div className="rounded-2xl bg-violet-950 p-4 text-white">
              <p className="text-[11px] font-semibold tracking-[0.15em] text-violet-200 uppercase">
                Fringe spacing
              </p>
              <p className="mt-2 font-mono text-3xl font-semibold tracking-tight tabular-nums">
                {katexify(
                  String.raw`${fringeSpacing.toFixed(2)}\,\mathrm{mm}`,
                  false
                )}
              </p>
              <p className="mt-2 text-xs leading-5 text-violet-200">
                Increase {katexify(String.raw`\lambda`, false)} or{" "}
                {katexify(String.raw`L`, false)} to spread the pattern. Increase{" "}
                {katexify(String.raw`d`, false)} to bring the fringes closer
                together.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section aria-labelledby="reading-pattern-heading" className="space-y-4">
        <div>
          <h2
            className="text-xl font-semibold tracking-tight text-zinc-950"
            id="reading-pattern-heading"
          >
            Why do the bands appear?
          </h2>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <article className="rounded-2xl border border-zinc-200 bg-white p-5">
            <p className="font-mono text-sm font-semibold text-violet-800">
              {katexify(String.raw`\Delta r = m\lambda`, false)}
            </p>
            <h3 className="mt-3 text-sm font-semibold text-zinc-900">
              Bright fringes
            </h3>
            <p className="mt-1 text-sm leading-6 text-zinc-600">
              The waves arrive in step and reinforce each other. The central
              bright fringe is order {katexify(String.raw`m = 0`, false)}.
            </p>
          </article>
          <article className="rounded-2xl border border-zinc-200 bg-white p-5">
            <p className="font-mono text-sm font-semibold text-violet-800">
              {katexify(String.raw`\Delta r = (m + \frac{1}{2})\lambda`, false)}
            </p>
            <h3 className="mt-3 text-sm font-semibold text-zinc-900">
              Dark fringes
            </h3>
            <p className="mt-1 text-sm leading-6 text-zinc-600">
              A half-wavelength path difference brings a crest together with a
              trough, cancelling the light.
            </p>
          </article>
          <article className="rounded-2xl border border-zinc-200 bg-white p-5">
            <p className="font-mono text-sm font-semibold text-violet-800">
              {katexify(
                String.raw`\Delta y \approx \frac{\lambda L}{d}`,
                false
              )}
            </p>
            <h3 className="mt-3 text-sm font-semibold text-zinc-900">
              Small-angle model
            </h3>
            <p className="mt-1 text-sm leading-6 text-zinc-600">
              The graph assumes narrow slits, a distant screen, and small
              angles. It shows interference without a single-slit envelope.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
