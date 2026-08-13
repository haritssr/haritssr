import type { Metadata } from "next";
import { notFound } from "next/navigation";

// Browser
import Clock from "@/components/experiments/browser/ClockDemo";
import CustomScroll from "@/components/experiments/browser/CustomScrollDemo";
import DescriptionList from "@/components/experiments/browser/DescriptionListDemo";
import Details from "@/components/experiments/browser/DetailsDemo";
import DifferentCssStyling from "@/components/experiments/browser/DifferentCssStylingDemo";
import Figure from "@/components/experiments/browser/FigureDemo";
import Inputs from "@/components/experiments/browser/InputsDemo";
import IntersectionObserverApi from "@/components/experiments/browser/IntersectionObserverDemo";
import NumberGame from "@/components/experiments/browser/NumberGameDemo";
import ScrollTitle from "@/components/experiments/browser/ScrollTitleDemo";
import Select from "@/components/experiments/browser/SelectDemo";
import TextEditing from "@/components/experiments/browser/TextEditingDemo";
import YoutubeEmbed from "@/components/experiments/browser/YoutubeEmbedDemo";

// Haris Lab
import ContextModal from "@/components/experiments/haris-lab/ContextModalDemo";
import GlobalModal from "@/components/experiments/haris-lab/GlobalModalDemo";
import SideBar from "@/components/experiments/haris-lab/SideBarDemo";
import SidebarHierarchy from "@/components/experiments/haris-lab/SidebarHierarchyDemo";

// Headless UI
import HeadlessDialog from "@/components/experiments/headless-ui/HeadlessDialogDemo";
import HeadlessDisclosure from "@/components/experiments/headless-ui/HeadlessDisclosureDemo";
import HeadlessListbox from "@/components/experiments/headless-ui/HeadlessListboxDemo";
import HeadlessMenu from "@/components/experiments/headless-ui/HeadlessMenuDemo";
import HeadlessPopover from "@/components/experiments/headless-ui/HeadlessPopoverDemo";
import HeadlessRadioGroup from "@/components/experiments/headless-ui/HeadlessRadioGroupDemo";
import HeadlessSwitch from "@/components/experiments/headless-ui/HeadlessSwitchDemo";
import HeadlessTabs from "@/components/experiments/headless-ui/HeadlessTabsDemo";

// KaTeX
import KaTeXBasic from "@/components/experiments/katex/KaTeXBasicDemo";

// Mantine
import MantineCarousel from "@/components/experiments/mantine/MantineCarouselDemo";

//Next.js
import NextjsImageLocal from "@/components/experiments/nextjs/NextjsImageLocalDemo";
import NextjsImageRemote from "@/components/experiments/nextjs/NextjsImageRemoteDemo";
import NextjsRouter from "@/components/experiments/nextjs/NextjsRouterDemo";
import NextjsSWR from "@/components/experiments/nextjs/NextjsSWRDemo";

// Radix UI
import RadixAccordion from "@/components/experiments/radix-ui/RadixAccordionDemo";
import RadixAlertDialog from "@/components/experiments/radix-ui/RadixAlertDialogDemo";
import RadixCheckbox from "@/components/experiments/radix-ui/RadixCheckboxDemo";
import RadixCollapsible from "@/components/experiments/radix-ui/RadixCollapsibleDemo";
import RadixDialog from "@/components/experiments/radix-ui/RadixDialogDemo";
import RadixDropdownMenu from "@/components/experiments/radix-ui/RadixDropdownMenuDemo";
import RadixHoverCard from "@/components/experiments/radix-ui/RadixHoverCardDemo";
import RadixPopover from "@/components/experiments/radix-ui/RadixPopoverDemo";
import RadixRadioGroup from "@/components/experiments/radix-ui/RadixRadioGroupDemo";
import RadixScrollArea from "@/components/experiments/radix-ui/RadixScrollAreaDemo";
import RadixSelect from "@/components/experiments/radix-ui/RadixSelectDemo";
import RadixSlider from "@/components/experiments/radix-ui/RadixSliderDemo";
import RadixSwitch from "@/components/experiments/radix-ui/RadixSwitchDemo";
import RadixTabs from "@/components/experiments/radix-ui/RadixTabsDemo";
import RadixToast from "@/components/experiments/radix-ui/RadixToastDemo";
import RadixToggle from "@/components/experiments/radix-ui/RadixToggleDemo";
import RadixToggleGroup from "@/components/experiments/radix-ui/RadixToggleGroupDemo";
import RadixToolbar from "@/components/experiments/radix-ui/RadixToolbarDemo";
import RadixTooltip from "@/components/experiments/radix-ui/RadixTooltipDemo";
import ActivityDemo from "@/components/experiments/react/ActivityDemo";

// React
import ReactCmdk from "@/components/experiments/react/ReactCmdkDemo";
import ReactConfetti from "@/components/experiments/react/ReactConfettiDemo";
import ReactCounter from "@/components/experiments/react/ReactCounterDemo";
import ReactEditProfile from "@/components/experiments/react/ReactEditProfileDemo";
import ReactFontMixer from "@/components/experiments/react/ReactFontMixerDemo";
import ReactFunctionalProps from "@/components/experiments/react/ReactFunctionalPropsDemo";
import ReactGenericSelect from "@/components/experiments/react/ReactGenericSelectDemo";
import ReactModalInsideModal from "@/components/experiments/react/ReactModalInsideModalDemo";
import ReactSearchableProductData from "@/components/experiments/react/ReactSearchableProductDataDemo";
import ReactSearchBooks from "@/components/experiments/react/ReactSearchBooksDemo";
import ReactSearchInterpol from "@/components/experiments/react/ReactSearchInterpolDemo";
import ReactSearchTable from "@/components/experiments/react/ReactSearchTableDemo";
import ReactSubmitForm from "@/components/experiments/react/ReactSubmitFormDemo";
import ReactUseContextDarkMode from "@/components/experiments/react/ReactUseContextDarkModeDemo";
import ReactUseEffectTitle from "@/components/experiments/react/ReactUseEffectTitleDemo";
import ReactUseImperativeHandle from "@/components/experiments/react/ReactUseImperativeHandleDemo";
import ReactUseMemo1 from "@/components/experiments/react/ReactUseMemo1Demo";
import ReactUseReducerJuly2026 from "@/components/experiments/react/ReactUseReducerJuly2026";
import ReactUseReducerTodoList from "@/components/experiments/react/ReactUseReducerTodoListDemo";
import ReactUseReducerTodoListImmer from "@/components/experiments/react/ReactUseReducerTodoListImmerDemo";
import ReactUseStateDraggableBox from "@/components/experiments/react/ReactUseStateDraggableBoxDemo";
import ReactUseStateForm from "@/components/experiments/react/ReactUseStateFormDemo";
import ReactUseStateObjectForm from "@/components/experiments/react/ReactUseStateObjectFormDemo";
import ReactUseStateReactingToInput from "@/components/experiments/react/ReactUseStateReactingToInputDemo";
import ReactUseStateTodoList from "@/components/experiments/react/ReactUseStateTodoListDemo";
import ReactWrapBalancer from "@/components/experiments/react/ReactWrapBalancerDemo";
import SimpleSearch from "@/components/experiments/react/SimpleSearch";

// React Aria
import ReactAriaCalendar from "@/components/experiments/react-aria/ReactAriaCalendarDemo";

// React Query
import ReactQueryBasic from "@/components/experiments/react-query/ReactQueryBasicDemo";

// React Table
import ReactTableBasic from "@/components/experiments/react-table/ReactTableBasicDemo";
import ReactTableColumnGroup from "@/components/experiments/react-table/ReactTableColumnGroupDemo";

// Tailwind CSS
import TailwindAppleNavbar from "@/components/experiments/tailwind-css/TailwindAppleNavbarDemo";
import TailwindBlurry from "@/components/experiments/tailwind-css/TailwindBlurryDemo";
import TailwindCenteringDiv from "@/components/experiments/tailwind-css/TailwindCenteringDivDemo";
import TailwindColumns from "@/components/experiments/tailwind-css/TailwindColumnsDemo";
import TailwindFeedback from "@/components/experiments/tailwind-css/TailwindFeedbackDemo";
import TailwindFloatingLabels from "@/components/experiments/tailwind-css/TailwindFloatingLabelsDemo";
import TailwindGlowingBackground from "@/components/experiments/tailwind-css/TailwindGlowingBackgroundDemo";
import TailwindGrid from "@/components/experiments/tailwind-css/TailwindGridDemo";
import TailwindNewspaper from "@/components/experiments/tailwind-css/TailwindNewspaperDemo";
import TailwindPlanetscaleNavbar from "@/components/experiments/tailwind-css/TailwindPlanetscaleNavbarDemo";
import TailwindPosition from "@/components/experiments/tailwind-css/TailwindPositionDemo";
import TailwindSidebar from "@/components/experiments/tailwind-css/TailwindSidebarDemo";
import TailwindVsAppleColor from "@/components/experiments/tailwind-css/TailwindVsAppleColorDemo";
import TailwindYoutubeThumbnail from "@/components/experiments/tailwind-css/TailwindYoutubeThumbnailDemo";

// UI Explorations
import InlineMaki from "@/components/experiments/ui-explorations/InlineMakiDemo";
import InputList from "@/components/experiments/ui-explorations/InputList";
import NotionNavbar from "@/components/experiments/ui-explorations/NotionNavbarDemo";
import Pure from "@/components/experiments/ui-explorations/PureDemo";
import Stopwatch from "@/components/experiments/ui-explorations/Stopwatch";
import TimesTable from "@/components/experiments/ui-explorations/TimesTableDemo";
import YearlyInterest from "@/components/experiments/ui-explorations/YearlyInterest";

// Visx
import VisxBarChart from "@/components/experiments/visx/VisxBarChartDemo";
import VisxPieChart from "@/components/experiments/visx/VisxPieChartDemo";

// Generate metadata for each experiment page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ domain: string; experiment: string }>;
}): Promise<Metadata> {
  const { domain, experiment } = await params;

  const title = experiment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const domainDisplayName = domain
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    description: `${title} experiment in ${domainDisplayName}`,
    title: `${title} | ${domainDisplayName} Experiments`,
  };
}

// Experiment component mapping
const experimentComponents: Record<
  string,
  Record<string, React.ComponentType>
> = {
  browser: {
    clock: Clock,
    "custom-scroll": CustomScroll,
    "description-list": DescriptionList,
    details: Details,
    "different-css-styling": DifferentCssStyling,
    figure: Figure,
    inputs: Inputs,
    "intersection-observer-api": IntersectionObserverApi,
    "number-game": NumberGame,
    "scroll-title": ScrollTitle,
    select: Select,
    "text-editing": TextEditing,
    "youtube-embed": YoutubeEmbed,
  },
  "haris-lab": {
    "context-modal": ContextModal,
    "global-modal": GlobalModal,
    "side-bar": SideBar,
    "sidebar-hierarchy": SidebarHierarchy,
  },
  "headless-ui": {
    dialog: HeadlessDialog,
    disclosure: HeadlessDisclosure,
    listbox: HeadlessListbox,
    menu: HeadlessMenu,
    popover: HeadlessPopover,
    "radio-group": HeadlessRadioGroup,
    switch: HeadlessSwitch,
    tabs: HeadlessTabs,
  },
  katex: {
    basic: KaTeXBasic,
  },
  mantine: {
    carousel: MantineCarousel,
  },
  nextjs: {
    "next-13-image-local": NextjsImageLocal,
    "next-13-image-remote": NextjsImageRemote,
    router: NextjsRouter,
    swr: NextjsSWR,
  },
  "radix-ui": {
    accordion: RadixAccordion,
    "alert-dialog": RadixAlertDialog,
    checkbox: RadixCheckbox,
    collapsible: RadixCollapsible,
    dialog: RadixDialog,
    "dropdown-menu": RadixDropdownMenu,
    "hover-card": RadixHoverCard,
    popover: RadixPopover,
    "radio-group": RadixRadioGroup,
    "scroll-area": RadixScrollArea,
    select: RadixSelect,
    slider: RadixSlider,
    switch: RadixSwitch,
    tabs: RadixTabs,
    toast: RadixToast,
    toggle: RadixToggle,
    "toggle-group": RadixToggleGroup,
    toolbar: RadixToolbar,
    tooltip: RadixTooltip,
  },
  react: {
    "activity-demo": ActivityDemo,
    cmdk: ReactCmdk,
    confetti: ReactConfetti,
    counter: ReactCounter,
    "edit-profile": ReactEditProfile,
    "font-mixer": ReactFontMixer,
    "functional-props": ReactFunctionalProps,
    "generic-select": ReactGenericSelect,
    "modal-inside-modal": ReactModalInsideModal,
    "react-use-reducer-july-2026": ReactUseReducerJuly2026,
    "react-wrap-balancer": ReactWrapBalancer,
    "search-books": ReactSearchBooks,
    "search-interpol": ReactSearchInterpol,
    "search-table": ReactSearchTable,
    "searchable-product-data": ReactSearchableProductData,
    "simple-search": SimpleSearch,
    "submit-form": ReactSubmitForm,
    "usecontext-dark-mode": ReactUseContextDarkMode,
    "useeffect-title": ReactUseEffectTitle,
    useimperativehandle: ReactUseImperativeHandle,
    "usememo-1": ReactUseMemo1,
    "usereducer-todo-list": ReactUseReducerTodoList,
    "usereducer-todo-list-immer": ReactUseReducerTodoListImmer,
    "usestate-draggable-box": ReactUseStateDraggableBox,
    "usestate-form": ReactUseStateForm,
    "usestate-object-form": ReactUseStateObjectForm,
    "usestate-reacting-to-input": ReactUseStateReactingToInput,
    "usestate-todo-list": ReactUseStateTodoList,
  },
  "react-aria": {
    calendar: ReactAriaCalendar,
  },
  "react-query": {
    basic: ReactQueryBasic,
  },
  "react-table": {
    basic: ReactTableBasic,
    "column-group": ReactTableColumnGroup,
    // "column-ordering": ReactTableColumnOrdering,
    // "column-pinning": ReactTableColumnPinning,
  },
  "tailwind-css": {
    "apple-navbar": TailwindAppleNavbar,
    blurry: TailwindBlurry,
    "centering-div": TailwindCenteringDiv,
    columns: TailwindColumns,
    feedback: TailwindFeedback,
    "floating-labels": TailwindFloatingLabels,
    "glowing-background": TailwindGlowingBackground,
    grid: TailwindGrid,
    newspaper: TailwindNewspaper,
    "planetscale-navbar": TailwindPlanetscaleNavbar,
    position: TailwindPosition,
    sidebar: TailwindSidebar,
    "tailwind-vs-apple-color": TailwindVsAppleColor,
    "youtube-thumbnail": TailwindYoutubeThumbnail,
  },
  "ui-explorations": {
    "inline-maki": InlineMaki,
    "input-list": InputList,
    "notion-navbar": NotionNavbar,
    pure: Pure,
    stopwatch: Stopwatch,
    "times-table": TimesTable,
    "yearly-interest": YearlyInterest,
  },
  visx: {
    "bar-chart": VisxBarChart,
    "pie-chart": VisxPieChart,
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
