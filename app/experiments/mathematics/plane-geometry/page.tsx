import ExperimentPageHeader from "@/components/ExperimentPageHeader";
import PageDescription from "@/components/PageDescription";
import Section from "@/components/Section";
import Table from "@/components/Table";
import { getExperimentMetadata } from "@/data/ExperimentsData";
import katexify from "@/utils/katexify";

export const metadata = getExperimentMetadata("mathematics", "plane-geometry");

const shapes = [
  {
    name: "Square",
    path: "M25 10H75V60H25Z",
    area: "s^2",
    perimeter: "4s",
    measurements: String.raw`s:\text{ side length}`,
    note: "Four equal sides and four right angles.",
  },
  {
    name: "Rectangle",
    path: "M10 15H90V55H10Z",
    area: "lw",
    perimeter: "2(l+w)",
    measurements: String.raw`l:\text{ length},\quad w:\text{ width}`,
    note: "Opposite sides are equal; all angles are right angles.",
  },
  {
    name: "Triangle",
    path: "M10 60L35 10L90 60Z",
    area: String.raw`\frac12 bh`,
    perimeter: "a+b+c",
    measurements: String.raw`a,b,c:\text{ sides};\quad h:\text{ height to base }b`,
    note: "Height is perpendicular to the chosen base, even when it falls outside the triangle.",
  },
  {
    name: "Right triangle",
    path: "M15 10V60H85Z",
    area: String.raw`\frac12 ab`,
    perimeter: String.raw`a+b+\sqrt{a^2+b^2}`,
    measurements: String.raw`a,b:\text{ perpendicular legs}`,
    note: "The longest side is the hypotenuse.",
  },
  {
    name: "Equilateral triangle",
    path: "M15 63L50 2L85 63Z",
    area: String.raw`\frac{\sqrt3}{4}s^2`,
    perimeter: "3s",
    measurements: String.raw`s:\text{ side length}`,
    note: "All three sides and all three angles are equal.",
  },
  {
    name: "Parallelogram",
    path: "M10 55L30 15H90L70 55Z",
    area: "bh",
    perimeter: "2(a+b)",
    measurements: String.raw`a,b:\text{ adjacent sides};\quad h:\text{ height to }b`,
    note: "Use perpendicular height, not the slanted side, for area.",
  },
  {
    name: "Rhombus",
    path: "M5 35L50 5L95 35L50 65Z",
    area: String.raw`\frac12 d_1d_2`,
    perimeter: "4s",
    measurements: String.raw`d_1,d_2:\text{ diagonals};\quad s:\text{ side}`,
    note: "All sides are equal; the diagonals meet at right angles.",
  },
  {
    name: "Kite",
    path: "M50 5L80 25L50 65L20 25Z",
    area: String.raw`\frac12 d_1d_2`,
    perimeter: "2(a+b)",
    measurements: String.raw`d_1,d_2:\text{ diagonals};\quad a,b:\text{ distinct side lengths}`,
    note: "A convex kite has two pairs of equal adjacent sides and perpendicular diagonals.",
  },
  {
    name: "Trapezoid (trapezium)",
    path: "M10 55L30 15H70L90 55Z",
    area: String.raw`\frac12(a+b)h`,
    perimeter: "a+b+c+d",
    measurements: String.raw`a,b:\text{ parallel bases};\quad c,d:\text{ legs};\quad h:\text{ height}`,
    note: "Height is the perpendicular distance between the parallel bases.",
  },
  {
    name: "Circle",
    path: "M80 35A30 30 0 1 1 20 35A30 30 0 1 1 80 35Z",
    area: String.raw`\pi r^2`,
    perimeter: String.raw`2\pi r`,
    measurements: String.raw`r:\text{ radius}`,
    note: "The perimeter of a circle is called its circumference.",
  },
  {
    name: "Semicircle",
    path: "M15 55A35 35 0 0 1 85 55Z",
    area: String.raw`\frac12\pi r^2`,
    perimeter: String.raw`\pi r+2r`,
    measurements: String.raw`r:\text{ radius}`,
    note: "Perimeter includes the curved arc and the straight diameter.",
  },
  {
    name: "Regular polygon",
    path: "M30 5H70L90 35L70 65H30L10 35Z",
    area: String.raw`\frac12 nst`,
    perimeter: "ns",
    measurements: String.raw`n:\text{ sides};\quad s:\text{ side length};\quad t:\text{ apothem}`,
    note: "All sides and angles are equal. The apothem runs from the center perpendicular to a side; the sketch is a hexagon.",
  },
];

export default function PlaneGeometryPage() {
  return (
    <div className="text-foreground min-w-0 pb-24">
      <ExperimentPageHeader>
        <PageDescription>
          Find area and perimeter formulas for plane shapes.
        </PageDescription>
      </ExperimentPageHeader>
      <div className="space-y-20">
        <Section id="shape-formulas" title="Area and perimeter at a glance">
          <Table className="min-w-240">
            <caption className="sr-only">
              Plane shapes, area and perimeter formulas, measurements, and
              properties
            </caption>
            <thead>
              <tr className="divide-border bg-foreground/5 divide-x">
                {[
                  "No",
                  "Shape",
                  "Area",
                  "Perimeter",
                  "Measurements and properties",
                ].map((heading) => (
                  <th
                    aria-label={heading}
                    className="px-4 py-3 text-left font-medium"
                    key={heading}
                    scope="col"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {shapes.map((shape, index) => (
                <tr
                  className="divide-border hover:bg-interface-hover divide-x"
                  key={shape.name}
                >
                  <td className="text-muted px-4 py-4 text-right align-top tabular-nums">
                    {index + 1}
                  </td>
                  <th
                    aria-label={shape.name}
                    className="px-4 py-4 text-left align-top font-medium"
                    scope="row"
                  >
                    <div className="space-y-3">
                      <span>{shape.name}</span>
                      <svg
                        aria-hidden="true"
                        className="text-action h-16 w-24"
                        viewBox="0 0 100 70"
                        fill="none"
                      >
                        <path
                          d={shape.path}
                          fill="currentColor"
                          fillOpacity="0.08"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </th>
                  <td className="px-4 py-4 align-top whitespace-nowrap">
                    {katexify(shape.area, false)}
                  </td>
                  <td className="px-4 py-4 align-top whitespace-nowrap">
                    {katexify(shape.perimeter, false)}
                  </td>
                  <td
                    aria-label={`Measurements and properties of ${shape.name.toLowerCase()}`}
                    className="px-4 py-4 align-top"
                  >
                    <div className="space-y-3">
                      <div className="whitespace-nowrap">
                        {katexify(shape.measurements, false)}
                      </div>
                      <p className="text-muted min-w-64">{shape.note}</p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Section>
        <Section
          id="using-the-formulas"
          title="Use consistent measurements"
          contentClassName="text-muted max-w-3xl space-y-5"
        >
          <p>
            Convert all lengths to the same unit before substituting. Perimeter
            uses length units such as centimeters; area uses square units such
            as {katexify(String.raw`\mathrm{cm}^2`, false)}. All lengths are
            positive, and the polygon formulas assume simple, nondegenerate
            shapes.
          </p>
          <p>
            For a rectangle with {katexify(String.raw`l=8\,\mathrm{cm}`, false)}{" "}
            and {katexify(String.raw`w=3\,\mathrm{cm}`, false)}:
          </p>
          <div className="border-border overflow-x-auto rounded-md border px-5 py-4">
            {katexify(
              String.raw`A=8\cdot3=24\,\mathrm{cm}^2,\qquad P=2(8+3)=22\,\mathrm{cm}`,
              true
            )}
          </div>
          <p>
            Keep {katexify(String.raw`\pi`, false)} and square roots exact until
            the final step. For a composite shape, add nonoverlapping areas or
            subtract cutouts. Count only the exposed boundary when finding its
            perimeter.
          </p>
        </Section>
      </div>
    </div>
  );
}
