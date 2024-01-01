import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function BackButton({ name, href }: { name: string; href: string }) {
	return (
		<Link passHref href={href} className="block">
			<span className=" inline-block w-full">
				<span className="group flex items-center">
					<ChevronLeftIcon className="-ml-2 h-5 w-5 pt-[1px] text-action sm:group-hover:text-[#2563eb]/80" strokeWidth={2} />
					<span className="-ml-0.5 block truncate text-action sm:group-hover:text-[#2563eb]/80 hover:underline">{name}</span>
				</span>
			</span>
		</Link>
	);
}
