const PLOT = { left: 54, top: 20, width: 568, height: 278 };

export interface PlotRange {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

export function graphX(x: number, range: PlotRange): number {
  return (
    PLOT.left + ((x - range.xMin) / (range.xMax - range.xMin)) * PLOT.width
  );
}

export function graphY(y: number, range: PlotRange): number {
  return (
    PLOT.top + ((range.yMax - y) / (range.yMax - range.yMin)) * PLOT.height
  );
}

export function graphPath(
  from: number,
  to: number,
  valueAt: (x: number) => number,
  range: PlotRange
): string {
  const steps = 120;
  return Array.from({ length: steps + 1 }, (_, index) => {
    const x = from + ((to - from) * index) / steps;
    const command = index === 0 ? "M" : "L";
    return `${command}${graphX(x, range).toFixed(1)},${graphY(valueAt(x), range).toFixed(1)}`;
  }).join(" ");
}

export function GraphAxes({ range }: { range: PlotRange }) {
  const xTicks = Array.from(
    { length: Math.floor(range.xMax) - Math.ceil(range.xMin) + 1 },
    (_, index) => Math.ceil(range.xMin) + index
  );
  const yTicks = Array.from(
    { length: Math.floor(range.yMax / 2) - Math.ceil(range.yMin / 2) + 1 },
    (_, index) => (Math.ceil(range.yMin / 2) + index) * 2
  );

  return (
    <g>
      {xTicks.map((tick) => (
        <line
          key={`x-${tick}`}
          stroke={tick === 0 ? "#a1a1aa" : "#e4e4e7"}
          strokeWidth={tick === 0 ? 1.5 : 1}
          x1={graphX(tick, range)}
          x2={graphX(tick, range)}
          y1={PLOT.top}
          y2={PLOT.top + PLOT.height}
        />
      ))}
      {yTicks.map((tick) => (
        <line
          key={`y-${tick}`}
          stroke={tick === 0 ? "#a1a1aa" : "#e4e4e7"}
          strokeWidth={tick === 0 ? 1.5 : 1}
          x1={PLOT.left}
          x2={PLOT.left + PLOT.width}
          y1={graphY(tick, range)}
          y2={graphY(tick, range)}
        />
      ))}
    </g>
  );
}
