import Layout from '@/components/Layout';
import Link from 'next/link';

export default function ErrorPage() {
  return (
    <Layout browserTitle='500' description='Kasian nyasar'>
      <div className='flex h-screen flex-col items-center justify-center space-y-5'>
        <div className='text-center text-4xl font-semibold text-zinc-700 sm:w-1/2'>
          Server error{' '}
        </div>
        <Link href='/'>
          <a className='block cursor-pointer rounded-full border bg-blue-600 px-5 py-2 text-base text-white duration-200 hover:bg-blue-700'>
            Back to home
          </a>
        </Link>
      </div>
    </Layout>
  );
}
