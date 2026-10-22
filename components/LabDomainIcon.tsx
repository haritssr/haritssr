import Image from "next/image";
import type { CSSProperties } from "react";

const monochromeIcons = new Set(["/icons/nextjs.svg", "/icons/radixui.svg"]);
const domainIconColors = new Map([
  ["/icons/physics.svg", "text-green-600"],
  ["/icons/math.svg", "text-violet-500"],
  ["/icons/browser.svg", "text-teal-600"],
  ["/icons/user-interface.svg", "text-rose-500"],
]);

export default function LabDomainIcon({
  className = "size-5",
  src,
  variant = "default",
}: {
  className?: string;
  src: string;
  variant?: "default" | "muted";
}) {
  const domainIconColor = domainIconColors.get(src);

  if (
    variant === "muted" ||
    monochromeIcons.has(src) ||
    domainIconColor !== undefined
  ) {
    const maskStyle: CSSProperties & { "--icon-mask": string } = {
      "--icon-mask": `url("${src}")`,
    };

    return (
      <span
        aria-hidden="true"
        className={`inline-block shrink-0 bg-current mask-(--icon-mask) mask-contain mask-center mask-no-repeat ${className} ${variant === "muted" ? "text-muted" : (domainIconColor ?? "text-foreground")}`}
        style={maskStyle}
      />
    );
  }

  return (
    <Image
      alt=""
      aria-hidden="true"
      className={`shrink-0 object-contain ${className}`}
      height={32}
      src={src}
      width={32}
    />
  );
}
