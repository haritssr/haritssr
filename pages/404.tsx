import Layout from "@/components/Layout";
import Link from "next/link";

export default function NotFoundPage() {
	return (
		<Layout browserTitle="Not found" description="Kasian nyasar">
			<div className="flex h-screen flex-col items-center justify-center space-y-5">
				<div className="text-center text-2xl font-medium text-zinc-800 sm:text-4xl sm:font-semibold ">Page not found.</div>

				<Link passHref href="/" className="cursor-pointer items-center rounded-lg bg-action py-2 px-4 text-white hover:bg-blue-500 font-semibold">
					<div>Back to home</div>
				</Link>
			</div>
		</Layout>
	);
}
