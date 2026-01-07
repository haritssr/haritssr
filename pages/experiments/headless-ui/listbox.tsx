import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";

export default function ExportedSelect() {
  return (
    <LayoutToExperiments domain="Headless UI" title="Listbox">
      <SubTitle>
        <ExternalLink
          href="https://headlessui.dev/react/listbox"
          name="Headless UI Listbox (Select)"
        />
        <ExplanationList>
          <li>
            Listboxes are a great foundation for building custom, accessible
            select menus for your app, complete with robust support for keyboard
            navigation.
          </li>
          <li>
            Click button to select the available option and the options are
            displayed on the main button.
          </li>
        </ExplanationList>
      </SubTitle>
      <SelectExample1 />
    </LayoutToExperiments>
  );
}

const SelectExample1 = () => {
  const people = [
    { id: 1, name: "Durward Reynolds", unavailable: false },
    { id: 2, name: "Kenton Towne", unavailable: false },
    { id: 3, name: "Therese Wunsch", unavailable: false },
    { id: 4, name: "Benedict Kessler", unavailable: true },
    { id: 5, name: "Katelyn Rohan", unavailable: false },
  ];
  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  return (
    <Listbox as="div" onChange={setSelectedPerson} value={selectedPerson}>
      {/* button global css applied here, hover:bg-white used to override, but thats bad, because button global style still applied here */}
      <Listbox.Button className="flex w-full items-center justify-between rounded-md border border-zinc-500 px-2 py-1 placeholder:text-zinc-500 hover:border-blue-500 hover:bg-white focus:border-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-200 sm:w-1/3">
        {selectedPerson.name}
        <ChevronDownIcon className="h-5 w-5" />
      </Listbox.Button>

      <Listbox.Options className="mt-2 w-full space-y-1 rounded-md border border-zinc-300 py-2 shadow-lg sm:w-1/3">
        {people.map((person) => (
          <Listbox.Option
            disabled={person.unavailable}
            key={person.id}
            value={person}
          >
            {({ active, selected, disabled }) => (
              <div
                className={`
                  ${active && "bg-blue-500 text-white"} 
                  ${selected && "bg-blue-500 text-white"}
                  ${disabled && "cursor-not-allowed text-zinc-400"} cursor-pointer px-2 py-1`}
              >
                {person.name}
              </div>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};
