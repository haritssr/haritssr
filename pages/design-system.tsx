import Section from "@/components/Section";
import InternalLink from "@/components/InternalLink";
import ExternalLink from "@/components/ExternalLink";
import Layout from "@/components/Layout";
import React from "react";
import { color } from "../data/DesignSystemData";
import Image from "next/image";

import { useState } from "react";
import { Switch } from "@headlessui/react";

import { XMarkIcon } from "@heroicons/react/24/outline";
import * as Dialog from "@radix-ui/react-dialog";

export default function DesignSystem() {
  return (
    <Layout browserTitle="Design System" description="Design System">
      <div className="mt-5 space-y-20">
        <A />
        <div>
          <Section name="Design Systems at Figma" />
          <iframe
            className="border w-full min-h-screen"
            width="800"
            height="450"
            src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FmhfH2JaaCDzRSL71XcSnUw%2FHaris-Lab%3Ftype%3Ddesign%26node-id%3D1416%253A236%26mode%3Ddesign%26t%3DwxLQxcZHLYNHFvrj-1"
            // allowfullscreen
          ></iframe>
        </div>
      </div>
    </Layout>
  );
}

const Wrapper = ({
  className,
  children,
  id,
}: {
  className?: string;
  children: React.ReactNode;
  id: string;
}) => {
  return (
    <div id={id}>
      <div className="mt-16 mb-6 space-y-2">
        <span className='text-2xl font-bold text-zinc-800 sm:text-4xl font-["Mona_Sans"]'>
          Haris Lab Design Systems
        </span>
      </div>
      <div className={className}>{children}</div>
    </div>
  );
};

const A = () => {
  return (
    <Wrapper className="" id="DesignSystem">
      <div className="mb-10 sm:mb-16 text-zinc-600">
        This design system used in{" "}
        <ExternalLink name="haritssr.com" href="haritssr.com" /> and{" "}
        <ExternalLink name="Haris Lab" href="harislab.com" />
      </div>
      <Section name="Color" />
      <section className="mb-10 -mt-2 sm:mb-16  grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 p-4 border">
        {color.map((data) => (
          <div className="space-y-1" key={data.name}>
            <div
              style={{ backgroundColor: data.hex }}
              className={` h-16 w-16 rounded-md border`}
            />
            <div className="text-zinc-700">{data.hex}</div>
            <div className="text-zinc-500">{data.name}</div>
          </div>
        ))}
      </section>
      <Section name="Button" />
      <section className="mb-10 -mt-2 sm:mb-16  grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 p-4 border">
        <div className="space-y-1">
          <ExternalLink href="/" name="ExternalLink" />
          <div className="text-zinc-500">External Link</div>
        </div>
        <div className="space-y-1">
          <InternalLink href="/" name="InternalLink" />
          <div className="text-zinc-500">Internal Link</div>
        </div>
        <div className="space-y-1">
          <button className="rounded-md bg-blue-600 px-4 py-1 text-white hover:bg-blue-500">
            Button
          </button>
          <div className="text-zinc-500">Primary Button</div>
        </div>
        <div className="space-y-1">
          <button className="rounded-md border border-blue-600 bg-white px-4 py-1 text-blue-600 hover:bg-blue-100">
            Button
          </button>
          <div className="text-zinc-500">Secondary Button</div>
        </div>
      </section>
      <Section name="Typography" />
      <section className="mb-10 -mt-2 sm:mb-16  grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 p-4 border">
        <div className="space-y-1">
          <div className='text-2xl font-bold text-zinc-800 sm:text-3xl font-["Mona_Sans"]'>
            Page Title
          </div>
          <div className="text-zinc-500">Heading</div>
        </div>
        <div className="space-y-1">
          <div className='text-xl font-semibold text-zinc-800 font-["Hubot_Sans"]'>
            Section Title
          </div>
          <div className="text-zinc-500">Heading 2</div>
        </div>
        <div className="space-y-1">
          <div className="text-[17px] leading-relaxed text-zinc-700 sm:text-base">
            Short paragraph example
          </div>
          <div className="text-zinc-500">Paragraph</div>
        </div>
      </section>

      <Section name="Fonts" />
      <section className="mb-10 -mt-2 sm:mb-16  grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 p-4 border">
        <div className="space-y-1 font-['Hubot_Sans']">
          <div className="font-semibold text-zinc-800 ">Hubot Sans</div>
          <div className="text-zinc-500">Section title</div>
        </div>
        <div className="space-y-1 font-['Mona_Sans']">
          <div className="font-semibold text-zinc-800 ">Mona Sans</div>
          <div className="text-zinc-500">Page title</div>
        </div>
        <div className="space-y-1">
          <div className="font-semibold text-zinc-800 ">Inter</div>
          <div className="text-zinc-500">Paragraph, description</div>
        </div>
      </section>

      <Section name="Icon" />
      <section className="mb-10 -mt-2 sm:mb-16 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 border p-4">
        <div className="space-y-1">
          <Image
            src="/icons/haritssr.png"
            alt=""
            width="20"
            height="20"
            blurDataURL="/icons/haritssr.png"
          />
          <div className="text-zinc-700">w-5 h-5 [20x20px]</div>
          <div className="text-zinc-500">Mobile</div>
        </div>
        <div className="space-y-1">
          <Image
            src="/icons/haritssr.png"
            alt=""
            width="20"
            height="20"
            blurDataURL="/icons/haritssr.png"
          />
          <div className="text-zinc-700">w-5 h-5 [20x20px]</div>
          <div className="text-zinc-500">Desktop</div>
        </div>
        <div className="space-y-1">
          <div className="w-fit rounded-md border bg-zinc-800 p-2">
            <Image
              src="/icons/haritssr.png"
              alt=""
              width="20"
              height="20"
              blurDataURL="/icons/haritssr.png"
            />
          </div>
          <div className="text-zinc-700">w-5 h-5 [20x20px]</div>
          <div className="text-zinc-500">Dark background</div>
        </div>
        <div className="space-y-1">
          <div className="w-fit rounded-md border bg-white p-2">
            <Image
              src="/icons/haritssr.png"
              alt=""
              width="20"
              height="20"
              blurDataURL="/icons/haritssr.png"
            />
          </div>
          <div className="text-zinc-700">w-5 h-5 [20x20px]</div>
          <div className="text-zinc-500">Light background</div>
        </div>
      </section>
      <Section name="Box" />
      <section className="mb-10 -mt-2 sm:mb-16 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        <div className="space-y-1">
          <div className="h-40 overflow-hidden rounded-md border border-zinc-300 bg-white" />
          <div className="text-zinc-500">Box</div>
        </div>
        <div className="space-y-1">
          <div className="h-40 overflow-hidden rounded-md border border-zinc-300 bg-white">
            <div className="px-3 py-1.5 rounded-t-md font-semibold border-b border-zinc-300 bg-apple-gray6/50 text-zinc-800">
              Title
            </div>
            <div className="rounded-b-md"></div>
          </div>
          <div className="text-zinc-500">Named Box</div>
        </div>
      </section>
      <Section name="Toggle" />
      <section className="mb-10 -mt-2 sm:mb-16 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        <Toggle />
      </section>
      <Section name="Modal" />
      <section className="mb-10 -mt-2 sm:mb-16 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        <Modal />
      </section>
    </Wrapper>
  );
};

const Toggle = () => {
  const [enabled, setEnabled] = useState(true);

  return (
    <Switch.Group as="div">
      {/* <Switch.Label>Nyalakan notifikasi</Switch.Label> */}
      <Switch
        as="div"
        checked={enabled}
        onChange={setEnabled}
        className={`${
          enabled
            ? "bg-green-500 border-green-600 hover:border-green-800"
            : "bg-zinc-200 border-zinc-300 hover:border-zinc-500"
        } relative inline-flex w-[58px] cursor-pointer items-center border  rounded-full p-1 transition duration-100 ease-out `}
      >
        <div
          className={`${
            enabled ? "translate-x-6" : "translate-x-0.5"
          } inline-block h-6 w-6 transform rounded-full bg-white shadow-md`}
        />
      </Switch>
      <div className='font-["Mona_Sans"] text-zinc-500 mt-2'>
        {enabled ? "Active" : "Inactive"}
      </div>
    </Switch.Group>
  );
};

const Modal = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md border border-zinc-400 bg-zinc-50 px-3 py-1.5 font-medium text-zinc-800 hover:bg-zinc-100 rdx-state-open:ring-2 rdx-state-open:ring-blue-600">
        Show dialog
      </Dialog.Trigger>
      <Dialog.Overlay className="fixed inset-0 bg-zinc-900/70 z-50" />
      <Dialog.Content className="fixed top-1/2 left-1/2 w-3/4  max-w-screen-xs -translate-x-1/2 -translate-y-1/2 rounded-md bg-white px-5 py-4 z-50">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-lg sm:text-xl font-bold text-zinc-800">
              Title for Anything
            </Dialog.Title>
            <Dialog.Close>
              <XMarkIcon className="h-7 w-7 rounded-full p-1 text-gray-500 hover:bg-gray-200 hover:text-zinc-800" />
            </Dialog.Close>
          </div>
          <Dialog.Description className="text-gray-500">
            This modal can contain anything you need to perform, while at the
            same time make the UI behind not moving or inert.
          </Dialog.Description>
          <div className="flex justify-end">
            <Dialog.Close>
              <div className="rounded-md bg-blue-600 px-3 py-1 text-white hover:bg-blue-700">
                Confirm
              </div>
            </Dialog.Close>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};
