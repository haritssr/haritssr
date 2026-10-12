"use client";

import { useId, useState } from "react";

import Button from "@/components/Button";
import Slider from "@/components/Slider";
import katexify from "@/utils/katexify";

import { getPosition, getProjectileMotion, GRAVITY } from "./model";

export default function ProjectileLab() {
  const [speed, setSpeed] = useState(20);
  const [angle, setAngle] = useState(45);
  const [height, setHeight] = useState(0);
  const [progress, setProgress] = useState(50);
  const id = useId();
  const motion = getProjectileMotion(speed, angle, height);
  const time = (progress / 100) * motion.flightTime;
  const position = getPosition(motion, time);
  const scale = Math.min(
    584 / Math.max(motion.range, 10),
    290 / Math.max(motion.peakHeight, 5)
  );
  const plotX = (x: number) => 56 + x * scale;
  const plotY = (y: number) => 350 - y * scale;
  const samples = Array.from({ length: 81 }, (_, index) => {
    const sample = getPosition(motion, (index / 80) * motion.flightTime);
    return `${index === 0 ? "M" : "L"} ${plotX(sample.x).toFixed(2)} ${plotY(sample.y).toFixed(2)}`;
  }).join(" ");
  const pointX = plotX(position.x);
  const pointY = plotY(position.y);
  const arrowScale = 64 / Math.sqrt(speed ** 2 + 2 * GRAVITY * height);
  const arrows = [
    {
      name: "Horizontal velocity",
      dx: motion.horizontalVelocity * arrowScale,
      dy: 0,
      className: "text-foreground",
      dash: "7 4",
    },
    {
      name: "Vertical velocity",
      dx: 0,
      dy: -position.verticalVelocity * arrowScale,
      className: "text-muted",
      dash: "2 4",
    },
    {
      name: "Total velocity",
      dx: motion.horizontalVelocity * arrowScale,
      dy: -position.verticalVelocity * arrowScale,
      className: "text-action",
      dash: undefined,
    },
  ];

  return (
    <div className="border-border min-w-0 rounded-2xl border p-4 sm:p-6">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <figure className="min-w-0 space-y-3">
          <svg
            aria-labelledby={`${id}-title ${id}-description`}
            className="text-foreground h-auto w-full"
            viewBox="0 0 720 460"
          >
            <title id={`${id}-title`}>Projectile trajectory and velocity</title>
            <desc id={`${id}-description`}>
              A projectile launched at {angle} degrees with a speed of {speed}{" "}
              meters per second from {height} meters above the ground. Dots mark
              equal time intervals. The highlighted projectile is at {progress}{" "}
              percent of its flight. Velocity arrows show its current direction
              and components.
            </desc>
            <path
              d="M 56 40 V 350 H 674"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.3"
            />
            <text x="56" y="24" fill="currentColor" fontSize="16">
              Height
            </text>
            <text
              x="674"
              y="438"
              textAnchor="end"
              fill="currentColor"
              fontSize="16"
            >
              Horizontal distance
            </text>
            <line
              x1="56"
              y1={plotY(motion.height)}
              x2={plotX(motion.range)}
              y2={plotY(motion.height)}
              stroke="currentColor"
              strokeOpacity="0.15"
              strokeDasharray="4 6"
            />
            <path
              d={samples}
              className="text-action"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
            {Array.from({ length: 9 }, (_, index) => {
              const sample = getPosition(
                motion,
                (index / 8) * motion.flightTime
              );
              return (
                <circle
                  key={`sample-${index}`}
                  cx={plotX(sample.x)}
                  cy={plotY(sample.y)}
                  r="4"
                  fill="currentColor"
                  opacity="0.5"
                />
              );
            })}
            <circle
              cx={plotX(motion.horizontalVelocity * motion.peakTime)}
              cy={plotY(motion.peakHeight)}
              r="7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <text
              x={plotX(motion.horizontalVelocity * motion.peakTime)}
              y={plotY(motion.peakHeight) - 15}
              textAnchor="middle"
              fill="currentColor"
              fontSize="16"
            >
              Apex
            </text>
            {arrows.map((arrow, index) => (
              <g className={arrow.className} key={arrow.name}>
                <defs>
                  <marker
                    id={`${id}-arrow-${index}`}
                    markerWidth="8"
                    markerHeight="8"
                    refX="7"
                    refY="4"
                    orient="auto"
                    markerUnits="userSpaceOnUse"
                  >
                    <path d="M 0 0 L 8 4 L 0 8 Z" fill="currentColor" />
                  </marker>
                </defs>
                {Math.hypot(arrow.dx, arrow.dy) > 0.01 ? (
                  <line
                    x1={pointX}
                    y1={pointY}
                    x2={pointX + arrow.dx}
                    y2={pointY + arrow.dy}
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeDasharray={arrow.dash}
                    markerEnd={`url(#${id}-arrow-${index})`}
                  />
                ) : null}
              </g>
            ))}
            <circle
              className="text-action"
              cx={pointX}
              cy={pointY}
              r="8"
              fill="currentColor"
              stroke="var(--color-background)"
              strokeWidth="2"
            />
            <text x="56" y="377" fill="currentColor" fontSize="16">
              Launch
            </text>
            <text
              x={Math.max(135, plotX(motion.range))}
              y="400"
              textAnchor="end"
              fill="currentColor"
              fontSize="16"
            >
              Landing
            </text>
          </svg>
          <figcaption className="text-muted space-y-2 text-sm">
            <p>
              Dots are equally spaced in time. Solid blue: total velocity. Long
              dashes: horizontal velocity. Dots on the vertical arrow: vertical
              velocity. The ring marks the apex.
            </p>
            <p>
              Both axes share the same distance scale, which adjusts to fit each
              trajectory. Velocity arrows use a separate scale.
            </p>
          </figcaption>
        </figure>
        <div className="min-w-0 space-y-6">
          <div className="space-y-2">
            <p>
              Launch speed: {katexify(`${speed}\\,\\mathrm{m\\,s^{-1}}`, false)}
            </p>
            <Slider
              label="Launch speed in meters per second"
              value={speed}
              onValueChange={setSpeed}
              min={5}
              max={50}
              step={1}
              valueText={`${speed} meters per second`}
            />
          </div>
          <div className="space-y-2">
            <p>Launch angle: {katexify(`${angle}^\\circ`, false)}</p>
            <Slider
              label="Launch angle above horizontal"
              value={angle}
              onValueChange={setAngle}
              min={0}
              max={90}
              step={1}
              valueText={`${angle} degrees`}
            />
          </div>
          <div className="space-y-2">
            <p>Launch height: {katexify(`${height}\\,\\mathrm{m}`, false)}</p>
            <Slider
              label="Launch height in meters"
              value={height}
              onValueChange={setHeight}
              min={0}
              max={30}
              step={1}
              valueText={`${height} meters`}
            />
          </div>
          <div className="space-y-2">
            <p>
              Inspect flight:{" "}
              {katexify(`t=${time.toFixed(2)}\\,\\mathrm{s}`, false)}
            </p>
            <Slider
              label="Position through the flight"
              value={progress}
              onValueChange={setProgress}
              min={0}
              max={100}
              step={1}
              valueText={`${progress} percent of flight, ${time.toFixed(2)} seconds`}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="secondary"
              onClick={() => {
                setProgress(
                  motion.flightTime === 0
                    ? 0
                    : (motion.peakTime / motion.flightTime) * 100
                );
              }}
            >
              Inspect apex
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setSpeed(20);
                setAngle(45);
                setHeight(0);
                setProgress(50);
              }}
            >
              Reset
            </Button>
          </div>
          <p className="text-muted text-sm">
            Constant gravity{" "}
            {katexify(`g=${GRAVITY}\\,\\mathrm{m\\,s^{-2}}`, false)}. Air
            resistance is ignored. Landing is at ground level. A horizontal
            launch from ground level has zero flight time in this model.
          </p>
        </div>
      </div>
      <dl
        className="border-border mt-6 grid gap-5 border-t pt-6 sm:grid-cols-3"
        aria-live="polite"
        aria-atomic="true"
      >
        {[
          { label: "Flight time", value: motion.flightTime, unit: "s" },
          { label: "Horizontal range", value: motion.range, unit: "m" },
          {
            label: "Maximum height above ground",
            value: motion.peakHeight,
            unit: "m",
          },
          {
            label: "Current horizontal position",
            value: position.x,
            unit: "m",
          },
          { label: "Current height", value: position.y, unit: "m" },
          {
            label: "Current vertical velocity",
            value: position.verticalVelocity,
            unit: "m\\,s^{-1}",
          },
        ].map((item) => (
          <div className="min-w-0 space-y-2" key={item.label}>
            <dt className="text-muted text-sm">{item.label}</dt>
            <dd className="overflow-x-auto text-lg">
              {katexify(
                `${item.value.toFixed(2)}\\,\\mathrm{${item.unit}}`,
                false
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
