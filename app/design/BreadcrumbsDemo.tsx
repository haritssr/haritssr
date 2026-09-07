import Link from "next/link";

export default function BreadcrumbsDemo() {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1 text-zinc-500">
        <li>
          <Link className="hover:text-zinc-800 hover:underline" href="/">
            home
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link className="hover:text-zinc-800 hover:underline" href="/design">
            design
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="text-zinc-800">
          buttons
        </li>
      </ol>
    </nav>
  );
}
