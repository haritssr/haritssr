import { SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import React, { useRef, useState } from 'react';
import data from '../../../data/Search2Data.json';
import { Combobox } from '@headlessui/react';

interface DataType {
  author: string;
  country: string;
  imageLink: string;
  language: string;
  link: string;
  pages: number;
  title: string;
  year: number;
}

const Search2: React.FC<{}> = (): JSX.Element => {
  const [filteredData, setFilteredData] = useState<DataType[]>([]);
  const [wordEntered, setWordEntered] = useState<string>('');

  const inputRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => inputRef.current?.focus());
  }

  const handleFilter = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
    const searchWord: string = target.value.toLowerCase();
    setWordEntered(searchWord);

    const newFilter: DataType[] = data.filter(({ title }): boolean =>
      title.toLowerCase().includes(searchWord)
    );

    if (!searchWord) return setFilteredData([]);
    setFilteredData(newFilter);
  };

  // const clearInput = (): void => {
  //   setFilteredData([]);
  //   setWordEntered('');
  //   inputRef.current?.focus();
  // };

  // const parsedData = JSON.parse(data);
  return (
    <LayoutToExperiments title='Search Books' domain='Browser'>
      <SubTitle>Include : case sensitive (lowercase). Not include: space sensitive. </SubTitle>
      <Combobox value={data['title']} as='div' onChange={() => null}>
        <div className='group mx-auto flex items-center focus:border-neutral-800 sm:w-1/3'>
          <Combobox.Input
            type='search'
            className='w-full rounded border border-zinc-700 px-2 py-1 focus:border focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200'
            placeholder='Enter a book name...'
            value={wordEntered}
            onChange={handleFilter}
            ref={inputRef}
          />
        </div>

        {filteredData.length !== 0 && (
          <Combobox.Options className='mx-auto mt-2 overflow-hidden rounded border border-zinc-600 sm:w-1/3'>
            <div className='max-h-52 min-h-fit space-y-1 overflow-y-auto py-2'>
              {filteredData.map(({ link, title }, key) => (
                <Combobox.Option key={key} value={data}>
                  {({ active }) => (
                    <a
                      href={link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className={`flex px-2 py-1 hover:bg-blue-500 hover:text-white ${
                        active ? 'bg-blue-500 text-white' : ''
                      }`}
                    >
                      {title}
                    </a>
                  )}
                </Combobox.Option>
              ))}
            </div>
          </Combobox.Options>
        )}
      </Combobox>
    </LayoutToExperiments>
  );
};

export default Search2;

// MANUAL CLOSE ICON
// Rendered via wordEntered state
// Closed via clearInput()
// Placed after input field
// {
//   wordEntered.length !== 0 && (
//     // close icon
//     <svg
//       xmlns='http://www.w3.org/2000/svg'
//       className='h-6 w-6'
//       fill='none'
//       viewBox='0 0 24 24'
//       stroke='currentColor'
//       strokeWidth={2}
//       onClick={clearInput}
//     >
//       <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
//     </svg>
//   );
// }
