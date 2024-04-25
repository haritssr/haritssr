"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
	// e.g /experiments/react/usestate-form
	const pathname = usePathname();
	// ['experiments','react','usestate-form']
	const routes = pathname?.split("/");

	function getLinkFromRoutesUpToRoute(routes: string[], route: string) {
		// route = 'react', so the value is 1
		const indexOfCurrentRoute = routes?.indexOf(route);
		// /experiments/react
		const goto = routes.slice(0, indexOfCurrentRoute + 1).join("/");
		return goto;
	}

	return (
		<div className="sm:px-5 py-2 bg-white dark:bg-zinc-800 sm:border-b sm:dark:border-zinc-700 sticky top-[45px] sm:-mx-5">
			<Link
				className="hover:underline text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
				href="/"
			>
				home
			</Link>
			{routes?.map((route, i, array) => {
				// if the i is the last element of an array or the last route or the current route/page
				return i === array.length - 1 ? (
					// this is the current route/page
					<span key={route} className="text-zinc-800">
						{route}
					</span>
				) : (
					<span key={route}>
						<Link
							className="hover:underline text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
							href={`${getLinkFromRoutesUpToRoute(routes, route)}`}
						>
							{route}
						</Link>
						&nbsp;&nbsp;<span className="text-zinc-400">/</span>&nbsp;&nbsp;
					</span>
				);
			})}
		</div>
	);
}
