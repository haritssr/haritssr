import { Popover, Transition } from "@headlessui/react";
import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import Section from "@/components/Section";
import SubTitle from "@/components/SubTitle";

export default function ExportedPopover() {
  return (
    <LayoutToExperiments domain="Headless UI" title="Popover">
      <SubTitle>
        <ExternalLink
          href="https://headlessui.dev/react/popover"
          name="Headless UI Popover"
        />
        <ExplanationList>
          <li>
            A fully-managed, renderless dialog component jam-packed with
            accessibility and keyboard features, perfect for building completely
            custom modal and dialog windows for your next application.
          </li>
          <li>Click the popover to see what inside them.</li>
        </ExplanationList>
      </SubTitle>
      <div className="space-y-10">
        <Wrapper title="Popover (for Navigation)">
          <PopoverExample1 />
        </Wrapper>
        <Wrapper title="Popover (for Navigation) with Transition">
          <PopoverExample2 />
        </Wrapper>
      </div>
    </LayoutToExperiments>
  );
}

const Wrapper = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <Section name={title} />
      {children}
    </div>
  );
};

const PopoverExample1 = () => {
  return (
    <Popover className="relative">
      <Popover.Button className="rounded border border-zinc-400 bg-zinc-100 px-3 py-1.5 font-medium text-sm text-zinc-800 hover:bg-zinc-50">
        Navigation
      </Popover.Button>
      <Popover.Panel className="absolute mt-2 w-fit shadow-lg">
        <div className="divide-y divide-zinc-200 overflow-hidden rounded-md border border-zinc-400 bg-white text-zinc-800">
          <div className="cursor-pointer px-3 py-2 hover:bg-zinc-50">
            Experiments
          </div>
          <div className="cursor-pointer px-3 py-2 hover:bg-zinc-50">Blog</div>
          <div className="cursor-pointer px-3 py-2 hover:bg-zinc-50">
            Articles
          </div>
          <div className="cursor-pointer px-3 py-2 hover:bg-zinc-50">
            Experiences
          </div>
        </div>
      </Popover.Panel>
    </Popover>
  );
};

const PopoverExample2 = () => {
  return (
    <Popover className="relative">
      <Popover.Button className="rounded border border-zinc-400 bg-zinc-100 px-3 py-1.5 font-medium text-sm text-zinc-800 hover:bg-zinc-50">
        Navigation
      </Popover.Button>
      <Transition
        enter="duration-300 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="duration-200 ease-in"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Popover.Panel className="absolute mt-2 w-fit shadow-lg">
          <div className="divide-y divide-zinc-200 overflow-hidden rounded-md border border-zinc-400 bg-white text-zinc-800">
            <div className="cursor-pointer px-3 py-2 hover:bg-zinc-50">
              Experiments
            </div>
            <div className="cursor-pointer px-3 py-2 hover:bg-zinc-50">
              Blog
            </div>
            <div className="cursor-pointer px-3 py-2 hover:bg-zinc-50">
              Articles
            </div>
            <div className="cursor-pointer px-3 py-2 hover:bg-zinc-50">
              Experiences
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
