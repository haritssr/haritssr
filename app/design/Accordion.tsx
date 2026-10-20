import SharedAccordion, { AccordionItem } from "@/components/Accordion";

export default function Accordion() {
  return (
    <SharedAccordion className="w-full max-w-full">
      <AccordionItem title="What is an accordion?" value="item-1">
        An accordion reveals related content without taking permanent space in
        the layout.
      </AccordionItem>
    </SharedAccordion>
  );
}
