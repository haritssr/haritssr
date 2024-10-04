import Link from "next/link";
import { GitHubIcon } from "./Icons";
import Image from "next/image";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Destination from "@/components/Destination";

export default function GlobalNavigation() {
	return (
		<nav className="sticky top-0 z-30 border-b border-zinc-100 bg-white/90 saturate-150 backdrop-blur-lg">
			<div className="mx-auto flex max-w-5xl justify-between items-center px-3 py-2.5 lg:px-0">
				{/* Harits Syah */}
				<div className="flex items-center space-x-2 group">
					<Image
						alt="Harits Syah"
						src="/Icons/haritssr.svg"
						height={20}
						width={20}
						priority
						className="h-5 w-5"
					/>
					<Link href="/" className=" text-zinc-800" aria-label="site logo">
						Harits Syah
					</Link>
				</div>

				{/* Links */}
				<div className="hidden sm:block">
					<ul className="flex space-x-10">
						{links.map((link) => {
							return <Destination key={link} link={link} />;
						})}
					</ul>
				</div>

				<div className="flex items-center space-x-3">
					<div title="Search: Coming soon">
						<MagnifyingGlassIcon className="h-5 w-5 text-zinc-800 hover:text-zinc-400 cursor-pointer" />
					</div>
					{/* Source to GitHub */}
					<a
						className="flex items-center space-x-2 group"
						title="Whole Site Source Code"
						href="https://www.github.com/haritssr/haritssr"
						target="_blank"
						rel="noopener noreferrer"
					>
						<GitHubIcon className="h-5 w-5 cursor-pointer text-zinc-800 group-hover:text-zinc-400" />
					</a>
				</div>
			</div>
		</nav>
	);
}

const links = ["experiences", "experiments", "blog", "pure", "about"];
