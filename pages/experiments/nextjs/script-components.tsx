import { TitleBack } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
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
    <LayoutToExperiments title='Script Components' domain='Next.js'>
      <div className='h-screen'>
        <TitleBack href='Work' name='Script' />

        <div className='h-screen bg-blue-500'></div>
        <button id='tombol' className='px-4 py-2 bg-red-500 border border-gray-400 rounded-full'>
          Button
        </button>
      </div>
    </LayoutToExperiments>
  );
}
