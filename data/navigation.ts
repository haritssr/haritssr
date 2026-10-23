import {
  BeakerIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  HomeIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";

import { primaryRoutes } from "./primaryRoutes";

const icons = {
  "/": HomeIcon,
  "/projects": BriefcaseIcon,
  "/labs": BeakerIcon,
  "/writing": DocumentTextIcon,
  "/design": SquaresPlusIcon,
};

export const primaryNavigation = primaryRoutes.map(({ route, title }) => ({
  title,
  href: route,
  icon: icons[route],
}));
