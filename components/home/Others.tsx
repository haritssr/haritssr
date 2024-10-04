import Link from "next/link";

export default function Others() {
	return (
		<section>
			<div className=" mb-3 select-none text-2xl font-semibold text-zinc-800">
				Others
			</div>
			<ul className="list-inside list-disc">
				<li>
					<Link className="text-zinc-500 hover:underline" href="/technology">
						Technology
					</Link>
				</li>
				<li>
					<Link className="text-zinc-500 hover:underline" href="/pure">
						Pure Design System
					</Link>
				</li>
			</ul>
		</section>
	);
}
