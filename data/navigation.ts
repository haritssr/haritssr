import {
  BeakerIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  HomeIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/solid";

import { topLevelNavigation } from "./topLevelNavigation";

type TopLevelRoute = (typeof topLevelNavigation)[number]["route"];

const icons = {
  "/": HomeIcon,
  "/projects": BriefcaseIcon,
  "/labs": BeakerIcon,
  "/writing": DocumentTextIcon,
  "/design": SquaresPlusIcon,
} satisfies Record<TopLevelRoute, typeof HomeIcon>;

export const primaryNavigation = topLevelNavigation.map(({ route, title }) => ({
  title,
  href: route,
  icon: icons[route],
}));
