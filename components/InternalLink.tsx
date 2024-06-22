import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export default function InternalLink({
	children,
	href,
}: { children: string; href: string }) {
	return (
		<Link
			passHref
			href={href}
			className="group inline-flex w-fit cursor-pointer items-center justify-start py-0.5 text-action hover:text-[#2563eb]/80 hover:underline"
		>
			<p className="flex items-center">
				{children}
				<ChevronRightIcon
					className="h-4 w-4 text-action -mb-[1.5px] group-hover:text-[#2563eb]/80  group-hover:text-blue-400"
					strokeWidth={2.25}
				/>
			</p>
		</Link>
	);
}
