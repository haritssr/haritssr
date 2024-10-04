import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export default function InternalLink({
	children,
	href,
	lg,
}: { children: string; href: string; lg?: boolean }) {
	return (
		<Link
			passHref
			href={href}
			className={`group inline-flex w-fit cursor-pointer items-center justify-start py-0.5 text-blue-500 hover:text-blue-400 ${
				lg ? "text-lg" : "text-normal"
			}`}
		>
			<p className="flex items-center">
				{children}
				<ChevronRightIcon
					className={`${
						lg ? "h-[18px] w-[18px]" : "h-4 w-4"
					} text-blue-500 -mb-[1.5px]  group-hover:text-blue-400`}
					strokeWidth={2.25}
				/>
			</p>
		</Link>
	);
}
