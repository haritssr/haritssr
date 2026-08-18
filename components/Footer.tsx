import Share from "./Share";

export default function Footer() {
  return (
    <footer className="mx-auto flex max-w-5xl justify-between px-5 py-2 text-sm xl:px-0">
      <div className="text-zinc-400">
        <span className=""> 2021–{new Date().getFullYear()}</span> &#169; by{" "}
        <a
          className="hover:text-zinc-800"
          href="https://x.com/intent/follow?screen_name=haritssr"
          rel="noopener noreferrer"
          target="_blank"
        >
          Harits Syah
        </a>
      </div>
      <Share />
    </footer>
  );
}
