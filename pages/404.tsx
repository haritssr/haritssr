import Layout from '@/components/Layout';
import { ChevronLeftIcon } from '@heroicons/react/outline';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <Layout browserTitle='404' description='Kasian nyasar'>
      <div className='flex h-screen flex-col items-center justify-center space-y-5'>
        <div className='text-center text-2xl font-medium text-zinc-700 sm:w-3/4 sm:text-3xl'>
          The page you&apos;re looking for can&apos;t be found.
        </div>
        <div className='text-center text-lg text-zinc-600 '>Go these links instead:</div>
        <div className='flex items-center space-x-2'>
          <Link href='/'>
            <a className='rounded-full border border-blue-600 px-4 py-1 text-blue-600 hover:bg-blue-600 hover:text-white'>
              <div className=''>Home</div>
            </a>
          </Link>
          <Link href='/experiments'>
            <a className='rounded-full border border-blue-600 px-4 py-1 text-blue-600 hover:bg-blue-600 hover:text-white'>
              <div className=''>Experiments</div>
            </a>
          </Link>
          <Link href='/blog'>
            <a className='rounded-full border border-blue-600 px-4 py-1 text-blue-600 hover:bg-blue-600 hover:text-white'>
              <div className=''>Blog</div>
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
