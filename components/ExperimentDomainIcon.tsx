import Image from "next/image";
import type { CSSProperties } from "react";

const monochromeIcons = new Set(["/icons/nextjs.svg", "/icons/radixui.svg"]);
const scienceIconColors = new Map([
  ["/icons/physics.svg", "text-amber-500"],
  ["/icons/math.svg", "text-pink-500"],
]);

export default function ExperimentDomainIcon({
  src,
  size = 18,
  variant = "default",
}: {
  src: string;
  size?: 18 | 36;
  variant?: "default" | "muted";
}) {
  const scienceIconColor = scienceIconColors.get(src);

  if (
    variant === "muted" ||
    monochromeIcons.has(src) ||
    scienceIconColor !== undefined
  ) {
    const maskStyle: CSSProperties & { "--icon-mask": string } = {
      "--icon-mask": `url("${src}")`,
    };

    return (
      <span
        aria-hidden="true"
        className={`inline-block shrink-0 bg-current mask-(--icon-mask) mask-contain mask-center mask-no-repeat ${size === 36 ? "size-9" : "size-4.5"} ${variant === "muted" ? "text-muted" : (scienceIconColor ?? "text-foreground")}`}
        style={maskStyle}
      />
    );
  }

  return (
    <Image
      alt=""
      aria-hidden="true"
      className="shrink-0 object-contain"
      height={size}
      src={src}
      width={size}
    />
  );
}
