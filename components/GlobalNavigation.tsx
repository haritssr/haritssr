"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GitHubIcon } from "./Icons";
import Image from "next/image";
import {
	MagnifyingGlassIcon,
	MoonIcon,
	SunIcon,
} from "@heroicons/react/24/outline";
import Mode from "app/components/Mode";

export default function GlobalNavigation() {
	return (
		<nav className="sticky top-0 z-30 border-b border-zinc-200  bg-white/80 saturate-150 backdrop-blur-lg">
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
					{/* Search */}
					<MagnifyingGlassIcon className="h-5 w-5 text-zinc-800 hover:text-zinc-400 cursor-pointer" />
					{/* Light/Dark Mode Toggle */}
					<Mode />
					{/* Source to GitHub */}
					<a
						className="flex items-center space-x-2 group"
						title="Whole site source code"
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

const links = [
	"experiences",
	"experiments",
	"blog",
	"technology",
	"pure",
	"about",
];

function Destination({ link }: { link: string }) {
	const pathname = usePathname();

	const CurrentPageBaseRoute = pathname?.split("/")[1];

	function capitalizeFirstLetter(to: string) {
		return to.substring(0).charAt(0).toUpperCase() + to.slice(1);
	}

	let color: string;

	if (pathname === `/${link}`) {
		color = "text-blue-700";
	} else if (CurrentPageBaseRoute === link) {
		color = "text-blue-700";
	} else {
		color = "text-zinc-800 hover:text-zinc-400";
	}

	return (
		<li>
			<Link
				className={`${color}`}
				href={`${link === "pure" ? "/pure" : `/${link}`}`}
			>
				{capitalizeFirstLetter(link)}
			</Link>
		</li>
	);
}
