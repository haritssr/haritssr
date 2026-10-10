"use client";
import { Slider } from "@base-ui/react/slider";
import { useId, useState } from "react";

import { SelectField as ExperimentSelect } from "@/components/SelectField";
import katexify from "@/utils/katexify";

import { DemoButton, TexPreview } from "../_katex-components/DemoControls";
import {
  evaluateFunction,
  getFunctionGraph,
  PIECEWISE_FUNCTIONS,
} from "./functions";

const FUNCTIONS = PIECEWISE_FUNCTIONS.map(({ label, value }) => ({
  label,
  value,
}));
const GRAPHS = PIECEWISE_FUNCTIONS.map(getFunctionGraph);

export default function PiecewiseDemo() {
  const labelId = useId();
  const [kind, setKind] = useState("absolute");
  const [x, setX] = useState(-1);
  const definition =
    PIECEWISE_FUNCTIONS.find((entry) => entry.value === kind) ??
    PIECEWISE_FUNCTIONS[0];
  const selected = evaluateFunction(definition, x);

  function reset() {
    setKind("absolute");
    setX(-1);
  }

  return (
    <div className="grid min-w-0 gap-6 sm:grid-cols-2">
      <div className="min-w-0 space-y-5">
        <ExperimentSelect
          label="Function"
          onValueChange={setKind}
          options={FUNCTIONS}
          value={kind}
        />
        <Slider.Root
          max={3}
          min={-3}
          onValueChange={setX}
          step={0.25}
          value={x}
        >
          <div className="text-foreground/80 mb-2 flex items-center justify-between gap-3 text-sm">
            <span id={labelId}>Input</span>
            <Slider.Value>{() => katexify(`x=${x}`, false)}</Slider.Value>
          </div>
          <Slider.Control className="relative flex h-8 w-full touch-none items-center">
            <Slider.Track className="bg-border relative h-2 flex-1 rounded-full">
              <Slider.Indicator className="bg-action absolute h-full rounded-full" />
              <Slider.Thumb
                aria-labelledby={labelId}
                className="has-focus-visible:outline-action border-border hover:border-action-hover block size-5 cursor-pointer rounded-full border bg-white outline-hidden has-focus-visible:outline-2 has-focus-visible:outline-offset-2"
              />
            </Slider.Track>
          </Slider.Control>
        </Slider.Root>
        <div className="border-border min-w-0 space-y-4 rounded-xl border p-4">
          <div>
            <h3 className="text-foreground/80 mb-2 text-sm font-medium">
              Active branch
            </h3>
            <div className="scrollbar-subtle overflow-x-auto">
              {katexify(selected.branch, false)}
            </div>
          </div>
          <div>
            <h3 className="text-foreground/80 mb-2 text-sm font-medium">
              Evaluated result
            </h3>
            <div className="scrollbar-subtle overflow-x-auto">
              {katexify(`f(${x})=${selected.result}`, false)}
            </div>
            <FunctionGraph kind={kind} result={selected.result} x={x} />
          </div>
        </div>
        <DemoButton onClick={reset}>Reset</DemoButton>
      </div>
      <TexPreview tex={selected.tex} />
    </div>
  );
}

const GRAPH_TICKS = [-3, -2, -1, 0, 1, 2, 3];
const GRAPH_START = 36;
const GRAPH_TOP = 24;
const GRAPH_SIZE = 248;
const GRAPH_END = GRAPH_START + GRAPH_SIZE;

function plotX(value: number) {
  return GRAPH_START + ((value + 3) / 6) * GRAPH_SIZE;
}

function plotY(value: number, extent: number) {
  return GRAPH_TOP + ((extent - value) / (2 * extent)) * GRAPH_SIZE;
}

function FunctionGraph({
  kind,
  result,
  x,
}: {
  kind: string;
  result: number;
  x: number;
}) {
  const titleId = useId();
  const descriptionId = useId();
  const graph =
    GRAPHS[PIECEWISE_FUNCTIONS.findIndex((entry) => entry.value === kind)] ??
    GRAPHS[0];
  const { endpoints, extent, segments, ticks } = graph;
  const yPosition = (value: number) => plotY(value, extent);

  return (
    <figure className="mt-4 min-w-0">
      <svg
        aria-labelledby={`${titleId} ${descriptionId}`}
        className="block h-auto w-full"
        viewBox="0 0 320 300"
      >
        <title id={titleId}>
          {`${FUNCTIONS.find((entry) => entry.value === kind)?.label} graph`}
        </title>
        <desc id={descriptionId}>
          The curve shows the selected function. The filled dark point marks the
          current input and evaluated result. Dashed guides connect it to the
          axes. Open circles exclude branch endpoints; filled circles include
          them.
        </desc>
        <g className="text-border" stroke="currentColor" strokeWidth={0.75}>
          {GRAPH_TICKS.map((tick) => (
            <g key={tick}>
              <line
                x1={plotX(tick)}
                x2={plotX(tick)}
                y1={yPosition(extent)}
                y2={yPosition(-extent)}
              />
            </g>
          ))}
          {ticks.map((tick) => (
            <line
              key={`y-${tick}`}
              x1={GRAPH_START}
              x2={GRAPH_END}
              y1={yPosition(tick)}
              y2={yPosition(tick)}
            />
          ))}
        </g>
        <g className="text-muted" stroke="currentColor">
          <line
            x1={GRAPH_START}
            x2={GRAPH_END}
            y1={yPosition(0)}
            y2={yPosition(0)}
          />
          <line
            x1={plotX(0)}
            x2={plotX(0)}
            y1={yPosition(extent)}
            y2={yPosition(-extent)}
          />
        </g>
        <g
          className="text-muted"
          fill="none"
          stroke="currentColor"
          strokeDasharray="4 4"
        >
          <path
            d={`M ${plotX(x)} ${yPosition(0)} V ${yPosition(result)} H ${plotX(0)}`}
          />
        </g>
        <g
          className="text-action"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
        >
          {segments.map((points) => {
            const coordinates = points
              .map((point) => `${plotX(point.x)},${yPosition(point.y)}`)
              .join(" ");
            return <polyline key={coordinates} points={coordinates} />;
          })}
          {endpoints.map((point) => (
            <circle
              className={point.included ? "fill-action" : "fill-background"}
              cx={plotX(point.x)}
              cy={yPosition(point.y)}
              key={`${point.x}:${point.y}`}
              r={point.included ? 3 : 4}
            />
          ))}
        </g>
        <circle
          className="fill-foreground stroke-background"
          cx={plotX(x)}
          cy={yPosition(result)}
          r={5}
          strokeWidth={2}
        />
        {GRAPH_TICKS.map((tick) => (
          <g key={tick}>
            <GraphLabel
              tex={String(tick)}
              x={plotX(tick) - 14}
              y={yPosition(0) + 6}
            />
          </g>
        ))}
        {ticks
          .filter((tick) => tick !== 0)
          .map((tick) => (
            <GraphLabel
              key={`y-${tick}`}
              tex={String(tick)}
              x={plotX(0) - 30}
              y={yPosition(tick) - 10}
            />
          ))}
        <GraphLabel tex="x" x={GRAPH_END + 6} y={yPosition(0) - 22} />
        <GraphLabel tex="f(x)" x={plotX(0) + 6} y={yPosition(extent) - 22} />
      </svg>
      <figcaption className="text-muted text-xs leading-relaxed">
        The dark point follows the input slider. Open circles exclude endpoints;
        filled circles include them. The vertical scale adjusts to the function.
      </figcaption>
    </figure>
  );
}

function GraphLabel({ tex, x, y }: { tex: string; x: number; y: number }) {
  return (
    <foreignObject height={20} width={28} x={x} y={y}>
      <span className="text-muted flex h-full items-center justify-center text-[10px]">
        {katexify(tex, false)}
      </span>
    </foreignObject>
  );
}
