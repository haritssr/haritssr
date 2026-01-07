import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex h-screen w-full items-center justify-center">
			<div>
				<div className="mb-5 text-center text-2xl text-zinc-800">
					Page Not Found
				</div>
				<div className="flex items-center justify-center">
					<Link
						href="/"
						className="cursor-pointer items-center rounded-lg bg-action px-4 py-2 text-white hover:bg-blue-500"
					>
						<span>Back To Home</span>
					</Link>
				</div>
			</div>
		</div>
	);
}
