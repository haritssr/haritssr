import Image from "next/image";
import type { CSSProperties } from "react";

const monochromeIcons = new Set(["/icons/nextjs.svg", "/icons/radixui.svg"]);
const domainIconColors = new Map([
  ["/icons/physics.svg", "text-green-600"],
  ["/icons/math.svg", "text-violet-500"],
  ["/icons/browser.svg", "text-amber-500"],
  ["/icons/user-interface.svg", "text-pink-500"],
]);

export default function LabDomainIcon({
  src,
  size = 18,
  variant = "default",
}: {
  src: string;
  size?: 18 | 36;
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
        className={`inline-block shrink-0 bg-current mask-(--icon-mask) mask-contain mask-center mask-no-repeat ${size === 36 ? "size-9" : "size-4.5"} ${variant === "muted" ? "text-muted" : (domainIconColor ?? "text-foreground")}`}
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
