"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
	const pathname = usePathname(); //         /experiments/react/usestate-form
	const routes = pathname?.split("/"); // ['experiments','react','usestate-form']

	function getUpto(routes: string[], route: string) {
		const indexOfCurrentRoute = routes?.indexOf(route); // route = 'react', 1
		const goto = routes.slice(0, indexOfCurrentRoute + 1).join("/"); // /experiments/react
		return goto;
	}

	return (
		<div className="sm:px-5 py-1.5 bg-white sm:border-b sticky top-[45px] sm:-mx-5">
			<Link className="hover:underline text-zinc-400 sm:text-lg hover:text-zinc-800" href="/">
				home
			</Link>
			{routes?.map((route, i, array) => {
				return i === array.length - 1 ? (
					<span key={route}>
						<span className="text-zinc-400">{route}</span>
					</span>
				) : (
					<span key={route}>
						<Link className="hover:underline text-zinc-400 hover:text-zinc-800" href={`${getUpto(routes, route)}`}>
							{route}
						</Link>
						&nbsp;&nbsp;<span className="text-zinc-400">/</span>&nbsp;&nbsp;
					</span>
				);
			})}
		</div>
	);
}
