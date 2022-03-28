import { ExternalLink, SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import { Listbox } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useState } from 'react';

// listbox STRUCTURE
// --------------------
// <Listbox>
// <Listbox.Button/>
// <Listbox.Options>
//    <Listbox.Option/>
// <Listbox.Options/>

// NOTES
// -----
// Still not understand how to use render prop of 'selected' in <Listbox.Option/>
// Not yet using 'horizontal, value, unmount, static' prop & 'open' render prop

const ImportedListbox = () => {
  return (
    <LayoutToExperiments title='Listbox' domain='Headless UI'>
      <SubTitle>
        Listboxes are a great foundation for building custom, accessible select menus for your app,
        complete with robust support for keyboard navigation.{' '}
        <ExternalLink name='Souce' href='https://headlessui.dev/react/listbox' />
      </SubTitle>
      <ListboxExample1 />
    </LayoutToExperiments>
  );
};

const ListboxExample1 = () => {
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
      <Listbox.Button className='flex w-64 items-center justify-between space-x-5 rounded-md bg-zinc-800 py-2 pr-3 pl-4 text-zinc-200'>
        {selectedPerson.name}
        <ChevronDownIcon className='h-5 w-5' />
      </Listbox.Button>

      <Listbox.Options className='mt-2 w-64 rounded-md border p-2 shadow-xl space-y-1'>
        {people.map(person => (
          <Listbox.Option key={person.id} value={person} disabled={person.unavailable}>
            {({ active, selected, disabled }) => (
              <>
                <div
                  className={`
                  ${active && 'bg-blue-500 text-white'} 
                  ${selected && 'text-white bg-blue-500 '}
                  ${disabled && 'cursor-not-allowed text-zinc-400'} 
                  cursor-pointer rounded-md px-2 py-1
                  `}
                >
                  {person.name}
                </div>
              </>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};

export default ImportedListbox;
