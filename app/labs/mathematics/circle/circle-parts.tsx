import Box from "@/components/Box";
import Section from "@/components/Section";
import katexify from "@/utils/katexify";

const parts = [
  {
    id: "center",
    title: "Center (titik pusat)",
    description:
      "The fixed point inside the circle. Every point on the boundary is the same distance from this point.",
  },
  {
    id: "radius",
    title: "Radius (jari-jari)",
    description:
      "A line segment from the center to any point on the circle. All radii of the same circle have equal length.",
    tex: "r",
  },
  {
    id: "diameter",
    title: "Diameter (diameter)",
    description:
      "A chord that passes through the center. It is the longest chord and spans two radii.",
    tex: "d=2r",
  },
  {
    id: "chord",
    title: "Chord (tali busur)",
    description:
      "A straight line segment joining two points on the circle. A chord does not have to pass through the center.",
  },
  {
    id: "apothem",
    title: "Apothem (apotema)",
    description:
      "The perpendicular segment from the center to a chord. It meets the chord at its midpoint; the small square marks a right angle.",
    tex: String.raw`a^2+\left(\frac c2\right)^2=r^2`,
  },
  {
    id: "arc",
    title: "Circular arc (busur)",
    description:
      "A portion of the curved boundary between two points. The highlighted curve is a minor arc; the remaining, longer curve is the major arc.",
  },
  {
    id: "circumference",
    title: "Circumference (keliling)",
    description:
      "The length of the entire curved boundary. An arc is only part of this complete path around the circle.",
    tex: String.raw`C=2\pi r`,
  },
  {
    id: "sector",
    title: "Sector (juring)",
    description:
      "The region enclosed by two radii and their connecting arc. The shaded slice is a quarter of the disk.",
  },
  {
    id: "segment",
    title: "Circular segment (tembereng)",
    description:
      "The region between a chord and its connecting arc. The shaded cap is a minor segment, with a straight chord as its base.",
  },
  {
    id: "tangent",
    title: "Tangent (garis singgung)",
    description:
      "A straight line that touches the circle at exactly one point. It is perpendicular to the radius at the point of contact.",
  },
  {
    id: "angle",
    title: "Central angle (sudut pusat)",
    description:
      "An angle whose vertex is the center and whose sides are two radii. It selects the arc and sector between those radii.",
    tex: String.raw`\alpha=90^\circ`,
  },
] as const;

type CirclePart = (typeof parts)[number]["id"];

// Shared geometry keeps the chord, apothem, and segment illustrations aligned.
const CHORD_LEFT = 92.5;
const CHORD_RIGHT = 227.5;
const CHORD_Y = 70;
const QUARTER_ARC = "M244,120 A84,84 0 0 0 160,36";
const SEGMENT_ARC = `M${CHORD_LEFT},${CHORD_Y} A84,84 0 0 1 ${CHORD_RIGHT},${CHORD_Y}`;

function Chord({ muted = false }: { muted?: boolean }) {
  return (
    <line
      x1={CHORD_LEFT}
      y1={CHORD_Y}
      x2={CHORD_RIGHT}
      y2={CHORD_Y}
      stroke={muted ? "var(--color-muted)" : undefined}
      strokeWidth={muted ? 2 : undefined}
    />
  );
}

function Radii() {
  return <path d="M160,36 V120 H244" fill="none" />;
}

function Highlight({ part }: { part: CirclePart }) {
  switch (part) {
    case "center": {
      return (
        <>
          <circle cx="160" cy="120" r="15" fillOpacity="0.12" stroke="none" />
          <circle cx="160" cy="120" r="5" stroke="none" />
        </>
      );
    }
    case "radius": {
      return <path d="M160,120 H244" fill="none" />;
    }
    case "diameter": {
      return <path d="M76,120 H244" fill="none" />;
    }
    case "chord": {
      return <Chord />;
    }
    case "apothem": {
      return (
        <>
          <Chord muted />
          <path d="M160,120 V70" fill="none" />
          <path d="M160,82 H172 V70" fill="none" strokeWidth="2" />
        </>
      );
    }
    case "arc": {
      return <path d={QUARTER_ARC} fill="none" />;
    }
    case "circumference": {
      return <circle cx="160" cy="120" r="84" fill="none" />;
    }
    case "sector": {
      return <path d={`${QUARTER_ARC} L160,120 Z`} fillOpacity="0.16" />;
    }
    case "segment": {
      return <path d={`${SEGMENT_ARC} Z`} fillOpacity="0.16" />;
    }
    case "tangent": {
      return (
        <>
          <path
            d="M160,120 H244"
            fill="none"
            stroke="var(--color-muted)"
            strokeWidth="2"
            strokeDasharray="5 5"
          />
          <path d="M244,20 V220" fill="none" />
          <path d="M232,120 V108 H244" fill="none" strokeWidth="2" />
          <circle cx="244" cy="120" r="4" stroke="none" />
        </>
      );
    }
    case "angle": {
      return (
        <>
          <Radii />
          <path
            d="M185,120 A25,25 0 0 0 160,95 L160,120 Z"
            fillOpacity="0.16"
            strokeWidth="2"
          />
        </>
      );
    }
    default: {
      return null;
    }
  }
}

function PartDiagram({ part }: { part: CirclePart }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="mx-auto w-full max-w-xs"
      viewBox="0 0 320 240"
    >
      <circle
        cx="160"
        cy="120"
        r="84"
        fill="none"
        stroke="var(--color-border)"
        strokeWidth="2"
      />
      <circle cx="160" cy="120" r="3" fill="var(--color-muted)" />
      <g
        stroke="var(--color-action)"
        fill="var(--color-action)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Highlight part={part} />
      </g>
    </svg>
  );
}

export default function CircleParts() {
  return (
    <Section
      title="Parts of a circle"
      id="circle-parts"
      description={
        <>
          Compare each part using the same circle. Blue highlights the point,
          line, curve, angle, or region being described; gray gives context.
          English and Indonesian names are shown together.
        </>
      }
      contentClassName="grid min-w-0 gap-5 sm:grid-cols-2 xl:grid-cols-3"
    >
      {parts.map((part) => (
        <Box key={part.id} title={part.title}>
          <figure className="min-w-0 space-y-3">
            <PartDiagram part={part.id} />
            <figcaption className="text-muted text-sm leading-7">
              {part.description}
            </figcaption>
          </figure>
          {"tex" in part ? (
            <div className="max-w-full overflow-x-auto py-1 text-sm">
              {katexify(part.tex, true)}
            </div>
          ) : null}
          {part.id === "apothem" ? (
            <p className="text-muted text-sm leading-7">
              Here {katexify("a", false)} is the apothem length and{" "}
              {katexify("c", false)} is the chord length.
            </p>
          ) : null}
        </Box>
      ))}
    </Section>
  );
}
