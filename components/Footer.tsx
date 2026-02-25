import Link from "next/link";
import CopyLinkAllPage from "./CopyLinkAllPage";

export default function Footer() {
  return (
    <footer className="relative mx-auto flex max-w-5xl flex-col items-center space-y-2 px-8 py-3 text-[15px] sm:flex-row sm:justify-between sm:space-y-0 xl:px-0">
      <section>
        <div className="text-zinc-400">
          haritssr.com &#169; <span className=""> 2021–{new Date().getFullYear()}</span> by{" "}
          <a className="hover:text-zinc-800" href="https://x.com/haritssr" rel="noopener noreferrer" target="_blank">
            Harits Syah
          </a>
        </div>
      </section>
      <section className="space-x-3">
        <Link className="cursor-pointer select-none text-zinc-400 hover:text-zinc-800" href="/task">
          Task
        </Link>
        <CopyLinkAllPage />
      </section>
    </footer>
  );
}
