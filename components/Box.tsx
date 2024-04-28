export default function Box({
	title,
	children,
}: { title: string; children: React.ReactNode }) {
	return (
		<div className="border border-zinc-400/50 rounded-md overflow-hidden dark:border-zinc-700">
			<div className="bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700 px-3 py-2 border-b border-zinc-400/50 text-zinc-800 select-none font-medium dark:text-zinc-200">
				{title}
			</div>
			<div className="h-72 p-5 flex items-center justify-center">
				<div>{children}</div>
			</div>
		</div>
	);
}
