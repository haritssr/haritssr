"use client";

import { RadioGroup } from "@headlessui/react";
import { type JSX, type SVGProps, useState } from "react";
import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import SubTitle from "@/components/SubTitle";

const plans = [
  {
    name: "Startup",
    ram: "12GB",
    cpus: "6 CPUs",
    disk: "160 GB SSD disk",
  },
  {
    name: "Business",
    ram: "16GB",
    cpus: "8 CPUs",
    disk: "512 GB SSD disk",
  },
  {
    name: "Enterprise",
    ram: "32GB",
    cpus: "12 CPUs",
    disk: "1024 GB SSD disk",
  },
];

export default function HeadlessRadioGroupDemo() {
  return (
    <>
      <SubTitle>
        <ExternalLink
          href="https://headlessui.dev/react/radio-group"
          name="Headless UI Radio Group"
        />
        <ExplanationList>
          <li>
            Radio Groups give you the same functionality as native HTML radio
            inputs, without any of the styling. They are perfect for building
            out custom UIs for selectors.
          </li>
          <li>Click the radio to choose one to serve as an option.</li>
        </ExplanationList>
      </SubTitle>
      <Example1 />
    </>
  );
}
function Example1() {
  const [selected, setSelected] = useState(plans[0]);

  return (
    <div className="w-full px-4 py-16">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup onChange={setSelected} value={selected}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-2">
            {plans.map((plan) => (
              <RadioGroup.Option
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                      : ""
                  }
                  ${
                    checked ? "bg-sky-900 bg-opacity-75 text-white" : "bg-white"
                  }relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-hidden`
                }
                key={plan.name}
                value={plan}
              >
                {({ checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium ${
                              checked ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {plan.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? "text-sky-100" : "text-gray-500"
                            }`}
                          >
                            <span>
                              {plan.ram}/{plan.cpus}
                            </span>{" "}
                            <span aria-hidden="true">&middot;</span>{" "}
                            <span>{plan.disk}</span>
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}

function CheckIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" {...props}>
      <title>Check Icon</title>
      <circle cx={12} cy={12} fill="#fff" opacity="0.2" r={12} />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
}
