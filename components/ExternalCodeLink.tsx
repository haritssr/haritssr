export function ExternalCodeLink({
	children,
	href,
}: { children: React.ReactNode; href: string }) {
	return (
		<a href={href} target="_blank" rel="noreferrer noopener">
			{" "}
			<code className="rounded border border-purple-200 bg-purple-50 px-1.5 py-0.5 text-sm text-purple-500 duration-100 ">
				{children}
			</code>{" "}
		</a>
	);
}
