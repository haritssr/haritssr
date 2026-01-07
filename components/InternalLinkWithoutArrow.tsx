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
      className={`cursor-pointer text-action hover:underline ${block ? "block" : "inline"}`}
      href={href}
    >
      <p className="inline truncate">{name}</p>
    </Link>
  );
}
