import BackButton from "@/components/BackButton";
import BottomBar from "@/components/BottomBar";
import Box from "@/components/Box";
import Button from "@/components/Button";
import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import InternalLink from "@/components/InternalLink";
import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import TopLevelSectionPageDescription from "@/components/TopLevelSectionPageDescription";
import { createPageMetadata } from "@/utils/pageMetadata";

import AccordionDemo from "./AccordionDemo";
import BadgesDemo from "./BadgesDemo";
import BreadcrumbsDemo from "./BreadcrumbsDemo";
import ButtonIconOnlyDemo from "./ButtonIconOnlyDemo";
import ButtonWithIconDemo from "./ButtonWithIconDemo";
import CheckboxDemo from "./CheckboxDemo";
import { HierarchicalColorsDemo, MainColorsDemo } from "./ColorsDemo";
import ContextMenuDemo from "./ContextMenuDemo";
import LoadingButtonDemo from "./LoadingButtonDemo";
import LogoDemo from "./LogoDemo";
import ModalDemo from "./ModalDemo";
import NumberInputDemo from "./NumberInputDemo";
import PopoverDemo from "./PopoverDemo";
import SelectDemo from "./SelectDemo";
import SliderDemo from "./SliderDemo";
import SwitchDemo from "./SwitchDemo";
import TableDemo from "./TableDemo";
import TabsDemo from "./TabsDemo";
import ToastDemo from "./ToastDemo";
import ToggleDemo from "./ToggleDemo";
import TooltipDemo from "./TooltipDemo";

export const metadata = createPageMetadata({
  title: "Design",
  description:
    "Components, patterns, and design principles used across this site.",
  path: "/design",
});

const FORM_CONTROL_CLASS_NAME =
  "form-control w-full appearance-none rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground/90 shadow-sm outline-hidden placeholder:text-muted focus:border-foreground/80 focus:ring-2 focus:ring-foreground/20 sm:max-w-xs";

export default function DesignSystem() {
  return (
    <>
      <PageTitle>Design</PageTitle>
      <TopLevelSectionPageDescription>
        Shared design system for this site,{" "}
        <ExternalLink href="https://haritssr.com" name="haritssr.com" /> and{" "}
        <ExternalLink href="https://www.harimaki.com" name="harimaki.com" />.
      </TopLevelSectionPageDescription>
      <div className="space-y-20">
        <Section title="Design Principles">
          <ExplanationList>
            <li>
              A design system is a set of rules and opinions that shape the user
              interface and the experience as a whole.
            </li>

            <li>
              Design principles explain{" "}
              <span className="font-semibold">why</span> we make specific
              decisions; implementation explains{" "}
              <span className="font-semibold">how</span> they work in code.
            </li>
            <li>
              The Components system takes cues from the tools used to solve math
              and physics problems: paper, pencils, whiteboards, and pencil
              cases.
            </li>
            <li>Heavily inspired by Apple design videos.</li>
            <li>
              The core of digital services is to adapt to their cognitive load
              and enable their capabilities
            </li>
            <li>
              I care deeply about UX/UI design, with references including{" "}
              <ExternalLink href="https://www.apple.com" name="Apple" />,{" "}
              <ExternalLink href="https://linear.app" name="Linear" />,{" "}
              <ExternalLink href="https://www.raycast.com" name="Raycast" />,{" "}
              <ExternalLink href="https://dub.co" name="Dub" />, and{" "}
              <ExternalLink href="https://vercel.com" name="Vercel" />.
            </li>
            <li>
              Why is it called &quot;Components&quot;?
              <ul className="mt-1 list-outside list-disc space-y-1 pl-4">
                <li>
                  The name makes the purpose of this page clear in navigation.
                </li>
                <li>
                  Blue, black, gray, and white keep the visual language focused
                  and familiar.
                </li>
              </ul>
            </li>
            <li>
              Distinguish between link and button, link to navigate, button for
              action.
              <ul className="mt-1 list-outside list-disc space-y-1 pl-4">
                <li>
                  Both need clear hover, active, and focus-visible states when
                  those states are relevant.
                </li>
                <li>
                  A link navigates; a button performs an action. Their visual
                  treatment should reinforce that distinction.
                </li>
              </ul>
            </li>
            <li>
              Prefer the system&apos;s basic colors and components to accelerate
              development while maintaining consistency.
            </li>
            <li>
              Components include responsive behavior and keyboard focus
              treatment where interaction requires it.
            </li>
            <li>The system works on mobile and desktop.</li>
            <li>
              The main grid uses one column on mobile, two on tablets, and four
              on desktop, with the same <code>gap-5</code> at every size.
            </li>
            <li>
              For Harimaki, supporting-feature modals should use{" "}
              <code>grid-cols-1</code> and include a button at the bottom to
              open the full page.
            </li>
            <li>
              The mobile tab bar should appear on every Harimaki page except
              Materi.
            </li>
            <li>
              View the component code{" "}
              <ExternalLink
                href="https://github.com/haritssr/haritssr/tree/main/components"
                name="here"
              />
            </li>
            <li>
              Browse the{" "}
              <InternalLink href="/experiments" variant="inline">
                experiment collection and discontinued history
              </InternalLink>
            </li>
            <li className="text-muted">
              Still evolving: typography, use cases, do&apos;s and don&apos;ts,
              and component-specific guidance are next.
            </li>
          </ExplanationList>
        </Section>
        <Section
          id="design-sections"
          title="Sections and headings"
          description={
            <>
              Section groups content under an accessible heading with shared
              spacing and line height. Its description has a readable width,
              while the section and its body can use the available width. Use
              SectionHeading when a layout only needs a heading.
            </>
          }
          contentClassName={
            // This demonstrates grid spacing on Section's body wrapper.
            // oxlint-disable-next-line shadcn/no-restyle -- The demo exercises the contentClassName API.
            "grid gap-5 sm:grid-cols-2"
          }
        >
          <Box name="Section" title="Section with content">
            <Section
              headingAs="h3"
              id="design-section-example"
              title="Example section"
              description={
                <>
                  Section descriptions use shared styling. Container attributes
                  such as <code>id</code>, <code>className</code>, and{" "}
                  <code>style</code> apply to the outer section.
                </>
              }
              contentClassName="max-w-3xl"
            >
              <p className="text-muted text-sm leading-7">
                Use <code>contentClassName</code> to style the body wrapper. Set
                responsive grid classes there when the body contains cards.
              </p>
            </Section>
          </Box>
          <Box name="SectionHeading" title="Heading without a container">
            <SectionHeading as="h3" id="design-heading-example">
              Example heading
            </SectionHeading>
            <p className="text-muted text-sm leading-7">
              Native attributes apply directly to the heading. Choose its level
              with <code>as</code>; both components share the same default and
              compact typography.
            </p>
            <SectionHeading as="h3" variant="compact">
              Compact heading
            </SectionHeading>
          </Box>
        </Section>
        <Section
          title="UI Components"
          contentClassName={
            // This demonstrates grid spacing on Section's body wrapper.
            // oxlint-disable-next-line shadcn/no-restyle -- The demo exercises the contentClassName API.
            "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5"
          }
        >
          <Box name="Switch" title="Switch">
            <SwitchDemo />
          </Box>

          <Box name="Accordion" title="Accordion">
            <AccordionDemo />
          </Box>

          <Box name="Checkbox" title="Checkbox">
            <CheckboxDemo />
          </Box>

          <Box name="Popover" title="Popover">
            <PopoverDemo />
          </Box>

          <Box title="Number input">
            <NumberInputDemo />
          </Box>
          <Box title="Table">
            <TableDemo />
          </Box>

          <Box name="Tabs" title="Tabs">
            <TabsDemo />
          </Box>

          <ToastDemo />

          <Box name="Button" title="Button: Primary">
            <Button variant="primary">Button</Button>
          </Box>

          <Box name="Button" title="Button: Loading">
            <LoadingButtonDemo />
          </Box>

          <Box name="Button" title="Button: Secondary">
            <Button variant="secondary">Button</Button>
          </Box>

          <Box name="Button" title="Button: With Icon">
            <ButtonWithIconDemo />
          </Box>

          <Box name="Button" title="Button: Only Icon">
            <ButtonIconOnlyDemo />
          </Box>

          <Box name="Button" title="Button: Danger">
            <Button variant="danger">Delete</Button>
          </Box>

          <Box name="Button" title="Button: Disabled">
            <Button disabled variant="secondary">
              Button
            </Button>
          </Box>

          <Box name="InternalLink" title="Internal Link">
            <InternalLink href="/">Internal Link</InternalLink>
            <p className="text-muted text-sm leading-7">
              Use <code>variant=&quot;inline&quot;</code> for links within
              sentences, descriptions, and explanatory list items. For example,
              visit the{" "}
              <InternalLink href="/" variant="inline">
                home page
              </InternalLink>
              . The default variant is for standalone navigation.
            </p>
          </Box>

          <Box name="ExternalLink" title="External Link">
            <ExternalLink
              href="https://www.harislab.com"
              name="External Link"
            />
          </Box>

          <Box title="Input: Text">
            <label className="block w-full sm:max-w-xs">
              <span className="sr-only">Text input</span>
              <input
                className={FORM_CONTROL_CLASS_NAME}
                placeholder="Type something..."
                type="text"
              />
            </label>
          </Box>

          <Box title="Input: Search">
            <label className="block w-full sm:max-w-xs">
              <span className="sr-only">Search input</span>
              <input
                className={FORM_CONTROL_CLASS_NAME}
                placeholder="Search"
                type="search"
              />
            </label>
          </Box>

          <Box title="Input: Number">
            <label className="block w-full sm:max-w-xs">
              <span className="sr-only">Number input</span>
              <input
                className={FORM_CONTROL_CLASS_NAME}
                min="0"
                placeholder="0"
                type="number"
              />
            </label>
          </Box>

          <Box name="Box" title="Box">
            <div className="border-foreground/20 w-50 overflow-hidden rounded-md border sm:w-75">
              <div className="border-foreground/20 bg-background text-foreground/90 border-b px-3 py-2 font-medium select-none">
                Title
              </div>
              <div className="flex h-32 items-center justify-center p-5">
                Content
              </div>
            </div>
          </Box>

          <Box title="Text Area">
            <textarea
              className={FORM_CONTROL_CLASS_NAME}
              placeholder="Write something here..."
              rows={3}
            />
          </Box>

          <Box name="Toggle" title="Toggle">
            <ToggleDemo />
          </Box>

          <Box title="Breadcrumbs">
            <BreadcrumbsDemo />
          </Box>

          <Box name="Badge" title="Badges">
            <BadgesDemo />
          </Box>

          <Box name="BackButton" title="Back Button">
            <div className="-mt-10 mb-5">
              <BackButton href="/" name="Previous Page" />
            </div>
          </Box>

          <Box name="Tooltip" title="Tooltip">
            <TooltipDemo />
          </Box>

          <Box title="Logo">
            <LogoDemo />
          </Box>

          <Box name="Dialog" title="Modal">
            <ModalDemo />
          </Box>

          <Box name="Select" title="Select">
            <SelectDemo />
          </Box>

          <Box name="BottomBar" title="Bottom Navigation Mobile">
            <BottomBar preview />
          </Box>

          <Box name="Slider" title="Slider">
            <SliderDemo />
          </Box>

          <Box name="ContextMenu" title="Context Menus">
            <ContextMenuDemo />
          </Box>

          <Box title="Date Picker">
            <label className="block w-full sm:max-w-xs">
              <span className="text-foreground/80 mb-1 block text-sm font-medium">
                Choose a date
              </span>
              <input className={FORM_CONTROL_CLASS_NAME} type="date" />
            </label>
          </Box>

          <Box title="Main Colors">
            <MainColorsDemo />
          </Box>

          <Box title="Hierarchical Colors">
            <HierarchicalColorsDemo />
          </Box>
        </Section>

        <Section title="Figma Design">
          <div>
            <iframe
              allowFullScreen
              className="border-border min-h-128 w-full rounded-lg border"
              height="450"
              loading="lazy"
              src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FmhfH2JaaCDzRSL71XcSnUw%2FHaris-Lab%3Ftype%3Ddesign%26node-id%3D1416%253A236%26mode%3Ddesign%26t%3DwxLQxcZHLYNHFvrj-1"
              sandbox="allow-scripts"
              title="Haris Lab Figma design"
              width="800"
            />
          </div>
        </Section>
      </div>
    </>
  );
}
