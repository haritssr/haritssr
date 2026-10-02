"use client";
import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useState } from "react";

import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import Section from "@/components/Section";
import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";

export default function HeadlessDialogDemo() {
  return (
    <>
      <SubTitle>
        <ExternalLink
          href="https://headlessui.dev/react/dialog"
          name="Headless UI Dialog"
        />
        <ExplanationList>
          <li>
            A fully-managed, renderless dialog component jam-packed with
            accessibility and keyboard features, perfect for building completely
            custom modal and dialog windows for your next application.
          </li>
          <li>
            Click the button and the box will appear (usually) in the center of
            screen, and the user should close it using close button or click on
            the outside the box area.
          </li>
        </ExplanationList>
      </SubTitle>
      <SourceCodeLink />

      <div className="space-y-20">
        <Wrapper title="Dialog without transition">
          <DialogExample1 />
        </Wrapper>
        <Wrapper title="Dialog with transition">
          <DialogExample2 />
        </Wrapper>
      </div>
    </>
  );
}

const Wrapper = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section>
    <Section name={title} />
    {children}
  </section>
);

const DialogExample1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        className={`rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-[#2563eb]/90 active:ring-orange-500 ${
          isOpen ? "ring-2 ring-orange-500" : ""
        }`}
        onClick={() => {
          setIsOpen(true);
        }}
        type="button"
      >
        Open dialog
      </button>

      <Dialog
        className="fixed inset-x-0 top-[25vh] z-40 mx-auto h-fit w-2/3 sm:w-1/2"
        onClose={() => {
          setIsOpen(false);
        }}
        open={isOpen}
      >
        <DialogBackdrop className="fixed inset-0 bg-zinc-800/80" />

        <div className="relative z-50 rounded-md bg-white p-4 shadow-xl">
          <DialogTitle className="text-xl font-semibold">Title</DialogTitle>
          <Description className="text-zinc-600">
            Lorem ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s.
          </Description>
          <div className="flex w-full justify-end">
            <button
              className="text-action hover:text-action rounded-md px-2 py-1 hover:bg-zinc-100"
              onClick={() => {
                setIsOpen(false);
              }}
              type="button"
            >
              Close
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

const DialogExample2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        className={`rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-[#2563eb]/90 active:ring-orange-500 ${
          isOpen ? "ring-2 ring-orange-500" : ""
        }`}
        onClick={() => {
          setIsOpen(true);
        }}
        type="button"
      >
        Open dialog
      </button>
      <Transition as={Fragment} show={isOpen}>
        <Dialog
          className="fixed inset-x-0 top-[25vh] z-40 mx-auto h-fit w-2/3 sm:w-1/2"
          onClose={() => {
            setIsOpen(false);
          }}
          open={isOpen}
        >
          <TransitionChild
            enter="duration-300 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-200 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogBackdrop className="fixed inset-0 bg-zinc-800/80" />
          </TransitionChild>

          <div className="relative z-50 rounded-md bg-white p-4 shadow-xl">
            <DialogTitle className="text-xl font-semibold">Title</DialogTitle>
            <Description className="text-zinc-600">
              Lorem ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s.
            </Description>
            <div className="flex w-full justify-end">
              <button
                className="text-action hover:text-action rounded-md px-2 py-1 hover:bg-zinc-100"
                onClick={() => {
                  setIsOpen(false);
                }}
                type="button"
              >
                Close
              </button>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
