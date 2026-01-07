import Link from "next/link";
import CopyLinkAllPage from "./CopyLinkAllPage";

export default function Footer() {
	return (
		<footer className="relative mx-auto mt-20 flex max-w-5xl flex-col items-center space-y-2 px-8 py-3 text-[12px] sm:flex-row sm:justify-between sm:space-y-0 sm:py-5 sm:text-tiny xl:px-0">
			<section>
				<div className="text-zinc-400">
					haritssr.com &#169;{" "}
					<span className="text-[12px] sm:text-tiny">
						{" "}
						2021–{new Date().getFullYear()}
					</span>{" "}
					by{" "}
					<Link href="/about" className="hover:text-zinc-800">
						Harits Syah
					</Link>
				</div>
			</section>
			<section>
				<CopyLinkAllPage />
			</section>
		</footer>
	);
}
