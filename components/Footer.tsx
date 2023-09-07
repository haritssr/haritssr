import Link from "next/link";
import CopyLinkAllPage from "./CopyLinkAllPage";

export default function Footer() {
	return (
		<footer className=" relative mt-20 px-8  flex flex-col sm:flex-row space-y-2 sm:space-y-0 items-center sm:justify-between py-3 sm:py-5 text-[12px] max-w-5xl mx-auto sm:text-tiny xl:px-0">
			<section>
				<div className="text-zinc-400">
					haritssr.com &#169; <span className="text-[12px] sm:text-tiny"> 2021–{new Date().getFullYear()}</span> by{" "}
					<Link passHref href="/about" className=" hover:text-zinc-800">
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
