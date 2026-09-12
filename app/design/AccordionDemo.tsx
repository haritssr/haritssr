import { Accordion } from "@base-ui/react/accordion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function AccordionDemo() {
  return (
    <Accordion.Root className="w-full max-w-xs" multiple>
      <Accordion.Item value="item-1">
        <Accordion.Header>
          <Accordion.Trigger className="group focus-visible:outline-action flex w-full items-center justify-between rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2 text-left text-sm font-medium text-zinc-800 outline-hidden transition-colors hover:bg-zinc-100 focus-visible:outline-2 data-panel-open:rounded-b-none data-panel-open:bg-zinc-100">
            <span>What is an accordion?</span>
            <ChevronDownIcon className="h-5 w-5 text-zinc-800 transition-transform duration-200 group-data-panel-open:rotate-180" />
          </Accordion.Trigger>
        </Accordion.Header>

        <Accordion.Panel className="rounded-b-lg border-r border-b border-l border-zinc-300 bg-white p-3 text-sm text-zinc-600">
          An accordion reveals related content without taking permanent space in
          the layout.
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion.Root>
  );
}
