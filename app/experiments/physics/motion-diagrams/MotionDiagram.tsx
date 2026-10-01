"use client";

import { useEffect, useRef, useState } from "react";

import katexify from "@/utils/katexify";

type MotionKind = "linear" | "angular";

interface MotionDiagramProps {
  accelerated: boolean;
  areaFormula: string;
  formula: string;
  id: string;
  kind: MotionKind;
}

interface MotionValues {
  acceleration: number;
  initial: number;
  time: number;
}

const DURATION = 10;
const PLOT = { left: 70, top: 30, width: 580, height: 250 };

export default function MotionDiagram({
  accelerated,
  areaFormula,
  formula,
  id,
  kind,
}: MotionDiagramProps) {
  const angular = kind === "angular";
  const [motion, setMotion] = useState(() =>
    getInitialMotion(angular, accelerated)
  );
  const pendingMotion = useRef(motion);
  const pendingFrame = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (pendingFrame.current !== null) {
        cancelAnimationFrame(pendingFrame.current);
      }
    },
    []
  );

  function updateMotion(key: keyof MotionValues, value: number) {
    pendingMotion.current = { ...pendingMotion.current, [key]: value };

    if (pendingFrame.current !== null) {
      return;
    }

    pendingFrame.current = requestAnimationFrame(() => {
      pendingFrame.current = null;
      setMotion(pendingMotion.current);
    });
  }

  const { initial, acceleration, time } = motion;

  const current = initial + acceleration * time;
  const final = initial + acceleration * DURATION;
  const displacement = initial * time + (acceleration * time * time) / 2;
  const maxValue = (angular ? 6 : 12) * (accelerated ? 2 : 1);
  const x = (t: number) => PLOT.left + (t / DURATION) * PLOT.width;
  const y = (value: number) =>
    PLOT.top + PLOT.height - (value / maxValue) * PLOT.height;
  const baseline = y(0);
  const linePath = `M ${x(0)} ${y(initial)} L ${x(DURATION)} ${y(final)}`;
  const areaPath = `M ${x(0)} ${baseline} L ${x(0)} ${y(initial)} L ${x(time)} ${y(current)} L ${x(time)} ${baseline} Z`;
  const {
    valueSymbol,
    valueUnit,
    displacementSymbol,
    displacementUnit,
    accelerationUnit,
  } = getMotionNotation(kind);
  const color = angular ? "#ea580c" : "#2563eb";
  const rangeAccentClass = angular
    ? "accent-orange-600 focus-visible:outline-orange-600"
    : "accent-blue-600 focus-visible:outline-blue-600";

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 bg-zinc-50 px-5 py-3 sm:px-6">
        <p className="text-xs font-semibold tracking-[0.14em] text-zinc-500 uppercase">
          Motion graph
        </p>
        <p className="font-mono text-xs text-zinc-600">
          {katexify(
            String.raw`${valueSymbol}\,(${valueUnit})\text{ vs }t\,(\mathrm{s})`,
            false
          )}
        </p>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_240px]">
        <div className="min-w-0 p-4 sm:p-6">
          <figure>
            <div className="mb-1 pl-2 text-xs text-zinc-600">
              {katexify(String.raw`${valueSymbol}\,(${valueUnit})`, false)}
            </div>
            <svg
              aria-hidden="true"
              className="w-full"
              focusable="false"
              viewBox="0 0 700 325"
            >
              {[0, 0.25, 0.5, 0.75, 1].map((fraction) => {
                const tickY = baseline - fraction * PLOT.height;
                return (
                  <g key={fraction}>
                    <line
                      stroke={fraction === 0 ? "#a1a1aa" : "#e4e4e7"}
                      strokeDasharray={fraction === 0 ? undefined : "4 5"}
                      x1={PLOT.left}
                      x2={x(DURATION)}
                      y1={tickY}
                      y2={tickY}
                    />
                    <text
                      fill="#71717a"
                      fontSize="11"
                      textAnchor="end"
                      x={PLOT.left - 12}
                      y={tickY + 4}
                    >
                      {formatValue(fraction * maxValue)}
                    </text>
                  </g>
                );
              })}
              {[0, 2, 4, 6, 8, 10].map((tick) => (
                <g key={tick}>
                  <line
                    stroke="#ececf0"
                    x1={x(tick)}
                    x2={x(tick)}
                    y1={PLOT.top}
                    y2={baseline}
                  />
                  <text
                    fill="#71717a"
                    fontSize="11"
                    textAnchor="middle"
                    x={x(tick)}
                    y={baseline + 21}
                  >
                    {tick}
                  </text>
                </g>
              ))}
              <path d={areaPath} fill={color} fillOpacity="0.12" />
              <line
                stroke={color}
                strokeDasharray="5 5"
                strokeOpacity="0.75"
                x1={x(time)}
                x2={x(time)}
                y1={y(current)}
                y2={baseline}
              />
              <path
                d={linePath}
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeWidth="3"
              />
              <circle
                cx={x(time)}
                cy={y(current)}
                fill="white"
                r="7"
                stroke={color}
                strokeWidth="3"
              />
            </svg>
            <div className="mt-1 text-center text-xs text-zinc-600">
              {katexify(String.raw`t\,(\mathrm{s})`, false)}
            </div>
            <figcaption className="sr-only">
              {angular ? "Angular velocity" : "Velocity"} graphed over time. At{" "}
              {formatValue(time, 2)} seconds, the{" "}
              {angular ? "angular velocity" : "velocity"} is{" "}
              {formatValue(current, 2)}{" "}
              {angular ? "radians per second" : "meters per second"}.
            </figcaption>
          </figure>

          <div className="mt-2 rounded-xl bg-zinc-50 p-4">
            <RangeControl
              id={`${id}-time`}
              label="Time to inspect"
              max={DURATION}
              min={0}
              onChange={(value) => {
                updateMotion("time", value);
              }}
              step={0.01}
              unit={String.raw`\mathrm{s}`}
              value={time}
              valueDigits={2}
              accentClass={rangeAccentClass}
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 border-t border-zinc-200 bg-zinc-50/50 p-5 sm:p-6 lg:border-t-0 lg:border-l">
          <div className="space-y-5">
            <RangeControl
              id={`${id}-initial`}
              label={angular ? "Initial angular velocity" : "Initial velocity"}
              max={angular ? 6 : 12}
              min={angular ? 2 : 4}
              onChange={(value) => {
                updateMotion("initial", value);
              }}
              step={0.01}
              unit={valueUnit}
              value={initial}
              valueDigits={2}
              accentClass={rangeAccentClass}
            />
            {accelerated ? (
              <RangeControl
                id={`${id}-acceleration`}
                label={angular ? "Angular acceleration" : "Acceleration"}
                max={angular ? 0.6 : 1.2}
                min={angular ? -0.2 : -0.4}
                onChange={(value) => {
                  updateMotion("acceleration", value);
                }}
                step={0.01}
                unit={accelerationUnit}
                value={acceleration}
                valueDigits={2}
                accentClass={rangeAccentClass}
              />
            ) : null}
          </div>

          <div className="mt-auto space-y-4 border-t border-zinc-200 pt-5">
            <div>
              <p className="text-xs font-medium text-zinc-500">
                {angular ? "Angular velocity" : "Velocity"} at{" "}
                {katexify(
                  String.raw`t = ${formatValue(time, 2)}\,\mathrm{s}`,
                  false
                )}
              </p>
              <p className="mt-1 font-mono text-2xl font-semibold text-zinc-900 tabular-nums">
                {katexify(
                  String.raw`${formatValue(current, 2)}\,${valueUnit}`,
                  false
                )}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-500">
                Area under graph ({katexify(displacementSymbol, false)})
              </p>
              <p className="mt-1 font-mono text-2xl font-semibold text-zinc-900 tabular-nums">
                {katexify(
                  String.raw`${formatValue(displacement, 2)}\,${displacementUnit}`,
                  false
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-3 border-t border-zinc-200 px-5 py-4 text-sm sm:grid-cols-2 sm:px-6">
        <p className="text-zinc-600">
          <span className="font-medium text-zinc-900">Graph:</span>{" "}
          <span className="font-mono">{katexify(formula, false)}</span>
        </p>
        <p className="text-zinc-600">
          <span className="font-medium text-zinc-900">Area:</span>{" "}
          <span className="font-mono">{katexify(areaFormula, false)}</span>
        </p>
      </div>
    </div>
  );
}

function formatValue(value: number, digits = 1) {
  return String(Number(value.toFixed(digits)));
}

function getMotionNotation(kind: MotionKind) {
  if (kind === "angular") {
    return {
      valueSymbol: String.raw`\omega`,
      valueUnit: String.raw`\mathrm{rad/s}`,
      displacementSymbol: String.raw`\Delta\theta`,
      displacementUnit: String.raw`\mathrm{rad}`,
      accelerationUnit: String.raw`\mathrm{rad/s^2}`,
    };
  }

  return {
    valueSymbol: "v",
    valueUnit: String.raw`\mathrm{m/s}`,
    displacementSymbol: String.raw`\Delta x`,
    displacementUnit: String.raw`\mathrm{m}`,
    accelerationUnit: String.raw`\mathrm{m/s^2}`,
  };
}

function getInitialMotion(
  angular: boolean,
  accelerated: boolean
): MotionValues {
  let acceleration = 0;
  if (accelerated) {
    acceleration = angular ? 0.3 : 0.6;
  }

  return { acceleration, initial: angular ? 2.5 : 5, time: 6 };
}

function RangeControl({
  id,
  label,
  max,
  min,
  onChange,
  step,
  unit,
  value,
  valueDigits = 1,
  accentClass = "accent-blue-600",
}: {
  id: string;
  label: string;
  max: number;
  min: number;
  onChange: (value: number) => void;
  step: number;
  unit: string;
  value: number;
  valueDigits?: number;
  accentClass?: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3 text-sm">
        <label className="font-medium text-zinc-700" htmlFor={id}>
          {label}
        </label>
        <output className="font-mono text-zinc-900 tabular-nums" htmlFor={id}>
          {katexify(
            String.raw`${formatValue(value, valueDigits)}\,${unit}`,
            false
          )}
        </output>
      </div>
      <input
        className={`w-full cursor-pointer ${accentClass} focus-visible:outline-2 focus-visible:outline-offset-4`}
        defaultValue={value}
        id={id}
        max={max}
        min={min}
        onInput={(event) => {
          onChange(Number(event.currentTarget.value));
        }}
        step={step}
        type="range"
      />
      <div className="mt-1 flex justify-between font-mono text-xs text-zinc-400">
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div>
    </div>
  );
}
