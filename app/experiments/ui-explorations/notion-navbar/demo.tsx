"use client";

import {
  ArrowDownCircleIcon,
  BuildingOffice2Icon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { NavigationMenu } from "radix-ui";

import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";

export default function NotionNavbarDemo() {
  return (
    <>
      <SubTitle>
        <ExternalLink
          href="https://www.notion.so/desktop"
          name="Notion NavBar"
        />
        <ExplanationList>
          <li>Navigation Bar at Notion Marketing Pages</li>
          <li>
            Using Radix UI{" "}
            <ExternalLink
              href="https://www.radix-ui.com/docs/primitives/components/navigation-menu"
              name="Navigation Menu"
            />
            to enable this features.
          </li>
        </ExplanationList>
        <div className="flex items-center space-x-2 pt-16">
          <Logo />
          <Yes />
        </div>
      </SubTitle>
      <SourceCodeLink />
    </>
  );
}
function Logo() {
  return (
    <div className="mr-2 flex items-center space-x-2">
      <Image
        alt=""
        blurDataURL="/icons/notion.jpg"
        height="30"
        src="/icons/notion.jpg"
        width="30"
      />
      <div className="text-lg font-semibold text-black">Notion</div>
    </div>
  );
}
function Yes() {
  return (
    <NavigationMenu.Root className="w-full">
      <NavigationMenu.List className="flex space-x-2">
        <NavigationMenu.Item className="rounded px-2 py-1 hover:bg-zinc-100">
          <NavigationMenu.Trigger className="group flex items-center space-x-1">
            <div className="text-sm font-semibold text-black">Product</div>
            <ChevronDownIcon
              className="group-rdx-state-open:rotate-180 h-3 w-3"
              strokeWidth={3}
            />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="absolute mt-2 -ml-2 w-fit rounded bg-white p-1 drop-shadow-lg">
            <a
              href="https://www.notion.com/"
              className="block cursor-pointer rounded px-2 py-1 text-sm hover:bg-zinc-50"
            >
              <div className="font-medium text-black">Home</div>
              <div className="text-zinc-500">Docs, projects, & wikis</div>
            </a>
            <div className="mt-2 mb-1 px-2">
              <a
                href="https://www.notion.com/download"
                className="flex cursor-pointer items-center justify-center space-x-1 rounded-md border border-zinc-200 py-1 text-black"
              >
                <ArrowDownCircleIcon className="h-4 w-4" strokeWidth={1} />
                <div className="text-sm font-medium">Download Notion</div>
              </a>
              <div className="mt-1 text-sm font-light text-zinc-400">
                Mac, Windows, iOS, & Android
              </div>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item className="rounded px-2 py-1 hover:bg-zinc-100">
          <NavigationMenu.Trigger className="group flex items-center space-x-1">
            <div className="text-sm font-semibold text-black">Download</div>
            <ChevronDownIcon
              className="group-rdx-state-open:rotate-180 h-3 w-3"
              strokeWidth={3}
            />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="absolute mt-2 -ml-2 w-fit rounded bg-white p-1 text-sm font-medium drop-shadow-lg">
            <div className="space-y-1">
              <a
                href="https://www.notion.com/download"
                className="cursor-pointer rounded px-2 py-0.5 text-zinc-800 hover:bg-zinc-50"
              >
                iOS & Android
              </a>
              <a
                href="https://www.notion.com/download"
                className="cursor-pointer rounded px-2 py-0.5 text-zinc-800 hover:bg-zinc-50"
              >
                macOS & Windows
              </a>
              <a
                href="https://www.notion.com/download"
                className="cursor-pointer rounded px-2 py-0.5 text-zinc-800 hover:bg-zinc-50"
              >
                Web Clipper
              </a>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item className="rounded px-2 py-1 hover:bg-zinc-100">
          <NavigationMenu.Trigger className="group flex items-center space-x-1">
            <div className="text-sm font-semibold text-black">Solutions</div>
            <ChevronDownIcon
              className="group-rdx-state-open:rotate-180 h-3 w-3"
              strokeWidth={3}
            />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="absolute mt-2 -ml-2 w-fit rounded bg-white p-1 font-medium drop-shadow-lg">
            <div className="flex divide-x divide-zinc-300">
              <div className="p-1">
                <div className="mb-2 text-[10px] text-zinc-400">
                  BY TEAM SIZE
                </div>
                <div className="space-y-1">
                  <a
                    href="https://www.notion.com/enterprise"
                    className="flex cursor-pointer items-center space-x-1 rounded px-1.5 py-0.5 hover:bg-zinc-50"
                  >
                    <BuildingOffice2Icon
                      className="h-8 w-8 fill-zinc-200 text-zinc-700"
                      strokeWidth={1.5}
                    />
                    <div className="flex flex-col justify-center text-[12px]">
                      <div className="font-medium text-zinc-800">
                        Enterprise
                      </div>
                      <div className="text-zinc-400">
                        Advance features for your org
                      </div>
                    </div>
                  </a>
                  <a
                    href="https://www.notion.com/teams"
                    className="flex cursor-pointer items-center space-x-1 rounded px-1.5 py-0.5 hover:bg-zinc-50"
                  >
                    <BuildingOffice2Icon
                      className="h-8 w-8 fill-zinc-200 text-zinc-700"
                      strokeWidth={1.5}
                    />
                    <div className="flex flex-col justify-center text-[12px]">
                      <div className="font-medium text-zinc-800">
                        Small bussiness{" "}
                      </div>
                      <div className="text-zinc-400">
                        Run your team on one tool
                      </div>
                    </div>
                  </a>
                  <a
                    href="https://www.notion.com/"
                    className="flex cursor-pointer items-center space-x-1 rounded px-1.5 py-0.5 hover:bg-zinc-50"
                  >
                    <BuildingOffice2Icon
                      className="h-8 w-8 fill-zinc-200 text-zinc-700"
                      strokeWidth={1.5}
                    />
                    <div className="flex flex-col justify-center text-[12px]">
                      <div className="font-medium text-zinc-800">Personal</div>
                      <div className="text-zinc-400">Free for individual</div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="p-1">
                <div className="mb-2 px-1 text-[10px] text-zinc-400">
                  BY TEAM SIZE
                </div>
                <div className="space-y-1 text-sm">
                  <a
                    href="https://www.notion.com/help"
                    className="cursor-pointer rounded px-1 py-0.5 text-zinc-800 hover:bg-zinc-50"
                  >
                    Design
                  </a>
                  <a
                    href="https://www.notion.com/product/projects"
                    className="cursor-pointer rounded px-1 py-0.5 text-zinc-800 hover:bg-zinc-50"
                  >
                    Engineering
                  </a>
                  <a
                    href="https://www.notion.com/product/projects"
                    className="cursor-pointer rounded px-1 py-0.5 text-zinc-800 hover:bg-zinc-50"
                  >
                    Product Manager
                  </a>
                </div>
              </div>
              <div className="p-1">
                <div className="mb-2 px-1 text-[10px] text-zinc-400">
                  BY TEAM SIZE
                </div>
                <div className="space-y-1 text-sm">
                  <a
                    href="https://www.notion.com/help"
                    className="cursor-pointer rounded px-1 py-0.5 text-zinc-800 hover:bg-zinc-50"
                  >
                    Design
                  </a>
                  <a
                    href="https://www.notion.com/product/projects"
                    className="cursor-pointer rounded px-1 py-0.5 text-zinc-800 hover:bg-zinc-50"
                  >
                    Engineering
                  </a>
                  <a
                    href="https://www.notion.com/product/projects"
                    className="cursor-pointer rounded px-1 py-0.5 text-zinc-800 hover:bg-zinc-50"
                  >
                    Product Manager
                  </a>
                </div>
              </div>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item className="rounded px-2 py-1 hover:bg-zinc-100">
          <NavigationMenu.Trigger className="group flex items-center space-x-1">
            <div className="text-sm font-semibold text-black">Resources</div>
            <ChevronDownIcon
              className="group-rdx-state-open:rotate-180 h-3 w-3"
              strokeWidth={3}
            />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="absolute mt-2 -ml-2 w-fit rounded bg-white p-1 text-sm font-medium drop-shadow-lg">
            <div className="space-y-1">
              <a
                href="https://www.notion.com/en-us/blog"
                className="cursor-pointer rounded px-2 py-0.5 text-zinc-800 hover:bg-zinc-50"
              >
                Blog
              </a>
              <a
                href="https://www.notion.com/help"
                className="cursor-pointer rounded px-2 py-0.5 text-zinc-800 hover:bg-zinc-50"
              >
                Guide & Tutorials
              </a>
              <a
                href="https://www.notion.com/webinars"
                className="cursor-pointer rounded px-2 py-0.5 text-zinc-800 hover:bg-zinc-50"
              >
                Webinar
              </a>
              <a
                href="https://www.notion.com/help"
                className="cursor-pointer rounded px-2 py-0.5 text-zinc-800 hover:bg-zinc-50"
              >
                Help center
              </a>
              <a
                href="https://developers.notion.com/"
                className="cursor-pointer rounded px-2 py-0.5 text-zinc-800 hover:bg-zinc-50"
              >
                API Docs
              </a>
              <a
                href="https://www.notion.com/community"
                className="cursor-pointer rounded px-2 py-0.5 text-zinc-800 hover:bg-zinc-50"
              >
                Community
              </a>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item className="rounded px-2 py-1 hover:bg-zinc-100">
          <a
            className="text-sm font-semibold text-black"
            href="https://www.notion.com/pricing"
          >
            Pricing
          </a>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
