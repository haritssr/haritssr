"use client";

import {
  ArrowDownCircleIcon,
  BuildingOffice2Icon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { NavigationMenu } from "radix-ui";

interface NavigationLinkData {
  label: string;
  href: string;
  description?: string;
}

interface NavigationGroup {
  title?: string;
  icon?: "building";
  links: readonly NavigationLinkData[];
}

interface NavigationItem {
  label: string;
  href?: string;
  groups?: readonly NavigationGroup[];
  action?: NavigationLinkData & { note: string };
}

const navigationItems: readonly NavigationItem[] = [
  {
    label: "Product",
    groups: [
      {
        links: [
          {
            label: "Home",
            href: "https://www.notion.com/",
            description: "Docs, projects, and wikis",
          },
        ],
      },
    ],
    action: {
      label: "Download Notion",
      href: "https://www.notion.com/download",
      note: "Mac, Windows, iOS, and Android",
    },
  },
  {
    label: "Download",
    groups: [
      {
        links: [
          { label: "iOS & Android", href: "https://www.notion.com/download" },
          { label: "macOS & Windows", href: "https://www.notion.com/download" },
          { label: "Web Clipper", href: "https://www.notion.com/download" },
        ],
      },
    ],
  },
  {
    label: "Solutions",
    groups: [
      {
        title: "By team size",
        icon: "building",
        links: [
          {
            label: "Enterprise",
            href: "https://www.notion.com/enterprise",
            description: "Advanced features for your organization",
          },
          {
            label: "Small business",
            href: "https://www.notion.com/teams",
            description: "Run your team on one tool",
          },
          {
            label: "Personal",
            href: "https://www.notion.com/",
            description: "Free for individuals",
          },
        ],
      },
      {
        title: "By role",
        links: [
          { label: "Design", href: "https://www.notion.com/help" },
          {
            label: "Engineering",
            href: "https://www.notion.com/product/projects",
          },
          {
            label: "Product management",
            href: "https://www.notion.com/product/projects",
          },
        ],
      },
    ],
  },
  {
    label: "Resources",
    groups: [
      {
        links: [
          { label: "Blog", href: "https://www.notion.com/en-us/blog" },
          { label: "Guides & tutorials", href: "https://www.notion.com/help" },
          { label: "Webinars", href: "https://www.notion.com/webinars" },
          { label: "Help center", href: "https://www.notion.com/help" },
          { label: "API docs", href: "https://developers.notion.com/" },
          { label: "Community", href: "https://www.notion.com/community" },
        ],
      },
    ],
  },
  { label: "Pricing", href: "https://www.notion.com/pricing" },
];

export default function NotionNavigationMenu() {
  return (
    <NavigationMenu.Root
      aria-label="Notion-inspired navigation"
      className="relative z-10 w-full sm:w-auto"
    >
      <NavigationMenu.List className="flex flex-wrap items-center gap-1">
        {navigationItems.map((item) => (
          <NavigationMenu.Item
            className="relative rounded px-2 py-1 hover:bg-zinc-100"
            key={item.label}
          >
            {typeof item.href === "string" ? (
              <NavigationMenu.Link
                className="text-sm font-semibold text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                href={item.href}
              >
                {item.label}
              </NavigationMenu.Link>
            ) : (
              <>
                <NavigationMenu.Trigger className="group flex items-center gap-1 rounded text-sm font-semibold text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                  <span>{item.label}</span>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="group-rdx-state-open:rotate-180 h-3 w-3 transition-transform"
                    strokeWidth={3}
                  />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="absolute top-full left-0 z-20 mt-2 w-max max-w-[calc(100vw-2rem)] overflow-x-auto rounded-md border border-zinc-200 bg-white p-2 text-sm font-medium shadow-lg">
                  <div
                    className={
                      item.groups && item.groups.length > 1
                        ? "grid auto-cols-max grid-flow-col divide-x divide-zinc-200"
                        : ""
                    }
                  >
                    {item.groups?.map((group, index) => (
                      <NavigationGroupPanel
                        group={group}
                        key={group.title ?? `group-${index}`}
                      />
                    ))}
                  </div>
                  {item.action ? <MenuAction action={item.action} /> : null}
                </NavigationMenu.Content>
              </>
            )}
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

function NavigationGroupPanel({ group }: { group: NavigationGroup }) {
  return (
    <div className="min-w-40 p-1">
      {typeof group.title === "string" ? (
        <h2 className="mb-2 px-1 text-[10px] font-semibold tracking-wide text-zinc-400 uppercase">
          {group.title}
        </h2>
      ) : null}
      <ul className="space-y-1">
        {group.links.map((link) => (
          <li key={link.label}>
            <MenuLink
              icon={group.icon}
              link={link}
              variant={
                typeof link.description === "string" ? "detailed" : "plain"
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function MenuLink({
  icon,
  link,
  variant,
}: {
  icon?: NavigationGroup["icon"];
  link: NavigationLinkData;
  variant: "detailed" | "plain";
}) {
  const className =
    variant === "detailed"
      ? "flex items-center gap-2 rounded px-1.5 py-1 hover:bg-zinc-50 focus-visible:bg-zinc-50 focus-visible:outline-hidden"
      : "block rounded px-2 py-1 text-zinc-800 hover:bg-zinc-50 focus-visible:bg-zinc-50 focus-visible:outline-hidden";

  return (
    <NavigationMenu.Link asChild>
      <a className={className} href={link.href}>
        {icon === "building" ? (
          <BuildingOffice2Icon
            aria-hidden="true"
            className="h-8 w-8 shrink-0 fill-zinc-200 text-zinc-700"
            strokeWidth={1.5}
          />
        ) : null}
        <span className={variant === "detailed" ? "flex flex-col" : undefined}>
          <span className="font-medium text-zinc-800">{link.label}</span>
          {typeof link.description === "string" ? (
            <span className="text-xs font-normal text-zinc-500">
              {link.description}
            </span>
          ) : null}
        </span>
      </a>
    </NavigationMenu.Link>
  );
}

function MenuAction({
  action,
}: {
  action: NavigationLinkData & { note: string };
}) {
  return (
    <div className="mt-2 border-t border-zinc-200 px-1 pt-2">
      <NavigationMenu.Link asChild>
        <a
          className="flex items-center justify-center gap-1 rounded-md border border-zinc-200 px-2 py-1 text-black hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          href={action.href}
        >
          <ArrowDownCircleIcon
            aria-hidden="true"
            className="h-4 w-4"
            strokeWidth={1}
          />
          <span>{action.label}</span>
        </a>
      </NavigationMenu.Link>
      <p className="mt-1 text-center text-xs font-normal text-zinc-500">
        {action.note}
      </p>
    </div>
  );
}
