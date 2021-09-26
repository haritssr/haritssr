import { useState } from 'react';
import { Listbox } from '@headlessui/react';
import { Topic } from '@/components/DesignSystem';

//Listbox (Select)
export default function MyListbox() {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);

  return (
    <>
      <Topic name='ListBox' />
      <Listbox as='div' value={selectedPerson} onChange={setSelectedPerson}>
        <Listbox.Button>{selectedPerson.name}</Listbox.Button>
        <Listbox.Options>
          {people.map(person => (
            <Listbox.Option key={person.id} value={person} disabled={person.unavailable}>
              {person.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </>
  );
}

const people = [
  { id: 1, name: 'Durward Reynolds', unavailable: false },
  { id: 2, name: 'Kenton Towne', unavailable: false },
  { id: 3, name: 'Therese Wunsch', unavailable: false },
  { id: 4, name: 'Benedict Kessler', unavailable: true },
  { id: 5, name: 'Katelyn Rohan', unavailable: false },
];
