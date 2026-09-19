import Link from "next/link";

export default function BreadcrumbsDemo() {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="text-foreground/70 flex flex-wrap items-center gap-1">
        <li>
          <Link className="hover:text-foreground/90 hover:underline" href="/">
            home
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link
            className="hover:text-foreground/90 hover:underline"
            href="/design"
          >
            design
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="text-foreground/90">
          buttons
        </li>
      </ol>
    </nav>
  );
}
