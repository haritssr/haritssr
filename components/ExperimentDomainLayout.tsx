"use client";

import { usePathname } from "next/navigation";
import BackButton from "./BackButton";
import PageTitle from "./PageTitle";

// const experimentComponentPaths: Record<string, Record<string, string>> = {
//   browser: {
//     clock: "components/experiments/browser/ClockDemo.tsx",
//     "custom-scroll": "components/experiments/browser/CustomScrollDemo.tsx",
//     "description-list": "components/experiments/browser/DescriptionListDemo.tsx",
//     details: "components/experiments/browser/DetailsDemo.tsx",
//     "different-css-styling": "components/experiments/browser/DifferentCssStylingDemo.tsx",
//     figure: "components/experiments/browser/FigureDemo.tsx",
//     inputs: "components/experiments/browser/InputsDemo.tsx",
//     "intersection-observer-api": "components/experiments/browser/IntersectionObserverDemo.tsx",
//     "number-game": "components/experiments/browser/NumberGameDemo.tsx",
//     "scroll-title": "components/experiments/browser/ScrollTitleDemo.tsx",
//     select: "components/experiments/browser/SelectDemo.tsx",
//     "text-editing": "components/experiments/browser/TextEditingDemo.tsx",
//     "youtube-embed": "components/experiments/browser/YoutubeEmbedDemo.tsx",
//   },
//   "haris-lab": {
//     "context-modal": "components/experiments/haris-lab/ContextModalDemo.tsx",
//     "global-modal": "components/experiments/haris-lab/GlobalModalDemo.tsx",
//     "side-bar": "components/experiments/haris-lab/SideBarDemo.tsx",
//     "sidebar-hierarchy": "components/experiments/haris-lab/SidebarHierarchyDemo.tsx",
//   },
//   "headless-ui": {
//     dialog: "components/experiments/headless-ui/HeadlessDialogDemo.tsx",
//     disclosure: "components/experiments/headless-ui/HeadlessDisclosureDemo.tsx",
//     listbox: "components/experiments/headless-ui/HeadlessListboxDemo.tsx",
//     menu: "components/experiments/headless-ui/HeadlessMenuDemo.tsx",
//     popover: "components/experiments/headless-ui/HeadlessPopoverDemo.tsx",
//     "radio-group": "components/experiments/headless-ui/HeadlessRadioGroupDemo.tsx",
//     switch: "components/experiments/headless-ui/HeadlessSwitchDemo.tsx",
//     tabs: "components/experiments/headless-ui/HeadlessTabsDemo.tsx",
//   },
//   katex: {
//     basic: "components/experiments/katex/KaTeXBasicDemo.tsx",
//   },
//   mantine: {
//     carousel: "components/experiments/mantine/MantineCarouselDemo.tsx",
//   },
//   // nextjs experiments have their own routes - handled separately
//   nextjs: {
//     "next-13-image-local": "components/experiments/nextjs/NextjsImageLocalDemo.tsx",
//     "next-13-image-remote": "components/experiments/nextjs/NextjsImageRemoteDemo.tsx",
//     router: "components/experiments/nextjs/NextjsRouterDemo.tsx",
//     swr: "components/experiments/nextjs/NextjsSWRDemo.tsx",
//   },
//   "radix-ui": {
//     accordion: "components/experiments/radix-ui/RadixAccordionDemo.tsx",
//     "alert-dialog": "components/experiments/radix-ui/RadixAlertDialogDemo.tsx",
//     checkbox: "components/experiments/radix-ui/RadixCheckboxDemo.tsx",
//     collapsible: "components/experiments/radix-ui/RadixCollapsibleDemo.tsx",
//     dialog: "components/experiments/radix-ui/RadixDialogDemo.tsx",
//     "dropdown-menu": "components/experiments/radix-ui/RadixDropdownMenuDemo.tsx",
//     "hover-card": "components/experiments/radix-ui/RadixHoverCardDemo.tsx",
//     popover: "components/experiments/radix-ui/RadixPopoverDemo.tsx",
//     "radio-group": "components/experiments/radix-ui/RadixRadioGroupDemo.tsx",
//     "scroll-area": "components/experiments/radix-ui/RadixScrollAreaDemo.tsx",
//     select: "components/experiments/radix-ui/RadixSelectDemo.tsx",
//     slider: "components/experiments/radix-ui/RadixSliderDemo.tsx",
//     switch: "components/experiments/radix-ui/RadixSwitchDemo.tsx",
//     tabs: "components/experiments/radix-ui/RadixTabsDemo.tsx",
//     toast: "components/experiments/radix-ui/RadixToastDemo.tsx",
//     toggle: "components/experiments/radix-ui/RadixToggleDemo.tsx",
//     "toggle-group": "components/experiments/radix-ui/RadixToggleGroupDemo.tsx",
//     toolbar: "components/experiments/radix-ui/RadixToolbarDemo.tsx",
//     tooltip: "components/experiments/radix-ui/RadixTooltipDemo.tsx",
//   },
//   react: {
//     cmdk: "components/experiments/react/ReactCmdkDemo.tsx",
//     confetti: "components/experiments/react/ReactConfettiDemo.tsx",
//     counter: "components/experiments/react/ReactCounterDemo.tsx",
//     "edit-profile": "components/experiments/react/ReactEditProfileDemo.tsx",
//     "font-mixer": "components/experiments/react/ReactFontMixerDemo.tsx",
//     forwardrefexample: "components/experiments/react/ReactForwardRefDemo.tsx",
//     "functional-props": "components/experiments/react/ReactFunctionalPropsDemo.tsx",
//     "generic-select": "components/experiments/react/ReactGenericSelectDemo.tsx",
//     "modal-inside-modal": "components/experiments/react/ReactModalInsideModalDemo.tsx",
//     "search-books": "components/experiments/react/ReactSearchBooksDemo.tsx",
//     "search-interpol": "components/experiments/react/ReactSearchInterpolDemo.tsx",
//     "search-table": "components/experiments/react/ReactSearchTableDemo.tsx",
//     "searchable-product-data": "components/experiments/react/ReactSearchableProductDataDemo.tsx",
//     "submit-form": "components/experiments/react/ReactSubmitFormDemo.tsx",
//     "usecontext-dark-mode": "components/experiments/react/ReactUseContextDarkModeDemo.tsx",
//     "useeffect-title": "components/experiments/react/ReactUseEffectTitleDemo.tsx",
//     useimperativehandle: "components/experiments/react/ReactUseImperativeHandleDemo.tsx",
//     "usememo-1": "components/experiments/react/ReactUseMemo1Demo.tsx",
//     "usereducer-todo-list": "components/experiments/react/ReactUseReducerTodoListDemo.tsx",
//     "usereducer-todo-list-immer": "components/experiments/react/ReactUseReducerTodoListImmerDemo.tsx",
//     "usestate-draggable-box": "components/experiments/react/ReactUseStateDraggableBoxDemo.tsx",
//     "usestate-form": "components/experiments/react/ReactUseStateFormDemo.tsx",
//     "usestate-object-form": "components/experiments/react/ReactUseStateObjectFormDemo.tsx",
//     "usestate-reacting-to-input": "components/experiments/react/ReactUseStateReactingToInputDemo.tsx",
//     "usestate-todo-list": "components/experiments/react/ReactUseStateTodoListDemo.tsx",
//     "react-wrap-balancer": "components/experiments/react/ReactWrapBalancerDemo.tsx",
//   },
//   "react-aria": {
//     calendar: "components/experiments/react-aria/ReactAriaCalendarDemo.tsx",
//   },
//   "react-query": {
//     basic: "components/experiments/react-query/ReactQueryBasicDemo.tsx",
//   },
//   "react-table": {
//     basic: "components/experiments/react-table/ReactTableBasicDemo.tsx",
//     "column-group": "components/experiments/react-table/ReactTableColumnGroupDemo.tsx",
//     "column-ordering": "components/experiments/react-table/ReactTableColumnOrderingDemo.tsx",
//     "column-pinning": "components/experiments/react-table/ReactTableColumnPinningDemo.tsx",
//   },
//   "tailwind-css": {
//     "apple-navbar": "components/experiments/tailwind-css/TailwindAppleNavbarDemo.tsx",
//     blurry: "components/experiments/tailwind-css/TailwindBlurryDemo.tsx",
//     "centering-div": "components/experiments/tailwind-css/TailwindCenteringDivDemo.tsx",
//     columns: "components/experiments/tailwind-css/TailwindColumnsDemo.tsx",
//     feedback: "components/experiments/tailwind-css/TailwindFeedbackDemo.tsx",
//     "floating-labels": "components/experiments/tailwind-css/TailwindFloatingLabelsDemo.tsx",
//     "glowing-background": "components/experiments/tailwind-css/TailwindGlowingBackgroundDemo.tsx",
//     grid: "components/experiments/tailwind-css/TailwindGridDemo.tsx",
//     newspaper: "components/experiments/tailwind-css/TailwindNewspaperDemo.tsx",
//     "planetscale-navbar": "components/experiments/tailwind-css/TailwindPlanetscaleNavbarDemo.tsx",
//     position: "components/experiments/tailwind-css/TailwindPositionDemo.tsx",
//     sidebar: "components/experiments/tailwind-css/TailwindSidebarDemo.tsx",
//     "tailwind-vs-apple-color": "components/experiments/tailwind-css/TailwindVsAppleColorDemo.tsx",
//     "youtube-thumbnail": "components/experiments/tailwind-css/TailwindYoutubeThumbnailDemo.tsx",
//   },
//   "ui-explorations": {
//     "notion-navbar": "components/experiments/ui-explorations/NotionNavbarDemo.tsx",
//     pure: "components/experiments/ui-explorations/PureDemo.tsx",
//     "times-table": "components/experiments/ui-explorations/TimesTableDemo.tsx",
//     "inline-maki": "components/experiments/ui-explorations/InlineMakiDemo.tsx",
//   },
//   visx: {
//     "bar-chart": "components/experiments/visx/VisxBarChartDemo.tsx",
//     "pie-chart": "components/experiments/visx/VisxPieChartDemo.tsx",
//   },
// };

interface ExperimentDomainLayoutProps {
  children: React.ReactNode;
  domain: string;
}

export default function ExperimentDomainLayout({ children, domain }: ExperimentDomainLayoutProps) {
  const pathname = usePathname();

  // Get domain display name
  const domainDisplayName = domain
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Get experiment title from pathname
  const segments = pathname?.split("/") || [];
  const experimentSlug = segments.at(-1);
  const isIndexPage = segments.length === 3; // /experiments/[domain]

  // Get title for the page
  const title = isIndexPage
    ? domainDisplayName
    : experimentSlug
        ?.split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ") || domainDisplayName;

  return (
    <div className="min-h-screen w-full sm:-mt-px">
      <div className="w-full sm:border-t">
        <article className="sm:px-0">
          <BackButton href="/experiments" name="Back" />
          {!isIndexPage && <PageTitle title={title} />}
          {children}
        </article>
      </div>
    </div>
  );
}
