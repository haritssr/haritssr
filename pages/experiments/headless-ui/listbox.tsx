import { ExternalLink, SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import { Listbox } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useState } from 'react';

/*
<Listbox>
<Listbox.Button/>
<Listbox.Options>
  <Listbox.Option/>
<Listbox.Options/>
*/

/*
Still not understand how to use render prop of 'selected' in <Listbox.Option/>
Not yet using 'horizontal, value, unmount, static' prop & 'open' render prop
*/

export default function ExportedSelect() {
  return (
    <LayoutToExperiments title='Listbox' domain='Headless UI'>
      <SubTitle>
        Listboxes (select) are a great foundation for building custom, accessible select menus for
        your app, complete with robust support for keyboard navigation.{' '}
        <ExternalLink name='Souce' href='https://headlessui.dev/react/listbox' />
      </SubTitle>
      <SelectExample1 />
    </LayoutToExperiments>
  );
}

const SelectExample1 = () => {
  const people = [
    { id: 1, name: 'Durward Reynolds', unavailable: false },
    { id: 2, name: 'Kenton Towne', unavailable: false },
    { id: 3, name: 'Therese Wunsch', unavailable: false },
    { id: 4, name: 'Benedict Kessler', unavailable: true },
    { id: 5, name: 'Katelyn Rohan', unavailable: false },
  ];
  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  return (
    <Listbox value={selectedPerson} onChange={setSelectedPerson} as='div'>
      {/* button global css applied here, hover:bg-white used to override, but thats bad, because button global style still applied here */}
      <Listbox.Button className='flex  w-full items-center justify-between rounded-md border-[1.4px] border-zinc-500 px-2 py-1 placeholder:text-zinc-500 hover:border-blue-500 hover:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 sm:w-1/3 '>
        {selectedPerson.name}
        <ChevronDownIcon className='h-5 w-5' />
      </Listbox.Button>

      <Listbox.Options className='mt-2 w-full space-y-1 rounded-md border border-zinc-300 py-2 shadow-lg sm:w-1/3'>
        {people.map(person => (
          <Listbox.Option key={person.id} value={person} disabled={person.unavailable}>
            {({ active, selected, disabled }) => (
              <div
                className={`
                  ${active && 'bg-blue-500 text-white'} 
                  ${selected && 'bg-blue-500 text-white '}
                  ${disabled && 'cursor-not-allowed text-zinc-400'} 
                  cursor-pointer px-2 py-1
                  `}
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
