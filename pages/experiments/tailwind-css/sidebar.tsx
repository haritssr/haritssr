import { SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';

export default function Sidebar() {
  return (
    <LayoutToExperiments title='Sidebar' domain='Tailwind CSS'>
      <SubTitle>Sidebar example</SubTitle>
      <div className='flex flex-row overflow-hidden rounded border border-zinc-400'>
        {/* Side Bar */}
        <div className='w-1/4 bg-zinc-200'>
          <div className='flex items-center justify-between border-b border-zinc-400 px-4 py-2'>
            <div className='font-semibold text-zinc-800'>Trigonometri</div>

            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 text-zinc-600'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M11 19l-7-7 7-7m8 14l-7-7 7-7'
              />
            </svg>
          </div>
          <ul className='space-y-1 p-4'>
            <li className='rounded bg-blue-500 px-2 py-1 text-white'>JavaScript</li>
            <li className='cursor-pointer rounded px-2 py-1 text-zinc-800 hover:bg-blue-500 hover:text-white'>
              JavaScript
            </li>
            <li className='cursor-pointer rounded px-2 py-1 text-zinc-800 hover:bg-blue-500 hover:text-white'>
              JavaScript
            </li>
            <li className='cursor-pointer rounded px-2 py-1 text-zinc-800 hover:bg-blue-500 hover:text-white'>
              JavaScript
            </li>
            <li className='cursor-pointer rounded px-2 py-1 text-zinc-800 hover:bg-blue-500 hover:text-white'>
              JavaScript
            </li>
            <li className='cursor-pointer rounded px-2 py-1 text-zinc-800 hover:bg-blue-500 hover:text-white'>
              JavaScript
            </li>
            <li className='cursor-pointer rounded px-2 py-1 text-zinc-800 hover:bg-blue-500 hover:text-white'>
              JavaScript
            </li>
            <li className='cursor-pointer rounded px-2 py-1 text-zinc-800 hover:bg-blue-500 hover:text-white'>
              JavaScript
            </li>
            <li className='cursor-pointer rounded px-2 py-1 text-zinc-800 hover:bg-blue-500 hover:text-white'>
              JavaScript
            </li>
            <li className='cursor-pointer rounded px-2 py-1 text-zinc-800 hover:bg-blue-500 hover:text-white'>
              JavaScript
            </li>
          </ul>
        </div>
        {/* Content Side */}
        <div className='w-3/4 bg-zinc-100'>
          <div className='flex justify-end border-b border-zinc-400 px-2 py-2'>
            <div className='flex items-center rounded-md border border-zinc-400 bg-zinc-200 px-1.5 py-0.5 hover:border-zinc-800'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-6 text-zinc-600'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
              <input
                type='search'
                className='bg-zinc-200 p-1 pr-2 text-tiny focus:outline-none'
                placeholder='Search'
              />
            </div>
          </div>
          <div className='px-4 py-2'>
            <div className='my-4 text-xl font-semibold'>JavaScript</div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum, adipisci, ducimus
              eligendi ab aperiam velit, cum quo sit facilis beatae voluptatem iure sunt? Temporibus
              consectetur eveniet excepturi quibusdam cumque totam repudiandae! Molestiae unde nam
              exercitationem, quia nihil ad quo placeat libero totam, earum, quasi laudantium.
              Facilis architecto, molestiae quidem explicabo inventore deserunt quam libero ut aut
              nesciunt earum accusantium rerum dicta blanditiis voluptatibus veniam veritatis
              deleniti et, culpa recusandae voluptates assumenda tempora. Ratione rerum earum
              expedita, aspernatur, voluptas numquam recusandae eaque temporibus quibusdam eveniet
              illo, dolorum tenetur labore error alias quod porro animi dignissimos vero.
              Repellendus ipsa suscipit quaerat natus.
            </p>
          </div>
        </div>
      </div>
    </LayoutToExperiments>
  );
}
