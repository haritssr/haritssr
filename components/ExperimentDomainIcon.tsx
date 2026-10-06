import Image from "next/image";
import type { CSSProperties } from "react";

const monochromeIcons = new Set(["/icons/nextjs.svg", "/icons/radixui.svg"]);
const scienceIcons = new Set(["/icons/physics.svg", "/icons/math.svg"]);

export default function ExperimentDomainIcon({
  src,
  size = 18,
}: {
  src: string;
  size?: 18 | 36;
}) {
  if (monochromeIcons.has(src) || scienceIcons.has(src)) {
    const maskStyle: CSSProperties & { "--icon-mask": string } = {
      "--icon-mask": `url("${src}")`,
    };

    return (
      <span
        aria-hidden="true"
        className={`inline-block shrink-0 bg-current [mask-image:var(--icon-mask)] [mask-size:contain] [mask-position:center] [mask-repeat:no-repeat] ${size === 36 ? "size-9" : "size-4.5"} ${scienceIcons.has(src) ? "text-action" : "text-foreground"}`}
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
