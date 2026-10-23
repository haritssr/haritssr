import LabPageHeader from "@/app/labs/_components/LabPageHeader";
import { getLabMetadata } from "@/app/labs/data";
import PageDescription from "@/components/PageDescription";
import Section from "@/components/Section";

import NavigationDiagram from "./NavigationDiagram";

export const metadata = getLabMetadata("user-interface", "navigation-logic");

const diagrams = [
  {
    id: "top-bar",
    title: "Top bar",
    description:
      "The left control follows the route. The center follows the page title’s position, independently of whether scrolling has started.",
    definition: `flowchart TD
      accTitle: Top bar route and scroll behavior
      accDescr: Home shows the site name. Other pages keep a parent back link. The center switches from desktop navigation to the page title when the title passes behind the top bar.
      Route["Current route"] --> Home{"Home page?"}
      Home -->|Yes| Name["Left: Harits Syah link"]
      Home -->|No| Back["Left: parent back link from PageHeader; fallback Home"]
      Back --> Compact{"Below 640px and scrollY greater than 0?"}
      Compact -->|Yes| Chevron["Chevron only; accessible destination label retained"]
      Compact -->|No| Label["Chevron and destination name"]
      Route --> Title{"Non-home title has passed behind the top bar?"}
      Title -->|Yes| Center["Center: page title; truncate if needed"]
      Center --> Click["Click title: clear URL fragment and scroll to page top"]
      Click --> Restore["Title returns into view: restore navigation"]
      Title -->|No| Width{"Viewport at least 1024px?"}
      Restore --> Width
      Width -->|Yes| Links["Home · Projects · Labs · Writing · Design"]
      Width -->|No| Empty["Center navigation hidden"]`,
  },
  {
    id: "actions-and-contents",
    title: "Actions and Contents",
    description:
      "Page actions stay inline at the page top and on Home. Below 640px, they collapse into a menu while the scrolling title is visible. Contents keeps a separate trigger.",
    definition: `flowchart TD
      accTitle: Choosing top bar actions and Contents
      accDescr: Page actions collapse into a menu only below 640 pixels while the scrolling title is visible. Otherwise they stay inline. Nested routes with headings add a separate Contents trigger.
      State{"Below 640px and scrolling title visible?"}
      State -->|Yes| Menu["Page actions menu; title centered with equal side columns"]
      State -->|No| Actions["Inline Search, Share, View Source, and account controls"]
      Route["Current route"] --> Nested{"More than one path segment?"}
      Nested -->|Yes| Headings{"Visible content headings h2–h6?"}
      Headings -->|Yes| Contents["Show Contents trigger"]
      Contents --> Beside["Keep Contents separate from page actions"]
      Beside --> State
      Nested -->|No| State
      Headings -->|No| State`,
  },
  {
    id: "contents-navigation",
    title: "Inside Contents",
    description:
      "The panel uses rendered heading anchors, excludes disclosure triggers, and tracks the current section while open. Below 1024px it opens as a sheet; page actions remain in the top bar.",
    definition: `flowchart TD
      accTitle: Contents panel and heading navigation
      accDescr: Contents opens as a desktop popover at 1024 pixels or wider and a bottom sheet below that width. Selecting a heading closes the panel before updating the URL hash and scrolling.
      Trigger["Open Contents"] --> Width{"Viewport at least 1024px?"}
      Width -->|Yes| Popover["Popover below trigger; background remains interactive"]
      Width -->|No| Sheet["Bottom sheet with backdrop and scroll lock"]
      Popover --> Outline["List visible section headings in document order"]
      Sheet --> Outline
      Outline --> Track["Track and highlight current section while panel is open"]
      Track --> Select{"User action"}
      Select -->|Choose heading| Close["Close panel; wait for focus restoration"]
      Close --> Hash["Update URL hash; scroll to heading"]
      Hash --> Keyboard["Keyboard selection also focuses the heading"]
      Select -->|Dismiss| Focus["Restore focus to Contents trigger"]
      Track -->|Cross 1024px breakpoint| Reset["Close panel and cancel pending navigation"]`,
  },
  {
    id: "bottom-navigation",
    title: "Bottom navigation",
    description:
      "Bottom navigation is mobile-only. It appears on the five main destinations and eligible pages one level below them; writing articles and deeper routes use article navigation instead.",
    definition: `flowchart TD
      accTitle: Mobile bottom navigation visibility
      accDescr: Below 1024 pixels, show bottom navigation only for recognized main sections with at most two path segments, excluding writing articles. Highlight the current section using the action color.
      Width{"Below 1024px?"} -->|No| Hide["Hide bottom navigation"]
      Width -->|Yes| Section{"Home, Projects, Labs, Writing, or Design section?"}
      Section -->|No| Hide
      Section -->|Yes| Depth{"More than two path segments?"}
      Depth -->|Yes| Hide
      Depth -->|No| Writing{"Writing route with more than one segment?"}
      Writing -->|Yes| Hide
      Writing -->|No| Show["Show five destinations with icons and labels"]
      Show --> Active["Current section: text-action; other destinations: text-muted"]
      Active --> Aria["Exact route: aria-current page; section ancestor: aria-current location"]`,
  },
  {
    id: "scroll-and-appearance",
    title: "Scroll and appearance",
    description:
      "The top bar stays sticky. Its background changes as soon as scrolling starts; clicking the scrolling page title returns to the page top.",
    definition: `flowchart TD
      accTitle: Navigation appearance and scrolling title behavior
      accDescr: At page top the top bar has no added background. After scrolling it uses the layout background at 70 percent opacity and a 12 pixel blur. Clicking the scrolling page title clears the URL fragment and returns to the top.
      Scroll["Scroll position changes"] --> Top{"scrollY greater than 0?"}
      Top -->|No| Clear["Top bar: no added background"]
      Top -->|Yes| Blur["Top bar: bg-background at 70% opacity; 12px blur"]
      Title["Click scrolling page title"] --> Click["Clear URL fragment and scroll to page top"]
      Click --> Motion{"Reduced motion preferred?"}
      Motion -->|Yes| Auto["Immediate scroll"]
      Motion -->|No| Smooth["Smooth scroll"]
      Colors["Navigation colors"] --> Desktop["Top links: current section text-foreground; others text-foreground/70"]
      Colors --> Icons["Back and action icons: text-foreground/70; foreground on hover"]`,
  },
];

export default function NavigationLogicPage() {
  return (
    <>
      <LabPageHeader>
        <PageDescription>
          How this site’s navigation responds to routes, screen sizes, headings,
          and scrolling. These diagrams use Pele to render the current
          implementation from Mermaid syntax.
        </PageDescription>
      </LabPageHeader>
      <div className="space-y-16">
        {diagrams.map((diagram) => (
          <Section
            description={diagram.description}
            id={diagram.id}
            key={diagram.id}
            title={diagram.title}
          >
            <NavigationDiagram
              definition={diagram.definition}
              title={diagram.title}
            />
          </Section>
        ))}
      </div>
    </>
  );
}
