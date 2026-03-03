import Share from "./Share";

export default function Footer() {
  return (
    <footer className="px-5 py-2 flex justify-between text-sm max-w-5xl mx-auto xl:px-0">
      <div className="text-zinc-400">
        <span className=""> 2021–{new Date().getFullYear()}</span> &#169; by{" "}
        <a className="hover:text-zinc-800" href="https://x.com/haritssr" rel="noopener noreferrer" target="_blank">
          Harits Syah
        </a>
      </div>
      <Share />
    </footer>
  );
}
