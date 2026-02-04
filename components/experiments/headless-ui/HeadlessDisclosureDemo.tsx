"use client";

import { Disclosure, Transition } from "@headlessui/react";
import type React from "react";

import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import Section from "@/components/Section";
import SubTitle from "@/components/SubTitle";

const Data = [
  {
    title: "Lorem ipsum dolor, sit amet consectetur.",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur atque asperiores, officiis placeat, totam deserunt aliquam exercitationem inventore, perferendis beatae obcaecati deleniti libero quibusdam alias.",
  },
  {
    title: "Lorem ipsum dolor, sit amet.",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur atque asperiores, officiis placeat, totam deserunt aliquam exercitationem inventore, perferendis beatae obcaecati deleniti libero quibusdam alias.",
  },
  {
    title: "Lorem ipsum dolor, sit.",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur atque asperiores, officiis placeat, totam deserunt aliquam exercitationem inventore, perferendis beatae obcaecati deleniti libero quibusdam alias.",
  },
];

export default function HeadlessDisclosureDemo() {
  return (
    <>
      <SubTitle>
        <ExternalLink
          href="https://headlessui.dev/react/disclosure"
          name="Headless UI Disclosure"
        />
        <ExplanationList>
          <li>
            A simple, accessible foundation for building custom UIs that show
            and hide content, like togglable accordion panels.
          </li>
          <li>
            Disclosure is button that contain more explanation if you click on
            it. The text on button represent the summary of the description
            inside.
          </li>
        </ExplanationList>
      </SubTitle>
      <div className="grid grid-cols-1 gap-16 sm:grid-cols-2">
        <DisclosureChevronTransitions />
        <DisclosurePlus />
        <DisclosureChevronNaked />
        <DisclosurePlusNaked />
      </div>
    </>
  );
}

const Wrapper = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div>
      <Section name={title} />
      <div className="space-y-2">{children}</div>
    </div>
  );
};

const DisclosureChevronTransitions = () => {
  return (
    <Wrapper title="Chevron + Transitions on Panel">
      {Data.map(({ title, description }) => (
        <Disclosure as="div" className="w-full" key={title}>
          {({ open }) => (
            <>
              <Disclosure.Button
                className={`flex w-full items-center justify-between border px-3 py-2 hover:bg-zinc-50 ${
                  open
                    ? "rounded-t-md border-zinc-500"
                    : "rounded-md border-zinc-300"
                }`}
              >
                <div className="truncate text-gray-700">{title}</div>
                <svg
                  className={`h-5 w-5 ${
                    open ? "rotate-180 transform duration-200" : "transform"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Chevron Down Icon</title>
                  <path
                    d="M19 9l-7 7-7-7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Disclosure.Button>
              <Transition
                enter="transition duration-300 ease-out"
                enterFrom="transform -top-10 opacity-0"
                enterTo="transform top-0 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel
                  className={`text-zinc-600 ${
                    open ? "border-zinc-500" : "border-zinc-300"
                  } rounded-b-md border-r border-b border-l px-3 py-2`}
                >
                  {description}
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      ))}
    </Wrapper>
  );
};

const DisclosureChevronNaked = () => {
  return (
    <Wrapper title="Chevron Naked">
      {Data.map(({ title, description }) => (
        <Disclosure as="div" className="w-full" key={title}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full items-center justify-between border-t pt-2 pr-3">
                <div
                  className={`truncate hover:text-zinc-700 ${
                    open ? "font-medium text-zinc-700" : "text-zinc-500"
                  }`}
                >
                  {title}
                </div>
                <svg
                  className={`h-4 w-4 ${
                    open
                      ? "rotate-180 transform text-zinc-800 duration-200"
                      : "transform text-zinc-500"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Chevron Up Icon</title>
                  <path
                    d="M19 9l-7 7-7-7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Disclosure.Button>
              <Transition
                enter="transition duration-300 ease-out"
                enterFrom="transform -top-10 opacity-0"
                enterTo="transform top-0 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel
                  className={`text-zinc-600 ${
                    open ? "border-zinc-500" : "border-zinc-300"
                  } py-2 pl-7 text-sm`}
                >
                  {description}
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      ))}
    </Wrapper>
  );
};

const DisclosurePlus = () => {
  return (
    <Wrapper title="Plus">
      {Data.map(({ title, description }) => (
        <Disclosure as="div" className="w-full" key={title}>
          {({ open }) => (
            <>
              <Disclosure.Button
                className={`flex w-full items-center justify-between border px-3 py-2 hover:bg-zinc-50 ${
                  open
                    ? "rounded-t-md border-zinc-500"
                    : "rounded-md border-zinc-300"
                }`}
              >
                <div className="truncate text-gray-700">{title}</div>
                <svg
                  className={`h-4 w-4 ${
                    open ? "rotate-45 transform duration-200" : "transform"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Plus Icon</title>

                  <path
                    d="M12 4v16m8-8H4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Disclosure.Button>
              <Disclosure.Panel
                className={`text-zinc-600 ${
                  open ? "border-zinc-500" : "border-zinc-300"
                } rounded-b-md border-r border-b border-l px-3 py-2`}
              >
                {description}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </Wrapper>
  );
};

const DisclosurePlusNaked = () => {
  return (
    <Wrapper title="Plus Naked">
      {Data.map(({ title, description }) => (
        <Disclosure as="div" className="w-full" key={title}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full items-center justify-between border-t pt-2 pr-3">
                <div
                  className={`truncate hover:underline ${
                    open ? "font-medium text-zinc-800" : "text-zinc-500"
                  }`}
                >
                  {title}
                </div>
                <svg
                  className={`h-4 w-4 ${
                    open
                      ? "rotate-45 transform text-zinc-800 duration-200"
                      : "transform text-zinc-500"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Plus Icon</title>
                  <path
                    d="M12 4v16m8-8H4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Disclosure.Button>
              <Disclosure.Panel
                className={`text-zinc-600 ${
                  open ? "border-zinc-500" : "border-zinc-300"
                } py-2 pl-5 text-sm`}
              >
                {description}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </Wrapper>
  );
};
