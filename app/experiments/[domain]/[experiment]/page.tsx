import type { Metadata } from "next";
import { notFound } from "next/navigation";

// Import all experiment components
import ClockDemo from "@/components/experiments/browser/ClockDemo";
import CustomScrollDemo from "@/components/experiments/browser/CustomScrollDemo";
import DescriptionListDemo from "@/components/experiments/browser/DescriptionListDemo";
import DetailsDemo from "@/components/experiments/browser/DetailsDemo";
import DifferentCssStylingDemo from "@/components/experiments/browser/DifferentCssStylingDemo";
import FigureDemo from "@/components/experiments/browser/FigureDemo";
import InputsDemo from "@/components/experiments/browser/InputsDemo";
import IntersectionObserverDemo from "@/components/experiments/browser/IntersectionObserverDemo";
import NumberGameDemo from "@/components/experiments/browser/NumberGameDemo";
import ScrollTitleDemo from "@/components/experiments/browser/ScrollTitleDemo";
import SelectDemo from "@/components/experiments/browser/SelectDemo";
import TextEditingDemo from "@/components/experiments/browser/TextEditingDemo";
import YoutubeEmbedDemo from "@/components/experiments/browser/YoutubeEmbedDemo";

import ContextModalDemo from "@/components/experiments/haris-lab/ContextModalDemo";
import GlobalModalDemo from "@/components/experiments/haris-lab/GlobalModalDemo";
import SideBarDemo from "@/components/experiments/haris-lab/SideBarDemo";
import SidebarHierarchyDemo from "@/components/experiments/haris-lab/SidebarHierarchyDemo";

import HeadlessDialogDemo from "@/components/experiments/headless-ui/HeadlessDialogDemo";
import HeadlessDisclosureDemo from "@/components/experiments/headless-ui/HeadlessDisclosureDemo";
import HeadlessListboxDemo from "@/components/experiments/headless-ui/HeadlessListboxDemo";
import HeadlessMenuDemo from "@/components/experiments/headless-ui/HeadlessMenuDemo";
import HeadlessPopoverDemo from "@/components/experiments/headless-ui/HeadlessPopoverDemo";
import HeadlessRadioGroupDemo from "@/components/experiments/headless-ui/HeadlessRadioGroupDemo";
import HeadlessSwitchDemo from "@/components/experiments/headless-ui/HeadlessSwitchDemo";
import HeadlessTabsDemo from "@/components/experiments/headless-ui/HeadlessTabsDemo";

import KaTeXBasicDemo from "@/components/experiments/katex/KaTeXBasicDemo";

import MantineCarouselDemo from "@/components/experiments/mantine/MantineCarouselDemo";

import NextjsImageLocalDemo from "@/components/experiments/nextjs/NextjsImageLocalDemo";
import NextjsImageRemoteDemo from "@/components/experiments/nextjs/NextjsImageRemoteDemo";
import NextjsRouterDemo from "@/components/experiments/nextjs/NextjsRouterDemo";
import NextjsSWRDemo from "@/components/experiments/nextjs/NextjsSWRDemo";

import RadixAccordionDemo from "@/components/experiments/radix-ui/RadixAccordionDemo";
import RadixAlertDialogDemo from "@/components/experiments/radix-ui/RadixAlertDialogDemo";
import RadixCheckboxDemo from "@/components/experiments/radix-ui/RadixCheckboxDemo";
import RadixCollapsibleDemo from "@/components/experiments/radix-ui/RadixCollapsibleDemo";
import RadixDialogDemo from "@/components/experiments/radix-ui/RadixDialogDemo";
import RadixDropdownMenuDemo from "@/components/experiments/radix-ui/RadixDropdownMenuDemo";
import RadixHoverCardDemo from "@/components/experiments/radix-ui/RadixHoverCardDemo";
import RadixPopoverDemo from "@/components/experiments/radix-ui/RadixPopoverDemo";
import RadixRadioGroupDemo from "@/components/experiments/radix-ui/RadixRadioGroupDemo";
import RadixScrollAreaDemo from "@/components/experiments/radix-ui/RadixScrollAreaDemo";
import RadixSelectDemo from "@/components/experiments/radix-ui/RadixSelectDemo";
import RadixSliderDemo from "@/components/experiments/radix-ui/RadixSliderDemo";
import RadixSwitchDemo from "@/components/experiments/radix-ui/RadixSwitchDemo";
import RadixTabsDemo from "@/components/experiments/radix-ui/RadixTabsDemo";
import RadixToastDemo from "@/components/experiments/radix-ui/RadixToastDemo";
import RadixToggleDemo from "@/components/experiments/radix-ui/RadixToggleDemo";
import RadixToggleGroupDemo from "@/components/experiments/radix-ui/RadixToggleGroupDemo";
import RadixToolbarDemo from "@/components/experiments/radix-ui/RadixToolbarDemo";
import RadixTooltipDemo from "@/components/experiments/radix-ui/RadixTooltipDemo";
import ReactCmdkDemo from "@/components/experiments/react/ReactCmdkDemo";
import ReactConfettiDemo from "@/components/experiments/react/ReactConfettiDemo";
import ReactCounterDemo from "@/components/experiments/react/ReactCounterDemo";
import ReactEditProfileDemo from "@/components/experiments/react/ReactEditProfileDemo";
import ReactFontMixerDemo from "@/components/experiments/react/ReactFontMixerDemo";
import ReactForwardRefDemo from "@/components/experiments/react/ReactForwardRefDemo";
import ReactFunctionalPropsDemo from "@/components/experiments/react/ReactFunctionalPropsDemo";
import ReactGenericSelectDemo from "@/components/experiments/react/ReactGenericSelectDemo";
import ReactModalInsideModalDemo from "@/components/experiments/react/ReactModalInsideModalDemo";
import ReactSearchableProductDataDemo from "@/components/experiments/react/ReactSearchableProductDataDemo";
import ReactSearchBooksDemo from "@/components/experiments/react/ReactSearchBooksDemo";
import ReactSearchInterpolDemo from "@/components/experiments/react/ReactSearchInterpolDemo";
import ReactSearchTableDemo from "@/components/experiments/react/ReactSearchTableDemo";
import ReactSubmitFormDemo from "@/components/experiments/react/ReactSubmitFormDemo";
import ReactUseContextDarkModeDemo from "@/components/experiments/react/ReactUseContextDarkModeDemo";
import ReactUseEffectTitleDemo from "@/components/experiments/react/ReactUseEffectTitleDemo";
import ReactUseImperativeHandleDemo from "@/components/experiments/react/ReactUseImperativeHandleDemo";
import ReactUseMemo1Demo from "@/components/experiments/react/ReactUseMemo1Demo";
import ReactUseReducerTodoListDemo from "@/components/experiments/react/ReactUseReducerTodoListDemo";
import ReactUseReducerTodoListImmerDemo from "@/components/experiments/react/ReactUseReducerTodoListImmerDemo";
import ReactUseStateDraggableBoxDemo from "@/components/experiments/react/ReactUseStateDraggableBoxDemo";
import ReactUseStateFormDemo from "@/components/experiments/react/ReactUseStateFormDemo";
import ReactUseStateObjectFormDemo from "@/components/experiments/react/ReactUseStateObjectFormDemo";
import ReactUseStateReactingToInputDemo from "@/components/experiments/react/ReactUseStateReactingToInputDemo";
import ReactUseStateTodoListDemo from "@/components/experiments/react/ReactUseStateTodoListDemo";
import ReactWrapBalancerDemo from "@/components/experiments/react/ReactWrapBalancerDemo";

import ReactAriaCalendarDemo from "@/components/experiments/react-aria/ReactAriaCalendarDemo";

import ReactQueryBasicDemo from "@/components/experiments/react-query/ReactQueryBasicDemo";

import ReactTableBasicDemo from "@/components/experiments/react-table/ReactTableBasicDemo";
import ReactTableColumnGroupDemo from "@/components/experiments/react-table/ReactTableColumnGroupDemo";
import ReactTableColumnOrderingDemo from "@/components/experiments/react-table/ReactTableColumnOrderingDemo";
import ReactTableColumnPinningDemo from "@/components/experiments/react-table/ReactTableColumnPinningDemo";

import TailwindAppleNavbarDemo from "@/components/experiments/tailwind-css/TailwindAppleNavbarDemo";
import TailwindBlurryDemo from "@/components/experiments/tailwind-css/TailwindBlurryDemo";
import TailwindCenteringDivDemo from "@/components/experiments/tailwind-css/TailwindCenteringDivDemo";
import TailwindColumnsDemo from "@/components/experiments/tailwind-css/TailwindColumnsDemo";
import TailwindFeedbackDemo from "@/components/experiments/tailwind-css/TailwindFeedbackDemo";
import TailwindFloatingLabelsDemo from "@/components/experiments/tailwind-css/TailwindFloatingLabelsDemo";
import TailwindGlowingBackgroundDemo from "@/components/experiments/tailwind-css/TailwindGlowingBackgroundDemo";
import TailwindGridDemo from "@/components/experiments/tailwind-css/TailwindGridDemo";
import TailwindNewspaperDemo from "@/components/experiments/tailwind-css/TailwindNewspaperDemo";
import TailwindPlanetscaleNavbarDemo from "@/components/experiments/tailwind-css/TailwindPlanetscaleNavbarDemo";
import TailwindPositionDemo from "@/components/experiments/tailwind-css/TailwindPositionDemo";
import TailwindSidebarDemo from "@/components/experiments/tailwind-css/TailwindSidebarDemo";
import TailwindVsAppleColorDemo from "@/components/experiments/tailwind-css/TailwindVsAppleColorDemo";
import TailwindYoutubeThumbnailDemo from "@/components/experiments/tailwind-css/TailwindYoutubeThumbnailDemo";

import NotionNavbarDemo from "@/components/experiments/ui-explorations/NotionNavbarDemo";

import VisxBarChartDemo from "@/components/experiments/visx/VisxBarChartDemo";
import VisxPieChartDemo from "@/components/experiments/visx/VisxPieChartDemo";

// Generate metadata for each experiment page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ domain: string; experiment: string }>;
}): Promise<Metadata> {
  const { domain, experiment } = await params;

  // Convert slug to title (e.g., "custom-scroll" -> "Custom Scroll")
  const title = experiment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Convert domain slug to display name (e.g., "tailwind-css" -> "Tailwind Css")
  const domainDisplayName = domain
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${title} | ${domainDisplayName} Experiments`,
    description: `${title} experiment in ${domainDisplayName}`,
  };
}

// Experiment component mapping
const experimentComponents: Record<
  string,
  Record<string, React.ComponentType>
> = {
  browser: {
    clock: ClockDemo,
    "custom-scroll": CustomScrollDemo,
    "description-list": DescriptionListDemo,
    details: DetailsDemo,
    "different-css-styling": DifferentCssStylingDemo,
    figure: FigureDemo,
    inputs: InputsDemo,
    "intersection-observer-api": IntersectionObserverDemo,
    "number-game": NumberGameDemo,
    "scroll-title": ScrollTitleDemo,
    select: SelectDemo,
    "text-editing": TextEditingDemo,
    "youtube-embed": YoutubeEmbedDemo,
  },
  "haris-lab": {
    "context-modal": ContextModalDemo,
    "global-modal": GlobalModalDemo,
    "side-bar": SideBarDemo,
    "sidebar-hierarchy": SidebarHierarchyDemo,
  },
  "headless-ui": {
    dialog: HeadlessDialogDemo,
    disclosure: HeadlessDisclosureDemo,
    listbox: HeadlessListboxDemo,
    menu: HeadlessMenuDemo,
    popover: HeadlessPopoverDemo,
    "radio-group": HeadlessRadioGroupDemo,
    switch: HeadlessSwitchDemo,
    tabs: HeadlessTabsDemo,
  },
  katex: {
    basic: KaTeXBasicDemo,
  },
  mantine: {
    carousel: MantineCarouselDemo,
  },
  nextjs: {
    "next-13-image-local": NextjsImageLocalDemo,
    "next-13-image-remote": NextjsImageRemoteDemo,
    router: NextjsRouterDemo,
    swr: NextjsSWRDemo,
  },
  "radix-ui": {
    accordion: RadixAccordionDemo,
    "alert-dialog": RadixAlertDialogDemo,
    checkbox: RadixCheckboxDemo,
    collapsible: RadixCollapsibleDemo,
    dialog: RadixDialogDemo,
    "dropdown-menu": RadixDropdownMenuDemo,
    "hover-card": RadixHoverCardDemo,
    popover: RadixPopoverDemo,
    "radio-group": RadixRadioGroupDemo,
    "scroll-area": RadixScrollAreaDemo,
    select: RadixSelectDemo,
    slider: RadixSliderDemo,
    switch: RadixSwitchDemo,
    tabs: RadixTabsDemo,
    toast: RadixToastDemo,
    toggle: RadixToggleDemo,
    "toggle-group": RadixToggleGroupDemo,
    toolbar: RadixToolbarDemo,
    tooltip: RadixTooltipDemo,
  },
  react: {
    confetti: ReactConfettiDemo,
    counter: ReactCounterDemo,
    "edit-profile": ReactEditProfileDemo,
    "font-mixer": ReactFontMixerDemo,
    forwardrefexample: ReactForwardRefDemo,
    "functional-props": ReactFunctionalPropsDemo,
    "generic-select": ReactGenericSelectDemo,
    "modal-inside-modal": ReactModalInsideModalDemo,
    "search-books": ReactSearchBooksDemo,
    "search-interpol": ReactSearchInterpolDemo,
    "search-table": ReactSearchTableDemo,
    "searchable-product-data": ReactSearchableProductDataDemo,
    "submit-form": ReactSubmitFormDemo,

    "usecontext-dark-mode": ReactUseContextDarkModeDemo,
    "useeffect-title": ReactUseEffectTitleDemo,
    useimperativehandle: ReactUseImperativeHandleDemo,
    "usememo-1": ReactUseMemo1Demo,
    "usereducer-todo-list": ReactUseReducerTodoListDemo,
    "usereducer-todo-list-immer": ReactUseReducerTodoListImmerDemo,
    "usestate-draggable-box": ReactUseStateDraggableBoxDemo,
    "usestate-form": ReactUseStateFormDemo,
    "usestate-object-form": ReactUseStateObjectFormDemo,
    "usestate-reacting-to-input": ReactUseStateReactingToInputDemo,
    "usestate-todo-list": ReactUseStateTodoListDemo,
    "react-wrap-balancer": ReactWrapBalancerDemo,
    cmdk: ReactCmdkDemo,
  },
  "react-aria": {
    calendar: ReactAriaCalendarDemo,
  },
  "react-query": {
    basic: ReactQueryBasicDemo,
  },
  "react-table": {
    basic: ReactTableBasicDemo,
    "column-group": ReactTableColumnGroupDemo,
    "column-ordering": ReactTableColumnOrderingDemo,
    "column-pinning": ReactTableColumnPinningDemo,
  },
  "tailwind-css": {
    "apple-navbar": TailwindAppleNavbarDemo,
    blurry: TailwindBlurryDemo,
    "centering-div": TailwindCenteringDivDemo,
    columns: TailwindColumnsDemo,
    feedback: TailwindFeedbackDemo,
    "floating-labels": TailwindFloatingLabelsDemo,
    "glowing-background": TailwindGlowingBackgroundDemo,
    grid: TailwindGridDemo,
    newspaper: TailwindNewspaperDemo,
    "planetscale-navbar": TailwindPlanetscaleNavbarDemo,
    position: TailwindPositionDemo,
    sidebar: TailwindSidebarDemo,
    "tailwind-vs-apple-color": TailwindVsAppleColorDemo,
    "youtube-thumbnail": TailwindYoutubeThumbnailDemo,
  },
  "ui-explorations": {
    "notion-navbar": NotionNavbarDemo,
  },
  visx: {
    "bar-chart": VisxBarChartDemo,
    "pie-chart": VisxPieChartDemo,
  },
};

export default async function ExperimentPage({
  params,
}: {
  params: Promise<{ domain: string; experiment: string }>;
}) {
  const { domain, experiment } = await params;

  const domainExperiments = experimentComponents[domain];
  if (!domainExperiments) {
    notFound();
  }

  const ExperimentComponent = domainExperiments[experiment];
  if (!ExperimentComponent) {
    notFound();
  }

  return <ExperimentComponent />;
}

export function generateStaticParams() {
  const params: Array<{ domain: string; experiment: string }> = [];

  for (const [domain, experiments] of Object.entries(experimentComponents)) {
    for (const experiment of Object.keys(experiments)) {
      params.push({ domain, experiment });
    }
  }

  return params;
}
