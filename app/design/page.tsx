import {
  DocumentTextIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import BackButton from "@/components/BackButton";
import Box from "@/components/Box";
import Button from "@/components/Button";
import ExternalLink from "@/components/ExternalLink";
import IndexCard from "@/components/IndexCard";
import InternalLink from "@/components/InternalLink";
import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import TabBarButtom from "@/components/TabBarButtom";
import { createPageMetadata } from "@/utils/metadata/pageMetadata";

import Accordion from "./Accordion";
import Badges from "./Badges";
import Breadcrumbs from "./Breadcrumbs";
import ButtonIconOnly from "./ButtonIconOnly";
import ButtonWithIcon from "./ButtonWithIcon";
import Checkbox from "./Checkbox";
import { DesignTokens } from "./Colors";
import ContextMenu from "./ContextMenu";
import InterfacePrinciples from "./InterfacePrinciples";
import LoadingButton from "./LoadingButton";
import Logo from "./Logo";
import Modal from "./Modal";
import NumberInput from "./NumberInput";
import Select from "./Select";
import Slider from "./Slider";
import Switch from "./Switch";
import Table from "./Table";
import Tabs from "./Tabs";
import Toast from "./Toast";
import Tooltip from "./Tooltip";

export const metadata = createPageMetadata({
  title: "Design",
  description:
    "Components, patterns, and design principles used across this site.",
  path: "/design",
});

const FORM_CONTROL_CLASS_NAME =
  "form-control w-full appearance-none rounded-lg border border-border bg-white px-3 py-2 text-sm leading-5 font-normal text-foreground/90 outline-hidden placeholder:text-muted focus:border-foreground/80 focus:ring-2 focus:ring-foreground/20 sm:max-w-xs";

export default function DesignSystem() {
  return (
    <>
      <PageHeader back={{ href: "/", name: "Home" }} path="/design">
        <PageTitle>Design</PageTitle>
        <PageDescription>
          Shared design system for{" "}
          <ExternalLink href="https://haritssr.com" name="haritssr.com" /> and{" "}
          <ExternalLink href="https://www.harimaki.com" name="harimaki.com" />.
        </PageDescription>
      </PageHeader>
      <div className="space-y-16">
        <Section title="Principles">
          <ol className="text-foreground [&>li::marker]:text-muted [&>li::after]:border-border list-outside list-decimal gap-16 space-y-2 leading-relaxed sm:columns-2 sm:[column-rule:1px_dashed_var(--color-border)] [&>li]:relative [&>li]:ml-7 [&>li]:break-inside-avoid [&>li]:pb-2 [&>li]:pl-1 [&>li::after]:absolute [&>li::after]:right-0 [&>li::after]:bottom-0 [&>li::after]:-left-7 [&>li::after]:border-b [&>li::after]:border-dashed [&>li::after]:content-['']">
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
              Patterns emerge from multiple observations, not a single datum.
              Mental rehearsal (usually in sleep or meditation) lets us replay
              our experiences and recognize patterns faster.
            </li>
            <InterfacePrinciples>
              <div>
                <ul className="[&>li::marker]:text-muted mt-1 list-outside list-disc space-y-1 pl-4">
                  <li>
                    <ExternalLink
                      href="https://lawsofux.com/law-of-proximity/"
                      name="Proximity"
                    />
                    : Elements close together look like a group.
                  </li>
                  <li>
                    <ExternalLink
                      href="https://lawsofux.com/pareto-principle/"
                      name="Pareto"
                    />
                    : Roughly 80% of results often come from 20% of causes.
                  </li>
                  <li>
                    <ExternalLink
                      href="https://lawsofux.com/law-of-similarity/"
                      name="Similarity"
                    />
                    : Elements with matching styles look related, even when
                    apart.
                  </li>
                  <li>
                    <ExternalLink
                      href="https://lawsofux.com/law-of-common-region/"
                      name="Common Region"
                    />
                    : Elements inside one boundary look like a group.
                  </li>
                  <li>
                    <ExternalLink
                      href="https://lawsofux.com/law-of-uniform-connectedness/"
                      name="Uniform Connectedness"
                    />
                    : A visible connection makes elements look related.
                  </li>
                  <li>
                    <ExternalLink
                      href="https://lawsofux.com/law-of-pragnanz/"
                      name="Prägnanz"
                    />
                    : People interpret complex visuals as the simplest
                    recognizable forms.
                  </li>
                  <li>
                    <ExternalLink
                      href="https://lawsofux.com/fittss-law/"
                      name="Fitts’s Law"
                    />
                    : Larger targets closer to the pointer are quicker to
                    select.
                  </li>
                  <li>
                    <ExternalLink
                      href="https://lawsofux.com/hicks-law/"
                      name="Hick’s Law"
                    />
                    : More choices, or harder choices, take longer to decide.
                  </li>
                  <li>
                    <ExternalLink
                      href="https://lawsofux.com/jakobs-law/"
                      name="Jakob’s Law"
                    />
                    : People expect interfaces to work like ones they already
                    know.
                  </li>
                  <li>
                    <ExternalLink
                      href="https://lawsofux.com/aesthetic-usability-effect/"
                      name="Aesthetic–Usability"
                    />
                    : Visual appeal can make an interface seem easier to use.
                  </li>
                  <li>
                    <ExternalLink
                      href="https://lawsofux.com/choice-overload/"
                      name="Choice Overload"
                    />
                    : Too many options can make choosing feel overwhelming.
                  </li>
                  <li>
                    <ExternalLink
                      href="https://lawsofux.com/chunking/"
                      name="Chunking"
                    />
                    : Breaking information into meaningful groups makes it
                    easier to process.
                  </li>
                  <li>
                    <ExternalLink
                      href="https://lawsofux.com/cognitive-load/"
                      name="Cognitive Load"
                    />
                    : The mental effort needed to understand and use an
                    interface.
                  </li>
                  <li>
                    <ExternalLink
                      href="https://lawsofux.com/millers-law/"
                      name="Miller’s Law"
                    />
                    : Working memory is limited; group information into
                    manageable chunks.
                  </li>
                  <li>
                    <ExternalLink
                      href="https://lawsofux.com/doherty-threshold/"
                      name="Doherty Threshold"
                    />
                    : Feedback in under 400 ms helps keep interaction flowing.
                  </li>
                  <li>
                    <ExternalLink
                      href="https://lawsofux.com/goal-gradient-effect/"
                      name="Goal Gradient"
                    />
                    : People tend to try harder as they get closer to finishing.
                  </li>
                  <li>
                    <ExternalLink
                      href="https://lawsofux.com/peak-end-rule/"
                      name="Peak–End Rule"
                    />
                    : The most intense moment and ending shape how an experience
                    is remembered.
                  </li>
                  <li>
                    <ExternalLink
                      href="https://lawsofux.com/serial-position-effect/"
                      name="Serial Position"
                    />
                    : People tend to remember the start and end of a sequence.
                  </li>
                  <li>
                    <ExternalLink
                      href="https://lawsofux.com/von-restorff-effect/"
                      name="Von Restorff"
                    />
                    : An item that differs from similar neighbors is easier to
                    remember.
                  </li>
                  <li>
                    <ExternalLink
                      href="https://lawsofux.com/postels-law/"
                      name="Postel’s Law"
                    />
                    : Accept varied input formats and give clear, consistent
                    responses.
                  </li>
                  <li>
                    <ExternalLink
                      href="https://lawsofux.com/teslers-law/"
                      name="Tesler’s Law"
                    />
                    : Some complexity cannot be removed; handle it for users
                    where possible.
                  </li>
                  <li>
                    <ExternalLink
                      href="https://lawsofux.com/zeigarnik-effect/"
                      name="Zeigarnik Effect"
                    />
                    : Unfinished or interrupted tasks tend to stay in memory
                    longer.
                  </li>
                </ul>
              </div>
            </InterfacePrinciples>
            <li>
              Consider UX through the{" "}
              <ExternalLink href="https://lawsofux.com/" name="Laws of UX" />{" "}
              and{" "}
              <ExternalLink
                href="https://developer.apple.com/design/human-interface-guidelines/design-principles"
                name="Apple’s Principles of Great Design"
              />
              .
            </li>
            <li>
              The Components system takes cues from the tools used to solve math
              and physics problems: paper, pencils, whiteboards, and pencil
              cases.
            </li>
            <li>
              Heavily inspired by{" "}
              <ExternalLink
                href="https://developer.apple.com/videos/design/"
                name="Apple design videos"
              />
              .
            </li>
            <li>
              Digital services should expand what people can do while respecting
              the limits of their attention and working memory.
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
              <ul className="[&>li::marker]:text-muted mt-1 list-outside list-disc space-y-1 pl-4">
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
              <ul className="[&>li::marker]:text-muted mt-1 list-outside list-disc space-y-1 pl-4">
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
              Colors communicate purpose:
              <ul className="[&>li::marker]:text-muted mt-1 list-outside list-disc space-y-1 pl-4">
                <li>
                  <span className="text-action">Blue</span> (action) marks
                  available actions.
                </li>
                <li>
                  <span className="text-danger">Red</span> (danger) marks
                  destructive actions and errors.
                </li>
                <li>
                  <span className="text-success">Green</span> (success) marks
                  completed tasks and successful outcomes.
                </li>
                <li>
                  <span className="text-attention">Amber</span> (attention)
                  highlights warnings and items that need attention.
                </li>
              </ul>
            </li>
            <li>
              Use Oklab/Oklch (not RGB or HSV) for random colors, palettes, and
              gradients to ensure perceptually uniform, balanced results that
              match human vision.
            </li>
            <li>
              Components include responsive behavior and keyboard focus
              treatment where interaction requires it.
            </li>
            <li>
              Defining feature or update make it easy for sharing and
              documentation.
            </li>
            <li>
              Controls use subtle shadows; floating controls sit one level
              higher. Hover raises elevation and pressing lowers it. Disabled
              controls and selects stay flat, and keyboard focus keeps a visible
              outline.
            </li>
            <li>
              Strive for one line navigation layer on all screen views as
              possible.
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
              Materi pages under the Belajar route.
            </li>
          </ol>
        </Section>

        <Section
          title="Layout"
          description="A fluid grid with equal columns and consistent spacing. Resize the window to explore each breakpoint."
        >
          <Box title="Responsive Grid">
            <div className="text-muted flex flex-wrap items-center justify-between gap-3 text-sm">
              <p className="text-foreground text-lg font-semibold tracking-tight">
                <span className="sm:hidden">1 column</span>
                <span className="hidden sm:inline md:hidden">2 columns</span>
                <span className="hidden md:inline lg:hidden">3 columns</span>
                <span className="hidden lg:inline">4 columns</span>
              </p>
              <p className="text-muted text-sm tabular-nums">
                <span className="sm:hidden">Default · gap-4</span>
                <span className="hidden sm:inline md:hidden">sm · gap-5</span>
                <span className="hidden md:inline lg:hidden">md · gap-5</span>
                <span className="hidden lg:inline">lg · gap-5</span>
              </p>
            </div>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <li
                  className="bg-interface-hover flex min-h-32 min-w-0 flex-col justify-between gap-5 rounded-lg p-5"
                  key={item}
                >
                  <span className="text-foreground text-4xl font-medium tracking-tight tabular-nums">
                    {item}
                  </span>
                  <span className="text-muted text-sm">Equal-width column</span>
                </li>
              ))}
            </ul>
            <code className="text-muted block font-mono text-base leading-relaxed wrap-anywhere">
              grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
              gap-4 sm:gap-5
            </code>
          </Box>
        </Section>

        <Section
          title="UI Components"
          contentClassName="grid grid-cols-1 md:grid-cols-2"
        >
          <div className="bg-background border-border md:after:border-border relative flex min-w-0 flex-col border-b border-dashed py-5 md:pr-5 md:after:absolute md:after:inset-y-5 md:after:right-0 md:after:border-r md:after:border-dashed [&>div]:flex-1">
            <Box name="IndexCard" title="Index Card">
              <div className="grid gap-3.5 sm:grid-cols-2">
                <IndexCard
                  title="Writing"
                  description="Notes and ideas I want to share."
                  href="/writing"
                  count={18}
                  countLabel="writing posts"
                  icon={
                    <DocumentTextIcon
                      aria-hidden="true"
                      className="text-foreground size-4.5 shrink-0"
                      strokeWidth={1.5}
                    />
                  }
                  headingLevel={3}
                />
                <IndexCard
                  title="Labs"
                  description="Experiments and interactive explorations."
                  href="/labs"
                  count={18}
                  countLabel="labs"
                  icon={
                    <DocumentTextIcon
                      aria-hidden="true"
                      className="text-foreground size-4.5 shrink-0"
                      strokeWidth={1.5}
                    />
                  }
                  headingLevel={3}
                />
              </div>
            </Box>
          </div>

          <div className="bg-background border-border flex min-w-0 flex-col border-b border-dashed py-5 md:pl-5 [&>div]:flex-1">
            <Box name="Table" title="Table">
              <Table />
            </Box>
          </div>

          <div className="bg-background border-border md:after:border-border relative flex min-w-0 flex-col border-b border-dashed py-5 md:pr-5 md:after:absolute md:after:inset-y-5 md:after:right-0 md:after:border-r md:after:border-dashed [&>div]:flex-1">
            <Box name="Switch" title="Switch">
              <Switch />
            </Box>
          </div>

          <div className="bg-background border-border flex min-w-0 flex-col border-b border-dashed py-5 md:pl-5 [&>div]:flex-1">
            <Box name="Tooltip" title="Tooltip">
              <Tooltip />
            </Box>
          </div>

          <div className="bg-background border-border md:after:border-border relative flex min-w-0 flex-col border-b border-dashed py-5 md:pr-5 md:after:absolute md:after:inset-y-5 md:after:right-0 md:after:border-r md:after:border-dashed [&>div]:flex-1">
            <Box name="Modal" title="Modal">
              <Modal />
            </Box>
          </div>

          <div className="bg-background border-border flex min-w-0 flex-col border-b border-dashed py-5 md:pl-5 [&>div]:flex-1">
            <Toast />
          </div>

          <div className="bg-background border-border md:after:border-border relative flex min-w-0 flex-col border-b border-dashed py-5 md:pr-5 md:after:absolute md:after:inset-y-5 md:after:right-0 md:after:border-r md:after:border-dashed [&>div]:flex-1">
            <Box name="Accordion" title="Accordion">
              <Accordion />
            </Box>
          </div>

          <div className="bg-background border-border flex min-w-0 flex-col border-b border-dashed py-5 md:pl-5 [&>div]:flex-1">
            <Box name="Checkbox" title="Checkbox">
              <Checkbox />
            </Box>
          </div>

          <div className="bg-background border-border flex min-w-0 flex-col border-b border-dashed py-5 md:col-span-2 [&>div]:flex-1">
            <Box name="NumberInput" title="Input: Number">
              <NumberInput />
            </Box>
          </div>

          <div className="bg-background border-border flex min-w-0 flex-col border-b border-dashed py-5 md:col-span-2 [&>div]:flex-1">
            <Box name="Button" title="Buttons">
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <LoadingButton />
                <Button variant="danger">Danger</Button>
                <Button disabled variant="secondary">
                  Disabled
                </Button>
                <ButtonIconOnly />
                <ButtonWithIcon />
              </div>
            </Box>
          </div>

          <div className="bg-background border-border md:after:border-border relative flex min-w-0 flex-col border-b border-dashed py-5 md:pr-5 md:after:absolute md:after:inset-y-5 md:after:right-0 md:after:border-r md:after:border-dashed [&>div]:flex-1">
            <Box name="InternalLink" title="Internal Link">
              <div className="space-y-2">
                <div>
                  <InternalLink href="/">Internal Link</InternalLink>
                </div>
                <div>
                  <InternalLink href="/" variant="inline">
                    Internal Link Without Arrow
                  </InternalLink>
                </div>
                <div className="text-sm">
                  <InternalLink href="/api" variant="footer">
                    API
                  </InternalLink>
                </div>
              </div>
            </Box>
          </div>

          <div className="bg-background border-border flex min-w-0 flex-col border-b border-dashed py-5 md:pl-5 [&>div]:flex-1">
            <Box name="ExternalLink" title="External Link">
              <div className="flex flex-col items-start gap-2">
                <ExternalLink
                  href="https://www.harislab.com"
                  name="External Link"
                />
                <ExternalLink
                  href="https://www.harislab.com"
                  name="External Link Without Arrow"
                  showArrow={false}
                />
              </div>
            </Box>
          </div>

          <div className="bg-background border-border md:after:border-border relative flex min-w-0 flex-col border-b border-dashed py-5 md:pr-5 md:after:absolute md:after:inset-y-5 md:after:right-0 md:after:border-r md:after:border-dashed [&>div]:flex-1">
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
          </div>

          <div className="bg-background border-border flex min-w-0 flex-col border-b border-dashed py-5 md:pl-5 [&>div]:flex-1">
            <Box title="Input: Search">
              <label className="relative block w-full sm:max-w-xs">
                <span className="sr-only">Search input</span>
                <MagnifyingGlassIcon
                  aria-hidden="true"
                  className="text-muted pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
                  strokeWidth={1.5}
                />
                <input
                  className={`${FORM_CONTROL_CLASS_NAME} pl-9`}
                  placeholder="Search"
                  type="search"
                />
              </label>
            </Box>
          </div>

          <div className="bg-background border-border md:after:border-border relative flex min-w-0 flex-col border-b border-dashed py-5 md:pr-5 md:after:absolute md:after:inset-y-5 md:after:right-0 md:after:border-r md:after:border-dashed [&>div]:flex-1">
            <Box name="Box" title="Box">
              <ul className="grid gap-5 sm:grid-cols-2">
                <Box as="li" headingAs="h3" name="Box" title="Exercise title">
                  <p>Use a heading and list item for exercise cards.</p>
                </Box>
                <Box as="li" headingAs="h3" name="Box" title="Another exercise">
                  <p>Cards stretch to the same height within each grid row.</p>
                </Box>
              </ul>
            </Box>
          </div>

          <div className="bg-background border-border flex min-w-0 flex-col border-b border-dashed py-5 md:pl-5 [&>div]:flex-1">
            <Box title="Text Area">
              <textarea
                aria-label="Text area example"
                className={FORM_CONTROL_CLASS_NAME}
                placeholder="Write something here..."
                rows={3}
              />
            </Box>
          </div>

          <div className="bg-background border-border md:after:border-border relative flex min-w-0 flex-col border-b border-dashed py-5 md:pr-5 md:after:absolute md:after:inset-y-5 md:after:right-0 md:after:border-r md:after:border-dashed [&>div]:flex-1">
            <Box name="Breadcrumbs" title="Breadcrumbs">
              <Breadcrumbs />
            </Box>
          </div>

          <div className="bg-background border-border flex min-w-0 flex-col border-b border-dashed py-5 md:pl-5 [&>div]:flex-1">
            <Box name="Badges" title="Badges">
              <Badges />
            </Box>
          </div>

          <div className="bg-background border-border md:after:border-border relative flex min-w-0 flex-col border-b border-dashed py-5 md:pr-5 md:after:absolute md:after:inset-y-5 md:after:right-0 md:after:border-r md:after:border-dashed [&>div]:flex-1">
            <Box name="BackButton" title="Back Button">
              <BackButton href="/labs" name="Labs" />
            </Box>
          </div>

          <div className="bg-background border-border flex min-w-0 flex-col border-b border-dashed py-5 md:pl-5 [&>div]:flex-1">
            <Box name="Logo" title="Logo">
              <Logo />
            </Box>
          </div>

          <div className="bg-background border-border md:after:border-border relative flex min-w-0 flex-col border-b border-dashed py-5 md:pr-5 md:after:absolute md:after:inset-y-5 md:after:right-0 md:after:border-r md:after:border-dashed [&>div]:flex-1">
            <Box name="SelectField" title="Select">
              <Select />
            </Box>
          </div>

          <div className="bg-background border-border flex min-w-0 flex-col border-b border-dashed py-5 md:pl-5 [&>div]:flex-1">
            <Box name="TabBarButtom" title="Bottom Navigation Capsule">
              <TabBarButtom preview />
            </Box>
          </div>

          <div className="bg-background border-border md:after:border-border relative flex min-w-0 flex-col border-b border-dashed py-5 md:pr-5 md:after:absolute md:after:inset-y-5 md:after:right-0 md:after:border-r md:after:border-dashed [&>div]:flex-1">
            <Box name="Slider" title="Slider">
              <Slider />
            </Box>
          </div>

          <div className="bg-background border-border flex min-w-0 flex-col border-b border-dashed py-5 md:pl-5 [&>div]:flex-1">
            <Box name="ContextMenu" title="Context Menus">
              <ContextMenu />
            </Box>
          </div>

          <div className="bg-background border-border md:after:border-border relative flex min-w-0 flex-col border-b border-dashed py-5 md:pr-5 md:after:absolute md:after:inset-y-5 md:after:right-0 md:after:border-r md:after:border-dashed [&>div]:flex-1">
            <Box name="Tabs" title="Tabs">
              <Tabs />
            </Box>
          </div>

          <div className="bg-background border-border flex min-w-0 flex-col border-b border-dashed py-5 md:pl-5 [&>div]:flex-1">
            <Box title="Input: Date">
              <label className="block w-full sm:max-w-xs">
                <span className="text-foreground/80 mb-1 block text-sm font-medium">
                  Choose a date
                </span>
                <input className={FORM_CONTROL_CLASS_NAME} type="date" />
              </label>
            </Box>
          </div>

          <div className="bg-background border-border flex min-w-0 flex-col border-b border-b-0 border-dashed py-5 md:col-span-2 [&>div]:flex-1">
            <Box name="Colors" title="Design Tokens">
              <DesignTokens />
            </Box>
          </div>
        </Section>
      </div>
    </>
  );
}
