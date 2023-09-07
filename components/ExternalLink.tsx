export default function ExternalLink({ name, href, big }: { name: string; href: string; big?: boolean }) {
	return (
		<cite className="group not-italic">
			{" "}
			<a
				title={href}
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				className="group inline-block w-fit cursor-pointer items-center text-action sm:active:underline group-hover:text-[#2563eb]/80"
			>
				<span className="flex items-center">
					<span className={`${big ? "text-lg font-medium" : "text-base"}`}>{name}</span>
					{/* External Link Icon */}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className={` ${
							big ? "h-[18px] w-[18px]" : "h-4 w-4"
						} ml-1  text-action group-hover:text-[#2563eb]/80 mt-0.5`}
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={1.7}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
						/>
					</svg>
				</span>
			</a>{" "}
		</cite>
	);
}
