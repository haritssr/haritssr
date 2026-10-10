import type { Metadata } from "next";

import Section from "@/components/Section";
import { getExperimentMetadata } from "@/data/ExperimentsData";

const sampleCards = [
  {
    title: "Profile",
    description: "A short introduction with a name and a few details.",
  },
  {
    title: "Release notes",
    description:
      "A longer update with room for a few sentences about what changed, why it changed, and what to try next.",
  },
  {
    title: "Reading list",
    description:
      "Articles and notes collected for later. Some entries have extra context, so their cards naturally take up more space.",
  },
  {
    title: "Quick links",
    description: "A compact group of useful destinations.",
  },
  {
    title: "Weekly log",
    description:
      "A small journal of progress. The summary can grow as the week gets busier, and the card height follows its content.",
  },
  {
    title: "Useful tools",
    description: "A couple of tools and a note about when each one is helpful.",
  },
] as const;

export const metadata: Metadata = getExperimentMetadata(
  "tailwind-css",
  "grid-vs-column",
  {
    description:
      "Compare CSS Grid and multi-column layouts with responsive Tailwind CSS v4 utilities.",
  }
);

export default function GridVsColumnPage() {
  return (
    <div className="space-y-20 pb-16">
      <header>
        <p className="text-foreground/70 max-w-3xl text-lg">
          Both layouts can create multiple columns, but they arrange content in
          different ways. Compare the same cards below, then choose based on
          whether items need shared rows or should flow naturally.
        </p>
      </header>

      <Section
        title="Same cards, different flow"
        id="same-cards-heading"
        description={
          <>
            Grid places items across rows and columns. Multi-column layout flows
            down one column and continues in the next; the browser balances the
            columns, while each card is kept together where possible.
          </>
        }
        contentClassName="grid gap-6 lg:grid-cols-2"
      >
        <section
          aria-labelledby="grid-example-title"
          className="border-border min-w-0 rounded-2xl border p-4 sm:p-5"
        >
          <h3
            className="text-foreground mb-2 text-lg font-semibold"
            id="grid-example-title"
          >
            CSS Grid
          </h3>
          <p className="text-foreground/70 mb-4 text-sm">
            Items fill each row from left to right. Tracks line up, so the
            tallest card in a row sets that row&apos;s height.
          </p>
          <figure>
            <ol className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2">
              {sampleCards.map((card, index) => (
                <li key={card.title}>
                  <article className="bg-background border-border h-full rounded-xl border p-3">
                    <h4 className="text-foreground text-sm font-semibold">
                      <span className="text-foreground/40 mr-2 font-normal">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {card.title}
                    </h4>
                    <p className="text-foreground/70 mt-2 text-sm">
                      {card.description}
                    </p>
                  </article>
                </li>
              ))}
            </ol>
            <figcaption className="text-foreground/60 mt-3 text-xs">
              Source order runs across each row before moving down.
            </figcaption>
          </figure>
          <pre className="bg-interface-hover mt-4 overflow-x-auto rounded-xl p-3 text-xs leading-5">
            <code>{`<ol class="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2">
  <li>...</li>
</ol>`}</code>
          </pre>
        </section>

        <section
          aria-labelledby="columns-example-title"
          className="border-border min-w-0 rounded-2xl border p-4 sm:p-5"
        >
          <h3
            className="text-foreground mb-2 text-lg font-semibold"
            id="columns-example-title"
          >
            CSS columns
          </h3>
          <p className="text-foreground/70 mb-4 text-sm">
            Items flow vertically through the columns. Each column can have its
            own content height instead of aligning to shared rows.
          </p>
          <figure>
            <ol className="m-0 list-none columns-1 gap-3 p-0 sm:columns-2">
              {sampleCards.map((card, index) => (
                <li className="mb-3 break-inside-avoid-column" key={card.title}>
                  <article className="bg-background border-border rounded-xl border p-3">
                    <h4 className="text-foreground text-sm font-semibold">
                      <span className="text-foreground/40 mr-2 font-normal">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {card.title}
                    </h4>
                    <p className="text-foreground/70 mt-2 text-sm">
                      {card.description}
                    </p>
                  </article>
                </li>
              ))}
            </ol>
            <figcaption className="text-foreground/60 mt-3 text-xs">
              Source order continues down a column, then moves to the next.
            </figcaption>
          </figure>
          <pre className="bg-interface-hover mt-4 overflow-x-auto rounded-xl p-3 text-xs leading-5">
            <code>{`<ol class="m-0 columns-1 list-none gap-3 p-0 sm:columns-2">
  <li class="mb-3 break-inside-avoid-column">...</li>
</ol>`}</code>
          </pre>
        </section>
      </Section>

      <Section title="Which one should you use?" id="choose-layout-heading">
        <dl className="grid gap-6 sm:grid-cols-2">
          <div>
            <dt className="text-foreground mb-2 font-semibold">
              Choose Grid for relationships
            </dt>
            <dd className="text-foreground/70">
              Use it when rows and columns matter: dashboards, product grids,
              forms, or cards that should align across each row.
            </dd>
          </div>
          <div>
            <dt className="text-foreground mb-2 font-semibold">
              Choose columns for flowing content
            </dt>
            <dd className="text-foreground/70">
              Use it for independent items that can fill vertical space
              naturally, such as a card collection, image gallery, or magazine
              layout. It does not create shared row alignment.
            </dd>
          </div>
        </dl>
        <p className="text-foreground/60 mt-6 text-sm">
          Read the Tailwind CSS v4 docs for{" "}
          <a
            className="text-action hover:text-action-hover underline underline-offset-2"
            href="https://tailwindcss.com/docs/grid-template-columns"
          >
            grid columns
          </a>
          ,{" "}
          <a
            className="text-action hover:text-action-hover underline underline-offset-2"
            href="https://tailwindcss.com/docs/columns"
          >
            multi-column layout
          </a>
          , and{" "}
          <a
            className="text-action hover:text-action-hover underline underline-offset-2"
            href="https://tailwindcss.com/docs/break-inside"
          >
            controlling column breaks
          </a>
          .
        </p>
      </Section>
    </div>
  );
}
