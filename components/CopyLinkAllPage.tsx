"use client";

import { usePathname } from "next/navigation";
import { Toast } from "radix-ui";
import React from "react";

const CopyLinkAllPage = () => {
	const [open, setOpen] = React.useState(false);
	const eventDateRef = React.useRef(new Date());
	const timerRef = React.useRef(0);

	React.useEffect(() => {
		return () => clearTimeout(timerRef.current);
	}, []);

	function oneWeekAway() {
		const now = new Date();
		const inOneWeek = now.setDate(now.getDate() + 7);
		return new Date(inOneWeek);
	}

	async function handleCopy(page: string) {
		try {
			await navigator.clipboard.writeText(page);
		} catch (err: unknown) {
			console.log(err);
		}
	}

	const ButtonHandler = () => {
		handleCopy(`haritssr.com${pathname}`);
		setOpen(false);
		window.clearTimeout(timerRef.current);
		timerRef.current = window.setTimeout(() => {
			eventDateRef.current = oneWeekAway();
			setOpen(true);
		}, 100);
	};

	const pathname = usePathname();

	return (
		<Toast.Provider swipeDirection="right">
			<button
				type="button"
				className="text-zinc-400 hover:text-zinc-800 cursor-pointer select-none"
				onClick={ButtonHandler}
				onKeyDown={ButtonHandler}
			>
				Share This Page
			</button>

			<Toast.Root
				className="border border-zinc-300 bg-white/70 saturate-150 backdrop-blur-md rounded-lg py-2 pl-4 pr-4 grid [grid-template-areas:'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-(--radix-toast-swipe-move-x) data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut shadow-xl"
				open={open}
				onOpenChange={setOpen}
			>
				<div className="">
					<Toast.Title className="[grid-area:title] mb-[5px] font-medium text-slate12 text-[15px]">
						Link copied to clipboard
					</Toast.Title>
					<Toast.Description asChild>
						<div className="[grid-area:description] m-0 text-zinc-500 text-[13px] leading-[1.3]">{`haritssr.com${pathname}`}</div>
					</Toast.Description>
				</div>
				<Toast.Close className="text-action hover:text-[#2563eb]/90 h-12 w-12">
					OK
				</Toast.Close>
			</Toast.Root>
			<Toast.Viewport className="p-3 sm:p-6 fixed bottom-0 right-0 flex flex-col gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-2147483647 outline-hidden" />
		</Toast.Provider>
	);
};

export default CopyLinkAllPage;
