import BackButton from "@/components/BackButton";
import BottomBar from "@/components/BottomBar";
import Box from "@/components/Box";
import Button from "@/components/Button";
import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import InternalLink from "@/components/InternalLink";
import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
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
  "interactive-elevation form-control w-full appearance-none rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground/90 outline-hidden placeholder:text-muted focus:border-foreground/80 focus:ring-2 focus:ring-foreground/20 sm:max-w-xs";

export default function DesignSystem() {
  return (
    <>
      <PageHeader navigation={<BackButton href="/" name="Home" />}>
        <PageTitle>Design</PageTitle>
        <PageDescription>
          Shared design system for{" "}
          <ExternalLink href="https://haritssr.com" name="haritssr.com" /> and{" "}
          <ExternalLink href="https://www.harimaki.com" name="harimaki.com" />.
        </PageDescription>
      </PageHeader>
      <div className="space-y-16">
        <Section
          id="design-page-headers"
          title="Page headers and spacing"
          description="PageHeader groups the title and optional introductory items, keeping the same distance to content for every combination."
        >
          <ExplanationList>
            <li>
              Every page uses the same PageTitle typography inside PageHeader.
              Pass the optional BackButton through the navigation slot; add
              PageDescription, badges, or other introductory content below the
              title.
            </li>
            <li>
              The top bar&apos;s GitHub icon links to the current page&apos;s
              source. Keep source links out of experiment headers.
            </li>
            <li>
              PageHeader always reserves a 24px back-link row and a 16px gap
              before the title, even when there is no back link. It owns the
              16px gap between its remaining items and the 64px gap before
              content.
            </li>
            <li>
              The layout always reserves a 24px breadcrumb row, with 32px
              between the top bar and breadcrumbs and another 32px before the
              page header. These spaces stay reserved when navigation is absent.
              Place icons beside the title so they do not shift its starting
              position.
            </li>
            <li>
              Keep PageHeader outside the content stack. Use
              <code> space-y-16</code> between major content sections. Physics
              and mathematics experiments use <code>space-y-20</code>. Omit an
              extra top margin on the first content block.
            </li>
          </ExplanationList>
          <pre className="border-border overflow-x-auto rounded-lg border p-4 text-sm">
            <code>{`<PageHeader
  navigation={<BackButton href="/experiments" name="Experiments" />}
>
  <PageTitle>Example page</PageTitle>
  <PageDescription>Optional introduction.</PageDescription>
</PageHeader>
<div className="space-y-16">
  <Section title="First section">...</Section>
  <Section title="Second section">...</Section>
</div>`}</code>
          </pre>
        </Section>
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
            <li>
              Controls use subtle shadows; floating controls sit one level
              higher. Hover raises elevation and pressing lowers it. Disabled
              controls stay flat, and keyboard focus keeps a visible outline.
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
              spacing. Sections, descriptions, and body content use the full
              available width within the page container. Use SectionHeading when
              a layout only needs a heading. In physics and mathematics,
              constrain reading content with <code>max-w-3xl</code> on the body
              wrapper; keep headings, descriptions, labs, and tables full width.
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
              contentClassName="max-w-full"
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

          <Box name="NumberInput" title="Number input">
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
            <p className="text-muted text-sm">
              <InternalLink href="/api" variant="footer">
                API
              </InternalLink>
              {" — "}Use the footer variant to inherit the surrounding text size
              and match the footer actions.
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
            <ul className="grid gap-5 sm:grid-cols-2">
              <Box as="li" headingAs="h3" title="Exercise title">
                <p>Use a heading and list item for exercise cards.</p>
              </Box>
              <Box as="li" headingAs="h3" title="Another exercise">
                <p>Cards stretch to the same height within each grid row.</p>
              </Box>
            </ul>
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
            <div className="mb-5">
              <BackButton href="/" name="Previous Page" />
            </div>
            <BackButton
              href="/experiments"
              name="Experiments"
              variant="topbar"
            />
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

          <Box name="ColorsDemo" title="Main Colors">
            <MainColorsDemo />
          </Box>

          <Box name="ColorsDemo" title="Hierarchical Colors">
            <HierarchicalColorsDemo />
          </Box>
        </Section>
      </div>
    </>
  );
}
