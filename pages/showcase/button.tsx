import { Title } from '@/components/DesignSystem';
import Layout from '@/components/Layout';

export default function Button() {
  return (
    <Layout browserTitle='Button' description='Button'>
      <Title name='Button' />
      <div className='grid grid-cols-2 gap-5 sm:grid-cols 3 md:grid-cols-4 lg:grid-cols-6'>
        <button className='px-4 py-1.5 text-white border rounded bg-harislab hover:text-harislab hover:bg-white border-harislab duration-100 active:ring-2 active:ring-harislab'>
          Button
        </button>
        <button className='px-4 py-1.5 text-white border rounded bg-harislab hover:bg-blue-600 hover:text-white hover:bg-opacity-100 border-harislab duration-100 active:ring-2 active:ring-gray-800'>
          Button
        </button>
        <button className='px-4 py-1 border rounded text-harislab hover:bg-blue-50 border-harislab 5'>
          Button
        </button>
        <button className='px-4 py-1 border text-harislab hover:bg-blue-50 border-harislab 5'>
          Button
        </button>
      </div>
    </Layout>
  );
}
