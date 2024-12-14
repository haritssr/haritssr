import Link from "next/link";

export default function NotFound() {
	return (
		<div className="w-full  flex items-center justify-center h-screen">
			<div>
				<div className="mb-5 text-center text-2xl text-zinc-800 ">
					Page Not Found
				</div>
				<div className="items-center justify-center flex">
					<Link
						passHref
						href="/"
						className="cursor-pointer items-center rounded-lg bg-action py-2 px-4 text-white hover:bg-blue-500"
					>
						<span>Back To Home</span>
					</Link>
				</div>
			</div>
		</div>
	);
}
