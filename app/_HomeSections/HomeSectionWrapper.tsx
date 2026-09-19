export default function HomeSectionWrapper({
  topic,
  className,
  children,
  id,
}: {
  topic: string;
  className?: string;
  children: React.ReactNode;
  id: string;
}) {
  return (
    <div id={id}>
      <section className="flex items-center justify-between">
        <h2 className="text-foreground mb-6 text-2xl font-semibold select-none">
          {topic}
        </h2>
      </section>
      <div className={`mb-16 ${className}`}>{children}</div>
    </div>
  );
}
