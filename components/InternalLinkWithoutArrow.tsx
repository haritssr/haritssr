import Link from "next/link";

export default function InternalLinkWithoutArrow({
  name,
  href,
  block,
}: {
  name: string;
  href: string;
  block?: boolean;
}) {
  return (
    <Link
      className={`text-action cursor-pointer hover:underline ${block === true ? "block" : "inline"}`}
      href={href}
      prefetch={false}
    >
      <p className="inline truncate">{name}</p>
    </Link>
  );
}
