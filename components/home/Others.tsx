import InternalLinkWithoutArrow from "../InternalLinkWithoutArrow";

export default function Others() {
	return (
		<section>
			<div className=" mb-3 select-none text-2xl font-semibold text-zinc-800">
				Others
			</div>
			<ul className="list-inside space-y-1">
				<li>
					<InternalLinkWithoutArrow href="/technology" name="Technology" />
				</li>
				<li>
					<InternalLinkWithoutArrow href="/pure" name="Pure Design System" />
				</li>
			</ul>
		</section>
	);
}
