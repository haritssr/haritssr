import InternalLink from "@/components/InternalLink";

interface LessonLink {
  href: string;
  title: string;
}

export default function LessonNavigation({
  next,
  previous,
}: {
  next?: LessonLink;
  previous?: LessonLink;
}) {
  return (
    <nav aria-label="Calculus lessons" className="mt-14 flex flex-wrap gap-6">
      {previous ? (
        <InternalLink href={previous.href}>
          {`Previous: ${previous.title}`}
        </InternalLink>
      ) : null}
      {next ? (
        <InternalLink href={next.href}>{`Next: ${next.title}`}</InternalLink>
      ) : null}
    </nav>
  );
}
