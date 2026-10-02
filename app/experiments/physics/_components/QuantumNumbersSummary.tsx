import katexify from "@/utils/katexify";

import { getLastElectronQuantumNumbers } from "../_lib/electron-configuration";

const SUBSHELLS = ["s", "p", "d", "f"] as const;

function formatQuantumNumberTuple(
  principalNumber: number,
  azimuthalNumber: number,
  magneticNumber: number,
  spin: "+1/2" | "-1/2"
): string {
  const formattedMagneticNumber =
    magneticNumber > 0 ? `+${magneticNumber}` : String(magneticNumber);
  const formattedSpin = spin === "+1/2" ? "+\\frac{1}{2}" : "-\\frac{1}{2}";

  return `(${principalNumber}, ${azimuthalNumber}, ${formattedMagneticNumber}, ${formattedSpin})`;
}

function getQuantumNumberState(atomicNumber: number) {
  const quantumNumbers = getLastElectronQuantumNumbers(atomicNumber);

  return {
    ...quantumNumbers,
    subshell: SUBSHELLS[quantumNumbers.azimuthalNumber] ?? SUBSHELLS[0],
  };
}

export function QuantumNumbersSummary({
  atomicNumber,
}: {
  atomicNumber: number;
}) {
  const { azimuthalNumber, magneticNumber, principalNumber, spin, subshell } =
    getQuantumNumberState(atomicNumber);

  return (
    <section aria-labelledby="quantum-number-title">
      <h3
        className="text-foreground/70 text-xs font-medium"
        id="quantum-number-title"
      >
        One possible last-electron state
      </h3>
      <div className="mt-3 flex flex-wrap items-end gap-x-6 gap-y-3">
        <div>
          <span className="text-foreground/70 block text-xs">
            Selected state
          </span>
          <span className="mt-1 block text-2xl font-semibold">
            {katexify(
              `${principalNumber}${subshell}^{${spin === "+1/2" ? String.raw`\uparrow` : String.raw`\downarrow`}}`,
              false
            )}
          </span>
        </div>
        <div>
          <span className="text-foreground/70 block text-xs">
            {katexify(String.raw`(n,\ell,m_l,m_s)`, false)}
          </span>
          <span className="mt-1 block text-lg">
            {katexify(
              formatQuantumNumberTuple(
                principalNumber,
                azimuthalNumber,
                magneticNumber,
                spin
              ),
              false
            )}
          </span>
        </div>
      </div>
      <p className="text-muted mt-2 text-xs leading-5">
        Degenerate orbitals have no unique filling order; this tuple uses one
        conventional assignment.
      </p>
    </section>
  );
}
