import { TitleBack } from '@/components/DesignSystem';
import Layout from '@/components/Layout';
import { useEffect } from 'react';

export default function ScriptPage() {
  useEffect(() => {
    const tombol = document.getElementById('tombol');
    tombol.addEventListener('onclick', () => {
      tombol.classList.remove('bg-red-500');
      tombol.classList.add('bg-blue-500');
    });
  });
  return (
    <Layout browserTitle='Script' description='Script'>
      <div className='h-screen'>
        <TitleBack href='Work' name='Script' />

        <div className='h-screen bg-blue-500'></div>
        <button id='tombol' className='px-4 py-2 bg-red-500 border border-gray-400 rounded-full'>
          Button
        </button>
      </div>
    </Layout>
  );
}
