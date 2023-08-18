import Link from "next/link";
import CopyLinkAllPage from "./CopyLinkAllPage";

export default function Footer() {
  return (
    <footer className=" relative mt-20 px-8  flex flex-col sm:flex-row space-y-2 sm:space-y-0 items-center sm:justify-between border-t py-3 sm:py-5 text-[12px] max-w-5xl mx-auto sm:border-zinc-200 sm:text-tiny xl:px-0">
      <section>
        <Link passHref href="/" className="text-zinc-500">
          harits<span className="font-semibold text-zinc-700">sr</span>.com
          &#169;{" "}
          <span className="text-[12px] sm:text-tiny">
            {" "}
            2021–{new Date().getFullYear()}
          </span>{" "}
          by <span className="text-zinc-800">Harits Syah</span>
        </Link>
      </section>
      <section>
        <CopyLinkAllPage />
      </section>
    </footer>
  );
}
