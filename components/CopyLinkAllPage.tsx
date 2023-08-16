import * as Toast from "@radix-ui/react-toast";
import { useRouter } from "next/router";
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
    } catch (err: any) {
      console.log(err);
    }
  }

  const router = useRouter();
  console.log(router.asPath);

  return (
    <Toast.Provider swipeDirection="right">
      <div
        className="text-zinc-700 hover:text-blue-600 active:text-blue-400 cursor-pointer select-none"
        onClick={() => {
          handleCopy(`haritssr.vercel.app${router.asPath}`);
          setOpen(false);
          window.clearTimeout(timerRef.current);
          timerRef.current = window.setTimeout(() => {
            eventDateRef.current = oneWeekAway();
            setOpen(true);
          }, 100);
        }}
      >
        Share this page
      </div>

      <Toast.Root
        className="border border-zinc-300 bg-white/70 saturate-150 backdrop-blur-md rounded-lg py-3 px-4 grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut shadow-xl"
        open={open}
        onOpenChange={setOpen}
      >
        <Toast.Title className="[grid-area:_title] mb-[5px] font-medium text-slate12 text-[15px]">
          Link copied to clipboard
        </Toast.Title>
        <Toast.Description asChild>
          <div className="[grid-area:_description] m-0 text-zinc-500 text-[13px] leading-[1.3]">{`haritssr.vercel.app${router.asPath}`}</div>
        </Toast.Description>
      </Toast.Root>
      <Toast.Viewport className="p-3 sm:p-6 fixed bottom-0 right-0 flex flex-col gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
    </Toast.Provider>
  );
};

export default CopyLinkAllPage;