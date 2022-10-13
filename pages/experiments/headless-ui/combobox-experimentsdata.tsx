//For ExportedComboboxExperimentsData
import LayoutToExperiments from '@/components/LayoutToExperiments';
import { ExternalLink, SubTitle } from '@/components/DesignSystem';
import { ExperimentsData } from '../../../data/ExperimentsData.js';

//For ComboboxExample1
import { Dialog, Combobox, Transition } from '@headlessui/react';
import { Fragment, SetStateAction, useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import ExplanationList from '@/components/ExplanationList';

//Combobox
//Combobox.Input
//Combobox.Options
//Combobox.Option

interface useStateStringType {
  target: { value: SetStateAction<string> };
}
interface filteredExperimentsDataType {
  id: number;
  title: string;
  links: Array<{ name: string }>;
}
interface ExperimentDataType {
  title: string;
  links: Array<{ name: string }>;
}

const ExportedComboboxExperimentsData = () => {
  return (
    <LayoutToExperiments title='Combobox - Experiments Data' domain='Headless UI'>
      <SubTitle>
        <ExternalLink href='https://headlessui.dev/react/combobox' name='Headless UI Combobox' />.
        <ExplanationList>
          <li>
            Comboboxes are the foundation of accessible autocompletes and command palettes for your
            app, complete with robust support for keyboard navigation.
          </li>
          <li>Press ctrl+b to open search dialog.</li>
          <li>
            The idea is this search box can be used to searching all my entire experiments in this
            site.
          </li>
        </ExplanationList>
      </SubTitle>
      <ComboboxExample1 ExperimentsData={ExperimentsData} />
    </LayoutToExperiments>
  );
};

//projects data (ExperimentsData) comes from API or database
const ComboboxExample1 = ({ ExperimentsData }) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  // anything that user types in the input field
  // (with useState (state in general) we can control the content of the state anywhere inside the components)

  const [query, setQuery] = useState('');

  //kenapa harus di useEffect ?
  useEffect(() => {
    function onKeydown(event: { key: string; metaKey: any; ctrlKey: any }) {
      if (event.key === 'b' && (event.metaKey || event.ctrlKey)) {
        setIsOpen(!isOpen);
      }
    }
    window.addEventListener('keydown', onKeydown);
    return () => {
      window.removeEventListener('keydown', onKeydown);
    };
  }, [isOpen]);

  //Data ini hanya muncul (filtered sesuai ketikan user di <Combobox.Input> ) di <Combobox.Options/> ketika user mengetik, belum menuju page tertentu
  const filteredExperimentsData = query
    ? ExperimentsData.filter(
        (ExperimentData: ExperimentDataType) =>
          ExperimentData.title.toLowerCase().includes(query.toLowerCase()) ||
          ExperimentData.links.map(link => link.name.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  return (
    <Transition.Root show={isOpen} as={Fragment} afterLeave={() => setQuery('')}>
      <Dialog
        // open={isOpen} had been move to <Transition.Root/>
        onClose={setIsOpen} //onClose={() => {setIsOpen(false);}}
        className='fixed inset-0 z-50 overflow-y-auto p-8 pt-[25vh]'
      >
        {/* Transition for Overlay */}
        <Transition.Child
          enter='duration-100 ease-out'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='duration-100 ease-in'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Dialog.Overlay className='fixed inset-0 bg-zinc-800/80 backdrop-blur-sm' />
        </Transition.Child>

        {/* Transition for Combobox */}
        <Transition.Child
          enter='duration-100 ease-out'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='duration-100 ease-in'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          {/* Combobox is wrapper of the Search Input & Result */}
          <Combobox
            onChange={ExperimentsData => {
              setIsOpen(false);
              router.push(
                `/experiments/${ExperimentsData.title.toLocaleLowerCase().replace(' ', '-')}`
              );
            }}
            value={ExperimentsData.id}
            as='div'
            className='relative mx-auto max-w-xl divide-y divide-gray-200 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5'
          >
            {/* Search Input */}
            <div className='flex items-center space-x-2 px-4'>
              <MagnifyingGlassIcon className='h-6 w-6 text-gray-500' />
              <Combobox.Input
                // Just string
                onChange={(event: useStateStringType) => {
                  setQuery(event.target.value);
                }}
                className='h-12 w-full border-0 bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-0'
                placeholder='Search Experiments'
              />
            </div>

            {/* Result */}
            {filteredExperimentsData.length > 0 && (
              <Combobox.Options static className='max-h-60 overflow-y-auto py-4 text-sm'>
                {filteredExperimentsData.map((ExperimentData: filteredExperimentsDataType) => (
                  <Combobox.Option key={ExperimentData.id} value={ExperimentData}>
                    {({ active }) => (
                      <div
                        className={`space-x-1 px-4 py-2 ${
                          active ? 'bg-blue-500' : 'bg-white'
                        } cursor-pointer`}
                      >
                        <span className={`font-medium  ${active ? 'text-white' : 'text-gray-900'}`}>
                          {ExperimentData.title}
                        </span>
                        {ExperimentData.links.map(link => (
                          <span
                            key={link.name}
                            className={` ${active ? 'text-blue-200' : 'text-gray-400'}`}
                          >
                            in {link.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}

            {/* Rendered if the input not found */}
            {query && filteredExperimentsData.length === 0 && (
              <p className='p-4 text-sm text-gray-500'>No results found</p>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default ExportedComboboxExperimentsData;
