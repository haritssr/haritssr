import katexify from "@/utils/katexify";

export default function UnitCircleDiagram({
  radians,
  real,
  imaginary,
}: {
  radians: number;
  real: number;
  imaginary: number;
}) {
  const x = 200 + 132 * real;
  const y = 200 - 132 * imaginary;
  // A sampled arc also handles a full turn, whose endpoints coincide.
  const arc = Array.from({ length: 91 }, (_, index) => {
    const theta = (radians * index) / 90;
    return `${index === 0 ? "M" : "L"}${(200 + 132 * Math.cos(theta)).toFixed(2)},${(200 - 132 * Math.sin(theta)).toFixed(2)}`;
  }).join(" ");

  return (
    <figure className="w-full min-w-0 p-5 sm:p-6">
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
        <line stroke="var(--color-muted)" x1="35" x2="365" y1="200" y2="200" />
        <line stroke="var(--color-muted)" x1="200" x2="200" y1="35" y2="365" />
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
        The point stays one unit from the origin. The highlighted arc traces the
        counterclockwise rotation from the positive real axis.
      </figcaption>
    </figure>
  );
}
