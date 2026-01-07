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
				className="cursor-pointer select-none text-zinc-400 hover:text-zinc-800"
				onClick={ButtonHandler}
				onKeyDown={ButtonHandler}
			>
				Share This Page
			</button>

			<Toast.Root
				className="grid grid-cols-[auto_max-content] items-center gap-x-[15px] rounded-lg border border-zinc-300 bg-white/70 py-2 pr-4 pl-4 shadow-xl saturate-150 backdrop-blur-md [grid-template-areas:'title_action'_'description_action'] data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-(--radix-toast-swipe-move-x) data-[state=closed]:animate-hide data-[state=open]:animate-slideIn data-[swipe=end]:animate-swipeOut data-[swipe=cancel]:transition-[transform_200ms_ease-out]"
				open={open}
				onOpenChange={setOpen}
			>
				<div className="">
					<Toast.Title className="mb-[5px] font-medium text-[15px] text-slate12 [grid-area:title]">
						Link copied to clipboard
					</Toast.Title>
					<Toast.Description asChild>
						<div className="m-0 text-[13px] text-zinc-500 leading-[1.3] [grid-area:description]">{`haritssr.com${pathname}`}</div>
					</Toast.Description>
				</div>
				<Toast.Close className="h-12 w-12 text-action hover:text-[#2563eb]/90">
					OK
				</Toast.Close>
			</Toast.Root>
			<Toast.Viewport className="fixed right-0 bottom-0 z-2147483647 m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-[10px] p-3 outline-hidden sm:p-6" />
		</Toast.Provider>
	);
};

export default CopyLinkAllPage;
