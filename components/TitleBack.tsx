import { ChevronLeftIcon } from "@heroicons/react/24/outline";

export default function TitleBack({
	name,
	href,
}: {
	name: string;
	href: string;
}) {
	return (
		<div className="py-8">
			<button
				type="button"
				className="group mb-5 flex flex-row items-center"
				onClick={() => history.back()}
			>
				<ChevronLeftIcon className="h-5 w-5 text-action" strokeWidth={2} />
				<div className="text-action hover:underline ">{href}</div>
			</button>
			<h1 className="z-40 mx-auto block h-auto w-full text-left text-3xl font-bold text-zinc-800 sm:text-4xl">
				{name}
			</h1>
		</div>
	);
}
