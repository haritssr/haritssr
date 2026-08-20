import ExternalLink from "@/components/ExternalLink";
import HomeSectionWrapper from "./HomeSectionWrapper";

const newsletters = [
  {
    name: "This Week In React",
    href: "https://thisweekinreact.com/",
  },
  {
    name: "Next.js Weekly",
    href: "https://nextjsweekly.com/",
  },
  {
    name: "This Week in Effect",
    href: "https://www.effect.website/blog?category=this-week-in-effect",
  },
];

export default function Newsletters() {
  return (
    <HomeSectionWrapper
      className="grid grid-cols-1 gap-3"
      id="newsletters"
      isTitleLink={false}
      topic="Newsletters"
    >
      {newsletters.map((newsletter) => (
        <div key={newsletter.href}>
          <ExternalLink href={newsletter.href} name={newsletter.name} />
        </div>
      ))}
    </HomeSectionWrapper>
  );
}
