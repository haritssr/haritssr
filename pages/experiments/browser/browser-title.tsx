import { useState, useEffect } from 'react';
import LayoutSubWorkToTopic from '@/components/LayoutSubWorkToTopic';

export default function BrowserTitle() {
  const style = 'bg-gray-200 hover:bg-gray-300 px-2.5 py-1.5 rounded-md';
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <LayoutSubWorkToTopic title='Browser Title' href='/work/browser' hrefName='Browser API'>
      <div className='flex flex-col items-center justify-center min-h-screen space-y-5'>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 2)} className={style}>
          Tambah 2
        </button>
        <button onClick={() => setCount(count - 2)} className={style}>
          Kurang 2
        </button>
        <button onClick={() => setCount(count / 2)} className={style}>
          Bagi 2
        </button>
        <button onClick={() => setCount(count * 2)} className={style}>
          Kali 2
        </button>
      </div>
    </LayoutSubWorkToTopic>
  );
}
