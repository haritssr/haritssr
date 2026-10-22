import {
  BeakerIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  HomeIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";

export const primaryNavigation = [
  { title: "Home", href: "/", icon: HomeIcon },
  { title: "Projects", href: "/projects", icon: BriefcaseIcon },
  { title: "Labs", href: "/labs", icon: BeakerIcon },
  { title: "Writing", href: "/writing", icon: DocumentTextIcon },
  { title: "Design", href: "/design", icon: SquaresPlusIcon },
] as const;
