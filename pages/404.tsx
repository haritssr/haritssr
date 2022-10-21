import Layout from '@/components/Layout';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

export default function NotFoundPage() {
  return (
    <Layout browserTitle='404' description='Kasian nyasar'>
      <div className='flex h-screen flex-col items-center justify-center space-y-5'>
        <div className='text-center text-2xl font-medium text-zinc-800 sm:text-3xl'>
          Page not found.
        </div>

        <div
          onClick={() => history.back()}
          className='flex cursor-pointer items-center space-x-1 rounded-full bg-blue-600 py-1 pl-3 pr-5 text-white hover:bg-blue-500'
        >
          <ChevronLeftIcon className='h-4 w-4' strokeWidth={3} />
          <div className='pb-[1px]'>Back</div>
        </div>
      </div>
    </Layout>
  );
}
