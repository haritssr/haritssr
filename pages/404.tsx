import Layout from '@/components/Layout';
import { ChevronLeftIcon } from '@heroicons/react/outline';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <Layout browserTitle='404' description='Kasian nyasar'>
      <div className='flex h-screen flex-col items-center justify-center space-y-5'>
        <div className='text-center text-2xl font-medium text-zinc-700 sm:w-2/3'>
          The page you&apos;re looking for can&apos;t be found.
        </div>
        <Link href='/'>
          <a className='flex cursor-pointer items-center rounded-full border bg-blue-600 py-2 pr-4 pl-2 text-base  text-white duration-200 hover:bg-blue-700'>
            <ChevronLeftIcon className='h-5 w-5 text-white' />
            <div className=''>Home</div>
          </a>
        </Link>
      </div>
    </Layout>
  );
}
