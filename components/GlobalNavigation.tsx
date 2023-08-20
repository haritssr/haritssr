"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function GlobalNavigation() {
	return (
		<nav className="sticky top-0 z-30 border-b border-zinc-200  bg-white/80 saturate-150 backdrop-blur-lg">
			<div className="mx-auto flex max-w-5xl justify-between items-center px-3 py-2.5 lg:px-0">
				{/* Harits Syah */}
				<Link
					href="/"
					className=" text-zinc-800 hover:text-zinc-400"
					aria-label="site logo"
				>
					Harits Syah
				</Link>

				{/* Links */}
				<div className="hidden sm:block">
					<ul className="flex space-x-10">
						{links.map((link) => {
							return <Destination key={link} link={link} />;
						})}
					</ul>
				</div>

				{/* Source to GitHub */}
				<a
					className="flex items-center space-x-2 group"
					title="Whole site source code"
					href="https://www.github.com/haritssr/haritssr"
					target="_blank"
					rel="noopener noreferrer"
				>
					<span className="group-hover:text-zinc-400 text-zinc-800">
						Source
					</span>
				</a>
			</div>
		</nav>
	);
}

const links = ["experiences", "experiments", "blog", "technology", "about"];

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
				href={`${link === "home" ? "/" : `/${link}`}`}
				onClick={() => console.log(link)}
			>
				{capitalizeFirstLetter(link)}
			</Link>
		</li>
	);
}
