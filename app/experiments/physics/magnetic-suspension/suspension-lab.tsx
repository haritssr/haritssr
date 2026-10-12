"use client";

import { useId, useState } from "react";

import Button from "@/components/Button";
import Slider from "@/components/Slider";
import katexify from "@/utils/katexify";

export default function SuspensionLab() {
  const [mass, setMass] = useState(20);
  const [angle, setAngle] = useState(60);
  const [ratio, setRatio] = useState(1);
  const id = useId();
  const radians = (angle * Math.PI) / 180;
  const weight = (mass / 1000) * 9.81;
  const tension = weight * ratio;
  const horizontal = tension * Math.cos(radians);
  const vertical = weight + tension * Math.sin(radians);
  const magnetic = Math.hypot(horizontal, vertical);
  const scale = 125 / magnetic;
  const anchorX = 250 + 190 * Math.cos(radians);
  const anchorY = 190 + 190 * Math.sin(radians);
  const forces = [
    {
      name: "Magnetic attraction",
      x: -horizontal,
      y: -vertical,
      dash: undefined,
      className: "text-action",
    },
    {
      name: "String tension",
      x: horizontal,
      y: tension * Math.sin(radians),
      dash: "7 4",
      className: "text-foreground",
    },
    { name: "Gravity", x: 0, y: weight, dash: "2 4", className: "text-muted" },
  ];

  return (
    <div className="border-border rounded-2xl border p-4 sm:p-6">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <figure className="min-w-0 space-y-3">
          <svg
            className="text-foreground h-auto w-full"
            viewBox="0 0 500 430"
            aria-labelledby={`${id}-title ${id}-description`}
          >
            <title id={`${id}-title`}>Forces on the tethered weight</title>
            <desc id={`${id}-description`}>
              Magnetic attraction points upward and left. Gravity points down.
              Tension points down and right along the string to the lower
              anchor. All three forces sum to zero.
            </desc>
            <line
              x1="250"
              y1="190"
              x2={anchorX}
              y2={anchorY}
              stroke="currentColor"
              opacity="0.25"
              strokeWidth="2"
            />
            <line
              x1="250"
              y1="190"
              x2="460"
              y2="190"
              stroke="currentColor"
              opacity="0.25"
              strokeDasharray="3 5"
            />
            <path
              d={`M 300 190 A 50 50 0 0 1 ${250 + 50 * Math.cos(radians)} ${190 + 50 * Math.sin(radians)}`}
              fill="none"
              stroke="currentColor"
              opacity="0.5"
            />
            <text x="375" y="179" fill="currentColor" fontSize="13">
              Horizontal
            </text>
            <circle cx={anchorX} cy={anchorY} r="6" fill="currentColor" />
            <text
              x={anchorX}
              y={anchorY + 25}
              textAnchor="middle"
              fill="currentColor"
              fontSize="14"
            >
              Lower anchor
            </text>
            {forces.map((force, index) => (
              <g key={force.name} className={force.className}>
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
                <line
                  x1="250"
                  y1="190"
                  x2={250 + force.x * scale}
                  y2={190 + force.y * scale}
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={force.dash}
                  markerEnd={`url(#${id}-arrow-${index})`}
                />
              </g>
            ))}
            <circle cx="250" cy="190" r="9" fill="currentColor" />
            <text
              x="230"
              y="198"
              textAnchor="end"
              fill="currentColor"
              fontSize="14"
            >
              Weight
            </text>
            <text
              x={250 - horizontal * scale}
              y={170 - vertical * scale}
              textAnchor="middle"
              fill="currentColor"
              className="text-action"
              fontSize="14"
            >
              Magnetic pull
            </text>
          </svg>
          <figcaption className="text-muted text-sm">
            Solid blue: magnetic attraction. Long dashes: tension. Dots:
            gravity. Arrow lengths share a scale within each diagram; the scale
            resets when inputs change. The faint line shows the string, not a
            field line.
          </figcaption>
        </figure>
        <div className="min-w-0 space-y-6">
          <div className="space-y-2">
            <p>Mass: {katexify(`${mass}\\,\\mathrm{g}`, false)}</p>
            <Slider
              label="Mass in grams"
              value={mass}
              onValueChange={setMass}
              min={5}
              max={100}
              step={5}
              valueText={`${mass} grams`}
            />
          </div>
          <div className="space-y-2">
            <p>
              String angle below horizontal:{" "}
              {katexify(`${angle}^\\circ`, false)}
            </p>
            <Slider
              label="String angle below horizontal"
              value={angle}
              onValueChange={setAngle}
              min={15}
              max={80}
              step={1}
              valueText={`${angle} degrees`}
            />
          </div>
          <div className="space-y-2">
            <p>
              Tension relative to weight:{" "}
              {katexify(`T/(mg)=${ratio.toFixed(1)}`, false)}
            </p>
            <Slider
              label="Tension divided by weight"
              value={ratio}
              onValueChange={setRatio}
              min={0.2}
              max={3}
              step={0.1}
              valueText={`${ratio.toFixed(1)} times the weight`}
            />
          </div>
          <Button
            variant="secondary"
            onClick={() => {
              setMass(20);
              setAngle(60);
              setRatio(1);
            }}
          >
            Reset example
          </Button>
          <p className="text-muted text-sm">
            This calculates the pull needed for a chosen configuration. It does
            not simulate a particular magnet or predict a stable hanging
            position. The angle arc is measured from the horizontal to the
            string.
          </p>
        </div>
      </div>
      <dl
        className="border-border mt-6 grid gap-5 border-t pt-6 sm:grid-cols-3"
        aria-live="polite"
        aria-atomic="true"
      >
        {[
          { label: "Weight", value: weight },
          { label: "String tension", value: tension },
          { label: "Required magnetic pull", value: magnetic },
        ].map((item) => (
          <div className="min-w-0 space-y-2" key={item.label}>
            <dt className="text-muted text-sm">{item.label}</dt>
            <dd className="overflow-x-auto text-lg">
              {katexify(`${item.value.toFixed(4)}\\,\\mathrm{N}`, false)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
