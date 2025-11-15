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
			href={href}
			className={`cursor-pointer text-blue-500 hover:underline ${
				block ? "block" : "inline"
			}`}
		>
			<p className="truncate inline">{name}</p>
		</Link>
	);
}
