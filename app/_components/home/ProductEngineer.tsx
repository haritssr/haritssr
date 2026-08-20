import ExternalLink from "@/components/ExternalLink";
import HomeSectionWrapper from "./HomeSectionWrapper";

const resources = [
  {
    name: "PostHog: What is a product engineer?",
    href: "https://posthog.com/product-engineer/what-is-a-product-engineer",
  },
  {
    name: "Lee Robinson: Product Engineers",
    href: "https://leerob.com/product-engineers",
  },
];

export default function ProductEngineer() {
  return (
    <HomeSectionWrapper
      className="space-y-5"
      id="product-engineer"
      isTitleLink={false}
      topic="What Is a Product Engineer?"
    >
      <p className="text-zinc-500">
        Product engineers work backwards from the experience they want to
        create. They care about real user problems and move across product,
        design, and engineering to solve them.
      </p>
      <ul className="space-y-3">
        {resources.map((resource) => (
          <li key={resource.href}>
            <ExternalLink href={resource.href} name={resource.name} />
          </li>
        ))}
      </ul>
    </HomeSectionWrapper>
  );
}
