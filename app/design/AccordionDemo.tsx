import { Accordion } from "@base-ui/react/accordion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function AccordionDemo() {
  return (
    <Accordion.Root className="w-full max-w-xs" multiple>
      <Accordion.Item value="item-1">
        <Accordion.Header>
          <Accordion.Trigger className="group focus-visible:outline-action border-border bg-foreground/5 text-foreground hover:bg-foreground/10 data-panel-open:bg-foreground/10 flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm font-medium outline-hidden transition-colors focus-visible:outline-2 data-panel-open:rounded-b-none">
            <span>What is an accordion?</span>
            <ChevronDownIcon className="text-foreground h-5 w-5 transition-transform duration-200 group-data-panel-open:rotate-180" />
          </Accordion.Trigger>
        </Accordion.Header>

        <Accordion.Panel className="border-border text-foreground/70 rounded-b-lg border-r border-b border-l bg-white p-3 text-sm">
          An accordion reveals related content without taking permanent space in
          the layout.
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion.Root>
  );
}
