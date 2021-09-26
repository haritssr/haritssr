import { Topic } from '@/components/DesignSystem';
import { Disclosure } from '@headlessui/react';

//Disclosure
export default function MyDisclosure() {
  return (
    <>
      <Topic name='Disclosure' />
      <Disclosure as='div'>
        {({ open }) => (
          <>
            <Disclosure.Button
              className={`${
                open ? 'rounded-b-none ' : ''
              } w-full rounded-lg flex flex-row items-center justify-between py-2 px-3 border border-gray-500  cursor-pointer focus:outline-none  bg-gray-200 font-medium text-gray-700 hover:bg-gray-300`}
            >
              Disclosure Button
              <ChevronUp
                className={`${open ? 'transform rotate-180' : ''} block w-6 h-6 text-gray-700`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className='p-3 text-gray-600 border border-t-0 border-gray-500 rounded-b-lg '>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi consectetur eius amet,
              eaque, omnis earum quod voluptatem, asperiores sed repudiandae quibusdam dolore
              adipisci non. Fugit nisi sint eaque placeat nemo ea in id ab blanditiis tenetur sunt
              beatae aliquid eius natus voluptatum inventore laudantium a nulla rerum at, maxime
              laboriosam magni aperiam. Debitis ratione nam cupiditate id ut. Incidunt veniam
              corporis eaque quae. Et nam fuga repellendus. Quisquam placeat totam nemo repellendus
              necessitatibus. Rem laboriosam quam accusamus explicabo error voluptatum repellat, ut
              cum quod reiciendis voluptatibus eveniet aliquam debitis aut distinctio veniam dolores
              voluptas, ab, ipsum vitae iusto placeat eius.
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}

const ChevronUp = ({ className }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={`w-5 h-5 ${className}`}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1} d='M5 15l7-7 7 7' />
    </svg>
  );
};
