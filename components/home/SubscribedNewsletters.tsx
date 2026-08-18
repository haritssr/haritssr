import ExternalLink from "../ExternalLink";
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

export default function SubscribedNewsletters() {
  return (
    <HomeSectionWrapper
      className="space-y-3"
      id="subscribed-newsletters"
      isTitleLink={false}
      topic="Subscribed Newsletters"
    >
      {newsletters.map((newsletter) => (
        <div key={newsletter.href}>
          <ExternalLink href={newsletter.href} name={newsletter.name} />
        </div>
      ))}
    </HomeSectionWrapper>
  );
}
