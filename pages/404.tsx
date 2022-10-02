import Layout from '@/components/Layout';

export default function NotFoundPage() {
  return (
    <Layout browserTitle='404' description='Kasian nyasar'>
      <div className='flex h-screen flex-col items-center justify-center space-y-5'>
        <div className='text-center text-2xl font-medium text-zinc-800 sm:text-3xl'>
          Page not found.
        </div>

        <div
          onClick={() => history.back()}
          className='flex cursor-pointer items-center rounded-full border border-blue-600 px-6 pt-1 pb-1.5 text-blue-600 hover:bg-blue-100'
        >
          <div className=''>Back</div>
        </div>
      </div>
    </Layout>
  );
}
