import Image from "next/image";

const LOGOS = [
  {
    alt: "haritssr.com logo",
    name: "Harits Syah",
    src: "/icons/haritssr.svg",
    url: "haritssr.com",
  },
  {
    alt: "Haris Lab logo",
    name: "Haris Lab",
    src: "/icons/harislab.svg",
    url: "harislab.com",
  },
  {
    alt: "Haris Studio logo",
    name: "Haris Studio",
    src: "/icons/harisstudio.svg",
    url: "harisstudio.com",
  },
] as const;

export default function LogoDemo() {
  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
      {LOGOS.map((logo) => (
        <div className="space-y-2 text-center" key={logo.name}>
          <Image
            alt={logo.alt}
            className="mx-auto h-10 w-10"
            height={40}
            src={logo.src}
            width={40}
          />
          <div className="flex flex-col">
            <span className="text-foreground/90 text-sm sm:text-base">
              {logo.name}
            </span>
            <span className="text-muted text-sm sm:text-base">{logo.url}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
