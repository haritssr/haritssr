import Link from 'next/link';
import { useRouter } from 'next/router';
export default function BackToTop() {
  let router = useRouter();
  return (
    <div className='sticky inset-0 z-50 rounded-md pb-5'>
      <div className='flex justify-end w-full pr-5 '>
        <Link href={router.asPath}>
          <a className='p-2 border rounded-md shadow bg-zinc-50 border-zinc-300 group group-hover:bg-zinc-100'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-5 h-5 text-zinc-500 group-hover:text-zinc-700'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M5 10l7-7m0 0l7 7m-7-7v18'
              />
            </svg>
          </a>
        </Link>
      </div>
    </div>
  );
}
