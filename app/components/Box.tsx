export default function Box({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<div className="border border-zinc-400/50 rounded-md overflow-hidden">
			<div className="bg-zinc-50 px-3 py-2 border-b border-zinc-400/50 text-zinc-800 select-none font-medium">{title}</div>
			<div className="h-72 p-5 flex items-center justify-center">
				<div>{children}</div>
			</div>
		</div>
	);
}
