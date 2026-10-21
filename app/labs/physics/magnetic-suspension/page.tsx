import { getLabMetadata } from "@/app/labs/data";
import ExternalLink from "@/components/ExternalLink";

import "katex/dist/katex.min.css";
import LabPageHeader from "@/components/LabPageHeader";
import PageDescription from "@/components/PageDescription";
import Section from "@/components/Section";
import katexify from "@/utils/katexify";

import SuspensionLab from "./suspension-lab";

export const metadata = getLabMetadata("physics", "magnetic-suspension");

export default function MagneticSuspensionPage() {
  return (
    <div className="pb-24">
      <LabPageHeader>
        <PageDescription>
          Balance magnetism, tension, and gravity.
        </PageDescription>
      </LabPageHeader>
      <div className="space-y-20">
        <Section
          id="read-the-setup"
          title="Read the setup"
          contentClassName="max-w-3xl space-y-5"
        >
          <p>
            In the supplied image, a small object sits below and to the right of
            an apparent magnet on a stand. A visible string connects the object
            to an anchor farther down and to the right. Assuming the object is
            stationary and magnetically attracted, three forces explain its
            suspension.
          </p>
          <ul className="list-disc space-y-3 pl-5">
            <li>Gravity pulls vertically downward.</li>
            <li>
              The taut string pulls toward the lower anchor: downward and
              rightward.
            </li>
            <li>
              Magnetic attraction supplies the upward and leftward force needed
              to balance both.
            </li>
          </ul>
          <p>
            “Invisible magnetic field lines” are a way to visualize a field, not
            physical threads holding the object. Here the real string constrains
            the motion and prevents the object from simply moving toward the
            magnet. The image alone does not reveal its mass, composition, or
            magnetic properties.
          </p>
        </Section>
        <Section
          id="force-balance-lab"
          title="Find the required magnetic pull"
          description="Change the mass, string angle, and tension to calculate the magnetic force required for equilibrium."
        >
          <SuspensionLab />
        </Section>
        <Section
          id="balance-equations"
          title="Resolve the three forces"
          contentClassName="max-w-3xl space-y-5"
        >
          <p>
            Treat the object as a particle and the string as massless. Take
            right as positive {katexify("x", false)} and up as positive{" "}
            {katexify("y", false)}. The angle {katexify("\\theta", false)} is
            measured below the rightward horizontal, along the string toward the
            anchor. Let {katexify("T", false)} be the tension and{" "}
            {katexify("m", false)} the mass.
          </p>
          <p>
            For static equilibrium, the vector sum of all forces is zero. By
            Newton’s second law, the object has zero acceleration:
          </p>
          <div className="overflow-x-auto">
            {katexify(
              "{\\textstyle\\sum} \\mathbf F=m\\mathbf a=\\mathbf 0",
              true
            )}
            {katexify(
              "\\mathbf F_{\\mathrm{mag}}+\\mathbf T+m\\mathbf g=\\mathbf 0",
              true
            )}
            {katexify(
              "F_{\\mathrm{mag},x}=-T\\cos\\theta,\\qquad F_{\\mathrm{mag},y}=mg+T\\sin\\theta",
              true
            )}
            {katexify(
              "F_{\\mathrm{mag}}=\\sqrt{(T\\cos\\theta)^2+(mg+T\\sin\\theta)^2}",
              true
            )}
          </div>
          <p>
            The magnetic force must lift more than the weight alone because the
            string also pulls downward. The string angle alone cannot determine
            tension or magnetic force; another measurement or a magnetic-field
            model is needed.
          </p>
          <p>
            At the lab defaults, {katexify("m=20\\,\\mathrm{g}", false)},{" "}
            {katexify("T=mg=0.1962\\,\\mathrm{N}", false)}, and{" "}
            {katexify("\\theta=60^\\circ", false)}. The required horizontal
            component is {katexify("-0.0981\\,\\mathrm{N}", false)}, the upward
            component is {katexify("0.3661\\,\\mathrm{N}", false)}, and the
            total magnetic pull is approximately{" "}
            {katexify("0.3790\\,\\mathrm{N}", false)}. These are illustrative
            values, not measurements from the image.
          </p>
        </Section>
        <Section
          id="magnetic-field"
          title="What the magnetic field actually does"
          contentClassName="max-w-3xl space-y-5"
        >
          <p>
            A magnet can attract a ferromagnetic object by magnetizing it. A
            small permanent magnet also experiences a force in a nonuniform
            external field. In the fixed magnetic dipole approximation, the
            potential energy and force are
          </p>
          <div className="overflow-x-auto">
            {katexify(
              "U=-\\boldsymbol\\mu\\cdot\\mathbf B,\\qquad \\mathbf F=\\nabla(\\boldsymbol\\mu\\cdot\\mathbf B)",
              true
            )}
          </div>
          <p>
            Here {katexify("\\boldsymbol\\mu", false)} is the magnetic dipole
            moment and {katexify("\\mathbf B", false)} is the external magnetic
            field. Spatial variation matters: a uniform field can exert a
            turning effect on a fixed dipole but produces no net translational
            force. A force arrow therefore need not follow a field line.
          </p>
          <p>
            An extended steel object can have induced, nonuniform magnetization;
            predicting its pull needs its geometry and material response as well
            as the nearby field. The particle calculation above only gives the
            force that would be required, not the force a particular magnet can
            supply.
          </p>
          <ExternalLink
            href="https://www.feynmanlectures.caltech.edu/II_15.html#Ch15-S2"
            name="Feynman Lectures: forces on a current loop and energy of a dipole"
          />
        </Section>
        <Section
          id="stability"
          title="Balance is only the first condition"
          contentClassName="max-w-3xl space-y-5"
        >
          <p>
            Zero net force means no acceleration at that instant. Stable
            suspension also needs a restoring response to small displacements
            allowed by the string. That depends on how the magnetic force
            changes with position. The extended object must also have zero net
            torque; its tilt is not determined by the particle model.
          </p>
          <ul className="list-disc space-y-3 pl-5">
            <li>
              Remove the magnet: gravity and the lower string cannot maintain
              the pictured position.
            </li>
            <li>
              Cut a taut string: at the initial instant, the remaining force
              points opposite to the former tension, upward and leftward.
            </li>
            <li>
              Move the magnet: the object may shift, lose tension, or reach the
              magnet, depending on the new field and geometry.
            </li>
          </ul>
          <p>
            This is tethered magnetic suspension. Demonstrating a stable
            position requires more information than a still image or a force
            balance alone.
          </p>
        </Section>
      </div>
    </div>
  );
}
