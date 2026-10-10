import Accordion, { AccordionItem } from "@/components/Accordion";

export default function AccordionDemo() {
  return (
    <Accordion className="w-full max-w-xs">
      <AccordionItem title="What is an accordion?" value="item-1">
        An accordion reveals related content without taking permanent space in
        the layout.
      </AccordionItem>
    </Accordion>
  );
}
